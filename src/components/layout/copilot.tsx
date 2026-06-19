"use client";

import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/use-app-store";

const prompts = [
  "Which devices are likely to fail this week?",
  "Explain the NYC gateway risk score.",
  "Create a maintenance plan for critical alerts."
];

export function Copilot() {
  const { copilotOpen, setCopilotOpen } = useAppStore();
  const [messages, setMessages] = useState([
    { role: "assistant", text: "I am watching device health, alerts, and maintenance windows. Ask me for predictions or root cause context." }
  ]);
  const [input, setInput] = useState("");

  function send(text = input) {
    if (!text.trim()) return;
    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "assistant", text: "Based on current telemetry, I would prioritize Edge Gateway NYC-01, then Factory Sensor BER-22. Confidence is highest where thermal and vibration signals overlap with known failure patterns." }
    ]);
    setInput("");
  }

  return (
    <AnimatePresence>
      {copilotOpen && (
        <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-neutral-950/95 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"><Bot className="size-5" /></span>
              <div>
                <p className="font-semibold text-white">DeviceGuard Copilot</p>
                <p className="text-xs text-muted-foreground">AI assistant ready for backend model routing</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setCopilotOpen(false)} aria-label="Close copilot"><X className="size-5" /></Button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "assistant" ? "mr-8 rounded-lg bg-white/[0.06] p-3 text-sm text-muted-foreground" : "ml-8 rounded-lg bg-primary/20 p-3 text-sm text-white"}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-white/10 p-4">
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button key={prompt} onClick={() => send(prompt)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground hover:bg-white/[0.07] hover:text-white">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); send(); }} className="flex gap-2">
              <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Copilot..." />
              <Button type="submit" size="icon" variant="primary" aria-label="Send"><Send className="size-4" /></Button>
            </form>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
