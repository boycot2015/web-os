/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/stdf/**/*.svelte'],
    theme: {
        // 主题配置
        name: 'Rock Spray/松霜绿',
        color: {
            primary: {
                50: '255, 250, 245', // #FFFAF5 hsl(30, 100%, 98%)
                100: '255, 244, 232', // #FFF4E8 hsl(31, 100%, 96%)
                200: '241, 208, 179', // #F1D0B3 hsl(28, 69%, 82%)
                300: '227, 172, 130', // #E3AC82 hsl(26, 63%, 70%)
                400: '214, 137, 86', // #D68956 hsl(24, 61%, 59%)
                500: '200, 103, 47', // #C8672F hsl(22, 62%, 48%)
                default: '186, 69, 12', // #BA450C hsl(20, 88%, 39%)
                700: '159, 53, 8', // #9F3508 hsl(18, 90%, 33%)
                800: '131, 38, 4', // #832604 hsl(16, 94%, 27%)
                900: '104, 26, 2', // #681A02 hsl(14, 96%, 21%)
                950: '77, 15, 0', // #4D0F00 hsl(12, 100%, 15%)
            },
            dark: {
                50: '238, 255, 240', // #EEFFF0 hsl(127, 100%, 97%)
                100: '232, 255, 235', // #E8FFEB hsl(128, 100%, 96%)
                200: '210, 237, 214', // #D2EDD6 hsl(129, 43%, 88%)
                300: '189, 220, 195', // #BDDCC3 hsl(132, 31%, 80%)
                400: '169, 202, 176', // #A9CAB0 hsl(133, 24%, 73%)
                500: '149, 185, 158', // #95B99E hsl(135, 21%, 66%)
                default: '131, 167, 141', // #83A78D hsl(137, 17%, 58%)
                700: '85, 144, 104', // #559068 hsl(139, 26%, 45%)
                800: '48, 122, 74', // #307A4A hsl(141, 44%, 33%)
                900: '19, 99, 50', // #136332 hsl(143, 68%, 23%)
                950: '0, 77, 32', // #004D20 hsl(145, 100%, 15%)
            },
            primaryBlack: '25, 9, 1', // #190901 hsl(20, 95%, 5%)
            primaryWhite: '243, 242, 242', // #F3F2F2 hsl(20, 5%, 95%)
            darkBlack: '1, 25, 8', // #011908 hsl(137, 95%, 5%)
            darkWhite: '242, 243, 242', // #F2F3F2 hsl(137, 5%, 95%)
            functional: {
                success: '17, 187, 141', // #11bb8d hsl(164, 83%, 40%)
                warning: '185, 80, 0', // #b95000 hsl(26, 100%, 36%)
                error: '218, 20, 20', // #da1414 hsl(0, 83%, 47%)
                info: '46, 90, 172', // #2e5aac hsl(219, 58%, 43%)
            },
            extend: [
                {
                        color: '96, 110, 104', // #606E68 hsl(154, 7%, 40%)
                        alias: 'Corduroy',
                    },
                    {
                        color: '78, 102, 73', // #4E6649 hsl(110, 17%, 34%)
                        alias: 'Axolotl',
                    },
                    {
                        color: '153, 17, 153', // #991199 hsl(300, 80%, 33%)
                        alias: 'Violet Eggplant',
                    },
            ],
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        extend: {
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            fontFamily: {
                Trueno: 'Trueno',
            },
            animation: {
                shake: 'shake 200ms linear infinite',
            },
            keyframes: {
                shake: {
                    '0%': { transform: ' rotate(-1deg)' },
                    '25%': { transform: 'rotate(0deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                    '75%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-1deg)' }
                }
              }
        }
    },
    plugins: [],
    darkMode: 'class'
}

