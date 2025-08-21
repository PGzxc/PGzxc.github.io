---
title: CMake开发之——循环(3.2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 学习路线
tags:
  - Cmake
abbrlink: bfd116af
date: 2025-08-21 07:14:27
---
## 一 概述

```
本文介绍 CMake 的循环：foreach 和 while
```

<!--more-->

## 二 foreach 循环(遍历一组元素)

### 2.1 遍历列表

```
1、示例
set(MY_LIST apple banana cherry)

foreach(item IN LISTS MY_LIST)
    message("Fruit: ${item}")
endforeach()

2、输出
Fruit: apple
Fruit: banana
Fruit: cherry
```

### 2.2 遍历普通值

```
foreach(val 1 2 3)
    message("Number: ${val}")
endforeach()
```

### 2.3 数值范围

```
1、示例
foreach(i RANGE 3)
    message("i = ${i}")
endforeach()

2、输出
i = 0
i = 1
i = 2
i = 3

3、也可以指定起始值和步长
foreach(i RANGE 2 10 2) # 从 2 到 10，步长 2
    message("i = ${i}")
endforeach()
```

### 2.4 多变量并行遍历

```
set(NAMES Alice Bob Charlie)
set(AGES 18 25 30)

foreach(name age IN ZIP_LISTS NAMES AGES)
    message("${name} is ${age} years old")
endforeach()
```

## 三 while 循环

### 3.1 作用

```
条件为真时循环执行
```

### 3.2 示例

```
set(i 0)

while(i LESS 5)
    message("i = ${i}")
    math(EXPR i "${i} + 1") # CMake 中递增需要 math(EXPR)
endwhile()
```

## 四  循环控制

### 4.1 循环控制

```
CMake 循环中可以使用：
 break()：立即结束循环
 continue()：跳过当前迭代，进入下一轮
```

### 4.2 示例

```
foreach(num 1 2 3 4 5)
    if(num EQUAL 3)
        continue() # 跳过 3
    endif()
    if(num EQUAL 5)
        break() # 遇到 5 直接结束
    endif()
    message("num = ${num}")
endforeach()
```

## 五 小技巧

```
1、foreach 常用于批量处理源文件、库、定义变量等

2、while 更适合需要动态更新条件的循环

3、在现代 CMake 中，处理列表更推荐 foreach(IN LISTS ...) 
或 foreach(IN ZIP_LISTS ...)，可读性更好
```

