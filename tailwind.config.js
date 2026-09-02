/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdfb',
          100: '#d4f7f1',
          200: '#aeeee3',
          300: '#78e0d1',
          400: '#3fc7b7',
          500: '#1aab9d',
          600: '#0f766e', // primaire
          700: '#0e5f5a',
          800: '#104b48',
          900: '#123f3d'
        },
        flag: {
          green: '#007a33',
          red: '#ce1126',
          yellow: '#fcd116'
        },
        ink: {
          50: '#f6f7f8',
          100: '#eceef1',
          200: '#d5dae0',
          300: '#adb7c2',
          400: '#7f8b9a',
          500: '#5c6a7a',
          600: '#465262',
          700: '#394351',
          800: '#252b34',
          900: '#15181d'
        }
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)',
        floating: '0 8px 24px rgba(15, 23, 42, 0.12)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
