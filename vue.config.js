process.env.VUE_APP_PUBLIC_PATH = process.env.PUBLIC_PATH;

module.exports = {
  publicPath: `${process.env.PUBLIC_PATH}`,
  transpileDependencies: ["vuetify"],
};
