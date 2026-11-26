import  { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Principleins.css";

const initialPrincipals = [
  {
    id: 1,
    name: "Dr. R. Srinivasan",
    role: "Principal",
    institute: "PMC College",
    campus: "(Main Campus)",
    phone: "+91 98765 43210",
    email: "principal@pmccollege.edu",
    status: "Active",
    image: "https://i.pravatar.cc/120?img=12",
  },
];

const emptyForm = {
  name: "",
  role: "Principal",
  institute: "PMC College",
  campus: "(Main Campus)",
  phone: "",
  email: "",
  status: "Active",
  image: "https://i.pravatar.cc/120?img=49",
};

const statMeta = [
  {
    key: "total",
    title: "Total Principals",
    icon: "bi-people-fill",
    type: "blue",
    showDot: true,
    color: "#2f6bff",
    points: [
      [0, 50], [9, 48], [17, 50], [26, 42], [34, 45],
      [44, 35], [52, 38], [62, 26], [70, 30], [80, 18],
      [88, 22], [96, 8],
    ],
  },
  {
    key: "active",
    title: "Active Principals",
    icon: "bi-check-lg",
    type: "green",
    showDot: false,
    color: "#22c55e",
    points: [
      [0, 50], [9, 49], [18, 51], [27, 44], [36, 46],
      [46, 39], [55, 42], [64, 32], [72, 35], [82, 22],
      [90, 26], [96, 10],
    ],
  },
  {
    key: "onLeave",
    title: "On Leave",
    icon: "bi-pause-fill",
    type: "orange",
    showDot: false,
    color: "#f5a524",
    points: [
      [0, 50], [10, 49], [19, 51], [28, 46], [37, 48],
      [47, 41], [56, 44], [65, 33], [73, 37], [82, 26],
      [90, 29], [96, 14],
    ],
  },
  {
    key: "inactive",
    title: "Inactive Principals",
    icon: "bi-people-fill",
    type: "purple",
    showDot: false,
    color: "#8b5cf6",
    points: [
      [0, 51], [8, 49], [15, 52], [23, 45], [31, 48],
      [40, 40], [48, 44], [57, 33], [64, 37], [73, 26],
      [80, 30], [88, 18], [93, 22], [97, 9],
    ],
  },
];

function buildSmoothPath(points) {
  if (points.length < 2) return "";

  let d = `M ${points[0][0]},${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const tension = 6;
    const cp1x = p1[0] + (p2[0] - p0[0]) / tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) / tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) / tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) / tension;

    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(
      2
    )},${cp2y.toFixed(2)} ${p2[0]},${p2[1]}`;
  }

  return d;
}

function buildSparkline(points) {
  const baselineY = 56;
  const first = points[0];
  const last = points[points.length - 1];
  const curvePath = buildSmoothPath(points);
  const areaPath = `${curvePath} L ${last[0]},${baselineY} L ${first[0]},${baselineY} Z`;

  return {
    curvePath,
    areaPath,
    dot: { cx: String(last[0]), cy: String(last[1]) },
  };
}

