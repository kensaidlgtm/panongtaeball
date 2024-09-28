import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        youtube: '#FF0000',
        'light-green': '#cdff8e',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sarabun: ['var(--font-sarabun)'],
      },
    },
  },
  plugins: [],
}
export default config
