---
title: TypeScript开发之——高级类型-泛型(6)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: b19963d2
date: 2023-04-27 12:49:57
---
## 一 概述

* 泛型函数
* 泛型约束
* 泛型接口
* 泛型类
* 泛型工具

<!--more-->

## 二 泛型函数——为什么需要引入泛型

### 2.1 传入什么返回什么—固定类型

需求：创建一个 id 函数，传入什么数据就返回该数据本身（也就是说，参数和返回值类型相同）

```
function id(value:number):number {return value}
```

比如，id(10) 调用以上函数就会直接返回 10 本身。但是，该函数只接收数值类型，无法用于其他类型

### 2.2 传入什么返回什么—不固定类型

为了能让函数能够接受任意类型，可以将参数类型修改为 any。但是，这样就失去了 TS 的类型保护，类型不安全

```
function id(value:any):any {return value}
```

### 2.3 泛型函数

创建泛型函数

```
function id<Type>(value:Type):Type {return value}
```

说明：

* 语法：在函数名称的后面添加 <>（尖括号），尖括号中添加类型变量，比如此处的 Type
* 类型变量 Type，是一种特殊类型的变量，它处理类型而不是值
* 该类型变量相当于一个类型容器，能够捕获用户提供的类型（具体是什么类型由用户调用该函数时指定）
* 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型
* 类型变量 Type，可以是任意合法的变量名称

泛型好处

* 泛型在保证类型安全（不丢失类型信息）的同时，可以让函数等与多种不同的类型一起工作，灵活可复用
* 实际上，在 C＃和 Java 等编程语言中，泛型都是用来实现可复用组件功能的主要工具之一

### 2.4 调用泛型函数

```
function id<Type>(value:Type):Type {return value}

const num=id<number>(10)
const str=id<string>('a')
const ret =id<boolean>(false)
```

说明：

* 语法：在函数名称的后面添加 <>（尖括号），尖括号中指定具体的类型，比如，此处的 numbe
* 当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到
* 此时，Type 的类型就是 number，所以，函数 id 参数和返回值的类型也都是 number
* 同样，如果传入类型 string，函数 id 参数和返回值的类型就都是 string
* 这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，实现了复用的同时保证了类型安全

### 2.5 简化调用泛型函数

```
function id<Type>(value:Type):Type {return value}

const num2=id(10)
const str2=id('a')
const ret2=id(false)
```

说明：

* 在调用泛型函数时，可以省略 <类型> 来简化泛型函数的调用
* 此时，TS 内部会采用一种叫做类型参数推断的机制，来根据传入的实参自动推断出类型变量 Type 的类型
* 比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型
* 推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读
* 说明：当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数

## 三 泛型约束

### 3.1 泛型约束

泛型约束：默认情况下，泛型函数的类型变量 Type 可以代表多个类型，这导致无法访问任何属性

比如，id('a') 调用函数时获取参数的长度：

```
function id<Type>(value: Type): Type {
    console.log(value.length)
    return value
}
```

说明：

* Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length
* 此时，就需要为泛型添加约束来收缩类型（缩窄类型取值范围）

### 3.2 泛型约束收缩类型

添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型 2 添加约束

#### 指定更加具体的类型

```
function id<Type>(value: Type[]): Type[] {
    console.log(value.length)
    return value
}
```

说明：比如，将类型修改为 Type[]（Type 类型的数组），因为只要是数组就一定存在 length 属性，因此就可以访问了

#### 添加约束

```
interface ILength { length: number }

function id<Type extends ILength>(value: Type): Type {
    console.log(value.length)
    return value
}
//正确
id(['a','b'])
id('abc')
id({length:10,name:'jack'})
//错误-没有length属性
id(123)
```

说明：

* 创建描述约束的接口 ILength，该接口要求提供 length 属性
* 通过 extends 关键字使用该接口，为泛型（类型变量）添加约束
* 该约束表示：传入的类型必须具有 length 属性
* 注意：传入的实参（比如，数组）只要有 length 属性即可，这也符合前面讲到的接口的类型兼容性

#### 多个泛型变量

泛型的类型变量可以有多个，并且类型变量之间还可以约束（比如，第二个类型变量受第一个类型变量约束）。
比如，创建一个函数来获取对象中属性的值

```
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key]
}
//正确
getProp({name:'jack',age:18},'age')
getProp({name:'jack',age:18},'name')
//错误
getProp({name:'jack',age:18},'age1')

//调用系统默认的属性
getProp(18,'toFixed')
getProp('abc','split')
```

说明：

