import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, LayoutDashboard, User, BookOpen, ClipboardList,
  CalendarCheck, FileText, BarChart3, FileUser, Briefcase, Bot,
  Bell, Settings, LogOut, Search, Camera, Mail, Phone, MapPin,
  CalendarDays, BadgeCheck, Pencil, Star, Clock, Zap,
  ChevronDown, ArrowRight, Menu, X
} from "lucide-react";

import campusBanner from "../assets/campus-banner.jpg";
import profileImg from "../assets/profile.jpg";
import capLogo from "../assets/graduation-cap.png";
import "./StudentProfile1.css";


const menu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Profile", icon: User },
  { label: "My Courses", icon: BookOpen },
  { label: "Assignments", icon: ClipboardList },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Examinations", icon: FileText },
  { label: "Results", icon: BarChart3 },
  { label: "Resume Builder", icon: FileUser },
  { label: "Job Portal", icon: Briefcase },
  { label: "AI Assistant", icon: Bot },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

const student = {
  name: "Abisheik Kumar",
  id: "TOS2026001234",
  email: "abisheik.kumar@talentos.com",
  phone: "+91 98765 43210",
  location: "Hosur, Tamil Nadu",
  joined: "10 Nov 2026",
  quote: "Dream. Learn. Achieve.",
};

const personal = [
  ["Full Name", "Abisheik Kumar"],
  ["Email", "abisheik.kumar@talentos.com"],
  ["Phone", "+91 98765 43210"],
  ["Date of Birth", "15 Jan 2004"],
  ["Gender", "Male"],
  ["Address", "12, Gandhi Street, Hosur, Tamil Nadu - 635109"],
];

const academic = [
  ["Institute", "PMC College"],
  ["Course", "B.Sc Computer Science"],
  ["Department", "Computer Science"],
  ["Batch", "2026 - 2027"],
  ["Academic Year", "1st Year"],
  ["Study Year", "First Year"],
];



const svgProps = (size, className) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  className,
  fill: "currentColor",
  "aria-hidden": true,
});

function UserIcon({ size = 18, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <circle cx="12" cy="7.5" r="4.2" />
      <path d="M3.5 20.5c0-4.2 3.7-6.8 8.5-6.8s8.5 2.6 8.5 6.8v.3h-17v-.3Z" />
    </svg>
  );
}

function CapIcon({ size = 18, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 3.2 22.5 8.8 12 14.4 1.5 8.8 12 3.2Z" />
      <path d="M5.8 12.6v4.2c0 1.7 2.8 3.2 6.2 3.2s6.2-1.5 6.2-3.2v-4.2L12 15.9l-6.2-3.3Z" />
      <rect x="20.4" y="9.6" width="1.6" height="6" rx=".8" />
    </svg>
  );
}

function BarsIcon({ size = 18, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <rect x="3.5" y="11.5" width="4.5" height="9" rx="1.4" />
      <rect x="9.75" y="3.5" width="4.5" height="17" rx="1.4" />
      <rect x="16" y="8" width="4.5" height="12.5" rx="1.4" />
    </svg>
  );
}

