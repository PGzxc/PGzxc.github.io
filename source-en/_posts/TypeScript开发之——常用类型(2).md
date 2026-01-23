---
title: TypeScript开发之——常用类型(2)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: ffde59af
date: 2023-04-26 11:00:31
---
## 一 概述

* 类型说明
* 常用类型概述
* 常用类型介绍

<!--more-->

## 二 类型说明

### 2.1 TypeScript类型概述

TypeScript 是 JS 的超集，TS 提供了 JS 的所有功能，并且额外的增加了：类型系统

* 所有的 JS 代码都是 TS 代码
* JS 有类型（比如，number/string 等），但是 JS 不会检查变量的类型是否发生变化。而 TS 会检查。

TypeScript 类型系统的主要优势：可以显示标记出代码中的意外行为，从而降低了发生错误的可能性。

### 2.2 类型注解

示例代码

```
let age:number =18
age='20'
age.toFixed()
```

代码说明：

* 代码中的 : number 就是类型注解
* number为变量添加类型约束。上述代码中，变量 age 的类型为 number(数值类型)
* 约定了什么类型，就只能给变量赋值该类型的值，否则，就会报错

## 三 常用类型概述

可以将 TS 中的常用基础类型细分为两类：1 JS 已有类型 2 TS 新增类型。

### 3.1 JS 已有类型

* 原始类型：number/string/boolean/null/undefined/symbol
* 对象类型：object（包括，数组、对象、函数等对象）

### 3.2 TS 新增类型

* 联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等

## 四 常用类型介绍

### 4.1 原始类型

原始类型说明：

* 原始类型：number/string/boolean/null/undefined/symbol
* 特点：简单。这些类型，完全按照 JS 中类型的名称来书写

示例代码

```
let age: number = 18
let myName: string = 'zhangsan'
let isLoading: boolean = false
let a: null = null
let b: undefined = undefined
let s: symbol = Symbol()
```

### 4.2 数组类型

数组类型说明：

* 对象类型：object(包括，数组、对象、函数等对象)
* 特点：对象类型，在 TS 中更加细化，每个具体的对象都有自己的类型语法
* 数组类型的两种写法：(推荐使用 number[] 写法)

示例代码

```
let numbers:number[] =[1,3,5]
let strings:Array<string> =['a','b','c']
```

### 4.3 联合类型

联合类型说明：

* 数组中既有 number 类型，又有 string 类型，使用`|`
* `|(竖线)`在 TS 中叫做联合类型（由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种）
* 这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（||）混淆了

示例代码

```
let arr: (number | string)[] = [1, 3, 5, 'a', 'b', 'c']

let arr1: number | string[] = ['a', 'b', 'c']
let arr1: number | string[] = 123
```

说明：

* 添加小括号，表示：首先是数组，然后，这个数组中能够出现number或string类型
* 不添加小括号，表示：arr1既可以是number类型，又可以是string[]类型

### 4.4 类型别名

使用说明：

* 类型别名（自定义类型）：为任意类型起别名
* 使用场景：当同一类型（复杂）被多次使用时，可以通过类型别名，简化该类型的使用

示例代码

```
type CustomArray= (number | string)[]
let arr:CustomArray =[1, 3, 5, 'a', 'b', 'c']
let arr1:CustomArray =['x','y',6,7]
```

说明：

* 使用 type 关键字来创建类型别名
* 类型别名（比如，此处的 CustomArray），可以是任意合法的变量名称
* 创建类型别名后，直接使用该类型别名作为变量的类型注解即可

### 4.5 函数类型

使用说明：

* 函数的类型实际上指的是：函数参数和返回值的类型
* 为函数指定类型的两种方式：1 单独指定参数、返回值的类型 2 同时指定参数、返回值的类型

示例1——单独指定参数和返回值类型

```
function add(num1:number,number2:number):number{
    return num1+number2
}
const add = (num1: number, number2: number): number => {
    return num1 + number2
}
console.log(add(1,2))
```

示例2——同时指定参数和返回值类型：

```
const add: (num1: number, number2: number) => number = (num1, number2) => {
    return num1 + number2
}
console.log(add(1, 2))
```

说明：

* 当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型
* 这种形式只适用于函数表达式

示例3——void类型

```
function greet(name: string): void {
    console.log('Hello', name)
}
greet('jack')
```

说明：如果函数没有返回值，那么，函数返回值类型为：void

示例4——可选参数

```
function mySlice(start?: number, end?: number): void {
    console.log('起始索引：', start, '结束索引：', end)
}
mySlice()
mySlice(1)
mySlice(1, 3)
```

说明：

* 可选参数：在可传可不传的参数名称后面添加 ?（问号）
* 可选参数只能出现在参数列表的最后，也就是说可选参数后面不能再出现必选参数

### 4.6 对象类型

使用说明：

