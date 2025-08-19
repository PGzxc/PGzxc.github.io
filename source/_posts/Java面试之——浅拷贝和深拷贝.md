---
title: Java面试之——浅拷贝和深拷贝
categories:
  - 面试相关
  - Java面试题
tags:
  - Java面试题
abbrlink: 38f50de8
date: 2018-03-06 09:30:18
---
## 一 概述

```
深拷贝&浅拷贝在面试里是高频考点，
尤其是前端（JS）、Java、Python、C++等语言场景都会涉及。
本文介绍基本概念及面试题常见问题
```

<!--more-->

## 二 概念

### 2.1 浅拷贝(Shallow Copy)

1、定义

```
只复制对象的第一层结构，
如果对象里嵌套了引用类型（如数组、对象），则只复制引用地址，而不会真正复制值。
```

2、结果

```
修改拷贝对象中的引用类型内容时，原对象也会跟着变。
```

3、举例(JavaScript)

```
1、示例
let obj1 = {
  name: "Tom",
  info: { age: 20 }
};

// 浅拷贝（只复制第一层）
let obj2 = Object.assign({}, obj1);

obj2.name = "Jerry";   // 不影响 obj1
obj2.info.age = 30;    // 改变了 obj2.info.age，也会影响 obj1.info.age

console.log(obj1.info.age); // 30

2、说明：
你会发现 obj2.info.age 的修改同时影响了 obj1，因为两者指向同一个引用
```

### 2.2 深拷贝(Deep Copy)

1、定义

```
递归复制对象中的所有层级，新的对象与原对象完全独立，互不影响
```

2、结果

```
修改拷贝对象中的数据不会影响原对象
```

3、举例(JavaScript)

```
1、示例
let obj1 = {
  name: "Tom",
  info: { age: 20 }
};

// 深拷贝（JSON 方法实现）
let obj2 = JSON.parse(JSON.stringify(obj1));

obj2.info.age = 30;

console.log(obj1.info.age); // 20

2、说明
这里 obj2.info 已经是一个全新的对象，互不影响。
```

### 2.3 对比总结

|          特点          |        浅拷贝        |        深拷贝        |
| :--------------------: | :------------------: | :------------------: |
|        拷贝层级        |       仅第一层       |       所有层级       |
|        引用对象        |     拷贝引用地址     |    完全复制新对象    |
|          性能          | 快(因为只复制第一层) | 慢(递归复制所有层级) |
| 修改子对象影响原对象？ |         ✅ 会         |        ❌ 不会        |

### 2.4 常见实现方式

1、浅拷贝

```
JavaScript: Object.assign({}, obj)、{ ...obj }、Array.prototype.slice()

Java: 实现 Cloneable 接口并重写 clone()

Python: copy.copy(obj)
```

2、深拷贝

```
JavaScript: JSON.parse(JSON.stringify(obj))、structuredClone(obj)、递归实现

Java: 序列化/反序列化，或手写深拷贝

Python: copy.deepcopy(obj)
```

## 三 面试题场景

### 3.1 基础概念类

```
1、问题
 什么是浅拷贝？什么是深拷贝？
 说说浅拷贝和深拷贝的区别？
 =、浅拷贝、深拷贝的区别？
 
2、考察点：是否真正理解“引用类型”的本质
```

### 3.2 代码场景题

1、JavaScript 面试常见

```
1、示例
let obj1 = { name: "Tom", info: { age: 20 } };
let obj2 = obj1;           // 赋值
let obj3 = { ...obj1 };    // 浅拷贝
let obj4 = JSON.parse(JSON.stringify(obj1)); // 深拷贝

obj2.name = "Jerry";
obj3.info.age = 30;
obj4.info.age = 40;

console.log(obj1.name);     // ?
console.log(obj1.info.age); // ?

2、考察点：
候选人能不能准确说出结果 ("Jerry" 和 30) 并解释原因
```

2、Java 面试常见

```
1、示例
class Person implements Cloneable {
    String name;
    Address addr;
    public Object clone() throws CloneNotSupportedException {
        return super.clone(); // 浅拷贝
    }
}

class Address {
    String city;
}

public class Test {
    public static void main(String[] args) throws Exception {
        Address a1 = new Address();
        a1.city = "Beijing";

        Person p1 = new Person();
        p1.name = "Tom";
        p1.addr = a1;

        Person p2 = (Person) p1.clone();
        p2.addr.city = "Shanghai";

        System.out.println(p1.addr.city); // 输出？
    }
}

2、考察点
如果回答 "Shanghai"，说明理解了浅拷贝；
能进一步说“需要实现深拷贝可以手动 clone 内部对象”，更加加分
```

3、Python 面试常见

```
1、示例
import copy

a = [[1,2], [3,4]]
b = copy.copy(a)    # 浅拷贝
c = copy.deepcopy(a) # 深拷贝

b[0][0] = 99
c[1][1] = 77

print(a)  # ?

2、正确答案：
a = [[99, 2], [3, 4]]，但不会受 deepcopy 的影响
```

### 3.3 实际应用类

