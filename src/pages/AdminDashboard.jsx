
import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  ArrowRight,
  X,
  Check,
  MapPin,
  Mail,
  Phone,
  Zap,
  UserPlus,
  Users,
  BarChart3,
  Clock3,
  UserRound,
  Settings,
  LogOut,
  Calendar,
  CalendarDays,
  ClipboardList,
  CircleDollarSign,
  Eye
} from "lucide-react";
import {
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ComposedChart
} from "recharts";
import Sidebar from "../components/admin/Sidebar";
import campusBanner from "../assets/dashboard/campus-banner.png";
import instituteCampus from "../assets/dashboard/institute-campus.png";

const overviewData = {
  month: [
    { date: "Oct 1", students: 480, faculty: 160 },
    { date: "Oct 4", students: 550, faculty: 210 },
    { date: "Oct 7", students: 660, faculty: 260 },
    { date: "Oct 10", students: 670, faculty: 270 },
    { date: "Oct 14", students: 820, faculty: 360 },
    { date: "Oct 17", students: 800, faculty: 350 },
    { date: "Oct 21", students: 910, faculty: 440 },
    { date: "Oct 24", students: 880, faculty: 410 },
    { date: "Oct 28", students: 950, faculty: 455 },
    { date: "Oct 30", students: 940, faculty: 450 },
    { date: "Oct 31", students: 1120, faculty: 480 }
  ],
  threeMonths: [
    { date: "Aug", students: 720, faculty: 320 },
    { date: "Sep", students: 850, faculty: 380 },
    { date: "Oct", students: 1120, faculty: 480 }
  ],
  year: [
    { date: "Jan", students: 540, faculty: 180 },
    { date: "Feb", students: 590, faculty: 200 },
    { date: "Mar", students: 640, faculty: 220 },
    { date: "Apr", students: 700, faculty: 250 },
    { date: "May", students: 750, faculty: 280 },
    { date: "Jun", students: 810, faculty: 310 },
    { date: "Jul", students: 860, faculty: 350 },
    { date: "Aug", students: 920, faculty: 390 },
    { date: "Sep", students: 980, faculty: 420 },
    { date: "Oct", students: 1120, faculty: 480 },
    { date: "Nov", students: 1180, faculty: 500 },
    { date: "Dec", students: 1250, faculty: 520 }
  ]
};

const statistics = [
  {
    title: "Total Students",
    value: "1,250",
    change: "+12%",
    className: "students",
    chartPath:
      "M4 61 C14 56 18 51 28 53 S40 34 50 42 S64 18 74 29 S89 13 99 23 S109 14 116 9",
    chartEndY: 9
  },
  {
    title: "Total Faculty",
    value: "120",
    change: "+5%",
    className: "faculty",
    chartPath:
      "M4 62 C16 56 18 54 28 56 S42 37 52 43 S67 30 77 34 S92 16 101 24 S110 16 116 10",
    chartEndY: 10
  },
  {
    title: "Total Courses",
    value: "48",
    change: "+2%",
    className: "courses",
    chartPath:
      "M4 62 C15 60 20 47 29 52 S43 34 53 39 S65 22 76 29 S90 14 100 19 S110 12 116 8",
    chartEndY: 8
  },
  {
    title: "Attendance Rate",
    value: "96.5%",
    change: "+1.2%",
    className: "attendance",
    chartPath:
      "M4 61 C17 55 22 58 32 46 S45 51 55 36 S70 32 80 38 S94 15 103 23 S111 14 116 8",
    chartEndY: 8
  }
];

const activities = [
  {
    title: "New student registered",
    description: "Rahul S - B.Tech CSE",
    time: "2 min ago",
    className: "blue",
    solidIcon: "building"
  },
  {
    title: "Fee payment received",
    description: "₹50,000 - Receipt #TOS-202610-7854",
    time: "5 min ago",
    className: "orange",
    solidIcon: "wallet"
  },
  {
    title: "New faculty added",
    description: "Dr. Priya Menon - Mathematics",
    time: "12 min ago",
    className: "blue",
    solidIcon: "people"
  },
  {
    title: "Exam scheduled",
    description: "Data Structures - 15 Nov 2026",
    time: "1 hour ago",
    className: "orange",
    solidIcon: "calendar"
  }
];

