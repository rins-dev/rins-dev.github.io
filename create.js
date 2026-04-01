const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.join(__dirname, 'posts')
const TEMPLATE_PATH = path.join(POSTS_DIR, 'TEMPLATE.md')

// Get slug from command line arguments
const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node create.js <slug>')
  console.error('Example: node create.js my-first-post')
  process.exit(1)
}

// Validate slug (allow alphanumeric, hyphens, underscores)
if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
  console.error('Slug must contain only letters, numbers, hyphens, and underscores.')
  process.exit(1)
}

const postDir = path.join(POSTS_DIR, slug)
const mdPath = path.join(postDir, 'index.md')

// Check if post already exists
if (fs.existsSync(postDir)) {
  console.error(`Post directory already exists: ${slug}`)
  process.exit(1)
}

// Read template
if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Template file not found: posts/TEMPLATE.md')
  process.exit(1)
}
const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8')

// Generate title from slug (e.g., 'my-first-post' -> 'My first post')
const title = slug
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, char => char.toUpperCase())

// Get current date in YYYY-MM-DD format
const date = new Date().toISOString().split('T')[0]

// Replace title and date in template
let content = template
content = content.replace(/^title:.*$/m, `title: ${title}`)
content = content.replace(/^date:.*$/m, `date: ${date}`)

// Create directory and file
fs.mkdirSync(postDir, { recursive: true })
fs.writeFileSync(mdPath, content)

console.log(`Created new post: ${slug}`)
console.log(`  Path: ${path.relative(__dirname, mdPath)}`)
console.log(`  Title: ${title}`)
console.log(`  Date: ${date}`)
console.log('\nEdit the file to add your content. Run "npm run build" to generate HTML.')
