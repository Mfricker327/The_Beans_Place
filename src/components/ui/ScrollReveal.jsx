import { useRef } from "react";
import { useInView, motion as Motion } from "framer-motion";

const presets = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
  className,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const preset = presets[animation] || presets.fadeUp;

  return (
    <Motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={preset}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...props}
    >
      {children}
    </Motion.div>
  );
}

export function StaggerContainer({

  children,

  staggerDelay = 0.12,

  className,

  once = true,

  amount = 0.15,

  ...props

}) {

  const ref = useRef(null);

  const isInView = useInView(ref, { once, amount });

  return (

    <Motion.div

      ref={ref}

      initial="hidden"

      animate={isInView ? "visible" : "hidden"}

      variants={{

        hidden: {},

        visible: { transition: { staggerChildren: staggerDelay } },

      }}

      className={className}

      {...props}

    >

      {children}

    </Motion.div>

  );

}

export function StaggerItem({

  children,

  animation = "fadeUp",

  duration = 0.5,

  className,

  ...props

}) {

  const preset = presets[animation] || presets.fadeUp;

  return (

    <Motion.div

      variants={preset}

      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}

      className={className}

      {...props}

    >

      {children}

    </Motion.div>

  );

}