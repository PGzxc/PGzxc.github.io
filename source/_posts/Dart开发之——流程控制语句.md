---
title: Dart开发之——流程控制语句
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: 618707bb
date: 2021-02-07 11:22:33
---
## 一 概述

简单介绍下Dart中的流程控制语句：

* 条件分支语句(if else)
* 循环语句(while/do while/for)
* 中断语句(break/continue)
* 选择语句(switch..case)

<!--more-->

## 二 条件分支语句(if else)

### 2.1 说明

* 当判定值或表达式符合条件时，执行预定的代码和逻辑
* 常见的条件分支语句有：if/if else/if else if

### 2.2 示例

```
main() {
  var n = 100;
  if (n < 60) {
    print("不及格");
  } else if (n < 85) {
    print("良好");
  } else if (n < 100) {
    print("优秀");
  } else {
    print("满分");
  }
}
```

## 三 循环语句(while/do while/for/for in)

### 3.1 说明

* 当需要完成大量且重复的计算时，使用循环语句
* 循环语句用于重复执行某段代码

### 3.2 while循环

```
main() {
  var i = 0;
  var total = 0;
  while (i <= 10) {
    total += i;
    i++;
  }
  print(total);
}
```

### 3.3 do while循环

```
main() {
  var i = 0;
  var total = 0;
  do {
    total += i;
    i++;
  } while (i <= 10);
  print(total);
}  
```

### 3.4 for循环

```
main() {
  var total=0;
  for (int i = 0; i <= 10; i++) {
    total+=i;
  }
  print(total);
}  
```

### 3.5 for in

```
main() {
  var array = [1, 2, 3, 4];
  for (var number in array) {
    print(number);
  }
}
```

## 四 中断语句(break/continue)

### 4.1 说明

* break和continue都用在循环控制语句中，用于中断循环
* continue：不会中断循环，跳过满足条件的本次循环，接着下一次循环
* break：循环/判断语句中，退出循环

### 4.2 continue

执行代码

```
main() {
  int total=0;
  for (int i = 0; i <= 10; i++) {
    if (i % 2 == 0) {
      continue;
    }
    total+=i;
    print("total=$total,i=$i");
  }
  print("total=$total");
}
```

输出结果：

```
total=1,i=1
total=4,i=3
total=9,i=5
total=16,i=7
total=25,i=9
total=25
```

### 4.3 break

执行代码

```
main() {
  int total=0;
  for (int i = 0; i <= 10; i++) {
    if (i % 2 == 0) {
      break;
    }
    total+=i;
    print("total=$total,i=$i");
  }
  print("total=$total");
}
```

输出结果：

```
total=0
```

## 五 选择语句(switch..case)

### 5.1 说明

* 选择语句有if-else和switch
* 效率上：多路分支时，switch比if else效率高
* 适用范围：布尔类型用if，基本数据类型及字符串用switch..case

### 5.2 示例

```
main() {
  var color = 'red';
  switch (color) {
    case 'red':
      print("red");
      break;
    case 'yellow':
      print("yellow");
      break;
    case 'blue':
      print("blue");
      break;
    default:
      print("unknown color");
  }
}
```