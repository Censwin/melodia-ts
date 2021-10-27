/*
 * @Author: Censwin
 * @Date: 2021-10-27 20:53:23
 * @LastEditTime: 2021-10-27 23:34:16
 * @Description:
 * @FilePath: /melodia-ts/config-overrides.js
 */
const { override, addPostcssPlugins } = require("customize-cra");

module.exports = override(
  addPostcssPlugins([
    require("postcss-aspect-ratio-mini")({}),
    require("postcss-px-to-viewport")({
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375 // iphoneX
      viewportHeight: 667, // (Number) The height of the viewport.
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    }),
    require("postcss-write-svg")({
      utf8: false,
    }),
    require("postcss-viewport-units")({}),
    require("cssnano")({
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false,
    }),
  ])
);
