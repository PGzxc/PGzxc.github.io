---
title: HarmonyOS第一课——保存应用数据(8)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 71e43e3e
date: 2023-11-26 09:51:50
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-首选项是关系型数据库 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

注解：首选项是preferences (用户首选项)，是文件

2-应用中涉及Student信息，如包含姓名，性别，年龄，身高等信息可以用首选项来存储 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

3-同一应用或进程中每个文件仅存在一个Preferences实例 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

### 2.2 单选题

1-使用首选项要导入的包是哪个？<font color=red>(B)</font>

```
A-@ohos.data.rdb
B-@ohos.data.preferences
C-@ohos.router
D-@ohos.data.storage
```

2-首选项的数据持久化后是放在哪里？<font color=red>(C)</font>

```
A-内存中
B-数据库表中
C-文件中
D-云端
```

3-下面哪个接口不是首选项提供的API接口？<font color=red>(B)</font>

```
A-get()
B-update()
C-put()
D-flush()
```

### 2.3 多选题

1-HarmonyOS提供的数据管理的方式都有哪些？ <font color=red>(ABCD)</font>

```
A-首选项
B-分布式数据服务
C-关系数据库
D-分布式数据对象
```

2-下面说法正确的有？ <font color=red>(BCD)</font>

```
A-首选项遵顼ACID特性
B-首选项以Key_Value形式存取数据
C-首选项存储数据数量建议不超过1万条
D-首选项的key为String类型
```

注解：ACID是数据库的特性

## 三 随堂测试截图

1-判断题

![][1]

2-单选题

![][2]

3-多选题

![][3]

4-随堂测试截图

![][4]

## 四 随堂测试证书

![][5]

## 五 思维导图

![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson8-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson8-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson8-multiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson8-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson8-centify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson8-xmind.png