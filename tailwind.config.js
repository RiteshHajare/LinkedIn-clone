/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bermuda': '#78dcca',
        'signuppagecolor':'#f3f2ef',
        'placeholder':'rgba(0,0,0,0.6)',
        'basecolor':"#0077B5",
        'linkedincolor2':'#2977c9',
        'errColor':'#d11124',
        'inputcolor':'#eef3f8',
        'basegrey':"rgba(0,0,0,0.6)",
        'hovergrey':"rgba(225, 224, 224, 0.6)",
        'hoverblue':"#d0e8ff",
      },
      width:{
        'width70':'70%',
        'width98':'98%',
        'width95':"95%",
        'width28':"28%",
        '18.7':"18.7rem"
      },
      boxShadow:{
        'signinCard':"0 4px 12px rgb(0 0 0 / 15%)",
      },
      outlineWidth:{
        "1.5":"1.5px"
      }
    },
  },
  plugins: [],
}
