import  { useEffect, useMemo, useRef, useState } from "react";
import {
  FiSearch, FiChevronRight, FiChevronDown, FiPlus,
  FiEye, FiEdit2, FiTrash2, FiArrowUp,
  FiX, FiCheckCircle, FiUpload, FiMail, FiBookOpen, FiLayers,
} from "react-icons/fi";
import { FaHome, FaUserFriends, FaUsers, FaCheck, FaPause } from "react-icons/fa";
import "./Faculty.css";

const HomeIcon = () => <FaHome />;
const FacultyIcon = () => <FaUserFriends />;

const BannerBg = () => (
  <svg
    className="fac-banner-bg"
    viewBox="0 0 800 90"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="fbBase" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.28" stopColor="#f5f8ff" />
        <stop offset="0.52" stopColor="#e6edff" />
        <stop offset="0.78" stopColor="#eef2ff" />
        <stop offset="1" stopColor="#f5f7ff" />
      </linearGradient>
      <linearGradient id="fbFan" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4f86ff" stopOpacity="0.30" />
        <stop offset="0.55" stopColor="#7aa2ff" stopOpacity="0.14" />
        <stop offset="1" stopColor="#a9c1ff" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id="fbMid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6f9bff" stopOpacity="0.20" />
        <stop offset="1" stopColor="#c9d8ff" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id="fbFar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#bcd0ff" stopOpacity="0.22" />
        <stop offset="1" stopColor="#e8eeff" stopOpacity="0.02" />
      </linearGradient>
    </defs>

    <rect width="800" height="90" fill="url(#fbBase)" />

    <polygon points="330,0 530,0 300,90 238,90" fill="url(#fbFan)" />
    <polygon points="410,0 640,0 440,90 372,90" fill="url(#fbMid)" />
    <polygon points="520,0 700,0 800,56 800,90 566,90" fill="url(#fbFar)" />
    <polygon points="700,0 800,0 800,44" fill="url(#fbFar)" />

    <g fill="none" stroke="#ffffff" strokeLinecap="round">
      <line x1="436" y1="0" x2="502" y2="90" strokeOpacity="0.95" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <line x1="512" y1="0" x2="418" y2="84" strokeOpacity="0.85" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <line x1="600" y1="0" x2="800" y2="60" strokeOpacity="0.55" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="560" y1="0" x2="660" y2="90" strokeOpacity="0.45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </g>
  </svg>
);

const GroupIcon = () => <FaUsers />;
const CheckIcon = () => <FaCheck />;
const PauseIcon = () => <FaPause />;

const TONE_COLOR = { blue: "#2563eb", green: "#22b35a", orange: "#f59e0b", purple: "#8b5cf6" };

const sparkPath = (pts, smooth = false) => {
  const step = 120 / (pts.length - 1);
  const p = pts.map((y, i) => [i * step, y]);
  if (!smooth) {
    return p.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y}`).join(" ");
  }
  let d = `M${p[0][0].toFixed(1)} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const mx = ((p[i][0] + p[i + 1][0]) / 2).toFixed(1);
    const my = ((p[i][1] + p[i + 1][1]) / 2).toFixed(1);
    d += ` Q${p[i][0].toFixed(1)} ${p[i][1]} ${mx} ${my}`;
  }
  const last = p[p.length - 1];
  return `${d} L${last[0].toFixed(1)} ${last[1]}`;
};

const STATS = [
  { value: 48, label: "Total Faculty", change: "+8%", icon: <GroupIcon />, tone: "blue", dot: true, smooth: true,
    pts: [46, 39, 43, 31, 38, 25, 33, 20, 25, 11, 7] },
  { value: 45, label: "Active Faculty", change: "+10%", icon: <CheckIcon />, tone: "green", dot: false, smooth: true,
    pts: [47, 45, 40, 43, 35, 38, 28, 31, 21, 23, 9] },
  { value: 3, label: "On Leave", change: "+1%", icon: <PauseIcon />, tone: "orange", dot: false, smooth: true,
    pts: [48, 44, 46, 39, 41, 33, 36, 28, 29, 19, 10] },
  { value: 2, label: "Inactive Faculty", change: "+0%", icon: <GroupIcon />, tone: "purple", dot: false, smooth: true,
    pts: [47, 44, 46, 38, 42, 32, 36, 26, 28, 16, 6] },
];

