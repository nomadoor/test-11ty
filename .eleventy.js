export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  eleventyConfig.addFilter("slugify", (s = "") =>
    s
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
  );

  eleventyConfig.addFilter("date", (value, format = "YYYY-MM-DD") => {
    const toDate = (input) => (input instanceof Date ? input : new Date(input));
    const date = toDate(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const pad = (num) => String(num).padStart(2, "0");
    const replacements = {
      YYYY: date.getUTCFullYear(),
      MM: pad(date.getUTCMonth() + 1),
      DD: pad(date.getUTCDate())
    };

    return format.replace(/YYYY|MM|DD/g, (token) => replacements[token] ?? token);
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (["all", "post"].includes(tag)) {
          return;
        }
        tagSet.add(tag);
      });
    });
    return [...tagSet].sort();
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}