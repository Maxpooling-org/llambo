module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-llambo`
  extends: ["llambo"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
