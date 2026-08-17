import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.contact(form);
      setSent(true);
      toast.success("Message sent!");
    } catch (err) {
      toast.error("Could not send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-5xl uppercase text-center">Contact Us</h1>
      <p className="text-center text-[var(--bm-muted)] mt-3 flex items-center justify-center gap-2">
        <Mail className="h-4 w-4" /> support@boostermag.demo
      </p>

      {sent ? (
        <div
          data-testid="contact-success"
          className="mt-10 rounded-2xl bg-white border border-black/10 bm-card-shadow p-10 text-center"
        >
          <CheckCircle2 className="h-14 w-14 mx-auto text-[var(--bm-blue)]" />
          <h2 className="mt-4 text-xl font-semibold">Thanks for reaching out!</h2>
          <p className="mt-2 text-[var(--bm-muted)]">
            We received your message and will get back to you shortly.
          </p>
          <Button
            className="mt-6 rounded-full bm-grad-cta text-white"
            onClick={() => {
              setSent(false);
              setForm({ name: "", email: "", message: "" });
            }}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="mt-10 rounded-2xl bg-white border border-black/10 bm-card-shadow p-6 sm:p-8 space-y-5"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              data-testid="contact-name-input"
              className="mt-1.5 h-11"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              data-testid="contact-email-input"
              className="mt-1.5 h-11"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              data-testid="contact-message-input"
              className="mt-1.5 min-h-32"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?"
            />
          </div>
          <Button
            type="submit"
            data-testid="contact-submit"
            disabled={loading}
            className="w-full h-12 rounded-full bm-grad-cta text-white hover:brightness-105 gap-2"
          >
            {loading ? "Sending..." : (<><Send className="h-4 w-4" /> Send Message</>)}
          </Button>
        </form>
      )}
    </div>
  );
}
