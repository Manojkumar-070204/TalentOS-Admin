import { useState, useEffect, useRef } from 'react';
import './Student.css';
import capImg from '../assets/images/cap.png';
import rocketImg from '../assets/images/rocket.png';
import campusImg from '../assets/images/campus.png';
import graduatesImg from '../assets/images/graduates.png';
import trophyImg from '../assets/images/trophy.png';
import deptAimlImg from '../assets/images/dept-aiml.png';
import deptCseImg from '../assets/images/dept-cse.png';
import deptDsImg from '../assets/images/dept-datascience.png';
import deptCyberImg from '../assets/images/dept-cybersecurity.png';
import deptWebImg from '../assets/images/dept-webdev.png';
import aiCapImg from '../assets/images/ai-cap.png';

export default function Student({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeTimeTab, setActiveTimeTab] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const notifDropdownRef = useRef(null);

  const currentUser = {
    name: user?.name || 'Abisheik Kumar',
    role: user?.role || 'Student',
    email: user?.email || 'abisheik@pmccollege.ac.in',
    initials: user?.initials || 'AK'
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    localStorage.removeItem('talentOS_user');
    if (onLogout) onLogout();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
        setNotifDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      )
    },
    {
      id: 'My Profile',
      label: 'My Profile',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      id: 'My Courses',
      label: 'My Courses',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="13" y2="15" />
        </svg>
      )
    },
    {
      id: 'Assignments',
      label: 'Assignments',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
          <line x1="8" y1="9" x2="10" y2="9" />
        </svg>
      )
    },
    {
      id: 'Attendance',
      label: 'Attendance',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    },
    {
      id: 'Examinations',
      label: 'Examinations',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: 'Results',
      label: 'Results',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="10" r="2" />
          <circle cx="20" cy="14" r="2" />
        </svg>
      )
    },
    {
      id: 'Resume Builder',
      label: 'Resume Builder',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <line x1="14" y1="8" x2="18" y2="8" />
          <line x1="14" y1="12" x2="18" y2="12" />
          <line x1="6" y1="16" x2="18" y2="16" />
        </svg>
      )
    },
    {
      id: 'Job Portal',
      label: 'Job Portal',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      id: 'AI Assistant',
      label: 'AI Assistant',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6a8 8 0 0 0-8-8z" />
          <path d="M12 18v4" />
          <line x1="8" y1="22" x2="16" y2="22" />
          <circle cx="9" cy="10" r="1.5" fill="currentColor" />
          <circle cx="15" cy="10" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'Notifications',
      label: 'Notifications',

      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },

  ];

  return (
    <div className="talentos-dashboard">

      <div
        className={`sidebar-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />


      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-top-bar">

          <div className="sidebar-logo">
            <div className="logo-cap-box">
              <img src={capImg} alt="Artlysoft TalentOS" className="logo-cap-img" />
            </div>
            <div className="logo-brand-block">
              <div className="logo-brand-line">
                <span className="logo-text-white">Artly</span>
                <span className="logo-text-orange">soft</span>
              </div>
              <div className="logo-brand-line">
                <span className="logo-text-white">Talent</span>
                <span className="logo-text-orange">OS</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>


        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-menu-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {item.badge && <span className="menu-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>


        <div className="sidebar-promo-card">
          <div className="promo-rocket-container">
            <img src={rocketImg} alt="Rocket" className="promo-rocket-img" />
          </div>
          <p className="promo-subtitle">Dream Big...</p>
          <h4 className="promo-title">Build Your Career</h4>
          <button className="promo-btn">
            Explore Jobs &rarr;
          </button>
        </div>


        <footer className="sidebar-footer">
          <p>© 2026 TalentOS.</p>
          <p>All rights reserved.</p>
        </footer>
      </aside>


      <main className="main-wrapper">

        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="search-container">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search anything... (Ctrl + K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>


          <div className="topbar-color-curve" aria-hidden="true">
            <svg viewBox="0 0 280 65" fill="none" preserveAspectRatio="none">
              <defs>

                <linearGradient id="topbarBlueGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#2563eb" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                </linearGradient>


                <linearGradient id="topbarGoldGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="45%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="85%" stopColor="#fde047" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>


                <linearGradient id="topbarWashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
              </defs>


              <path
                d="M 45 0 C 40 22, 22 44, 8 65 L 50 65 C 65 44, 82 22, 92 0 Z"
                fill="url(#topbarWashGrad)"
              />


              <path
                d="M 82 0 C 74 22, 54 44, 35 65 L 145 65 C 165 44, 184 22, 204 0 Z"
                fill="url(#topbarBlueGrad)"
              />


              <path
                d="M 204 0 C 184 22, 165 44, 145 65 L 176 65 C 196 44, 218 22, 240 0 Z"
                fill="url(#topbarGoldGrad)"
              />
            </svg>
          </div>

          <div className="topbar-right">
            <div className="notification-wrapper" ref={notifDropdownRef}>
              <button
                type="button"
                className={`notification-btn ${notifDropdownOpen ? 'active' : ''}`}
                onClick={() => {
                  setNotifDropdownOpen((prev) => !prev);
                  setProfileDropdownOpen(false);
                }}
                aria-label="Notifications"
                aria-expanded={notifDropdownOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="notification-badge">3</span>
              </button>

              {notifDropdownOpen && (
                <div className="notifications-dropdown-card">
                  <div className="notif-dropdown-header">
                    <div className="notif-header-text">
                      <h3 className="notif-header-title">Notifications</h3>
                      <span className="notif-header-subtitle">3 recent updates</span>
                    </div>
                    <button
                      type="button"
                      className="notif-close-btn"
                      onClick={() => setNotifDropdownOpen(false)}
                      aria-label="Close notifications"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <div className="notif-items-list">
                    <div className="notif-item-row">
                      <div className="notif-item-dot"></div>
                      <div className="notif-item-content">
                        <h4 className="notif-item-title">New student registration</h4>
                        <p className="notif-item-desc">Rahul S has successfully registered.</p>
                        <span className="notif-item-time">2 min ago</span>
                      </div>
                    </div>

                    <div className="notif-item-row">
                      <div className="notif-item-dot"></div>
                      <div className="notif-item-content">
                        <h4 className="notif-item-title">Fee payment received</h4>
                        <p className="notif-item-desc">A payment of ₹50,000 was received.</p>
                        <span className="notif-item-time">5 min ago</span>
                      </div>
                    </div>

                    <div className="notif-item-row">
                      <div className="notif-item-dot"></div>
                      <div className="notif-item-content">
                        <h4 className="notif-item-title">Exam reminder</h4>
                        <p className="notif-item-desc">Monthly Exam is scheduled for 15 Nov 2026.</p>
                        <span className="notif-item-time">1 hour ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="notif-dropdown-footer">
                    <button
                      type="button"
                      className="notif-view-all-btn"
                      onClick={() => {
                        setActiveNav('Notifications');
                        setNotifDropdownOpen(false);
                      }}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="user-profile-wrapper" ref={profileDropdownRef}>
              <div
                className={`user-profile ${profileDropdownOpen ? 'active' : ''}`}
                onClick={() => {
                  setProfileDropdownOpen((prev) => !prev);
                  setNotifDropdownOpen(false);
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                <div className="user-avatar-initials">
                  {currentUser.initials}
                </div>
                <div className="user-info">
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-role">{currentUser.role}</span>
                </div>
                <span className={`user-chevron-arrow ${profileDropdownOpen ? 'open' : ''}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>

              {profileDropdownOpen && (
                <div className="profile-dropdown-card">
                  <div className="profile-dropdown-header">
                    <div className="dropdown-avatar-initials">
                      {currentUser.initials}
                    </div>
                    <div className="dropdown-user-details">
                      <h4 className="dropdown-user-name">{currentUser.name}</h4>
                      <span className="dropdown-user-email">{currentUser.email}</span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-menu">
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setActiveNav('My Profile');
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <svg className="dropdown-item-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>My Profile</span>
                    </button>

                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setActiveNav('Settings');
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <svg className="dropdown-item-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      <span>Settings</span>
                    </button>

                    <button
                      type="button"
                      className="dropdown-item logout-item"
                      onClick={handleLogout}
                    >
                      <svg className="dropdown-item-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>


        <div className="dashboard-content">

          <section className="hero-banner">
            <div className="hero-text-content">
              <h1 className="hero-heading">
                Welcome, <span className="highlight-name">Student!</span> <span className="wave-hand">👋</span>
              </h1>
              <p className="hero-subtext">
                Keep learning, keep growing. Your future is bright with TalentOS.
              </p>

              <div className="hero-accent-line" aria-hidden="true"></div>
              <div className="hero-academic-pill">
                <div className="pill-cal-icon-wrap">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="pill-bold-text">Academic Year: 2026 – 2027</span>
                <span className="pill-separator">|</span>
                <span className="pill-bold-text">Batch: BBA – I Year</span>
              </div>
            </div>

            <div className="hero-campus-image">
              <img src={campusImg} alt="Modern University Campus Building" />
            </div>


            <div className="hero-right-wave" aria-hidden="true">
              <svg viewBox="0 0 180 130" fill="none" className="hero-wave-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroBlueWave" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e40af" />
                    <stop offset="40%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="heroOrangeWave" x1="0" y1="1" x2="0.8" y2="0.1">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="45%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fde047" />
                  </linearGradient>
                  <linearGradient id="blueSheen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="orangeSheen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 54 130 C 88 114, 132 78, 180 22 L 180 54 C 145 92, 108 119, 86 130 Z" fill="url(#heroBlueWave)" />
                <path d="M 54 130 C 88 114, 132 78, 180 22 L 180 34 C 135 84, 94 118, 64 130 Z" fill="url(#blueSheen)" />
                <path d="M 86 130 C 108 119, 145 92, 180 54 L 180 130 Z" fill="url(#heroOrangeWave)" />
                <path d="M 86 130 C 108 119, 145 92, 180 54 L 180 66 C 147 98, 114 122, 96 130 Z" fill="url(#orangeSheen)" />
              </svg>
            </div>
          </section>


          <section className="stats-row">

            <div className="stat-card">
              <div className="stat-icon-wrapper blue-bg">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3.5L1.5 8.8L12 14.1L22.5 8.8L12 3.5Z" fill="#2563eb" />
                  <path d="M5 12.2V16.8C5 18.8 8.1 20.5 12 20.5C15.9 20.5 19 18.8 19 16.8V12.2L12 16L5 12.2Z" fill="#2563eb" />
                  <path d="M21 9.8V16.5" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="21" cy="17.5" r="1.4" fill="#1d4ed8" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-label">Enrolled Courses</span>
                <div className="stat-number">6</div>
                <a href="#courses" className="stat-link blue-link">
                  View Courses &rarr;
                </a>
              </div>
              <div className="stat-graphic">
                <svg width="64" height="42" viewBox="0 0 64 42" fill="none" className="stat-bars-svg">
                  <defs>
                    <linearGradient id="blueBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="28" width="6.5" height="14" rx="3.25" fill="url(#blueBarGrad)" />
                  <rect x="13" y="22" width="6.5" height="20" rx="3.25" fill="url(#blueBarGrad)" />
                  <rect x="24" y="16" width="6.5" height="26" rx="3.25" fill="url(#blueBarGrad)" />
                  <rect x="35" y="10" width="6.5" height="32" rx="3.25" fill="url(#blueBarGrad)" />
                  <rect x="46" y="5" width="6.5" height="37" rx="3.25" fill="url(#blueBarGrad)" />
                  <rect x="57" y="0" width="6.5" height="42" rx="3.25" fill="url(#blueBarGrad)" />
                </svg>
              </div>
            </div>


            <div className="stat-card">
              <div className="stat-icon-wrapper purple-bg">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <rect x="2.5" y="4.5" width="19" height="17" rx="3.5" fill="#7c3aed" />
                  <rect x="6.5" y="2" width="2.2" height="4.5" rx="1.1" fill="#c4b5fd" />
                  <rect x="15.3" y="2" width="2.2" height="4.5" rx="1.1" fill="#c4b5fd" />
                  <path d="M7.8 13.2L10.8 16.2L16.5 10.2" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-label">Attendance</span>
                <div className="stat-number">92.5%</div>
                <div className="stat-trend green-trend">
                  <span>&uarr; +2%</span>
                </div>
              </div>
              <div className="stat-graphic">
                <svg width="78" height="42" viewBox="0 0 78 42" fill="none" className="sparkline-svg">
                  <defs>
                    <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 2 32 C 12 32, 16 20, 24 20 C 32 20, 36 27, 44 27 C 52 27, 56 14, 62 14 C 66 14, 68 18, 70 18 C 72 18, 73 5, 75 5 L 75 42 L 2 42 Z"
                    fill="url(#purpleAreaGrad)"
                  />
                  <path
                    d="M 2 32 C 12 32, 16 20, 24 20 C 32 20, 36 27, 44 27 C 52 27, 56 14, 62 14 C 66 14, 68 18, 70 18 C 72 18, 73 5, 75 5"
                    stroke="#8b5cf6"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="75" cy="5" r="3.2" fill="#7c3aed" />
                </svg>
              </div>
            </div>


            <div className="stat-card">
              <div className="stat-icon-wrapper orange-bg">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="4" width="17" height="18" rx="3.5" fill="#f59e0b" />
                  <path d="M8.5 2.5C8.5 1.95 8.95 1.5 9.5 1.5H14.5C15.05 1.5 15.5 1.95 15.5 2.5V4.5H8.5V2.5Z" fill="#d97706" />
                  <rect x="10" y="2.5" width="4" height="1.2" rx="0.6" fill="#fef3c7" />
                  <line x1="7.5" y1="9.5" x2="16.5" y2="9.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="7.5" y1="13.5" x2="16.5" y2="13.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="7.5" y1="17.5" x2="13" y2="17.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-label">Assignments</span>
                <div className="stat-number">4</div>
                <a href="#assignments" className="stat-link navy-link">
                  View All &rarr;
                </a>
              </div>
              <div className="stat-graphic">
                <svg width="64" height="42" viewBox="0 0 64 42" fill="none" className="stat-bars-svg">
                  <defs>
                    <linearGradient id="orangeBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="28" width="6.5" height="14" rx="3.25" fill="url(#orangeBarGrad)" />
                  <rect x="13" y="22" width="6.5" height="20" rx="3.25" fill="url(#orangeBarGrad)" />
                  <rect x="24" y="16" width="6.5" height="26" rx="3.25" fill="url(#orangeBarGrad)" />
                  <rect x="35" y="10" width="6.5" height="32" rx="3.25" fill="url(#orangeBarGrad)" />
                  <rect x="46" y="5" width="6.5" height="37" rx="3.25" fill="url(#orangeBarGrad)" />
                  <rect x="57" y="0" width="6.5" height="42" rx="3.25" fill="url(#orangeBarGrad)" />
                </svg>
              </div>
            </div>


            <div className="stat-card">
              <div className="stat-icon-wrapper green-bg">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="#10b981">
                  <path d="M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V9C3 11.21 4.79 13 7 13H7.82C8.4 14.76 9.92 16.09 11.8 16.42V19H8V21H16V19H12.2V16.42C14.08 16.09 15.6 14.76 16.18 13H17C19.21 13 21 11.21 21 9V7C21 5.9 20.1 5 19 5ZM5 9V7H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V7H19V9Z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-label">Exam Results</span>
                <div className="stat-number">88.0%</div>
                <div className="stat-trend green-trend">
                  <span>&uarr; +5%</span>
                </div>
              </div>
              <div className="stat-graphic">
                <svg width="95" height="42" viewBox="0 0 95 42" fill="none" className="sparkline-svg">
                  <defs>
                    <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 2 34 C 8 34, 12 26, 18 26 C 24 26, 28 31, 34 31 C 40 31, 44 20, 52 20 C 58 20, 62 25, 68 25 C 76 25, 80 13, 86 13 C 89 13, 90 5, 93 5 L 93 42 L 2 42 Z"
                    fill="url(#greenAreaGrad)"
                  />
                  <path
                    d="M 2 34 C 8 34, 12 26, 18 26 C 24 26, 28 31, 34 31 C 40 31, 44 20, 52 20 C 58 20, 62 25, 68 25 C 76 25, 80 13, 86 13 C 89 13, 90 5, 93 5"
                    stroke="#10b981"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="93" cy="5" r="3.2" fill="#10b981" />
                </svg>
              </div>
            </div>
          </section>


          <section className="middle-section">

            <div className="departments-card">
              <div className="dept-section-header">
                <div className="dept-title-wrap">
                  <div className="dept-header-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#2563eb">
                      <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" />
                      <path d="M5 13.18V17.5C5 19.43 8.13 21 12 21C15.87 21 19 19.43 19 17.5V13.18L12 17L5 13.18Z" />
                    </svg>
                  </div>
                  <div className="dept-header-divider"></div>
                  <h2 className="dept-section-title">Our Departments</h2>
                </div>
                <a href="#departments" className="dept-explore-link">
                  Explore All Departments &rarr;
                </a>
              </div>

              <div className="departments-grid">

                <div className="dept-card">
                  <button className="dept-arrow-btn" aria-label="Explore AI & Machine Learning">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="dept-icon-wrapper">
                    <img src={deptAimlImg} alt="AI & Machine Learning" className="dept-icon-img" />
                  </div>
                  <div className="dept-card-text">
                    <h3 className="dept-name">AI & Machine Learning</h3>
                    <p className="dept-tagline">Innovate • Learn • Build</p>
                  </div>
                  <div className="dept-accent-pill dept-pill-blue"></div>
                </div>


                <div className="dept-card">
                  <button className="dept-arrow-btn" aria-label="Explore Computer Science & Engineering">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="dept-icon-wrapper">
                    <img src={deptCseImg} alt="Computer Science & Engineering" className="dept-icon-img" />
                  </div>
                  <div className="dept-card-text">
                    <h3 className="dept-name">Computer Science & Engineering</h3>
                    <p className="dept-tagline">Code • Create • Excel</p>
                  </div>
                  <div className="dept-accent-pill dept-pill-purple"></div>
                </div>


                <div className="dept-card">
                  <button className="dept-arrow-btn" aria-label="Explore Data Science">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="dept-icon-wrapper">
                    <img src={deptDsImg} alt="Data Science" className="dept-icon-img" />
                  </div>
                  <div className="dept-card-text">
                    <h3 className="dept-name">Data Science</h3>
                    <p className="dept-tagline">Analyze • Predict • Grow</p>
                  </div>
                  <div className="dept-accent-pill dept-pill-green"></div>
                </div>


                <div className="dept-card">
                  <button className="dept-arrow-btn" aria-label="Explore Cyber Security">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="dept-icon-wrapper">
                    <img src={deptCyberImg} alt="Cyber Security" className="dept-icon-img" />
                  </div>
                  <div className="dept-card-text">
                    <h3 className="dept-name">Cyber Security</h3>
                    <p className="dept-tagline">Secure • Protect • Innovate</p>
                  </div>
                  <div className="dept-accent-pill dept-pill-orange"></div>
                </div>


                <div className="dept-card">
                  <button className="dept-arrow-btn" aria-label="Explore Web Development">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="dept-icon-wrapper">
                    <img src={deptWebImg} alt="Web Development" className="dept-icon-img" />
                  </div>
                  <div className="dept-card-text">
                    <h3 className="dept-name">Web Development</h3>
                    <p className="dept-tagline">Design • Develop • Deploy</p>
                  </div>
                  <div className="dept-accent-pill dept-pill-magenta"></div>
                </div>
              </div>
            </div>


            <div className="ai-assistant-card">

              <div className="ai-bg-decor" aria-hidden="true">
                <svg width="220" height="240" viewBox="0 0 220 240" fill="none" className="ai-wave-svg">
                  <defs>
                    <linearGradient id="aiWaveGrad1" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="aiWaveGrad2" x1="1" y1="0" x2="0.2" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="aiStarGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient id="aiStarGrad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a5b4fc" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M100 0 C150 40, 220 70, 220 150 C220 200, 180 240, 130 240 L220 240 L220 0 Z"
                    fill="url(#aiWaveGrad1)"
                  />
                  <path
                    d="M150 110 C175 140, 220 160, 220 240 L160 240 C170 195, 140 150, 150 110 Z"
                    fill="url(#aiWaveGrad2)"
                  />

                  <path
                    d="M190 68 Q190 92 214 92 Q190 92 190 116 Q190 92 166 92 Q190 92 190 68 Z"
                    fill="url(#aiStarGrad1)"
                  />

                  <path
                    d="M178 126 Q178 142 194 142 Q178 142 178 158 Q178 142 162 142 Q178 142 178 126 Z"
                    fill="url(#aiStarGrad2)"
                  />
                </svg>
              </div>


              <div className="ai-content-wrap">

                <div className="ai-card-header">
                  <div className="ai-cap-wrapper">
                    <img src={aiCapImg} alt="TalentOS AI" className="ai-cap-img" />
                  </div>
                  <div className="ai-header-text">
                    <h3 className="ai-title">TalentOS AI Assistant</h3>
                    <p className="ai-subtitle">Your Personal Study Companion</p>
                  </div>
                </div>


                <div className="ai-coming-soon-pill">
                  <svg className="ai-pill-sparkle" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
                  </svg>
                  <span>Coming Soon</span>
                </div>


                <p className="ai-description-text">
                  Ask me anything about your courses, assignments or career!
                </p>
              </div>
            </div>
          </section>


          <section className="lower-grid">

            <div className="grid-card timetable-card">
              <div className="grid-card-header">
                <div className="card-title-wrap">
                  <svg className="card-header-svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#2563eb" />
                    <rect x="7" y="1" width="2" height="4" rx="1" fill="#2563eb" />
                    <rect x="15" y="1" width="2" height="4" rx="1" fill="#2563eb" />
                    <path d="M3 8.5h18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="13" r="1.2" fill="#ffffff" />
                    <circle cx="12" cy="13" r="1.2" fill="#ffffff" />
                    <circle cx="16" cy="13" r="1.2" fill="#ffffff" />
                    <circle cx="8" cy="17" r="1.2" fill="#ffffff" />
                    <circle cx="12" cy="17" r="1.2" fill="#ffffff" />
                    <circle cx="16" cy="17" r="1.2" fill="#ffffff" />
                  </svg>
                  <h4>My Timetable</h4>
                </div>
                <a href="#schedule" className="card-header-link">
                  View Full Schedule &rarr;
                </a>
              </div>

              <div className="timetable-tabs">
                {['Today', 'Tomorrow', 'This Week'].map((tab) => (
                  <button
                    key={tab}
                    className={`timetable-tab ${activeTimeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTimeTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="timetable-list">
                <div className="timetable-item">
                  <span className="time-badge">09:00 AM - 10:00 AM</span>
                  <span className="course-name-label">Python Programming</span>
                  <span className="room-label">Room A-101</span>
                </div>
                <div className="timetable-item">
                  <span className="time-badge">10:15 AM - 11:15 AM</span>
                  <span className="course-name-label">Database Management</span>
                  <span className="room-label">Room B-201</span>
                </div>
                <div className="timetable-item">
                  <span className="time-badge">01:00 PM - 02:00 PM</span>
                  <span className="course-name-label">Web Technologies</span>
                  <span className="room-label">Lab-3</span>
                </div>
                <div className="timetable-item">
                  <span className="time-badge">03:00 PM - 04:00 PM</span>
                  <span className="course-name-label">Soft Skills</span>
                  <span className="room-label">Seminar Hall</span>
                </div>
              </div>
            </div>


            <div className="grid-card assignments-card">
              <div className="grid-card-header">
                <div className="card-title-wrap">
                  <svg className="card-header-svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#2563eb" />
                    <path d="m8 12 3 3 5-6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h4>Upcoming Assignments</h4>
                </div>
                <a href="#assignments" className="card-header-link">
                  View All &rarr;
                </a>
              </div>

              <div className="assignment-list">

                <div className="assignment-item">
                  <div className="assignment-icon-wrap">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="assignment-svg">
                      <circle cx="18" cy="18" r="18" fill="#092e20" />
                      <text
                        x="18"
                        y="20.5"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontSize="9.5"
                        fontWeight="800"
                        fontFamily="system-ui, -apple-system, sans-serif"
                        letterSpacing="-0.4px"
                      >
                        django
                      </text>
                    </svg>
                  </div>
                  <div className="assignment-details">
                    <h5 className="assignment-title">Django Project Submission</h5>
                    <span className="assignment-due">Due: Nov 16, 2026</span>
                  </div>
                  <span className="days-left-badge red-badge">2 Days Left</span>
                </div>


                <div className="assignment-item">
                  <div className="assignment-icon-wrap">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="assignment-svg">
                      <ellipse cx="18" cy="18" rx="5.5" ry="14" stroke="#00d8ff" strokeWidth="1.8" />
                      <ellipse cx="18" cy="18" rx="5.5" ry="14" stroke="#00d8ff" strokeWidth="1.8" transform="rotate(60 18 18)" />
                      <ellipse cx="18" cy="18" rx="5.5" ry="14" stroke="#00d8ff" strokeWidth="1.8" transform="rotate(120 18 18)" />
                      <circle cx="18" cy="18" r="2.8" fill="#00d8ff" />
                    </svg>
                  </div>
                  <div className="assignment-details">
                    <h5 className="assignment-title">React Components Task</h5>
                    <span className="assignment-due">Due: Nov 18, 2026</span>
                  </div>
                  <span className="days-left-badge orange-badge">4 Days Left</span>
                </div>


                <div className="assignment-item">
                  <div className="assignment-icon-wrap">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="assignment-svg">
                      <ellipse cx="18" cy="9.5" rx="10" ry="3.8" fill="#3b82f6" />
                      <ellipse cx="18" cy="9" rx="8.5" ry="2.6" fill="#60a5fa" fillOpacity="0.5" />
                      <path d="M8 9.5v5c0 2.1 4.5 3.8 10 3.8s10-1.7 10-3.8v-5c0 2.1-4.5 3.8-10 3.8s-10-1.7-10-3.8z" fill="#2563eb" />
                      <path d="M8 15.5v5c0 2.1 4.5 3.8 10 3.8s10-1.7 10-3.8v-5c0 2.1-4.5 3.8-10 3.8s-10-1.7-10-3.8z" fill="#1d4ed8" />
                      <path d="M8 21.5v5c0 2.1 4.5 3.8 10 3.8s10-1.7 10-3.8v-5c0 2.1-4.5 3.8-10 3.8s-10-1.7-10-3.8z" fill="#1e40af" />
                    </svg>
                  </div>
                  <div className="assignment-details">
                    <h5 className="assignment-title">Database Query Practice</h5>
                    <span className="assignment-due">Due: Nov 20, 2026</span>
                  </div>
                  <span className="days-left-badge blue-badge">6 Days Left</span>
                </div>
              </div>
            </div>


            <div className="grid-card attendance-card">
              <div className="grid-card-header">
                <div className="card-title-wrap">
                  <svg className="card-header-svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#2563eb" />
                    <path d="m8 12 3 3 5-6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h4>Attendance Overview</h4>
                </div>
              </div>

              <div className="attendance-body">

                <div className="donut-chart-container">
                  <svg viewBox="0 0 100 100" className="donut-chart">
                    <circle cx="50" cy="50" r="38" className="donut-bg" strokeWidth="12" />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      className="donut-present"
                      strokeWidth="12"
                      strokeDasharray="213.9 238.76"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      className="donut-absent"
                      strokeWidth="12"
                      strokeDasharray="11.56 238.76"
                      strokeDashoffset="-216.4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      className="donut-leave"
                      strokeWidth="12"
                      strokeDasharray="5.78 238.76"
                      strokeDashoffset="-230.46"
                    />
                  </svg>
                  <div className="donut-center-label">
                    <span className="donut-percent">92.5%</span>
                  </div>
                </div>


                <div className="attendance-legend">
                  <div className="legend-row">
                    <span className="legend-indicator blue-dot"></span>
                    <span className="legend-name">Present</span>
                    <span className="legend-count">37</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-indicator orange-dot"></span>
                    <span className="legend-name">Absent</span>
                    <span className="legend-count">2</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-indicator gray-dot"></span>
                    <span className="legend-name">Leave</span>
                    <span className="legend-count">1</span>
                  </div>
                </div>
              </div>

              <div className="attendance-footer">
                <button className="view-details-btn">
                  View Details &rarr;
                </button>
              </div>
            </div>


            <div className="grid-card notifications-card">
              <div className="grid-card-header">
                <div className="card-title-wrap">
                  <svg className="card-header-svg notif-bell-svg" width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                  </svg>
                  <h4>Notifications</h4>
                </div>
                <a href="#notifications" className="card-header-link">
                  View All &rarr;
                </a>
              </div>

              <div className="notifications-list">

                <div className="notification-row">
                  <div className="notif-icon-circle orange-light">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" />
                      <line x1="9" y1="12" x2="15" y2="12" />
                      <line x1="9" y1="16" x2="13" y2="16" />
                    </svg>
                  </div>
                  <div className="notif-text-wrap">
                    <p className="notif-title">Your assignment is due soon</p>
                    <span className="notif-sub">(Django Project Submission)</span>
                  </div>
                  <span className="notif-time">2h ago</span>
                </div>


                <div className="notification-row">
                  <div className="notif-icon-circle blue-light">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="notif-text-wrap">
                    <p className="notif-title">Exam schedule released</p>
                    <span className="notif-sub">(End Semester Exams)</span>
                  </div>
                  <span className="notif-time">1d ago</span>
                </div>


                <div className="notification-row">
                  <div className="notif-icon-circle purple-light">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="notif-text-wrap">
                    <p className="notif-title">New job opportunities</p>
                    <span className="notif-sub">(Tech Mahindra)</span>
                  </div>
                  <span className="notif-time">2d ago</span>
                </div>
              </div>
            </div>
          </section>


          <section className="placement-banner">

            <div className="banner-corner-curves" aria-hidden="true">
              <svg viewBox="0 0 100 80" fill="none" className="banner-corner-svg">
                <defs>
                  <linearGradient id="topLeftCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="topLeftGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path d="M0,0 L65,0 C48,25 24,46 0,56 Z" fill="url(#topLeftCyan)" />
                <path d="M0,0 L48,0 C34,18 18,34 0,42 Z" fill="url(#topLeftGold)" />
              </svg>
            </div>


            <div className="banner-left-content">
              <div className="trophy-icon-wrapper">
                <img src={trophyImg} alt="Victory Trophy" className="trophy-img" />
              </div>
              <div className="banner-text-details">
                <h3 className="banner-main-title">
                  Achieve More with Talent<span className="banner-title-os">OS</span>
                </h3>
                <p className="banner-sub-title">
                  Explore placement opportunities and build your career.
                </p>
              </div>
            </div>


            <div className="banner-right-visual">
              <img src={graduatesImg} alt="Placement Opportunities & Graduates Celebrating" className="banner-right-img" />
              <button
                type="button"
                className="banner-action-overlay-btn"
                onClick={() => setActiveNav('Placement')}
                aria-label="View Jobs"
              ></button>
            </div>


            <div className="banner-mobile-action-row">
              <button
                type="button"
                className="banner-mobile-btn"
                onClick={() => setActiveNav('Placement')}
              >
                View Jobs &rarr;
              </button>
              <div
                className="banner-mobile-graduates-wrap"
                onClick={() => setActiveNav('Placement')}
                role="button"
                tabIndex={0}
                aria-label="View placement opportunities"
              >
                <img src={graduatesImg} alt="Graduates Celebrating" className="banner-mobile-grad-img" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
