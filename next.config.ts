import type { NextConfig } from "next";
import { routeAliases } from "./src/config/aliases";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async redirects() { return Object.entries(routeAliases).map(([source, destination]) => ({ source, destination, permanent: true })); },
};

export default nextConfig;
