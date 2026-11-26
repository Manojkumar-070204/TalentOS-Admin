import  { useEffect, useMemo, useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./attendance.css";

const initialAttendance = [
  {
    id: 1,
    date: "2026-11-30",
    day: "Monday",
    status: "Present",
    remarks: "-",
    department: "Computer Science",
    course: "B.Sc Computer Science",
    student: "Vignesh C",
    faculty: "Arun Kumar",
    time: "09:00 AM",
  },
  {
    id: 2,
    date: "2026-11-29",
    day: "Sunday",
    status: "Late",
    remarks: "Arrived 20 min late",
    department: "Information Technology",
    course: "B.Sc IT",
    student: "Rahul S",
    faculty: "Divya R",
    time: "09:20 AM",
  },
  {
    id: 3,
    date: "2026-11-28",
    day: "Saturday",
    status: "Absent",
    remarks: "Not attended",
    department: "Commerce",
    course: "B.Com",
    student: "Priya M",
    faculty: "Meena S",
    time: "-",
  },
];

const monthRanges = [
  { label: "Jan 01, 2026 – Jan 31, 2026", prefix: "2026-01" },
  { label: "Feb 01, 2026 – Feb 28, 2026", prefix: "2026-02" },
  { label: "Mar 01, 2026 – Mar 31, 2026", prefix: "2026-03" },
  { label: "Apr 01, 2026 – Apr 30, 2026", prefix: "2026-04" },
  { label: "May 01, 2026 – May 31, 2026", prefix: "2026-05" },
  { label: "Jun 01, 2026 – Jun 30, 2026", prefix: "2026-06" },
  { label: "Jul 01, 2026 – Jul 31, 2026", prefix: "2026-07" },
  { label: "Aug 01, 2026 – Aug 31, 2026", prefix: "2026-08" },
  { label: "Sep 01, 2026 – Sep 30, 2026", prefix: "2026-09" },
  { label: "Oct 01, 2026 – Oct 31, 2026", prefix: "2026-10" },
  { label: "Nov 01, 2026 – Nov 30, 2026", prefix: "2026-11" },
  { label: "Dec 01, 2026 – Dec 31, 2026", prefix: "2026-12" },
  { label: "All Time", prefix: null },
];

const dateRanges = monthRanges.map((m) => m.label);

const departments = [
  "All Departments",
  "Computer Science",
  "Information Technology",
  "Commerce",
];

const courses = [
  "All Courses",
  "B.Sc Computer Science",
  "B.Sc IT",
  "B.Com",
];

const tabs = [
  "Daily Attendance",
  "Period Attendance",
  "Student-wise Report",
  "Faculty Report",
];

const getStatusClass = (status) => {
  if (status === "Present") return "present";
  if (status === "Absent") return "absent";
  return "late";
};

const getStatusIcon = (status) => {
  if (status === "Present") return "bi-check-lg";
  if (status === "Absent") return "bi-x-lg";
  return "bi-clock-fill";
};

function OverallDonut({ present, late, absent }) {
  const total = present + late + absent;
  const size = 48;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return (
      <svg
        className="overall-donut"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e4eaf7"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  const presentLen = circumference * (present / total);
  const lateLen = circumference * (late / total);
  const absentLen = circumference * (absent / total);

  const presentOffset = 0;
  const lateOffset = -presentLen;
  const absentOffset = -(presentLen + lateLen);

  return (
    <svg
      className="overall-donut"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#edf2fc"
        strokeWidth={strokeWidth}
      />
      {presentLen > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0ea5e9"
          strokeWidth={strokeWidth}
          strokeDasharray={`${presentLen} ${circumference - presentLen}`}
          strokeDashoffset={presentOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
      {lateLen > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray={`${lateLen} ${circumference - lateLen}`}
          strokeDashoffset={lateOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
      {absentLen > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#c7d2fe"
          strokeWidth={strokeWidth}
          strokeDasharray={`${absentLen} ${circumference - absentLen}`}
          strokeDashoffset={absentOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
    </svg>
  );
}

function DropdownFilter({
  value,
  options,
  onChange,
  iconClass,
  ariaLabel,
  alignRight = false,
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`filter-dropdown-wrap ${alignRight ? "align-right" : ""}`}
      ref={wrapRef}
    >
      <button
        type="button"
        className={`filter-button filter-trigger ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
      >
        {iconClass && <i className={`bi ${iconClass} trigger-icon`}></i>}
        <span className="trigger-label">{value}</span>
        <i className="bi bi-chevron-down dropdown-arrow" aria-hidden="true"></i>
      </button>

      {open && (
        <div className="filter-dropdown-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                key={option}
                className={`filter-dropdown-item ${isSelected ? "is-selected" : ""}`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <span>{option}</span>
                {isSelected && <i className="bi bi-check2" aria-hidden="true"></i>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Attendance() {
  const [activeTab, setActiveTab] = useState("Daily Attendance");
  const [department, setDepartment] = useState("All Departments");
  const [course, setCourse] = useState("All Courses");
  const [dateRange, setDateRange] = useState("Nov 01, 2026 – Nov 30, 2026");
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [attendance, setAttendance] = useState(initialAttendance);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedRecord(null);
        setShowReport(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    const selectedRange = monthRanges.find((m) => m.label === dateRange);

    return attendance.filter((item) => {
      const departmentMatch =
        department === "All Departments" || item.department === department;
      const courseMatch =
        course === "All Courses" || item.course === course;

      const dateMatch =
        !selectedRange ||
        !selectedRange.prefix ||
        item.date.startsWith(selectedRange.prefix);

      const searchMatch =
        !q ||
        `${item.student} ${item.faculty} ${item.date} ${item.status} ${item.department} ${item.course}`
          .toLowerCase()
          .includes(q);

      return departmentMatch && courseMatch && dateMatch && searchMatch;
    });
  }, [attendance, department, course, dateRange, search]);

  const stats = useMemo(() => {
    const total = filteredData.length;
    const present = filteredData.filter((i) => i.status === "Present").length;
    const absent = filteredData.filter((i) => i.status === "Absent").length;
    const late = filteredData.filter((i) => i.status === "Late").length;
    const rate = total > 0 ? (((present + late) / total) * 100).toFixed(1) : "0.0";
    return { total, present, absent, late, rate };
  }, [filteredData]);

  const handleRecordUpdate = (id, patch) => {
    setAttendance((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
    setSelectedRecord((prev) => (prev?.id === id ? { ...prev, ...patch } : prev));
  };

  const columns = useMemo(() => {
    if (activeTab === "Student-wise Report") {
      return ["#", "Student Name", "Course", "Department", "Attendance Status", "Remarks", "Action"];
    }
    if (activeTab === "Faculty Report") {
      return ["#", "Faculty Name", "Department", "Course", "Attendance Status", "Remarks", "Action"];
    }
    if (activeTab === "Period Attendance") {
      return ["#", "Date", "Day", "Attendance Status", "Time", "Remarks", "Action"];
    }
    return ["#", "Date", "Day", "Attendance Status", "Remarks", "Action"];
  }, [activeTab]);

  const getCells = (item, index) => {
    const statusCell = { type: "status", value: item.status };

    if (activeTab === "Student-wise Report") {
      return [index + 1, item.student, item.course, item.department, statusCell, item.remarks];
    }
    if (activeTab === "Faculty Report") {
      return [index + 1, item.faculty, item.department, item.course, statusCell, item.remarks];
    }
    if (activeTab === "Period Attendance") {
      return [index + 1, item.date, item.day, statusCell, item.time, item.remarks];
    }
    return [index + 1, item.date, item.day, statusCell, item.remarks];
  };

  const downloadReport = () => {
    const headers = columns.slice(0, -1);
    const rows = filteredData.map((item, index) =>
      getCells(item, index)
        .map((cell) => {
          const val = typeof cell === "object" ? cell.value : cell;
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${activeTab.toLowerCase().replace(/\s+/g, "-")}.csv`;
    link.click();

    URL.revokeObjectURL(url);
    setShowReport(false);
  };

  return (
    <div className="attendance">
    <main className="attendance-page">
      <div className="attendance-container">
        <section className="attendance-heading">
          <div className="heading-block">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <span>Institute</span>
              <i className="bi bi-chevron-right"></i>
              <span>Attendance</span>
            </nav>

            <div className="heading-title-row">
              <div className="heading-icon">
                <i className="bi bi-calendar2-check-fill"></i>
              </div>
              <div className="heading-text">
                <h1>Attendance Management</h1>
                <p>View and manage attendance records</p>
              </div>
            </div>
          </div>

          <div className="heading-actions">
            <DropdownFilter
              value={dateRange}
              options={dateRanges}
              onChange={setDateRange}
              iconClass="bi-calendar3"
              ariaLabel="Filter by date range"
            />

            <DropdownFilter
              value={department}
              options={departments}
              onChange={setDepartment}
              ariaLabel="Filter by department"
            />

            <DropdownFilter
              value={course}
              options={courses}
              onChange={setCourse}
              ariaLabel="Filter by course"
              alignRight
            />

            <button
              type="button"
              className="report-button"
              onClick={() => setShowReport(true)}
            >
              <i className="bi bi-file-earmark-bar-graph"></i>
              View Report
            </button>
          </div>
        </section>

        <section className="attendance-stats">
          <div className="stat-card overall-card">
            <OverallDonut
              present={stats.present}
              late={stats.late}
              absent={stats.absent}
            />
            <div className="stat-content">
              <span>Overall Attendance</span>
              <h2>{stats.rate}%</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon present-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="stat-content">
              <span>Present Records</span>
              <h2>{stats.present} <small>/ {stats.total}</small></h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon absent-icon">
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <div className="stat-content">
              <span>Absent Records</span>
              <h2>{stats.absent}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon late-icon">
              <i className="bi bi-clock-fill"></i>
            </div>
            <div className="stat-content">
              <span>Late Arrivals</span>
              <h2>{stats.late}</h2>
            </div>
          </div>
        </section>

        <section className="attendance-content">
          <div className="attendance-toolbar">
            <div className="attendance-tabs" role="tablist" aria-label="Attendance views">
              {tabs.map((tab) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  key={tab}
                  className={`attendance-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="attendance-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search attendance..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              )}
            </div>
          </div>

          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id}>
                      {getCells(item, index).map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          {typeof cell === "object" && cell.type === "status" ? (
                            <span className={`status-badge ${getStatusClass(cell.value)}`}>
                              <i className={`bi ${getStatusIcon(cell.value)}`} aria-hidden="true"></i>
                              {cell.value}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="view-button"
                          onClick={() => setSelectedRecord(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="empty-state">
                      <i className="bi bi-inbox"></i>
                      <h3>No attendance records found</h3>
                      <p>Try changing your filters or search keywords.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>
              Showing <strong>{filteredData.length}</strong> of{" "}
              <strong>{attendance.length}</strong> records
            </span>

            <div className="pagination">
              <button type="button" disabled>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button type="button" className="current-page">1</button>
              <button type="button" disabled>2</button>
              <button type="button" disabled>3</button>
              <button type="button" disabled>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        <section className="attendance-bottom">
          <div>
            <span className="bottom-dot green"></span>
            Present: <strong>{stats.present}</strong>
          </div>
          <div>
            <span className="bottom-dot red"></span>
            Absent: <strong>{stats.absent}</strong>
          </div>
          <div>
            <span className="bottom-dot orange"></span>
            Late: <strong>{stats.late}</strong>
          </div>
          <div className="bottom-total">
            Total Records: <strong>{stats.total}</strong>
          </div>
        </section>
      </div>

      {selectedRecord && (
        <div
          className="attendance-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="attendance-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <span>ATTENDANCE DETAILS</span>
                <h2>Record Information</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="modal-close"
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-details">
              {[
                ["Date", selectedRecord.date],
                ["Day", selectedRecord.day],
                ["Student", selectedRecord.student],
                ["Faculty", selectedRecord.faculty],
                ["Department", selectedRecord.department],
                ["Course", selectedRecord.course],
                ["Time", selectedRecord.time],
                ["Remarks", selectedRecord.remarks],
              ].map(([label, value]) => (
                <div className="detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="modal-status-edit">
              <label htmlFor="attendance-status">Update Attendance Status</label>
              <select
                id="attendance-status"
                value={selectedRecord.status}
                onChange={(e) =>
                  handleRecordUpdate(selectedRecord.id, { status: e.target.value })
                }
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>

            <button
              type="button"
              className="modal-primary-button"
              onClick={() => setSelectedRecord(null)}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {showReport && (
        <div
          className="attendance-modal-overlay"
          onClick={() => setShowReport(false)}
        >
          <div
            className="attendance-modal report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <span>ATTENDANCE REPORT</span>
                <h2>Report Overview</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowReport(false)}
                className="modal-close"
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <p className="report-subtitle">
              Your current attendance report based on selected filters.
            </p>

            <div className="report-summary-grid">
              <div>
                <span>Total Records</span>
                <h3>{stats.total}</h3>
              </div>
              <div>
                <span>Present</span>
                <h3>{stats.present}</h3>
              </div>
              <div>
                <span>Absent</span>
                <h3>{stats.absent}</h3>
              </div>
              <div>
                <span>Late</span>
                <h3>{stats.late}</h3>
              </div>
            </div>

            <button
              type="button"
              className="modal-primary-button"
              onClick={downloadReport}
            >
              <i className="bi bi-download"></i>
              Download CSV Report
            </button>
          </div>
        </div>
      )}
    </main>
    </div>
  );
}

export default Attendance;