const allActivities = [
  ...activities,
  {
    title: "Attendance updated",
    description: "October attendance has been finalized",
    time: "2 hours ago",
    className: "blue",
    solidIcon: "calendar"
  },
  {
    title: "New course created",
    description: "Cloud Computing course added successfully",
    time: "3 hours ago",
    className: "orange",
    solidIcon: "document"
  }
];

const quickAccessItems = [
  {
    label: "Add Student",
    action: "addStudent"
  },
  {
    label: "Manage Batches",
    action: "manageBatches"
  },
  {
    label: "View Reports",
    action: "viewReports"
  },
  {
    label: "Create Exam",
    action: "createExam"
  },
  {
    label: "Manage Fees",
    action: "manageFees"
  },
  {
    label: "Notifications",
    action: "notifications"
  }
];

const events = [
  {
    day: "15",
    month: "Nov",
    title: "Monthly Exam",
    description: "Data Structures",
    time: "09:00 AM"
  },
  {
    day: "20",
    month: "Nov",
    title: "Faculty Meeting",
    description: "Academic Review",
    time: "11:00 AM"
  },
  {
    day: "30",
    month: "Nov",
    title: "Fee Payment Deadline",
    description: "November Batch",
    time: "05:00 PM"
  }
];

const notifications = [
  {
    title: "New student registration",
    description: "Rahul S has successfully registered.",
    time: "2 min ago",
    unread: true
  },
  {
    title: "Fee payment received",
    description: "A payment of ₹50,000 was received.",
    time: "5 min ago",
    unread: true
  },
  {
    title: "Exam reminder",
    description: "Monthly Exam is scheduled for 15 Nov 2026.",
    time: "1 hour ago",
    unread: true
  }
];

