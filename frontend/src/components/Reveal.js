import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Marquee = ({ items, className = "", fast = false, testId = "marquee" }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full" data-testid={testId}>
      <div className={`marquee ${fast ? "marquee-fast" : ""} ${className}`}>
        {doubled.map((it, i) => (
          <span key={i} className="px-6 whitespace-nowrap flex items-center">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Reveal;
