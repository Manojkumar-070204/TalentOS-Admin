import  { useEffect, useMemo, useRef, useState } from 'react';
import {Search,ChevronDown,CalendarDays,Plus,Users,Check,Flag,Pause,Eye,Pencil,Trash2,X,} 
from 'lucide-react';
import './Batches.css';

const COURSES = ['Computer Science (CSE)', 'Data Science', 'Artificial Intelligence', 'Information Technology'];
const YEARS = ['2026-2027', '2025-2026', '2024-2025'];
const STUDY_YEARS = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
const STATUSES = ['Active', 'Completed', 'Inactive'];
const PAGE_SIZE = 3;

const mk = (id, course, academicYear, studyYear, status = 'Active') => ({
  id,
  batchName: `${academicYear} - ${studyYear}`,
  course,
  academicYear,
  studyYear,
  status,
});

const initialBatches = [
  mk(1, COURSES[0], '2026-2027', 'First Year'),
  mk(2, COURSES[1], '2026-2027', 'Second Year'),
  mk(3, COURSES[2], '2026-2027', 'Third Year'),
  mk(4, COURSES[3], '2026-2027', 'Fourth Year'),
  mk(5, COURSES[0], '2025-2026', 'First Year'),
  mk(6, COURSES[1], '2025-2026', 'Second Year'),
  mk(7, COURSES[2], '2025-2026', 'Third Year'),
  mk(8, COURSES[3], '2025-2026', 'Fourth Year'),
  mk(9, COURSES[0], '2024-2025', 'First Year'),
  mk(10, COURSES[1], '2024-2025', 'Second Year'),
  mk(11, COURSES[2], '2024-2025', 'Fourth Year', 'Completed'),
  mk(12, COURSES[3], '2024-2025', 'Third Year', 'Inactive'),
];

const blueBars = [22, 30, 40, 52, 66, 82, 100];
const purpleBars = [20, 30, 42, 56, 70, 84, 98];
const peachBars = [16, 26, 36, 48, 62, 78, 94];

const emptyForm = {
  batchName: '',
  course: COURSES[0],
  academicYear: YEARS[0],
  studyYear: STUDY_YEARS[0],
  status: 'Active',
};

const viewBackdropStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  background: 'rgba(11, 29, 81, 0.45)',
};

const viewCardStyle = {
  width: '100%',
  maxWidth: '520px',
  maxHeight: 'calc(100vh - 32px)',
  background: '#ffffff',
  border: '1px solid #dce6fb',
  borderRadius: '20px',
  boxShadow: '0 22px 54px rgba(11, 29, 81, 0.24)',
  overflowY: 'auto',
};

const viewHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 26px',
  background: 'linear-gradient(180deg, #eff4ff 0%, #e5eeff 100%)',
  borderBottom: '1px solid #e4ecfc',
};

const viewTitleStyle = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 800,
  color: '#0b1d51',
  letterSpacing: '-0.15px',
};

const viewCloseBtnStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  border: '1px solid #d5e2fb',
  background: '#f5f8ff',
  color: '#0b1d51',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
};

const viewBodyStyle = {
  padding: '20px 26px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  background: '#ffffff',
};

const viewGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const viewLabelStyle = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#2447a3',
};

const viewValueBoxStyle = {
  width: '100%',
  minHeight: '44px',
  padding: '10px 14px',
  background: '#ffffff',
  border: '1px solid #bdd1fa',
  borderRadius: '11px',
  fontSize: '15px',
  fontWeight: 700,
  color: '#0b1d51',
  display: 'flex',
  alignItems: 'center',
};

