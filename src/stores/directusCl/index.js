import { createDirectus, rest } from "@directus/sdk";

const api = createDirectus("http://localhost:8055").with(rest());

export default api;
