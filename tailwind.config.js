import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{njk,md,html,js}"],

  plugins: [typography, daisyui],

  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
        serif: ['IBM Plex Serif', 'ui-serif', 'Georgia'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  
};