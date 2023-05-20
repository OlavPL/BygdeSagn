/** @type {import('tailwindcss').Config} */
const { gray, blue } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

doubleSpanishWhite = {
  '50': '#faf5f2',
  '100': '#f4e8e0',
  '200': '#e8cebf',
  '300': '#daae97',
  '400': '#ca876d',
  '500': '#be6b51',
  '600': '#b15845',
  '700': '#93463b',
  '800': '#773b35',
  '900': '#61312d',
}

aquaIsland = {
  '50': '#f1faf9',
  '100': '#dbf2f0',
  '200': '#bce5e1',
  '300': '#9fd9d5',
  '400': '#58b8b3',
  '500': '#3d9d99',
  '600': '#358485',
  '700': '#316b6d',
  '800': '#2f595b',
  '900': '#2a4c4f',
},
coral = {
  '50': '#fff4ed',
  '100': '#ffe6d4',
  '200': '#ffc9a8',
  '300': '#ffa471',
  '400': '#ff8552',
  '500': '#fe4d11',
  '600': '#ef3307',
  '700': '#c62108',
  '800': '#9d1d0f',
  '900': '#7e1b10',
},
mintGreen = {
  '50': '#78dd93',
  '100': '#82e3a4',
  '200': '#6be196',
  '300': '#5add8c',
  '400': '#32c870',
  '500': '#23a45b',
  '600': '#15934e',
  '700': '#157f46',
  '800': '#177245',
  '900': '#186d44',
  '950': '#055c36',
},




module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '33%': {
            transform: 'translate3d(-1%, -1%, 0)',
          },          
          '66%': {
            transform: 'translate3d(-1%, 1%, 0)',
          },
        },
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
      },

      backgroundImage:{
        'waves':"url(https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0)",
        'oldScroll':"url(https://www.poewiki.net/w/images/9/98/Bg.jpg)",
        'coralGrain':`/frontend/resources/coralGrain64.jpg`,
      },

      width:{
        'rounded-bar':'99%'
      },
      colors: {
        primary: aquaIsland,
        secondary: mintGreen,
        emphasis: coral,
        link: blue[600],
        textColor: gray[800],
        textLink: blue[500],
        white: '#FFFDFA',
        plantation : {
          '50': '#f1f8f5',
          '100': '#dcefe5',
          '200': '#bbdfce',
          '300': '#8ec7b0',
          '400': '#5ea98e',
          '500': '#3d8c72',
          '600': '#2c6f5a',
          '700': '#266150',
          '800': '#1e473c',
          '900': '#193b32',
        },
        tallPoppy : {
          '50': '#fdf4f3',
          '100': '#fce6e4',
          '200': '#fad2ce',
          '300': '#f5b3ac',
          '400': '#ee867b',
          '500': '#e25f51',
          '600': '#ce4334',
          '700': '#ac3528',
          '800': '#8f2f25',
          '900': '#772d25',
        },
        eggBlue : {
          '50': '#f6f7f9',
          '100': '#ebeef3',
          '200': '#d3dae4',
          '300': '#adbbcc',
          '400': '#8096b0',
          '500': '#607997',
          '600': '#4c607d',
          '700': '#3e4e66',
          '800': '#3b495d',
          '900': '#313a49',
        },

      
      },
    },
  variants:{
    extend:{

    }
  },
  },
  plugins: [require("@tailwindcss/line-clamp", '@headlessui/tailwindcss')],
}
