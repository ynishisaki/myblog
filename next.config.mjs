import nextra from "nextra";

const withNextra = nextra({
  // theme: "./theme.tsx",
  theme: "nextra-theme-blog",
  // theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true,
  latex: true,
});

export default withNextra({
  reactStrictMode: true,
  trailingSlash: true,
});
