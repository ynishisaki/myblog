import nextra from "nextra";

const withNextra = nextra({
  theme: "./theme.tsx",
  // theme: "nextra-theme-blog",
  // themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  trailingSlash: true,
});
