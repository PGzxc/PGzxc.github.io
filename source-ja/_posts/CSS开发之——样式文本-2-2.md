---
title: CSS开发之——样式文本(2.2)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 8ea84926
date: 2020-09-24 21:39:34
---
## 一 概述

* CSS文本属性可定义文本的外观
* 通过文本属性，你可以改变文本的颜色、字符间距、对齐文本、装饰文本、对文本进行缩进等等

<!--more-->

## 二 文本属性

### 2.1 缩进文本

#### 2.1.1 概念

把Web页面上的段落的第一行缩进，这是一种最常见的文本格式化的效果

CSS提供了text-indent属性，该属性可以方便地实现文本缩进

通过使用text-indent属性，所有元素的第一行都可以缩进一个给定的长度，甚至该长度可以是负值

这个属性最常见的用途是将段落的首行缩进，下面的规则会使所有段落的首行缩进5em

```
p{text-indent:5em;}
```

<font color="red">注意：</font>一般来说，可以为所有块级元素应用text-indent，但无法将该属性应用于行内元素，图像之类的替换元素上也无法应用text-indent属性。不过，如果一个块级元素(比如段落)的首行中有一个图像，它会随着该行的其余文本移动

<font color="orange">提示：</font>如果想把一个行内元素的第一行"缩进"，可以用左内边距或外边距创造这种效果。

#### 2.1.2 使用负值

text-indent还可以设置负值。利用这种技术，可以实现很多有趣的效果。比如"悬挂缩进"，即第一行悬挂在元素中余下部分的左边：

```
p{text-indent:-5em;}
```

不过在为text-indent设置负值时要当心，如果对一个段落设置了负值，那么首行的某些文本可能会超出浏览器窗口的左边界。为了避免出现这种显示问题，建议针对负缩进再设置一个外边距或一些内边距：

```
p{text-indent:-5em;padding-left:5em;}
```

#### 2.1.3 使用百分比值

text-indent可以使用所有长度单位，包括百分比值。

百分数要相对于缩进元素父元素的宽度。换句话说，如果将缩进值设置为20%，所影响元素的第一行会缩进其父元素宽度的20%

在下例中，缩进值是父元素的20%，即100个像素：

```
div{width:500px;}
p{text-indent:20%;}

<div>
<p>this is a paragraph</p>
</div>
```

#### 2.1.4 继承

text-indent属性可以继承，请考虑如下标记：

```
div#out{width:500px;}
div#inner{text-indent:10%;}
p{width:200px;}

<div id="outer">
<div id="inner">some text.some text.some text.
<p>this is a paragraph.</p>
</div>
</div>
```

以上标记中的段落也会缩进50像素，这是因为这个段落继承了id为inner的div元素的缩进值

### 2.2 水平对齐

#### 2.2.1 概念

text-align是一个基本的属性，它会影响一个元素中的文本行相互之间的对齐方式。它的前3个值相当直接，不过第4个和第5个则略有些复杂。

值left、right和center会导致元素中的文本分别左对齐、右对齐和居中

西方语言都是从左向右读，所有text-align的默认值是left。文本在左边界对齐，有边界呈锯齿状(称为"从左向右"文本)。对于希伯来语和阿拉伯语之类的语言，text-align则默认为right，因为这些语言从右向左读。不出所料，center会使每个文本行在元素中居中。

<font color="orange">提示：</font>将块级元素或表元素居中，要通过在这些元素上适当地设置左、右边距来实现。

#### 2.2.2 text-align:center与\<CENTER>

你可能会认为text-align:center与\<CENTER>元素的作用一样，但实际上二者大不相同。

\<CENTER>不仅影响文本，还会把整个元素居中。text-align不会控制元素的对齐，而只影响内部内容。元素本身不会从一段移到另一端，只是其中的文本受影响

#### 2.2.3 justify

最后一个水平对齐属性是justify

