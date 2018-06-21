---
title: MarkDown开发之——快速入门
date: 2017-11-12 02:12:18
categories: [工具,Markdown] #文章分类目录，可以省略
tags: [语法]

---

>上一篇文章简单介绍了Markdown的安装和破解方法，这篇文章简单介绍下Markdown的语法和使用范例，如果想查看Markdown的HTML输入结果，可以使用[Disgus](https://daringfireball.net/projects/markdown/dingus)，将编写的Markdown文档转成 XHTML。
    ![dispug](http://oz732f72q.bkt.clouddn.com/dingus.png)
<!--more-->
一：区块元素
==========
**段落**：
  
>>一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行。普通段落不该用空格或制表符来缩进。  

**换行**： 
 
>>切换到下一行，下面介绍两种换行方式  
>>>>1.在插入处先按入两个以上的空格然后回车  
>>>>2.使用&lt;/br&gt; 
	![](http://oz732f72q.bkt.clouddn.com/markdown%E6%8D%A2%E8%A1%8C.png)

**标题**： 
 
>>Markdown 支持两种标题的语法，类 Setext 和类 atx 形式。  
>>Setext 形式是用底线的形式，利用 = （最高阶标题）和 - （第二阶标题），任何数量的 = 和 - 都可以有效果。 你可以选择性地「闭合」类 atx 样式的标题，这纯粹只是美观用的，若是觉得这样看起来比较舒适，你就可以在行尾加上 #，而行尾的 # 数量也不用和开头一样（行首的井字符数量决定标题的阶数）:
>![标题](http://oz732f72q.bkt.clouddn.com/markdown%E6%A0%87%E9%A2%98.png)  
>![](http://oz732f72q.bkt.clouddn.com/markdown%E6%A0%87%E9%A2%982.png)

**区块引用 Blockquotes**  
>>1.然后在每行的最前面加上 > ：
> 
>>![](http://oz732f72q.bkt.clouddn.com/markdownblock1.png)
>2.只在整个段落的第一行最前面加上 > ：
>  
>>![](http://oz732f72q.bkt.clouddn.com/markdownblock2.png) 
>3.区块引用可以嵌套，根据层次加上不同数量的 > ：
> 
>>![](http://oz732f72q.bkt.clouddn.com/markdownblock3.png)  
>4.引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：
>   
>>![](http://oz732f72q.bkt.clouddn.com/markdownblock4.png)</blockquote>

**列表**：
>Markdown 支持有序列表和无序列表。  
>
>>1.无序列表使用星号列表标记：
>
>>![无序列](http://oz732f72q.bkt.clouddn.com/markdownlie1.png)
>2.无序列表使用加号列表标记：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E6%97%A0%E5%BA%8F+.png)
>
>>3.无序列表使用减号列表标记：
>![](http://oz732f72q.bkt.clouddn.com/markdown%E6%97%A0%E5%BA%8F-.png)
>4.有序列表则使用数字接着一个英文句点：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E6%9C%89%E5%BA%8F1.png)
>5.列表项目内放进引用，那 > 就需要缩进：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E7%BC%A9%E8%BF%9B1.png)
>6.要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E4%BB%A3%E7%A0%81%E5%9D%97.png)
>7.行首出现数字-句点-空白，要避免这样的状况，你可以在句点前面加上反斜杠：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E9%81%BF%E5%85%8D%E9%94%99%E8%AF%AF.png)


**分割线**：  
>你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：
>![](http://oz732f72q.bkt.clouddn.com/markdown%E5%88%86%E5%89%B2%E7%BA%BF.png)

二：区段元素
================
**链接**：  
>Markdown 支持两种形式的链接语法： 行内式和参考式两种形式
>>**1.1:行内式的链接:**  
>>只要在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E8%A1%8C%E5%86%85%E9%93%BE%E6%8E%A5.png)

>>**1.2:参考式的链接:**
>>参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：  
>
>>链接内容定义的形式为：
>>>* 方括号（前面可以选择性地加上至多三个空格来缩进），里面输入链接文字
>>>* 接着一个冒号
>>>* 接着一个以上的空格或制表符
>>>* 接着链接的网址
>>>* 选择性地接着 title 内容，可以用单引号、双引号或是括弧包着  
>
>>下面这四种链接的定义都是相同：
>>>![](http://oz732f72q.bkt.clouddn.com/markdown_foot.png)       

>>下面给出一段参考示例和效果：

>>![](http://oz732f72q.bkt.clouddn.com/markdown%E5%A4%96%E9%93%BE%E6%8E%A5.png)


**强调**
>Markdown 使用星号（*）和底线（_）作为标记强调字词的符号，被 * 或 _ 包围的字词会被转成用 &lt;em&gt;  标签包围，用两个 * 或 _ 包起来的话，则会被转成&lt;strong&gt; ，例如：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E5%BC%BA%E8%B0%83.png)

**代码**
>如果要标记一小段行内代码，你可以用反引号把它包起来（`），例如：
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E4%BB%A3%E7%A0%81.png)

**图片**  
>Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式： 行内式和参考式。  
>
>**1. 行内式的图片语法:**
>
	![Alt text](/path/to/img.jpg)
    ![Alt text](/path/to/img.jpg "Optional title")

>内容说明：
>>* 一个惊叹号 !
>>* 接着一个方括号，里面放上图片的替代文字
>>* 接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上 选择性的 'title' 文字。
>
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E5%9B%BE%E7%89%87.png)

>**2. 参考式的图片语法**
>    
    ![Alt text][id]
	[id]: url/to/image  "Optional title attribute"
>效果图：
>>![](http://oz732f72q.bkt.clouddn.com/markdown%E5%A4%96%E9%93%BE%E5%BC%8F.png)
