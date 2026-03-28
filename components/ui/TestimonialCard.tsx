"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  text: string;
  index?: number;
}

export function TestimonialCard({ name, role, company, text, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#1A1A17] border border-[#2A2A25] rounded-xl p-6 hover:border-[#C8A96E]/20 transition-colors"
    >
      <Quote size={24} className="text-[#C8A96E] mb-4 opacity-50" />
      <p className="text-[#A8A49C] text-sm leading-relaxed mb-6 italic">&ldquo;{text}&rdquo;</p>
      <div>
        <div className="font-semibold text-[#F0EDE6] text-sm">{name}</div>
        <div className="text-xs text-[#A8A49C]">{role} — {company}</div>
      </div>
    </motion.div>
  );
}
