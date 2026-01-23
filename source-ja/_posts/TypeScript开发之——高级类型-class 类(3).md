---
title: TypeScript开发之——高级类型-class 类(3)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: 45a2bcfc
date: 2023-04-27 12:47:04
---
## 一 概述

* class属性和方法相关
* class继承
* class可见性
* class-readonly只读修饰符

<!--more-->

## 二 class属性和方法相关

### 2.1 class类定义及创建

示例代码

```
class Person{}
const p =new Person()
```

说明：

* TypeScript 中通过class 关键字，为其添加了类型注解和其他语法
* 根据 TS 中的类型推论，可以知道 Person 类的实例对象 p 的类型是 Person
* TS 中的 class，不仅提供了 class 的语法功能，也作为一种类型存在

### 2.2 实例属性初始化

示例代码

```
class Person {
    age: number
    gender = '男'
    //gender:string='男'
}
```

说明：

* 声明成员 age，类型为 number（没有初始值）
* 明成员 gender，并设置初始值，此时，可省略类型注解（TS 类型推论 为 string 类型）

### 2.3 构造函数

示例代码

```
class Person {
    age: number
    gender = '男'
    constructor(age: number, gender: string) {
        this.age = age
        this.gender = gender
    }
}
const p = new Person(18, '男')
```

说明：

* 成员初始化（比如，age: number）后，才可以通过 this.age 来访问实例成员
* 需要为构造函数指定类型注解，否则会被隐式推断为 any；构造函数不需要返回值类型

### 2.4 实例方法

示例代码

```
class Point {
    x = 1
    y = 2
    Scale(n: number) {
        this.x *= n
        this.y *= n
    }
}

const p = new Point()
p.Scale(10)

console.log(p.x, p.y)
```

说明：方法的类型注解（参数和返回值）与函数用法相同

## 三 class继承

### 3.1 class-extends继承

示例代码

```
class Animal {
    move() {
        console.log('走两步')
    }
}
class Dog extends Animal {
    name = '二哈'
    bark() {
        console.log('汪汪')
    }
}

const d = new Dog()
d.move()
d.bark()
console.log(d.name)
```

说明：

* 类继承的两种方式：1 extends（继承父类） 2 implements（实现接口）
* JS 中只有 extends，而 implements 是 TS 提供的
* 通过 extends 关键字实现继承
* 类 Dog 继承父类 Animal，则 Dog 的实例对象 dog 就同时具有了父类 Animal 和 子类 Dog 的所有属性和方法

### 3.2 class-implements实现

示例代码

```
interface Singable {
    sing(): void
    name: string
}
class Person implements Singable {
    name: string = 'jack'
    sing(): void {
        console.log('唱歌')
    }
}
```

说明：

* 通过 implements 关键字让 class 实现接口
* Person 类实现接口 Singable 意味着，Person 类中必须提供 Singable 接口中指定的所有方法和属性

## 四 class可见性

### 4.1 class-public可见性

示例代码

```
class Animal {
    public move() {
        console.log('走两步')
    }
}
const a = new Animal()
a.move()

class Dog extends Animal {
    bark() {
        console.log('汪汪')
    }
}

const d = new Dog()
d.move()
d.bark()
```

说明：

* 类成员可见性：可以使用 TS 来控制 class 的方法或属性对于 class 外的代码是否可见
* 可见性修饰符包括：1 public（公有的） 2 protected（受保护的） 3 private（私有的）
* public：表示公有的、公开的，公有成员可以被任何地方访问，默认可见性
* 在类属性或方法前面添加 public 关键字，来修饰该属性或方法是共有的
* 因为 public 是默认可见性，所以，可以直接省略

### 4.2 class-protected可见性

示例代码

```
class Animal {
    protected move() {
        console.log('走两步')
    }
    run() {
        this.move()
        console.log('跑起来')
    }
}
const a = new Animal()
//a.move()

class Dog extends Animal {
    bark() {
        console.log('汪汪')
    }
}

const d = new Dog()
//d.move()
d.bark()
```

说明：

* 表示受保护的，仅对其声明所在类和子类中（非实例对象）可见
* 在类属性或方法前面添加 protected 关键字，来修饰该属性或方法是受保护的
* 在子类的方法内部可以通过 this 来访问父类中受保护的成员，但是，对实例不可见

### 4.3 class-private可见性

示例代码

```
class Animal {
    private move() {
        console.log('走两步')
    }
    run() {
        this.move()
        console.log('跑起来')
    }
}
```

说明：

* private：表示私有的，只在当前类中可见，对实例对象以及子类也是不可见的
* 在类属性或方法前面添加 private 关键字，来修饰该属性或方法是私有的
* 私有的属性或方法只在当前类中可见，对子类和实例对象也都是不可见的

## 五 class-readonly只读修饰符

实例代码

```
class Person {
    readonly age: number = 18
    constructor(age: number) {
        this.age = age
    }
    setAge() {
        //this.age=20
    }
}

interface IPerson {
    readonly name: string
}
let obj: IPerson = {
    name: 'jack'
}
obj.name = 'rose'


let obj2: { readonly name: string } = {
    name: 'jack'
}
obj2.name = 'rose'
```

说明：

* 除了可见性修饰符之外，还有一个常见修饰符就是：readonly（只读修饰符）
* readonly：表示只读，用来防止在构造函数之外对属性进行赋值
* 使用 readonly 关键字修饰该属性是只读的，注意只能修饰属性不能修饰方法
* 注意：属性 age 后面的类型注解（比如，此处的 number）如果不加，则 age 的类型为 18 （字面量类型）
* 接口或者 {} 表示的对象类型，也可以使用 readonly