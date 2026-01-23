---
title: Java开发之——Date时间差
categories:
  - 开发
  - A-基础语言
  - Java
tags:
  - Java
abbrlink: 2ab75d58
date: 2021-05-20 16:17:12
---

## 一 概述

根据开始时间和结束时间计算时间差的一般过程：

* 先将Date类型转换为Long类型
* 计算开始时间和结束时间之间的差值(结束-开始)
* 将差值转换为秒(差值/1000)或者时分秒等单位

<!--more-->

## 二 ChronoUnit计算时间差(SECONDS可换成其他单位)

### 2.1 代码

```
@RequiresApi(Build.VERSION_CODES.O)
fun main() {
    val start = "2021-05-20 00:00:00"
    val end = "2021-05-20 24:00:00"
    secondBetweenDates(start, end)
}

@RequiresApi(Build.VERSION_CODES.O)
fun secondBetweenDates(start: String, end: String) {
    val mStart = LocalDateTime.parse(start, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
    val mEnd = LocalDateTime.parse(end, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
    val difference = ChronoUnit.SECONDS.between(mStart, mEnd)
    println("START => $mStart")
    println("END => $mEnd")
    println("DIFFERENCE => $difference Second")
}
```

### 2.2 打印结果

```
START => 2021-05-20T00:00
END => 2021-05-21T00:00
DIFFERENCE => 86400 Second
```

## 三 [DateTimeUtils](https://github.com/thunder413/DateTimeUtils)(SECONDS可换成其他单位)

### 3.1 代码

```
fun main() {
    val dateStart = DateTimeUtils.formatDate("2021-05-20 00:00:00")
    val dateEnd = DateTimeUtils.formatDate("2021-05-20 24:00:00")
    val diff: Int = DateTimeUtils.getDateDiff(dateEnd, dateStart, DateTimeUnits.SECONDS)
    println(diff)
}
```

### 3.2 打印结果

```
86400
```

