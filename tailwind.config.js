/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/stdf/**/*.svelte'],
    theme: {
        // 主题配置
        name: 'Jade/Dolly',
        color: {
            primary: {
                50: '245, 255, 249', // #F5FFF9 hsl(144, 100%, 98%)
                100: '232, 255, 243', // #E8FFF3 hsl(149, 100%, 96%)
                200: '173, 238, 205', // #ADEECD hsl(150, 66%, 81%)
                300: '120, 220, 174', // #78DCAE hsl(152, 59%, 67%)
                400: '74, 203, 147', // #4ACB93 hsl(154, 55%, 54%)
                500: '34, 185, 125', // #22B97D hsl(156, 69%, 43%)
                default: '0, 168, 107', // #00A86B hsl(158, 100%, 33%)
                700: '0, 145, 97', // #009161 hsl(160, 100%, 28%)
                800: '0, 122, 86', // #007A56 hsl(162, 100%, 24%)
                900: '0, 99, 73', // #006349 hsl(164, 100%, 19%)
                950: '0, 77, 59', // #004D3B hsl(166, 100%, 15%)
            },
            dark: {
                50: '255, 254, 251', // #FFFEFB hsl(45, 100%, 99%)
                100: '255, 252, 232', // #FFFCE8 hsl(52, 100%, 96%)
                200: '255, 252, 213', // #FFFCD5 hsl(56, 100%, 92%)
                300: '255, 252, 195', // #FFFCC3 hsl(57, 100%, 88%)
                400: '255, 254, 176', // #FFFEB0 hsl(59, 100%, 85%)
                500: '253, 255, 158', // #FDFF9E hsl(61, 100%, 81%)
                default: '249, 255, 139', // #F9FF8B hsl(63, 100%, 77%)
                700: '200, 210, 86', // #C8D256 hsl(65, 58%, 58%)
                800: '152, 166, 45', // #98A62D hsl(67, 57%, 41%)
                900: '105, 121, 17', // #697911 hsl(69, 75%, 27%)
                950: '62, 77, 0', // #3E4D00 hsl(72, 100%, 15%)
            },
            primaryBlack: '1, 25, 16', // #011910 hsl(158, 95%, 5%)
            primaryWhite: '242, 243, 242', // #F2F3F2 hsl(158, 5%, 95%)
            darkBlack: '24, 25, 1', // #181901 hsl(63, 95%, 5%)
            darkWhite: '243, 243, 242', // #F3F3F2 hsl(63, 5%, 95%)
            functional: {
                success: '103, 194, 58', // #67c23a hsl(100, 54%, 49%)
                warning: '230, 162, 60', // #e6a23c hsl(36, 77%, 57%)
                error: '245, 108, 108', // #f56c6c hsl(0, 87%, 69%)
                info: '144, 147, 153', // #909399 hsl(220, 4%, 58%)
            },
            extend: [
                {
                    color: '176, 102, 8', // #B06608 hsl(34, 91%, 36%)
                    alias: 'Mai Tai',
                },
                {
                    color: '152, 61, 97', // #983D61 hsl(336, 43%, 42%)
                    alias: 'Vin Rouge',
                },
                {
                    color: '144, 0, 32', // #900020 hsl(347, 100%, 28%)
                    alias: 'Burgundy',
                },
            ],
            // 功能色
            success: 'rgba(var(--theme-color-functional-success), <alpha-value>)',
            warning: 'rgba(var(--theme-color-functional-warning), <alpha-value>)',
            error: 'rgba(var(--theme-color-functional-error), <alpha-value>)',
            info: 'rgba(var(--theme-color-functional-info), <alpha-value>)',

            // 扩展色
            extend0: 'rgba(var(--theme-color-extend0), <alpha-value>)',
            extend1: 'rgba(var(--theme-color-extend1), <alpha-value>)',
            extend2: 'rgba(var(--theme-color-extend2), <alpha-value>)',
            // 中性色
            black: '#000000',
            white: '#ffffff',
            gray: {
                50: '#f2f2f2',
                100: '#e6e6e6',
                200: '#cccccc',
                300: '#b3b3b3',
                400: '#999999',
                500: '#808080',
                600: '#666666',
                700: '#4D4D4D',
                800: '#333333',
                900: '#1A1A1A',
                950: '#0D0D0D',
            },
            transparent: 'transparent',
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1300px',
            '2xl': '1920px',
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

