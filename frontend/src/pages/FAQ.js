import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/content";

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-5xl uppercase text-center">Frequently Asked Questions</h1>
      <p className="text-center text-[var(--bm-muted)] mt-3">
        Everything you need to know about BOOSTER MAG.
      </p>
      <Accordion type="single" collapsible className="mt-8" data-testid="faq-page-accordion">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-[var(--bm-muted)]">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
