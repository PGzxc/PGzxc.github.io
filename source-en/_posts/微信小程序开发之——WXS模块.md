---
title: 微信小程序开发之——WXS模块
categories:
  - 开发
  - F-跨平台
  - 微信小程序
abbrlink: d1eca38d
date: 2021-11-10 09:50:39
tags:
---
## 一 概述

WXS(WeiXin Script)：是小程序的一套脚本语言，结合`WXML`，可以构建出页面的结构
WXS与JavaScript是不同的语言，有自己的语法，并不和JavaScript一致

* 变量
* 运算符
* 数据类型
* 语句
* 基础类库
* 模块

<!--more-->

## 二 [变量][00]

### 2.1 概念

* 声明变量用`var`
* 变量只声明，不赋值，会被定义为`undefine`
* 没有声明直接赋值使用，会被定义为全局变量

### 2.2 变量的命名规则

* 首字符必须是：字母（a-zA-Z），下划线（_）
* 剩余字符可以是：字母（a-zA-Z），下划线（_）， 数字（0-9）

### 2.3 示例

```
var foo = 1;
var bar = "hello world";
var i; // i === undefined
```

## 三 [运算符][01]

### 3.1 运算符列表

| 编号 |   运算符分类   |                           运算符号                           |                示例                |
| :--: | :------------: | :----------------------------------------------------------: | :--------------------------------: |
|  1   |   基本运算符   |      加法(`+`)/减法(`-`)/乘法(`*`)/除法(`/`)/取余(`%`)       |             var a=1+2;             |
|  2   |   一元运算符   | 自增(`++`)/自减(`--`)/正值(`+`)/负值(`-`)/否(`~`)/取反(`!`)等 |                a++                 |
|  3   |    位运算符    | 左移(`<<`)/右移(`>>`)/无符号右移(`>>>`)/与运算(`&`)/异或运算(`^`)/或运算(`|`) |               a << 3               |
|  4   |   比较运算符   |      小于(`<`)/大于(`>`)/小于等于(`<=`)/大于等于(`>=`)       |               a < b                |
|  5   |   等值运算符   |    等号(`==`)/非等号(`!=`)/全等于(`===`)/非全等号(`!==`)     |               a == b               |
|  6   |   赋值运算符   | 加等(`+=`)/减等(`-=`)/乘等(`*=`)/除等(`/=`)/左移等(`<<=`)等  |              a <<= 10              |
|  7   | 二元逻辑运算符 |                  逻辑与(`&&`)/逻辑或(`\|\|`)                   |               a && b               |
|  8   |   其他运算符   |                    条件运算符/逗号运算符                     | 20 === (a >= 10 ? a + 10 : b + 10) |

### 3.2 运算符优先级

运算符的优先级别从0到20

## 四 [数据类型][]

| 编号 |             数据类型              |              示例              |
| :--: | :-------------------------------: | :----------------------------: |
|  1   |   `number` ： 数值(整数和小数)    |          var a = 10;           |
|  2   | `string` ：字符串(单引号和双引号) |         'hello world';         |
|  3   |         `boolean`：布尔值         |          var a=true;           |
|  4   |      `object`：对象(键值对)       |         {k:"1",v:"2"}          |
|  5   |         `function`：函数          | function a (x) {   return x; } |
|  6   |          `array` : 数组           |          var a = [];           |
|  7   |           `date`：日期            |     var date = getDate();      |
|  8   |          `regexp`：正则           | var a = getRegExp("x", "img")  |

## 五 [语句][03]

| 编号 |    语句    |
| :--: | :--------: |
|  1   |   if语句   |
|  2   | switch语句 |
|  3   |  for语句   |
|  4   | while语句  |

## 六 [基础类库][04]

| 编号 | 基础类库 |             类库说明              |
| :--: | :------: | :-------------------------------: |
|  1   | console  |             输出信息              |
|  2   |   Math   |             数学工具              |
|  3   |   Json   |        Json字符串转换工具         |
|  4   |  Number  |               数字                |
|  5   |   Date   |               日期                |
|  6   |  Global  | 自带的属性(NAN)或方法(parseInt)等 |

## 七 [模块][05]

### 7.1 WXS模块创建的两种方式

WXS 代码可以编写在 wxml 文件中的 `<wxs>` 标签内，或以 `.wxs` 为后缀名的文件内

#### wxs标签

```
<view> {{tools.msg}} </view>
<view> {{tools.bar(tools.FOO)}} </view>

<wxs module="tools">
  var foo = "'hello world' from tools.wxs";
  var bar = function (d) {
    return d;
  }
  module.exports = {
    FOO: foo,
    bar: bar,
  };
  module.exports.msg = "some msg";
</wxs>
```

#### .wxs文件

##### tools.wxs

```
var foo = "'hello world' from tools.wxs";
var bar = function (d) {
  return d;
}
module.exports = {
  FOO: foo,
  bar: bar,
};
module.exports.msg = "some msg";
```

##### 调用wxs的布局文件

```
<wxs src="./../tools.wxs" module="tools" />
<view> {{tools.msg}} </view>
<view> {{tools.bar(tools.FOO)}} </view>
```

#### 页面效果图

![][1]

### 7.2 WXS中的module对象和exports属性

#### module对象

* 在wxml内的wxs标签中使用时`<wxs module="tools">`
* wxml通过src引用外部wxs文件时`<wxs src="./../tools.wxs" module="tools" />`

#### exports属性

* `exports`: 通过该属性，可以对外共享本模块的私有变量与函数

### 7.3 require函数

#### 说明

* 在`.wxs`模块中引用其他 `wxs` 文件模块，可以使用 `require` 函数

#### 示例

##### 被引用wxs文件(tool.wxs)

```
// /pages/tools.wxs

var foo = "'hello world' from tools.wxs";
var bar = function (d) {
  return d;
}
module.exports = {
  FOO: foo,
  bar: bar,
};
module.exports.msg = "some msg";
```

##### 引用wxs文件的wxs文件(logic.wxs)

```
// /pages/logic.wxs

var tools = require("./tools.wxs");

console.log(tools.FOO);
console.log(tools.bar("logic.wxs"));
console.log(tools.msg);
```

### 7.4 `<wxs>`标签

| 属性名 |  类型  |               说明                |
| :----: | :----: | :-------------------------------: |
|  src   | String |      引用.wxs文件的相对路径       |
| module | String | 当前`<wxs>`标签的模块名。必填字段 |

## 八 参考

* [小程序官方文档-WXS 语法参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)





[00]:https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/02variate.html
[01]:https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/04operator.html
[02]:https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/06datatype.html
[03]:https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/05statement.html
[04]:https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/07basiclibrary.html
[05]:https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wxs-two-way-preview.png

