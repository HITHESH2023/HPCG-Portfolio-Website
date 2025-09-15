import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Html, Text } from "@react-three/drei";
import * as THREE from "three";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Award,
  GraduationCap,
  Cpu,
  Database,
  Box,
  Code,
} from "lucide-react";

const CONFIG = {
  name: "Hithesh Patel C G",
  role: "Full-Stack Developer (MERN)",
  location: "Mysuru, Karnataka, India",
  phone: "+91 9741615977",
  email: "cghithesh7@gmail.com",
  socials: {
    github: "https://github.com/HITHESH2023",
    linkedin: "https://www.linkedin.com/in/hithesh-c-g-a27a02262/", // add your handle
  },
  objective:
    "Aspiring Full-Stack Developer with a solid foundation in the MERN stack, SQL/NoSQL, and problem-solving with DSA. I love crafting delightful UIs and robust backends.",
  skillsPrimary: [
    { name: "HTML5", color: "from-orange-500 to-red-500", icon: <Code className="w-5 h-5" /> },
    { name: "CSS3", color: "from-blue-500 to-cyan-500", icon: <Code className="w-5 h-5" /> },
    { name: "JavaScript", color: "from-yellow-400 to-amber-500", icon: <Code className="w-5 h-5" /> },
    { name: "React.js", color: "from-cyan-400 to-blue-500", icon: <Code className="w-5 h-5" /> },
    { name: "Node.js", color: "from-green-400 to-emerald-500", icon: <Cpu className="w-5 h-5" /> },
    { name: "Express.js", color: "from-gray-400 to-gray-600", icon: <Box className="w-5 h-5" /> },
    { name: "MongoDB", color: "from-green-500 to-lime-400", icon: <Database className="w-5 h-5" /> },
    { name: "PostgreSQL", color: "from-indigo-400 to-blue-600", icon: <Database className="w-5 h-5" /> },
    { name: "Java", color: "from-orange-600 to-red-500", icon: <Code className="w-5 h-5" /> },
    { name: "Python", color: "from-sky-400 to-blue-500", icon: <Code className="w-5 h-5" /> },
    { name: "C", color: "from-purple-400 to-violet-500", icon: <Code className="w-5 h-5" /> },
  ],
  projects: [
    {
      title: "AutoHaven - AI Driven Marketplace for Vehicles",
      desc:
        "Full-stack platform for smart vehicle selection with Botpress AI chatbot, JWT auth, and clean UI/UX.",
      tech: ["React", "Node", "Express", "PostgreSQL", "Botpress"],
      repo: "https://github.com/HITHESH2023/AutoHaven",
      image: "https://res.cloudinary.com/dqxtox5rl/image/upload/v1757941764/AutoHaven_chn6wb.png",
    },
    {
      title: "DocConnect - Online Appointment System",
      desc:
        "MERN app for doctor-patient appointment booking with secure JWT-based auth and role dashboards.",
      tech: ["React", "Node", "Express", "MongoDB", "JWT"],
      repo: "https://github.com/HITHESH2023/DocConnect",
      image: "https://res.cloudinary.com/dqxtox5rl/image/upload/v1757944616/DocConnect_plql41.png",
    },
    {
      title: "Brick Breaker Game",
      desc:
        "Classic browser game with smooth controls, multiple levels, score tracking, and progress saving.",
      tech: ["HTML", "CSS", "JavaScript"],
      repo: "https://github.com/HITHESH2023/BrickBreaker",
      image: "https://res.cloudinary.com/dqxtox5rl/image/upload/v1757945048/BrickBreaker_lojyld.png",
    },
  ],
  education: [
    {
      title: "B.E. - Computer Science and Engineering",
      org: "The National Institute of Engineering, Mysuru",
      period: "2022 - 2026 (CGPA 9.20)",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Pre-University - PCMB",
      org: "Marimallappa PU College, Mysuru",
      period: "2020 - 2022 (90%)",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "SSLC",
      org: "Marimallappa High School, Mysuru",
      period: "2019 - 2020 (93.76%)",
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ],
  certs: [
    {
      name: "The Complete Full-Stack Web Development Bootcamp – Udemy",
      link: "https://drive.google.com/drive/folders/1b4w2b1jsFEIs1-hhCOSgemw-JsUeM6ej?usp=drive_link",
      image: "https://res.cloudinary.com/dqxtox5rl/image/upload/v1756665396/cert-udemy_cw8ign.jpg",
    },
  ],
};

// ---------------- 3D subcomponents ----------------
function SpinningKnot() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.35;
      ref.current.rotation.y += delta * 0.25;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[1.08, 0.28, 160, 32]} />
        <meshStandardMaterial metalness={0.85} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function BillboardBadge({ label }) {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh>
        <icosahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial roughness={0.3} metalness={0.6} />
        <Html center distanceFactor={8}>
          <div className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-900 shadow">
            {label}
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function FloatingLogos() {
  const logos = [
    "React",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Java",
    "JavaScript",
    "Express.js",
  ];

  return (
    <group>
      {logos.map((label, index) => {
        const angle = (index / logos.length) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <group key={label} position={[x, y, -1]}>
            <BillboardBadge label={label} />
          </group>
        );
      })}
    </group>
  );
}


