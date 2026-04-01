# rins-dev.github.io

Pages for me

## 本地运行方法：
- 执行npm run dev
- 访问 http://localhost:8080 即可看到和线上一致的效果。

## 添加新文章方法：
1. 复制模板
```
cp posts/TEMPLATE.md posts/my-post/index.md
```
2. 编辑 frontmatter 和正文
    ---
    title: 我的文章
    date: 2026-04-01
    excerpt: 可选摘要
    ---
    正文内容...
3. 运行构建
npm run build
会自动：
- 把 .md 转成 posts/my-post/index.html
- 按日期倒序更新 index.html 和 blog/index.html 的文章列表
