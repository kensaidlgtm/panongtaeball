import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      borderRadius: {
        'semi-md': '4px',
      },

      fontFamily: {
        sarabun: ['var(--font-sarabun)'],
      },
      colors: {
        primary: '#1BA7E1',
        success: '#19C788',
        warning: '#F5BF54',
        error: '#DE6B4F',
        secondary: '#6C6C6C',
        'field-gray': '#B5B5B5',
        'stroke-gray': '#E7E7E7',
        select: '#E7F4FC',
        'green-light': '#DFF1EB',
        'red-light': '#FCE6E1',
        'grey-light': '#F1F2F5',
        'warning-light': '#FFF4DE',
        'yellow-light': '#FFF4DE',
        stroke: '#EFF0F6',
        'order-closed': '#8C929E',
        'facebook-live': '#2669EA',
        disabled: '#C4C4C4',
        topic: '#F6F6F6',
        chat: '#E9E9F2',
        shopee: '#F8551F',
        lazada: '#0304B0',
        tiktok: '#212121',
        youtube: '#FF0000',
        line: '#06c755',
        'line-oa': '#00b900',
        'light-green': '#cdff8e',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s',
        fadeOut: 'fadeOut 0.3s',
      },
      screens: {
        xs: '375px',
        '2xs': '320px',
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      }),
    },
  },
  plugins: [],
  extend: {
    screens: {
      print: { raw: 'print' },
    },
  },
}
export default config
