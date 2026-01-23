---
title: HTML开发之——提示信息
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: fdec79b7
date: 2021-09-03 10:16:01
---
## 一 概述

本文介绍HTML中的提示信息：

* window.alert：弹窗提示框
* window.console.log：调试，控制台输入信息
* document.write：整个页面替换write内容
* document.getElementById("xx").innerHTML：讲id为xx的元素替换

<!--more-->

## 二 没有发生屏幕翻转时

### 2.1 页面布局

#### 2.1.1 布局代码

```
<html>
    <header>
        <style>
            #main-content{
                width: 400px;
                height: 400px;
                position: relative;
                margin: 0 auto;
                padding: auto;
                background: chocolate;
                top: 100px;
            }
            input{
                width: 80px;
                height: 50px;
                size: 20px;
            }
        </style>
        <script>
            function messageAlert(){
                window.alert("弹窗");
            }
            function messageConsole(){
                window.console.log("console");
            }
            function messageWrite(){
                document.write("Write");
            }
            function messageInnerHTML(){
                document.getElementById("content").style.display="";
				document.getElementById("content").innerHTML="InnerHTML";
				setTimeout(function(){
					document.getElementById("content").style.display="none";
				},1000);
            }
        </script>
    </header>
   <body bgcolor="#888">
       <div id="main-content" align="center">
          <h1>Title</h1>
          <input type="button" value="弹窗" onclick="messageAlert()">
          <input type="button" value="console" onclick="messageConsole()">
          <input type="button" value="write" onclick="messageWrite()">
          <input type="button" value="innerHTML" onclick="messageInnerHTML()">
          <p id="content"></p>
    </div>
   </body> 
</html>
```

#### 2.1.2 显示效果

![][1]

### 2.2 消息提示效果

#### 2.2.1 alert

代码

```
window.alert("弹窗");
```

效果图
![][2]

#### 2.2.2 console.log

代码

```
window.console.log("console");
```

效果图
![][3]

#### 2.2.3 document.write(没有元素的write功能)

代码

```
document.write("Write");
```

效果图
![][4]
#### 2.2.3 document.getElementById("xx").innerHTML

代码

```
 document.getElementById("content").style.display="";
 document.getElementById("content").innerHTML="InnerHTML";
 setTimeout(function(){
			document.getElementById("content").style.display="none";
		  },1000);
```

说明(仅作为提示信息,1秒后消失):

* 第一行(style.display=""):清除style中display属性,否则第二次后不会消失
* 第二行(innerHTML="InnerHTML";):显示内容
* 第三行(setTimeout(function()):定时功能,1秒后取消显示

效果图
![][5]

## 三 屏幕发生旋转

### 3.1 将屏幕旋转一定角度
新增代码
```
html{
         -moz-transform:rotate(270deg);
         -o-transform:rotate(270deg);
         -webkit-transform:rotate(270deg);
         -ms-transform:rotate(270deg);
         transform:rotate(270deg);
     }
```
效果
![][6]

### 3.2 此时，提示信息说明

* alert弹框(异常)：没有随着屏幕的旋转而旋转，旋转后，alert仍然横向显示
* write(异常)：效果同alert，没有随着屏幕的旋转而旋转，旋转后，write仍然横向显示
* innerHTML和console.log：正常显示

![][7]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-preview-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-alert-info.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-console-info.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-write-info.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-innerhtml-info.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-screen-rotate.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/html-message-screen-oration-preview.png