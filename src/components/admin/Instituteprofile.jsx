import { useEffect, useMemo, useRef, useState } from 'react';
import defaultBannerImg from "../../assets/institute-banner.jpg";
import './Instituteprofile.css';

const STORAGE_KEY = 'talentos_institute_profile_v1';

const COUNTRY_STATES = {
  India: [
    'Tamil Nadu',
    'Karnataka',
    'Maharashtra',
    'Delhi',
    'Telangana',
    'Kerala',
    'Gujarat',
    'West Bengal',
    'Uttar Pradesh',
    'Rajasthan',
  ],
  'United States': [
    'California',
    'New York',
    'Texas',
    'Massachusetts',
    'Washington',
    'Illinois',
  ],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  Canada: ['Ontario', 'British Columbia', 'Quebec', 'Alberta'],
  Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
};

const INSTITUTE_TYPES = [
  'Autonomous',
  'Affiliated College',
  'Deemed University',
  'Private University',
  'Government / Public',
  'Technical Institute',
];

const ACCREDITATIONS = [
  'NAAC A+ Grade',
  'NAAC A++ Grade',
  'NAAC A Grade',
  'NAAC B++ Grade',
  'NBA Accredited',
  'AICTE Approved',
  'UGC Recognized',
];

const DEFAULT_FACILITIES = [
  'Library',
  'Computer Lab',
  'Hostel',
  'Sports',
  'Wi-Fi Campus',
  'Research Center',
];




const DEFAULT_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200">
  <rect width="220" height="200" fill="#ffffff"/>
  <g transform="translate(110,82)">
    <polygon points="0,-54 2.5,-47 9.5,-47 4,-42.5 6,-35.5 0,-39.5 -6,-35.5 -4,-42.5 -9.5,-47 -2.5,-47" fill="#F59E0B"/>
    <polygon points="-18,-48 -16.2,-43 -11,-43 -15.2,-39.8 -13.6,-34.8 -18,-37.8 -22.4,-34.8 -20.8,-39.8 -25,-43 -19.8,-43" fill="#F59E0B"/>
    <polygon points="18,-48 19.8,-43 25,-43 20.8,-39.8 22.4,-34.8 18,-37.8 13.6,-34.8 15.2,-39.8 11,-43 16.2,-43" fill="#F59E0B"/>
    <path d="M-12,34 C-40,26 -54,-2 -44,-34 C-38,-24 -36,-14 -39,-4 C-42,6 -30,22 -12,28 Z" fill="#EAB308"/>
    <ellipse cx="-44" cy="-22" rx="7" ry="4" transform="rotate(-35 -44 -22)" fill="#F59E0B"/>
    <ellipse cx="-48" cy="-8" rx="7.5" ry="4" transform="rotate(-15 -48 -8)" fill="#F59E0B"/>
    <ellipse cx="-46" cy="7" rx="7.5" ry="4" transform="rotate(15 -46 7)" fill="#F59E0B"/>
    <ellipse cx="-38" cy="20" rx="7.5" ry="4" transform="rotate(35 -38 20)" fill="#F59E0B"/>
    <ellipse cx="-25" cy="30" rx="7.5" ry="4" transform="rotate(55 -25 30)" fill="#F59E0B"/>
    <path d="M12,34 C40,26 54,-2 44,-34 C38,-24 36,-14 39,-4 C42,6 30,22 12,28 Z" fill="#EAB308"/>
    <ellipse cx="44" cy="-22" rx="7" ry="4" transform="rotate(35 44 -22)" fill="#F59E0B"/>
    <ellipse cx="48" cy="-8" rx="7.5" ry="4" transform="rotate(15 48 -8)" fill="#F59E0B"/>
    <ellipse cx="46" cy="7" rx="7.5" ry="4" transform="rotate(-15 46 7)" fill="#F59E0B"/>
    <ellipse cx="38" cy="20" rx="7.5" ry="4" transform="rotate(-35 38 20)" fill="#F59E0B"/>
    <ellipse cx="25" cy="30" rx="7.5" ry="4" transform="rotate(-55 25 30)" fill="#F59E0B"/>
    <path d="M-28,-22 L28,-22 L28,6 C28,24 0,36 0,36 C0,36 -28,24 -28,6 Z" fill="#1D4ED8"/>
    <path d="M-24,-18 L24,-18 L24,5 C24,20 0,30 0,30 C0,30 -24,20 -24,5 Z" fill="#2563EB"/>
    <path d="M-18,-6 C-10,-10 -3,-8 0,-4 C3,-8 10,-10 18,-6 L18,14 C10,11 3,12 0,16 C-3,12 -10,11 -18,14 Z" fill="#FFFFFF"/>
    <line x1="0" y1="-4" x2="0" y2="16" stroke="#1D4ED8" stroke-width="2"/>
    <line x1="-14" y1="0" x2="-4" y2="0" stroke="#93C5FD" stroke-width="2"/>
    <line x1="-14" y1="5" x2="-4" y2="5" stroke="#93C5FD" stroke-width="2"/>
    <line x1="4" y1="0" x2="14" y2="0" stroke="#93C5FD" stroke-width="2"/>
    <line x1="4" y1="5" x2="14" y2="5" stroke="#93C5FD" stroke-width="2"/>
  </g>
  <text x="110" y="152" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="25" fill="#1E3A8A" letter-spacing="1.5">APEX</text>
  <text x="110" y="173" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="13.5" fill="#1D4ED8" letter-spacing="2.5">INSTITUTE</text>
