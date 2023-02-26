/** @type {import('tailwindcss').Config} */
const { gray } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

const brandy = {
  '50': '#fbf6f1',
  '100': '#f5e9df',
  '200': '#ead0be',
  '300': '#ddaf94',
  '400': '#ce8869',
  '500': '#c46c4b',
  '600': '#b65740',
  '700': '#974537',
  '800': '#7a3a32',
  '900': '#63312b',
}
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

const plantation = {
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
}

const linen = {
  '50': '#fdf8f5',
  '100': '#fbede5',
  '200': '#f8dfd0',
  '300': '#f2c8af',
  '400': '#e9a780',
  '500': '#dc8957',
  '600': '#c86f3a',
  '700': '#a85b2d',
  '800': '#8b4e29',
  '900': '#744428',
}

const masala = {
  '50': '#f7f6f6',
  '100': '#e6e2e1',
  '200': '#ccc5c3',
  '300': '#aba19d',
  '400': '#897e78',
  '500': '#6e635e',
  '600': '#574f4a',
  '700': '#4f4844',
  '800': '#3b3734',
  '900': '#33302e',
}



const muesli = {
  '50': '#f7f4ef',
  '100': '#eae4d7',
  '200': '#d7c9b1',
  '300': '#bfa885',
  '400': '#aa895e',
  '500': '#9d7b55',
  '600': '#876347',
  '700': '#6d4d3b',
  '800': '#5d4236',
  '900': '#513a32',
}
vTangerine= {
  '50': '#fff1f1',
  '100': '#ffe1e1',
  '200': '#ffc7c7',
  '300': '#ffa0a0',
  '400': '#ff8080',
  '500': '#f83b3b',
  '600': '#e51d1d',
  '700': '#c11414',
  '800': '#a01414',
  '900': '#841818',
}
eggBlue= {
  '50': '#eefffb',
  '100': '#c6fff4',
  '200': '#8effeb',
  '300': '#4dfbe0',
  '400': '#19e8ce',
  '500': '#00e2c9',
  '600': '#00a496',
  '700': '#028379',
  '800': '#086761',
  '900': '#0c5550',
}
persianGreen= {
  '50': '#effefa',
  '100': '#c7fff2',
  '200': '#90ffe5',
  '300': '#51f7d7',
  '400': '#1de4c4',
  '500': '#04c8ab',
  '600': '#00a893',
  '700': '#058072',
  '800': '#0a655c',
  '900': '#0d544c',
}


module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      width:{
        'rounded-bar':'99%'
      },
      colors: {
        primary: brandy,
        secondary: plantation,
        textColor: gray[800],
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
        }
      },
    },
  variants:{
    extend:{

    }
  },
  },
  plugins: [require("@tailwindcss/line-clamp", '@headlessui/tailwindcss')],
}
