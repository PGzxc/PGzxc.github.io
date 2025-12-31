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

// 自定义标签：include_md - 引入Markdown文件并渲染为HTML
hexo.extend.tag.register('include_md', (args) => {
  const fs = require('fs');
  const path = require('path');
  const file_path = args[0];
  // 构建完整路径：hexo source目录 + resume/parts + 文件名
  const base_dir = path.join(hexo.source_dir, 'resume', 'parts');
  const full_path = path.join(base_dir, file_path);
  
  try {
    if (fs.existsSync(full_path)) {
      let content = fs.readFileSync(full_path, 'utf8');
      // 移除YAML Front Matter（如果有）
      content = content.replace(/^---[\s\S]*?---\n/, '');
      // 渲染Markdown为HTML
      return hexo.render.renderSync({text: content, engine: 'markdown'});
    } else {
      return `<p>Error: Could not find file ${file_path}</p>`;
    }
  } catch (e) {
    return `<p>Error: ${e.message}</p>`;
  }
}, { ends: false });

// 使用Hexo的filter机制，在渲染前转义所有Nunjucks标签
// 这样可以确保在Nunjucks解析之前转义所有标签，避免解析错误
hexo.extend.filter.register('before_post_render', (data) => {
  // 确保只处理Markdown文件
  if (data.source.endsWith('.md')) {
    // 转义所有的{% ... %}标签为{% raw %}{% ... %}{% endraw %}
    // 包括{% include %}和其他可能的Nunjucks标签
    data.content = data.content.replace(/\{\%[^%}]*\%\}/g, (match) => {
      return `{% raw %}${match}{% endraw %}`;
    });
  }
  return data;
});
