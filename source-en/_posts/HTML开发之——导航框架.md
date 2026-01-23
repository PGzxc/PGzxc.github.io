---
title: HTML开发之——导航框架
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 49fd5af9
date: 2021-08-31 17:06:24
---
## 一 导航框架示例
![][1]

<!--more-->

## 二 框架描述

* 使用frameset构建导航框架
* 给frameset 设置cols属性划分页面区域，并分配所占宽度
* 第一个frame为导航栏(frame_contents.html)，点击替换第二个frame的内容
* 为避免在导航和显示在同一个页面内，给第二个frame，设置name属性，通过frame_contents.html中导航替换页面内容

## 三 页面实现

### 3.1 框架页面(index.html)

```
<html>
<frameset cols="180,*">
  <frame src="frame_contents.html" />
  <frame src="frame_a.html" name="showframe" />
</frameset>
</html>
```

说明：

* name="showframe"：在当前的html中给frame_a.html取个名字叫做showframe
* 导航frame_contents.html页面中，导航分别设置了target="showframe"，用于将打开的页面，替换设置了name="showframe"区域

### 3.2 frame框架

#### 导航区(frame_contents.html)

```
<html> 
<body>
    <ul>
        <li><a href="frame_b.html" target="showframe">没有锚点的链接</a></li>
        <li><a href="frame_c.html" target="showframe">有锚点的链接</a></li>
    </ul>    
</body> 
</html>  
```

#### 内容区(frame_a.html)

```
<html>
    <body>
        <h1>Frame A</h1>
    </body>
</html>
```

### 3.3 导航替换内容页面

#### 没有锚点页面(frame_b.html)

```
<html>
    <body >
    <h2>Chapter 1</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 2</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 3</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2><a name="C4">Chapter 4</a></h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 5</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 6</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 7</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 8</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 9</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 10</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 11</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 12</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 13</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 14</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 15</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 16</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 17</h2>
    <p>This chapter explains ba bla bla</p>
    
    </body>
</html>
```

#### 有锚点的页面(frame_c.html)

```
<html>
    <body>
    <script type="text/javascript">
        window.onload=function(){
            document.getElementById("download_jump").click();
        }
    </script>
    <p>  
       <a  id="download_jump"  href="#C4" >查看 Chapter 4。</a>
    </p>
    
    <h2>Chapter 1</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 2</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 3</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2><a name="C4">Chapter 4</a></h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 5</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 6</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 7</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 8</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 9</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 10</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 11</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 12</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 13</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 14</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 15</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 16</h2>
    <p>This chapter explains ba bla bla</p>
    
    <h2>Chapter 17</h2>
    <p>This chapter explains ba bla bla</p>
    
    </body>
</html>
```

说明：

* window.onload：页面加载完成后，执行的操作
* document.getElementById("download_jump").click()：自动执行id为`download_jump`的点击事件
* id为`download_jump`已经设置了内部链接`href="#C4"`,跳转到锚点`name="C4"`位置



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-navigator-sample.gif