function BlueSelect({ value, options, onChange, variant = 'toolbar' }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const triggerClass =
    variant === 'modal'
      ? `bt-popup-input bt-custom-select-btn ${open ? 'bt-open' : ''}`
      : `bt-batch-filter-select bt-custom-select-btn ${open ? 'bt-open' : ''}`;

  return (
    <div className="bt-custom-select" ref={boxRef}>
      <button
        type="button"
        className={triggerClass}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="bt-custom-select-val">{value}</span>
        <ChevronDown className={`bt-select-chevron ${open ? 'bt-rotate' : ''}`} />
      </button>

      {open && (
        <ul className="bt-custom-select-menu" role="listbox">
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                className={`bt-custom-select-option ${selected ? 'bt-selected' : ''}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <span>{opt}</span>
                {selected && <Check className="bt-option-check" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function AcademicBatchesPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [searchBatch, setSearchBatch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All Courses');
  const [yearFilter, setYearFilter] = useState('All Academic Years');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);

  const [popup, setPopup] = useState({ type: null, data: null });
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setPopup({ type: null, data: null });
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const openAddPopup = () => {
    setFormData(emptyForm);
    setPopup({ type: 'add', data: null });
  };
  const openEditPopup = (b) => {
    setFormData({
      batchName: b.batchName,
      course: b.course,
      academicYear: b.academicYear,
      studyYear: b.studyYear,
      status: b.status,
    });
    setPopup({ type: 'edit', data: b });
  };
  const openViewPopup = (b) => setPopup({ type: 'view', data: b });
  const openDeletePopup = (b) => setPopup({ type: 'delete', data: b });
  const closePopup = () => setPopup({ type: null, data: null });

  const handleSaveBatch = (e) => {
    e.preventDefault();
    if (!formData.batchName.trim()) return;
    if (popup.type === 'add') {
      setBatches((prev) => [...prev, { id: Date.now(), ...formData }]);
    } else if (popup.type === 'edit' && popup.data) {
      setBatches((prev) => prev.map((i) => (i.id === popup.data.id ? { ...i, ...formData } : i)));
    }
    closePopup();
  };

  const handleConfirmDelete = () => {
    if (!popup.data) return;
    setBatches((prev) => prev.filter((i) => i.id !== popup.data.id));
    closePopup();
  };

  const filteredBatches = useMemo(() => {
    const q = searchBatch.trim().toLowerCase();
    return batches.filter(
      (i) =>
        (!q || i.batchName.toLowerCase().includes(q) || i.course.toLowerCase().includes(q)) &&
        (courseFilter === 'All Courses' || i.course === courseFilter) &&
        (yearFilter === 'All Academic Years' || i.academicYear === yearFilter) &&
        (statusFilter === 'All Status' || i.status === statusFilter)
    );
  }, [batches, searchBatch, courseFilter, yearFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBatches.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageRows = filteredBatches.slice(startIdx, startIdx + PAGE_SIZE);

  const countBy = (s) => batches.filter((b) => b.status === s).length;

  const withResetVal = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  return (
    <div className="batchpage">
    <div className="bt-batches-page-shell">
      <main className="bt-batches-main">
        <div className="bt-banner">
          <div className="bt-batches-breadcrumb">
            <span className="bt-crumb-parent">Institute</span>
            <span className="bt-crumb-sep">&gt;</span>
            <span className="bt-crumb-active">Batches</span>
          </div>
          <div className="bt-batches-header">
            <div className="bt-batches-header-left">
              <div className="bt-title-icon-box">
                <CalendarDays size={30} />
              </div>
              <div>
                <h1 className="bt-batches-title">Academic Batches</h1>
                <p className="bt-batches-subtitle">Manage academic batches for your institute</p>
              </div>
            </div>

            <button type="button" className="bt-btn-add-batch" onClick={openAddPopup}>
              <Plus size={22} strokeWidth={2.6} />
              <span>Add Batch</span>
            </button>
          </div>
        </div>
        <div className="bt-stats-grid">
          <div className="bt-metric-card">
            <div className="bt-metric-top">
              <div className="bt-metric-ring bt-ring-blue">
                <Users size={30} className="bt-icon-blue-solid" />
              </div>
              <div>
                <div className="bt-metric-label">Total Batches</div>
                <div className="bt-metric-num">{batches.length}</div>
              </div>
            </div>
            <div className="bt-bars-chart">
              {blueBars.map((h, i) => (
                <span key={i} className="bt-bar-item bt-bar-blue" style={{ height: `${h}%`, opacity: 0.28 + i * 0.12 }} />
              ))}
            </div>
          </div>
          <div className="bt-metric-card">
            <div className="bt-metric-top">
              <div className="bt-metric-ring bt-ring-green">
                <div className="bt-metric-circle bt-bg-green">
                  <Check size={21} strokeWidth={3.4} className="bt-white-icon" />
                </div>
              </div>
              <div>
                <div className="bt-metric-label">Active Batches</div>
                <div className="bt-metric-num">{countBy('Active')}</div>
              </div>
            </div>
            <svg className="bt-area-chart" viewBox="0 0 120 44" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="activeGreenFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M 2 41 C 7 37, 10 34, 13 34 C 16 34, 18 37, 21 37 C 26 37, 36 22, 43 22 C 47 22, 49 27, 53 27 C 58 27, 67 13, 73 13 C 78 13, 81 20, 86 20 C 91 20, 97 9, 101 9 C 103 9, 104 10, 106 9 C 110 7, 115 3, 118 2 L 118 42 L 2 42 Z"
                fill="url(#activeGreenFill)"
              />
              <path
                d="M 2 41 C 7 37, 10 34, 13 34 C 16 34, 18 37, 21 37 C 26 37, 36 22, 43 22 C 47 22, 49 27, 53 27 C 58 27, 67 13, 73 13 C 78 13, 81 20, 86 20 C 91 20, 97 9, 101 9 C 103 9, 104 10, 106 9 C 110 7, 115 3, 118 2"
                className="bt-spark-line-stroke"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="bt-metric-card">
            <div className="bt-metric-top">
              <div className="bt-metric-ring bt-ring-purple">
                <Flag size={28} className="bt-flag-icon" />
              </div>
              <div>
                <div className="bt-metric-label">Completed Batches</div>
                <div className="bt-metric-num">{countBy('Completed')}</div>
              </div>
            </div>
            <div className="bt-bars-chart">
              {purpleBars.map((h, i) => (
                <span key={i} className="bt-bar-item bt-bar-peach" style={{ height: `${h}%`, opacity: 0.28 + i * 0.12 }} />
              ))}
            </div>
          </div>
          <div className="bt-metric-card">
            <div className="bt-metric-top">
              <div className="bt-metric-ring bt-ring-amber">
                <div className="bt-metric-circle bt-bg-amber">
                  <Pause size={21} className="bt-pause-icon" />
                </div>
              </div>
              <div>
                <div className="bt-metric-label">Inactive Batches</div>
                <div className="bt-metric-num">{countBy('Inactive')}</div>
              </div>
            </div>
            <div className="bt-bars-chart">
              {peachBars.map((h, i) => (
                <span key={i} className="bt-bar-item bt-bar-purple" style={{ height: `${h}%`, opacity: 0.28 + i * 0.12 }} />
              ))}
            </div>
          </div>
        </div>
        <div className="bt-toolbar-row">
          <div className="bt-batch-search-wrap">
            <Search size={22} className="bt-batch-search-icon" />
            <input
              type="text"
              className="bt-batch-search-input"
              placeholder="Search batch or course..."
              value={searchBatch}
              onChange={(e) => {
                setSearchBatch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="bt-filter-group">
            <div className="bt-select-box">
              <BlueSelect
                value={courseFilter}
                options={['All Courses', ...COURSES]}
                onChange={withResetVal(setCourseFilter)}
              />
            </div>

            <div className="bt-select-box">
              <BlueSelect
                value={yearFilter}
                options={['All Academic Years', ...YEARS]}
                onChange={withResetVal(setYearFilter)}
              />
            </div>

            <div className="bt-select-box">
              <BlueSelect
                value={statusFilter}
                options={['All Status', ...STATUSES]}
                onChange={withResetVal(setStatusFilter)}
              />
            </div>
          </div>
        </div>
        <div className="bt-batches-table-card">
          <div className="bt-table-scroll">
            <table className="bt-batches-table">
              <thead>
                <tr>
                  <th className="bt-col-index">#</th>
                  <th>Batch Name</th>
                  <th>Course</th>
                  <th>Academic Year</th>
                  <th>Study Year</th>
                  <th>Status</th>
                  <th className="bt-col-action-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="bt-empty-row">
                      No batches found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row, idx) => {
                    const pillClass =
                      row.status === 'Active'
                        ? 'bt-pill-active'
                        : row.status === 'Completed'
                        ? 'bt-pill-completed'
                        : 'bt-pill-inactive';
                    return (
                      <tr key={row.id}>
                        <td className="bt-col-index" data-label="#">
                          {startIdx + idx + 1}
                        </td>
                        <td data-label="Batch Name">{row.batchName}</td>
                        <td data-label="Course">{row.course}</td>
                        <td data-label="Academic Year">{row.academicYear}</td>
                        <td data-label="Study Year">{row.studyYear}</td>
                        <td data-label="Status">
                          <span className={`bt-batch-pill ${pillClass}`}>{row.status}</span>
                        </td>
                        <td className="bt-col-action-cell" data-label="Action">
                          <div className="bt-action-btn-group">
                            <button
                              type="button"
                              className="bt-tbl-action-btn bt-tbl-btn-blue"
                              title="View"
                              onClick={() => openViewPopup(row)}
                            >
                              <Eye />
                            </button>
                            <button
                              type="button"
                              className="bt-tbl-action-btn bt-tbl-btn-blue"
                              title="Edit"
                              onClick={() => openEditPopup(row)}
                            >
                              <Pencil />
                            </button>
                            <button
                              type="button"
                              className="bt-tbl-action-btn bt-tbl-btn-red"
                              title="Delete"
                              onClick={() => openDeletePopup(row)}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="bt-batches-table-footer">
            <div className="bt-footer-count-text">
              Showing {filteredBatches.length === 0 ? 0 : startIdx + 1} to{' '}
              {Math.min(startIdx + PAGE_SIZE, filteredBatches.length)} of {filteredBatches.length} entries
            </div>

            <div className="bt-pagination-group">
              <button
                type="button"
                className="bt-pg-btn"
                disabled={page <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`bt-pg-btn ${n === page ? 'bt-active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="bt-pg-btn"
                disabled={page >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
      {(popup.type === 'add' || popup.type === 'edit') && (
        <div className="bt-popup-backdrop" onClick={closePopup}>
          <div className="bt-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="bt-popup-header">
              <h2 className="bt-popup-title">
                {popup.type === 'add' ? 'Add New Batch' : 'Edit Batch'}
              </h2>
              <button type="button" className="bt-popup-close-btn" onClick={closePopup}>
                <X />
              </button>
            </div>
            <form className="bt-popup-form" onSubmit={handleSaveBatch}>
              <div className="bt-popup-field">
                <label className="bt-popup-label">Batch Name</label>
                <input
                  type="text"
                  className="bt-popup-input"
                  placeholder="e.g. 2026-2027 - First Year"
                  value={formData.batchName}
                  onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                  required
                />
              </div>

              <div className="bt-popup-field">
                <label className="bt-popup-label">Course</label>
                <BlueSelect
                  variant="modal"
                  value={formData.course}
                  options={COURSES}
                  onChange={(val) => setFormData({ ...formData, course: val })}
                />
              </div>

              <div className="bt-popup-field-row">
                <div className="bt-popup-field">
                  <label className="bt-popup-label">Academic Year</label>
                  <BlueSelect
                    variant="modal"
                    value={formData.academicYear}
                    options={YEARS}
                    onChange={(val) => setFormData({ ...formData, academicYear: val })}
                  />
                </div>

                <div className="bt-popup-field">
                  <label className="bt-popup-label">Study Year</label>
                  <BlueSelect
                    variant="modal"
                    value={formData.studyYear}
                    options={STUDY_YEARS}
                    onChange={(val) => setFormData({ ...formData, studyYear: val })}
                  />
                </div>
              </div>

              <div className="bt-popup-field">
                <label className="bt-popup-label">Status</label>
                <BlueSelect
                  variant="modal"
                  value={formData.status}
                  options={STATUSES}
                  onChange={(val) => setFormData({ ...formData, status: val })}
                />
              </div>

              <div className="bt-popup-actions">
                <button type="button" className="bt-popup-btn-secondary" onClick={closePopup}>
                  Cancel
                </button>
                <button type="submit" className="bt-popup-btn-primary">
                  {popup.type === 'add' ? 'Create Batch' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {popup.type === 'view' && popup.data && (
        <div style={viewBackdropStyle} onClick={closePopup}>
          <div style={viewCardStyle} onClick={(e) => e.stopPropagation()}>
            <div style={viewHeaderStyle}>
              <h2 style={viewTitleStyle}>Batch Details</h2>
              <button type="button" style={viewCloseBtnStyle} onClick={closePopup}>
                <X size={18} />
              </button>
            </div>
            <div style={viewBodyStyle}>
              <div style={viewGroupStyle}>
                <label style={viewLabelStyle}>Batch Name</label>
                <div style={viewValueBoxStyle}>{popup.data.batchName}</div>
              </div>

              <div style={viewGroupStyle}>
                <label style={viewLabelStyle}>Course</label>
                <div style={viewValueBoxStyle}>{popup.data.course}</div>
              </div>

              <div style={viewGroupStyle}>
                <label style={viewLabelStyle}>Academic Year</label>
                <div style={viewValueBoxStyle}>{popup.data.academicYear}</div>
              </div>

              <div style={viewGroupStyle}>
                <label style={viewLabelStyle}>Study Year</label>
                <div style={viewValueBoxStyle}>{popup.data.studyYear}</div>
              </div>

              <div style={viewGroupStyle}>
                <label style={viewLabelStyle}>Status</label>
                <div style={viewValueBoxStyle}>{popup.data.status}</div>
              </div>

              <div className="bt-popup-actions">
                <button type="button" className="bt-popup-btn-primary" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {popup.type === 'delete' && popup.data && (
        <div className="bt-popup-backdrop" onClick={closePopup}>
          <div className="bt-popup-card bt-popup-card-delete" onClick={(e) => e.stopPropagation()}>
            <div className="bt-delete-body">
              <div className="bt-delete-icon">
                <Trash2 />
              </div>
              <h3 className="bt-delete-title">Delete Batch?</h3>
              <p className="bt-delete-text">
                Are you sure you want to delete <strong>{popup.data.batchName}</strong>? This action cannot be undone.
              </p>
              <div className="bt-delete-actions">
                <button type="button" className="bt-popup-btn-secondary" onClick={closePopup}>
                  Cancel
                </button>
                <button type="button" className="bt-popup-btn-danger" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}