// src/posts/posts.11tydata.js
export default {
  eleventyComputed: {
    // lang が無ければ "ja" とする（安全なデフォルト）
    lang: (data) => data.lang || "ja",

    // slug が無ければファイル名（page.fileSlug）を使う
    slug: (data) => data.slug || data.page.fileSlug,

    // ここで URL を一元計算（/ja/posts/<slug>/）
    permalink: (data) => `/${data.lang}/${data.slug}/index.html`,
  },
};
