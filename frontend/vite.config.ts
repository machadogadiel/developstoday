/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), tsconfigPaths(), TanStackRouterVite()],
	server: {
		host: false,
		strictPort: true,
	},
	css: {
		devSourcemap: false,
	},
	publicDir: "./public",
});
