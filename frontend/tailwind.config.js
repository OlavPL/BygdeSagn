/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
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
tulipTree = {
  '50': '#fcf9ea',
  '100': '#f9f3c8',
  '200': '#f4e494',
  '300': '#edcf57',
  '400': '#e8be38',
  '500': '#d6a21c',
  '600': '#b97e15',
  '700': '#945b14',
  '800': '#7b4818',
  '900': '#693c1a',
}
taupe= {
  '50': '#f6f6f0',
  '100': '#e5e7da',
  '200': '#cfd1b7',
  '300': '#b5b78d',
  '400': '#a2a26d',
  '500': '#93915f',
  '600': '#7e7950',
  '700': '#665e42',
  '800': '#57503c',
  '900': '#4d4637',
}
napa = {
'50': '#f7f6f5',
  '100': '#edebe7',
  '200': '#dad6ce',
  '300': '#c3bdae',
  '400': '#b3aa99',
  '500': '#998b76',
  '600': '#8c7d6a',
  '700': '#756759',
  '800': '#60554c',
  '900': '#4f463f',
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
      colors: {
        primary: muesli,
        secondary: colors.blue,
      },
    },
  variants:{
    extend:{

    }
  },
  },
  plugins: [require("@tailwindcss/line-clamp", '@headlessui/tailwindcss')],
}
