const axios = require('axios');

const GEMINI_API_KEY = "AIzaSyCpfgIVASrGR-nfAiIwkur2Mez4wty8wME";

// Helper function to identify order ID in user message
const isOrderIdQuery = (message) => {
  const orderIdMatch = message.match(/\b\d{5,10}\b/); // Match order IDs with 5 to 10 digits
  return orderIdMatch ? orderIdMatch[0] : null;
};

// Function to fetch order details from the backend
const getOrderDetailsFromAPI = async (orderId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('Error fetching order details:', err);
    return null;
  }
};

// Function to interact with Gemini API
const chatWithGemini = async (prompt) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });

    const parts = response?.data?.candidates?.[0]?.content?.parts;
    return parts?.[0]?.text || "No valid response from Gemini API.";
  } catch (err) {
    console.error(err);
    return `Error calling Gemini API: ${err.message}`;
  }
};

// Helper function to identify if the message is about a product
const isProductQuery = (message) => {
  const keywords = ["product", "item", "available", "stock", "buy"];
  return keywords.some(keyword => message.includes(keyword));
};

// Main function to handle user chat and order queries
const handleChat = async (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  const productData = req.body.data;

  // Developer credit response
  if (userMessage.includes("who") &&
      (userMessage.includes("developed") || userMessage.includes("created") || userMessage.includes("made") || userMessage.includes("owner")) &&
      (userMessage.includes("website") || userMessage.includes("app") || userMessage.includes("application") || userMessage.includes("site"))) {
    return res.json({ reply: "This website was developed and created by Deepika M from Malla Reddy Engineering College." });
  }

  // Check if user is asking for order details based on order ID
  const orderId = isOrderIdQuery(userMessage);
  if (orderId) {
    const orderDetails = await getOrderDetailsFromAPI(orderId);

    if (orderDetails) {
      const responseText = `🔸 *Order ID*: ${orderId}\n🔸 *Status*: ${orderDetails.status}\n🔸 *Total Amount*: $${orderDetails.totalAmount}\n🔸 *Payment Method*: ${orderDetails.paymentMethod}\n🔸 *Shipping Date*: ${orderDetails.shippingDate}\n🔸 *Shipping Address*: ${orderDetails.address}`;
      return res.json({ reply: responseText });
    } else {
      return res.json({ reply: `🔸 Sorry, we couldn't find an order with ID ${orderId}. Please check the ID and try again.` });
    }
  }

  // Product check if no order ID found
  if (isProductQuery(userMessage) && typeof productData === 'object') {
    const allItems = Object.values(productData).flat().filter(x => typeof x === 'object');
    const found = allItems.some(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(userMessage)
      )
    );

    if (!found) {
      return res.json({ reply: "🔸 That item is currently not available, but it will be added soon! - *VOGUE AI*" });
    }
  }

  // Fallback to Gemini if no order ID or product query found
  const prompt = `You are a helpful assistant named VOGUE AI for an online shopping website.\n\nHere is the product catalog:\n${JSON.stringify(productData)}\n\nUser question:\n${userMessage}`;
  const reply = await chatWithGemini(prompt);
  res.json({ reply: reply + " - *VOGUE AI*" });
};

module.exports = { handleChat };