function BookIcon({ size = 24, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 6.4C10.1 5 7.3 4.4 2.8 4.6v13.6c4.4-.2 7.1.4 9.2 1.9 2.1-1.5 4.8-2.1 9.2-1.9V4.6c-4.5-.2-7.3.4-9.2 1.8Z" />
      <path d="M12 7.2v11.6" stroke="#fff" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ClipIcon({ size = 24, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <rect x="4.5" y="4.5" width="15" height="17" rx="3.2" />
      <rect x="8.5" y="2.4" width="7" height="4.2" rx="1.6" stroke="#fff1d6" strokeWidth="1.2" />
      <path d="M8.5 11.2h7M8.5 15.4h4.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function TrophyIcon({ size = 24, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M6.8 3h10.4v5.4a5.2 5.2 0 0 1-10.4 0V3Z" />
      <path d="M6.8 5H3.8v2a3.4 3.4 0 0 0 3.4 3.4M17.2 5h3v2a3.4 3.4 0 0 1-3.4 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="10.9" y="13" width="2.2" height="4.4" />
      <rect x="7.6" y="17" width="8.8" height="3.6" rx="1.2" />
    </svg>
  );
}

function StarIcon({ size = 24, className }) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.5l-5.8 3.1 1.1-6.4L2.6 9.6l6.5-.9L12 2.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}



const stats = [
  { label: "Attendance", value: "95%", icon: BookIcon, tone: "blue" },
  { label: "CGPA", value: "8.5", icon: ClipIcon, tone: "amber" },
  { label: "Rank", value: "1", icon: TrophyIcon, tone: "purple" },
  { label: "Achievements", value: "5", icon: StarIcon, tone: "green" },
];

const activity = [
  ["Today, 10:30 AM", "Submitted assignment: Django Basics"],
  ["Yesterday, 04:15 PM", "Viewed: Advanced Python Concepts"],
  ["Nov 15, 2026", "Attended: Data Structures Lecture"],
  ["Nov 14, 2026", "Downloaded: Syllabus 2026"],
];

const quick = [
  { label: "View Courses", icon: BookOpen, tone: "blue" },
  { label: "Submit Assignment", icon: ClipboardList, tone: "amber" },
  { label: "Check Attendance", icon: CalendarCheck, tone: "purple" },
  { label: "Explore Jobs", icon: Briefcase, tone: "green" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const trend = [28, 52, 70, 58, 72, 95];



function smoothPath(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;

    const c1 = [
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
    ];

    const c2 = [
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
    ];

    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }

  return d;
}

function AttendanceChart() {
  const W = 420;
  const H = 150;
  const pad = 28;
  const top = 22;
  const base = H - 24;

  const [active, setActive] = useState(null);
  const svgRef = useRef(null);

  const yOf = (v) => base - (v / 100) * (base - top);

  const pts = trend.map((v, i) => [
    pad + (i * (W - pad * 2)) / (trend.length - 1),
    yOf(v),
  ]);

  const line = smoothPath(pts);
  const area = `${line} L${pts[pts.length - 1][0]},${base} L${pts[0][0]},${base} Z`;

  const track = (e) => {
    if (!svgRef.current) return;

    const r = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;

    let best = 0;

    pts.forEach((p, i) => {
      if (Math.abs(p[0] - x) < Math.abs(pts[best][0] - x)) {
        best = i;
      }
    });

    setActive(best);
  };

  const idx = active === null ? pts.length - 1 : active;
  const [px, py] = pts[idx];

  const label = active === null
    ? `${trend[idx]}%`
    : `${months[idx]} ${trend[idx]}%`;

  const tw = active === null ? 36 : 62;
  const tx = Math.min(Math.max(px - tw / 2, 2), W - tw - 2);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="chart"
      role="img"
      aria-label="Attendance trend"
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setActive(null);
      }}
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563eb" stopOpacity=".28" />
          <stop offset="1" stopColor="#2563eb" stopOpacity=".02" />
        </linearGradient>
      </defs>

      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}>
          <line
            x1={pad}
            x2={W - 8}
            y1={yOf(g)}
            y2={yOf(g)}
            className="grid-line"
          />
          <text x={0} y={yOf(g) + 3} className="tick">
            {g}%
          </text>
        </g>
      ))}

      <path d={area} className="area" />
      <path d={line} pathLength="1" className="trend" />

      {active !== null && (
        <line x1={px} x2={px} y1={py} y2={base} className="guide" />
      )}

      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === idx ? 5 : 3.5}
          className={`dot ${i === idx ? "on" : ""}`}
        />
      ))}

      <rect x={tx} y={py - 27} width={tw} height="17" rx="5" className="tag" />

      <text
        x={tx + tw / 2}
        y={py - 15}
        textAnchor="middle"
        className="tag-text"
      >
        {label}
      </text>

      {months.map((m, i) => (
        <text
          key={m}
          x={pts[i][0]}
          y={H - 4}
          textAnchor="middle"
          className={`tick ${i === idx && active !== null ? "tick-on" : ""}`}
        >
          {m}
        </text>
      ))}
    </svg>
  );
}



