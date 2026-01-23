---
title: JavaWeb开发思维导图之——MyBatis注解实现多表操作(51)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c0282ade
date: 2025-01-07 08:41:36
---
## 一 概述

* 1对1操作
* 1对多操作
* 多对多操作

<!--more-->

## 二 内容详情

### 2.1 1对1操作

1-说明: 1张身份证对应1个人

2-准备

* 表(身份证(card)+人(person))
* 实体类(Card(包含Person)+Person)
* CardMapper接口(查询全部方法selectAll)
* PersonMapper接口(根据id查询方法selectByID(id))
* 测试类

3-操作

* 查询注解@Select("select * from card") //selectAll添加
* @Results({Result(column='',property='')})

### 2.2 1对多操作

1-说明: 一个班级下有多个学生

2-准备

* 表(班级(classes)+学生(student)+中间表(stu_cr))
* 实体类(Student+Classes(包含students))
* ClassesMapper接口(查询全部方法selectAll)
* StudentMapper接口(根据id查询student表selectByCid(id))
* 测试类

3-操作

* 查询注解@Select("select * from classes") //selectAll添加
* @Results({Result(column='',property='')})

### 2.3 多对多操作

1-说明: 学生可以选择多门课程

2-准备

* 表(课程(course)+学生(student)+中间表(stu_cr))
* 实体类(Course+Student(包含courses))
* StudentMapper接口(查询全部方法selectAll)
* CourseMapper接口(根据id查询所选课程selectBySid(id))
* 测试类

3-操作

* 查询注解@Select("select distinct s.id,s.name,s.age from student s,stu_cr sc where sc.sid=s.id") //selectAll添加
* @Results({Result(column='',property='')})

## 三 思维导图

![javaweb-xmind-mybatis-tables-11][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mybatis-tables-11.png