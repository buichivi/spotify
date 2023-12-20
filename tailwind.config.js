/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                'main-layout': 'calc(100vh - 8px * 3 - 66px)',
                playback: '66px',
                nav: '64px',
                'category-gap': '24px',
                'category-item': 'calc((100% - (24px * 4)) / 5)',
                genre: 'calc((100% - 12px * 4) / 5)',
                contentImgWidth: 'clamp(128px,128px + (100vw - 280px - 600px)/424*104,232px)',
                contentImgHeight: 'clamp(128px,128px + (100vw - 280px - 600px)/424*104,232px)'
            },
            boxShadow: {
                blur: '0 9px 6px 5px rgba(0, 0, 0, 0.5)',
                fade: '0px 8px 20px 0px rgb(0, 0, 0, 0.4)',
                'blur-xl': '0 4px 60px rgba(0,0,0,.5)',
            },
            colors: {},
            flex: {
                364: '0 1 364px',
            },
            animation: {
                slide: 'slideUpAndDown .5s cubic-bezier(0.9, -0.13, 0, 0.38) infinite alternate-reverse',
            },
            keyframes: {
                slideUpAndDown: {
                    '0%': { bottom: '-10%' },
                    '33%': { bottom: '-33%' },
                    '66%': { bottom: '-66%' },
                    '100%': { bottom: '-100%' },
                },
            },
        },
    },
    plugins: [],
};