function SkillsArt() {
  return (
    <svg
      className="skills-art"
      viewBox="0 0 300 120"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <path d="M0 120V78C30 62 50 50 80 64C105 76 120 40 150 36C180 32 190 60 215 56C245 52 265 40 300 58V120Z" fill="#dbe7fb" />
      <path d="M0 120V94C40 82 70 86 100 92C140 100 170 80 210 86C250 92 275 82 300 88V120Z" fill="#cfdff8" />

      <rect x="95" y="46" width="98" height="60" rx="6" fill="#2b4fb8" />
      <rect x="100" y="51" width="88" height="50" rx="4" fill="#0f2260" />
      <path d="M130 68l-9 9 9 9M158 68l9 9-9 9M149 64l-10 26" fill="none" stroke="#8ec0ff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 106H206L212 114Q212 118 207 118H81Q76 118 76 114Z" fill="#b9cbee" />
      <rect x="128" y="106" width="32" height="3" rx="1.5" fill="#9fb4e0" />

      <path d="M216 118l2-13h14l2 13Z" fill="#3b6fd8" />
      <path d="M225 105C217 98 217 90 224 85C231 91 231 99 225 105Z" fill="#7bc67e" />

      <path d="M247 118l3-18h20l3 18Z" fill="#2f5fd0" />
      <path d="M260 100C246 94 243 78 251 70C263 78 265 92 260 100Z" fill="#3fa75a" />
      <path d="M260 100C273 92 277 76 269 66C257 74 255 90 260 100Z" fill="#58bf6e" />
      <path d="M260 100C251 98 239 96 235 86C247 84 257 90 260 100Z" fill="#2f8f4b" />
    </svg>
  );
}

function PromoCap() {
  return (
    <svg className="promo-cap" viewBox="0 0 72 56" aria-hidden="true">
      <defs>
        <linearGradient id="capTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#f5a623" />
        </linearGradient>
        <linearGradient id="capBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2a31f" />
          <stop offset="1" stopColor="#c87a0c" />
        </linearGradient>
      </defs>

      <path d="M18 28V41C18 46 26 51 36 51C46 51 54 46 54 41V28L36 36Z" fill="url(#capBase)" />
      <path d="M36 4L68 19L36 34L4 19Z" fill="url(#capTop)" />
      <path d="M36 10L56 19L36 28L16 19Z" fill="#ffd45e" opacity=".55" />
      <path d="M62 21V40" stroke="#f5a623" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M59 40H65L66 49H58Z" fill="#f5a623" />
    </svg>
  );
}

function CornerSwoosh() {
  return (
    <svg className="corner-swoosh" viewBox="0 0 140 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 100C60 92 115 60 140 18V52C112 84 72 98 38 100Z" fill="#2f6df0" />
      <path d="M40 100C85 96 120 82 140 58V82C125 93 100 100 78 100Z" fill="#f7b52c" />
    </svg>
  );
}

function TopSwoosh() {
  return (
    <svg className="top-swoosh" viewBox="0 0 360 64" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="swLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e8effc" stopOpacity="0" />
          <stop offset="0.45" stopColor="#e9effc" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f0f4fd" />
        </linearGradient>
        <linearGradient id="swBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a86ec" />
          <stop offset="1" stopColor="#1f55cc" />
        </linearGradient>
      </defs>

      <path d="M30 0H360V64H0C30 44 42 22 30 0Z" fill="url(#swLight)" />
      <path d="M61 0H135C120 24 85 48 48 64H10C40 48 60 24 61 0Z" fill="url(#swBlue)" />
      <path d="M139 0H191C172 26 130 50 92 64H53C95 50 136 26 139 0Z" fill="#f7b52c" />
    </svg>
  );
}



