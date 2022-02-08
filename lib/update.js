const https = require('https');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

https.get('https://api.github.com/repos/next-theme/hexo-theme-next/releases', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36'
  }
}, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200) {
      data = JSON.parse(data);
      parse(data);
    }
  });
}).on('error', err => {
  console.error('Failded to download release messages.');
  console.log(err);
});

function parse(data) {
  data.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  data.forEach(release => {
    const version = release.tag_name.replace('v', '');
    console.log('Processing version %s', version);
    const filename = path.join(__dirname, `../source/_posts/next-${version.split('.').join('-')}-released.md`);
    if (fs.existsSync(filename)) return;
    const time = release.published_at.replace('T', ' ').replace('Z', '');
    const body = release.body
      .replace(/#(\d{1,4})/g, '[#$1](https://github.com/next-theme/hexo-theme-next/pull/$1)')
      .replace(/([0-9a-f]{7})([0-9a-f]{33})/g, '[$1](https://github.com/next-theme/hexo-theme-next/commit/$1$2)')
      .replace(/\r\n/g, '\n')
      .trim();
    const content = `---
title: NexT ${version} Released
date: ${time}
---

${body}

[Detailed changes for NexT v${version}](https://github.com/next-theme/hexo-theme-next/releases/tag/v${version})
`;
    fs.writeFileSync(filename, content);
  });
  spawnSync('npm', ['version', data[0].tag_name.replace('v', ''), '-m', `Release ${data[0].tag_name}`, '--force'], {
    stdio: "inherit"
  });
}
