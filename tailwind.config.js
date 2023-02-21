module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  theme: {
    fontFamily: {
      lemonada: ['Lemonada', 'cursive']
    },
    extend: {
      backgroundColor: {
        'overlay-70': 'rgba(0,0,0,0.7)',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-80': 'rgba(0,0,0,0.8)',
        'primary': '#1B4B66',
        'primary-tint': '#639599',
        'darkGrey': '#626262',
        'darkGrey-tint': '#B6B6B6',
        'lightGrey': '#f1f1f1',
        'lightGrey2': '#7e7e7e',
        'yellow': '#FF8C4B',
        'black': '#171520',
        'red': '#B00020',
      },
      colors: {
        'primary': '#1B4B66',
        'highlight': '#E21D1D',
        'darkGrey': '#626262',
        "darkGrey-tint": '#B6B6B6',
        'lightGrey': '#f1f1f1',
        'lightGrey2': '#7e7e7e',
        'yellow': '#FF8C4B',
        'black': '#171520',
        'red': '#B00020',

      },
      flex: {
        '5': '5 5 0%'
      },
      width: {
        '256': '256px',
        'r256': 'calc(100% - 256px)'
      },
      dropShadow: {
        'white': '--tw-drop-shadow: drop-shadow(0 4px 3px rgb(255 255 255 / 0.07)) drop-shadow(0 2px 2px rgb(255 255 255 / 0.06))'
      },
      animation: {
        'modalShow': 'modalShow .3s linear ',
        'modalClose': 'modalShow .3s linear ',
        'slide-right': 'slide-right 0.3s ease-out both;',
        'slide-left': 'slide-left 0.3s ease-out both;',
        'top-popup': 'top-popup 2s ease-in-out both;',
        'top-popup2': 'top-popup2 2s ease-in-out both;',
        'show-noti-left': 'show-noti-left 5s ease-out both;',
        'bounce2': 'bounce2 .5s',
        bounce: 'bounce-mes 1.2s ease-in-out infinite',
        'bounce-2': 'bounce-mes 1.2s ease-in-out 0.6s infinite',
        'chatbot':'chatbot .3s ease-in-out'
      },
      keyframes: {
        bounce2: {
          '0%': {
            transform: 'translateY(0%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            'transform': 'translateY(25%)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            transform: 'translateY(0%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
        }
        ,
        modalShow: {
          '0%': { transform: 'translateX(-100px)', },
          '100%': { transform: 'translateX(0%)' }
        },
        modalClose: {
          '0%': { transform: 'translateX(0)', },
          '100%': { transform: 'translateX(-100px)', }
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            ' -webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(1000px);',
            transform: 'translateX(1000px);'
          },
          '100%': {
            ' -webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'top-popup': {
          '0%': {
            'transform': 'translate(0 , -70px)',
          },
          '30%': {
            'transform': 'translate(0 , 15px)',
          },
          '50%': {
            'transform': 'translate(0 , 15px)',
          },
          '60%': {
            'transform': 'translate(0 , 20px)',
          },
          '100%': {
            'transform': 'translateY(0 , -70px)',
          }

        },
        'top-popup2': {
          '0%': {
            'transform': 'translate(35% , -70px)',
          },

          '30%': {
            'transform': 'translate(35% , 15px)',
          },
          '50%': {
            'transform': 'translate(35% , 15px)',
          },
          '60%': {
            'transform': 'translate(35% , 20px)',
          },
          '100%': {
            'transform': 'translateY(35% , -70px)',
          }

        },
        'show-noti-left': {
          '0%': {
            'transform': 'translateX(0)',
            'opacity': 0
          },
          '10%': {
            'transform': 'translateX(-140px)',
            'opacity': 0.4
          },
          '20%': {
            'transform': 'translateX(-150px)',
            'opacity': 1
          },
          '90%': {
            'transform': 'translateX(-150px)',
            'opacity': 1
          },
          '100%': {
            'transform': 'translateX(0)',
            'opacity': 0
          }
        },
        'bounce-mes': {
          '0%': {
            transform: 'rotate(0) scale(.5);',
            opacity: .1
          },
          '30%': {
            transform: 'rotate(0) scale(.7);',
            opacity: .5,
          },
          '100%': {
            transform: 'rotate(0) scale(1);',
            opacity: .1
          }
        },
        'chatbot':{
          '0%':{
            left:'80%',
            top:'50%',
          },
          '100%':{
            top:'0',
            left:'0',
          }
        }
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'ruda': ['Ruda', 'sans-serif'],
        'tactitle': ['Syne Tactile', 'cursive'],
        'qwitcher': ['Qwitcher Grypen', 'cursive']
      },
      zIndex: {
        '60': 60,
        '70': 70,
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  mode: 'jit'
}