在两端对齐文本中，文本行的左右两端都放在父元素的内边界上。然后，调整单词和字母间的间隔，使各行的长度恰好相等。你也许已经注意到了，两端对齐文本在打印领域很常见。

需要注意的是，要由用户代理(而不是CSS)来确定两端对齐文本如何拉伸，以填满父元素左右边界之间的空间。

### 2.3 字间隔与字母间距

#### 2.3.1 字间距

word-spacing属性可以改变字(单词)之间的标准间隔。其默认值normal与设置值为0是一样的。

word-spacing属性接受一个正长度值或负长度值。如果提供一个正长度值，那么字之间的间隔就会增加。为word-spacing设置一个负值，会把它拉近：

```
p.spread{word-spacing:30px;}
p.tight{word-spacing:-0.5em;}

<p class="spread">
This is a paragraph.The spaces between words will be increased.
</p>
<p class="tight">
This is a paragraph.The spaces between words will be decreased.
</>
```

#### 2.3.2 字母间距

letter-spacing属性与word-spacing的区别在于，字母间隔修改的是字符或字母之间的间隔。

与word-spacing属性一样，letter-spacing属性的可取值包括所有长度。默认关键字是normal(这与letter-spacing:0 相同)。输入的长度会使字母之间的间隔增加或减少指定的量

```
h1{letter-spacing:-0.5em}
h4{letter-spacing:20px}

<h1>This is header 1</h1>
<h4>This is header 4</h4>
```

### 2.4 字符转换

text-transform属性处理文本的大小写。这个属性有4个值：

* none
* uppercase
* lowercase
* capitalize

默认值none对文本不做任何改动，将使用源文档中的原有大小写。顾名思义，uppercase和lowercase将文本转换为全大写和全小写字符。最后，capitalize只对每个单词的首字母大写

作为一个属性，text-transform可能无关紧要，不过如果你突然决定把所有h1元素变为大写，这个属性就很有用。不必单独地修改所有h1元素的内容，只需使用text-trainsform为你完成这个修改：

```
h1{text-transform:uppercase}
```

使用text-transform有两个方面的好处。首先，只需写一个简单的规则来完成这个修改，而无需修改h1元素本身。其次，如果你以后决定将所有大小写再切换为原来的大小写，可以更容易地完成修改。

### 2.5 文本装饰

接下来，我们讨论text-decoration属性，这是一个很有意思的属性，它提供了很多非常有趣的行为

text-decoration有5个值：

* none
* underline
* overline
* line-through
* blink

不出所料，underline会对元素加下划线，就像HTML中的U元素一样。overline的作用恰好相反，会在文本的顶端画一个上划线。值line-through则在文本中间画一个贯穿线。等价于HTML中的S和strike元素。blink会让文本闪烁，类似于Netscape支持的颇招非议的blink标记

none值会关闭原本应用到一个元素上的所有装饰。通常，无装饰的文本是默认外观，但也不总是这样。例如，链接默认地会有下环线。如果你希望去掉超链接的下环线，可以使用以下CSS来做到这一点：

```
a{text-decoration:none;}
```

<font color="red">注意：</font>如果显式地用这样一个规则去掉链接的下环线，那么瞄与正常文本之间在视觉上的唯一差别就是颜色(至少默认是这样的，不过也不能完全保证其颜色肯定有区别)

还可以在一个规则中结合多种装饰。如果希望所有超链接既有下环线，又有上划线，则规则如下：

```
a:link a:visited{text-decoration:underline overline;}
```

不过需要注意的是，如果两个不同的装饰都与同一元素匹配，胜出规则的值会完全取代另一个值。请考虑以下的规则：

```
h2.stricken{text-decoration:line-through}
h2{text-decoration:underline overline;}
```

对于给定的规则，所有class为stricken的h2元素都只有一个贯穿线装饰，而没有下划线和上划线，因为text-decoration值会替换而不是累积起来

### 2.6 处理空白符

#### 2.6.1 概念

white-space属性会影响到用户代理对源文档中的空格、换行和tab字符的处理

