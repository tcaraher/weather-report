const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: 'src',
      output: '_site',
      layouts: '_includes',
      includes: '_includes',
    },
    templateFormats: ['md', 'liquid', 'njk'],
    passthroughFileCopy: true
  }
};