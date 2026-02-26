/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fb: {
          blue: '#1877f2',
          blueDark: '#166fe5',
          bg: '#f0f2f5',
          card: '#ffffff',
          text: '#050505',
          secondary: '#65676b',
          border: '#ced0d4',
          hover: '#e4e6eb',
          green: '#42b72a',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
