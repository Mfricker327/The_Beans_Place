import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "./ui/ScrollReveal";
import Separator from "./ui/Separator";
import Input, { Textarea } from "./ui/Input";
import Button from "./ui/Button";

const contactChannels = [
  {
    name: "Visit Our Roastery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    gradient: "from-amber-700 to-amber-500",
    accentColor: "var(--amber)",
    detail: "Beans Place, Strasburg, CO 80136",
    href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO",
  },
  {
    name: "Opening Hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-yellow-700 to-yellow-500",
    accentColor: "#ca8a04",
    detail: "Mon-Fri: 7am-6pm | Sat-Sun: 8am-4pm",
    href: "#contact",
  },
  {
    name: "Email Us",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25V6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 6l8.5 6 8.5-6" />
      </svg>
    ),
    gradient: "from-orange-700 to-orange-500",
    accentColor: "#c2410c",
    detail: "hello@thebeansplace.com",
    href: "mailto:hello@thebeansplace.com",
  },
  {
    name: "Call Us",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.211l1.293-.97c.376-.282.534-.657.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    gradient: "from-stone-700 to-stone-500",
    accentColor: "#78716c",
    detail: "(303) 555-BEAN",
    href: "tel:+13035552326",
  },
];

function TiltCard({ children, className, href, target, rel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(event) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Tag = href ? motion.a : motion.div;

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function ContactFormInline() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [touched, setTouched] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      window.setTimeout(() => setStatus(null), 4000);
    } catch (error) {
      setStatus("error");
      window.setTimeout(() => setStatus(null), 4000);
      console.error("Unable to submit contact form.", error);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="contact-form-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="mb-6">
        <h3 className="contact-form-title">Send a message</h3>
        <p className="contact-form-subtitle">
          We&apos;d love to hear from you. Fill out the form and we&apos;ll get
          back within 24 hours.
        </p>
      </div>

      <div className="contact-form-grid">
        <Input
          label="Your Name"
          id="contact-name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && !formData.name.trim() ? "Name is required" : undefined}
          required
        />
        <Input
          label="Email Address"
          id="contact-email"
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !formData.email.trim() ? "Email is required" : undefined}
          required
        />
      </div>

      <div className="mt-4">
        <Input
          label="Subject"
          id="contact-subject"
          name="subject"
          placeholder="What&apos;s this about?"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Message"
          id="contact-message"
          name="message"
          placeholder="Tell us what&apos;s on your mind..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message && !formData.message.trim() ? "Message is required" : undefined}
          required
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="contact-form-submit"
          disabled={status === "sending"}
        >
          {status === "sending"
            ? "Sending..."
            : status === "sent"
              ? "Message Sent!"
              : "Send Message"}
        </Button>
        {status === "error" && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-red-400"
            role="alert"
          >
            Something went wrong. Please try again.
          </motion.span>
        )}
      </div>
    </motion.form>
  );
}

export default function ContactSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    function handleMouseMove(event) {
      setMousePos({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="contact-section-wrap" ref={sectionRef}>
      <div className="contact-bg-effects">
        <div className="contact-bg-orb contact-bg--1" />
        <div className="contact-bg-orb contact-bg--2" />
        <div className="contact-bg-orb contact-bg--3" />
        <div className="contact-bg-grid" />
      </div>

      <div className="contact-inner">
        <ScrollReveal animation="fadeUp" className="contact-header">
          <motion.div
            className="contact-pill"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span>Connect &amp; Collaborate</span>
          </motion.div>

          <h1 className="h1-stack" style={{ color: "var(--cream)" }}>
            GET IN
            <br />
            <span className="muted" style={{ color: "var(--amber)" }}>
              TOUCH
            </span>
          </h1>

          <p className="lead--light" style={{ maxWidth: "52ch", margin: "10px auto 0" }}>
            Whether you&apos;re ordering beans, planning an event, or just
            stopping by to say hello, we&apos;d love to hear from you.
          </p>
          <Separator className="mt-4 mb-2 mx-auto max-w-48" />
        </ScrollReveal>

        <div className="contact-layout">
          <div className="contact-form-col">
            <ContactFormInline />
          </div>

          <div className="contact-info-col">
            <StaggerContainer className="contact-info-cards" staggerDelay={0.1}>
              {contactChannels.map((channel) => (
                <StaggerItem key={channel.name} animation="fadeUp">
                  <TiltCard
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-card-link"
                  >
                    <div className="contact-card">
                      <div
                        className="contact-card-accent"
                        style={{ background: channel.accentColor }}
                      />
                      <div className="contact-card-content">
                        <div className={`contact-card-icon bg-linear-to-br ${channel.gradient}`}>
                          {channel.icon}
                        </div>
                        <div className="contact-card-text">
                          <h3 className="contact-card-title">{channel.name}</h3>
                          <p className="contact-card-detail">{channel.detail}</p>
                        </div>
                        <div className="contact-card-arrow">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                      <div className="contact-card-shimmer" />
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>

      <div
        className="contact-mouse-glow"
        style={{ left: mousePos.x - 192, top: mousePos.y - 192 }}
      />
    </div>
  );
}
