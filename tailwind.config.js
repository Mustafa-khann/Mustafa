/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: '#FFFFFF',
                    secondary: '#F9F9F9',
                    surface: '#F8F8F8',
                },
                text: {
                    heading: '#171717',
                    body: '#262626',
                    muted: '#737373',
                    accent: '#000000',
                },
                border: {
                    subtle: '#F5F5F5',
                    standard: '#E5E5E5',
                    active: '#A3A3A3',
                }
            },
            fontFamily: {
                'sans': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
                'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
            },
            maxWidth: {
                'lab': '64rem', // 1024px
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            letterSpacing: {
                'tightest': '-0.025em',
                'widest': '0.05em',
            }
        },
    },
    plugins: [],
}
