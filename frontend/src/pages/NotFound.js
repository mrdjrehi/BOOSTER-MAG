import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="font-display text-7xl uppercase bm-text-grad">404</h1>
      <p className="mt-4 text-lg text-[var(--bm-muted)]">This page went viral and disappeared.</p>
      <Link to="/">
        <Button className="mt-6 rounded-full bm-grad-cta text-white">Back Home</Button>
      </Link>
    </div>
  );
}
