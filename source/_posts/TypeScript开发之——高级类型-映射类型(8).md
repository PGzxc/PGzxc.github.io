---
title: TypeScript开发之——高级类型-映射类型(8)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: 443cf30c
date: 2023-04-27 12:51:25
---
## 一 概述

* 映射类型
* 映射类型(keyof)
* 泛型工具Partial实现分析

<!--more-->

## 二 映射类型

### 2.1 映射类型

映射类型：基于旧类型创建新类型（对象类型），减少重复、提升开发效率

### 2.2 示例代码

```
type PropKeys = 'x' | 'y' | 'z'
type Type1 = { x: number; y: number; z: number }
type Type2 = { [Key in PropKeys]: number }
```

说明：

* 映射类型是基于索引签名类型的，所以，该语法类似于索引签名类型，也使用了 []
* Key in PropKeys 表示 Key 可以是 PropKeys 联合类型中的任意一个，类似于 forin(let k in obj)
* 使用映射类型创建的新对象类型 Type2 和类型 Type1 结构完全相同

### 2.3 映射类型不能在接口中使用

```
type PropKeys = 'x' | 'y' | 'z'
//错误
interface Type3{
    [Key in PropKeys]:number
}
```

说明：注意：映射类型只能在类型别名中使用，不能在接口中使用

## 三 映射类型(keyof)

映射类型除了根据联合类型创建新类型外，还可以根据对象类型来创建

```
type Props = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props]: number }
```

说明：

* 首先，先执行 keyof Props 获取到对象类型 Props 中所有键的联合类型即，'a' | 'b' | 'c'。
* 后，Key in ... 就表示 Key 可以是 Props 中所有的键名称中的任意一个

## 四 泛型工具Partial实现分析

实际上，前面讲到的泛型工具类型（比如，Partial\<Type>）都是基于映射类型实现的

### 4.1 Partial示例代码

```
type Props = { a: number; b: string; c: boolean }
type PartialProps = Partial<Props>
```

### 4.2 点击Partial查看源码

```
type Partial<T> = {
    [P in keyof T]?: T[P];
}; 
```

说明：

* keyof T 即 keyof Props 表示获取 Props 的所有键，也就是：'a' | 'b' | 'c'。
* 在 [] 后面添加 ?（问号），表示将这些属性变为可选的，以此来实现 Partial 的功能
* 冒号后面的 T[P] 表示获取 T 中每个键对应的类型。比如，如果是 'a' 则类型是 number；如果是 'b' 则类型是 string
* 最终，新类型 PartialProps 和旧类型 Props 结构完全相同，只是让所有类型都变为可选了