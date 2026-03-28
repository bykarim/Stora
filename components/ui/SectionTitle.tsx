"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionTitle({ tag, title, subtitle, center = true }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {tag && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96E] mb-3 font-[family-name:var(--font-mono)]">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#F0EDE6] font-[family-name:var(--font-serif)] mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#A8A49C] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
