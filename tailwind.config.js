/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
                'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
            },
            maxWidth: {
                '5xl': '64rem',
            },
            colors: {
                accent: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
            },
            // One curve and three durations. Easing is read as personality, so
            // every moving thing on the site runs through the same one.
            transitionTimingFunction: {
                DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
                signature: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            transitionDuration: {
                DEFAULT: '120ms',
                state: '120ms',       // hover, focus, press
                transition: '240ms',  // something changing in place
                entrance: '420ms',    // something arriving
            },
            keyframes: {
                'breathe': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.75' },
                },
            },
            animation: {
                // Slow and shallow: one ambient element reads as a heartbeat,
                // anything faster reads as a fidget in peripheral vision.
                'breathe': 'breathe 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