function HeroScene() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }} className="h-full w-full">
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 6, 6]} castShadow intensity={1} />
      <Stars radius={60} depth={40} count={1200} factor={4} fade speed={0.6} />
      <Suspense fallback={null}>
        <SpinningKnot />
        <FloatingLogos />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
    </Canvas>
  );
}

// ---------------- UI Helpers ----------------
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative scroll-mt-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 text-base md:text-lg text-white/70"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur p-6 ${className}`}>
      {children}
    </div>
  );
}

// Skill card with mouse tilt
function SkillCard({ skill }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = (-y / rect.height) * 8; // rotateX
      const ry = (x / rect.width) * 8; // rotateY
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    };
    const handleLeave = () => (el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative p-4 rounded-xl text-white shadow-xl border border-white/10 bg-gradient-to-r ${skill.color} transition-transform will-change-transform`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-black/30">{skill.icon}</div>
        <div className="text-base font-semibold">{skill.name}</div>
      </div>
    </div>
  );
}

// ---------------- Main App ----------------
export default function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [bikeModal, setBikeModal] = useState(false);
  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio Contact – ${form.name || ""}`);
    const body = encodeURIComponent(`${form.message}

From: ${form.name} <${form.email}>`);
    return `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 text-white">
      {/* NAV */}
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative min-h-[82vh] grid place-items-center pt-10">
        <div className="absolute inset-0 -z-0">
          <HeroScene />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Hi, I’m {CONFIG.name.split(" ")[0]} –
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              {CONFIG.role}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg"
          >
            {CONFIG.objective}
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#projects" className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold shadow-lg">View Projects</a>
            <a href="#contact" className="px-5 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 font-semibold">Contact Me</a>
          </div>
          <div className="mt-16 animate-bounce inline-flex items-center gap-2 text-white/70">
            <ChevronDown className="w-5 h-5" /> Scroll
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About Me" subtitle="A quick snapshot of who I am and what I enjoy building.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="mt-3 text-white/80 leading-relaxed">
              I'm {CONFIG.name}, a {CONFIG.role}. I enjoy architecting scalable backends, designing crisp UIs, and
              sprinkling tasteful 3D interactions that bring interfaces to life. Outside code, I enjoy motorcycle touring, piano,
              reading books and PC gaming.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-white/80">
              <MapPin className="w-4 h-4" /> {CONFIG.location}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-white/80">
              <Mail className="w-4 h-4" /> {CONFIG.email}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-white/80">
              <Phone className="w-4 h-4" /> {CONFIG.phone}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold">Highlights</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>• Built an AI-assisted vehicle marketplace with Botpress and JWT auth.</li>
              <li>• Shipped DocConnect with role-based dashboards and MongoDB aggregation.</li>
              <li>• Designed and deployed a mobile-friendly Brick Breaker game.</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href={CONFIG.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={CONFIG.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="Tools and technologies I use regularly.">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CONFIG.skillsPrimary.map((s, i) => (
            <SkillCard key={i} skill={s} />
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="Curated work that I’m proud of.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group"
            >
              <Card className="h-full">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30">
                  <img src={p.image} alt={p.title} className="w-full h-auto object-contain bg-gray-800" />
                </div>


                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-indigo-200"
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Repo <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education" subtitle="Formal milestones that shaped my foundations.">
        <div className="relative">
          <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
          <div className="space-y-8">
            {CONFIG.education.map((e, i) => (
              <div key={i} className="relative">
                <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                  <div className="md:col-span-5 order-2 md:order-1">
                    <Card>
                      <h4 className="text-lg font-semibold">{e.title}</h4>
                      <p className="text-white/80 mt-1">{e.org}</p>
                      <p className="text-white/60 text-sm mt-1">{e.period}</p>
                    </Card>
                  </div>
                  <div className="md:col-span-2 order-1 md:order-2 grid place-items-center">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">{e.icon}</div>
                  </div>
                  <div className="md:col-span-5 order-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certs" title="Certifications" subtitle="Proof of continuous learning.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.certs.map((c, i) => (
            <Card key={i}>
              <div className="flex flex-col items-start gap-3">
                <img src={c.image} alt={c.name} className="rounded-lg border border-white/10 shadow-lg w-full object-cover" />
                <div>
                  <h4 className="font-semibold mt-2">{c.name}</h4>
                  <a href={c.link} className="text-sm text-indigo-300 hover:text-indigo-200">View</a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let’s build something great together.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold">Send a message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailto;
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-indigo-400"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-indigo-400"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Message</label>
                <textarea
                  rows="4"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-indigo-400"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold shadow-lg">
                Send via Email
              </button>
            </form>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Reach me</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> {CONFIG.email}</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> {CONFIG.phone}</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {CONFIG.location}</li>
              <li className="flex items-center gap-3"><Github className="w-4 h-4" /> <a className="hover:underline" href={CONFIG.socials.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li className="flex items-center gap-3"><Linkedin className="w-4 h-4" /> <a className="hover:underline" href={CONFIG.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </Card>
        </div>
      </Section>

      <footer className="py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} {CONFIG.name}. Built with React, R3F, and Tailwind.
      </footer>
    </div>
  );
}