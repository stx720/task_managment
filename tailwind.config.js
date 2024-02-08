/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'custom': ["'Sixtyfour'", 'sans-serif']
      },
      animation:{
        'shake': 'shake 2.5s both infinite',
          'fade': 'fadeIn .9s ease-in-out',
        
    },
    keyframes: {
        'shake' : {
          '0%, 100%': {
            transform: 'translateX(0)',
        },
        '50%': {
            transform: 'translateX(6px)',
        }
        
        },
        'fadeIn': {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
},
    },
  },
  plugins: [],
};