function Principleins() {
  const [principals, setPrincipals] = useState(initialPrincipals);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [institute, setInstitute] = useState("All Institutes");
  const [status, setStatus] = useState("All Status");
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const modalFileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [modalState, setModalState] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const statistics = useMemo(() => {
    const total = principals.length;
    const active = principals.filter((p) => p.status === "Active").length;
    const onLeave = principals.filter((p) => p.status === "On Leave").length;
    const inactive = principals.filter((p) => p.status === "Inactive").length;

    const counts = {
      total,
      active,
      onLeave,
      inactive,
    };

    return statMeta.map((stat) => {
      const countValue = counts[stat.key] ?? 0;
      const spark = buildSparkline(stat.points);

      return {
        ...stat,
        countNumber: countValue,
        value: String(countValue),
        curvePath: spark.curvePath,
        areaPath: spark.areaPath,
        dot: stat.showDot ? spark.dot : null,
      };
    });
  }, [principals]);

  const instituteOptions = useMemo(() => {
    const unique = new Set([
      "PMC College",
      ...principals.map((p) => p.institute).filter(Boolean),
    ]);
    return ["All Institutes", ...Array.from(unique)];
  }, [principals]);

  const filteredPrincipals = useMemo(() => {
    return principals.filter((principal) => {
      const q = appliedSearch.toLowerCase();

      const matchesSearch =
        !q ||
        principal.name.toLowerCase().includes(q) ||
        principal.email.toLowerCase().includes(q) ||
        principal.phone.toLowerCase().includes(q) ||
        principal.institute.toLowerCase().includes(q) ||
        principal.campus.toLowerCase().includes(q);

      const matchesInstitute =
        institute === "All Institutes" || principal.institute === institute;

      const matchesStatus =
        status === "All Status" || principal.status === status;

      return matchesSearch && matchesInstitute && matchesStatus;
    });
  }, [principals, appliedSearch, institute, status]);

  const totalPages = Math.max(1, Math.ceil(filteredPrincipals.length / pageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const resetFilePicker = () => {
    setSelectedFileName("");
    if (modalFileInputRef.current) {
      modalFileInputRef.current.value = "";
    }
  };

  const closeModal = useCallback(() => {
    setModalState(null);
    setFormError("");
    resetFilePicker();
  }, []);

  useEffect(() => {
    if (!modalState) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalState, closeModal]);

  const paginatedPrincipals = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredPrincipals.slice(startIndex, startIndex + pageSize);
  }, [filteredPrincipals, safeCurrentPage]);

  const toggleSelect = (id) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleAllOnPage = () => {
    const pageIds = paginatedPrincipals.map((item) => item.id);
    const allSelected =
      pageIds.length > 0 && pageIds.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected((previous) => previous.filter((id) => !pageIds.includes(id)));
    } else {
      setSelected((previous) => Array.from(new Set([...previous, ...pageIds])));
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    setModalState({
      mode: "delete",
      data: { bulkIds: [...selected], count: selected.length },
    });
  };

  const handleSearchTrigger = (event) => {
    if (event) event.preventDefault();
    setAppliedSearch(searchInput.trim());
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setAppliedSearch("");
    setInstitute("All Institutes");
    setStatus("All Status");
    setCurrentPage(1);
  };

  const openAddModal = () => {
    setFormError("");
    resetFilePicker();
    setFormData({
      ...emptyForm,
      image: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 60) + 10}`,
    });
    setModalState({ mode: "add", data: null });
  };

  const openViewModal = (principal) => {
    setFormError("");
    setModalState({ mode: "view", data: principal });
  };

  const openEditModal = (principal) => {
    setFormError("");
    resetFilePicker();
    setFormData({
      name: principal.name,
      role: principal.role,
      institute: principal.institute,
      campus: principal.campus,
      phone: principal.phone,
      email: principal.email,
      status: principal.status,
      image: principal.image,
    });
    setModalState({ mode: "edit", data: principal });
  };

  const openDeleteModal = (principal) => {
    setFormError("");
    setModalState({ mode: "delete", data: principal });
  };

  const handleFormChange = (field, value) => {
    if (formError) setFormError("");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleModalFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = String(e.target?.result || "");
      if (dataUrl) {
        setFormData((prev) => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePrincipal = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setFormError("Please enter the principal's full name.");
      return;
    }
    if (!formData.institute.trim()) {
      setFormError("Please enter the institute name.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Please enter an email address.");
      return;
    }

    const formattedCampus = formData.campus.trim()
      ? formData.campus.trim().startsWith("(")
        ? formData.campus.trim()
        : `(${formData.campus.trim()})`
      : "(Main Campus)";

    const cleanedData = {
      name: formData.name.trim(),
      role: formData.role.trim() || "Principal",
      institute: formData.institute.trim(),
      campus: formattedCampus,
      phone: formData.phone.trim() || "+91 98765 43210",
      email: formData.email.trim(),
      status: formData.status,
      image: formData.image.trim() || "https://i.pravatar.cc/120?img=12",
    };

    if (modalState?.mode === "add") {
      const nextId =
        principals.length > 0
          ? Math.max(...principals.map((p) => p.id)) + 1
          : 1;
      const nextCount = principals.length + 1;
      setPrincipals((prev) => [...prev, { id: nextId, ...cleanedData }]);
      setCurrentPage(Math.max(1, Math.ceil(nextCount / pageSize)));
    } else if (modalState?.mode === "edit" && modalState.data) {
      setPrincipals((prev) =>
        prev.map((item) =>
          item.id === modalState.data.id ? { ...item, ...cleanedData } : item
        )
      );
    }

    closeModal();
  };

  const handleConfirmDelete = () => {
    if (!modalState?.data) return;

    if (Array.isArray(modalState.data.bulkIds)) {
      const idsToRemove = modalState.data.bulkIds;
      setPrincipals((previous) =>
        previous.filter((item) => !idsToRemove.includes(item.id))
      );
      setSelected((previous) =>
        previous.filter((id) => !idsToRemove.includes(id))
      );
    } else {
      const targetId = modalState.data.id;
      setPrincipals((previous) =>
        previous.filter((item) => item.id !== targetId)
      );
      setSelected((previous) => previous.filter((item) => item !== targetId));
    }

    closeModal();
  };

  const showingStart =
    filteredPrincipals.length > 0 ? (safeCurrentPage - 1) * pageSize + 1 : 0;
  const showingEnd = Math.min(
    safeCurrentPage * pageSize,
    filteredPrincipals.length
  );

  const pageIds = paginatedPrincipals.map((item) => item.id);
  const allCurrentSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.includes(id));

  const isDeleteModal = modalState?.mode === "delete";
  const isBulkDelete = Boolean(isDeleteModal && modalState.data?.bulkIds);

  return (
    <main className="principal-page">
      <div className="principal-hero-bg" aria-hidden="true">
        <svg
          viewBox="0 0 1600 220"
          preserveAspectRatio="none"
          className="hero-shards"
        >
          <defs>
            <linearGradient id="hero-base" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#edf3ff" />
              <stop offset="42%" stopColor="#d1e3ff" />
              <stop offset="68%" stopColor="#e8f0ff" />
              <stop offset="100%" stopColor="#f6f9ff" />
            </linearGradient>

            <linearGradient
              id="shard-blue-rich"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#86b2ff" stopOpacity="0.48" />
              <stop offset="65%" stopColor="#a9c9ff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#dceaff" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient
              id="shard-blue-soft"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9ec2ff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#e8f1ff" stopOpacity="0.06" />
            </linearGradient>

            <linearGradient
              id="shard-white-glow"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.16" />
            </linearGradient>
          </defs>

          <rect width="1600" height="220" fill="url(#hero-base)" />
          <polygon
            points="0,0 460,0 220,220 0,220"
            fill="url(#shard-white-glow)"
          />
          <polygon
            points="240,0 640,0 380,220 90,220"
            fill="url(#shard-blue-soft)"
          />
          <polygon points="0,75 560,220 0,220" fill="url(#shard-blue-rich)" />
          <polygon
            points="470,0 770,0 500,220 310,220"
            fill="url(#shard-white-glow)"
          />
          <polygon
            points="750,0 930,0 650,220 420,220"
            fill="url(#shard-blue-rich)"
          />
          <polygon
            points="840,0 990,0 730,220 580,220"
            fill="url(#shard-blue-soft)"
          />
          <polygon
            points="930,0 1600,0 1600,220 650,220"
            fill="url(#shard-white-glow)"
          />
          <polygon
            points="1060,0 1600,130 1600,220 840,220"
            fill="url(#shard-blue-soft)"
          />
          <polygon
            points="1240,0 1600,0 1600,100 1080,220"
            fill="url(#shard-white-glow)"
          />
        </svg>
      </div>

      <div className="principal-container">
        <div className="principal-top-zone">
          <nav className="principal-breadcrumb" aria-label="Breadcrumb">
            <i className="bi bi-house-door-fill"></i>
            <span>Institute</span>
            <i className="bi bi-chevron-right separator"></i>
            <span className="current">Principal</span>
          </nav>

          <div className="principal-heading">
            <div className="principal-heading-left">
              <div className="principal-heading-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" className="principal-star-avatar">
                  <defs>
                    <mask id="star-badge-cutout">
                      <rect width="64" height="64" fill="#ffffff" />
                      <path
                        d="M44.5 31.2 L47.9 38.1 L55.5 39.2 L50 44.5 L51.3 52.1 L44.5 48.5 L37.7 52.1 L39 44.5 L33.5 39.2 L41.1 38.1 Z"
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth="6.5"
                        strokeLinejoin="round"
                      />
                    </mask>
                  </defs>

                  <g mask="url(#star-badge-cutout)">
                    <circle cx="27" cy="18.5" r="10.5" fill="#0d5eff" />
                    <path
                      d="M7 51 C7 38.5 15.8 32 27 32 C38.2 32 47 38.5 47 51 C47 53.2 45.2 55 43 55 L11 55 C8.8 55 7 53.2 7 51 Z"
                      fill="#0d5eff"
                    />
                  </g>

                  <path
                    d="M44.5 33.4 L47.2 38.9 L53.2 39.8 L48.8 44.1 L49.9 50.1 L44.5 47.2 L39.1 50.1 L40.2 44.1 L35.8 39.8 L41.8 38.9 Z"
                    fill="#0d5eff"
                    stroke="#0d5eff"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h1>Principal</h1>
                <p>Manage and view principal details in your institute</p>
              </div>
            </div>

            <div className="principal-heading-actions">
              {selected.length > 0 && (
                <button
                  type="button"
                  className="bulk-delete-btn"
                  onClick={handleBulkDelete}
                >
                  <i className="bi bi-trash3-fill"></i>
                  <span>Delete ({selected.length})</span>
                </button>
              )}

              <button
                type="button"
                className="add-principal-btn"
                onClick={openAddModal}
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add Principal</span>
              </button>
            </div>
          </div>
        </div>

        <div className="principal-stats">
          {statistics.map((item) => (
            <div
              className={`principal-stat-card ${item.type}`}
              key={item.title}
            >
              <div className="stat-icon">
                <span className="stat-icon-inner">
                  <i className={`bi ${item.icon}`}></i>
                </span>
              </div>

              <div className="stat-content">
                <h2>{item.value}</h2>
                <p>{item.title}</p>
                <span className="stat-growth">
                  <i className="bi bi-arrow-up"></i> +{item.countNumber * 10}%
                </span>
              </div>

              <div className="stat-chart">
                <svg
                  viewBox="0 0 100 56"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  style={{ overflow: "visible", width: "100%", height: "100%" }}
                >
                  <defs>
                    <linearGradient
                      id={`spark-area-${item.type}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: item.color, stopOpacity: 0.28 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: item.color, stopOpacity: 0.02 }}
                      />
                    </linearGradient>

                    <linearGradient
                      id={`spark-fade-${item.type}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="30%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>

                    <mask
                      id={`spark-mask-${item.type}`}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="-10"
                      width="110"
                      height="80"
                    >
                      <rect
                        x="0"
                        y="-10"
                        width="110"
                        height="80"
                        fill={`url(#spark-fade-${item.type})`}
                      />
                    </mask>
                  </defs>

                  <g mask={`url(#spark-mask-${item.type})`}>
                    <path
                      d={item.areaPath}
                      fill={`url(#spark-area-${item.type})`}
                      stroke="none"
                    />

                    <path
                      d={item.curvePath}
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        stroke: item.color,
                        strokeWidth: 1.6,
                        fill: "none",
                      }}
                    />
                  </g>

                  {item.dot && (
                    <>
                      <circle
                        cx={item.dot.cx}
                        cy={item.dot.cy}
                        r="4.2"
                        style={{ fill: item.color, fillOpacity: 0.18 }}
                      />
                      <circle
                        cx={item.dot.cx}
                        cy={item.dot.cy}
                        r="2.4"
                        style={{
                          fill: item.color,
                          stroke: "#ffffff",
                          strokeWidth: 0.8,
                        }}
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>
          ))}
        </div>

        <form className="principal-filters" onSubmit={handleSearchTrigger}>
          <div className="principal-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, email or institute..."
              value={searchInput}
              onChange={(event) => {
                const val = event.target.value;
                setSearchInput(val);
                setAppliedSearch(val.trim());
                setCurrentPage(1);
              }}
            />
            {searchInput && (
              <button
                type="button"
                className="clear-search-btn"
                aria-label="Clear search"
                onClick={() => {
                  setSearchInput("");
                  setAppliedSearch("");
                  setCurrentPage(1);
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>

          <div className="principal-select">
            <select
              value={institute}
              onChange={(event) => {
                setInstitute(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by institute"
            >
              {instituteOptions.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
            <i className="bi bi-chevron-down"></i>
          </div>

          <div className="principal-select">
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by status"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
            <i className="bi bi-chevron-down"></i>
          </div>

          <button type="submit" className="principal-search-btn">
            <i className="bi bi-search"></i>
            <span>Search</span>
          </button>
        </form>

        <div className="principal-table-card">
          <div className="principal-table-scroll">
            <table className="principal-table">
              <thead>
                <tr>
                  <th className="check-column">
                    <input
                      type="checkbox"
                      checked={allCurrentSelected}
                      onChange={toggleAllOnPage}
                      aria-label="Select all principals on page"
                    />
                  </th>
                  <th>Principal Details</th>
                  <th>Institute Assignment</th>
                  <th>Contact Information</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedPrincipals.length > 0 ? (
                  paginatedPrincipals.map((principal) => (
                    <tr key={principal.id}>
                      <td className="check-column">
                        <input
                          type="checkbox"
                          checked={selected.includes(principal.id)}
                          onChange={() => toggleSelect(principal.id)}
                          aria-label={`Select ${principal.name}`}
                        />
                      </td>

                      <td>
                        <div className="principal-person">
                          <img src={principal.image} alt={principal.name} />
                          <div>
                            <h3>{principal.name}</h3>
                            <p>{principal.role}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="institute-info">
                          <h4>{principal.institute}</h4>
                          <p>{principal.campus}</p>
                        </div>
                      </td>

                      <td>
                        <div className="contact-info">
                          <p>
                            <i className="bi bi-telephone-fill"></i>
                            <a href={`tel:${principal.phone}`}>
                              {principal.phone}
                            </a>
                          </p>
                          <p>
                            <i className="bi bi-envelope-fill"></i>
                            <a href={`mailto:${principal.email}`}>
                              {principal.email}
                            </a>
                          </p>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`principal-status ${principal.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {principal.status}
                        </span>
                      </td>

                      <td>
                        <div className="principal-actions">
                          <button
                            type="button"
                            className="action-btn view-btn"
                            title="View principal"
                            onClick={() => openViewModal(principal)}
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>

                          <button
                            type="button"
                            className="action-btn edit-btn"
                            title="Edit principal"
                            onClick={() => openEditModal(principal)}
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </button>

                          <button
                            type="button"
                            className="action-btn delete-btn"
                            title="Delete principal"
                            onClick={() => openDeleteModal(principal)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-principals">
                      <i className="bi bi-person-x"></i>
                      <p>No principals found</p>
                      {(appliedSearch ||
                        institute !== "All Institutes" ||
                        status !== "All Status") && (
                        <button
                          type="button"
                          className="reset-filters-btn"
                          onClick={handleResetFilters}
                        >
                          Reset Filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="principal-table-footer">
            <p>
              Showing {showingStart} to {showingEnd} of{" "}
              {filteredPrincipals.length} principal
              {filteredPrincipals.length !== 1 ? "s" : ""}
            </p>

            <div className="principal-pagination">
              <button
                type="button"
                aria-label="First page"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage(1)}
              >
                <i className="bi bi-chevron-double-left"></i>
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={
                      pageNumber === safeCurrentPage ? "current-page" : undefined
                    }
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                aria-label="Last page"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <i className="bi bi-chevron-double-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalState && (
        <div
          className="principal-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className={`principal-modal ${
              isDeleteModal ? "principal-delete-rect-modal" : ""
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="principal-modal-header">
              <h2>
                {modalState.mode === "add" && "Add Principal"}
                {modalState.mode === "edit" && "Edit Principal"}
                {modalState.mode === "view" && "Principal Details"}
                {isDeleteModal &&
                  (isBulkDelete ? "Delete Selected Principals" : "Delete Principal")}
              </h2>

              <button
                type="button"
                className="modal-close-btn"
                aria-label="Close modal"
                onClick={closeModal}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {isDeleteModal ? (
              <div className="modal-delete-rect-body">
                <div className="delete-rect-banner">
                  <div className="delete-rect-icon" aria-hidden="true">
                    <i className="bi bi-trash3-fill"></i>
                  </div>

                  <div className="delete-rect-copy">
                    <span className="delete-target-pill">
                      {isBulkDelete
                        ? `${modalState.data.count} selected principal${
                            modalState.data.count > 1 ? "s" : ""
                          }`
                        : `${modalState.data?.name} • ${modalState.data?.institute}`}
                    </span>
                    <p>
                      Are you sure you want to delete{" "}
                      <strong>
                        {isBulkDelete
                          ? "these principal records"
                          : modalState.data?.name}
                      </strong>
                      ? This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="principal-modal-footer">
                  <button
                    type="button"
                    className="modal-secondary-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="modal-danger-btn"
                    onClick={handleConfirmDelete}
                  >
                    <i className="bi bi-trash3-fill"></i>
                    <span>
                      {isBulkDelete
                        ? `Delete (${modalState.data.count})`
                        : "Delete"}
                    </span>
                  </button>
                </div>
              </div>
            ) : modalState.mode === "view" && modalState.data ? (
              <div className="modal-view-body">
                <div className="modal-view-profile">
                  <img
                    src={modalState.data.image}
                    alt={modalState.data.name}
                  />
                  <div>
                    <h3>{modalState.data.name}</h3>
                    <p>{modalState.data.role}</p>
                    <span
                      className={`principal-status ${modalState.data.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {modalState.data.status}
                    </span>
                  </div>
                </div>

                <div className="modal-view-grid">
                  <div className="modal-detail-item">
                    <span className="detail-label">Institute</span>
                    <span className="detail-value">
                      {modalState.data.institute}
                    </span>
                  </div>

                  <div className="modal-detail-item">
                    <span className="detail-label">Campus</span>
                    <span className="detail-value">
                      {modalState.data.campus}
                    </span>
                  </div>

                  <div className="modal-detail-item">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">
                      <a href={`tel:${modalState.data.phone}`}>
                        {modalState.data.phone}
                      </a>
                    </span>
                  </div>

                  <div className="modal-detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">
                      <a href={`mailto:${modalState.data.email}`}>
                        {modalState.data.email}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="principal-modal-footer">
                  <button
                    type="button"
                    className="modal-secondary-btn"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="modal-primary-btn"
                    onClick={() => openEditModal(modalState.data)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ) : (
              <form className="modal-form-body" onSubmit={handleSavePrincipal}>
                {formError && (
                  <div className="modal-form-error" role="alert">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <span>{formError}</span>
                  </div>
                )}

                <div className="modal-form-grid">
                  <div className="modal-form-group">
                    <label htmlFor="principal-name">Full Name</label>
                    <input
                      id="principal-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="e.g. Dr. A. Kumar"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-role">Role</label>
                    <input
                      id="principal-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleFormChange("role", e.target.value)}
                      placeholder="Principal"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-institute">Institute</label>
                    <input
                      id="principal-institute"
                      type="text"
                      value={formData.institute}
                      onChange={(e) =>
                        handleFormChange("institute", e.target.value)
                      }
                      placeholder="PMC College"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-campus">Campus</label>
                    <input
                      id="principal-campus"
                      type="text"
                      value={formData.campus}
                      onChange={(e) =>
                        handleFormChange("campus", e.target.value)
                      }
                      placeholder="(Main Campus)"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-phone">Phone</label>
                    <input
                      id="principal-phone"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-email">Email</label>
                    <input
                      id="principal-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      placeholder="principal@pmccollege.edu"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-status">Status</label>
                    <select
                      id="principal-status"
                      value={formData.status}
                      onChange={(e) =>
                        handleFormChange("status", e.target.value)
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="principal-avatar-url">Photo URL</label>
                    <input
                      id="principal-avatar-url"
                      type="text"
                      value={formData.image}
                      onChange={(e) => handleFormChange("image", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="principal-modal-footer modal-form-footer">
                  <div className="modal-file-picker">
                    <input
                      ref={modalFileInputRef}
                      type="file"
                      accept="image/*"
                      className="sr-only-file-input"
                      onChange={handleModalFileChange}
                    />
                    <button
                      type="button"
                      className="modal-file-btn"
                      onClick={() => modalFileInputRef.current?.click()}
                    >
                      <i className="bi bi-upload"></i>
                      <span>Choose File</span>
                    </button>
                    {selectedFileName && (
                      <span className="modal-file-name" title={selectedFileName}>
                        {selectedFileName}
                      </span>
                    )}
                  </div>

                  <div className="modal-footer-actions">
                    <button
                      type="button"
                      className="modal-secondary-btn"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="modal-primary-btn">
                      <i className="bi bi-check-lg"></i>
                      <span>
                        {modalState.mode === "add" ? "Add Principal" : "Save Changes"}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Principleins;