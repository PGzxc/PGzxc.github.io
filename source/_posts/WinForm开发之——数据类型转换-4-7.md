---
title: 'WinForm开发之——数据类型转换(4.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 711f2cc0
date: 2020-07-16 23:31:07
---
## 一 概述

* 我们知道C#是一门强类型语言，对类型要求比较严格，但是在一定的条件下也是可以相互转换的，如将int型数据转换为double型数据
* C#允许使用两种转换方式：隐式类型转换和显示类型转换

<!--more-->

## 二 隐式类型转换和显示类型转换

### 2.1 隐式类型转换

* 这些转换是C#默认的以安全方式进行的转换，不会导致数据丢失。
* 例如，从小的整数类型转换为大的整数类型，从派生类转换为基类

### 2.2 显示类型转换

* 显示类型转换，及强制类型转换。显示转换需要强制转换运算符，而且强制转换会造成数据丢失

* 常用的类型转换方法如下：

  |  **方法**  |                   **描述**                    |
  | :--------: | :-------------------------------------------: |
  | ToBoolean  |       如果可能的话，把类型转换为布尔型        |
  |   ToBtye   |             把类型转换为字节类型              |
  |   ToChar   | 如果可能的话，把类型转换为单个Unicode字符类型 |
  | ToDateTime | 把类型(整型或字符串类型)转换为日期-时间 结构  |
  | ToDecimal  |      把浮点型或整数类型转换为十进制类型       |
  |  ToDouble  |           把类型转换为双精度浮点型            |
  |  ToInt16   |           把类型转换为16位整型类型            |
  |  ToInt32   |           把类型转换为32位整数类型            |
  |  ToInt64   |          把类型转换为 64 位整数类型           |
  |  ToSbyte   |          把类型转换为有符号字节类型           |
  |  ToSingle  |           把类型转换为小浮点数类型            |
  |  ToString  |            把类型转换为字符串类型             |
  |   ToType   |             把类型转换为指定类型              |
  |  ToUInt16  |       把类型转换为 16 位无符号整数类型        |
  |  ToUInt32  |       把类型转换为 32 位无符号整数类型        |
  |  ToUInt64  |       把类型转换为 64 位无符号整数类型        |

## 三 隐式数据类型转换
### 3.1 转换说明
* 在C#语言中隐式转换是指不需要其他方法数据类型直接即可转换

* 隐式转换主要是在整型、浮点型之间的转换，将存储范围小的数据类型直接转换成存储范围大的数据类型

* 例如将int类型的值转换成double类型的值，将int类型的值转换成long类型的值，或者将float类型的值转换成double类型的值

  ```
  int a = 100;
  double d = a;  //将int类型转换为double类型
  float f = 3.14f;
  d = f;    //将float类型转换为double类型
  ```

### 3.2 隐式转换几种情况

*  从 sbyte 类型到 short,int,long,float,double,或 decimal 类型 
*  从 byte 类型到 short,ushort,int,uint,long,ulong,float,double,或 decimal 类型 
*  从 short 类型到 int,long,float,double,或 decimal 类型 
*  从 ushort 类型到 int,uint,long,ulong,float,double,或 decimal 类型 
*  从 int 类型到 long,float,double,或 decimal 类型 
*  从 uint 类型到 long,ulong,float,double,或 decimal 类型 
*  从 long 类型到 float,double,或 decimal 类型 
*  从 ulong 类型到 float,double,或 decimal 类型 
*  从 char 类型到 ushort,int,uint,long,ulong,float,double,或 decimal 类型 
*  从 float 类型到 double 类型 

## 四 强制数据类型转换
### 4.1 强制转换
*  强制类型转换主要用于将存储范围大的数据类型转换成存储范围小的，但数据类型需要兼容 
*  例如 int 型转换成 float 型是可行的，但 float 型转换成 int 型则会造成数据精度丢失，而且字符串类型与整数类型之间是无法进行强制类型转换的 

### 4.2 转换形式

```
数据类型变量名 = (数据类型)  变量名或值;
```

*  这里要求等号左、右两边的数据类型是一致的。例如将 double 类型转换成 int 类型，代码如下 

  ```
  double dbl_num = 12345678910.456;
  int k = (int) dbl_num ;//此处运用了强制转换
  ```

*  这样虽然能将值进行类型的转换，但损失了数据的精度，造成了数据的不准确，因此在使用强制类型转换时还需要注意数据的准确性 