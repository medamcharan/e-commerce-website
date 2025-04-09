import React, { useState, useEffect } from "react";
import './Chatbot.css';

const SERVER_URL = "https://aiserver-cge4.onrender.com"; // Your deployed backend URL

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderStatus, setIsOrderStatus] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleOrderStatus = () => {
    setIsOrderStatus(true);
    setMessages(prev => [...prev, { role: "assistant", content: "🔸 Please enter your Order ID:" }]);
  };

  const handleOrderIdSubmit = async (orderId) => {
    setIsOrderStatus(false);
    const userMessage = { role: "user", content: `Order ID: ${orderId}` };
    setMessages(prev => [...prev, userMessage]);
    setOrderId("");

    setIsTyping(true);
    try {
      const response = await fetch(`${SERVER_URL}/api/orders/${orderId}`);
      const data = await response.json();

      if (data.error) {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: `🔸 Sorry, no order found with ID ${orderId}.` },
        ]);
      } else {
        const deliveryDays = Math.floor(Math.random() * 2) + 3;
        const orderDetails = `🔸 *Order ID*: ${data.id}\n🔸 *Status*: Delivered in ${deliveryDays} days\n🔸 *Total Amount*: $${data.totalAmount}\n🔸 *Payment Method*: ${data.paymentMethod}\n🔸 *Delivery Address*: ${data.shippingAddress.address || 'Not provided'}, ${data.shippingAddress.city || 'N/A'}, ${data.shippingAddress.zipCode || 'N/A'}`;
        
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: orderDetails },
        ]);
      }
    } catch (err) {
      console.error("Error fetching order details:", err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong while fetching the order details." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatBotReply = (text) => {
    if (typeof text !== "string") return text;

    const lines = text.split('\n').filter(Boolean);
    return lines.map((line, index) => {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (formattedLine.includes("Website:") || formattedLine.includes("Image:")) return null;
      return <div key={index} dangerouslySetInnerHTML={{ __html: ` ${formattedLine}` }} />;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);

    try {
      const [accessories, kids, men, women, policies] = await Promise.all([
        fetch("/data/accessories.json").then(res => res.json()),
        fetch("/data/kids-wear.json").then(res => res.json()),
        fetch("/data/men-wear.json").then(res => res.json()),
        fetch("/data/women-wear.json").then(res => res.json()),
        fetch("/data/storePolicies.json").then(res => res.json()),
      ]);

      const productData = { accessories, kids, men, women, policies };

      const response = await fetch(`${SERVER_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, data: productData }),
      });

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error talking to chatbot:", err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isOrderStatus) {
        handleOrderIdSubmit(orderId);
      } else {
        handleSend();
      }
    }
  };

  return (
    <>
      <div className={`chat-float-button ${!isOpen && messages.length > 0 ? 'new-message' : ''}`} onClick={toggleChat}>
        {isOpen ? "×" : "💬"}
      </div>

      {isOpen && (
        <div className="chat-popup">
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                {msg.role === "assistant" ? formatBotReply(msg.content) : msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
          <div className="chat-input-area">
            {isOrderStatus ? (
              <>
                <input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Order ID"
                />
                <button onClick={() => handleOrderIdSubmit(orderId)}>Submit</button>
              </>
            ) : (
              <>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask something..."
                />
                <button onClick={handleSend}>Send</button>
              </>
            )}
          </div>

          <div className="check-order-status">
            {!isOrderStatus && <button onClick={handleOrderStatus}>Check Order Status</button>}
          </div>
        </div>
      )}
    </>
  );
}
