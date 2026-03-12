"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopActions from "@/components/TopActions";
import SuggestionCard from "@/components/SuggestionCard";
import ChatInterface from "@/components/ChatInterface";
import styles from "./page.module.css";

const SUGGESTIONS = [
  "Audit my store products.",
  "Analyze store performance.",
  "Draft a customer marketing email.",
  "Optimize my product descriptions."
];

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (title: string) => {
    handleSendMessage(title);
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <TopActions />
        
        <div className={styles.content}>
          <section className={styles.hero}>
            <h1 className={`${styles.title} serif`}>What do you need help with today?</h1>
            <p className={styles.subtitle}>Tell me what you need, and I'll make it happen.</p>
          </section>

          <ChatInterface onSend={handleSendMessage} disabled={loading} />

          <section className={styles.suggestions}>
            {SUGGESTIONS.map((title) => (
              <SuggestionCard 
                key={title} 
                title={title} 
                onClick={() => handleSuggestionClick(title)} 
              />
            ))}
          </section>

          <section className={styles.chatHistory}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
                <p>{msg.content}</p>
              </div>
            ))}
            {loading && <p className={styles.loading}>Whopy is working...</p>}
          </section>

          <footer className={styles.footer}>
            <p>Whopy AI Can make mistakes. <a href="#">Check important info.</a></p>
          </footer>
        </div>
      </main>
    </div>
  );
}
