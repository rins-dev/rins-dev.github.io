const fs = require('fs')
const path = require('path')
const { marked } = require('marked')

const POSTS_DIR = path.join(__dirname, 'posts')
const ROOT = __dirname

// --- Post page template ---
const POST_TEMPLATE = (title, date, content) => `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Rins' Blog</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Rins</a>
      <div class="nav-links">
        <a href="/" data-zh="首页" data-en="Home">首页</a>
        <a href="/blog" data-zh="博客" data-en="Blog">博客</a>
        <a href="/about" data-zh="关于" data-en="About">关于</a>
        <a href="/contact" data-zh="联系" data-en="Contact">联系</a>
        <button class="lang-toggle" onclick="toggleLang()">EN</button>
      </div>
    </nav>
  </header>

  <main class="post">
    <article>
      <header class="post-header">
        <time>${date}</time>
        <h1>${title}</h1>
      </header>
      <div class="post-content">
        ${content}
      </div>
    </article>

    <script src="https://utteranc.es/client.js"
        repo="rins-dev/rins-dev.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
    </script>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Rins. <span data-zh="使用纯 HTML/CSS/JS 构建" data-en="Built with plain HTML/CSS/JS">使用纯 HTML/CSS/JS 构建</span></p>
  </footer>

  <script src="/assets/js/main.js"></script>
</body>
</html>`

// --- Post card HTML ---
const POST_CARD = (slug, date, title, excerpt) => `        <a href="/posts/${slug}" class="post-card">
          <time>${date}</time>
          <h3 data-zh="${title}" data-en="${title}">${title}</h3>
          <p data-zh="${excerpt}" data-en="${excerpt}">${excerpt}</p>
        </a>`

// --- Page templates ---
const INDEX_TEMPLATE = (postCards) => `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rins' Blog</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Rins</a>
      <div class="nav-links">
        <a href="/" data-zh="首页" data-en="Home">首页</a>
        <a href="/blog" data-zh="博客" data-en="Blog">博客</a>
        <a href="/about" data-zh="关于" data-en="About">关于</a>
        <a href="/contact" data-zh="联系" data-en="Contact">联系</a>
        <button class="lang-toggle" onclick="toggleLang()">EN</button>
      </div>
    </nav>
  </header>

  <main class="home">
    <section class="hero">
      <h1 data-zh="你好，我是 Rins" data-en="Hi, I'm Rins">你好，我是 Rins</h1>
      <p data-zh="一个老程序员" data-en="An old developer">一个老程序员</p>
    </section>

    <section class="latest-posts">
      <h2 data-zh="最新文章" data-en="Latest Posts">最新文章</h2>
      <div class="post-list">
${postCards.join('\n')}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Rins. <span data-zh="使用纯 HTML/CSS/JS 构建" data-en="Built with plain HTML/CSS/JS">使用纯 HTML/CSS/JS 构建</span></p>
  </footer>

  <script src="/assets/js/main.js"></script>
</body>
</html>`

const BLOG_TEMPLATE = (postCards) => `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Rins' Blog</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Rins</a>
      <div class="nav-links">
        <a href="/" data-zh="首页" data-en="Home">首页</a>
        <a href="/blog" data-zh="博客" data-en="Blog">博客</a>
        <a href="/about" data-zh="关于" data-en="About">关于</a>
        <a href="/contact" data-zh="联系" data-en="Contact">联系</a>
        <button class="lang-toggle" onclick="toggleLang()">EN</button>
      </div>
    </nav>
  </header>

  <main class="blog">
    <h1 data-zh="博客" data-en="Blog">博客</h1>
    <div class="post-list">
${postCards.join('\n')}
    </div>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Rins. <span data-zh="使用纯 HTML/CSS/JS 构建" data-en="Built with plain HTML/CSS/JS">使用纯 HTML/CSS/JS 构建</span></p>
  </footer>

  <script src="/assets/js/main.js"></script>
</body>
</html>`

// --- Helpers ---
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: content }

  const meta = {}
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) meta[key.trim()] = rest.join(':').trim()
  })

  return { meta, body: match[2] }
}

function getExcerpt(body) {
  const plain = body.replace(/[#*>\-`!\[\]()]/g, '').trim()
  return plain.slice(0, 80) + (plain.length > 80 ? '...' : '')
}

function buildPost(mdPath) {
  const md = fs.readFileSync(mdPath, 'utf-8')
  const { meta, body } = parseFrontmatter(md)

  const html = marked.parse(body)
  const output = POST_TEMPLATE(meta.title || 'Untitled', meta.date || '', html)

  const dir = path.dirname(mdPath)
  const outPath = path.join(dir, 'index.html')
  fs.writeFileSync(outPath, output)
  console.log(`  Built: ${path.relative(ROOT, outPath)}`)

  return {
    slug: path.basename(dir),
    date: meta.date || '',
    title: meta.title || 'Untitled',
    excerpt: meta.excerpt || getExcerpt(body),
  }
}

// --- Main ---
console.log('Building posts...')

const posts = []
if (fs.existsSync(POSTS_DIR)) {
  fs.readdirSync(POSTS_DIR).forEach(slug => {
    const mdPath = path.join(POSTS_DIR, slug, 'index.md')
    if (fs.existsSync(mdPath)) {
      posts.push(buildPost(mdPath))
    }
  })
}

// Sort by date descending
posts.sort((a, b) => b.date.localeCompare(a.date))

// Build post cards
const cards = posts.map(p => POST_CARD(p.slug, p.date, p.title, p.excerpt))

// Write index.html
fs.writeFileSync(path.join(ROOT, 'index.html'), INDEX_TEMPLATE(cards))
console.log('  Built: index.html')

// Write blog/index.html
fs.mkdirSync(path.join(ROOT, 'blog'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'blog', 'index.html'), BLOG_TEMPLATE(cards))
console.log('  Built: blog/index.html')

console.log(`Done. ${posts.length} post(s) built.`)