function InfoCard({ title, icon: Icon, rows, action }) {
  return (
    <section className="card">
      <header className="card-head">
        <h3>
          <Icon size={18} className="ic-fill" />
          {title}
        </h3>

        {action && (
          <button className="btn-outline" type="button">
            <Pencil size={12} /> {action}
          </button>
        )}
      </header>

      <dl className="rows">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}



function ProfileMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (label) => {
    setOpen(false);
    onNavigate(label);
  };

  return (
    <div className="menu-wrap" ref={ref}>
      <button
        type="button"
        className={`user ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <img src={profileImg} alt="" className="avatar sm" />

        <div className="user-text">
          <strong>{student.name}</strong>
          <small>
            Student <ChevronDown size={11} />
          </small>
        </div>

        <ChevronDown size={16} className="chev" />
      </button>

      {open && (
        <div className="dropdown" role="menu">
          <div className="dd-head">
            <img src={profileImg} alt="" className="avatar md" />
            <div>
              <strong>{student.name}</strong>
              <span>{student.email}</span>
            </div>
          </div>

          <div className="dd-line" />

          <button className="dd-item" type="button" role="menuitem" onClick={() => go("My Profile")}>
            <User size={18} /> My Profile
          </button>

          <button className="dd-item" type="button" role="menuitem" onClick={() => go("Settings")}>
            <Settings size={18} /> Settings
          </button>

          <button className="dd-item logout" type="button" role="menuitem" onClick={() => go("Logout")}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}



const initialNotifs = [
  {
    id: 1,
    title: "Assignment graded",
    text: "Django Basics: you scored 9/10",
    time: "2 min ago",
    unread: true,
    tone: "green",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "New lecture uploaded",
    text: "Advanced Python Concepts is now available",
    time: "1 hour ago",
    unread: true,
    tone: "blue",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Attendance reminder",
    text: "Data Structures lecture today at 2:00 PM",
    time: "Yesterday",
    unread: true,
    tone: "amber",
    icon: CalendarCheck,
  },
  {
    id: 4,
    title: "Syllabus updated",
    text: "Syllabus 2026 has a new revision",
    time: "2 days ago",
    unread: false,
    tone: "purple",
    icon: FileText,
  },
];

function NotificationBell({
  items,
  unread,
  open,
  setOpen,
  onRead,
  onReadAll,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className="notif-wrap" ref={ref}>
      <button
        type="button"
        className="bell"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell size={22} />
        {unread > 0 && <i>{unread}</i>}
      </button>

      {open && (
        <div className="notif-panel" role="dialog" aria-label="Notifications">
          <div className="np-head">
            <strong>Notifications</strong>

            <button
              type="button"
              className="np-link"
              onClick={onReadAll}
              disabled={unread === 0}
            >
              Mark all as read
            </button>
          </div>

          <ul className="np-list">
            {items.map(({ id, title, text, time, unread: isNew, tone, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`np-item ${isNew ? "unread" : ""}`}
                  onClick={() => onRead(id)}
                >
                  <span className={`np-ic np-${tone}`}>
                    <Icon size={16} />
                  </span>

                  <span className="np-body">
                    <strong>{title}</strong>
                    <span>{text}</span>
                    <small>{time}</small>
                  </span>

                  {isNew && <i className="np-new" aria-label="Unread" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



export default function StudentProfile1({ onReturnToProfile }) {
  const [active, setActive] = useState("My Profile");

  const [navOpen, setNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifs, setNotifs] = useState(initialNotifs);
  const [notifOpen, setNotifOpen] = useState(false);


  const searchRef = useRef(null);

  const unread = notifs.filter((n) => n.unread).length;


  const filteredMenu = menu.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );


  const readOne = (id) => {
    setNotifs((list) =>
      list.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const readAll = () => {
    setNotifs((list) =>
      list.map((n) => ({ ...n, unread: false }))
    );
  };

  const pick = (label) => {
    setNavOpen(false);
    setSearchQuery("");

    if (label === "Logout") {
      doLogout();
      return;
    }

    if (label === "Notifications") {
      setNotifOpen(true);
      setActive(label);
      return;
    }

    setActive(label);
  };


  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        setNotifOpen(false);
      }

    
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, []);

 
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

 

const doLogout = () => {
  setNotifOpen(false);

  if (onReturnToProfile) {
    onReturnToProfile();
  }
};

  return (
    <div className="shell">

     
      <div
        className={`overlay ${navOpen ? "show" : ""}`}
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      />

     
      <aside className={`sidebar ${navOpen ? "open" : ""}`}>

        <div className="brand-row">
          <div className="brand">
            <img src={capLogo} alt="" className="brand-logo" />

            <span>
              Artly<b>soft</b>
              <br />
              Talent<b>OS</b>
            </span>
          </div>

          <button
            className="close-btn"
            onClick={() => setNavOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        <nav>
          {menu.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => pick(label)}
              type="button"
            >
              <Icon size={20} />

              <span>{label}</span>

              {label === "Notifications" && unread > 0 && (
                <b className="badge">{unread}</b>
              )}
            </button>
          ))}
        </nav>

        <div className="promo">
          <PromoCap />

          <p>
            Dream Bigger...
            <br />
            Build Your Career
          </p>

          <button type="button">
            Explore Jobs <ArrowRight size={16} />
          </button>
        </div>

        <footer>
          <span>
            © 2026 TalentOS.
            
            All rights reserved.
          </span>

        </footer>
      </aside>
     

      
      <main className="main">

      
        <div className="topbar">
          <TopSwoosh />

          <div className="topbar-left">

         
            <button
              className="menu-btn"
              onClick={() => setNavOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={navOpen}
              type="button"
            >
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

         
            <div className="search-container">
              <label className="search">
                <Search size={18} />

                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search anything... (Ctrl + K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />

                {searchQuery && (
                  <button
                    className="search-clear"
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </label>

              {searchQuery.trim() && (
                <div className="search-results">
                  {filteredMenu.length > 0 ? (
                    filteredMenu.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => pick(label)}
                      >
                        <Icon size={17} />
                        <span>{label}</span>
                        <ArrowRight size={15} />
                      </button>
                    ))
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          
          <div className="top-right">
            <NotificationBell
              items={notifs}
              unread={unread}
              open={notifOpen}
              setOpen={setNotifOpen}
              onRead={readOne}
              onReadAll={readAll}
            />

            <span className="vr" aria-hidden="true" />

            <ProfileMenu onNavigate={pick} />
          </div>
        </div>

        
        <div
          className="hero"
          style={{ "--banner": `url(${campusBanner})` }}
        >
          <p className="crumbs">
            Dashboard &rsaquo; <b>{active}</b>
          </p>

          <h1>Student Profile</h1>

          <p className="sub">
            View and manage your personal and academic information
          </p>
        </div>

    
        <section className="card profile-top">

          <div className="photo">
            <img
              src={profileImg}
              alt={student.name}
              className="avatar lg"
            />

            <button className="cam" aria-label="Change photo" type="button">
              <Camera size={15} />
            </button>
          </div>

          <div className="who">
            <h2>
              {student.name}
              <BadgeCheck size={20} color="#2563eb" />
            </h2>

            <p className="sid">Student ID: {student.id}</p>

            <span className="active-pill">● Active</span>

            <p className="quote">"{student.quote}"</p>
          </div>

          <ul className="contact">
            <li>
              <span className="ic"><Mail size={15} /></span>
              {student.email}
            </li>

            <li>
              <span className="ic"><Phone size={15} /></span>
              {student.phone}
            </li>

            <li>
              <span className="ic"><MapPin size={15} /></span>
              {student.location}
            </li>

            <li>
              <span className="ic"><CalendarDays size={15} /></span>
              Joined on: {student.joined}
            </li>
          </ul>

          <div className="course-box">
            <CornerSwoosh />

            <GraduationCap size={30} className="cap-ic" />

            <div>
              <small>Course &amp; Department</small>

              <strong>B.Sc Computer Science</strong>

              <span>Computer Science</span>

              <button className="btn-white" type="button">
                View Details <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>

        
        <div className="grid">

          <InfoCard
            title="Personal Information"
            icon={UserIcon}
            rows={personal}
            action="Edit Profile"
          />

          <InfoCard
            title="Academic Information"
            icon={CapIcon}
            rows={academic}
          />

         
          <section className="card">
            <header className="card-head">
              <h3>
                <BarsIcon size={18} className="ic-fill" />
                My Academic Stats
              </h3>

              <a href="#reports" className="link">
                View Reports <ArrowRight size={12} />
              </a>
            </header>

            <div className="stat-row">
              {stats.map(({ label, value, icon: Icon, tone }) => (
                <div key={label} className={`stat ${tone}`}>
                  <Icon size={20} />
                  <strong>{value}</strong>
                  <small>{label}</small>
                </div>
              ))}
            </div>

            <AttendanceChart />
          </section>

         
          <section className="card skills-card">
            <header className="card-head">
              <h3>
                <Star size={17} className="ic-gold" />
                Skills &amp; Interests
              </h3>
            </header>

            <h4>Technical Skills</h4>

            <div className="chips">
              {["Python", "Django", "React", "SQL", "JavaScript"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>

            <h4>Interests</h4>

            <div className="chips">
              {["AI & ML", "Web Development", "Open Source"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>

            <SkillsArt />
          </section>

          <section className="card">
            <header className="card-head">
              <h3>
                <Clock size={17} className="ic-blue" />
                Recent Activity
              </h3>

              <a href="#activity" className="link">
                View All <ArrowRight size={12} />
              </a>
            </header>

            <ol className="timeline">
              {activity.map(([when, what]) => (
                <li key={when}>
                  <strong>{when}</strong>
                  <span>{what}</span>
                </li>
              ))}
            </ol>
          </section>

       
          <section className="card quick-card">
            <header className="card-head">
              <h3>
                <Zap size={17} className="ic-gold" />
                Quick Actions
              </h3>
            </header>

            <div className="quick">
              {quick.map(({ label, icon: Icon, tone }) => (
                <button
                  key={label}
                  className={`q tone-${tone}`}
                  type="button"
                >
                  <span className="q-ic">
                    <Icon size={20} />
                  </span>

                  <span className="q-label">{label}</span>
                </button>
              ))}
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}