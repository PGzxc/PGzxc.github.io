---
title: Hexo站点建设之——文章链接Permalinks
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 761982be
date: 2020-12-10 11:24:18
---
## 一  几种常见的Permalinks

* 默认链接样式
* 中文转拼音hexo-permalink-pinyin
* 插件：hexo-abbrlink
* 插件：exo-abbrlink2
* 自定义pid/urlname方式

<!--more-->

## 二 默认链接样式

### 2.1 变量

|  **变量**   |                           **描述**                           |
| :---------: | :----------------------------------------------------------: |
|    :year    |                   文章的发表年份（4 位数）                   |
|   :month    |                   文章的发表月份（2 位数）                   |
|  :i_month   |                文章的发表月份（去掉开头的零）                |
|    :day     |                   文章的发表日期 (2 位数)                    |
|   :i_day    |                文章的发表日期（去掉开头的零）                |
|    :hour    |                  文章发表时的小时 (2 位数)                   |
|   :minute   |                  文章发表时的分钟 (2 位数)                   |
|   :second   |                  文章发表时的秒钟 (2 位数)                   |
|   :title    |        文件名称 (relative to “source/_posts/“ folder)        |
|    :name    |                           文件名称                           |
| :post_title |                           文章标题                           |
|     :id     | 文章 ID (*not persistent across [cache reset](https://hexo.io/zh-cn/docs/commands#clean)*) |
|  :category  |  分类。如果文章没有分类，则是 `default_category` 配置信息。  |
|    :hash    | SHA1 hash of filename (same as `:title`) and date (12-hexadecimal) |

### 2.2 样式

|           **参数**            |          **结果**           |
| :---------------------------: | :-------------------------: |
|   :year/:month/:day/:title/   |   2013/07/14/hello-world/   |
| :year-:month-:day-:title.html | 2013-07-14-hello-world.html |
|       :category/:title/       |    foo/bar/hello-world/     |
|         :title-:hash/         |  hello-world-a2c8ac003b43/  |

### 2.3 如何使用

```
source/_posts/lorem/hello-world.md
title: Hello World
date: 2013-07-14 17:01:34
categories:
- foo
- bar
```

## 三 中文转拼音hexo-permalink-pinyin

### 3.1 样式

```
标题：我的个人博客
转换后：https://[你的网站域名]/posts/wo-de-ge-ren-bo-ke.html
```

### 3.2 如何使用

#### 插件地址：[hexo-permalink-pinyin][11]

#### 插件安装

```
npm i hexo-permalink-pinyin --save
```

#### 插件配置(config.yml )

```
# https://github.com/viko16/hexo-permalink-pinyin
permalink_pinyin:
  enable: true
  separator: '-' # default: '-'
```

### 3.3 可能存在的问题

可能会出现分类存在大写字母，那么在URL访问的时候不能访问到该分类的详情页

## 四 hexo-abbrlink(推荐)

### 4.1 样式

```
标题：我的个人博客
转换后：
crc16 & hex
https://[你的网站域名]/posts/66c8.html

crc16 & dec
https://[你的网站域名]/posts/65535.html

crc32 & hex
https://[你的网站域名]/posts/8ddf18fb.html

crc32 & dec
https://[你的网站域名]/posts/1690090958.html
```

### 4.2 如何使用

#### 插件地址：[hexo-abbrlink][12]

#### 插件安装

```
npm install hexo-abbrlink --save
```

#### 插件配置(config.yml )

```
permalink: posts/:abbrlink.html
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex
#add v7.8.0
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks
```

## 五 插件：hexo-abbrlink2(不推荐)

### 5.1 样式

```
标题：我的个人博客
转换后：https://[你的网站域名]/posts/1.html
```

### 5.2 如何使用

#### 插件地址：[hexo-abbrlink2][13]

### 插件安装

```
npm install hexo-abbrlink2 --save
```

插件配置(config.yml )

```
permalink: posts/:abbrlink/
abbrlink:
  start: 1000 # the first id, default 0
```

### 5.3 存在的问题

* 文章页面没有：abbrlink参数说明文章id
* 使用过hexo-abbrlink后，文章链接对此无效

## 六 自定义pid/urlname方式

### 6.1 样式

```
标题：我的个人博客
转换后：https://[你的网站域名]/posts/1.html
```

### 6.2 如何使用

#### _config.yml

```
permalink: /posts/:pid/
```

#### 文章配置pid参数

```
---
title: 第一篇博客
categories: 
tags: 
pid: 1
date: 2020-12-10 11:20:53
---
```




[11]:https://github.com/viko16/hexo-permalink-pinyin
[12]:https://github.com/Rozbo/hexo-abbrlink
[13]:https://github.com/rozbo/hexo-abbrlink2