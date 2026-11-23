import  { useState, useEffect } from 'react';
import './student profile.css';
import navbarCap from '../assets/images/navbar-cap.png';
import dreamBiggerCap from '../assets/images/dream-bigger-cap.png';
import abhishekAvatar from '../assets/images/abhishek-avatar.png';
import topWaveImg from '../assets/images/top-wave-transparent.png';

export default function StudentProfile({ onLogout , onSaveProfile }) {
  const [activeNav, setActiveNav] = useState('My Profile');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedAvatarUrl(url);
      setUploadedFileName(file.name);
      setToastMessage(`Image "${file.name}" uploaded successfully!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  const [formData, setFormData] = useState({
    studentName: 'Abhishek boy',
    email: 'abhi@gmail.com',
    username: 'abhishekboy',
    
    institute: 'PMC College',
    department: 'Artificial Intelligence',
    course: 'Computer Science (CSE)',
    academicBatch: '2026-2027 - First Year',
    semester: 'Semester 1',
    subjects: ['Python', 'Data Structures', 'Machine Learning'],
    newSubjectInput: '',
    
    dob: '15-06-2004',
    gender: 'Male',
    phoneNumber: '+91 98765 43210',
    address: '12, Gandhi Street, Hosur, Tamil Nadu - 635109',
    city: 'Hosur',
    state: 'Tamil Nadu',
    country: 'India',
    postalCode: '635109',
    
    guardianName: 'Ramesh Kumar',
    guardianPhone: '+91 98765 43211',
    guardianEmail: 'ramesh.kumar@gmail.com',

    studentId: 'TOS2026001234',
    status: 'Active'
  });

  const [attendance] = useState({
    percentage: 92,
    presentDays: 46,
    totalDays: 50,
    checkInTime: '09:30 AM',
    checkOutTime: '05:30 PM',
    lastDate: '16 Nov 2026',
    lastStatus: 'Present'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSubject = (e) => {
    if (e.key === 'Enter' && formData.newSubjectInput.trim()) {
      e.preventDefault();
      if (!formData.subjects.includes(formData.newSubjectInput.trim())) {
        setFormData(prev => ({
          ...prev,
          subjects: [...prev.subjects, prev.newSubjectInput.trim()],
          newSubjectInput: ''
        }));
      }
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subjectToRemove)
    }));
  };

  const handleSaveProfile = (e) => {
  e.preventDefault();

  setToastMessage('Student Profile saved successfully!');
  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
    if (onSaveProfile) {
      onSaveProfile(formData);
    }
  }, 1000);
};

  const handleLogout = () => {
  setShowUserDropdown(false);

  if (onLogout) {
    onLogout();
  }
};
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('tos-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.tos-user-pill-container') && !e.target.closest('.tos-icon-btn')) {
        setShowUserDropdown(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);
  const navItems = [
    { name: 'Dashboard', icon: 'home' },
    { name: 'My Profile', icon: 'user' },
    { name: 'My Courses', icon: 'courses' },
    { name: 'Assignments', icon: 'assignments' },
    { name: 'Attendance', icon: 'attendance' },
    { name: 'Examinations', icon: 'examinations' },
    { name: 'Results', icon: 'results' },
    { name: 'Resume Builder', icon: 'resume' },
    { name: 'Job Portal', icon: 'jobs' },
    { name: 'AI Assistant', icon: 'ai-assistant' },
    { name: 'Notifications', icon: 'bell', badge: 3 },
    { name: 'Settings', icon: 'settings' },
  ];

  const renderIcon = (type, className = '') => {
    switch (type) {
      case 'home':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        );
      case 'user':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case 'courses':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="8" width="16" height="13" rx="3"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/><rect x="8" y="12" width="8" height="4" rx="1"/>
          </svg>
        );
      case 'assignments':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
          </svg>
        );
      case 'attendance':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="4" width="14" height="17" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 17a4 4 0 0 1 8 0"/><line x1="10" y1="2" x2="14" y2="2"/>
          </svg>
        );
      case 'examinations':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 14 2 2 4-4"/>
          </svg>
        );
      case 'results':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="10" x2="8" y2="20"/><line x1="16" y1="10" x2="16" y2="20"/>
          </svg>
        );
      case 'resume':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="11" x2="12" y2="13"/>
          </svg>
        );
      case 'jobs':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/>
          </svg>
        );
      case 'ai-assistant':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/>
          </svg>
        );
      case 'bell':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        );
      case 'settings':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        );
      case 'mail':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        );
      case 'phone':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        );
      case 'institution':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"/><path d="M3 10h18"/><path d="m12 3 9 5H3l9-5z"/><path d="M4 10v11"/><path d="M8 10v11"/><path d="M12 10v11"/><path d="M16 10v11"/><path d="M20 10v11"/>
          </svg>
        );
      case 'image':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        );
      case 'book':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/>
          </svg>
        );
      case 'calendar':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        );
      case 'layers':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
          </svg>
        );
      case 'shield-check':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
          </svg>
        );
      case 'user-solid':
        return (
          <svg className={className} width="18" height="19" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        );
      case 'grad-cap':
      case 'grad-cap-solid':
      case 'academic-solid':
        return (
          <svg className={className} width="25" height="19" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.566z"/>
          </svg>
        );
      case 'shield-check-solid':
      case 'guardian-solid':
        return (
          <svg className={className} width="17" height="19" viewBox="0 0 16 16" fill="none">
            <path d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.513 2.481l.038.026.009.006.003.002.001.001.001.001.001.001.001.001a.75.75 0 0 0 .866 0l.001-.001.001-.001.001-.001.001-.001.003-.002.009-.006.038-.026a11.8 11.8 0 0 0 2.513-2.481c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0z" fill="currentColor"/>
            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" fill="#ffffff"/>
          </svg>
        );
      case 'save':
        return (
          <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
        );
      case 'arrow-left':
        return (
          <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        );
      case 'info':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>
          </svg>
        );
      case 'lock':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        );
      case 'logout':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tos-dashboard-layout">
      
      {isMobileSidebarOpen && (
        <div
          className="tos-sidebar-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`tos-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
        
        <div className="tos-brand">
          <img
            src={navbarCap}
            alt="Artlysoft TalentOS Logo"
            className="tos-brand-cap-img"
          />
          <div className="tos-brand-text">
            <span className="tos-brand-title tos-brand-title-artly">
              Artly<span className="tos-brand-accent">soft</span>
            </span>
            <span className="tos-brand-title tos-brand-title-talent">
              Talent<span className="tos-brand-accent">OS</span>
            </span>
          </div>

          <button
            type="button"
            className="tos-mobile-sidebar-close"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="tos-nav-list">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`tos-nav-item ${activeNav === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.name);
                setIsMobileSidebarOpen(false);
              }}
            >
              <div className="tos-nav-item-left">
                <span className="tos-nav-icon">{renderIcon(item.icon)}</span>
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="tos-badge-count">{item.badge}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="tos-sidebar-bottom">
          
          <div className="tos-promo-card">
            <div className="tos-promo-wave-glow"></div>
            <img
              src={dreamBiggerCap}
              alt="Dream Bigger Cap & Diploma"
              className="tos-promo-cap-img"
            />
            <div className="tos-promo-title">
              Dream Bigger...<br />Build Your Career
            </div>
            <button
              className="tos-promo-btn"
              type="button"
              onClick={() => {
                setActiveNav('Job Portal');
                setToastMessage('Navigating to Job Portal...');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}
            >
              <span>Explore Jobs</span>
              <svg className="tos-promo-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="tos-sidebar-footer">
            &copy; 2026 TalentOS. All rights reserved. v2.0.0
          </div>
        </div>
      </aside>

      <main className="tos-main-content">
        
        <header className="tos-topbar">
          
          <button
            type="button"
            className="tos-mobile-menu-btn"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="tos-search-box">
            <svg className="tos-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" x2="21" y1="21" y2="16.65"/>
            </svg>
            <input
              id="tos-search-input"
              type="text"
              placeholder="Search anything... (Ctrl + K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="tos-topbar-wave-container" aria-hidden="true">
            <img
              src={topWaveImg}
              alt=""
              className="tos-topbar-exact-wave-img"
            />
          </div>

          <div className="tos-topbar-right">
            
            <div
              className="tos-icon-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserDropdown(false);
              }}
              title="Notifications"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <span className="tos-bell-badge">3</span>

              {showNotifications && (
                <div className="tos-notifications-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="tos-popover-header">
                    <span>Recent Notifications</span>
                    <span style={{ fontSize: '11px', color: '#2563eb', cursor: 'pointer' }}>Mark all read</span>
                  </div>
                  <div className="tos-popover-list">
                    <div className="tos-popover-item">
                      <span>📘</span>
                      <div><strong>Artificial Intelligence:</strong> Mid-term exam schedule announced.</div>
                    </div>
                    <div className="tos-popover-item">
                      <span>✅</span>
                      <div><strong>Attendance:</strong> Monthly attendance verified (94%).</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`tos-user-pill-container ${showUserDropdown ? 'open' : ''}`}>
              <div
                className="tos-user-pill"
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifications(false);
                }}
                style={{ cursor: 'pointer' }}
                title="Account Menu"
              >
                <img
                  src={uploadedAvatarUrl || abhishekAvatar}
                  alt="Abhishek Kumar"
                  className="tos-user-avatar"
                />
                <div className="tos-user-info">
                  <div className="tos-user-name-row">
                    <span className="tos-user-name">Abhishek Kumar</span>
                    <svg className="tos-user-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  <div className="tos-user-role-row">
                    <span className="tos-user-role">Student</span>
                    <svg className="tos-user-role-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </div>

              {showUserDropdown && (
                <div className="tos-user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  
                  <div className="tos-user-dropdown-header">
                    <div className="tos-user-dropdown-avatar">
                      {uploadedAvatarUrl ? (
                        <img src={uploadedAvatarUrl} alt="Avatar" className="tos-user-dropdown-avatar-img" />
                      ) : (
                        <span className="tos-user-dropdown-initials">DK</span>
                      )}
                    </div>
                    <div className="tos-user-dropdown-details">
                      <div className="tos-user-dropdown-name">RamKumar</div>
                      <div className="tos-user-dropdown-email">ram@pmccollege.ac.in</div>
                    </div>
                  </div>

                  <div className="tos-user-dropdown-divider" />

                  <div className="tos-user-dropdown-list">
                    <button
                      type="button"
                      className="tos-user-dropdown-item"
                      onClick={() => {
                        setShowUserDropdown(false);
                        setActiveNav('My Profile');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span className="tos-user-dropdown-item-icon">
                        {renderIcon('user')}
                      </span>
                      <span className="tos-user-dropdown-item-text">My Profile</span>
                    </button>

                    <button
                      type="button"
                      className="tos-user-dropdown-item"
                      onClick={() => {
                        setShowUserDropdown(false);
                        setToastMessage('Opening Settings...');
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2000);
                      }}
                    >
                      <span className="tos-user-dropdown-item-icon">
                        {renderIcon('settings')}
                      </span>
                      <span className="tos-user-dropdown-item-text">Settings</span>
                    </button>

                    <button
                      type="button"
                      className="tos-user-dropdown-item"
                      onClick={() => {
                        setShowUserDropdown(false);
                        handleLogout();
                      }}
                    >
                      <span className="tos-user-dropdown-item-icon">
                        {renderIcon('logout')}
                      </span>
                      <span className="tos-user-dropdown-item-text">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="tos-profile-header-banner">
          
          <div className="tos-banner-wave-container" aria-hidden="true">
            <svg
              className="tos-banner-wave-svg"
              viewBox="0 0 880 120"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bannerWaveGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="bannerWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
                  <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#eff6ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 390 0 C 440 30 500 40 550 50 C 490 80 430 90 320 120 L 410 120 C 500 95 560 70 580 40 C 560 20 510 10 470 0 Z"
                fill="url(#bannerWaveGrad1)"
              />
              <path
                d="M 430 0 C 410 30 380 60 350 85 C 335 98 325 110 320 120 L 365 120 C 380 105 400 85 435 60 C 480 30 520 15 540 0 Z"
                fill="url(#bannerWaveGrad2)"
              />
            </svg>
          </div>

          <div className="tos-breadcrumb-container">
            <div className="tos-breadcrumbs">
              <span className="tos-bc-parent">Dashboard</span>
              <span className="tos-bc-sep">&gt;</span>
              <span className="tos-bc-current">My Profile</span>
            </div>
            <h1 className="tos-page-title">Student Profile</h1>
            <p className="tos-page-subtitle">Enter your student information and save.</p>
          </div>

          <div className="tos-profile-badge-card">
            <img
              src={uploadedAvatarUrl || abhishekAvatar}
              alt="Abhishek Avatar"
              className="tos-badge-avatar"
            />
            <div className="tos-initials-avatar">AB</div>
            <div className="tos-badge-details">
              <span className="tos-badge-name">{formData.studentName}</span>
              <span className="tos-badge-id">Student ID: {formData.studentId}</span>
              <div className="tos-status-tag">
                <span className="tos-status-dot"></span>
                <span>{formData.status}</span>
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={handleSaveProfile} className="tos-form-wrapper">
          
          <div className="tos-grid-row tos-grid-row-top">
            
            <div className="tos-card tos-card-student-info">
              <div className="tos-card-header">
                <span className="tos-card-header-icon">{renderIcon('user-solid')}</span>
                <h2 className="tos-card-title">Student Information</h2>
              </div>

              <div className="tos-form-group">
                <label className="tos-label">
                  Student Name <span className="tos-req">*</span>
                </label>
                <div className="tos-input-wrap">
                  <span className="tos-input-icon">{renderIcon('user')}</span>
                  <input
                    type="text"
                    className="tos-input"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="tos-form-group">
                <label className="tos-label">
                  Email <span className="tos-req">*</span>
                </label>
                <div className="tos-input-wrap">
                  <span className="tos-input-icon">{renderIcon('mail')}</span>
                  <input
                    type="email"
                    className="tos-input"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="tos-form-group">
                <label className="tos-label">
                  Username <span className="tos-req">*</span>
                </label>
                <div className="tos-input-wrap">
                  <span className="tos-input-icon">{renderIcon('user')}</span>
                  <input
                    type="text"
                    className="tos-input"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="tos-form-group no-margin">
                <label className="tos-label" htmlFor="tos-image-file-input">
                  Upload Image
                </label>
                <div className="tos-input-wrap tos-file-input-wrap">
                  <span className="tos-input-icon">{renderIcon('image')}</span>
                  <input
                    type="file"
                    id="tos-image-file-input"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor="tos-image-file-input"
                    className="tos-input tos-file-click-label"
                  >
                    <span className={uploadedFileName ? "tos-file-name-active" : "tos-file-placeholder"}>
                      {uploadedFileName || 'Upload Image'}
                    </span>
                    <span className="tos-file-browse-btn">Browse</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="tos-col-academic-attendance">
              
              <div className="tos-card tos-card-academic-info">
              <div className="tos-card-header">
                <span className="tos-card-header-icon tos-card-header-icon-academic">{renderIcon('academic-solid')}</span>
                <h2 className="tos-card-title">Academic Information</h2>
              </div>

              <div className="tos-field-row-3">
                <div className="tos-form-group no-margin">
                  <label className="tos-label">Institute (Read only)</label>
                  <input
                    type="text"
                    className="tos-input disabled"
                    value={formData.institute}
                    readOnly
                  />
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Department <span className="tos-req">*</span>
                  </label>
                  <div className="tos-select-wrap">
                    <span className="tos-input-icon">{renderIcon('institution')}</span>
                    <select
                      className="tos-select"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    >
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                    </select>
                    <svg className="tos-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Course <span className="tos-req">*</span>
                  </label>
                  <div className="tos-select-wrap">
                    <span className="tos-input-icon">{renderIcon('book')}</span>
                    <select
                      className="tos-select"
                      value={formData.course}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                    >
                      <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                      <option value="Information Science (ISE)">Information Science (ISE)</option>
                    </select>
                    <svg className="tos-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="tos-field-row-3" style={{ marginTop: '14px' }}>
                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Academic Batch <span className="tos-req">*</span>
                  </label>
                  <div className="tos-select-wrap">
                    <span className="tos-input-icon">{renderIcon('calendar')}</span>
                    <select
                      className="tos-select"
                      value={formData.academicBatch}
                      onChange={(e) => handleInputChange('academicBatch', e.target.value)}
                    >
                      <option value="2026-2027 - First Year">2026-2027 - First Year</option>
                      <option value="2025-2026 - Second Year">2025-2026 - Second Year</option>
                    </select>
                    <svg className="tos-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Semester <span className="tos-req">*</span>
                  </label>
                  <div className="tos-select-wrap">
                    <span className="tos-input-icon">{renderIcon('layers')}</span>
                    <select
                      className="tos-select"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                    >
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                    </select>
                    <svg className="tos-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Select Your Subjects <span className="tos-req">*</span>
                  </label>
                  <div className="tos-tags-input-container">
                    {formData.subjects.map((sub) => (
                      <span key={sub} className="tos-subject-tag">
                        {sub}
                        <button
                          type="button"
                          className="tos-tag-remove-btn"
                          onClick={() => handleRemoveSubject(sub)}
                          title="Remove subject"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="tos-tag-add-input"
                      placeholder="Add tag..."
                      value={formData.newSubjectInput}
                      onChange={(e) => handleInputChange('newSubjectInput', e.target.value)}
                      onKeyDown={handleAddSubject}
                    />
                    <svg className="tos-tag-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </div>

              </div>

              <div className="tos-card tos-card-attendance">
                <div className="tos-card-header">
                  <span className="tos-card-header-icon tos-card-header-icon-attendance">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </span>
                  <h2 className="tos-card-title">Attendance</h2>
                </div>

                <div className="tos-attendance-body">
                  
                  <div className="tos-attendance-stats-pill">
                    <div className="tos-attendance-ring-wrap">
                      <svg className="tos-attendance-ring-svg" viewBox="0 0 40 40">
                        <circle
                          className="tos-attendance-ring-bg"
                          cx="20"
                          cy="20"
                          r="16"
                        />
                        <circle
                          className="tos-attendance-ring-fill"
                          cx="20"
                          cy="20"
                          r="16"
                          strokeDasharray="100.53"
                          strokeDashoffset="8.04"
                        />
                      </svg>
                      <span className="tos-attendance-ring-text">{attendance.percentage}%</span>
                    </div>
                    <div className="tos-attendance-stats-text">
                      <span className="tos-attendance-label">Present Days</span>
                      <span className="tos-attendance-val">{attendance.presentDays} / {attendance.totalDays}</span>
                    </div>
                  </div>

                  <div className="tos-attendance-actions">
                    <button
                      type="button"
                      className="tos-attendance-btn tos-btn-checkin"
                      onClick={() => {
                        setToastMessage(`Checked In today at ${attendance.checkInTime}`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2500);
                      }}
                    >
                      <div className="tos-att-btn-title">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                          <polyline points="10 17 15 12 10 7" />
                          <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        <span>Check In</span>
                      </div>
                      <span className="tos-att-btn-sub">Click to Check In</span>
                    </button>

                    <button
                      type="button"
                      className="tos-attendance-btn tos-btn-checkout"
                      onClick={() => {
                        setToastMessage(`Checked Out today at ${attendance.checkOutTime}`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2500);
                      }}
                    >
                      <div className="tos-att-btn-title">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Check Out</span>
                      </div>
                      <span className="tos-att-btn-sub">Click to Check Out</span>
                    </button>
                  </div>

                  <div className="tos-attendance-last">
                    <span className="tos-att-calendar-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </span>
                    <div className="tos-att-last-info">
                      <span className="tos-attendance-label">Last Attendance</span>
                      <span className="tos-att-date">{attendance.lastDate}</span>
                      <span className="tos-att-badge-present">{attendance.lastStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tos-grid-row tos-grid-row-bottom">
            
            <div className="tos-card">
              <div className="tos-card-header">
                <span className="tos-card-header-icon">{renderIcon('user-solid')}</span>
                <h2 className="tos-card-title">Personal Information</h2>
              </div>

              <div className="tos-field-row-2">
                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Date of Birth <span className="tos-req">*</span>
                  </label>
                  <div className="tos-input-wrap">
                    <span className="tos-input-icon">{renderIcon('calendar')}</span>
                    <input
                      type="text"
                      className="tos-input"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      required
                    />
                    <span style={{ position: 'absolute', right: '12px', color: '#64748b', cursor: 'pointer' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Gender <span className="tos-req">*</span>
                  </label>
                  <div className="tos-radio-group">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label
                        key={g}
                        className="tos-radio-label"
                        onClick={() => handleInputChange('gender', g)}
                      >
                        <span className={`tos-radio-custom ${formData.gender === g ? 'selected' : ''}`}>
                          {formData.gender === g && <span className="tos-radio-inner-dot"></span>}
                        </span>
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="tos-field-row-phone-address" style={{ marginTop: '14px', marginBottom: '14px' }}>
                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Phone Number <span className="tos-req">*</span>
                  </label>
                  <div className="tos-input-wrap">
                    <span className="tos-input-icon">{renderIcon('phone')}</span>
                    <input
                      type="text"
                      className="tos-input"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">
                    Address <span className="tos-req">*</span>
                  </label>
                  <div className="tos-input-wrap tos-textarea-wrap">
                    <span className="tos-input-icon tos-textarea-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </span>
                    <textarea
                      className="tos-textarea"
                      rows={2}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="tos-field-row-4">
                <div className="tos-form-group no-margin">
                  <label className="tos-label">City <span className="tos-req">*</span></label>
                  <input
                    type="text"
                    className="tos-input"
                    style={{ paddingLeft: '12px' }}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">State <span className="tos-req">*</span></label>
                  <div className="tos-select-wrap">
                    <select
                      className="tos-select"
                      style={{ paddingLeft: '12px' }}
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                    <svg className="tos-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">Country <span className="tos-req">*</span></label>
                  <div className="tos-select-wrap">
                    <select
                      className="tos-select"
                      style={{ paddingLeft: '12px' }}
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                    </select>
                    <svg className="tos-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">Postal Code <span className="tos-req">*</span></label>
                  <input
                    type="text"
                    className="tos-input"
                    style={{ paddingLeft: '12px' }}
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="tos-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="tos-card-header">
                <span className="tos-card-header-icon tos-card-header-icon-guardian">{renderIcon('shield-check-solid')}</span>
                <h2 className="tos-card-title">Guardian Information</h2>
              </div>

              <div className="tos-field-row-2">
                <div className="tos-form-group no-margin">
                  <label className="tos-label">Guardian Name <span className="tos-req">*</span></label>
                  <div className="tos-input-wrap">
                    <span className="tos-input-icon">{renderIcon('user')}</span>
                    <input
                      type="text"
                      className="tos-input"
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tos-form-group no-margin">
                  <label className="tos-label">Guardian Phone <span className="tos-req">*</span></label>
                  <div className="tos-input-wrap">
                    <span className="tos-input-icon">{renderIcon('phone')}</span>
                    <input
                      type="text"
                      className="tos-input"
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="tos-field-row-2" style={{ marginTop: '14px' }}>
                <div className="tos-form-group no-margin">
                  <label className="tos-label">Guardian Email <span className="tos-req">*</span></label>
                  <div className="tos-input-wrap">
                    <span className="tos-input-icon">{renderIcon('mail')}</span>
                    <input
                      type="email"
                      className="tos-input"
                      value={formData.guardianEmail}
                      onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="tos-security-banner">
                <div className="tos-security-left">
                  <div className="tos-shield-icon-badge">
                    {renderIcon('shield-check')}
                  </div>
                  <div className="tos-security-text">
                    <span className="tos-security-title">Your information is secure with TalentOS</span>
                    <span className="tos-security-subtitle">We use industry-standard security to protect your data.</span>
                  </div>
                </div>

                <div className="tos-security-shield-graphic">
                  {renderIcon('lock')}
                </div>
              </div>
            </div>
          </div>

          <div className="tos-action-footer">
            <button
              type="button"
              className="tos-btn-back"
              onClick={() => {
                setToastMessage('Returning to Previous Page...');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}
            >
              {renderIcon('arrow-left')}
              <span>Back</span>
            </button>

            <button type="submit" className="tos-btn-save">
              {renderIcon('save')}
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </main>

      {showToast && (
        <div className="tos-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

