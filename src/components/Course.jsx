import  { useEffect, useMemo, useRef, useState } from "react";
import {
  GraduationCap,
  CircleCheck,
  Pause,
  UsersRound,
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Eye,
  Pencil,
  Trash2,
  X
} from "lucide-react";

import "./Course.css";

const initialCourses = [
  {
    id: 1,
    name: "Computer Science (CSE)",
    department: "Computer Science",
    duration: "4 Years",
    status: "Active",
    students: 1250
  },
  {
    id: 2,
    name: "Data Science",
    department: "Data Science",
    duration: "3 Years",
    status: "Active",
    students: 850
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    department: "Computer Science",
    duration: "3 Years",
    status: "Active",
    students: 720
  },
  {
    id: 4,
    name: "Information Technology",
    department: "Information Technology",
    duration: "4 Years",
    status: "Active",
    students: 640
  },
  {
    id: 5,
    name: "Cyber Security",
    department: "Computer Science",
    duration: "3 Years",
    status: "Inactive",
    students: 420
  },
  {
    id: 6,
    name: "Business Administration",
    department: "Management",
    duration: "3 Years",
    status: "Active",
    students: 560
  }
];

function BarChart({ color, chartId }) {
  const bars = [
    { x: 2, h: 9 },
    { x: 19, h: 14 },
    { x: 36, h: 19 },
    { x: 53, h: 25 },
    { x: 70, h: 31 },
    { x: 87, h: 37 },
    { x: 104, h: 43 }
  ];

  return (
    <svg
      className="mini-chart"
      viewBox="0 0 120 48"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bar-${chartId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".75" />
          <stop offset="100%" stopColor={color} stopOpacity=".08" />
        </linearGradient>
      </defs>

      {bars.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y={46 - bar.h}
          width="12"
          height={bar.h}
          rx="5"
          fill={`url(#bar-${chartId})`}
        />
      ))}
    </svg>
  );
}

function CurveChart() {
  return (
    <svg
      className="mini-chart"
      viewBox="0 0 130 48"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="activeCurveGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#35B99B" stopOpacity=".28" />
          <stop offset="100%" stopColor="#35B99B" stopOpacity=".015" />
        </linearGradient>
      </defs>

      <path
        d="
          M 0 42
          C 8 39, 10 38, 17 39
          S 27 33, 35 35
          S 46 27, 53 30
          S 64 24, 72 26
          S 82 17, 91 20
          S 101 12, 110 14
          S 120 4, 130 3
          L 130 48
          L 0 48
          Z
        "
        fill="url(#activeCurveGradient)"
      />

      <path
        d="
          M 0 42
          C 8 39, 10 38, 17 39
          S 27 33, 35 35
          S 46 27, 53 30
          S 64 24, 72 26
          S 82 17, 91 20
          S 101 12, 110 14
          S 120 4, 130 3
        "
        fill="none"
        stroke="#35B99B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  chart
}) {
  return (
    <div className={`stat-card ${color}-card`}>
      <div
        className="stat-icon-circle"
        style={{ background: bgColor, color: color === "blue"
          ? "#1765EF"
          : color === "green"
          ? "#079A65"
          : color === "orange"
          ? "#F29A20"
          : "#8539EA"
        }}
      >
        <Icon size={24} strokeWidth={2.4} />
      </div>

      <div className="stat-text">
        <p>{title}</p>
        <h3>{value}</h3>
      </div>

      <div className="stat-chart">
        {chart}
      </div>
    </div>
  );
}

function getUniqueOptions(items, field) {
  const seen = new Map();

  items.forEach(item => {
    const trimmed = item[field]?.trim();
    if (!trimmed) return;

    const key = trimmed.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, trimmed);
    }
  });

  return Array.from(seen.values());
}

function resolveFilterValue(currentValue, options, defaultValue) {
  if (currentValue === defaultValue) {
    return defaultValue;
  }

  return options.some(
    option => option.toLowerCase() === currentValue.toLowerCase()
  )
    ? currentValue
    : defaultValue;
}