* 添加了第二个类型变量 Key，两个类型变量之间使用（,）逗号分隔
* keyof 关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型
* 本示例中 keyof Type 实际上获取的是 person 对象所有键的联合类型，也就是：'name' | 'age'
* 类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性

## 四 泛型接口

### 4.1 泛型接口

泛型接口：接口也可以配合泛型来使用，以增加其灵活性，增强其复用性

### 4.2 泛型接口示例

```
interface IDFunc<Type> {
    id: (value: Type) => Type
    ids: () => Type[]
}
let obj: IDFunc<number> = {
    id(value) {
        return value
    },
    ids() {
        return []
    }
}
```

说明：

* 在接口名称的后面添加 <类型变量>，那么，这个接口就变成了泛型接口
* 接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量
* 使用泛型接口时，需要显式指定具体的类型（比如，此处的 IdFunc\<nunber>）
* 此时，id 方法的参数和返回值类型都是 number；ids 方法的返回值类型是 number[]

### 4.3 JS 中的数组在 TS 中就是一个泛型接口

```
const strs = ['a', 'b', 'c']
strs.forEach(item => { })
const num = [1, 3, 5]
num.forEach(item => { })
```

说明：

* 当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型
* 可以通过 Ctrl + 鼠标左键（Mac：option + 鼠标左键）来查看具体的类型信息

## 五 泛型类

### 5.1 泛型类的创建

```
class GenericNumber<NumType>{
    defaultValue: NumType
    add: (x: NumType, y: NumType) => NumType
    constructor(value:NumType){
        this.defaultValue=value
    }
}
```

说明：

* 类似于泛型接口，在 class 名称后面添加 <类型变量>，这个类就变成了泛型类
* 此处的 add 方法，采用的是箭头函数形式的类型书写方式

### 5.2 调用泛型类

```
const myNum = new GenericNumber<number>(100)
myNum.defaultValue = 10
```

说明：类似于泛型接口，在创建 class 实例时，在类名后面通过 <类型> 来指定明确的类型

## 六 泛型工具

泛型工具类型：TS 内置了一些常用的工具类型，来简化 TS 中的一些常见操作。
说明：它们都是基于泛型实现的（泛型适用于多种类型，更加通用），并且是内置的，可以直接在代码中使用。
这些工具类型有很多，主要学习以下几个：

* Partial\<Type>
* Readonly\<Type>
* Pick\<Type, Keys>
* Record\<Keys, Type>

### 6.1 Partial\<Type>

```
interface Props {
    id: string
    children: number[]
}

type PartialProps = Partial<Props>
//所有属性都不为空
let p1: Props = {
    id: '1',
    children: [1]
}
//默认为空
let p2: PartialProps = {

}
```

说明：

* 泛型工具类型 - Partial\<Type> 用来构造（创建）一个类型，将 Type 的所有属性设置为可选
* 构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选的。

### 6.2 Readonly\<Type>

泛型工具类型 - Readonly\<Type> 用来构造一个类型，将 Type 的所有属性都设置为 readonly（只读）

```
interface Props {
    id: string
    children: number[]
}

type ReadonlyProps = Readonly<Props>

let p1: ReadonlyProps = {
    id: '1',
    children: []
}
//错误，无法赋值
p1.id = '2'
```

说明：

* 构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的
* 当我们想重新给 id 属性赋值时，就会报错：无法分配到 "id" ，因为它是只读属性

### 6.3 Pick\<Type, Keys>

泛型工具类型 - Pick<Type, Keys> 从 Type 中选择一组属性来构造新类型

示例代码

```
interface Props {
    id: string
    title: string
    children: number[]
}
type PickProps = Pick<Props, 'id' | 'title'>
```

说明：

* Pick 工具类型有两个类型变量：1 表示选择谁的属性 2 表示选择哪几个属性
* 其中第二个类型变量，如果只选择一个则只传入该属性名即可
* 第二个类型变量传入的属性只能是第一个类型变量中存在的属性
* 构造出来的新类型 PickProps，只有 id 和 title 两个属性类型

### 6.4 Record\<Keys, Type>

泛型工具类型 - Record<Keys,Type> 构造一个对象类型，属性键为 Keys，属性类型为 Type

```
type RecordObj = Record<'a' | 'b' | 'c', string[]>

let obj: RecordObj = {
    a: ['a'],
    b: ['b'],
    c: ['c']
}
```

说明：

* Record 工具类型有两个类型变量：1 表示对象有哪些属性 2 表示对象属性的类型
* 构建的新对象类型 RecordObj 表示：这个对象有三个属性分别为a/b/c，属性值的类型都是 string[]