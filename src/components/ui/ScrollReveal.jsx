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

    <motion.div

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

    </motion.div>

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

    <motion.div

      variants={preset}

      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}

      className={className}

      {...props}

    >

      {children}

    </motion.div>

  );

}