通过使用该属性，可以影响浏览器处理字之间和文本行之间的空白符的方式。从某种程度上讲，默认的XHTML处理已经完成了空白符的处理：它会把所有空白符合并为一个空格。所以给定以下标记，它在Web浏览器中显示时，各个字之间只会显示一个空格，同时忽略元素中的换行：

```
<p>This     paragraph has    many
    spaces           in it.</p>
```

可以用以下声明显式地设置这种默认行为：

```
p{white-space:noraml;}
```

上面的规则告诉浏览器按照平常的做法去处理：丢掉多余的空白符。如果给定这个值，换行字符(回车)会转换为空格，一行中多个空格的序列也会转换为一个空格

#### 2.6.2 值pre

不过，如果将white-space设置为pre，受这个属性影响的元素中，空白符的处理有所不同，其行为就像XHTML的pre元素一样；空白符不会被忽略。

如果white-space属性的值为pre，浏览器将会注意额外的空格，甚至回车。在这个方面，而且仅在这个方面，任何元素都可以相当于一个pre元素

<font color="red">注意：</font>经测试，IE 7以及更早版本的浏览器不支持该值，因此请使用非IE的浏览器来查看上面的实例

#### 2.6.3 值pre-wrap和pre-line

CSS2.1引入了值pre-wrap和pre-line，这在以前版本的CSS中是没有的。这些值的作用是允许创作人员更好地控制空白符处理。

如果元素的white-space设置为pre-wrap，那么该元素中的文本会保留空白符序列，但是文本行会正常地换行。如果设置为这个值，源文本中的行分隔符以及生成的行分隔符也会保留。pre-line与pre-wrap相反，会像正常文本中一样合并空白符序列，但保留换行符

<font color="red">注意：</font>我们在IE7和FireFox2.0浏览器中测试了上面的两个实例，但是结果是，值pre-wrap和pre-line都没有得到很好的支持。

#### 2.6.4 总结

下面的表格总结了white-space属性的行为：

|    值    | 空白符 | 换行符 | 自动换行 |
| :------: | :----: | :----: | :------: |
| pre-lien |  合并  |  保留  |   允许   |
|  normal  |  合并  |  忽略  |   允许   |
|  nowrap  |  合并  |  忽略  |  不允许  |
|   pre    |  保留  |  保留  |  不允许  |
| pre-wrap |  保留  |  保留  |   允许   |

#### 2.6.5 文本方向

如果你阅读的是英文书籍，就会从左到右、从上到下地阅读，这就是应为的流方向。不过，并不是所有语言都如此。我们知道古汉语就是从右到左来阅读的，当然还包括希伯来语和阿拉伯语等等。CSS2引入了一个属性来描述其方向性。

direction属性影响块级元素中文本的书写方向、表中列布局的方向、内容水平填充其元素框的方向、以及两端对齐元素中最后一行的位置

**注释：**对于行内元素，只有当unicode-bidi属性设置为embed或bidi-override时才会应用direction属性

direction属性有两个值：ltr和rtl。大多数情况下，默认值是ltr，显示从左到右的文本。如果显示从右到左的文本，应使用值rtl。

## 三 CSS文本属性

|      属性       |                          描述                          |
| :-------------: | :----------------------------------------------------: |
|      color      |                      设置文本颜色                      |
|    direction    |                      设置文本方向                      |
|   line-height   |                        设置行高                        |
| letter-spacing  |                      设置字符间距                      |
|   text-align    |                    对齐元素中的文本                    |
| text-decoration |                     向文本添加修饰                     |
|   text-indent   |                  缩进元素中文本的首行                  |
|   text-shadow   | 设置文本阴影。CSS2包含该属性，但是CSS2.1没有保留该属性 |
| text-transform  |                    控制元素中的字母                    |
|  unicode-bidi   |                      设置文本方向                      |
|   white-space   |                设置元素中空板的处理方式                |
|  word-spacing   |                       设置字间距                       |

