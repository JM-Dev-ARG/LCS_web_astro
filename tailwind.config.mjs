import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				lcsBlack: "#1d1e1c",
				lcsGreen1: "#254542",
				lcsGreen2: "#083f37",
				lcsGreen3: "#455e54",
				lcsOrange1: "#fef0e9",
				lcsOrange2: "#ea4d50",
				lcsOrange3: "#ed6f5f",
				lcsPink1: "#e69c99",
				lcsPink2: "#fcded0",
				lcsPink3: "#f2a9b1",

			},
			screens: {
				'3xl': '1720px',

			},
			cursor: {
				'scroll': 'url(/resources/scroll-icon.svg), pointer',
			}
		},

	},
	plugins: [typography],
}
