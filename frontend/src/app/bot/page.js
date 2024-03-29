"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content: "Hello! Ask me questions about the Twitter Analysis.",
    },
  ]);
  const lastMessageRef = useRef(null);

  const handleClick = async () => {
    if (message.trim() === "") return;
  
    // Add user message to history
    setHistory((oldHistory) => [
      ...oldHistory,
      { role: "user", content: message },
    ]);
  
    // Send user question to backend for processing
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }), 
    });
  
    if (response.ok) {
      const data = await response.json();
  
      setHistory((oldHistory) => [
        ...oldHistory,
        { role: "assistant", content: data.answer }, 
      ]);
      setMessage("");
    } else {
      console.error("Failed to get response from the server");
    }
  
    setMessage("");
  };
  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <main className="min-h-screen p-6 flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 w-full items-center flex-grow max-h-full">
        <h1 className="text-4xl text-transparent font-extralight bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500">
          Twitter Bot Insight
        </h1>
        <div className="rounded-2xl border-purple-700 border-opacity-5 border w-full flex-grow flex flex-col bg-[url('/images/bg.png')] bg-cover max-h-full overflow-clip">
          <div className="overflow-y-scroll flex flex-col gap-5 p-10 h-full">
            {history.map((message, idx) => (
              <div
                key={idx}
                ref={idx === history.length - 1 ? lastMessageRef : null}
                className={`flex gap-2 ${
                  message.role === "assistant" ? "" : "self-end"
                }`}
              >
                <img
                  src={
                    message.role === "assistant"
                      ? "images/assistant-avatar.png"
                      : "images/user-avatar.png"
                  }
                  className="h-12 w-12 rounded-full"
                />
                <div className="w-auto max-w-xl break-words bg-white rounded-xl text-black p-6 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]">
                  <p className="text-sm font-medium text-violet-500 mb-2">
                    {message.role === "assistant" ? "AI assistant" : "You"}
                  </p>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex sticky bottom-0 w-full px-6 pb-6 h-24">
            <div className="w-full relative flex items-center">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full h-full resize-none rounded-full border border-slate-900/10 bg-white pl-4 pr-20 py-[20px] text-sm placeholder:text-slate-400 text-black focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
              />

              <button
                onClick={handleClick}
                className="flex w-14 h-14 items-center justify-center rounded-full px-3 text-sm bg-violet-600 font-semibold hover:bg-violet-700 active:bg-violet-800 absolute right-2 bottom-2 disabled:bg-violet-100 disabled:text-violet-400"
                aria-label="Send"
                disabled={!message}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