</svg>
`)}`;

const INITIAL_FORM_DATA = {
  logoUrl: DEFAULT_LOGO_SVG,
  bannerUrl: defaultBannerImg,
  instituteName: 'Apex Institute of Technology',
  instituteCode: 'APEX001',
  instituteType: 'Autonomous',
  accreditation: 'NAAC A+ Grade',
  email: 'info@apextech.edu.in',
  phone: '+91 98765 43210',
  website: 'www.apextech.edu.in',
  addressLine1: 'No. 123, IT Park',
  addressLine2: 'Chennai - 600100',
  city: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  postalCode: '600100',
  principalName: 'Dr. Ramesh Kumar',
  designation: 'Principal',
  contactEmail: 'principal@apextech.edu.in',
  coursesOffered: 'B.Tech, M.Tech, MCA, MBA',
  totalStudents: '1250',
  facultyCount: '120',
  coursesCount: '45',
  batchesCount: '12',
  facilities: [...DEFAULT_FACILITIES],
  descriptionHtml:
    'Apex Institute of Technology is a premier educational institution committed to excellence in education, research and innovation.',
};

function Icon({ name, className = 'icon-svg' }) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.85',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  switch (name) {
    case 'cap':
      return (
        <svg {...props}>
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
          <path d="M22 10v6" />
        </svg>
      );
    case 'home':
      return (
        <svg {...props}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
        </svg>
      );
    case 'institute':
      return (
        <svg {...props}>
          <path d="M3 10l9-6 9 6" />
          <path d="M4 10h16" />
          <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
          <path d="M3 20h18" />
        </svg>
      );
    case 'courses':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'assignments':
      return (
        <svg {...props}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V2.5h6V4" />
          <path d="M9 10h6M9 14h6M9 18h4" />
        </svg>
      );
    case 'attendance':
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M8.5 12.2l2.5 2.5 5-5.2" />
        </svg>
      );
    case 'exams':
      return (
        <svg {...props}>
          <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h4" />
        </svg>
      );
    case 'resume':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          <path d="M3 13h18" />
        </svg>
      );
    case 'jobs':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
          <path d="M12 12v2" />
        </svg>
      );
    case 'ai':
      return (
        <svg {...props}>
          <path d="M12 3l1.8 4.6L18.5 9.5l-4.7 1.9L12 16l-1.8-4.6L5.5 9.5l4.7-1.9L12 3z" />
          <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...props}>
          <path d="M18 8a6 6 0 10-12 0c0 7-3 8.5-3 8.5h18s-3-1.5-3-8.5" />
          <path d="M10.3 20a2 2 0 003.4 0" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.77 1 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case 'image':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9" r="1.5" fill="currentColor" stroke="none" />
          <path d="M21 15l-5-5L5 20" />
        </svg>
      );
    case 'upload-cloud':
      return (
        <svg {...props}>
          <path d="M16 16l-4-4-4 4" />
          <path d="M12 12v9" />
          <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        </svg>
      );
    case 'shield-check':
      return (
        <svg {...props}>
          <path d="M12 3l7 3v5c0 4.8-3 8.8-7 10-4-1.2-7-5.2-7-10V6l7-3z" fill="currentColor" stroke="none" opacity="0.16" />
          <path d="M12 3l7 3v5c0 4.8-3 8.8-7 10-4-1.2-7-5.2-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...props}>
          <path d="M12 21s-6-5.7-6-11a6 6 0 1112 0c0 5.3-6 11-6 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case 'building':
      return (
        <svg {...props}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
        </svg>
      );
    case 'mailbox':
      return (
        <svg {...props}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 10h16M9 14h6" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...props}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L3 13V4h9l8.59 8.59a2 2 0 010 2.82z" />
          <circle cx="7.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 19c0-2.8 2.7-4.8 6-4.8s6 2 6 4.8" />
          <circle cx="16.5" cy="9" r="2.5" />
          <path d="M17 14.5c2.4.4 4 1.9 4 4.5" />
        </svg>
      );
    case 'save':
      return (
        <svg {...props}>
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <path d="M17 21v-8H7v8M7 3v5h8" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...props}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...props}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props} strokeWidth="2.6">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...props}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case 'stat-users':
      return (
        <svg className={className} viewBox="0 0 28 24" fill="currentColor" aria-hidden="true">
          <circle cx="14" cy="7.5" r="3.6" />
          <path d="M7.5 19.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5a1 1 0 01-1 1h-11a1 1 0 01-1-1z" />
          <circle cx="6.2" cy="9.2" r="2.6" opacity="0.92" />
          <path d="M2 19c0-2.4 1.9-4.1 4.5-4.3a7.2 7.2 0 00-1.3 4.8H2.8a.8.8 0 01-.8-.5z" opacity="0.92" />
          <circle cx="21.8" cy="9.2" r="2.6" opacity="0.92" />
          <path d="M26 19c0-2.4-1.9-4.1-4.5-4.3a7.2 7.2 0 011.3 4.8h2.4a.8.8 0 00.8-.5z" opacity="0.92" />
        </svg>
      );
    case 'stat-faculty':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="7.5" r="3.8" />
          <path d="M4.5 19.5c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6a1 1 0 01-1 1h-13a1 1 0 01-1-1z" />
        </svg>
      );
    case 'stat-book':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 5.5C3 4.7 3.7 4 4.5 4c2.8 0 5.3.8 6.9 2.2v13.5c-1.7-1.2-4.1-1.9-6.9-1.9-.8 0-1.5-.6-1.5-1.4V5.5z" />
          <path d="M21 5.5c0-.8-.7-1.5-1.5-1.5-2.8 0-5.3.8-6.9 2.2v13.5c1.7-1.2 4.1-1.9 6.9-1.9.8 0 1.5-.6 1.5-1.4V5.5z" />
          <rect x="14.5" y="7.5" width="4.2" height="1.3" rx="0.6" fill="#f2f6fe" />
          <rect x="14.5" y="10.4" width="4.2" height="1.3" rx="0.6" fill="#f2f6fe" />
          <rect x="14.5" y="13.3" width="3.2" height="1.3" rx="0.6" fill="#f2f6fe" />
        </svg>
      );
    default:
      return null;
  }
}

