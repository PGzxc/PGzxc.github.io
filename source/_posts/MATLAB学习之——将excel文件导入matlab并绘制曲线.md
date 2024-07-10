---
title: MATLAB学习之——将excel文件导入matlab并绘制曲线
categories:
  - 工具
  - MATLAB
tags:
  - 绘制
abbrlink: 3394915f
date: 2019-11-03 10:59:51
---
## 一 概述

* 我们通常用Excel记录一些测试数据，然后将Excel中的数据导入到别的软件如MATLAB中进行数据的处理和分析，然后绘制成图形。 

* 本文主要介绍将excel文件中的数据导入到MATLAB中，并绘制plot曲线

<!--more-->

## 二 原料

* 电脑
* excel
* matlab

## 三 步骤
### 3.1 数据导入及处理

* MATLAB项目打开后，如图所示
![][1]
* 依次点击：主页->导入数据->选择excel文件所在的路径
![][2]
* 在打开的导入数据对话框中，选择首先导入的列数，选择输出类型为“列向量"，确认后，点击导入所选内容
![][3]
* 对导入的数据变量名进行修改(方便识别)
![][4]  
* 或在名称上右键显示更多选项
![][5]

#### 3.2 根据数据进行显示

#### 3.2.1 选中数据，由软件直接生成图形

* 按住Ctrl键，依次选中工作区的X Y，右键选中plot(X,Y)
![][6]

* 绘制完后会，如图
![][7]

* 绘制的图形没有x，y，及标题说明，点击插入分别完成以上声明
![][8]

#### 3.2.2 使用绘制曲线函数plot函数

* 依次打开：主页->新建->新建实时脚本，打开实时编辑器
![][9]

* 在编辑器内输入plot，根据提示输入参数
![][10]
* 切换到实时编辑器选项卡，点击运行，根据参数显示出图像
![][11]
* 同理，要显示X,Y坐标及标题，进行函数输入
![][12]
* 把图标放到图形上，点击右上角的在图形窗口中打开，可以单独显示
![][13]

## 四 参考
* [如何将excel文件导入matlab并绘制曲线][14]
* [如何用matlab导入文件中的数据][15]
* [MATLAB中plot函数的用法][16]
* [MATLAB plot 函数][17]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-draw-project.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-draw-import-data-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-import-excel-sele-data-type.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-import-excel-change-name.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-import-excel-show-more.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-draw-software-plot.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-software-plot-finish.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-plot-insert-x-y-table.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-new-script.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-function-plot.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-function-run.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-function-x-y-table.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/matlab-draw-open-dialog.png
[14]:https://jingyan.baidu.com/article/adc81513a396c6f723bf73f3.html
[15]:https://jingyan.baidu.com/article/1974b2894f3f6df4b1f7743d.html
[16]:https://blog.csdn.net/xuxinrk/article/details/80051238
[17]:https://baike.baidu.com/item/plot/10776857?fr=aladdin