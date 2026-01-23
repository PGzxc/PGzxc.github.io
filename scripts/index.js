const fs = require('fs');
const path = require('path');

hexo.extend.tag.register('darkmode_preview', () => `<style>
.image-comparison-container {
    position: relative;
}

.image-comparison {
    opacity: 1 !important;
}

@keyframes next-clip-path {
    from {
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }
    to {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
}

.image-comparison:last-of-type {
    animation: next-clip-path 8s alternate ease-in-out infinite;
    position: absolute;
    top: 0;
}
</style>
<div class="image-comparison-container">
    <img class="image-comparison" src="/images/next-schemes.png" alt="NexT Schemes">
    <img class="image-comparison" src="/images/next-schemes-dark.png" alt="NexT Schemes">
</div>`);

// --- 核心修复：include_markdown 标签 ---
hexo.extend.tag.register('include_markdown', function(args) {
  if (!args[0]) return '<p style="color:red">[include_markdown] missing file path</p>';

  // 调试信息
  console.log('include_markdown args:', args);

  const filePath = args[0];

  // 构建正确的文件路径 - 直接使用 filePath
  const fullPath = path.join(hexo.source_dir, 'resume', filePath);

  // 调试信息
  console.log('include_markdown fullPath:', fullPath);
  console.log('include_markdown file exists:', fs.existsSync(fullPath));

  if (!fs.existsSync(fullPath)) {
    return `<p style="color:red">Missing file: ${fullPath}</p>`;
  }

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/^---[\s\S]*?---\n?/, '');

    return hexo.render.renderSync({ text: content, engine: 'markdown' });
  } catch (err) {
    return `<p style="color:red">Render error in ${fullPath}: ${err.message}</p>`;
  }
}, { ends: false });