```
面试官会问：在什么场景下用深拷贝？什么时候用浅拷贝？

1、浅拷贝场景
数据层级浅，性能优先，比如 Redux store 更新中对浅层对象拷贝。

2、深拷贝场景
数据层级深，需要确保完全独立副本，

比如
 多线程环境下防止共享内存冲突（Java）
 保存快照 / 历史记录（前端撤销功能）
 ORM 框架中对象复制时避免级联修改
```

### 3.4 高频追问

```
面试官通常会继续深挖：

JS 的 JSON.parse(JSON.stringify(obj)) 为什么不适合所有情况？
（会丢失 undefined、function、Symbol、循环引用报错）

Java 如何实现深拷贝？（序列化、手写 clone、第三方库如 Apache Commons Lang）

Python 的 copy.deepcopy 是怎么实现的？（递归拷贝，可能遇到性能问题）

如果对象特别大，深拷贝会有什么性能问题？怎么优化？
```

## 四  Java 深拷贝 & 浅拷贝高频面试题

### 4.1 基础概念题

```
Java 中浅拷贝和深拷贝的区别？

浅拷贝：对象本身被复制，但引用类型字段（对象、数组）只复制引用地址，两个对象共享同一份数据。

深拷贝：对象以及其引用类型字段全部复制，形成两个完全独立的对象，互不影响。

性能：浅拷贝快，但可能产生副作用；深拷贝安全但开销大。
考察点：能否清晰表达概念。
```

### 4.2 `clone()` 方法考点

```
Java 中的 clone() 方法默认是深拷贝还是浅拷贝？

Object.clone() 默认是 浅拷贝。

如果类中含有引用类型字段，需要手动覆盖 clone() 方法，对字段进行递归拷贝才能实现深拷贝。

加分回答：
可以提及Cloneable接口，若类未实现该接口而调用clone()会抛 CloneNotSupportedException
```

### 4.3 实战代码题

```
1、请说出以下程序输出结果，并解释原因
class Address {
    String city;
    Address(String city) { this.city = city; }
}

class Person implements Cloneable {
    String name;
    Address addr;

    Person(String name, Address addr) {
        this.name = name; this.addr = addr;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone(); // 浅拷贝
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        Address a1 = new Address("Beijing");
        Person p1 = new Person("Tom", a1);
        Person p2 = (Person) p1.clone();

        p2.addr.city = "Shanghai";

        System.out.println(p1.addr.city);
    }
}

2、答案：输出 "Shanghai"，因为 addr 字段在浅拷贝中仍然是引用传递。
3、考察点：候选人是否理解浅拷贝共享引用
```

### 4.4 如何实现深拷贝？

```
1、在 Java 中有哪些方式实现深拷贝？
2、答案：
 手动 clone：覆盖 clone()，对每个引用类型字段递归调用 clone()。
 序列化/反序列化：通过 ObjectOutputStream 和 ObjectInputStream 来实现对象的完全复制。
 第三方库：如 Apache Commons Lang 的 SerializationUtils.clone()。
3、加分回答：序列化深拷贝简单但性能差；手动实现灵活但容易出错。
```

### 4.5 Cloneable 接口的作用

```
1、为什么要实现 Cloneable 接口？
2、答案：
-Object.clone() 是 protected 方法，且调用前必须实现 Cloneable 接口，
否则会抛 CloneNotSupportedException。

-该接口本身是一个 标记接口，没有任何方法，只起标记作用
```

### 4.6 深拷贝 vs 构造函数复制

```
1、深拷贝只能通过 clone() 吗？
2、答案：

不是。可以通过 拷贝构造函数 实现：

class Person {
    String name;
    Address addr;
    Person(Person other) {
        this.name = other.name;
        this.addr = new Address(other.addr.city);
    }
}


3、这样能更清晰控制拷贝逻辑，不依赖 Cloneable。
4、考察点：候选人是否知道 clone 之外的解决方案。
```

### 4.7 序列化深拷贝考题

```
1、如何用序列化实现深拷贝？
2、答案
public static <T extends Serializable> T deepCopy(T obj) {
    try {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream out = new ObjectOutputStream(bos);
        out.writeObject(obj);

        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream in = new ObjectInputStream(bis);
        return (T) in.readObject();
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
3、考察点：序列化能快速实现深拷贝，但性能不如手动拷贝
```

### 4.8 面试追问：性能 & 使用场景

```
1、在什么情况下选择浅拷贝？什么时候必须用深拷贝？
2、答案：
浅拷贝：对象结构简单，或者业务允许共享引用（例如缓存对象）。

深拷贝：
 多线程环境，避免共享数据冲突；
 历史快照（撤销/回滚功能）；
 ORM 框架中防止对象级联修改。
```

### 4.9 反问型

```
1、为什么 Java 的 clone() 被认为设计不佳？
2、答案：
违反构造函数规则（对象不通过构造函数创建）。
强制使用 Cloneable 标记接口，语义不清晰。
深拷贝需要手动实现，容易出错。
加分回答：一些最佳实践建议使用 拷贝构造函数 或 工厂方法 替代 clone()。
```

### 4.10 总结型

```
1、简述 Java 中对象复制的几种方式。
2、答案：
 直接赋值（传引用）。
 浅拷贝：clone() 默认实现。
 深拷贝：重写 clone()，拷贝构造函数，序列化方式。
 第三方工具类：Apache Commons Lang SerializationUtils。
```

