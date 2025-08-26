import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/tank_model/",
  server: {
    port: 8080,
    open: true,
  },
});
