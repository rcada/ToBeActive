import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['4.png'],
			manifest: {
				short_name: 'ToBeActive',
				name: 'ToBeActive',
				description:
					'Website developed as an assignment in React development course.',
				icons: [
					{
						src: '/4.png',
						type: 'image/svg+xml',
						sizes: '48x48 192x192 512x512'
					},
					{
						src: '/4.png',
						type: 'image/png',
						sizes: '700x700'
					},
					{
						src: '/4.png',
						type: 'image/png',
						sizes: '700x700',
						purpose: 'any maskable'
					}
				],
				theme_color: '#E45321',
				background_color: '#272727'
			}
		})
	]
});
