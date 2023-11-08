import { fileURLToPath, URL } from 'node:url';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				


				{
					src: 'src/assets/monster-admin/libs/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js',
					dest: 'src/assets/monster-admin/libs/perfect-scrollbar/dist/js',
				},
				{
					src: 'src/assets/monster-admin/js/app.js',
					dest: 'src/assets/monster-admin/js',
				},
				{
					src: 'src/assets/monster-admin/js/feather.min.js',
					dest: 'src/assets/monster-admin/js',
				},
				{
					src: 'src/assets/monster-admin/libs/bootstrap-table/dist/bootstrap-table.min.js',
					dest: 'src/assets/monster-admin/libs/bootstrap-table/dist',
				},
				{
					src: 'src/assets/monster-admin/libs/bootstrap-switch/dist/bootstrap3/js/init.js',
					dest: 'src/assets/monster-admin/libs/bootstrap-switch/dist',
				},
				{
					src: 'src/assets/monster-admin/libs/jquery/jquery-ui.js',
					dest: 'src/assets/monster-admin/libs/jquery',
				},
				{
					src: 'src/assets/monster-admin/libs/jquery/jquery.cookie.js',
					dest: 'src/assets/monster-admin/libs/jquery',
				},
				{
					src: 'src/assets/monster-admin/libs/jquery/jquery.dynatree.js',
					dest: 'src/assets/monster-admin/libs/jquery',
				},

			],
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8092',
				changeOrigin: true,
			},
			'/adm': {
				target: 'http://localhost:8091',
				changeOrigin: true,
			},
			'/api/login': {
				target: 'https://api.dfpcen.com',
				changeOrigin: true,
			},
		},
	},
});
