/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dark theme base colors - layered for depth
                dark: {
                    950: '#0f1115',
                    900: '#141821',
                    850: '#1b2130',
                    800: '#1f2937',
                    700: '#374151',
                    600: '#4b5563',
                    500: '#6b7280',
                },
                // Accent colors - Amity gold/yellow branding
                accent: {
                    gold: '#fbbf24',
                    'gold-dark': '#f59e0b',
                    blue: '#3b82f6',
                    'blue-dark': '#2563eb',
                },
                // Text colors for dark theme
                text: {
                    primary: '#f9fafb',
                    secondary: '#d1d5db',
                    muted: '#9ca3af',
                },
                // Status colors with glow-friendly shades
                success: {
                    DEFAULT: '#10b981',
                    glow: 'rgba(16, 185, 129, 0.2)',
                },
                warning: {
                    DEFAULT: '#f59e0b',
                    glow: 'rgba(245, 158, 11, 0.2)',
                },
                danger: {
                    DEFAULT: '#ef4444',
                    glow: 'rgba(239, 68, 68, 0.2)',
                },
                // Legacy primary colors (kept for compatibility)
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
                heading: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                'gradient-dark': 'linear-gradient(135deg, #1b2130 0%, #0f1115 100%)',
            },
            boxShadow: {
                'glow-gold': '0 0 20px rgba(251, 191, 36, 0.3)',
                'glow-gold-lg': '0 0 30px rgba(251, 191, 36, 0.4)',
                'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
                'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
                'glow-danger': '0 0 20px rgba(239, 68, 68, 0.3)',
                'elevation-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
                'elevation-md': '0 4px 16px rgba(0, 0, 0, 0.5)',
                'elevation-lg': '0 8px 24px rgba(0, 0, 0, 0.6)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-in-out',
                'slide-up': 'slideUp 0.25s ease-out',
                'slide-down': 'slideDown 0.25s ease-out',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            transitionDuration: {
                '250': '250ms',
            },
        },
    },
    plugins: [],
}