const FACULTY = [
  { id: 1, name: "Aravind Kumar", email: "aravind@artlysoft.com", dept: "Computer Science", courses: "Python, Django, Web Dev", status: "Active", photo: "" },
  { id: 2, name: "Priya Sharma", email: "priya@artlysoft.com", dept: "Data Science", courses: "Data Science, ML", status: "Active", photo: "" },
  { id: 3, name: "Rahul Verma", email: "rahul@artlysoft.com", dept: "Artificial Intelligence", courses: "AI, Machine Learning", status: "On Leave", photo: "" },
  { id: 4, name: "Sneha Patel", email: "sneha@artlysoft.com", dept: "Computer Science", courses: "Web Development, React", status: "Active", photo: "" },
  { id: 5, name: "Vikram Singh", email: "vikram@artlysoft.com", dept: "Data Science", courses: "Python, Data Analytics", status: "Inactive", photo: "" },
];

const COLORS = ["#1f5eff", "#22a85a", "#f59e0b", "#8b5cf6", "#ef4444"];

function Avatar({ name, photo, size = 54, index = 0 }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="avatar avatar-img"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: COLORS[index % COLORS.length], fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

function FilterSelect({ value, onChange, placeholder, options, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const emitChange = (nextVal) => {
    onChange({ target: { value: nextVal } });
    setOpen(false);
  };

  const items = ["", ...options];

  return (
    <div
      ref={wrapRef}
      className={`f-select-wrap ${open ? "is-open" : ""}`}
      style={{ overflow: "visible" }}
    >
      <button
        type="button"
        className="f-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || placeholder}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          outline: "none",
          background: "transparent",
          padding: "0 42px 0 14px",
          font: "inherit",
          fontSize: "13px",
          fontWeight: 500,
          color: "#16296b",
          textAlign: "left",
          cursor: "pointer",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value || placeholder}
      </button>
      <span className="f-select-arrow" aria-hidden="true">
        <FiChevronDown />
      </span>

      {open && (
        <ul
          role="listbox"
          className="f-select-menu"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: "100%",
            margin: 0,
            padding: "4px 0",
            listStyle: "none",
            background: "#ffffff",
            border: "1px solid #dce4f7",
            borderRadius: "8px",
            boxShadow: "0 10px 24px rgba(15, 40, 120, .14)",
            zIndex: 50,
          }}
        >
          {items.map((opt) => {
            const label = opt || placeholder;
            const active = value === opt;
            return (
              <li
                key={label}
                role="option"
                aria-selected={active}
                onClick={() => emitChange(opt)}
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  fontWeight: active ? 500 : 400,
                  color: active ? "#ffffff" : "#16296b",
                  backgroundColor: active ? "#1f5eff" : "#ffffff",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1f5eff";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = active ? "#1f5eff" : "#ffffff";
                  e.currentTarget.style.color = active ? "#ffffff" : "#16296b";
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ModalSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const handlePick = (opt) => {
    onChange({ target: { value: opt } });
    setOpen(false);
  };

  return (
    
    <div
      ref={wrapRef}
      className="fm-field"
      style={{ position: "relative", overflow: "visible" }}
    >
      <span>{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          height: "44px",
          border: open ? "1px solid #1f5eff" : "1px solid #e4e9f7",
          borderRadius: "8px",
          padding: "0 36px 0 12px",
          font: "inherit",
          fontSize: "14px",
          color: "#0b1854",
          background: "#ffffff",
          boxShadow: open ? "0 0 0 3px rgba(31, 94, 255, .15)" : "none",
          textAlign: "left",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outline: "none",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </span>
        <FiChevronDown
          style={{
            position: "absolute",
            right: "12px",
            color: "#1f5eff",
            fontSize: "16px",
            flexShrink: 0,
          }}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: "4px 0",
            listStyle: "none",
            background: "#ffffff",
            border: "1px solid #b9cdfd",
            borderRadius: "8px",
            boxShadow: "0 10px 24px rgba(31, 94, 255, .18)",
            zIndex: 60,
          }}
        >
          {options.map((opt) => {
            const active = value === opt;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={active}
                onClick={() => handlePick(opt)}
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  fontWeight: active ? 500 : 400,
                  color: active ? "#ffffff" : "#0d2aa0",
                  backgroundColor: active ? "#1f5eff" : "#ffffff",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1f5eff";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = active ? "#1f5eff" : "#ffffff";
                  e.currentTarget.style.color = active ? "#ffffff" : "#0d2aa0";
                }}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const statusClass = (s) =>
  s === "Active" ? "st-active" : s === "On Leave" ? "st-leave" : "st-inactive";

const emptyForm = {
  name: "",
  email: "",
  dept: "Computer Science",
  courses: "",
  status: "Active",
  photo: "",
  fileName: "",
};

export default function Faculty() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");
  const [courseSecondary, setCourseSecondary] = useState("");
  const [status, setStatus] = useState("");
  const [applied, setApplied] = useState({
    query: "",
    dept: "",
    course: "",
    courseSecondary: "",
    status: "",
  });
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState(FACULTY);
  const [formMode, setFormMode] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [viewFaculty, setViewFaculty] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState("");

  const anyModalOpen = Boolean(formMode || viewFaculty || deleteTarget);

  const closeAllModals = () => {
    setFormMode(null);
    setEditingId(null);
    setViewFaculty(null);
    setDeleteTarget(null);
    setErrors({});
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setFormMode("add");
  };

  const openEditModal = (item) => {
    setViewFaculty(null);
    setEditingId(item.id);
    setForm({
      name: item.name,
      email: item.email,
      dept: item.dept,
      courses: item.courses,
      status: item.status,
      photo: item.photo || "",
      fileName: item.photo ? "Uploaded photo" : "",
    });
    setErrors({});
    setFormMode("edit");
  };

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "Please choose an image file (JPG, PNG, WebP)" }));
      return;
    }
    setErrors((prev) => ({ ...prev, photo: "" }));
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, photo: reader.result, fileName: file.name }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.courses.trim()) err.courses = "Add at least one course";
    setErrors(err);
    if (Object.keys(err).length) return;

    const cleanData = {
      name: form.name.trim(),
      email: form.email.trim(),
      dept: form.dept,
      courses: form.courses.trim(),
      status: form.status,
      photo: form.photo,
    };

    if (formMode === "edit" && editingId != null) {
      setRows((r) => r.map((item) => (item.id === editingId ? { ...item, ...cleanData } : item)));
      setToast(`${cleanData.name} details updated`);
    } else {
      setRows((r) => [...r, { id: Date.now(), ...cleanData }]);
      setToast(`${cleanData.name} added to faculty`);
    }

    closeAllModals();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    setRows((r) => r.filter((x) => x.id !== id));
    setSelected((s) => s.filter((x) => x !== id));
    closeAllModals();
    setToast(`${name} removed from faculty`);
  };

  useEffect(() => {
    if (!anyModalOpen) return;
    const onKey = (e) => e.key === "Escape" && closeAllModals();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyModalOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (!q || [r.name, r.email, r.dept].some((v) => v.toLowerCase().includes(q))) &&
        (!applied.dept || r.dept === applied.dept) &&
        (!applied.course || r.courses.includes(applied.course)) &&
        (!applied.courseSecondary || r.courses.includes(applied.courseSecondary)) &&
        (!applied.status || r.status === applied.status)
    );
  }, [rows, applied]);

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.includes(r.id));
  const toggleAll = () => setSelected(allChecked ? [] : filtered.map((r) => r.id));
  const toggleOne = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const depts = [...new Set(rows.map((f) => f.dept))];
  const modalDeptOptions = [...new Set(["Computer Science", "Data Science", "Artificial Intelligence", ...depts])];
  const courseOptions = ["Python", "Django", "React", "ML", "AI"];

  return (
    <div
      className="fac-layout"
      style={{
        width: "100%",
        maxWidth: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      <main
        className="fac-main"
        style={{
          width: "100%",
          maxWidth: "100vw",
          margin: 0,
          padding: "16px 12px 24px",
        }}
      >
        <section className="fac-banner">
          <BannerBg />
          <div className="fac-banner-in">
            <div className="fac-crumb">
              <span className="crumb-home"><HomeIcon /></span>
              <span>Institute</span>
              <FiChevronRight />
              <strong>Faculty</strong>
            </div>

            <div className="fac-head">
              <div className="title">
                <span className="title-ic"><FacultyIcon /></span>
                <div>
                  <h1>Faculty</h1>
                  <p>Manage and view all faculty members in your institute</p>
                </div>
              </div>
              <button className="btn-primary" onClick={openAddModal}><FiPlus /> Add Faculty</button>
            </div>
          </div>
        </section>

        <section
          className="fac-stats"
          style={{
            width: "100%",
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          {STATS.map((s) => {
            const line = sparkPath(s.pts, s.smooth);
            const lastY = s.pts[s.pts.length - 1];
            return (
              <div className="stat" key={s.label}>
                <div className={`stat-ic ${s.tone}`}><span className="stat-ic-in">{s.icon}</span></div>

                <div className="meta">
                  <h2>{s.value}</h2>
                  <span>{s.label}</span>
                  <em><FiArrowUp /> {s.change}</em>
                </div>

                <div className="spark-wrap">
                  <div className="spark-motion">
                    <svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`sg-${s.tone}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor={TONE_COLOR[s.tone]} stopOpacity="0.28" />
                          <stop offset="1" stopColor={TONE_COLOR[s.tone]} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={`${line} L120 50 L0 50 Z`} fill={`url(#sg-${s.tone})`} />
                      <path
                        d={line}
                        fill="none"
                        stroke={TONE_COLOR[s.tone]}
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    {s.dot && (
                      <span
                        className="spark-dot"
                        style={{ top: `${(lastY / 50) * 100}%`, background: TONE_COLOR[s.tone] }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section
          className="fac-filters"
          style={{
            width: "100%",
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <div className="f-search">
            <FiSearch />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, department..."
            />
          </div>

          <FilterSelect
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            placeholder="All Departments"
            options={depts}
          />

          <FilterSelect
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="All Courses"
            options={courseOptions}
            ariaLabel="Primary course filter"
          />

          <FilterSelect
            value={courseSecondary}
            onChange={(e) => setCourseSecondary(e.target.value)}
            placeholder="All Courses"
            options={courseOptions}
            ariaLabel="Secondary course filter"
          />

          <FilterSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="All Status"
            options={["Active", "On Leave", "Inactive"]}
          />

          <button
            type="button"
            className="btn-primary f-search-btn"
            onClick={() =>
              setApplied({ query, dept, course, courseSecondary, status })
            }
          >
            <FiSearch /> Search
          </button>
        </section>

        <section
          className="fac-table-card"
          style={{
            width: "100%",
            maxWidth: "100%",
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <div className="fac-table-scroll">
            <table className="fac-table">
            <thead>
              <tr>
                <th className="chk"><input type="checkbox" checked={allChecked} onChange={toggleAll} /></th>
                <th>Faculty Details</th>
                <th>Department</th>
                <th>Assigned Courses</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id}>
                  <td className="chk"><input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleOne(r.id)} /></td>
                  <td>
                    <div className="person">
                      <Avatar name={r.name} photo={r.photo} index={i} />
                      <div><strong>{r.name}</strong><small>{r.email}</small></div>
                    </div>
                  </td>
                  <td>{r.dept}</td>
                  <td>{r.courses}</td>
                  <td><span className={`pill ${statusClass(r.status)}`}>{r.status}</span></td>
                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        className="act view"
                        title="View"
                        onClick={() => setViewFaculty({ item: r, index: i })}
                      >
                        <FiEye />
                      </button>
                      <button
                        type="button"
                        className="act edit"
                        title="Edit"
                        onClick={() => openEditModal(r)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        className="act del"
                        title="Delete"
                        onClick={() => setDeleteTarget(r)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="empty">No faculty found. Try changing the filters.</td></tr>
              )}
            </tbody>
            </table>
          </div>

          <div className="fac-pager">
            <span>Showing {filtered.length ? 1 : 0} to {filtered.length} of {filtered.length} faculty members</span>
            <div className="pages">
              <button>«</button>
              <button className="on">1</button>
              <button>»</button>
            </div>
          </div>
        </section>
      </main>
      {formMode && (
        <div className="fm-overlay" onClick={closeAllModals}>
          <form
            className="fm-modal"
            style={{ overflow: "visible" }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
            noValidate
            role="dialog"
            aria-modal="true"
            aria-labelledby="fm-title"
          >
            <div className="fm-head" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
              <h3 id="fm-title">{formMode === "edit" ? "Edit Faculty" : "Add Faculty"}</h3>
              <button type="button" className="fm-x" onClick={closeAllModals} aria-label="Close"><FiX /></button>
            </div>

            <div className="fm-body" style={{ overflow: "visible" }}>
              <label className="fm-field">
                <span>Full name</span>
                <input value={form.name} onChange={setField("name")} placeholder="e.g. Anitha Raj" autoFocus />
                {errors.name && <em>{errors.name}</em>}
              </label>

              <label className="fm-field">
                <span>Email</span>
                <input type="email" value={form.email} onChange={setField("email")} placeholder="name@artlysoft.com" />
                {errors.email && <em>{errors.email}</em>}
              </label>

              <div className="fm-row" style={{ overflow: "visible" }}>
                <ModalSelect
                  label="Department"
                  value={form.dept}
                  onChange={setField("dept")}
                  options={modalDeptOptions}
                />
                <ModalSelect
                  label="Status"
                  value={form.status}
                  onChange={setField("status")}
                  options={["Active", "On Leave", "Inactive"]}
                />
              </div>

              <label className="fm-field">
                <span>Assigned courses</span>
                <input value={form.courses} onChange={setField("courses")} placeholder="Python, React, Web Dev" />
                {errors.courses && <em>{errors.courses}</em>}
              </label>
            </div>

            <div className="fm-foot" style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
              <div className="fm-foot-left">
                {form.photo && (
                  <img src={form.photo} alt="Preview" className="fm-file-preview" />
                )}
                <label className="fm-file-btn">
                  <FiUpload />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <span className="fm-file-name" title={form.fileName || "No file chosen"}>
                  {form.fileName || "No file chosen"}
                </span>
                {errors.photo && <em className="fm-file-err">{errors.photo}</em>}
              </div>

              <div className="fm-foot-right">
                <button type="button" className="fm-cancel" onClick={closeAllModals}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {formMode === "edit" ? "Update faculty" : "Save faculty"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {viewFaculty && (
        <div className="fm-overlay" onClick={closeAllModals}>
          <div
            className="fm-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fv-title"
          >
            <div className="fm-head">
              <h3 id="fv-title">Faculty Details</h3>
              <button type="button" className="fm-x" onClick={closeAllModals} aria-label="Close"><FiX /></button>
            </div>

            <div className="fm-body">
              <div className="fv-hero">
                <Avatar
                  name={viewFaculty.item.name}
                  photo={viewFaculty.item.photo}
                  size={68}
                  index={viewFaculty.index}
                />
                <div className="fv-hero-meta">
                  <h4>{viewFaculty.item.name}</h4>
                  <span className={`pill ${statusClass(viewFaculty.item.status)}`}>
                    {viewFaculty.item.status}
                  </span>
                </div>
              </div>

              <div className="fv-grid">
                <div className="fv-item">
                  <small><FiMail /> Email Address</small>
                  <strong>{viewFaculty.item.email}</strong>
                </div>
                <div className="fv-item">
                  <small><FiLayers /> Department</small>
                  <strong>{viewFaculty.item.dept}</strong>
                </div>
                <div className="fv-item fv-span-2">
                  <small><FiBookOpen /> Assigned Courses</small>
                  <strong>{viewFaculty.item.courses}</strong>
                </div>
              </div>
            </div>

            <div className="fm-foot">
              <div className="fm-foot-right">
                <button type="button" className="fm-cancel" onClick={closeAllModals}>Close</button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => openEditModal(viewFaculty.item)}
                >
                  <FiEdit2 /> Edit Faculty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteTarget && (
        <div className="fm-overlay" onClick={closeAllModals}>
          <div
            className="fm-modal fd-simple"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fd-title"
          >
            <div className="fd-icon-box" aria-hidden="true">
              <FiTrash2 />
            </div>

            <h3 id="fd-title">Delete Faculty</h3>

            <div className="fd-target-card">
              <strong>{deleteTarget.name}</strong>
              <span>{deleteTarget.email}</span>
              <small>{deleteTarget.dept}</small>
            </div>

            <p>
              Are you sure you want to remove this faculty member from the list?
            </p>

            <div className="fd-simple-foot">
              <button type="button" className="fm-cancel" onClick={closeAllModals}>Cancel</button>
              <button type="button" className="btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fm-toast" role="status">
          <FiCheckCircle /> {toast}
        </div>
      )}
    </div>
  );
}