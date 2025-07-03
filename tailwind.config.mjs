import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],


	theme: {
		extend: {

			fontFamily: {
				'serif': ['"Cormorant Garamond"', 'serif',],
				'sans': ['"Poppins"', 'sans-serif',],
				'display': ['"Darker Grotesque"', 'sans-serif'],

			},
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
				academia: {
					negro: "#1D1D1B",
					amarillo1: "#C6D300",
					amarillo2: "#DBDF5B",
					amarillo3: "#EDEEB2",
					amarillo4: "#F9F6E8",
					violeta1: "#5D4495",
					violeta2: "#7B63B0",
					violeta3: "#CBB2D7",
					violeta4: "#857993",
				}

			},
			screens: {
				'3xl': '1720px',

			},
			cursor: {
				'scroll': 'url(/resources/scroll-icon.svg), pointer',
			},
			boxShadow: {
				'academia-boton': '5px 5px 0px #857993'
			}


		},

	},
	plugins: [typography],
}
