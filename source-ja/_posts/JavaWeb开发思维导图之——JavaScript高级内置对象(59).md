---
title: JavaWeb开发思维导图之——JavaScript高级内置对象(59)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 36a93d52
date: 2025-02-18 09:38:07
---
## 一 概述

* 数字日期
* 字符串
* 数组集合
* 结构化数据(JSON)


<!--more-->

## 二 内容详情

### 2.1 内置对象概述

内置对象是JavaScript提供的带有属性和方法的特殊数据类型

### 2.2 数字日期

1-Number

* 1-常用方法：1-parseFloat() //将字符串浮点数转为浮点数、2-parseInt()//将字符串转为整数
* 2-示例：Number.parseInt("100")

2-Math

* 1-常用方法：1-ceil(x)//向上取整、2-floor(x)//向下取整、3-round(x)//四舍五入、4-random()//随机数,0.0~1.0、5-pow(x,y)//x的y次方
* 2-示例：Math.pwo(2,3)

3-Date

* 1-构造方法：1-Date()//根据当前创建对象、2-Date(value)//根据指定毫秒值创建对象、3-Date(year,month,..)//根据指定字段创建
* 2-成员方法：1-getFullYear()//获取年份、2-getMonth()//获取月份、3-getDate()//获取天数
* 3-示例：let d1=new Date()

### 2.3 字符串

1-String

* 1-构造方法：1-String(value)//根据指定字符串创建对象、2-let s="字符串"//直接赋值
* 2-成员方法：1-length属性//获取字符串长度、2-charAt(index)//获取指定索引处的字符。。
* 3-示例：let s="hello"

2-RegExp

* 1-正则表达式: 是一种对字符串进行匹配的规则
* 2-构造方法：1-RegExp(规则)//根据指定规则创建对象、2-let reg=/^规则$/ //直接赋值
* 3-成员方法：test(匹配的字符串)//根据指定规则验证字符串是否符合

### 2.4 数组集合

1-Array

* 1-成员方法：1-push(元素) //添加元素到数组末尾、2-pop()//删除数组末尾的元素、3-shift()
* 2-示例：let arr=[1,2,3,4,5];、arr.push(6)

2-Set

* 1-说明: 元素唯一，存取顺序一致
* 2-构造方法：Set() //创建Set集合对象
* 3-成员方法：1-add(元素)//向集合中添加元素、2-size属性//获取集合长度
* 4-示例：let s= new Set();、s.add("a")

3-Map

* 1-说明: key唯一，存取顺序一致
* 2-构造方法：Map() //创建Map集合对象
* 3-成员方法：1-set(key,value)//向集合中添加元素、2-size属性//获取集合长度
* 4-示例：let m= new Map();、m.set("张三",23)

### 2.5 结构化数据(JSON)

1-说明

* 1-JavaScript Object Notation缩写
* 2-1种轻量级的数据交换格式

2-成员方法

* 1-stringfy(对象)//将指定对象转为json格式字符串
* 2-parse(字符串)//将指定json格式字符串解析成对象

3-示例:let weather={city:"北京",wendu:"10~23"}

## 三 思维导图

![javaweb-xmind-javascript-object-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-javascript-object-7.png