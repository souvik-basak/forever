import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import styleImport from "vite-plugin-style-import";

export default defineConfig({
  plugins: [
    react(),
    styleImport({
      libs: [
        {
          libraryName: "react-toastify",
          esModule: true,
          resolveStyle: () => "react-toastify/dist/ReactToastify.css",
        },
      ],
    }),
  ],
  server: { port: 5174 },
});
