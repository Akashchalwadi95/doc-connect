import React, {useState, useEffect} from "react";
import { FaArrowLeft, FaComments, FaCalendarAlt, FaFileMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import "./HealthAssistantPage.css";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { app } from "../../firebase"; 

const HealthAssistantPage = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // {role: "user"|"assistant", content: string}
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const db = getFirestore(app);
      const q = query(
        collection(db, "assistantChats"),
        orderBy("timestamp", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      // Reverse to show oldest at top
      const chats = snapshot.docs.map(doc => doc.data()).reverse();
      // Convert to messages array for display
      const loadedMessages = [];
      chats.forEach(chat => {
        loadedMessages.push({ role: "user", content: chat.user });
        loadedMessages.push({ role: "assistant", content: chat.assistant });
      });
      setMessages(loadedMessages);
    };
    fetchChats();
  }, []);

  const handleChatResponse = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: prompt };
    const apiMessages = [systemMessage, ...messages, userMessage];
    setPrompt("");

    console.log("Sending to Groq:", { 
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: apiMessages,
      max_tokens: 512,
      temperature: 0.7
    });

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick-17b-128e-instruct",
          messages: apiMessages,
          max_tokens: 512,
          temperature: 0.7
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "API error");
      }
      const assistantMessage = {
        role: "assistant",
        content: stripMarkdown(data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.")
      };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: "Sorry, there was an error connecting to the assistant." }
      ]);
    }
    setLoading(false);

    const db = getFirestore(app);
    await addDoc(collection(db, "assistantChats"), {
      user: userMessage.content,
      assistant: assistantMessage.content,
      timestamp: new Date()
    });
  };

  const systemMessage = {
    role: "system",
    content: "You are a professional medical AI health assistant. Respond to user queries with helpful, accurate, and friendly medical guidance. Always reply in plain text, without any markdown, bullet points, or special formatting. Do not use asterisks, lists, or bold text. Always remind users to consult healthcare professionals for serious concerns."
  };

  const stripMarkdown = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1')     // Remove italics
      .replace(/`(.*?)`/g, '$1')       // Remove inline code
      .replace(/^- /gm, '')            // Remove bullet points
      .replace(/^\d+\.\s+/gm, '')      // Remove numbered lists
      .replace(/[_~]/g, '');           // Remove other markdown


  const summarizeHealthStatus = async () => {
    setLoading(true);
    const userMessage = {
      role: "user",
      content: "Please summarize my health status based on our previous conversation."
    };
    const apiMessages = [systemMessage, ...messages, userMessage];

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick-17b-128e-instruct",
          messages: apiMessages,
          max_tokens: 512,
          temperature: 0.7
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "API error");
      }
      const assistantMessage = {
        role: "assistant",
        content: stripMarkdown(data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.")
      };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);

      // Store in Firestore
      const db = getFirestore(app);
      await addDoc(collection(db, "assistantChats"), {
        user: userMessage.content,
        assistant: assistantMessage.content,
        timestamp: new Date()
      });
    } catch (err) {
      const assistantMessage = {
        role: "assistant",
        content: "Sorry, there was an error connecting to the assistant."
      };
      setMessages((prev) => [
        ...prev,
        userMessage,
        assistantMessage
      ]);
      // Store error in Firestore
      const db = getFirestore(app);
      await addDoc(collection(db, "assistantChats"), {
        user: userMessage.content,
        assistant: assistantMessage.content,
        timestamp: new Date()
      });
    }
    setLoading(false);
  };

  return (
    <div className="assistant-container">
      <div className="assistant-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <div>
          <h2>Health Assistant</h2>
          <div className="assistant-subtitle">AI-powered personalized guidance</div>
        </div>
      </div>
      <div className="assistant-banner">
        <span>
          <FaComments style={{ marginRight: 8 }} />
          I can access your medical history to provide personalized advice. Always consult healthcare professionals for serious concerns.
        </span>
      </div>
      <div className="assistant-actions-label">Quick Actions:</div>
      <div className="assistant-actions">
        <button className="assistant-action-btn" onClick={() => navigate("/book-appointment")}>
          <FaCalendarAlt style={{ marginRight: 6 }} />
          Book an appointment
        </button>
        <button className="assistant-action-btn" onClick={() => navigate("/medical-records")}>
          <FaFileMedical style={{ marginRight: 6 }} />
          View my medical records
        </button>
        <button className="assistant-action-btn" onClick={summarizeHealthStatus}>
          Summarize my health status
        </button>
      </div>
      <div className="assistant-chat">
        <div className="assistant-chat-label">AI Assistant</div>
        <div className="assistant-chat-history">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.role === "assistant" ? "assistant-bubble" : "user-bubble"}`}
              style={{
                color: msg.role === "assistant" ? "#059669" : "#222",
                background: msg.role === "assistant" ? "#e0f2fe" : "#f1f5f9",
                alignSelf: msg.role === "assistant" ? "flex-start" : "flex-end",
                marginRight: msg.role === "user" ? "12px" : "0",
                marginLeft: msg.role === "assistant" ? "0" : "12px"
              }}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="chat-bubble" style={{
              color: "#059669",
              background: "#e0f2fe",
              fontStyle: "italic",
              alignSelf: "flex-start"
            }}>
              Thinking...
            </div>
          )}
        </div>
        <div className="assistant-chat-input-wrapper">
          <input
            type="text"
            placeholder="Hello, I’m your professional medical AI assistant. How can I assist you today?"
            className="assistant-chat-bubble"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleChatResponse(); }}
            disabled={loading}
          />
          <button className="assistant-send-btn" onClick={handleChatResponse} disabled={loading || !prompt.trim()}>
            Send
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HealthAssistantPage;