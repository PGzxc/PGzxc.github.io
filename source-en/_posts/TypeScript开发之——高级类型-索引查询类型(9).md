---
title: TypeScript开发之——高级类型-索引查询类型(9)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: f53df2fa
date: 2023-04-27 12:52:03
---
## 一 概述

* 索引查询
* 同时查询多个索引

<!--more-->

## 二 索引查询

### 2.1 索引查询

* 刚刚映射类型中用到的 T[P] 语法，在 TS 中叫做索引查询（访问）类型
* 作用：用来查询属性的类型

### 2.2 示例代码

示例代码

```
type Props = { a: number; b: string; c: boolean }
type TypeA = Props['a']

type MyPartial<T> = {
    [P in keyof T]?: T[P]
}
type PartialProps=MyPartial<Props>
```

说明：

* 解释：Props['a'] 表示查询类型 Props 中属性 'a' 对应的类型 number。所以，TypeA 的类型为 number
* 注意：[] 中的属性必须存在于被查询类型中，否则就会报错

## 三 同时查询多个索引

索引查询类型的其他使用方式：同时查询多个索引的类型

### 3.1 通过联合类型进行同时索引查询

示例代码

```
type Props = { a: number; b: string; c: boolean }

type TypeA = Props['a' | 'b']
```

说明：

* 使用字符串字面量的联合类型，获取属性 a 和 b 对应的类型，结果为： string | number

### 3.2 通过keyof进行同时索引查询

示例代码

```
type Props = { a: number; b: string; c: boolean }

type TypeB = Props[keyof Props]
```

说明：

* 使用 keyof 操作符获取 Props 中所有键对应的类型，结果为： string | number | boolean
