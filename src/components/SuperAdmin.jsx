
import { useState, useRef, useEffect } from 'react';
import "./SuperAdmin.css";
import campusBanner from '../assets/images/campus-banner.png';
import rocketImg from '../assets/images/rocket.png';
import gradCapImg from '../assets/images/grad-cap.png';
import {
  House,
  Landmark,
  ClipboardList,
  CreditCard,
  FileText,
  Users,
  UserPlus,
  School,
  GraduationCap,
  BarChart2,
  BarChart3,
  Sparkles,
  Zap,
  Crown,
  Rocket,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  Settings,
  LogOut
} from 'lucide-react';

export default function SuperAdmin({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileDropdownOpen]);

  const handleNavClick = (menu) => {
    setActiveMenu(menu);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <div className="talentos-dashboard-container">
      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop active"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <aside className={`talentos-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo-badge">
            <img
              src={gradCapImg}
              alt="TalentOS Graduation Cap"
              className="brand-cap-img"
            />
          </div>
          <div className="brand-text-wrap">
            <div className="brand-company">
              <span className="brand-artly">Artly</span>
              <span className="brand-soft">soft</span>
            </div>
            <div className="brand-title">
              <span className="brand-talent">Talent</span>
              <span className="brand-os">OS</span>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('Dashboard')}
          >
            <House className="nav-icon" size={21} strokeWidth={2.4} />
            <span className="nav-label">Dashboard</span>
          </div>

          <div
            className={`nav-item ${activeMenu === 'Institutes' ? 'active' : ''}`}
            onClick={() => handleNavClick('Institutes')}
          >
            <Landmark className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Institutes</span>
          </div>

          <div
            className={`nav-item ${activeMenu === 'Subscription Plans' ? 'active' : ''}`}
            onClick={() => handleNavClick('Subscription Plans')}
          >
            <ClipboardList className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Subscription Plans</span>
          </div>

          <div
            className={`nav-item ${activeMenu === 'Payments' ? 'active' : ''}`}
            onClick={() => handleNavClick('Payments')}
          >
            <CreditCard className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Payments</span>
          </div>

          <div
            className={`nav-item ${activeMenu === 'Invoices' ? 'active' : ''}`}
            onClick={() => handleNavClick('Invoices')}
          >
            <FileText className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Invoices</span>
          </div>

          <div
            className={`nav-item ${activeMenu === 'Users' ? 'active' : ''}`}
            onClick={() => handleNavClick('Users')}
          >
            <Users className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Users</span>
          </div>

          <div
            className={`nav-item ${activeMenu === 'Create Admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('Create Admin')}
          >
            <UserPlus className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Create Admin</span>
          </div>

          <div
            className={`nav-item has-dropdown ${activeMenu === 'Reports' ? 'active' : ''}`}
            onClick={() => handleNavClick('Reports')}
          >
            <BarChart3 className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Reports</span>
            <ChevronDown className="dropdown-arrow" size={18} strokeWidth={2.2} />
          </div>

          <div
            className={`nav-item ${activeMenu === 'AI Analytics' ? 'active' : ''}`}
            onClick={() => handleNavClick('AI Analytics')}
          >
            <Sparkles className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">AI Analytics</span>
          </div>

          <div
            className={`nav-item has-dropdown ${activeMenu === 'Settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('Settings')}
          >
            <Settings className="nav-icon" size={21} strokeWidth={2.2} />
            <span className="nav-label">Settings</span>
            <ChevronDown className="dropdown-arrow" size={18} strokeWidth={2.2} />
          </div>
        </nav>

        <div className="sidebar-promo-card">
          <div className="promo-rocket-wrap">
            <img
              src={rocketImg}
              alt="Rocket Illustration"
              className="promo-rocket-img"
            />
          </div>
          <p className="promo-heading">
            Building a Smarter
            <br />
            Education Ecosystem
          </p>
          <span className="promo-sub">with TalentOS</span>
          <button className="promo-btn">
            <span>Learn More</span>
            <i className="bi bi-arrow-right" style={{ fontSize: '11px' }}></i>
          </button>
        </div>

        <div className="sidebar-copyright">
          © 2026 TalentOS. All rights reserved.
        </div>
      </aside>

      <main className="talentos-main-area">
        <header className="talentos-top-header">
          <div className="header-left-wrap">
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => {
                setMobileMenuOpen(true);
                setProfileDropdownOpen(false);
              }}
              aria-label="Open navigation menu"
            >
              <Menu size={20} strokeWidth={2.2} />
            </button>
            <div className="header-platform-title">
              <span className="platform-prefix">TalentOS</span>
              <span className="platform-slash">/</span>
              <span className="platform-name">Campus platform</span>
            </div>
          </div>

          <div className="header-right-wrap">
            <button
              type="button"
              className="notification-bell-btn"
              aria-label="View notifications"
            >
              <Bell className="bell-icon" size={20} strokeWidth={1.9} />
            </button>

            <div className="admin-profile-container" ref={profileDropdownRef}>
              <div
                className={`admin-profile-pill ${profileDropdownOpen ? 'active' : ''}`}
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
                aria-label="User profile menu"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setProfileDropdownOpen((prev) => !prev);
                  }
                }}
              >
                <div className="admin-avatar-circle" aria-hidden="true">
                  <span>SA</span>
                </div>
                <div className="admin-info-box">
                  <div className="admin-name-row">
                    <span className="admin-name">Super Admin</span>
                    <ChevronDown
                      className={`admin-chevron ${profileDropdownOpen ? 'rotated' : ''}`}
                      size={15}
                      strokeWidth={2.2}
                    />
                  </div>
                  <span className="admin-role">Administrator</span>
                </div>
              </div>

              {profileDropdownOpen && (
                <div className="admin-profile-dropdown" role="menu" aria-label="Profile options">
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar-circle" aria-hidden="true">
                      <span>SA</span>
                    </div>
                    <div className="dropdown-user-details">
                      <span className="dropdown-user-name">SuperAdmin</span>
                      <span className="dropdown-user-email">super@pmccollege.ac.in</span>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-menu-list">
                    <button
                      type="button"
                      className="dropdown-menu-item"
                      role="menuitem"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <User className="dropdown-item-icon" size={18} strokeWidth={1.9} />
                      <span className="dropdown-item-label">My Profile</span>
                    </button>

                    <button
                      type="button"
                      className="dropdown-menu-item"
                      role="menuitem"
                      onClick={() => {
                        handleNavClick('Settings');
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <Settings className="dropdown-item-icon" size={18} strokeWidth={1.9} />
                      <span className="dropdown-item-label">Settings</span>
                    </button>

                    <button
                      type="button"
                      className="dropdown-menu-item dropdown-logout-item"
                      role="menuitem"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                    >
                      <LogOut className="dropdown-item-icon" size={18} strokeWidth={1.9} />
                      <span className="dropdown-item-label">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="talentos-dashboard-content">
        <section className="welcome-banner-card">
          <div className="welcome-text-content">
            <h1 className="welcome-heading">Super Admin Dashboard</h1>
            <p className="welcome-subtitle">
              Manage your platform, monitor growth and drive educational excellence.
            </p>
          </div>

          <div className="welcome-art-container">
            <img
              src={campusBanner}
              alt="Campus & Geometric Accents"
              className="welcome-art-img"
            />
          </div>
        </section>

        <section className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-blue">
              <Landmark size={21} strokeWidth={2.2} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Institutes</span>
              <h2 className="stat-value">120</h2>
              <span className="stat-growth green-text">
                <span className="growth-arrow">↑</span> +12%
              </span>
            </div>
            <div className="stat-ascending-bars bars-blue">
              <span style={{ height: '20%' }}></span>
              <span style={{ height: '36%' }}></span>
              <span style={{ height: '52%' }}></span>
              <span style={{ height: '68%' }}></span>
              <span style={{ height: '84%' }}></span>
              <span style={{ height: '100%' }}></span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-purple">
              <svg
                viewBox="0 0 34 24"
                className="stat-svg-students"
                fill="currentColor"
              >
                <circle cx="17" cy="6" r="4.3" />
                <path d="M 17 13.5 C 12.6 13.5 9 16.8 9 21 L 9 23.2 C 9 23.6 9.4 24 10 24 L 24 24 C 24.6 24 25 23.6 25 23.2 L 25 21 C 25 16.8 21.4 13.5 17 13.5 Z" />
                <circle cx="6.5" cy="7" r="3.2" />
                <path d="M 5.8 13.5 C 3.2 13.5 1 15.6 1 18.2 L 1 21.2 C 1 21.6 1.4 22 1.8 22 L 6.8 22 C 6.9 20.4 7.5 18.5 8.6 16.8 L 9.6 15.2 C 8.6 14.1 7.3 13.5 5.8 13.5 Z" />
                <circle cx="27.5" cy="7" r="3.2" />
                <path d="M 28.2 13.5 C 30.8 13.5 33 15.6 33 18.2 L 33 21.2 C 33 21.6 32.6 22 32.2 22 L 27.2 22 C 27.1 20.4 26.5 18.5 25.4 16.8 L 24.4 15.2 C 25.4 14.1 26.7 13.5 28.2 13.5 Z" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Students</span>
              <h2 className="stat-value">45K</h2>
              <span className="stat-growth green-text">
                <span className="growth-arrow">↑</span> +18%
              </span>
            </div>
            <div className="stat-ascending-bars bars-purple">
              <span style={{ height: '20%' }}></span>
              <span style={{ height: '36%' }}></span>
              <span style={{ height: '52%' }}></span>
              <span style={{ height: '68%' }}></span>
              <span style={{ height: '84%' }}></span>
              <span style={{ height: '100%' }}></span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-orange">
              <svg
                viewBox="0 0 16 16"
                className="stat-svg-faculty"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1z" />
                <path d="M8 10.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Faculty</span>
              <h2 className="stat-value">12.5K</h2>
              <span className="stat-growth green-text">
                <span className="growth-arrow">↑</span> +10%
              </span>
            </div>
            <div className="stat-ascending-bars bars-orange">
              <span style={{ height: '20%' }}></span>
              <span style={{ height: '36%' }}></span>
              <span style={{ height: '52%' }}></span>
              <span style={{ height: '68%' }}></span>
              <span style={{ height: '84%' }}></span>
              <span style={{ height: '100%' }}></span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-green">
              <CreditCard size={21} strokeWidth={2.2} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Revenue</span>
              <h2 className="stat-value">₹12.5L</h2>
              <span className="stat-growth green-text">
                <span className="growth-arrow">↑</span> +22%
              </span>
            </div>
            <div className="stat-ascending-bars bars-green">
              <span style={{ height: '20%' }}></span>
              <span style={{ height: '36%' }}></span>
              <span style={{ height: '52%' }}></span>
              <span style={{ height: '68%' }}></span>
              <span style={{ height: '84%' }}></span>
              <span style={{ height: '100%' }}></span>
            </div>
          </div>
        </section>

        <section className="growth-and-activities-row">
         <div className="overview-metric-cards-grid">
  <div className="overview-metric-card">
    <div className="overview-card-header">
      <div className="overview-card-icon-wrap icon-blue">
        <School size={17} strokeWidth={2.2} />
      </div>
      <button
        type="button"
        className="overview-card-view-btn"
        onClick={() => handleNavClick('Institutes')}
        aria-label="View all institutes"
      >
        <span>View All</span>
        <span className="view-arrow">→</span>
      </button>
    </div>
    <div className="overview-card-content">
      <span className="overview-card-label">Institutes</span>
      <h3 className="overview-card-value">120</h3>
      <div className="overview-card-trend">
        <span className="trend-growth-badge">↑ +12%</span>
        <span className="trend-subtext">active campuses</span>
      </div>
    </div>
  </div>

  <div className="overview-metric-card">
    <div className="overview-card-header">
      <div className="overview-card-icon-wrap icon-orange">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="10" r="2.8" />
          <path d="M7.5 17.5a4.5 4.5 0 0 1 9 0" />
        </svg>
      </div>
      <button
        type="button"
        className="overview-card-view-btn"
        onClick={() => handleNavClick('Create Admin')}
        aria-label="View all institute admins"
      >
        <span>View All</span>
        <span className="view-arrow">→</span>
      </button>
    </div>
    <div className="overview-card-content">
      <span className="overview-card-label">Institute Admins</span>
      <h3 className="overview-card-value">115</h3>
      <div className="overview-card-trend">
        <span className="trend-growth-badge">↑ +8%</span>
        <span className="trend-subtext">vs last month</span>
      </div>
    </div>
  </div>

  <div className="overview-metric-card">
    <div className="overview-card-header">
      <div className="overview-card-icon-wrap icon-purple">
        <GraduationCap size={17} strokeWidth={2.2} />
      </div>
      <button
        type="button"
        className="overview-card-view-btn"
        onClick={() => handleNavClick('Users')}
        aria-label="View all principals"
      >
        <span>View All</span>
        <span className="view-arrow">→</span>
      </button>
    </div>
    <div className="overview-card-content">
      <span className="overview-card-label">Principals</span>
      <h3 className="overview-card-value">118</h3>
      <div className="overview-card-trend">
        <span className="trend-growth-badge">↑ +10%</span>
        <span className="trend-subtext">total assigned</span>
      </div>
    </div>
  </div>

  <div className="overview-metric-card">
    <div className="overview-card-header">
      <div className="overview-card-icon-wrap icon-teal">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="3" width="6" height="4.5" rx="1" />
          <rect x="2" y="16.5" width="5.5" height="4.5" rx="1" />
          <rect x="9.25" y="16.5" width="5.5" height="4.5" rx="1" />
          <rect x="16.5" y="16.5" width="5.5" height="4.5" rx="1" />
          <path d="M12 7.5v4" />
          <path d="M4.75 11.5h14.5" />
          <path d="M4.75 11.5v5" />
          <path d="M12 11.5v5" />
          <path d="M19.25 11.5v5" />
        </svg>
      </div>
      <button
        type="button"
        className="overview-card-view-btn"
        onClick={() => handleNavClick('Institutes')}
        aria-label="View all departments"
      >
        <span>View All</span>
        <span className="view-arrow">→</span>
      </button>
    </div>
    <div className="overview-card-content">
      <span className="overview-card-label">Departments</span>
      <h3 className="overview-card-value">420</h3>
      <div className="overview-card-trend">
        <span className="trend-growth-badge">↑ +15%</span>
        <span className="trend-subtext">active units</span>
      </div>
    </div>
  </div>
</div>

          <div className="recent-activities-card">
            <div className="card-header-row">
              <div className="card-title-group">
                <Zap className="title-icon-yellow" size={17} strokeWidth={2.5} />
                <h3 className="card-title">Recent Activities</h3>
              </div>
              <a href="#view-all" className="card-header-link">
                View All →
              </a>
            </div>

            <div className="activities-timeline">
              <div className="timeline-item">
                <div className="timeline-connector">
                  <span className="timeline-dot dot-blue"></span>
                  <div className="timeline-line"></div>
                </div>
                <div className="activity-icon-wrap icon-wrap-blue">
                  <Landmark size={17} strokeWidth={2.2} />
                </div>
                <div className="activity-details">
                  <h4 className="activity-title">New Institute Registered</h4>
                  <p className="activity-meta">PMC College • 2 min ago</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-connector">
                  <span className="timeline-dot dot-orange"></span>
                  <div className="timeline-line"></div>
                </div>
                <div className="activity-icon-wrap icon-wrap-blue">
                  <CreditCard size={17} strokeWidth={2.2} />
                </div>
                <div className="activity-details">
                  <h4 className="activity-title">Payment Received</h4>
                  <p className="activity-meta">₹150 – Invoice TOS-202610-001 • 5 min ago</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-connector">
                  <span className="timeline-dot dot-blue"></span>
                  <div className="timeline-line"></div>
                </div>
                <div className="activity-icon-wrap icon-wrap-blue">
                  <Users size={17} strokeWidth={2.2} />
                </div>
                <div className="activity-details">
                  <h4 className="activity-title">New Student Added</h4>
                  <p className="activity-meta">Rohit Kumar – PMC College • 8 min ago</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-connector">
                  <span className="timeline-dot dot-orange"></span>
                  <div className="timeline-line timeline-line-end"></div>
                </div>
                <div className="activity-icon-wrap icon-wrap-yellow">
                  <Crown size={17} strokeWidth={2.2} />
                </div>
                <div className="activity-details">
                  <h4 className="activity-title">Subscription Renewed</h4>
                  <p className="activity-meta">Global Institute – 1 Year Plan • 12 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-cards-grid">
          <div className="bottom-card institute-distribution-card">
            <h3 className="card-title">Institute Distribution</h3>
            <div className="distribution-body">
              <div className="doughnut-chart-wrap">
                <svg viewBox="0 0 110 110" className="doughnut-svg">
                  <defs>
                    <linearGradient id="activePieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="55"
                    cy="55"
                    r="38"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="12"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r="38"
                    fill="none"
                    stroke="url(#activePieGrad)"
                    strokeWidth="12"
                    strokeDasharray="188.62 238.76"
                    strokeDashoffset="0"
                    transform="rotate(-90 55 55)"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r="38"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="12"
                    strokeDasharray="31.04 238.76"
                    strokeDashoffset="-188.62"
                    transform="rotate(-90 55 55)"
                  />
                </svg>
                <div className="doughnut-center-content">
                  <span className="doughnut-center-number">120</span>
                  <span className="doughnut-center-label">Institutes</span>
                </div>
              </div>

              <div className="distribution-legend">
                <div className="dist-legend-item">
                  <div className="legend-label-group">
                    <span className="legend-dot dot-blue"></span>
                    <span className="legend-name">Active</span>
                  </div>
                  <span className="legend-value">95 (79%)</span>
                </div>

                <div className="dist-legend-item">
                  <div className="legend-label-group">
                    <span className="legend-dot dot-orange"></span>
                    <span className="legend-name">Pending</span>
                  </div>
                  <span className="legend-value">15 (13%)</span>
                </div>

                <div className="dist-legend-item">
                  <div className="legend-label-group">
                    <span className="legend-dot dot-grey"></span>
                    <span className="legend-name">Expired</span>
                  </div>
                  <span className="legend-value">10 (8%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-card revenue-overview-card">
            <div className="card-header-row">
              <div className="card-title-group">
                <BarChart3 className="title-icon-blue-plain" size={17} strokeWidth={2.4} />
                <h3 className="card-title">Revenue Overview</h3>
              </div>
              <a href="#view-details" className="card-header-link">
                View Details &rarr;
              </a>
            </div>

            <div className="revenue-chart-stage">
              <div className="revenue-metric-overlay">
                <div className="revenue-amount-group">
                  <h2 className="revenue-amount">₹12.5L</h2>
                  <span className="revenue-growth-plain">
                    <span className="growth-arrow">↑</span> +22%
                  </span>
                </div>
                <p className="revenue-subtitle">Total Revenue This Month</p>
              </div>

              <div className="revenue-bar-chart">
                <div className="bar-column">
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: '26%', background: '#A9B7FC' }}></div>
                  </div>
                  <span className="bar-label">Jun</span>
                </div>
                <div className="bar-column">
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: '38%', background: '#98AEFD' }}></div>
                  </div>
                  <span className="bar-label">Jul</span>
                </div>
                <div className="bar-column">
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: '52%', background: '#82A1FE' }}></div>
                  </div>
                  <span className="bar-label">Aug</span>
                </div>
                <div className="bar-column">
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: '65%', background: '#65A4FE' }}></div>
                  </div>
                  <span className="bar-label">Sep</span>
                </div>
                <div className="bar-column">
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: '78%', background: '#5394FE' }}></div>
                  </div>
                  <span className="bar-label">Oct</span>
                </div>
                <div className="bar-column">
                  <div className="bar-track">
                    <div className="bar-fill bar-highlight" style={{ height: '100%', background: '#2563EB' }}></div>
                  </div>
                  <span className="bar-label">Nov</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-card quick-actions-card">
            <div className="card-header-row">
              <div className="card-title-group">
                <Rocket className="title-icon-blue-plain" size={17} strokeWidth={2.2} />
                <h3 className="card-title">Quick Actions</h3>
              </div>
            </div>

            <div className="quick-actions-grid">
              <div className="action-button-card">
                <div className="action-circle-icon icon-circle-blue">
                  <Landmark size={17} strokeWidth={2.2} />
                </div>
                <span className="action-name">Add<br />Institute</span>
              </div>

              <div className="action-button-card">
                <div className="action-circle-icon icon-circle-yellow">
                  <Crown size={17} strokeWidth={2.2} />
                </div>
                <span className="action-name">Manage<br />Plans</span>
              </div>

              <div className="action-button-card">
                <div className="action-circle-icon icon-circle-blue">
                  <CreditCard size={17} strokeWidth={2.2} />
                </div>
                <span className="action-name">View<br />Payments</span>
              </div>

              <div className="action-button-card">
                <div className="action-circle-icon icon-circle-blue">
                  <BarChart2 size={17} strokeWidth={2.2} />
                </div>
                <span className="action-name">Generate<br />Report</span>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}
