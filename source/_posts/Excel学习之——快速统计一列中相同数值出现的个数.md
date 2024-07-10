---
title: Excel学习之——快速统计一列中相同数值出现的个数
categories:
  - 文档
  - Excel
tags:
  - 统计
abbrlink: 2a04be5d
date: 2019-11-03 10:50:48
---
## 一 前言

最近再对Excel表格中的数据进行处理，然后导入到MATLAB中进行分析，但是Excel中如何快速统计一列中相同数值出现的个数呢，经过一番折腾后，稍微总结下经验
<!--more-->
## 二 工具及需求
### 2.1 工具
* excel  

### 2.2 需求
* 统计一列中相同数值出现的个数
![][1]

## 三 步骤
* **选中要统计的数据，选择【插入】-【数据透视表】**  
![][2]
* **按照默认设置，在新工作表中创建数据透视表，点击【确定】按钮**
![][3]
* **在新出现的透视表区域，用鼠标单击任何一个单元格。然后把【分数】字段分别拖到【行标签】和【数值】两个方框中去**
![][4]
* **此时，新生成统计表中，显示的是求和，不符合计数原则**
![][5]
* **点击【数值】处【分数】字段显示的是“求和”，点击该字段，如下图设置成“计数”，然后确定即可**
![][6]
* **至此，统计一列中相同数值出现的个数已完成**
![][7]
* **表格数据修改及美化(选中表格->设置单元格格式-边框)**
![][8]
* **最终效果**
![][9]

## 四 参考
* [excel如何快速统计一列中相同数值出现的个数][10]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-raw-data.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-insert-table.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-select-raw-data.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-drag-line-value.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-raw-sum.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-change-num.gif
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-make-right.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-table-border-set.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/excel-statis-number.png
[10]:https://jingyan.baidu.com/article/9113f81b2c16822b3214c785.html
