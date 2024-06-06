
/** @type {import('jest').Config} */
const config = {
  
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageProvider: "v8",
  transform: {},
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$",
    "/src/config/db.js",
  ],

};

export default config;
