---
title: HTML开发之——文件路径(28)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: e2ca2945
date: 2020-08-28 22:53:18
---
## 一 路径

|               路径               |                   描述                    |
| :------------------------------: | :---------------------------------------: |
|     \<img src="picture.jpg">     |   picture.jpg位于与当前网页相同的文件夹   |
| \<img src="images/picture.jpg">  | picutre.jpg位于当前文件夹的images文件夹中 |
| \<img src="/images/picture.jpg"> | picture.jpg当前站点根目录的images文件夹中 |
|   \<img src="../picture.jpg">    | picture.jpg位于当前文件夹的上一级文件夹中 |

<!--more-->

## 二 路径

###  2.1  HTML文件路径

文件路径描述了网站文件夹结构中某个文件的位置

文件路径会在链接外部文件时被用到：

* 网页
* 图像
* 样式表
* JavaScript

### 2.2  绝对文件路径

 绝对文件路径是指向一个因特网文件的完整URL：

实例：

```
<img src="https://www.w3school.com.cn/images/picture.jpg" alt="flower">
```

### 2.3 相对路径

相对路径指向相对于当前页面的文件

实例1 在本例中，文件路径指向了位于当前网站根目录中images文件夹里的一个文件：

```
<img src="/images/picture.jpg" alt="flower">
```

实例二 在本例中，文件路径指向了位于当前文件夹中images文件夹里的一个文件

```
<img src="images/picture.jpg" alt="flower">
```

实例三 在本例中，文件路径指向了位于当前文件夹上一级文件夹中images文件夹里的一个文件

```
<img src="../images/picture.jpg" alt="flower">
```

### 2.4 好习惯

使用相对路径是个好习惯(如果可能)

如果使用了相对路径，那么你的网页就不会与当前的基准URL进行绑定。虽有链接在您的电脑上(localhost)或未来的公共域中均可正常工作