function FilterDropdown({
  value,
  options,
  defaultLabel,
  onChange,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = event => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const allOptions = [defaultLabel, ...options];

  return (
    <div
      ref={containerRef}
      className={`select-field ${className} ${isOpen ? "open" : ""}`}
    >
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(previous => !previous)}
      >
        <span className="select-label">{value}</span>
        <ChevronDown
          size={16}
          strokeWidth={2.2}
          className="select-arrow"
        />
      </button>

      {isOpen && (
        <ul className="select-menu" role="listbox">
          {allOptions.map(option => {
            const isSelected =
              option.toLowerCase() === value.toLowerCase();

            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  className={`select-option ${
                    isSelected ? "active" : ""
                  }`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  <span>{option}</span>
                  {isSelected && <Check size={14} strokeWidth={2.6} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Cource() {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("instituteCourses");
      return saved ? JSON.parse(saved) : initialCourses;
    } catch {
      return initialCourses;
    }
  });

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");

  const [page, setPage] = useState(1);
  const perPage = 4;

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selected, setSelected] = useState(null);

  const emptyForm = {
    name: "",
    department: "",
    duration: "",
    status: "Active",
    students: ""
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(
      "instituteCourses",
      JSON.stringify(courses)
    );
  }, [courses]);

  const total = courses.length;

  const active = courses.filter(
    item => item.status?.trim().toLowerCase() === "active"
  ).length;

  const inactive = courses.filter(
    item => item.status?.trim().toLowerCase() === "inactive"
  ).length;

  const departmentList = useMemo(
    () => getUniqueOptions(courses, "department"),
    [courses]
  );

  const statusList = useMemo(
    () => getUniqueOptions(courses, "status"),
    [courses]
  );

  const departmentTotal = departmentList.length;

  const activeDepartment = resolveFilterValue(
    department,
    departmentList,
    "All Departments"
  );

  const activeStatus = resolveFilterValue(
    status,
    statusList,
    "All Status"
  );

  const filteredCourses = useMemo(() => {
    return courses.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        activeDepartment === "All Departments" ||
        item.department?.trim().toLowerCase() ===
          activeDepartment.toLowerCase();

      const matchesStatus =
        activeStatus === "All Status" ||
        item.status?.trim().toLowerCase() ===
          activeStatus.toLowerCase();

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [courses, search, activeDepartment, activeStatus]);

  const totalPages = Math.ceil(
    filteredCourses.length / perPage
  );

  const currentPage =
    totalPages === 0 ? 1 : Math.min(page, totalPages);

  const start = (currentPage - 1) * perPage;

  const visibleCourses = filteredCourses.slice(
    start,
    start + perPage
  );

  const from = filteredCourses.length === 0 ? 0 : start + 1;

  const to = Math.min(
    start + perPage,
    filteredCourses.length
  );

  const openAdd = () => {
    setModalType("add");
    setSelected(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = item => {
    setModalType("edit");
    setSelected(item);

    setForm({
      name: item.name,
      department: item.department,
      duration: item.duration,
      status: item.status,
      students: String(item.students)
    });

    setShowModal(true);
  };

  const openView = item => {
    setModalType("view");
    setSelected(item);
    setShowModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      ...form,
      name: form.name.trim(),
      department: form.department.trim(),
      status: form.status.trim(),
      students: Number(form.students)
    };

    if (modalType === "add") {
      setCourses(previous => [
        ...previous,
        {
          id: Date.now(),
          ...data
        }
      ]);
    }

    if (modalType === "edit") {
      setCourses(previous =>
        previous.map(item =>
          item.id === selected.id
            ? { ...item, ...data }
            : item
        )
      );
    }

    setShowModal(false);
    setPage(1);
  };

  useEffect(() => {
    if (!showModal) return;

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  const openDelete = item => {
    setModalType("delete");
    setSelected(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (!selected) return;

    setCourses(previous =>
      previous.filter(item => item.id !== selected.id)
    );
    setShowModal(false);
    setSelected(null);
    setPage(1);
  };

  const changeSearch = value => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="courses">
    <div className="courses-dashboard">

      <header className="courses-header">

        <div className="header-left">

          <div className="breadcrumb">
            <span>Institute</span>
            <ChevronRight size={14} strokeWidth={2.4} />
            <span>Courses</span>
          </div>

          <div className="title-row">
            <svg
              className="header-book"
              viewBox="0 0 40 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >

              <path
                d="M19.1 7.2C14.8 4.4 8.2 3.8 2.9 5.3C2.2 5.5 1.8 6.1 1.8 6.8V23.3C1.8 24.1 2.5 24.7 3.3 24.5C8.3 23.1 14.5 23.6 19.1 26.5V7.2Z"
                fill="#1460F6"
              />

              <path
                d="M20.9 7.2C25.2 4.4 31.8 3.8 37.1 5.3C37.8 5.5 38.2 6.1 38.2 6.8V23.3C38.2 24.1 37.5 24.7 36.7 24.5C31.7 23.1 25.5 23.6 20.9 26.5V7.2Z"
                fill="#1460F6"
              />

              <path
                d="M1.8 25.8C1.8 26.5 2.4 27.1 3.1 26.9C8.2 25.6 14.4 26.1 19.4 29.2C19.8 29.4 20.2 29.4 20.6 29.2C25.6 26.1 31.8 25.6 36.9 26.9C37.6 27.1 38.2 26.5 38.2 25.8V24.9C38.2 25.4 37.7 25.8 37.1 25.6C31.9 24.2 25.5 24.7 20.4 27.7C20.1 27.9 19.9 27.9 19.6 27.7C14.5 24.7 8.1 24.2 2.9 25.6C2.3 25.8 1.8 25.4 1.8 24.9V25.8Z"
                fill="#1460F6"
              />
            </svg>

            <div>
              <h2>Courses</h2>
              <p>Manage courses offered by your institute</p>
            </div>
          </div>

        </div>

        <button className="add-button" onClick={openAdd}>
          <Plus size={18} strokeWidth={2.6} />
          Add Course
        </button>

      </header>

      <section className="stats-grid">

        <StatCard
          title="Total Courses"
          value={total}
          icon={GraduationCap}
          color="blue"
          bgColor="#E5EEFF"
          chart={<BarChart color="#4384F7" chartId="total" />}
        />

        <StatCard
          title="Active Courses"
          value={active}
          icon={CircleCheck}
          color="green"
          bgColor="#DDF5EB"
          chart={<CurveChart />}
        />

        <StatCard
          title="Inactive Courses"
          value={inactive}
          icon={Pause}
          color="orange"
          bgColor="#FFF0DE"
          chart={<BarChart color="#F6A64F" chartId="inactive" />}
        />

        <StatCard
          title="Departments"
          value={departmentTotal}
          icon={UsersRound}
          color="purple"
          bgColor="#F0E7FF"
          chart={<BarChart color="#A477F4" chartId="departments" />}
        />

      </section>

      <section className="toolbar">

        <div className="search-field">
          <Search size={17} strokeWidth={2.2} />

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => changeSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => changeSearch("")}>
              <X size={15} strokeWidth={2.2} />
            </button>
          )}
        </div>

        <FilterDropdown
          value={activeDepartment}
          options={departmentList}
          defaultLabel="All Departments"
          onChange={selectedDepartment => {
            setDepartment(selectedDepartment);
            setPage(1);
          }}
        />

        <FilterDropdown
          className="status-select"
          value={activeStatus}
          options={statusList}
          defaultLabel="All Status"
          onChange={selectedStatus => {
            setStatus(selectedStatus);
            setPage(1);
          }}
        />

      </section>

      <section className="table-container">

        <div className="table-scroll">

          <table className="courses-table">

            <thead>
              <tr>
                <th className="col-number">#</th>
                <th className="col-course">Course Name</th>
                <th className="col-department">Department</th>
                <th className="col-duration">Duration</th>
                <th className="col-status">Status</th>
                <th className="col-students">Students</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>

            <tbody>

              {visibleCourses.length > 0 ? (
                visibleCourses.map((item, index) => (

                  <tr key={item.id}>

                    <td className="col-number">
                      {start + index + 1}
                    </td>

                    <td className="course-name">
                      {item.name}
                    </td>

                    <td>{item.department}</td>

                    <td>{item.duration}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {Number(item.students).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <div className="action-group">

                        <button
                          className="icon-button view"
                          title="View"
                          onClick={() => openView(item)}
                        >
                          <Eye size={16} strokeWidth={2.2} />
                        </button>

                        <button
                          className="icon-button edit"
                          title="Edit"
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={16} strokeWidth={2.2} />
                        </button>

                        <button
                          className="icon-button delete"
                          title="Delete"
                          onClick={() => openDelete(item)}
                        >
                          <Trash2 size={16} strokeWidth={2.2} />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-message">
                    No courses found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <footer className="table-footer">

          <p>
            Showing {from} to {to} of {filteredCourses.length} courses
          </p>

          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeft size={15} strokeWidth={2.2} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map(number => (
              <button
                key={number}
                className={currentPage === number ? "selected-page" : ""}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setPage(currentPage + 1)}
            >
              <ChevronRight size={15} strokeWidth={2.2} />
            </button>

          </div>

        </footer>

      </section>

      {showModal && (

        <div
          className="modal-overlay"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >

          <div
            className={`course-modal ${
              modalType === "delete" ? "delete-modal" : ""
            }`}
            role="dialog"
            aria-modal="true"
          >

            <div className="modal-heading">

              <div>
                <h3>
                  {modalType === "add"
                    ? "Add New Course"
                    : modalType === "edit"
                    ? "Edit Course"
                    : modalType === "delete"
                    ? "Delete Course"
                    : "Course Details"}
                </h3>

                <p>
                  {modalType === "delete"
                    ? "Confirm permanent removal of this course"
                    : "Manage your institute course information"}
                </p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <X size={17} />
              </button>

            </div>

            {modalType === "delete" ? (

              <div className="delete-confirm-content">
                <div className="delete-icon-badge" aria-hidden="true">
                  <Trash2 size={24} strokeWidth={2.2} />
                </div>

                <p className="delete-confirm-text">
                  Are you sure you want to delete{" "}
                  <strong>{selected?.name}</strong>?
                </p>

                <p className="delete-confirm-subtext">
                  This course will be permanently removed from your institute
                  list and cannot be undone.
                </p>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="delete-confirm-btn"
                    onClick={confirmDelete}
                  >
                    Delete Course
                  </button>
                </div>
              </div>

            ) : modalType === "view" ? (

              <div className="view-details">
                <p><strong>Course:</strong> {selected.name}</p>
                <p><strong>Department:</strong> {selected.department}</p>
                <p><strong>Duration:</strong> {selected.duration}</p>
                <p><strong>Status:</strong> {selected.status}</p>
                <p><strong>Students:</strong> {selected.students}</p>
              </div>

            ) : (

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Course Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter course name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <input
                    name="department"
                    list="department-options"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                    required
                  />
                  <datalist id="department-options">
                    {departmentList.map(item => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                </div>

                <div className="form-row">

                  <div className="form-group">
                    <label>Duration</label>
                    <select
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select duration</option>
                      <option>1 Year</option>
                      <option>2 Years</option>
                      <option>3 Years</option>
                      <option>4 Years</option>
                      <option>5 Years</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      {[...new Set(["Active", "Inactive", ...statusList])].map(
                        item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                </div>

                <div className="form-group">
                  <label>Students</label>
                  <input
                    type="number"
                    name="students"
                    value={form.students}
                    onChange={handleChange}
                    placeholder="Enter students count"
                    min="0"
                    required
                  />
                </div>

                <div className="modal-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-btn">
                    {modalType === "add" ? "Add Course" : "Update Course"}
                  </button>

                </div>

              </form>

            )}

            {modalType === "view" && (
              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            )}

          </div>

        </div>

      )}

    </div>
    </div>
  );
}

export default Cource;
