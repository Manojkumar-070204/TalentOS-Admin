import React, { useMemo, useState } from "react";
import {
  Users,  PauseCircle, UserPlus, Search, ChevronDown,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, Pencil,
  Trash2, X, Plus, Home, ChevronRight as CrumbChevron, CheckCircle2,
  Mail, Phone, GraduationCap, Building2, CalendarDays, 
} from "lucide-react";
import "./Studentlist.css";

const initialStudents = [
  { id: "STU001", name: "Abhishek Kumar", department: "Computer Science", course: "B.Sc Computer Science", batch: "2026-2027 - First Year", status: "Active", email: "abhishek.kumar@example.com", phone: "+91 98765 43210", photo: "AK" },
  { id: "STU002", name: "Priya Sharma", department: "Data Science", course: "B.Sc Data Science", batch: "2026-2027 - First Year", status: "Active", email: "priya.sharma@example.com", phone: "+91 98765 43211", photo: "PS" },
  { id: "STU003", name: "Rahul Verma", department: "Artificial Intelligence", course: "B.Tech AI", batch: "2026-2027 - Second Year", status: "Active", email: "rahul.verma@example.com", phone: "+91 98765 43212", photo: "RV" },
  { id: "STU004", name: "Sneha Patel", department: "Computer Science", course: "B.Tech CSE", batch: "2026-2027 - Third Year", status: "Inactive", email: "sneha.patel@example.com", phone: "+91 98765 43213", photo: "SP" },
  { id: "STU005", name: "Vikram Singh", department: "Data Science", course: "M.Sc Data Science", batch: "2026-2027 - Second Year", status: "Active", email: "vikram.singh@example.com", phone: "+91 98765 43214", photo: "VS" },
  { id: "STU006", name: "Ananya Rao", department: "Computer Science", course: "B.Sc Computer Science", batch: "2026-2027 - First Year", status: "Active", email: "ananya.rao@example.com", phone: "+91 98765 43215", photo: "AR" },
  { id: "STU007", name: "Karthik Reddy", department: "Cyber Security", course: "B.Tech Cyber Security", batch: "2026-2027 - Third Year", status: "Inactive", email: "karthik.reddy@example.com", phone: "+91 98765 43216", photo: "KR" },
  { id: "STU008", name: "Meera Nair", department: "Artificial Intelligence", course: "B.Tech AI", batch: "2026-2027 - Second Year", status: "Active", email: "meera.nair@example.com", phone: "+91 98765 43217", photo: "MN" },
];

const emptyForm = { name: "", email: "", phone: "", department: "Computer Science", course: "B.Sc Computer Science", batch: "2026-2027 - First Year", status: "Active", photo: "" };
const departments = ["All Departments", "Computer Science", "Data Science", "Artificial Intelligence", "Cyber Security"];
const courses = ["All Courses", "B.Sc Computer Science", "B.Sc Data Science", "B.Tech AI", "B.Tech CSE", "M.Sc Data Science", "B.Tech Cyber Security"];
const batches = ["All Batches", "2026-2027 - First Year", "2026-2027 - Second Year", "2026-2027 - Third Year"];
const statuses = ["All Status", "Active", "Inactive"];

