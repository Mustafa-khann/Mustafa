/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                'lab-bg': '#ffffff',
                'lab-bg-alt': '#fafafa',
                'lab-text': '#1a1a1a',
                'lab-muted': '#666666',
                'lab-border': '#e0e0e0',
            },
            fontFamily: {
                'sans': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
            },
            maxWidth: {
                'lab': '920px',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
        },
    },
    plugins: [],
}
