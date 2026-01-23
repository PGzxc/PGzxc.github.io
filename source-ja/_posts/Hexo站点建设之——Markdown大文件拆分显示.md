---
title: Hexo站点建设之——Markdown大文件拆分显示
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 117eb548
date: 2025-12-31 09:31:01
---
## 一 概述

```
Markdown文件过大，打开会卡顿，本文介绍2种方式：
- 自定义方式
- 三方插件
```

<!--more-->

## 二 Markdown大文件拆分和引用

### 2.1 大文件(简历-index)拆分多个子文件

```
示例：index.md拆分为如下文件

resume-basic.md：联系方式、基本信息、求职意向。
resume-education.md：教育经历。
resume-work.md：工作经历（每个公司一个子文件，如work-company1.md）。
resume-projects.md：个人项目（每个平台一个子文件，如projects-harmony.md）。
```

### 2.2 在主文件index.md中使用

```
{% include 'resume-basic.md' %}
{% include 'resume-education.md' %}
<!-- ... -->
```

### 2.3 结果

```
直接打开，没有预览效果，只显示引入标签文字
Hexo生成时会自动合并成一个页面
```

## 三 方式1-自定义方式

### 3.1 _config.yml中需要配置

```
include_markdown:
  dir: source/resume/parts   # Base directory of template markdown
  verbose: false 
  
skip_render:
  - robots.txt
  - animate/*
  - highlight/*
  - resume/parts/*  
```

### 3.2 script/index.js中添加配置

```
// Custom tag for including markdown files
hexo.extend.tag.register('include_md', (args) => {
  const fs = require('fs');
  const path = require('path');
  const file_path = args[0];
  const base_dir = path.join(hexo.source_dir, 'resume', 'parts');
  const full_path = path.join(base_dir, file_path);
  
  try {
    if (fs.existsSync(full_path)) {
      let content = fs.readFileSync(full_path, 'utf8');
      // Remove YAML front matter if it exists
      content = content.replace(/^---[\s\S]*?---\n/, '');
      // Render Markdown content using Hexo's renderer
      return hexo.render.renderSync({text: content, engine: 'markdown'});
    } else {
      return `<p>Error: Could not find file ${file_path}</p>`;
    }
  } catch (e) {
    return `<p>Error: ${e.message}</p>`;
  }
}, { ends: false });
```

## 四 方式2-三方插件(hexo-insert-markdown)

### 4.1 说明

```
npm install hexo-insert-markdown --save
安装后，在Markdown文件中使用自定义标签插入内容，
例如：{% insertmd your/file.md %}

该插件适用于将长文档拆分为独立部分（如章节或代码片段），提升维护效率
```

### 4.2 安装插件

```
npm install hexo-insert-markdown --save
```

### 4.3 拆分文件

```
在 source/resume/parts/ 目录下创建子 Markdown 文件，例如：
basic.md（联系方式、基本信息）
education.md（教育经历）
work.md（工作经历）
projects-harmony.md（Harmony 项目部分）
...（其他部分类似）
```

### 4.4 主文件使用方式(无需 _config.yml 配置)

```
在主 Markdown 文件（如 source/_posts/resume.md 或页面文件）中，使用标签包含：text{% insertmd resume/parts/basic.md %}

{% insertmd resume/parts/education.md %}

{% insertmd resume/parts/projects-harmony.md %}
路径相对于 source/ 目录（你的目录结构已匹配）。
```

### 4.5 测试

```
运行 hexo clean && hexo g 生成站点。
运行 hexo s 本地预览，确保内容正常合并渲染。
```

## 五 可能出现的问题

### 5.1 hexo-insert-markdown版本

```
hexo-insert-markdown版本为1.4.4
最近更新时间为3年前
```

### 5.2 安装失败原因

```
hexo-insert-markdown@1.4.4只支持 hexo@"6.x"
导致 npm(现代版本)严格检查依赖树冲突，报 ERESOLVE 错误
```

### 5.3 解决方案

1、方案1：强制安装(最简单，推荐先试)

```
方案1：强制安装(最简单，推荐先试)
npm install hexo-insert-markdown --save --legacy-peer-deps
安装后直接使用 {% insertmd resume/parts/basic.md %}，无需任何配置
```

方案2：使用自定义脚本(零插件依赖，最稳定)

```
1、在博客根目录创建 scripts/include-md.js 文件
// scripts/include-md.js
hexo.extend.tag.register('include_md', function (args) {
  const fs = require('hexo-fs');
  const path = require('path');

  if (args.length === 0) {
    return '<p>Error: include_md 需要文件路径</p>';
  }

  const relativePath = args[0];
  const baseDir = path.join(hexo.source_dir, 'resume/parts');
  const fullPath = path.join(baseDir, relativePath);

  try {
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/^---\n[\s\S]*?\n---\n?/, ''); // 移除 front-matter
      return hexo.render.renderSync({ text: content, engine: 'markdown' });
    } else {
      return `<p style="color:red;">Error: 未找到文件 resume/parts/${relativePath}</p>`;
    }
  } catch (err) {
    return `<p style="color:red;">Error: ${err.message}</p>`;
  }
});

2、主简历文件中使用
{% include_md basic.md %}
{% include_md education.md %}
{% include_md work-2022.md %}

3、测试：
hexo clean && hexo g && hexo s

4、说明
此方式在 Hexo 7 下 100% 兼容，无依赖冲突
```

方案3：其他替代插件

```
hexo-include-markdown（旧插件，最后更新8年前）：也不支持 Hexo 7，同样会冲突。
目前官方插件列表中没有专为 Hexo 7 优化的 Markdown 包含插件，社区多数还在适配中
```

## 六 参考

* [Hexo官网-插件](https://hexo.io/plugins/)
* [插件—hexo-insert-markdown](https://github.com/bennycode/hexo-insert-markdown)