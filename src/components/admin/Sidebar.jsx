
import {
  House,
  UsersRound,
  ContactRound,
  ClipboardList,
  BriefcaseBusiness,
  CalendarCheck,
  BookOpenCheck,
  Award,
  Receipt,
  Bell,
  ChartNoAxesColumnIncreasing,
  Settings,
  ArrowRight,
  Landmark,
  X
} from "lucide-react";

import talentosCap from "../../assets/dashboard/talentos-cap.png";
import instituteCampus from "../../assets/dashboard/institute-campus.png";
import aiAssistant from "../../assets/dashboard/ai-assistant.png";

const navigationItems = [
  { label: "Dashboard", icon: House },
  { label: "Institute Details", icon: Landmark },
  { label: "Students", icon: UsersRound },
  { label: "Faculty", icon: ContactRound },
  { label: "Principals", icon: UsersRound },
  { label: "Courses", icon: ClipboardList },
  { label: "Batches", icon: BriefcaseBusiness },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Examinations", icon: BookOpenCheck },
  { label: "Results", icon: Award },
  { label: "Fees & Billing", icon: Receipt },
  { label: "Notifications", icon: Bell },
  { label: "Reports", icon: ChartNoAxesColumnIncreasing },
  { label: "Settings", icon: Settings }
];

function Sidebar({ isOpen, onClose, activePage = "Dashboard", onNavigate }) {
  return (
    <aside className={`admin-sidebar ${isOpen ? "is-open" : ""}`}>
      <button
        className="sidebar-close-button"
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      >
        <X size={19} />
      </button>

      <div className="sidebar-logo">
        <img src={talentosCap} alt="TalentOS" />

        <div className="sidebar-brand-text">
          <h2>
            Artly<span>soft</span>
          </h2>
          <h2>
            Talent<span>OS</span>
          </h2>
        </div>
      </div>

      <div className="sidebar-institute">
        <img
          className="sidebar-institute-image"
          src={instituteCampus}
          alt="PMC College campus"
        />
        <h3>PMC College</h3>
        <p>Hosur, Tamil Nadu</p>
        <div className="institute-status">
          <span></span>
          Active
        </div>
      </div>

      <nav className="sidebar-navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              href="#"
              key={item.label}
              className={`sidebar-link ${activePage === item.label ? "active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                onNavigate?.(item.label);
                onClose();
              }}
            >
              <Icon size={21} strokeWidth={2} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-ai-card">
        <div className="sidebar-ai-content">
          <h4>TalentOS AI</h4>
          <p>Your Smart Campus<br />Assistant</p>
          <button type="button">
            Try Now <ArrowRight size={14} />
          </button>
        </div>

        <img
          className="sidebar-ai-image"
          src={aiAssistant}
          alt="TalentOS AI assistant"
        />
      </div>

      <div className="sidebar-footer">
        <span>© 2026 TalentOS. All rights reserved.</span>
        <span>v2.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;