/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Trust-building blue - blue-600
        'primary-50': '#EFF6FF', // Lightest blue tint - blue-50
        'primary-100': '#DBEAFE', // Light blue tint - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Primary blue - blue-600
        'primary-700': '#1D4ED8', // Darker blue - blue-700
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate - slate-500
        'secondary-100': '#F1F5F9', // Light slate - slate-100
        'secondary-200': '#E2E8F0', // Border slate - slate-200
        'secondary-400': '#94A3B8', // Medium slate - slate-400
        'secondary-500': '#64748B', // Secondary slate - slate-500
        'secondary-600': '#475569', // Text secondary - slate-600
        'secondary-700': '#334155', // Dark slate - slate-700
        
        // Accent Colors
        'accent': '#3B82F6', // Interactive blue - blue-500
        'accent-hover': '#2563EB', // Accent hover state - blue-600
        
        // Background Colors
        'background': '#FFFFFF', // Pure white background - white
        'surface': '#F8FAFC', // Subtle gray surface - slate-50
        'surface-hover': '#F1F5F9', // Surface hover state - slate-100
        
        // Text Colors
        'text-primary': '#0F172A', // Near-black primary text - slate-900
        'text-secondary': '#475569', // Muted gray secondary text - slate-600
        'text-muted': '#64748B', // Muted text - slate-500
        
        // Status Colors
        'success': '#059669', // Professional green - emerald-600
        'success-light': '#D1FAE5', // Light success background - emerald-100
        'warning': '#D97706', // Amber warning - amber-600
        'warning-light': '#FEF3C7', // Light warning background - amber-100
        'error': '#DC2626', // Clear red error - red-600
        'error-light': '#FEE2E2', // Light error background - red-100
        
        // Border Colors
        'border': '#E2E8F0', // Minimal border - slate-200
        'border-light': '#F1F5F9', // Light border - slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], // Modern geometric sans-serif for headings
        'body': ['Source Sans Pro', 'sans-serif'], // Optimized for extended reading
        'caption': ['Inter', 'sans-serif'], // Consistent with headings for metadata
        'mono': ['JetBrains Mono', 'monospace'], // Monospace for code and technical data
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '240px', // Sidebar width
        '64': '64px', // Header height
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)', // Card elevation
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)', // Modal elevation
        'elevated': '0 10px 15px rgba(0, 0, 0, 0.1)', // Elevated elements
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      transitionDuration: {
        '150': '150ms', // Hover states
        '300': '300ms', // Content toggles
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100', // Sidebar navigation
        '200': '200', // Header navigation
        '300': '300', // Mobile overlay navigation
        '400': '400', // Dropdown menus
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-in': 'slideIn 300ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}