function CustomSelect({
  id,
  value,
  options,
  onChange,
  icon,
  iconClassName = '',
  hasError = false,
}) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        setOpenUpward(spaceBelow < 220 && spaceAbove > spaceBelow);
      }
      return next;
    });
  };

  const handleTriggerKeyDown = (event) => {
    const currentIndex = options.indexOf(value);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      } else if (options.length > 0) {
        const nextIndex = (currentIndex + 1) % options.length;
        onChange(options[nextIndex]);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      } else if (options.length > 0) {
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        onChange(options[prevIndex]);
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select ${open ? 'is-open' : ''} ${openUpward ? 'open-upward' : ''}`}
    >
      <div
        className={`input-wrap select-wrap ${!icon ? 'no-icon' : ''} ${hasError ? 'has-error' : ''} ${open ? 'is-focused' : ''}`}
      >
        {icon && <Icon name={icon} className={`input-icon ${iconClassName}`} />}
        <button
          id={id}
          type="button"
          className="custom-select-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={handleToggle}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className="custom-select-value">{value}</span>
        </button>
        <Icon name="chevron-down" className={`select-chevron ${open ? 'rotated' : ''}`} />
      </div>

      {open && (
        <ul className="custom-select-menu" role="listbox" aria-labelledby={id}>
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <span className="custom-select-option-label">{option}</span>
                  {isSelected && <Icon name="check" className="custom-select-check" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Institute({ onSaveSuccess }) {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          typeof parsed.bannerUrl === 'string' &&
          parsed.bannerUrl.startsWith('data:image/svg+xml')
        ) {
          parsed.bannerUrl = defaultBannerImg;
        }
        return { ...INITIAL_FORM_DATA, ...parsed };
      }
    } catch {
      return INITIAL_FORM_DATA;
    }
    return INITIAL_FORM_DATA;
  });

  const [errors, setErrors] = useState({});
  const [logoUploadError, setLogoUploadError] = useState('');
  const [editingStat, setEditingStat] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [newFacility, setNewFacility] = useState('');
  const [showAddFacility, setShowAddFacility] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const logoInputRef = useRef(null);
  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== formData.descriptionHtml) {
      editorRef.current.innerHTML = formData.descriptionHtml;
    }
  }, [formData.descriptionHtml]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const availableStates = useMemo(() => {
    return COUNTRY_STATES[formData.country] || ['Other'];
  }, [formData.country]);

  const parsedCourses = useMemo(() => {
    return formData.coursesOffered
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }, [formData.coursesOffered]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'country') {
        const nextStates = COUNTRY_STATES[value] || ['Other'];
        if (!nextStates.includes(prev.state)) {
          next.state = nextStates[0];
        }
      }
      return next;
    });
    setIsDirty(true);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxBytes = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setLogoUploadError('Only PNG and JPG images are supported.');
      return;
    }

    if (file.size > maxBytes) {
      setLogoUploadError('File size must be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoUploadError('');
      updateField('logoUrl', String(reader.result));
      showToast('Institute logo updated!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const formatStatValue = (value) => {
    const numeric = Number(value);
    if (!value || Number.isNaN(numeric)) return '0';
    return numeric.toLocaleString('en-US');
  };

  const instituteStats = [
    { key: 'totalStudents', label: 'Total Students', icon: 'stat-users' },
    { key: 'facultyCount', label: 'Faculty', icon: 'stat-faculty' },
    { key: 'coursesCount', label: 'Courses', icon: 'stat-book' },
    { key: 'batchesCount', label: 'Batches', icon: 'stat-users' },
  ];

  const handleToggleFacility = (facility) => {
    setFormData((prev) => {
      const exists = prev.facilities.includes(facility);
      const nextFacilities = exists
        ? prev.facilities.filter((item) => item !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities: nextFacilities };
    });
    setIsDirty(true);
  };

  const handleAddCustomFacility = (event) => {
    event.preventDefault();
    const cleaned = newFacility.trim();
    if (!cleaned) return;
    if (!formData.facilities.includes(cleaned)) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, cleaned],
      }));
      setIsDirty(true);
    }
    setNewFacility('');
    setShowAddFacility(false);
  };

  const allFacilityOptions = useMemo(() => {
    const combined = [...DEFAULT_FACILITIES];
    formData.facilities.forEach((f) => {
      if (!combined.includes(f)) combined.push(f);
    });
    return combined;
  }, [formData.facilities]);

  const applyFormat = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    if (editorRef.current) {
      updateField('descriptionHtml', editorRef.current.innerHTML);
    }
  };

  const handleInsertLink = () => {
    const url = window.prompt('Enter URL (e.g. https://apextech.edu.in):', 'https://');
    if (url && url.trim()) {
      applyFormat('createLink', url.trim());
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.instituteName.trim()) {
      nextErrors.instituteName = 'Institute name is required';
    }
    if (!formData.instituteCode.trim()) {
      nextErrors.instituteCode = 'Institute code is required';
    }
    if (!formData.instituteType.trim()) {
      nextErrors.instituteType = 'Institute type is required';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    }
    if (!formData.addressLine1.trim()) {
      nextErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!formData.city.trim()) {
      nextErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      nextErrors.state = 'State is required';
    }
    if (!formData.country.trim()) {
      nextErrors.country = 'Country is required';
    }
    if (!formData.postalCode.trim()) {
      nextErrors.postalCode = 'Postal code is required';
    }
    if (!formData.principalName.trim()) {
      nextErrors.principalName = 'Principal / Director name is required';
    }
    if (!formData.designation.trim()) {
      nextErrors.designation = 'Designation is required';
    }
    if (!formData.contactEmail.trim()) {
      nextErrors.contactEmail = 'Contact email is required';
    } else if (!emailRegex.test(formData.contactEmail.trim())) {
      nextErrors.contactEmail = 'Enter a valid contact email';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the highlighted required fields before saving.', 'error');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      let persisted = true;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch {
        persisted = false;
      }
      setIsSaving(false);
      setIsDirty(false);
      showToast(
        persisted
          ? 'Institute profile saved successfully!'
          : 'Profile updated for this session (storage limit reached).',
        persisted ? 'success' : 'info'
      );
      if (onSaveSuccess) onSaveSuccess();
    }, 350);
  };

  const handleBackOrReset = () => {
    if (isDirty) {
      const saved = localStorage.getItem(STORAGE_KEY);
      const restoreData = saved ? { ...INITIAL_FORM_DATA, ...JSON.parse(saved) } : INITIAL_FORM_DATA;
      setFormData(restoreData);
      setErrors({});
      setIsDirty(false);
      showToast('Reverted unsaved changes.', 'info');
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    } else {
      showToast('No previous page available.', 'info');
    }
  };

  return (
    <div className="profile">
        <main className="institute-page">
          <section className="institute-hero">
            <div
              className="hero-bg-photo"
              style={{ backgroundImage: `url("${formData.bannerUrl}")` }}
              aria-hidden="true"
            />
            <div className="hero-content">
              <div className="breadcrumb" aria-label="Breadcrumb">
                <span className="breadcrumb-link">
                  Dashboard
                </span>
                <span className="breadcrumb-sep">&gt;</span>
                <span className="breadcrumb-current">Institute Profile</span>
              </div>

              <div className="hero-title-row">
                <div className="hero-icon-box">
                  <Icon name="institute" className="hero-icon" />
                </div>
                <div>
                  <h1 className="hero-title">Institute Profile</h1>
                  <p className="hero-subtitle">
                    Manage your institute information and details
                  </p>
                </div>
              </div>
            </div>
          </section>

          <form className="institute-form" onSubmit={handleSave} noValidate>
            <section id="section-media" className="media-grid">
              <div className="panel-card media-card">
                <div className="section-heading">
                  <Icon name="image" className="section-icon" />
                  <h2>Institute Logo</h2>
                </div>

                <div className="media-split">
                  <div className="logo-preview-box">
                    <img
                      src={formData.logoUrl}
                      alt={`${formData.instituteName || 'Institute'} logo`}
                      className="logo-preview-img"
                    />
                  </div>

                  <div className="upload-dropzone">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden-file-input"
                      onChange={handleLogoUpload}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Icon name="upload-cloud" className="upload-btn-icon" />
                      <span>Choose Logo</span>
                    </button>
                    <span className="upload-hint">PNG, JPG (Max 2MB)</span>
                    {logoUploadError && (
                      <span className="field-error">{logoUploadError}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="panel-card stats-summary-card">
                <div className="stats-strip" aria-label="Institute overview statistics">
                  {instituteStats.map((stat) => {
                    const isEditing = editingStat === stat.key;
                    return (
                      <div
                        key={stat.key}
                        className="stat-cell"
                        onClick={() => setEditingStat(stat.key)}
                        title={`Click to edit ${stat.label}`}
                      >
                        <Icon name={stat.icon} className="stat-icon" />
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            autoFocus
                            className="stat-inline-input"
                            value={formData[stat.key]}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateField(stat.key, e.target.value)}
                            onBlur={() => setEditingStat(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === 'Escape') {
                                setEditingStat(null);
                              }
                            }}
                          />
                        ) : (
                          <div className="stat-value">
                            {formatStatValue(formData[stat.key])}
                          </div>
                        )}
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <div className="panel-card main-form-card">
              <section id="section-basic" className="form-section">
                <div className="grid-2">
                  <div className="field-group">
                    <label htmlFor="instituteName">
                      Institute Name <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.instituteName ? 'has-error' : ''}`}>
                      <Icon name="user" className="input-icon" />
                      <input
                        id="instituteName"
                        type="text"
                        value={formData.instituteName}
                        onChange={(e) => updateField('instituteName', e.target.value)}
                        placeholder="Enter institute name"
                      />
                    </div>
                    {errors.instituteName && (
                      <span className="field-error">{errors.instituteName}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="instituteCode">
                      Institute Code <span className="req">*</span>
                    </label>
                    <div className={`input-wrap no-icon ${errors.instituteCode ? 'has-error' : ''}`}>
                      <input
                        id="instituteCode"
                        type="text"
                        value={formData.instituteCode}
                        onChange={(e) =>
                          updateField('instituteCode', e.target.value.toUpperCase())
                        }
                        placeholder="e.g. APEX001"
                      />
                    </div>
                    {errors.instituteCode && (
                      <span className="field-error">{errors.instituteCode}</span>
                    )}
                  </div>
                </div>

                <div className="grid-2">
                  <div className="field-group">
                    <label htmlFor="instituteType">
                      Institute Type <span className="req">*</span>
                    </label>
                    <CustomSelect
                      id="instituteType"
                      value={formData.instituteType}
                      options={INSTITUTE_TYPES}
                      onChange={(val) => updateField('instituteType', val)}
                      icon="cap"
                      hasError={Boolean(errors.instituteType)}
                    />
                    {errors.instituteType && (
                      <span className="field-error">{errors.instituteType}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="accreditation">Accreditation</label>
                    <CustomSelect
                      id="accreditation"
                      value={formData.accreditation}
                      options={ACCREDITATIONS}
                      onChange={(val) => updateField('accreditation', val)}
                      icon="shield-check"
                      iconClassName="accent-blue"
                    />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="field-group">
                    <label htmlFor="email">
                      Email <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}>
                      <Icon name="mail" className="input-icon" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="info@institute.edu.in"
                      />
                    </div>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="field-group">
                    <label htmlFor="phone">
                      Phone Number <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.phone ? 'has-error' : ''}`}>
                      <Icon name="phone" className="input-icon" />
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>

                  <div className="field-group">
                    <label htmlFor="website">Website</label>
                    <div className="input-wrap">
                      <Icon name="globe" className="input-icon accent-blue" />
                      <input
                        id="website"
                        type="text"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        placeholder="www.institute.edu.in"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="section-divider" />
              <section id="section-address" className="form-section">
                <div className="section-heading">
                  <Icon name="pin" className="section-icon" />
                  <h2>Address</h2>
                </div>

                <div className="address-grid">
                  <div className="field-group">
                    <label htmlFor="addressLine1">
                      Address Line 1 <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.addressLine1 ? 'has-error' : ''}`}>
                      <Icon name="home" className="input-icon" />
                      <input
                        id="addressLine1"
                        type="text"
                        value={formData.addressLine1}
                        onChange={(e) => updateField('addressLine1', e.target.value)}
                        placeholder="Street / Building"
                      />
                    </div>
                    {errors.addressLine1 && (
                      <span className="field-error">{errors.addressLine1}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="addressLine2">Address Line 2</label>
                    <div className="input-wrap">
                      <Icon name="building" className="input-icon" />
                      <input
                        id="addressLine2"
                        type="text"
                        value={formData.addressLine2}
                        onChange={(e) => updateField('addressLine2', e.target.value)}
                        placeholder="Area / Landmark"
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="city">
                      City <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.city ? 'has-error' : ''}`}>
                      <Icon name="pin" className="input-icon accent-blue" />
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </div>

                  <div className="field-group">
                    <label htmlFor="state">
                      State <span className="req">*</span>
                    </label>
                    <CustomSelect
                      id="state"
                      value={formData.state}
                      options={availableStates}
                      onChange={(val) => updateField('state', val)}
                      hasError={Boolean(errors.state)}
                    />
                    {errors.state && <span className="field-error">{errors.state}</span>}
                  </div>

                  <div className="field-group">
                    <label htmlFor="country">
                      Country <span className="req">*</span>
                    </label>
                    <CustomSelect
                      id="country"
                      value={formData.country}
                      options={Object.keys(COUNTRY_STATES)}
                      onChange={(val) => updateField('country', val)}
                      hasError={Boolean(errors.country)}
                    />
                    {errors.country && <span className="field-error">{errors.country}</span>}
                  </div>

                  <div className="field-group">
                    <label htmlFor="postalCode">
                      Postal Code <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.postalCode ? 'has-error' : ''}`}>
                      <Icon name="mailbox" className="input-icon" />
                      <input
                        id="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => updateField('postalCode', e.target.value)}
                        placeholder="600100"
                      />
                    </div>
                    {errors.postalCode && (
                      <span className="field-error">{errors.postalCode}</span>
                    )}
                  </div>
                </div>
              </section>

              <div className="section-divider" />
              <section id="section-principal" className="form-section">
                <div className="section-heading">
                  <Icon name="user" className="section-icon" />
                  <h2>Principal / Director Details</h2>
                </div>

                <div className="grid-3">
                  <div className="field-group">
                    <label htmlFor="principalName">
                      Name <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.principalName ? 'has-error' : ''}`}>
                      <Icon name="user" className="input-icon" />
                      <input
                        id="principalName"
                        type="text"
                        value={formData.principalName}
                        onChange={(e) => updateField('principalName', e.target.value)}
                        placeholder="Dr. Ramesh Kumar"
                      />
                    </div>
                    {errors.principalName && (
                      <span className="field-error">{errors.principalName}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="designation">
                      Designation <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.designation ? 'has-error' : ''}`}>
                      <Icon name="jobs" className="input-icon" />
                      <input
                        id="designation"
                        type="text"
                        value={formData.designation}
                        onChange={(e) => updateField('designation', e.target.value)}
                        placeholder="Principal"
                      />
                    </div>
                    {errors.designation && (
                      <span className="field-error">{errors.designation}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label htmlFor="contactEmail">
                      Contact Email <span className="req">*</span>
                    </label>
                    <div className={`input-wrap ${errors.contactEmail ? 'has-error' : ''}`}>
                      <Icon name="mail" className="input-icon accent-blue" />
                      <input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => updateField('contactEmail', e.target.value)}
                        placeholder="principal@apextech.edu.in"
                      />
                    </div>
                    {errors.contactEmail && (
                      <span className="field-error">{errors.contactEmail}</span>
                    )}
                  </div>
                </div>
              </section>

              <div className="section-divider" />
              <div className="academic-facilities-split">
                <section id="section-academic" className="sub-card">
                  <div className="section-heading">
                    <Icon name="cap" className="section-icon" />
                    <h2>Academic Details</h2>
                  </div>

                  <div className="academic-row">
                    <div className="field-group flex-grow">
                      <label htmlFor="coursesOffered">Courses Offered</label>
                      <div className="input-wrap">
                        <Icon name="tag" className="input-icon" />
                        <input
                          id="coursesOffered"
                          type="text"
                          value={formData.coursesOffered}
                          onChange={(e) => updateField('coursesOffered', e.target.value)}
                          placeholder="B.Tech, M.Tech, MCA, MBA"
                        />
                      </div>
                      {parsedCourses.length > 0 && (
                        <div className="course-pills-preview" aria-label="Course count">
                          <span>{parsedCourses.length} programs listed</span>
                        </div>
                      )}
                    </div>

                    <div className="field-group students-field">
                      <label htmlFor="totalStudents">Total Students</label>
                      <div className="input-wrap">
                        <Icon name="users" className="input-icon accent-blue" />
                        <input
                          id="totalStudents"
                          type="number"
                          min="0"
                          value={formData.totalStudents}
                          onChange={(e) => updateField('totalStudents', e.target.value)}
                          placeholder="4850"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section id="section-facilities" className="sub-card">
                  <div className="facilities-header-row">
                    <div className="section-heading">
                      <Icon name="institute" className="section-icon" />
                      <h2>Facilities</h2>
                    </div>
                    <button
                      type="button"
                      className="add-facility-toggle"
                      onClick={() => setShowAddFacility((prev) => !prev)}
                    >
                      {showAddFacility ? 'Cancel' : '+ Add'}
                    </button>
                  </div>

                  {showAddFacility && (
                    <div className="add-facility-bar">
                      <input
                        type="text"
                        value={newFacility}
                        onChange={(e) => setNewFacility(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddCustomFacility(e);
                          }
                        }}
                        placeholder="Add custom facility (e.g. Auditorium)"
                      />
                      <button
                        type="button"
                        className="add-facility-confirm"
                        onClick={handleAddCustomFacility}
                      >
                        Add
                      </button>
                    </div>
                  )}

                  <div className="facilities-grid">
                    {allFacilityOptions.map((facility) => {
                      const checked = formData.facilities.includes(facility);
                      return (
                        <label key={facility} className="facility-checkbox">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleFacility(facility)}
                          />
                          <span className={`custom-check ${checked ? 'checked' : ''}`}>
                            {checked && <Icon name="check" className="check-svg" />}
                          </span>
                          <span className="facility-label">{facility}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              </div>

              <div className="section-divider" />
              <section id="section-about" className="form-section">
                <div className="section-heading">
                  <Icon name="exams" className="section-icon" />
                  <h2>About Institute / Description</h2>
                </div>

                <div className="rich-editor-box">
                  <div className="rich-toolbar" role="toolbar" aria-label="Text formatting">
                    <button
                      type="button"
                      className="toolbar-btn bold"
                      title="Bold"
                      onClick={() => applyFormat('bold')}
                    >
                      B
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn italic"
                      title="Italic"
                      onClick={() => applyFormat('italic')}
                    >
                      I
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn underline"
                      title="Underline"
                      onClick={() => applyFormat('underline')}
                    >
                      U
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      title="Increase Heading"
                      onClick={() => applyFormat('formatBlock', 'h3')}
                    >
                      +
                    </button>
                    <span className="toolbar-sep" />
                    <button
                      type="button"
                      className="toolbar-btn"
                      title="Bulleted List"
                      onClick={() => applyFormat('insertUnorderedList')}
                    >
                      ☰
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      title="Numbered List"
                      onClick={() => applyFormat('insertOrderedList')}
                    >
                      1.
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      title="Insert Link"
                      onClick={handleInsertLink}
                    >
                      🔗
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      title="Clear Formatting"
                      onClick={() => applyFormat('removeFormat')}
                    >
                      Tx
                    </button>
                  </div>

                  <div
                    ref={editorRef}
                    className="rich-editor-area"
                    contentEditable
                    suppressContentEditableWarning
                    aria-label="About Institute Description"
                    onInput={(e) =>
                      updateField('descriptionHtml', e.currentTarget.innerHTML)
                    }
                  />
                </div>
              </section>
            </div>
            <div className="form-footer-actions">
              <button
                type="button"
                className="btn-back"
                onClick={handleBackOrReset}
              >
                <Icon name="arrow-left" className="btn-icon" />
                <span>{isDirty ? 'Reset Changes' : 'Back'}</span>
              </button>

              <button
                type="submit"
                className="btn-save"
                disabled={isSaving}
              >
                <Icon name="save" className="btn-icon" />
                <span>{isSaving ? 'Saving...' : 'Save Institute'}</span>
              </button>
            </div>
          </form>
        </main>
      {toast && (
        <div className={`talentos-toast ${toast.type}`} role="status" aria-live="polite">
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