* JS 中的对象是由属性和方法构成的，而 TS 中对象的类型就是在描述对象的结构(有什么类型的属性和方法)

示例代码

```
let person: { name: string; age: number; sayHi(): void; greet(name: string): void } = {
    name: 'zhangsan',
    age: 18,
    sayHi() {},
    greet(name) {},
}
```

说明：

* 直接使用 {} 来描述对象结构。属性采用属性名: 类型的形式；方法采用方法名(): 返回值类型的形式
* 如果方法有参数，就在方法名后面的小括号中指定参数类型(比如：greet(name: string): void)
* 在一行代码中指定对象的多个属性类型时，使用 ;（分号）来分隔
* 如果一行代码只指定一个属性类型（通过换行来分隔多个属性类型），可以去掉 ;（分号）
* 方法的类型也可以使用箭头函数形式（比如：{ sayHi: () => void }）

示例代码2-可选属性

```
function myAxios(config:{url:string;method?:string}){
    console.log(config)
}
```

说明：

* 对象的属性或方法，也可以是可选的，此时就用到可选属性了
* 比如，我们在使用 axios({ … }) 时，如果发送 GET 请求，method 属性就可以省略
* 可选属性的语法与函数可选参数的语法一致，都使用 ?（问号）来表示

### 4.7 接口

1—定义接口

```
interface IPerson {
    name: string,
    age: number,
    sayHi(): void
}
```

使用说明：当一个对象类型被多次使用时，一般会使用接口（interface）来描述对象的类型，达到复用的目的

2—示例代码

```
interface IPerson {
    name: string,
    age: number,
    sayHi(): void
}
let person:IPerson={
    name:'zhangsan',
    age:18,
    sayHi(){}
}
```

说明：

* 使用 interface 关键字来声明接口
* 接口名称（比如，此处的 IPerson），可以是任意合法的变量名称
* 声明接口后，直接使用接口名称作为变量的类型
* 因为每一行只有一个属性类型，因此，属性类型后没有 ;（分号）

3—interface（接口）和 type（类型别名）的对比

* 相同点：都可以给对象指定类型
* 不同点：
  * 接口，只能为对象指定类型
  * 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名

4—接口继承

说明：如果两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用

示例：

比如，这两个接口都有 x、y 两个属性，重复写两次，可以，但很繁琐

```
interface Point2D{x:number;y:number}
interface Point3D{x:number;y:number;z:number}
```

更好的方式

```
interface Point2D { x: number; y: number }
interface Point3D extends Point2D { z: number }
```

说明：

* 使用 extends（继承）关键字实现了接口 Point3D 继承 Point2D
* 继承后，Point3D 就有了 Point2D 的所有属性和方法（此时，Point3D 同时有 x、y、z 三个属性）

### 4.8 元组

1—不使用元组时表示

```
let position:number[]=[39.5427,116.2317]
```

说明：

* 场景：在地图中，使用经纬度坐标来标记位置信息
* 可以使用数组来记录坐标，那么，该数组中只有两个元素，并且这两个元素都是数值类型
* 使用 number[] 的缺点：不严谨，因为该类型的数组中可以出现任意多个数字

2—更好的方式：元组（Tuple）

元组类型是另一种类型的数组，它确切地知道包含多少个元素，以及特定索引对应的类型

```
let position:[number,number]=[39.5427,116.2317]
```

说明：

* 元组类型可以确切地标记出有多少个元素，以及每个元素的类型
* 该示例中，元素有两个元素，每个元素的类型都是 number

### 4.9 类型推论

使用说明：

* 在 TS 中，某些没有明确指出类型的地方，TS 的类型推论机制会帮助提供类型
* 换句话说：由于类型推论的存在，这些地方，类型注解可以省略不写！
* 发生类型推论的 2 种常见场景：1 声明变量并初始化时 2 决定函数返回值时

示例代码

```
let age = 18
let a: number
a = 19

function add(num1, num2: number) {
    return num1 + num2
}
add(1, 2)
```

### 4.10  类型断言

1—不使用类型断言时

示例代码

a标签

```
<a href="http://www.baidu.cn/" id="link">百度</a>
```

ts代码

```
const aLink = document.getElementById('link') 
aLink.href
```

说明：

* getElementById 方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 a标签特有的 href 等属性
* 因此，这个类型太宽泛（不具体），无法操作 href 等 a 标签特有的属性或方法
* 这种情况下就需要使用类型断言指定更加具体的类型
* 有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型

2—示例代码-类型断言

```
const aLink = document.getElementById('link') as HTMLAnchorElement
// const aLink = <HTMLAnchorElement>document.getElementById('link')
aLink.href
```

说明：

* 使用 as 关键字实现类型断言
* 关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
* 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了
* 在浏览器控制台，通过 console.dir() 打印 DOM 元素，在属性列表的最后面，即可看到该元素的类型

### 4.11字面量类型

1—示例代码——字面类型

