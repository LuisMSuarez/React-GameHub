import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          msal: ["@azure/msal-browser", "@azure/msal-react"],
          chakra: ["@chakra-ui/react", "@emotion/react"],
        },
      },
    },
  },
});
