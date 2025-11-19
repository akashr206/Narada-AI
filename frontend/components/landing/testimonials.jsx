'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Narada AI has completely transformed how we manage our nursing staff. Shift coverage has improved by 40%.",
    author: "Dr. Sarah Chen",
    role: "Chief of Operations, Metro General",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    quote: "The predictive analytics for patient flow are incredibly accurate. We've reduced ED wait times significantly.",
    author: "James Wilson",
    role: "Hospital Administrator, St. Mary's",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    quote: "Implementation was seamless. The AI agents started providing actionable insights within the first week.",
    author: "Dr. Emily Rodriguez",
    role: "Clinical Director, HealthFirst",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            See what medical professionals are saying about Narada AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-card border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6" />
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
