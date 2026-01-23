---
title: Excel表格之——某一列生成UUID
categories:
  - 文档
  - Excel
tags:
  - Excel
abbrlink: 25ee8c8e
date: 2021-01-26 17:19:12
---
## 一 使用说明

将Navicat表格中的数据，导出为Excel文件，并使用Excel添加数据时，可能id字段需要一些UUID数据

<!--more-->

## 二 制作过程

### 2.1 uuid格式

#### 2.1.1 600d65bc-948a-1260-2217-fd8dfeebb1cd

```
=LOWER(CONCATENATE(DEC2HEX(RANDBETWEEN(0,POWER(16,8)),8),"-",DEC2HEX(RANDBETWEEN(0,POWER(16,4)),4),"-","4",DEC2HEX(RANDBETWEEN(0,POWER(16,3)),3),"-",DEC2HEX(RANDBETWEEN(8,11)),DEC2HEX(RANDBETWEEN(0,POWER(16,3)),3),"-",DEC2HEX(RANDBETWEEN(0,POWER(16,8)),8),DEC2HEX(RANDBETWEEN(0,POWER(16,4)),4)))
```

#### 2.1.2 600d65bc948a12602217fd8dfeebb1cd

```
=LOWER(CONCATENATE(DEC2HEX(RANDBETWEEN(0,POWER(16,8)),8),"",DEC2HEX(RANDBETWEEN(0,POWER(16,4)),4),"","4",DEC2HEX(RANDBETWEEN(0,POWER(16,3)),3),"",DEC2HEX(RANDBETWEEN(8,11)),DEC2HEX(RANDBETWEEN(0,POWER(16,3)),3),"",DEC2HEX(RANDBETWEEN(0,POWER(16,8)),8),DEC2HEX(RANDBETWEEN(0,POWER(16,4)),4)))
```

#### 2.1.3 4E3B14BBECF37B2E-A5A2FE6E1A52DE6A 

```
=CONCATENATE(DEC2HEX(RANDBETWEEN(0,POWER(16,8)),8),"",DEC2HEX(RANDBETWEEN(0,POWER(16,4)),4),"","4",DEC2HEX(RANDBETWEEN(0,POWER(16,3)),3),"",DEC2HEX(RANDBETWEEN(8,11)),DEC2HEX(RANDBETWEEN(0,POWER(16,3)),3),"",DEC2HEX(RANDBETWEEN(0,POWER(16,8)),8),DEC2HEX(RANDBETWEEN(0,POWER(16,4)),4))
```

### 2.2 制作过程

将鼠标定位到要生成uuid的表格中
![][1]

将uuid格式复制到如图所示位置，鼠标表格处生成uuid，向下拖动依次生成其他uuid
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-excel/excel-uuid-table-select.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-excel/excel-uuid-make.gif