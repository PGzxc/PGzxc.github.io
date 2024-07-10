---
title: 'Hexo站点建设之——Markdown中出现“{{”号解析报错'
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 93d61cfd
date: 2020-10-26 22:17:37
---
## 一 现象描述

最近写了一篇文章，在执行`hexo g`指令时生成文章预览时，会发生错误，错误信息如下：

```
Unhandled rejection Nunjucks Error: _posts/xxxxxxxxxxx.md [Line 27, Column 114] unexpected token: }}
    =====               Context Dump               =====
    === (line number probably different from source) ===
  22 | <!--code￼3-->
```

<!--more-->

![][1]

## 二 原因分析

### 2.1 分析过程

* 将本篇文章删除后，hexo g 能正常执行，说明是本篇文章引起的问题
* 将本篇文章的内容删除后，hexo指令能正常执行，说明不是头部categories和tags引起的问题
* 确定是文章内容引起的问题，根据错误信息，逐步缩小查找范围，最终确定是{% raw %}"{{"{% endraw %}引起的错误

### 2.3 原因搜索

* 复制错误信息`Unhandled rejection Nunjucks Error`搜索
* 确定上步{% raw %}"{{"{% endraw %}引起的hexo指令错误进行搜索
* 根据错误信息给出的地址[https://hexo.io/docs/troubleshooting.html][11]

### 2.4 原因解释(hexo troubleshooting)

```
Escape Contents
Hexo uses Nunjucks to render posts (Swig was used in older version, which share a similar syntax). Content wrapped with {{ }} or {% %} will get parsed and may cause problems. You can skip the parsing by wrapping it with the raw tag plugin, single backtick `{{ }}` or triple backtick.
Alternatively, Nunjucks tags can be disabled through the renderer’s option (if supported), API or front-matter.

{% raw %}
Hello {{ world }}
{% endraw %}
​```
Hello {{ world }}
​```
```

## 三 解决办法

* 修改前

  ```
  "{{}}"
  ```

* 修改后

  ```
  {% raw %}"{{}}"{% endraw %}
  ```

## 四 参考

* [https://hexo.io/docs/troubleshooting.html][11]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-unhandled-nunjucks-info.png
[11]:https://hexo.io/docs/troubleshooting.html