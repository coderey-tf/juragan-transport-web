"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from "framer-motion";

function AnimatedCounter({
  from = 0,
  to,
  duration = 2.5,
  suffix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest) + suffix;
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: duration,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [count, inView, to, duration]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
}

export default function StatsBar() {
  return (
    <section className="bg-surface py-12 md:py-16 relative z-10 -mt-1">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary group-hover:scale-110 transition-transform duration-300">
            <AnimatedCounter to={500} suffix="+" />
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Pelanggan Puas
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary group-hover:scale-110 transition-transform duration-300">
            <AnimatedCounter to={20} suffix="+" />
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Unit Armada
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary group-hover:scale-110 transition-transform duration-300">
            <AnimatedCounter to={100} suffix="%" />
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Driver Profesional
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <span className="text-4xl md:text-5xl font-extrabold font-headline text-primary group-hover:scale-110 transition-transform duration-300">
            <AnimatedCounter to={24} suffix=" Jam" />
          </span>
          <p className="text-on-surface-variant font-medium mt-2">
            Layanan Siap
          </p>
        </div>
      </div>
    </section>
  );
}
