---
title: Dart开发之——数据类型
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: 558e15c2
date: 2021-01-22 17:09:05
---
Dart内置了7类数据类型，分别是：

* 数值类型(int，double)
* 字符串类型(单引号\'\'和双引号\"\")
* 布尔类型(true和false)
* 数组类型(`[]`)
* 字典类型(`map`)
* 字符类型(`Runes`)
* 符号类型(`Symbol`)

<!--more-->

## 二 数值类型(int，double)

### 2.1 说明

Dart中，数值类型有两种：

* 整数类型(int)
* 小数类型(double)

### 2.2 创建数值变量

#### 2.2.1 整数

```
int a=1;
var b=2;
```

#### 2.2.2 小数

```
double c=3.14;
var d=1.4e2;
```

### 2.3 常用的属性

```
var a=1;
```

运行时类型

```
a.runtimeType;
```

是否为有限值或无限值

```
a.isFinite;
a.isInfinite;
```

是否为非数值

```
a.isNaN;
```

是否为负数

```
a.isNegative;
```

当前数值的符号(1:整数，-1：负数，0：数值为0)

```
a.sign;
```

获取存储当前数值需要的最少位数

```
a.bitLength;
```

是否为奇数(Odd)偶数(Even)

```
a.isEven;
a.isOdd;
```

### 2.4 常用的方法及函数

```
var a=1;
var b=1.1;
```

#### 2.4.1 整数+小数

当前数的绝对值

```
a.abs();
```

不小于当前数值的最小整数&小数

```
a.ceil();
b.ceilToDouble();
```

指定范围内最近的值

```
a.clamp(1,10);
```

两个数比较(大于返回1，小于返回-1，等于返回0)

```
a.compareTo(b);
```

返回不小于当前数值的最大整数&小数

```
a.floor();
b.floorToDouble();
```

除以参数后的余数

```
a.remainder(5);
```

四舍五入值

```
a.round();
b.roundToDouble();
```

当前值转换为小数

```
a.toDouble();
```

当前值转换成整数

```
b.toInt();
```

当前值转换成字符串

```
a.toString();
```

丢弃小数部分返回整数

```
a.truncate();
b.truncateToDouble();
```

#### 2.4.2 整数

最大约数

```
a.gcd(2);
```

求模逆运算

```
a.modInverse(6);
```

幂运算后再取模

```
a.modPow(3,5);
```

## 三 字符串类型(单引号\'\'和双引号\"\")

### 3.1 说明

在Dart中，使用单引号('\')或者双引号(\"\")来创建字符串

### 3.2 字符串创建示例

```
 var str1='Hello';
 String str2="Word";
 var str3=String.fromCharCode(97);
 var str4=String.fromCharCodes([97,98,99]);
```

### 3.3 字符串格式化

字符串格式化

```
 var name="World";
 var str1="Hello ${name}";
 var str2="Hello $name";
```

数值计算

```
var num1=1;
var num2=2;
print("1+2=${num1+num2}");
```

字符串拼接

```
 var str1="Hello";
 var str2="World";
 print(str1+str2);
 
 print("hello" "world");
```

3对单引号或者3对双引号

```
 var str1=''' 
      第一行
      第二行
      第三行
 ''';
 print(str1);
```

转义字符('\\')

```
print("Hello \n World");
```

### 3.4 字符串属性

```
var str="Hello";
```

获取字符串的字符码集合

```
str.codeUnits;
```

字符串是否为空&非空

```
str.isEmpty;
str.isNotEmpty;
```

字符串的长度

```
str.length;
```

字符串的类型

```
str.runtimeType;
```

### 3.5 字符串中相应的方法

```
var str="Hello";
```

获取字符串中某个字符的code码(下标从0开始)

```
str.codeUnitAt(0);
```

字符串比较(逐个字符进行code比较)

```
str.compareTo('a');
```

当前字符串是否包含指定参数('l')

```
str.contains('l');
```

以某个字符串开始

```
str.startWith("He");
```

以某个字符串结尾

```
str.endWith("llo");
```

某个字符在当前字符串中的位置

```
str.indexOf('l');
```

左字符串补齐

```
str.padLeft(10,'*');
```

右字符串补齐

```
str.padRight(10,'&');
```

匹配字符串替换

```
str.replaceAll('o','p');
```

指定范围字符串替换

```
str.replaceRange(0,3,"000");
```

字符串切割

```
str.splite('e');
```

字符串截取

```
str.substring(1,3);
```

全部转换为大写&小写

```
str.toLowerCase();
str.toUpperCase();
```

去除空格

```
str.trim(); //去除尾部空格
str.trimLeft();//去除首部空格
str.trimRight();//去除尾部空格
```

字符串拷贝('*')

```
"hello"*2;
```

## 四 布尔类型(true和false)

### 4.1 说明

Dart中，布尔类型只有两个值：true和false

### 4.2 创建布尔类型

```
var a=true;
bool b=false;
```

### 4.3 布尔类型属性

获取类型

```
a.runtimeType;
```

## 五 数组类型(`[]`)

### 5.1 数组类型创建

```
var list1 = List.empty();//空数组
List<int> list2 = [1, 2, 3, 4];
List<dynamic> list3 = [1, 2, 3, 4, '5'];
var list4=[1,2,3,4,'5'];
var list5 = List.filled(3, 1);
var list6 = List.from(list2);
```

### 5.2 数组常用属性

```
var list=[1,2];
```

获取列表的第一个元素

```
list.first;
```

获取列表的最后一个元素

```
list.last;
```

获取列表的元素长度

```
list.length;
```

### 5.3 数组取值或设置值

数组某一位的值

```
['a','b','c'][1];
```

数组相加

```
[1,2]+[2,3];
```

### 5.3 数组中的方法

```
var list=[];
```

数组中添加元素&集合

```
list.add(1);
list.addAll([2,3]);
```

数组变字典

```
list.asMap();
```

数组指定范围元素替换

```
list.fillRange(0,2,'a');
```

获取指定范围内的元素集合

```
list.getRange(0,3);
```

查找某个元素的下标(从前找或从后查找)

```
list.indexOf('a');
list.lastIndexOf('a');
```

插入元素或集合

```
list.insert(0,'s');
list.insertAll(0,['a','b','c']);
```

删除元素

```
list.remove('a');
list.removeAt(0);
list.removeLast();
list.removeRange(0,2);
```

元素替换

```
list.replaceRange(0,2,[1,2]);
```

数组截取

```
list.sublist(0,3);
```

数组包含

```
list.contains(2);
```

数组拼接为字符串

```
list.join('-');
```

数组转换为字符串

```
list.toString();
```

删除所有元素

```
list.clear();
```

## 六 字典类型(`map`)

### 6.1 说明

* 字典是一组键值对的集合
* 通过键可以完成对值的修改、查找、添加、删除
* 字典类型叫做Map

### 6.2 Map类型创建

```
 var map1={
    "name":"张三",
    "age":10
  };
  Map<String,int> map2={"1":1,"2":2};
  var map={};
```

### 6.3 Map常用的属性

Map是否为空&非空

```
map1.isEmpty;
map1.isNotEmpty;
```

所有的键&所有的值

```
map1.keys;
map1.values;
```

键值对的个数

```
map1.length;
```

类型

```
map1.runtimeType;
```

### 6.4 Map中常用的方法

添加键值对

```
map.addAll({"name":"Lucy","age":18});
```

是否存在某个键&值

```
map.containsKey("name");
map.containsValue("Lucy");
```

删除键值对

```
map.remove("name");
```

转换 为字符串

```
map.toString();
```

清空键值对

```
map.clear();
```

## 七 字符类型(`Runes`)

### 7.1 说明

* Runes创建时，传入String类型字符串
* 构建完成后，返回对应的字符编码

### 7.2 Runes类型创建

```
 var a = Runes("hello");
 Runes b=new Runes("world");
 var c=Runes('h');
```

### 7.3 Runes中常用属性

获取Runes中第一个&最后一个字符码

```
a.first;
a.last;
```

Runes字符串

```
a.string;
```

Renes字符串长度

```
a.length;
```

Runes是否空&非空

```
a.isEmpty;
a.isNotEmpty;
```

单个字符串(字符串元素个数为1时)

```
c.single
```

类型

```
a.runtimeType
```

### 7.4 Runes中常用方法

是否包含某个字符串编码

```
a.contains(104);// 104-c
```

第几个元素是

```
a.elementAt(1); //101
```

连接起来

```
a.join('-');//104-101-108-108-111
```

## 八 符号类型(`Symbol`)

### 8.1 说明

* 将某些String类型，包装成Symbol

### 8.2 Symbol类型创建

```
 var symbol1=Symbol("Hello");
 Symbol symbol2=new Symbol("World");
```

### 8.3 Symbol常用属性

获取类型

```
symbol1.runtimeType;
```