function Studentlist() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [course, setCourse] = useState("All Courses");
  const [batch, setBatch] = useState("All Batches");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);
  const [activeStudent, setActiveStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const pageSize = 5;

  const filtered = useMemo(() => students.filter((s) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [s.name, s.id, s.email, s.department, s.course].some((v) => v.toLowerCase().includes(term));
    return matchesSearch &&
      (department === "All Departments" || s.department === department) &&
      (course === "All Courses" || s.course === course) &&
      (batch === "All Batches" || s.batch === batch) &&
      (status === "All Status" || s.status === status);
  }), [students, search, department, course, batch, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const activeCount = students.filter((s) => s.status === "Active").length;
  const inactiveCount = students.length - activeCount;

 

  const openAdd = () => { setActiveStudent(null); setForm(emptyForm); setImagePreview(""); setModal("add"); };
  const openEdit = (student) => {
    setActiveStudent(student);
    setForm({ name: student.name, email: student.email, phone: student.phone, department: student.department, course: student.course, batch: student.batch, status: student.status, photo: student.photo || "" });
    setImagePreview(student.photo?.startsWith("data:image/") ? student.photo : "");
    setModal("edit");
  };
  const saveStudent = (e) => {
    e.preventDefault();
    if (modal === "edit" && activeStudent) {
      setStudents((old) => old.map((s) => s.id === activeStudent.id ? { ...s, ...form } : s));
    } else {
      const nextId = `STU${String(Math.max(0, ...students.map((s) => Number(s.id.slice(3)) || 0)) + 1).padStart(3, "0")}`;
      setStudents((old) => [...old, { ...form, id: nextId, photo: form.photo || form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }]);
    }
    setModal(null);
  };
  const confirmDelete = () => {
    setStudents((old) => old.filter((s) => s.id !== deleteTarget.id));
    setSelected((old) => old.filter((id) => id !== deleteTarget.id));
    setDeleteTarget(null);
    if ((page - 1) * pageSize >= filtered.length - 1 && page > 1) setPage(page - 1);
  };
  const toggleAll = (checked) => setSelected(checked ? visible.map((s) => s.id) : []);
  const toggleOne = (id, checked) => setSelected((old) => checked ? [...old, id] : old.filter((x) => x !== id));

  return (
    <div className="studentlist-page">
      <div className="sl-breadcrumb">
        <Home className="sl-breadcrumb-home" size={17} fill="currentColor" />
        <CrumbChevron size={15} />
        <span>Institute</span>
        <CrumbChevron size={15} />
        <strong>Students</strong>
      </div>

      <div className="sl-page-heading">
        <div className="sl-title-wrap">
          <Users className="sl-title-icon" size={48} fill="currentColor" strokeWidth={1.7} />
          <div>
            <h1>Students</h1>
            <p>Manage and view all students in your institute</p>
          </div>
        </div>
        <button className="sl-primary-btn" onClick={openAdd}><Plus size={19} /> Add Student</button>
      </div>

      <section className="sl-stats-grid">
        <article className="sl-stat-card sl-stat-blue">
          <div className="sl-stat-icon"><Users size={34} fill="currentColor" /></div>
          <div className="sl-stat-copy"><strong>{(4850 + students.length - 8).toLocaleString("en-IN")}</strong><span>Total Students</span><small>↗ +12%</small></div>
          <svg className="sl-sparkline" viewBox="0 0 110 64" aria-hidden="true">
  <path
    className="sl-spark-area"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4 L108 64 L2 64 Z"
  />
  <path
    className="sl-spark-line"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4"
  />
</svg>
        </article>
        <article className="sl-stat-card sl-stat-green">
          <div className="sl-stat-icon"><CheckCircle2 size={34} fill="currentColor" /></div>
          <div className="sl-stat-copy"><strong>{(4620 + activeCount - 6).toLocaleString("en-IN")}</strong><span>Active Students</span><small>↗ +10%</small></div>
          <svg className="sl-sparkline" viewBox="0 0 110 64" aria-hidden="true">
  <path
    className="sl-spark-area"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4 L108 64 L2 64 Z"
  />
  <path
    className="sl-spark-line"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4"
  />
</svg>
        </article>
        <article className="sl-stat-card sl-stat-orange">
          <div className="sl-stat-icon"><PauseCircle size={34} fill="currentColor" /></div>
          <div className="sl-stat-copy"><strong>{(120 + inactiveCount - 2).toLocaleString("en-IN")}</strong><span>Inactive Students</span><small>↗ +2%</small></div>
         <svg className="sl-sparkline" viewBox="0 0 110 64" aria-hidden="true">
  <path
    className="sl-spark-area"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4 L108 64 L2 64 Z"
  />
  <path
    className="sl-spark-line"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4"
  />
</svg>
        </article>
        <article className="sl-stat-card sl-stat-purple">
          <div className="sl-stat-icon"><UserPlus size={34} fill="currentColor" /></div>
          <div className="sl-stat-copy"><strong>110</strong><span>New Registrations</span><small>↗ +8%</small></div>
          <svg className="sl-sparkline" viewBox="0 0 110 64" aria-hidden="true">
  <path
    className="sl-spark-area"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4 L108 64 L2 64 Z"
  />
  <path
    className="sl-spark-line"
    d="M2 58 C18 49 20 53 31 39 S48 48 58 30 S73 36 83 17 S99 22 108 4"
  />
</svg>
        </article>
      </section>

      <section className="sl-table-card">
        <div className="sl-filter-row">
          <label className="sl-search-field"><Search size={20} /><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name, email or student ID..." /></label>
          <label className="sl-select-wrap"><select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }} aria-label="Filter by department">{departments.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={17} /></label>
          <label className="sl-select-wrap"><select value={course} onChange={(e) => { setCourse(e.target.value); setPage(1); }} aria-label="Filter by course">{courses.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={17} /></label>
          <label className="sl-select-wrap"><select value={batch} onChange={(e) => { setBatch(e.target.value); setPage(1); }} aria-label="Filter by batch">{batches.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={17} /></label>
          <label className="sl-select-wrap"><select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} aria-label="Filter by status">{statuses.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={17} /></label>
          <button className="sl-search-btn" onClick={() => setPage(1)}><Search size={18} /> Search</button>
        </div>

        {selected.length > 0 && <div className="sl-selection-bar"><span>{selected.length} student{selected.length > 1 ? "s" : ""} selected</span><button onClick={() => setSelected([])}>Clear selection</button></div>}

        <div className="sl-table-scroll">
          <table className="sl-students-table">
            <thead><tr>
              <th className="sl-check-col"><input type="checkbox" checked={visible.length > 0 && visible.every((s) => selected.includes(s.id))} onChange={(e) => toggleAll(e.target.checked)} aria-label="Select all visible students" /></th>
              <th>#</th><th>Photo</th><th>Student Name</th><th>Student ID</th><th>Department</th><th>Course</th><th>Batch</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {visible.length ? visible.map((student, index) => (
                <tr key={student.id}>
                  <td><input type="checkbox" checked={selected.includes(student.id)} onChange={(e) => toggleOne(student.id, e.target.checked)} aria-label={`Select ${student.name}`} /></td>
                  <td>{(page - 1) * pageSize + index + 1}</td>
                  <td>{student.photo?.startsWith("data:image/") ? <img className="sl-avatar sl-avatar-image" src={student.photo} alt={`${student.name} profile`} /> : <div className={`sl-avatar sl-avatar-${index % 5}`}>{student.photo}</div>}</td>
                  <td className="sl-student-name">{student.name}</td>
                  <td>{student.id}</td><td>{student.department}</td><td>{student.course}</td><td>{student.batch}</td>
                  <td><span className={`sl-status ${student.status.toLowerCase()}`}>{student.status}</span></td>
                  <td><div className="sl-action-group">
                    <button className="sl-action view" title="View student" onClick={() => { setActiveStudent(student); setModal("view"); }}><Eye size={17} /></button>
                    <button className="sl-action edit" title="Edit student" onClick={() => openEdit(student)}><Pencil size={17} /></button>
                    <button className="sl-action delete" title="Delete student" onClick={() => setDeleteTarget(student)}><Trash2 size={17} /></button>
                  </div></td>
                </tr>
              )) : <tr><td colSpan="10" className="sl-empty-state">No students found. Try changing your search or filters.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="sl-table-footer">
          <span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filtered.length)} of {filtered.length.toLocaleString("en-IN")} students</span>
          <div className="sl-pagination">
            <button onClick={() => setPage(1)} disabled={page === 1} aria-label="First page"><ChevronsLeft size={17} /></button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page"><ChevronLeft size={17} /></button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).filter((p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1).map((p, i, arr) => (
              <React.Fragment key={p}>{i > 0 && p - arr[i - 1] > 1 && <span className="sl-ellipsis">...</span>}<button className={page === p ? "active" : ""} onClick={() => setPage(p)}>{p}</button></React.Fragment>
            ))}
            <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} aria-label="Next page"><ChevronRight size={17} /></button>
            <button onClick={() => setPage(pageCount)} disabled={page === pageCount} aria-label="Last page"><ChevronsRight size={17} /></button>
          </div>
        </div>
      </section>

      {modal && <div className="sl-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
        <div className="sl-modal" role="dialog" aria-modal="true">
          <div className="sl-modal-header">
            <div><h2>{modal === "add" ? "Add New Student" : modal === "edit" ? "Edit Student Details" : "Student Details"}</h2><p>{modal === "view" ? "Review the student's information" : "Enter the student information below"}</p></div>
            <button className="sl-modal-close" onClick={() => setModal(null)} aria-label="Close"><X size={20} /></button>
          </div>
          {modal === "view" && activeStudent ? <div className="sl-view-details">
            <div className="sl-view-person">{activeStudent.photo?.startsWith("data:image/") ? <img className="sl-avatar sl-view-avatar sl-avatar-image" src={activeStudent.photo} alt={`${activeStudent.name} profile`} /> : <div className="sl-avatar sl-view-avatar">{activeStudent.photo}</div>}<div><h3>{activeStudent.name}</h3><span>{activeStudent.id}</span><span className={`sl-status ${activeStudent.status.toLowerCase()}`}>{activeStudent.status}</span></div></div>
            <div className="sl-detail-grid">
              <div><Mail size={17} /><span>Email</span><strong>{activeStudent.email}</strong></div>
              <div><Phone size={17} /><span>Phone</span><strong>{activeStudent.phone}</strong></div>
              <div><Building2 size={17} /><span>Department</span><strong>{activeStudent.department}</strong></div>
              <div><GraduationCap size={17} /><span>Course</span><strong>{activeStudent.course}</strong></div>
              <div><CalendarDays size={17} /><span>Batch</span><strong>{activeStudent.batch}</strong></div>
            </div>
            <div className="sl-modal-actions"><button className="sl-secondary-btn" onClick={() => setModal(null)}>Close</button><button className="sl-primary-btn" onClick={() => openEdit(activeStudent)}><Pencil size={16} /> Edit Student</button></div>
          </div> : <form onSubmit={saveStudent}>
            <div className="sl-form-grid">
              <label>Student Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" /></label>
              <label>Email Address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="student@example.com" /></label>
              <label>Phone Number<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000" /></label>
              <label>Department<select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>{departments.slice(1).map((x) => <option key={x}>{x}</option>)}</select></label>
              <label>Course<select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>{courses.slice(1).map((x) => <option key={x}>{x}</option>)}</select></label>
              <label>Batch<select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })}>{batches.slice(1).map((x) => <option key={x}>{x}</option>)}</select></label>
              <label className="sl-photo-upload-label">Student Photo
                <span className="sl-photo-upload-box">
                  {imagePreview ? <img src={imagePreview} alt="Selected student" className="sl-photo-preview" /> : <span className="sl-photo-placeholder"><UserPlus size={22} /><small>Choose image</small></span>}
                  <span className="sl-photo-upload-text">{imagePreview ? "Change photo" : "Choose file"}<small>JPG, PNG or WEBP · Max 5 MB</small></span>
                  <input className="sl-photo-file-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { alert("Please choose an image smaller than 5 MB."); e.target.value = ""; return; } const reader = new FileReader(); reader.onload = () => { const image = String(reader.result || ""); setImagePreview(image); setForm((old) => ({ ...old, photo: image })); }; reader.readAsDataURL(file); }} />
                </span>
              </label>
              <label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></label>
            </div>
            <div className="sl-modal-actions"><button type="button" className="sl-secondary-btn" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="sl-primary-btn"><Plus size={17} /> {modal === "edit" ? "Save Changes" : "Add Student"}</button></div>
          </form>}
        </div>
      </div>}

      {deleteTarget && <div className="sl-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
        <div className="sl-confirm-modal" role="alertdialog" aria-modal="true">
          <div className="sl-delete-icon"><Trash2 size={25} /></div>
          <h2>Delete Student?</h2>
          <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.</p>
          <div className="sl-modal-actions"><button className="sl-secondary-btn" onClick={() => setDeleteTarget(null)}>Cancel</button><button className="sl-danger-btn" onClick={confirmDelete}>Delete Student</button></div>
        </div>
      </div>}
    </div>
  );
}

export default Studentlist;
