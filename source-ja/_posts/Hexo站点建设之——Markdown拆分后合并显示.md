---
title: Hexo站点建设之——Markdown拆分后合并显示
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 8ca73d37
date: 2026-01-01 09:58:21
---
## 一 概述

```
本文介绍：
-Markdown拆分后的文件，直接打开无法查看并保存成PDF格式文件
-查看完整合并内容并生成PDF的解决方案
```

<!--more-->

## 二 拆分后文件无法直接被解析

### 2.1 直接打开效果

```
1、打开后效果

{% include_md resume/parts/basic.md %}

{% include_md resume/parts/work-2022.md %}

2、说明
打开拆分后的 index.md 文件时，{% include_md ... %}(或类似自定义标签)不会被解析和替换，
你看到的只是原始标签代码
这些标签会以纯文本形式显示，无法自动导入子文件内容，预览效果不完整
```

### 2.2 原因简析

```
1、Hexo 的标签插件(如 hexo-insert-markdown 或自定义 include_md)
仅在 Hexo 生成(hexo generate)或本地服务器(hexo server)运行时生效。

2、普通 Markdown 编辑器的预览功能只支持标准 Markdown 语法，
不认识 Hexo 专有的 {% %} 标签。
```

### 2.3 如何查看完整效果

2.3.1、启动 Hexo 本地服务器

```
hexo clean   # 先清理
hexo g       # 生成静态文件（可选）
hexo s       # 启动服务器

然后在浏览器打开 http://localhost:4000/(或你的简历页面路径)，
即可看到所有子文件合并后的完整渲染效果。
修改子文件或主文件后，刷新浏览器即可预览
```

2.3.2、编辑器侧边预览(有限支持)

```
1、大多数编辑器（如 VS Code 默认预览、Markdown All in One）不支持 Hexo 标签。

2、少数增强预览插件(如 Markdown Preview Enhanced)可能通过自定义配置部分支持，
但不保证完美渲染 Hexo 标签，通常仍需依赖 Hexo server。
```

## 三 查看完整合并内容并生成PDF

### 3.1 浏览器打印为 PDF(效果最好，免费)

```
1、先运行 Hexo 本地预览，确保内容完整合并：
Bashhexo clean && hexo g   # 清理并生成静态文件
hexo s                 # 启动本地服务器

2、在浏览器打开你的简历页面：
http://localhost:4000/resume/(或实际路径，根据你的站点配置)。

3、按 Ctrl + P（Mac: Cmd + P）打开打印对话框。

4、选择 保存为 PDF（Chrome/Edge/Firefox 都支持）。

5、优化设置(让 PDF 更像专业简历)：
-布局：纵向（Portrait）。
-纸张大小：A4。
-边距：无（None）或最小。
-选项：勾选“背景图形”（Background graphics），确保图片和颜色正常显示。
-页眉页脚：关闭（Headers and footers 取消勾选），避免打印水印。
-如果页面有导航栏/侧边栏干扰：
用浏览器开发者工具(F12)临时隐藏不需要的部分(如 .header、.sidebar)，再打印。

-保存后，即得到一份干净、美观的 PDF 简历。

优点：实时看到合并效果，PDF 排版接近网页，图片清晰，支持多页自动分页。
```

### 3.2 在线站点直接导出 PDF

```
如果你的站点已部署(GitHub Pages 或其他)：
-直接访问在线简历页面
-同上，用浏览器打印功能保存为 PDF。
```

### 3.3 工具辅助生成 PDF(进阶)

```
wkhtmltopdf(命令行工具，生成高质量 PDF)：

-下载安装：https://wkhtmltopdf.org/downloads.html
-生成后运行：Bashwkhtmltopdf http://localhost:4000/resume/ resume.pdf
-支持 CSS、图片、JS，效果接近浏览器打印。
```