function FilledDashboardIcon({ name, size = 28 }) {
  return (
    <svg
      className="filled-dashboard-icon"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      {(name === "students" ||
        name === "manageBatches" ||
        name === "people") && (
        <g>
          <circle cx="24" cy="13" r="7" />
          <circle cx="10.5" cy="18" r="5.5" />
          <circle cx="37.5" cy="18" r="5.5" />
          <path d="M12 40v-4.5c0-6.1 4.9-11 11-11h2c6.1 0 11 4.9 11 11V40H12Z" />
          <path d="M2 38v-3c0-4.9 3.9-8.8 8.8-8.8 2.4 0 4.5.9 6.1 2.5-2.3 2.5-3.7 5.8-3.7 9.1V38H2Z" />
          <path d="M34.8 28.7c1.6-1.6 3.7-2.5 6.1-2.5 4.9 0 8.8 3.9 8.8 8.8v3H36.5v-.2c0-3.3-1.4-6.6-3.7-9.1Z" />
        </g>
      )}

      {name === "faculty" && (
        <g>
          <circle cx="17" cy="15" r="7" />
          <circle cx="33" cy="18" r="5.5" />
          <path d="M4 40v-4c0-7.2 5.8-13 13-13s13 5.8 13 13v4H4Z" />
          <path d="M28 27c1.5-1.8 3.6-2.8 6-2.8 6 0 10 4.5 10 11V40H30v-4c0-3.4-.7-6.2-2-9Z" />
        </g>
      )}

      {name === "courses" && (
        <g>
          <path d="M5 9c6-3 13-3 19 1v31c-6-4-13-4-19-1V9Z" />
          <path d="M43 9c-6-3-13-3-19 1v31c6-4 13-4 19-1V9Z" />
          <path d="M24 10v31" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M10 15h9M10 21h9M29 15h9M29 21h9" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {(name === "manageFees" || name === "wallet") && (
        <g>
          <rect x="4" y="9" width="40" height="30" rx="5" />
          <rect x="4" y="16" width="40" height="5" fill="#ffffff" />
          <rect x="10" y="28" width="13" height="4" rx="2" fill="#ffffff" />
          <circle cx="36" cy="30" r="3" fill="#ffffff" />
        </g>
      )}

      {(name === "attendance" || name === "calendar") && (
        <g>
          <rect x="5" y="8" width="38" height="35" rx="6" />
          <rect x="5" y="16" width="38" height="6" fill="#ffffff" />
          <rect x="13" y="4" width="4" height="12" rx="2" />
          <rect x="31" y="4" width="4" height="12" rx="2" />
          <path
            d="m14 30 6 6 14-14"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {(name === "bars" || name === "viewReports") && (
        <g>
          <rect x="5" y="27" width="9" height="16" rx="2" />
          <rect x="19" y="17" width="9" height="26" rx="2" />
          <rect x="33" y="5" width="9" height="38" rx="2" />
        </g>
      )}

      {name === "activity" && (
        <g>
          <rect x="5" y="17" width="11" height="11" rx="3" />
          <rect x="19" y="5" width="11" height="11" rx="3" />
          <rect x="32" y="17" width="11" height="11" rx="3" />
          <rect x="19" y="31" width="11" height="11" rx="3" />
          <circle cx="24.5" cy="23" r="5" fill="#ffffff" />
        </g>
      )}

      {name === "addStudent" && (
        <g>
          <circle cx="19" cy="14" r="8" />
          <path d="M4 41v-3c0-8 6-14 15-14s15 6 15 14v3H4Z" />
          <circle cx="37" cy="13" r="9" fill="#ffffff" />
          <path
            d="M37 8v10m-5-5h10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {name === "createExam" && (
        <g>
          <path d="M10 3h19l10 10v32H10V3Z" />
          <path d="M29 3v11h10" fill="#ffffff" />
          <rect x="16" y="21" width="17" height="3" rx="1.5" fill="#ffffff" />
          <rect x="16" y="28" width="17" height="3" rx="1.5" fill="#ffffff" />
          <rect x="16" y="35" width="12" height="3" rx="1.5" fill="#ffffff" />
        </g>
      )}

      {name === "notifications" && (
        <g>
          <path d="M24 5c-8 0-13 6-13 14v7l-5 8h36l-5-8v-7c0-8-5-14-13-14Z" />
          <path d="M18 38c1 4 3 6 6 6s5-2 6-6H18Z" />
        </g>
      )}

      {(name === "building" || name === "landmark") && (
        <g>
          <path d="M3 17 24 5l21 12v4H3v-4Z" />
          <rect x="7" y="23" width="7" height="15" rx="1" />
          <rect x="20.5" y="23" width="7" height="15" rx="1" />
          <rect x="34" y="23" width="7" height="15" rx="1" />
          <rect x="3" y="40" width="42" height="4" rx="1" />
        </g>
      )}

      {name === "document" && (
        <g>
          <path d="M10 3h19l10 10v32H10V3Z" />
          <path d="M29 3v11h10" fill="#ffffff" />
          <rect x="16" y="22" width="17" height="3" rx="1.5" fill="#ffffff" />
          <rect x="16" y="29" width="17" height="3" rx="1.5" fill="#ffffff" />
          <rect x="16" y="36" width="12" height="3" rx="1.5" fill="#ffffff" />
        </g>
      )}
    </svg>
  );
}

function AdminDashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [instituteOpen, setInstituteOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState("");
  const [readNotifications, setReadNotifications] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const chartData = overviewData[activePeriod];

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const searchableItems = [
      ...statistics.map((item) => ({
        title: item.title,
        type: "Statistics"
      })),
      ...activities.map((item) => ({
        title: item.title,
        type: "Activity"
      })),
      ...quickAccessItems.map((item) => ({
        title: item.label,
        type: "Quick Access"
      })),
      ...events.map((item) => ({
        title: item.title,
        type: "Event"
      }))
    ];

    return searchableItems.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const unreadCount = readNotifications ? 0 : notifications.length;

  const showToast = (message) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleQuickAccess = (action, label) => {
    if (action === "notifications") {
      setNotificationsOpen(true);
      setProfileOpen(false);
      return;
    }

    setActiveModal({
      type: action,
      title: label
    });
  };

  const handleNotificationClick = () => {
    setNotificationsOpen((previous) => !previous);
    setProfileOpen(false);
    setReadNotifications(true);
  };

  const handleProfileClick = () => {
    setProfileOpen((previous) => !previous);
    setNotificationsOpen(false);
  };

  const closeAllPopups = () => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const handleSearchFocus = () => {
    setSearchOpen(true);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const handleSearchResult = (result) => {
    setSearchQuery(result.title);
    setSearchOpen(false);
    showToast(`${result.title} selected`);
  };

  return (
    <div className="admin-dashboard" onClick={closeAllPopups}>
      <button
        className="sidebar-menu-button"
        type="button"
        aria-label="Open navigation"
        aria-expanded={sidebarOpen}
        onClick={(event) => {
          event.stopPropagation();
          setSidebarOpen(true);
        }}
      >
        <Menu size={22} />
      </button>

      <button
        className={`sidebar-overlay ${sidebarOpen ? "is-visible" : ""}`}
        type="button"
        aria-label="Close navigation"
        onClick={closeSidebar}
      />

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="admin-main-content">
        <header
          className="dashboard-topbar"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="topbar-search-wrapper">
            <div className="topbar-search">
              <Search size={21} />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search anything... (Ctrl + K)"
                aria-label="Search anything"
                onFocus={handleSearchFocus}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(true);
                }}
              />
            </div>

            {searchOpen && searchQuery.trim() && (
              <div className="dashboard-search-results">
                {filteredResults.length > 0 ? (
                  filteredResults.slice(0, 6).map((result, index) => (
                    <button
                      type="button"
                      key={`${result.title}-${index}`}
                      onClick={() => handleSearchResult(result)}
                    >
                      <div>
                        <strong>{result.title}</strong>
                        <span>{result.type}</span>
                      </div>
                      <ArrowRight size={16} />
                    </button>
                  ))
                ) : (
                  <div className="search-empty-state">
                    No matching results found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="topbar-actions">
            <div className="topbar-popup-wrapper">
              <button
                className="topbar-icon-button"
                type="button"
                aria-label="Notifications"
                onClick={handleNotificationClick}
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="notification-count">{unreadCount}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="dashboard-popup notifications-popup">
                  <div className="popup-header">
                    <div>
                      <h3>Notifications</h3>
                      <span>{notifications.length} recent updates</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      aria-label="Close notifications"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div
                        className="notification-item"
                        key={notification.title}
                      >
                        <div className="notification-dot"></div>

                        <div>
                          <strong>{notification.title}</strong>
                          <p>{notification.description}</p>
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="popup-footer-button"
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      setActiveModal({
                        type: "notifications",
                        title: "All Notifications"
                      });
                    }}
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>

            <div className="topbar-popup-wrapper">
              <button
                className="topbar-profile-button"
                type="button"
                onClick={handleProfileClick}
                aria-expanded={profileOpen}
              >
                <div className="profile-avatar">
                  <span>DK</span>
                </div>

                <div className="profile-details">
                  <strong>Dinesh Kumar</strong>
                  <span>Institute Admin</span>
                </div>

                {profileOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {profileOpen && (
                <div className="dashboard-popup profile-popup">
                  <div className="profile-popup-user">
                    <div className="profile-avatar large">
                      <span>DK</span>
                    </div>

                    <div>
                      <strong>Dinesh Kumar</strong>
                      <span>dinesh@pmccollege.ac.in</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setActiveModal({
                        type: "profile",
                        title: "My Profile"
                      });
                    }}
                  >
                    <UserRound size={17} />
                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setActiveModal({
                        type: "settings",
                        title: "Settings"
                      });
                    }}
                  >
                    <Settings size={17} />
                    Settings
                  </button>

                  <button
                    type="button"
                    className="logout-button"
                    onClick={() => {
                      setProfileOpen(false);
                        onLogout();
                      showToast("Logout action is ready for backend integration");
                    }}
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="welcome-banner">
          <img
            src={campusBanner}
            alt="Institute campus"
            className="welcome-banner-image"
          />

          <div className="welcome-banner-content">
            <p className="welcome-back">Welcome back, Dinesh Kumar!</p>

            <h1>
              Manage Your Institute
              <br />
              Smarter with <span>Artly</span>
              <strong>soft</strong><span>Talent</span>
              <strong>OS</strong>
            </h1>

            <p className="welcome-description">
              Track progress, manage operations and empower your institution.
            </p>
          </div>
        </section>

        <section className="statistics-grid">
          {statistics.map((stat) => (
            <button
              type="button"
              className={`stat-card ${stat.className}`}
              key={stat.title}
              onClick={() =>
                setActiveModal({
                  type: "statistic",
                  title: stat.title
                })
              }
            >
              <div className="stat-card-icon">
                <FilledDashboardIcon
                  name={stat.className}
                  size={38}
                />
              </div>

              <div className="stat-card-content">
                <p>{stat.title}</p>
                <strong>{stat.value}</strong>

                <div className="stat-change">
                  <TrendingUp size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>

              <div className="stat-mini-chart">
                <svg viewBox="0 0 120 70" aria-hidden="true">
                  <defs>
                    <linearGradient
                      id={`mini-chart-${stat.className}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d={`${stat.chartPath} L116 70 L4 70 Z`}
                    fill={`url(#mini-chart-${stat.className})`}
                  />

                  <path
                    d={stat.chartPath}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="116"
                    cy={stat.chartEndY}
                    r="4"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          ))}
        </section>

        <section className="dashboard-middle-grid">
          <article className="dashboard-card academic-overview-card">
            <div className="academic-header">
              <div className="academic-title">
                <FilledDashboardIcon name="bars" size={26} />
                <h2>Academic Overview</h2>
              </div>

              <div className="academic-tabs">
                <button
                  className={activePeriod === "month" ? "active" : ""}
                  type="button"
                  onClick={() => setActivePeriod("month")}
                >
                  This Month
                </button>

                <button
                  className={activePeriod === "threeMonths" ? "active" : ""}
                  type="button"
                  onClick={() => setActivePeriod("threeMonths")}
                >
                  Last 3 Months
                </button>

                <button
                  className={activePeriod === "year" ? "active" : ""}
                  type="button"
                  onClick={() => setActivePeriod("year")}
                >
                  This Year
                </button>
              </div>
            </div>

            <div className="academic-legend">
              <span className="students-legend">
                <i></i>
                Students
              </span>

              <span className="faculty-legend">
                <i></i>
                Faculty
              </span>
            </div>

            <div className="academic-chart">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -8, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="studentsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2f67f6"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor="#2f67f6"
                        stopOpacity={0.01}
                      />
                    </linearGradient>

                    <linearGradient
                      id="facultyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ffab22"
                        stopOpacity={0.13}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ffab22"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#e7edf8"
                    strokeDasharray="0"
                    vertical={true}
                  />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    tick={{
                      fontSize: 11,
                      fill: "#52658e"
                    }}
                  />

                  <YAxis
                    domain={[0, 1300]}
                    ticks={[0, 300, 600, 900, 1200]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: "#52658e"
                    }}
                    tickFormatter={(value) =>
                      value >= 1000 ? `${value / 1000}K` : value
                    }
                  />

                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5eaf4",
                      fontSize: "12px"
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="none"
                    fill="url(#studentsGradient)"
                  />

                  <Area
                    type="monotone"
                    dataKey="faculty"
                    stroke="none"
                    fill="url(#facultyGradient)"
                  />

                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#2f67f6"
                    strokeWidth={3}
                    style={{
                      filter: "drop-shadow(0 2px 3px rgba(47, 103, 246, 0.18))"
                    }}
                    dot={{
                      r: 4,
                      fill: "#2f67f6",
                      strokeWidth: 0
                    }}
                    activeDot={{ r: 5 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="faculty"
                    stroke="#ffab22"
                    strokeWidth={3}
                    style={{
                      filter: "drop-shadow(0 2px 3px rgba(255, 171, 34, 0.18))"
                    }}
                    dot={{
                      r: 4,
                      fill: "#ffab22",
                      strokeWidth: 0
                    }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="dashboard-card recent-activities-card">
            <div className="section-heading">
              <div className="section-heading-title">
                <FilledDashboardIcon name="activity" size={25} />
                <h2>Recent Activities</h2>
              </div>

              <button
                type="button"
                onClick={() => setActivitiesOpen(true)}
              >
                View All <ArrowRight size={17} />
              </button>
            </div>

            <div className="activities-list">
              {activities.map((activity) => (
                <button
                  className="activity-item"
                  type="button"
                  key={activity.title}
                  onClick={() =>
                    setActiveModal({
                      type: "activity",
                      title: activity.title,
                      description: activity.description
                    })
                  }
                >
                  <div className="activity-timeline">
                    <span></span>
                  </div>

                  <div className={`activity-icon ${activity.className}`}>
                    <FilledDashboardIcon
                      name={activity.solidIcon}
                      size={21}
                    />
                  </div>

                  <div className="activity-content">
                    <strong>{activity.title}</strong>
                    <p>{activity.description}</p>
                  </div>

                  <span className="activity-time">{activity.time}</span>
                </button>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-bottom-grid">
          <article className="dashboard-card institute-details-card">
            <div className="section-heading">
              <h2>Institute Details</h2>

              <button
                type="button"
                onClick={() => setInstituteOpen(true)}
              >
                View Profile <ArrowRight size={17} />
              </button>
            </div>

            <div className="institute-details-content">
              <img
                src={instituteCampus}
                alt="PMC College campus"
                className="institute-details-image"
              />

              <div className="institute-details-info">
                <div className="institute-name-row">
                  <h3>PMC College</h3>

                  <span className="verified-badge">
                    <Check size={11} />
                    Verified
                  </span>
                </div>

                <p>
                  <MapPin size={15} />
                  Hosur, Tamil Nadu
                </p>

                <p>
                  <Mail size={15} />
                  pmc@college.ac.in
                </p>

                <p>
                  <Phone size={15} />
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="institute-footer">
              <div>
                <span>Plan</span>
                <strong>TalentOS Per Student Monthly</strong>
              </div>

              <div>
                <span>Next Billing</span>
                <strong>15 Nov 2026</strong>
              </div>

              <div>
                <span>Students</span>
                <strong>3</strong>
              </div>
            </div>
          </article>

          <article className="dashboard-card quick-access-card">
            <div className="section-heading">
              <div className="section-heading-title">
                <FilledDashboardIcon name="activity" size={25} />
                <h2>Quick Access</h2>
              </div>
            </div>

            <div className="quick-access-grid">
              {quickAccessItems.map((item) => (
                <button
                  type="button"
                  className="quick-access-item"
                  key={item.label}
                  onClick={() =>
                    handleQuickAccess(item.action, item.label)
                  }
                >
                  <FilledDashboardIcon
                    name={item.action}
                    size={27}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="dashboard-card upcoming-events-card">
            <div className="section-heading">
              <div className="section-heading-title">
                <FilledDashboardIcon name="calendar" size={24} />
                <h2>Upcoming Events</h2>
              </div>

              <button
                type="button"
                onClick={() => setCalendarOpen(true)}
              >
                View Calendar <ArrowRight size={17} />
              </button>
            </div>

            <div className="events-list">
              {events.map((event) => (
                <button
                  className="event-item"
                  type="button"
                  key={event.title}
                  onClick={() =>
                    setActiveModal({
                      type: "event",
                      title: event.title,
                      description: event.description
                    })
                  }
                >
                  <div className="event-date">
                    <strong>{event.day}</strong>
                    <span>{event.month}</span>
                  </div>

                  <div className="event-content">
                    <strong>{event.title}</strong>
                    <p>{event.description}</p>
                  </div>

                  <div className="event-time">
                    <Clock3 size={16} />
                    <span>{event.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </article>
        </section>
      </main>

      {activitiesOpen && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal large-modal">
            <div className="modal-header">
              <div>
                <h2>All Activities</h2>
                <p>Latest activities across your institution</p>
              </div>

              <button
                type="button"
                onClick={() => setActivitiesOpen(false)}
                aria-label="Close activities"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-activities-list">
              {allActivities.map((activity) => (
                <button
                  type="button"
                  className="modal-activity-item"
                  key={`${activity.title}-${activity.time}`}
                  onClick={() => {
                    setActivitiesOpen(false);
                    setActiveModal({
                      type: "activity",
                      title: activity.title,
                      description: activity.description
                    });
                  }}
                >
                  <div className={`activity-icon ${activity.className}`}>
                    <FilledDashboardIcon
                      name={activity.solidIcon}
                      size={21}
                    />
                  </div>

                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.description}</p>
                  </div>

                  <span>{activity.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {calendarOpen && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal calendar-modal">
            <div className="modal-header">
              <div>
                <h2>November 2026</h2>
                <p>Upcoming institute events</p>
              </div>

              <button
                type="button"
                onClick={() => setCalendarOpen(false)}
                aria-label="Close calendar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="calendar-events">
              {events.map((event) => (
                <div className="calendar-event-card" key={event.title}>
                  <div className="calendar-event-date">
                    <Calendar size={20} />
                    <strong>
                      {event.day} {event.month}
                    </strong>
                  </div>

                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>

                  <span>{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {instituteOpen && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal institute-modal">
            <div className="modal-header">
              <div>
                <h2>PMC College</h2>
                <p>Institute profile details</p>
              </div>

              <button
                type="button"
                onClick={() => setInstituteOpen(false)}
                aria-label="Close institute profile"
              >
                <X size={20} />
              </button>
            </div>

            <div className="institute-profile-modal-content">
              <img src={instituteCampus} alt="PMC College campus" />

              <div>
                <h3>PMC College</h3>
                <p>
                  <MapPin size={17} />
                  Hosur, Tamil Nadu
                </p>
                <p>
                  <Mail size={17} />
                  pmc@college.ac.in
                </p>
                <p>
                  <Phone size={17} />
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="modal-institute-stats">
              <div>
                <span>Students</span>
                <strong>1,250</strong>
              </div>

              <div>
                <span>Faculty</span>
                <strong>120</strong>
              </div>

              <div>
                <span>Courses</span>
                <strong>48</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal action-modal">
            <button
              className="modal-close-button"
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="action-modal-icon">
              {activeModal.type === "addStudent" && (
                <UserPlus size={30} />
              )}

              {activeModal.type === "manageBatches" && (
                <Users size={30} />
              )}

              {activeModal.type === "viewReports" && (
                <BarChart3 size={30} />
              )}

              {activeModal.type === "createExam" && (
                <ClipboardList size={30} />
              )}

              {activeModal.type === "manageFees" && (
                <CircleDollarSign size={30} />
              )}

              {activeModal.type === "profile" && (
                <UserRound size={30} />
              )}

              {activeModal.type === "settings" && (
                <Settings size={30} />
              )}

              {activeModal.type === "statistic" && (
                <TrendingUp size={30} />
              )}

              {activeModal.type === "activity" && (
                <Zap size={30} />
              )}

              {activeModal.type === "event" && (
                <CalendarDays size={30} />
              )}

              {activeModal.type === "notifications" && (
                <Bell size={30} />
              )}

              {![
                "addStudent",
                "manageBatches",
                "viewReports",
                "createExam",
                "manageFees",
                "profile",
                "settings",
                "statistic",
                "activity",
                "event",
                "notifications"
              ].includes(activeModal.type) && <Eye size={30} />}
            </div>

            <h2>{activeModal.title}</h2>

            <p>
              {activeModal.description ||
                `The ${activeModal.title} frontend interface is ready. Backend integration can be connected later.`}
            </p>

            <button
              type="button"
              className="modal-primary-button"
              onClick={() => {
                setActiveModal(null);
                showToast(`${activeModal.title} opened successfully`);
              }}
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="dashboard-toast">
          <Check size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
