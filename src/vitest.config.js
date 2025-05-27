import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // ← Esto es lo importante
  },
});
