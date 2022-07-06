module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL || "/SimplePasswordManagerService/"
      : "/",
};
