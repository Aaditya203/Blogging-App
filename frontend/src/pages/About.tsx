import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import {
  Heart,
  PenLine,
  Sparkles,
  Zap,
  Users,
  Bookmark,
  MessageCircle,
  ShieldCheck,
  Wand2,
  Mail,
} from "lucide-react";

import {FaChrome as Chrome, FaInstagram as Instagram} from "react-icons/fa"
// ---- scroll reveal (no extra libraries, respects prefers-reduced-motion) ----
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---- content ----
const features = [
  {
    icon: Chrome,
    title: "Google Auth",
    desc: "Sign in with one tap. No passwords to remember or reset.",
  },
  {
    icon: PenLine,
    title: "Rich Text Editor",
    desc: "Format your thoughts without fighting the tools.",
  },
  {
    icon: Heart,
    title: "Likes",
    desc: "See what resonates with readers, in real time.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    desc: "Smart writing assistance built right into the editor.",
  },
  {
    icon: Zap,
    title: "Edge-Fast",
    desc: "Served from the edge, so pages load almost instantly.",
  },
];

const upcoming = [
  { icon: Users, title: "Follow" },
  { icon: Bookmark, title: "Bookmarks" },
  { icon: MessageCircle, title: "Comments" },
  { icon: ShieldCheck, title: "Admin panel" },
  { icon: Wand2, title: "AI review before you publish" },
];

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero */}
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
            About
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900 max-w-2xl">
            A quieter way to write online
            <span className="inline-block w-[2px] h-8 sm:h-11 bg-black ml-1 align-middle animate-pulse" />
          </h1>
          <p className="mt-4 text-gray-500 max-w-lg text-sm sm:text-base">
            No noise, no clutter — just a clean space to write, publish, and
            see what people think of it.
          </p>
        </Reveal>

        {/* Features */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              What's live right now
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="h-full rounded-3xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Future scope */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              What's coming next
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Actively being built — and more after this.
            </p>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            {upcoming.map((u, i) => {
              const Icon = u.icon;
              return (
                <Reveal key={u.title} delay={i * 60}>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{u.title}</span>
                    <span className="ml-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 animate-pulse">
                      Soon
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 sm:mt-24 mb-8">
          <Reveal>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Say hello
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Reveal delay={0}>
              
              <a href="mailto:adityas20032005@gmail.com"
                className="flex items-center gap-4 rounded-3xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 truncate">
                    adityas20032005@gmail.com
                  </p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={80}>
              
              <a  href="https://instagram.com/aaditya_sharma19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shrink-0">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Instagram</p>
                  <p className="font-medium text-gray-900 truncate">
                    @aaditya_sharma19
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}