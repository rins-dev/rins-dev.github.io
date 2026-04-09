# rins-dev.github.io

Pages for me


## 添加新文章方法：
1. 创建新内容
```
npm run create my-post
```
2. 编辑 frontmatter 和正文
    ---
    title: 我的文章
    date: 2026-04-01
    excerpt: 可选摘要
    ---
    正文内容...

3. 构建网页内容
```
npm run build
```
会自动：
- 把 .md 转成 posts/my-post/index.html
- 按日期倒序更新 index.html 和 blog/index.html 的文章列表

4. 运行查看效果
```
npm run dev
```
访问 http://localhost:8091 即可看到和线上一致的效果。
