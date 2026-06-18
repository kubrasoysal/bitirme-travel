/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf9',
          100: '#c9f2ec',
          200: '#93e5da',
          300: '#5dd0c3',
          400: '#2fb8aa',
          500: '#149688',
          600: '#0d786e',
          700: '#0c6059',
          800: '#0c4d48',
          900: '#0b403c',
          950: '#042523'
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15, 23, 42, 0.08), 0 8px 48px -8px rgba(13, 120, 110, 0.06)',
        glow: '0 0 40px -8px rgba(20, 150, 136, 0.35)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