```
let str1 = 'Hello TS'
const str2: 'Hello TS' = 'Hello TS'
let age: 18 = 18
```

说明：

* str1 是一个变量（let），它的值可以是任意字符串，所以类型为：string
* str2 是一个常量（const），它的值不能变化只能是 'Hello TS'，所以，它的类型为：'Hello TS'
* 此处的 'Hello TS'，就是一个字面量类型。也就是说某个特定的字符串也可以作为 TS 中的类型
* 除字符串外，任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用

2—示例代码——可选值

比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个

```
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {}
changeDirection('up')
```

说明：

* 使用模式：字面量类型配合联合类型一起使用
* 使用场景：用来表示一组明确的可选值列表
* 参数 direction 的值只能是 up/down/left/right 中的任意一个
* 相比于 string 类型，使用字面量类型更加精确、严谨

### 4.12 枚举

1—枚举定义

枚举的功能类似于字面量类型+联合类型组合的功能，也可以表示一组明确的可选值

枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个

```
enum Direction { Up, Down, Left, Right }
```

说明：

* 使用 enum 关键字定义枚举
* 约定枚举名称、枚举中的值以大写字母开头
* 枚举中的多个值之间通过 ,（逗号）分隔
* 定义好枚举后，直接使用枚举名称作为类型注解

2—枚举示例——访问枚举成员

```
enum Direction { Up, Down, Left, Right }
function changeDirection(direction: Direction) {
    console.log(direction)
}
changeDirection(Direction.Up)
```

说明：

* 形参 direction 的类型为枚举 Direction，那么，实参的值就应该是枚举 Direction 成员的任意一个
* 类似于 JS 中的对象，直接通过点（.）语法访问枚举的成员

3—枚举成员的值

```
enum Direction { Up, Down, Left=14, Right }
```

说明：

* 通过将鼠标移入 Direction.Up，可以看到枚举成员 Up 的值为 0
* 枚举成员是有值的，默认为：从 0 开始自增的数值
* 枚举成员的值为数字的枚举，称为：数字枚举
* 当然，也可以给枚举中的成员初始化值

4—字符串枚举

```
enum Direction { Up = 'UP', Down ='DOWN', Left = 'LEFT', Right ='RIGHT'}
```

说明：

* 字符串枚举：枚举成员的值是字符串
* 字符串枚举没有自增长行为，因此，字符串枚举的每个成员必须有初始值

5-枚举特性及实现原理

* 枚举是 TS 为数不多的非 JavaScript 类型级扩展（不仅仅是类型）的特性之一
* 因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值(枚举成员都是有值的)
* 也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，枚举类型会被编译为 JS 代码！
* 枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表
* 一般情况下，推荐使用字面量类型+联合类型组合的方式，因为相比枚举，这种方式更加直观、简洁、高效

### 4.13 any 类型

1—any类型实例

```
let obj: any = { x: 0 }

//访问不存在的属性或者赋值
obj.aaa
obj.aaa = 10

//当作函数调用
obj()

//赋值给其他类型的变量
let n: number = obj
```

说明：

* 以上操作都不会有任何类型错误提示，即使可能存在错误
* 尽可能的避免使用 any 类型，除非临时使用 any 来“避免”书写很长、很复杂的类型
* 因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示
* 原则：不推荐使用 any！这会让 TypeScript 变为 “AnyScript”（失去 TS 类型保护的优势）

2—隐式具有any类型的情况

```
let a
a=1
a='a'

function add(num1,num2){}
add(1,'a')
```

说明：

* 其他隐式具有 any 类型的情况：1 声明变量不提供类型也不提供默认值 2 函数参数不加类型
* 因为不推荐使用 any，所以，这两种情况下都应该提供类型

### 4.14  typeof

1—typeof的基本使用

```
console.log(typeof 'Hello TS')
```

说明：JS 中提供了 typeof 操作符，用来在 JS 中获取数据的类型

2—类型上下文

```
let p = { x: 1, y: 2 }
function formatPoint(point: typeof p) { }
formatPoint({ x: 1, y: 100 })
```

说明：

* 实际上，TS 也提供了 typeof 操作符：可以在类型上下文中引用变量或属性的类型（类型查询）
* 使用场景：根据已有变量的值，获取该值的类型，来简化类型书写
* 使用 typeof 操作符来获取变量 p 的类型，结果与第一种（对象字面量形式的类型）相同
* typeof 出现在类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文（区别于 JS 代码）

3—typeof无法查询函数调用的类型

```
let p = { x: 1, y: 2 }
let num:typeof p.x
function add(num1:number,num2:number){
    return num1+num2
}
let ret:typeof add(1,2) //错误
```

说明：注意：typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）

## 五 参考

* [TypeScript—中文文档](https://www.tslang.cn/docs/home.html)
* [菜鸟教程—TypeScript基础语法](https://www.runoob.com/typescript/ts-basic-syntax.html)


