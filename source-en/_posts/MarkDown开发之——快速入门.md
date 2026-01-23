---
title: MarkDown开发之——快速入门
categories:
  - 工具
  - Markdown
tags:
  - 语法
abbrlink: 8d6e83f
date: 2017-11-12 02:12:18
---
# 前言

上一篇文章简单介绍了Markdown的安装和破解方法，这篇文章简单介绍下Markdown的语法和使用范例，如果想查看Markdown的HTML输入结果，可以使用[Disgus](https://daringfireball.net/projects/markdown/dingus)，将编写的Markdown文档转成 XHTML。
    ![dingus][1]
<!--more-->

# 一：区块元素

## 段落：
  
一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行。普通段落不该用空格或制表符来缩进。  

## 换行： 
 
切换到下一行，下面介绍两种换行方式  
1. 在插入处先按入两个以上的空格然后回车  
2. 使用&lt;/br&gt; 
![换行][2]

## 标题： 
 
Markdown 支持两种标题的语法，类 Setext 和类 atx 形式。  
Setext 形式是用底线的形式，利用 = （最高阶标题）和 - （第二阶标题），任何数量的 = 和 - 都可以有效果。 你可以选择性地「闭合」类 atx 样式的标题，这纯粹只是美观用的，若是觉得这样看起来比较舒适，你就可以在行尾加上 #，而行尾的 # 数量也不用和开头一样（行首的井字符数量决定标题的阶数）:
>![标题][3] 
>![标题2][4]

## 区块引用 Blockquotes 
1. 然后在每行的最前面加上 > ：
![markdown-blockquotes1][5]
2. 只在整个段落的第一行最前面加上 > ：
![markdown-blockquotes2][6] 
3. 区块引用可以嵌套，根据层次加上不同数量的 > ：
![markdown-blockquotes3][7] 
4. 引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：  
![markdown-blockquotes4][8]</blockquote>

## 列表：
Markdown 支持有序列表和无序列表。  

1. 无序列表使用星号列表标记：
![无序列][9]
2. 无序列表使用加号列表标记：
![无序加号][10]
3. 无序列表使用减号列表标记：
![无序减号][11]
4. 有序列表则使用数字接着一个英文句点：
![有序列表数字][12]
5. 列表项目内放进引用，那 > 就需要缩进：
![缩进][13]
6. 要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符：
![代码块缩进][14]
7. 行首出现数字-句点-空白，要避免这样的状况，你可以在句点前面加上反斜杠：
![markdown转义][15]


## 分割线：  
你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：
![][16]

# 二：区段元素
## 链接：  
Markdown 支持两种形式的链接语法： 行内式和参考式两种形式
### 行内式的链接:  
只要在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可    

![][17]

### 参考式的链接:
参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：  

链接内容定义的形式为：

1. 方括号（前面可以选择性地加上至多三个空格来缩进），里面输入链接文字
2. 接着一个冒号
3. 接着一个以上的空格或制表符
4. 接着链接的网址
5. 选择性地接着 title 内容，可以用单引号、双引号或是括弧包着  

下面这四种链接的定义都是相同：    
![链接在文尾的写法][18]      

下面给出一段参考示例和效果：  

![][19]


## 强调
Markdown 使用星号（*）和底线（_）作为标记强调字词的符号，被 * 或 _ 包围的字词会被转成用 &lt;em&gt;  标签包围，用两个 * 或 _ 包起来的话，则会被转成&lt;strong&gt; ，例如：

![强调][20]

## 代码
如果要标记一小段行内代码，你可以用反引号把它包起来（`），例如：

![显示代码][21]

## 图片 
Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式： 行内式和参考式。  

###  行内式的图片语法:

	![Alt text](/path/to/img.jpg)
    ![Alt text](/path/to/img.jpg "Optional title")

内容说明：

* 一个惊叹号 !
* 接着一个方括号，里面放上图片的替代文字
* 接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上 选择性的 'title' 文字。


![内部链式][22]

### 参考式的图片语法
    
    ![Alt text][id]
	[id]: url/to/image  "Optional title attribute"
效果图：  

![图片外链式][23]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-dingus.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-newline.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-title.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-title2.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-blockquotes1.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-blockquotes2.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-blockquotes3.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-blockquotes4.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-disorder-asterisk.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-disorder-plus.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-disorder-minus.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-orderlist-number.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-suojin.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-blockcode-suojin.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-transferred-%20meaning.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-dividing-line.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-intra-link.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown_foot.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-picture-example.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-strong.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-show-code.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-image-innerlink.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/markdown-image-outerlink.png