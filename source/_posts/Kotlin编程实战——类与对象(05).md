---
title: Kotlin编程实战——类与对象(05)
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: eabd0a86
date: 2022-11-05 09:32:44
---
## 一 概述

* 类与继承
* 属性和字段
* 接口(interface )
* 函数式（SAM）接口
* 可见性修饰符
* 扩展
* 数据类(data class)
* 密封类
* 泛型
* 嵌套类与内部类
* 枚举类
* 对象表达式与对象声明
* 类型别名
* 内联类(inline class)
* 委托
* 委托属性

<!--more-->

## 二 类与继承

* 类
* 继承(open override )
* 抽象类(abstract)
* 伴生对象

## 三 属性和字段

* 属性
* 编译期常量
* 延迟初始化属性与变量(lateinit )
* 覆盖属性
* 委托属性

## 四 接口(interface )

* 实现接口
* 接口中的属性
* 接口继承
* 解决覆盖冲突(super<A>)

## 五 函数式（SAM）接口

* 函数式接口或 SAM（单一抽象方法）接口
* SAM 转换
* 函数式接口与类型别名比较

## 六 可见性修饰符

* 四个可见性修饰符：private、protected、internal 、public
* 包
* 类和接口
* 模块

## 七 扩展

* 扩展函数(MutableList\<Int>.swap)
* 扩展是静态解析的(总是取成员函数)
* 可空接收者(Any?.toString())
* 扩展属性(List\<T>.lastIndex)
* 伴生对象的扩展
* 扩展的作用域
* 扩展声明为成员

## 八 数据类(data class)

* 数据类 data class
* 在类体中声明的属性
* 复制(copy)
* 数据类与解构声明(val (name, age) = User())
* 标准数据类(Pair 与 Triple)

## 九 密封类

* 密封类 sealed  class
* 用来表示受限的类继承结构
* 是枚举类的扩展
* 密封类的一个子类可以有可包含状态的多个实例
* 使用 when 表达式

## 十 泛型

* 协变的（covariant）与逆变性（contravariance）
* 声明处型变(泛型接口 Source<T>)
* out：生产者+协变
* in：消费者+逆变
* 使用处型变：类型投影
* 星投影（Function<*, *>)

## 十一 嵌套类与内部类

* 嵌套类
* 内部类(标记为 inner 的嵌套类)
* 匿名内部类

## 十二 枚举类

* 初始化
* 匿名类
* 在枚举类中实现接口
* 使用枚举常量

## 十三 对象表达式与对象声明

* 对象表达式
* 对象声明(单例模式)

## 十四 类型别名

类型别名(typealias)

## 十五 思维导图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-kotlin/kotlin-learn-struct-5.png