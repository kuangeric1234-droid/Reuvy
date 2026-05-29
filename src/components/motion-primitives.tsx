"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  animate,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*  Reveal — staggered fade/slide on enter viewport                           */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span" | "li" | "ul";
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.61, 0.27, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stagger — children animate in sequence                                    */
/* -------------------------------------------------------------------------- */

export function Stagger({
  children,
  className,
  delayChildren = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.21, 0.61, 0.27, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CountUp — animates a number on enter viewport                              */
/* -------------------------------------------------------------------------- */

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.21, 0.61, 0.27, 1],
      onUpdate(v) {
        setValue(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lift — card hover lift + shadow boost                                     */
/* -------------------------------------------------------------------------- */

export function Lift({
  children,
  className,
  amount = -6,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: amount, transition: { duration: 0.25, ease: "easeOut" } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Spotlight — soft glow follows cursor inside element                       */
/* -------------------------------------------------------------------------- */

export function Spotlight({
  children,
  className,
  color = "rgba(155,183,209,0.35)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 30, mass: 0.4 });

  const background = useTransform(
    [sx, sy],
    ([lx, ly]) =>
      `radial-gradient(220px circle at ${lx}px ${ly}px, ${color}, transparent 60%)`,
  );

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        x.set(-200);
        y.set(-200);
      }}
      className={clsx("relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Parallax — translateY tied to scroll                                       */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee — infinite scroll row, both directions                             */
/* -------------------------------------------------------------------------- */

export function Marquee({
  children,
  reverse = false,
  speed = 38,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Underline — animated link underline                                       */
/* -------------------------------------------------------------------------- */

export function HoverUnderline({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <a href={href} className={clsx("group relative inline-flex items-center", className)}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
    </a>
  );
}

export { motion };
