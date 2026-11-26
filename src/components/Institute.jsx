import  { useState } from 'react';
import './Institute.css';
import campusBanner from '../assets/images/campus-banner.jpg';
import campusOverviewImg from '../assets/images/campus-overview.jpg';

export default function Institute() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeModal, setActiveModal] = useState(null);

  const tabs = [
    { id: 'Overview', label: 'Overview', icon: 'home' },
    { id: 'Academic Info', label: 'Academic Info', icon: 'academic' },
    { id: 'Contact Info', label: 'Contact Info', icon: 'phone' },
    { id: 'Facilities', label: 'Facilities', icon: 'facilities' },
    { id: 'About Us', label: 'About Us', icon: 'about' },
  ];

  const keyFeatures = [
    'AI-Powered Learning Management',
    'Industry-Focused Curriculum',
    'Experienced Faculty',
    'Modern Infrastructure',
    'Excellent Placement Support',
  ];

  const quickActions = [
    { id: 'students', label: 'Manage Students', icon: 'action-students', action: () => setActiveModal('Manage Students') },
    { id: 'faculty', label: 'Manage Faculty', icon: 'action-faculty', action: () => setActiveModal('Manage Faculty') },
    { id: 'reports', label: 'View Reports', sub: 'Update Institute Info', icon: 'action-reports', action: () => setActiveModal('Institute Reports & Info') },
  ];

  const renderIcon = (name, className = 'icon') => {
    switch (name) {
      case 'dashboard':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M9 22V12h6v10" />
          </svg>
        );
      case 'institute':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3 2 8h20L12 3z" />
          </svg>
        );
      case 'students':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 4 6l8 4 8-4-8-4Z" />
            <path d="M19 7.5v3.5" />
            <circle cx="12" cy="11.5" r="3.2" />
            <path d="M6 21v-1.5a5.5 5.5 0 0 1 11 0V21" />
          </svg>
        );
      case 'faculty':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="3.5" />
            <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
            <path d="M10.5 13.5h3l-.75 4.5h-1.5z" />
          </svg>
        );
      case 'courses':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="17" rx="3" />
            <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1Z" />
            <path d="M8 13.5c1.5 1.5 3 2.5 5 1.5s2.5-3 3-3" />
          </svg>
        );
      case 'batches':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="17" rx="2.5" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M7.5 14.5l2 2 4.5-4.5" />
          </svg>
        );
      case 'attendance':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="17" rx="2.5" />
            <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1Z" />
            <polyline points="8.5 13 11 15.5 16 10" />
          </svg>
        );
      case 'examinations':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="14" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
            <polyline points="9 9 10 9 11 9" />
          </svg>
        );
      case 'results':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="4" width="17" height="16" rx="2" />
            <line x1="7" y1="9" x2="17" y2="9" />
            <line x1="7" y1="13" x2="17" y2="13" />
            <line x1="7" y1="17" x2="13" y2="17" />
            <circle cx="10" cy="9" r="1.5" fill="currentColor" />
            <circle cx="14" cy="13" r="1.5" fill="currentColor" />
          </svg>
        );
      case 'notifications':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'logout':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3" />
            <path d="M16 5h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
            <line x1="12" y1="9" x2="12" y2="15" />
            <line x1="9" y1="12" x2="15" y2="12" />
          </svg>
        );
      case 'search':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case 'home':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5 L2 11h3v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9h3z" />
          </svg>
        );
      case 'academic':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="#2563eb">
            <path d="M12 3 1 9l11 6 9-4.91V17h2V9z" />
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17z" />
          </svg>
        );
      case 'facilities':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="#2563eb">
            <polygon points="12,3 2,8 22,8" />
            <rect x="3" y="8" width="18" height="2" />
            <rect x="4.5" y="10" width="2.5" height="9" />
            <rect x="9" y="10" width="2.5" height="9" />
            <rect x="12.5" y="10" width="2.5" height="9" />
            <rect x="17" y="10" width="2.5" height="9" />
            <rect x="2" y="19" width="20" height="2" />
          </svg>
        );
      case 'about':
        return (
          <svg className={className} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#2563eb" />
            <circle cx="12" cy="7.5" r="1.3" fill="#ffffff" />
            <rect x="10.5" y="10.5" width="3" height="7" rx="1" fill="#ffffff" />
          </svg>
        );
      case 'info-badge':
        return (
          <svg className={className} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#2563eb" />
            <circle cx="12" cy="7.5" r="1.3" fill="#ffffff" />
            <rect x="10.5" y="10.5" width="3" height="7" rx="1" fill="#ffffff" />
          </svg>
        );
      case 'key-star':
        return (
          <svg className={className} viewBox="0 0 576 512" fill="#2563eb">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L446 150.2 380.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
        );
      case 'achievements-chart':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="#2563eb">
            <rect x="2.5" y="13" width="4.5" height="8" rx="1.5" />
            <rect x="9.75" y="7.5" width="4.5" height="13.5" rx="1.5" />
            <rect x="17" y="2" width="4.5" height="19" rx="1.5" />
          </svg>
        );
      case 'action-students':
        return (
          <svg className={className} viewBox="0 0 640 512" fill="#2563eb">
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C116.8 288 64 339.2 64 403.2V432c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-28.8c0-64-52.8-115.2-115.2-115.2zm-223.7-13.4C153.5 263.1 137.6 256 120 256H56c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h66c6.2-47.4 34.8-87.3 75.1-109.4z" />
          </svg>
        );
      case 'action-faculty':
        return (
          <svg className={className} viewBox="0 0 640 512" fill="#2563eb">
            <path d="M592 128L320 0 48 128l272 128 208-97.9v109.8c-17.6 8.9-32 23.3-32 40.1 0 26.5 35.8 48 80 48s80-21.5 80-48c0-16.8-14.4-31.2-32-40.1V151.7l48-23.7zm-272 192L144 236.9v78.5C144 382.4 222.9 440 320 440s176-57.6 176-124.6V237l-64 30.1c-30.8 14.5-68.8 22.9-112 22.9zm0 0" />
          </svg>
        );
      case 'action-reports':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="#2563eb">
            <rect x="2" y="13" width="5" height="9" rx="1.5" />
            <rect x="9.5" y="7.5" width="5" height="14.5" rx="1.5" />
            <rect x="17" y="2" width="5" height="20" rx="1.5" />
          </svg>
        );
      case 'blue-users':
        return (
          <svg className={className} viewBox="0 0 640 512" fill="#2563eb">
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C116.8 288 64 339.2 64 403.2V432c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-28.8c0-64-52.8-115.2-115.2-115.2zm-223.7-13.4C153.5 263.1 137.6 256 120 256H56c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h66c6.2-47.4 34.8-87.3 75.1-109.4z" />
          </svg>
        );
      case 'gold-star':
        return (
          <svg className={className} viewBox="0 0 576 512" fill="#f59e0b">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L446 150.2 380.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
        );
      case 'stat-students':
        return (
          <svg className={className} viewBox="0 0 640 512" fill="#2563eb">
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C116.8 288 64 339.2 64 403.2V432c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-28.8c0-64-52.8-115.2-115.2-115.2zm-223.7-13.4C153.5 263.1 137.6 256 120 256H56c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h66c6.2-47.4 34.8-87.3 75.1-109.4z" />
          </svg>
        );
      case 'stat-faculty':
        return (
          <svg className={className} viewBox="0 0 640 512" fill="#9333ea">
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C116.8 288 64 339.2 64 403.2V432c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-28.8c0-64-52.8-115.2-115.2-115.2zm-223.7-13.4C153.5 263.1 137.6 256 120 256H56c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h66c6.2-47.4 34.8-87.3 75.1-109.4z" />
          </svg>
        );
      case 'stat-courses':
        return (
          <svg className={className} viewBox="0 0 576 512" fill="#f59e0b">
            <path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.26 7.85-7.26 13.21v320.78c0 10.74 10.36 18.33 20.46 14.65 65.68-23.86 150.31-33.15 219.04-35.53 18.25-.63 32.5-15.54 32.5-33.8V49.03c0-9.84-8.83-17.44-18.78-16.98zM264.74 87.64C197.5 46.48 88.58 35.16 33.78 32.05 23.83 31.59 15 39.19 15 49.03v335.72c0 18.26 14.25 33.17 32.5 33.8 68.73 2.38 153.36 11.67 219.04 35.53 10.1 3.68 20.46-3.91 20.46-14.65V100.85c0-5.36-2.62-10.37-7.26-13.21z" />
          </svg>
        );
      case 'stat-batches':
        return (
          <svg className={className} viewBox="0 0 448 512" fill="#16a34a">
            <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6zm-52.8-202.9l-133 133c-4.7 4.7-12.3 4.7-17 0l-63-63c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0l37.5 37.5 107.5-107.5c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      case 'institute-pill':
        return (
          <svg className={className} viewBox="0 0 512 512" fill="#2563eb">
            <path d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H64V192h32zm128 0v192h-32V192h32zm128 0v192h-32V192h32zm128 0v192h-32V192h32zM256 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" />
          </svg>
        );
      case 'shield-star':
        return (
          <svg className={className} viewBox="0 0 512 512">
            <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-37 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C381.5 463.7 496 326.5 496 128c0-19.4-11.7-36.9-29.5-44.3z" fill="#f59e0b" />
            <path d="M256 160l27.8 56.4 62.2 9-45 43.9 10.6 62-55.6-29.2-55.6 29.2 10.6-62-45-43.9 62.2-9L256 160z" fill="#ffffff" />
          </svg>
        );
      case 'users':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'grad-cap':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case 'chart':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case 'trophy':
        return (
          <svg className={className} viewBox="0 0 576 512" fill="#f59e0b">
            <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 66.5 44.1 122.8 104.6 140.9C131 328.7 172 361.9 220 376.6V416h-44c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h240c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24h-44v-39.4c48-14.7 89-47.9 115.4-91.7C531.9 266.8 576 210.5 576 144V88c0-13.3-10.7-24-24-24zM64 144v-48h64v80C89.7 176 64 150.3 64 144zm448 0c0 6.3-25.7 32-64 32v-80h64v48z" />
          </svg>
        );
      case 'star':
        return (
          <svg className={className} viewBox="0 0 576 512" fill="currentColor">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L446 150.2 380.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
        );
      case 'crown':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 19h20v2H2v-2zm1.2-14.8L8 11.2 12 4l4 7.2 4.8-7L22 17H2L3.2 4.2z" />
          </svg>
        );
      case 'zap':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        );
      case 'megaphone':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none">
            <g transform="rotate(-18 11 12)">
              <path
                d="M17 5.5L7 9.5H4C3.45 9.5 3 9.95 3 10.5V13.5C3 14.05 3.45 14.5 4 14.5H7L17 18.5C17.65 18.75 18.3 18.25 18.3 17.55V6.45C18.3 5.75 17.65 5.25 17 5.5Z"
                fill="#f59e0b"
              />
              <ellipse cx="18.3" cy="12" rx="1.2" ry="5.8" fill="#d97706" />
              <path
                d="M6.5 14.5L7.8 19.2C7.95 19.7 8.45 20 8.95 19.85L10 19.55C10.5 19.4 10.8 18.9 10.65 18.4L9.35 14.5H6.5Z"
                fill="#2563eb"
              />
              <circle cx="21.5" cy="9" r="1" fill="#3b82f6" />
              <circle cx="22" cy="14" r="0.8" fill="#3b82f6" />
            </g>
          </svg>
        );
      case 'map-pin':
        return (
          <svg className={className} viewBox="0 0 384 512" fill="#2563eb">
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className={className} viewBox="0 0 512 512" fill="#2563eb">
            <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
          </svg>
        );
      case 'contact-phone':
        return (
          <svg className={className} viewBox="0 0 512 512" fill="#2563eb">
            <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.1l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className={className} viewBox="0 0 496 512" fill="#2563eb">
            <path d="M336.5 160C322 70.7 287.3 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 49.2 152 88.5 152s74-62.7 88.5-152h-177zm158 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z" />
          </svg>
        );
      case 'check-badge':
        return (
          <svg className={className} viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#16a34a" />
            <path d="M385.8 177.8c7.8 7.8 7.8 20.5 0 28.3l-160 160c-7.8 7.8-20.5 7.8-28.3 0l-80-80c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l65.9 65.9 145.9-145.9c7.8-7.8 20.5-7.8 28.3 0z" fill="#ffffff" />
          </svg>
        );
      default:
        return null;
    }
  };
   
  return (
    <div className="institute">
    <div className="talent-layout">
      
      <main className="talent-content">
          
          <div className="breadcrumb-bar">
            <span>Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Institute</span>
          </div>

          <div className="institute-details-banner">
            <div className="banner-bg-wrap">
              <img src={campusBanner} alt="College Campus Architecture" className="banner-campus-img" />
              <div className="banner-gradient-fade" />
            </div>

            <div className="banner-content-layer">
              <div className="banner-temple-badge">
                <svg className="banner-temple-svg" viewBox="0 0 48 48" fill="#2563eb">
                  <polygon points="24,6 4,16 44,16" />
                  <rect x="5" y="17" width="38" height="3" />
                  <rect x="9" y="21" width="6" height="15" rx="0.5" />
                  <rect x="21" y="21" width="6" height="15" rx="0.5" />
                  <rect x="33" y="21" width="6" height="15" rx="0.5" />
                  <rect x="5" y="37" width="38" height="2.5" />
                  <rect x="3" y="40" width="42" height="3" rx="0.8" />
                </svg>
              </div>
              <div className="banner-title-group">
                <h1 className="banner-heading">Institute Details</h1>
                <p className="banner-subheading">View and manage your institute information</p>
              </div>
            </div>
          </div>

          <div className="institute-profile-stats-row">
            
            <div className="college-profile-identity">
              
              <div className="college-emblem-col">
                <div className="pmc-crest-wrap">
                  <svg className="pmc-crest-svg" viewBox="0 0 140 140">
                    
                    <path
                      d="M 38 100 C 22 80 22 45 42 30 C 36 42 36 65 48 85 C 50 88 44 94 38 100 Z"
                      fill="#f59e0b"
                    />
                    <path
                      d="M 28 85 C 18 68 20 45 35 34 C 28 45 30 65 40 78 Z"
                      fill="#d97706"
                    />
                    
                    <path
                      d="M 102 100 C 118 80 118 45 98 30 C 104 42 104 65 92 85 C 90 88 96 94 102 100 Z"
                      fill="#f59e0b"
                    />
                    <path
                      d="M 112 85 C 122 68 120 45 105 34 C 112 45 110 65 100 78 Z"
                      fill="#d97706"
                    />
                    
                    <polygon
                      points="70,18 73,26 82,26 75,31 77,39 70,34 63,39 65,31 58,26 67,26"
                      fill="#f59e0b"
                    />
                    
                    <g transform="translate(42, 38)">
                      <path
                        d="M 28 8 C 22 5 12 5 2 9 L 2 40 C 12 36 22 36 28 40 Z"
                        fill="#2563eb"
                      />
                      <path
                        d="M 28 8 C 34 5 44 5 54 9 L 54 40 C 44 36 34 36 28 40 Z"
                        fill="#1d4ed8"
                      />
                      <path
                        d="M 28 8 L 28 40"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <line x1="8" y1="18" x2="22" y2="18" stroke="#93c5fd" strokeWidth="1.8" />
                      <line x1="8" y1="24" x2="22" y2="24" stroke="#93c5fd" strokeWidth="1.8" />
                      <line x1="8" y1="30" x2="18" y2="30" stroke="#93c5fd" strokeWidth="1.8" />
                      <line x1="34" y1="18" x2="48" y2="18" stroke="#93c5fd" strokeWidth="1.8" />
                      <line x1="34" y1="24" x2="48" y2="24" stroke="#93c5fd" strokeWidth="1.8" />
                      <line x1="34" y1="30" x2="44" y2="30" stroke="#93c5fd" strokeWidth="1.8" />
                    </g>
                    
                    <text x="70" y="112" textAnchor="middle" fill="#1e3a8a" fontWeight="800" fontSize="16" letterSpacing="1">APEX</text>
                    <text x="70" y="128" textAnchor="middle" fill="#1e3a8a" fontWeight="700" fontSize="10" letterSpacing="2">INSTITUTE</text>
                  </svg>
                </div>
              </div>

              <div className="college-logo-divider" aria-hidden="true" />

              <div className="college-info-col">
                <div className="college-header-title-row">
                  <h2 className="college-name">Apex Institute of Technology</h2>
                  <span className="verified-check" title="Verified Institute">
                    {renderIcon('check-badge', 'verified-svg')}
                  </span>
                </div>
                <p className="college-quote">"Knowledge Beyond Boundaries"</p>

                <div className="college-contact-list">
                  <div className="contact-item">
                    <span className="contact-icon">{renderIcon('map-pin')}</span>
                    <span className="contact-val">Hosur, Tamil Nadu - 635109</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">{renderIcon('mail')}</span>
                    <a href="mailto:info@apexinstitute.edu.in" className="contact-val-link">info@apexinstitute.edu.in</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">{renderIcon('contact-phone')}</span>
                    <a href="tel:+919876543210" className="contact-val-link">+91 98765 43210</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">{renderIcon('globe')}</span>
                    <a href="https://www.apexinstitute.edu.in" target="_blank" rel="noreferrer" className="contact-val-link">www.apexinstitute.edu.in</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="metrics-grid-3x2">
              
              <div className="metric-card blue-pill card-type">
                <div className="metric-icon-circle blue-circle">
                  {renderIcon('institute-pill', 'stat-circle-svg')}
                </div>
                <div className="metric-content-col">
                  <span className="metric-title">Institute Type</span>
                  <span className="metric-number text-val">Autonomous</span>
                </div>
              </div>

              <div className="metric-card orange-pill card-accred">
                <div className="metric-icon-circle orange-circle">
                  {renderIcon('shield-star', 'stat-circle-svg')}
                </div>
                <div className="metric-content-col">
                  <span className="metric-title">Accreditation</span>
                  <span className="metric-number text-val">NAAC A+ Grade</span>
                </div>
              </div>

              <div className="metric-card white-card card-students">
                <div className="metric-icon-circle light-blue">
                  {renderIcon('stat-students', 'stat-circle-svg')}
                </div>
                <div className="metric-content-col">
                  <span className="metric-title">Total Students</span>
                  <span className="metric-number">4,850</span>
                  <span className="metric-trend green-trend">&uarr; +12%</span>
                </div>
              </div>

              <div className="metric-card white-card card-faculty">
                <div className="metric-icon-circle light-purple">
                  {renderIcon('stat-faculty', 'stat-circle-svg')}
                </div>
                <div className="metric-content-col">
                  <span className="metric-title">Total Faculty</span>
                  <span className="metric-number">180</span>
                  <span className="metric-trend green-trend">&uarr; +5%</span>
                </div>
              </div>

              <div className="metric-card white-card card-courses">
                <div className="metric-icon-circle light-orange">
                  {renderIcon('stat-courses', 'stat-circle-svg')}
                </div>
                <div className="metric-content-col">
                  <span className="metric-title">Total Courses</span>
                  <span className="metric-number">72</span>
                  <span className="metric-trend green-trend">&uarr; +2%</span>
                </div>
              </div>

              <div className="metric-card white-card card-batches">
                <div className="metric-icon-circle light-green">
                  {renderIcon('stat-batches', 'stat-circle-svg')}
                </div>
                <div className="metric-content-col">
                  <span className="metric-title">Academic Batches</span>
                  <span className="metric-number">12</span>
                  <span className="metric-trend green-trend">&uarr; +1%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-two-col-layout">
            
            <div className="overview-left-col">
              
              <div className="institute-tabs-bar">
                {tabs.map((tab) => {
                  const isTabActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      className={`tab-pill-btn ${isTabActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="tab-icon">{renderIcon(tab.icon, 'tab-svg')}</span>
                      <span className="tab-title">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {activeTab === 'Overview' && (
                <>
                  
                  <div className="overview-card">
                    <div className="card-top-title">
                      <span className="blue-info-icon">{renderIcon('info-badge')}</span>
                      <h3 className="section-card-title">Institute Overview</h3>
                    </div>
                    <div className="overview-content-row">
                      <p className="overview-description-text">
                        Apex Institute of Technology is a premier educational institution committed to excellence in education,
                        research and innovation. Our mission is to empower students with knowledge, skills
                        and values to build a better future.
                      </p>
                      <div className="overview-campus-thumb">
                        <img src={campusOverviewImg} alt="Apex Institute of Technology Campus" className="thumb-img" />
                      </div>
                    </div>
                  </div>

                  <div className="features-achievements-row">
                    
                    <div className="feature-card">
                      <div className="card-top-title">
                        <span className="blue-star-icon">{renderIcon('key-star')}</span>
                        <h3 className="section-card-title">Key Features</h3>
                      </div>
                      <ul className="key-features-list">
                        {keyFeatures.map((feat, idx) => (
                          <li key={idx} className="feature-list-item">
                            <span className="feature-check-icon">
                              <svg viewBox="0 0 512 512" fill="#2563eb" className="bullet-check-svg">
                                <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-261.7 109.3l181-181c4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0L233.6 307.7l-71.3-71.3c-4.7-4.7-12.3-4.7-17 0l-17 17c-4.7 4.7-4.7 12.3 0 17l96.7 96.6c4.7 4.7 12.3 4.7 17 0z" />
                              </svg>
                            </span>
                            <span className="feature-text">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="achievements-card">
                      <div className="card-top-title">
                        <span className="blue-chart-icon">{renderIcon('achievements-chart')}</span>
                        <h3 className="section-card-title">Our Achievements</h3>
                      </div>
                      <div className="achievements-metrics-wrap">
                        <div className="achievement-item">
                          <div className="achievement-icon-standalone trophy-color">
                            {renderIcon('trophy')}
                          </div>
                          <span className="achievement-val">98%</span>
                          <span className="achievement-label">Placement Rate</span>
                        </div>

                        <div className="achievement-item-divider" />

                        <div className="achievement-item">
                          <div className="achievement-icon-standalone star-color">
                            {renderIcon('gold-star')}
                          </div>
                          <span className="achievement-val">A+</span>
                          <span className="achievement-label">Accreditation</span>
                        </div>

                        <div className="achievement-item-divider" />

                        <div className="achievement-item">
                          <div className="achievement-icon-standalone users-color">
                            {renderIcon('blue-users')}
                          </div>
                          <span className="achievement-val">50+</span>
                          <span className="achievement-label">Industry Partners</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'Academic Info' && (
                <div className="tab-pane-content card-container">
                  <div className="card-top-title">
                    <span className="blue-info-icon">{renderIcon('academic')}</span>
                    <h3 className="section-card-title">Academic Departments & Curriculum</h3>
                  </div>
                  <p className="tab-pane-desc">
                    Apex Institute of Technology offers 14 undergraduate and 8 postgraduate departments affiliated with the state technical university.
                  </p>
                  <div className="departments-grid">
                    <div className="dept-card">
                      <h4>Computer Science & Engineering</h4>
                      <p>Intake: 180 Students | NBA Accredited</p>
                      <span className="dept-badge">B.E & M.E Programs</span>
                    </div>
                    <div className="dept-card">
                      <h4>Electronics & Communication</h4>
                      <p>Intake: 120 Students | Center of Excellence in IoT</p>
                      <span className="dept-badge">B.E Program</span>
                    </div>
                    <div className="dept-card">
                      <h4>Mechanical Engineering</h4>
                      <p>Intake: 120 Students | Robotics & CAD/CAM Labs</p>
                      <span className="dept-badge">B.E Program</span>
                    </div>
                    <div className="dept-card">
                      <h4>Management Studies (MBA)</h4>
                      <p>Intake: 60 Students | FinTech & Business Analytics</p>
                      <span className="dept-badge">PG Program</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Contact Info' && (
                <div className="tab-pane-content card-container">
                  <div className="card-top-title">
                    <span className="blue-info-icon">{renderIcon('phone')}</span>
                    <h3 className="section-card-title">Contact & Helpdesk Directory</h3>
                  </div>
                  <div className="contact-dir-grid">
                    <div className="dir-item">
                      <strong>Principal's Office:</strong>
                      <p>principal@apexinstitute.edu.in | Ext: 101</p>
                    </div>
                    <div className="dir-item">
                      <strong>Admissions Office:</strong>
                      <p>admissions@apexinstitute.edu.in | +91 98765 43211</p>
                    </div>
                    <div className="dir-item">
                      <strong>Examination Cell:</strong>
                      <p>coe@apexinstitute.edu.in | Ext: 105</p>
                    </div>
                    <div className="dir-item">
                      <strong>Training & Placement Cell:</strong>
                      <p>placements@apexinstitute.edu.in | +91 98765 43215</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Facilities' && (
                <div className="tab-pane-content card-container">
                  <div className="card-top-title">
                    <span className="blue-info-icon">{renderIcon('facilities')}</span>
                    <h3 className="section-card-title">Campus Infrastructure & Facilities</h3>
                  </div>
                  <div className="facilities-grid">
                    <div className="facility-item">
                      <span className="facility-dot"></span>
                      <div>
                        <strong>Central Digital Library</strong>
                        <p>Over 85,000 volumes, IEEE & ScienceDirect online subscriptions.</p>
                      </div>
                    </div>
                    <div className="facility-item">
                      <span className="facility-dot"></span>
                      <div>
                        <strong>High-Performance Computing Lab</strong>
                        <p>AI/ML workstation clusters equipped with NVIDIA GPUs.</p>
                      </div>
                    </div>
                    <div className="facility-item">
                      <span className="facility-dot"></span>
                      <div>
                        <strong>Indoor & Outdoor Sports Arena</strong>
                        <p>Basketball, cricket pavilion, gym, and Olympic badminton courts.</p>
                      </div>
                    </div>
                    <div className="facility-item">
                      <span className="facility-dot"></span>
                      <div>
                        <strong>Smart Auditoriums</strong>
                        <p>Acoustic 1,200-capacity auditorium for conferences and symposiums.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'About Us' && (
                <div className="tab-pane-content card-container">
                  <div className="card-top-title">
                    <span className="blue-info-icon">{renderIcon('about')}</span>
                    <h3 className="section-card-title">About Apex Institute of Technology</h3>
                  </div>
                  <p className="about-text">
                    Established with a vision to deliver world-class technical and management education, Apex Institute of Technology has grown into a prestigious institution recognized for its state-of-the-art infrastructure, scholarly faculty, and remarkable industry collaborations.
                  </p>
                  <div className="vision-mission-row">
                    <div className="vm-box">
                      <h4>Our Vision</h4>
                      <p>To cultivate ethical, innovative engineers and leaders equipped to solve tomorrow's complex challenges.</p>
                    </div>
                    <div className="vm-box">
                      <h4>Our Mission</h4>
                      <p>To provide experiential learning, foster cutting-edge research, and nurture entrepreneurial mindset in every student.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="overview-right-col">
              
              <div className="subscription-card">
                <div className="card-top-title-spread">
                  <div className="title-with-icon">
                    <span className="gold-crown-icon">{renderIcon('crown')}</span>
                    <h3 className="section-card-title">Institute Subscription</h3>
                  </div>
                  <span className="status-badge-active">Active</span>
                </div>

                <div className="subscription-details-table">
                  <div className="sub-detail-row">
                    <span className="sub-row-label">Plan</span>
                    <span className="sub-row-value plan-val">TalentOS Per Student Monthly</span>
                  </div>
                  <div className="sub-detail-row">
                    <span className="sub-row-label">Start Date</span>
                    <span className="sub-row-value">10 Oct 2026</span>
                  </div>
                  <div className="sub-detail-row">
                    <span className="sub-row-label">Next Billing</span>
                    <span className="sub-row-value">15 Nov 2026</span>
                  </div>
                  <div className="sub-detail-row">
                    <span className="sub-row-label">Amount</span>
                    <span className="sub-row-value amount-val">&#8377;150</span>
                  </div>
                </div>

                <button
                  className="view-billing-btn"
                  onClick={() => setActiveModal('TalentOS Subscription Billing Details')}
                >
                  <span className="btn-icon">{renderIcon('credit-card')}</span>
                  <span>View Billing Details &rarr;</span>
                </button>
              </div>

              <div className="quick-actions-card">
                <div className="card-top-title">
                  <span className="gold-zap-icon">{renderIcon('zap')}</span>
                  <h3 className="section-card-title">Quick Actions</h3>
                </div>

                <div className="quick-actions-grid">
                  {quickActions.map((qa) => (
                    <button key={qa.id} className="action-tile-btn" onClick={qa.action}>
                      <div className="action-tile-direct-icon">
                        {renderIcon(qa.icon, 'action-svg-icon')}
                      </div>
                      <span className="action-tile-label">{qa.label}</span>
                      {qa.sub && <span className="action-tile-sub">{qa.sub}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-notice-banner">
            <div className="notice-left-wrap">
              <div className="megaphone-icon-circle">
                {renderIcon('megaphone')}
              </div>
              <div className="notice-text-group">
                <h4 className="notice-title">Latest Updates</h4>
                <p className="notice-message">
                  PMC College will conduct Annual Cultural Fest on 25 Nov 2026. Stay tuned for more updates!
                </p>
              </div>
            </div>

            <button
              className="view-news-outline-btn"
              onClick={() => setActiveModal('Annual Cultural Fest & Campus News')}
            >
              View All News &rarr;
            </button>
          </div>
        </main>

      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{activeModal}</h3>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">
                Viewing details for <strong>{activeModal}</strong>.
              </p>
              <div className="modal-sample-data">
                <div className="sample-row">
                  <span>Institute:</span>
                  <strong>Apex Institute of Technology (Autonomous)</strong>
                </div>
                <div className="sample-row">
                  <span>Location:</span>
                  <strong>Hosur, Tamil Nadu</strong>
                </div>
                <div className="sample-row">
                  <span>Current Status:</span>
                  <span className="badge-green">Operational & Verified</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-action-btn" onClick={() => setActiveModal(null)}>Close Window</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
