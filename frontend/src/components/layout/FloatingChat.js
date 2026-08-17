import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hey! 👋 Welcome to BOOSTER MAG. How can we help you grow today?" },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    const userText = text.trim();
    setMsgs((m) => [...m, { from: "user", text: userText }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: "Thanks for reaching out! This is a demo assistant. Pick a package on any service page to see the checkout flow. 🚀",
        },
      ]);
    }, 700);
  };

  return (
    <>
      {open && (
        <div
          data-testid="support-chat-panel"
          className="fixed bottom-24 right-4 z-50 w-[320px] max-w-[90vw] rounded-2xl bg-white border border-black/10 bm-card-shadow overflow-hidden"
        >
          <div className="bm-grad-cta text-white px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">BOOSTER MAG Support</div>
              <div className="text-[11px] opacity-90">Typically replies instantly</div>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-2 bg-[var(--bm-surface-2)]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${
                    m.from === "user"
                      ? "bm-grad-cta text-white rounded-br-sm"
                      : "bg-white border border-black/10 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 flex gap-2 border-t border-black/10">
            <Input
              data-testid="support-chat-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="h-10"
            />
            <Button data-testid="support-chat-send" onClick={send} size="icon" className="h-10 w-10 bm-grad-cta text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <button
        data-testid="support-chat-open-button"
        aria-label="Open support chat"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bm-grad-cta text-white grid place-items-center bm-glow hover:brightness-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
};

export default FloatingChat;
