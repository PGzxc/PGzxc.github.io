---
title: OC开发之——协议protocol(51)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: b7ebd63e
date: 2020-04-18 23:39:03
---
## 一 协议的用途

* 可以用来声明一大堆方法(不能声明成员变量)
* 只要某个类遵守了这个协议，就相当于拥有这个协议中的所有方法声明
* 只要父类遵守了某个协议，就相当于子类也遵守了

<!--more-->
## 二 格式

### 2.1 协议的编写

```
@protocol 协议名称
//方法声明列表
@end
```

### 2.2 某个类遵守协议

```
@interface 类名：父类<协议名称>
@end
```

## 三 关键字

协议中有2个关键字可以控制方法是否要实现(默认是@required)

* @required：这个方法必须要实现(若不实现，编译器会发出警告)
* @optional：这个方法不一定要实现

## 四 协议遵守协议

* 一个协议可以遵守其他多个协议，多个协议之间可以用逗号`,`隔开

* 一个协议遵守了其他协议，就相当于拥有了其他协议中的方法声明

  ```
  @protocol 协议名称<协议1，协议2>
  @end
  ```

## 五 基协议

* NSObject是一个基类，最根本最基本的类，任何其他类最终都要继承它
* NSObject协议中声明了很多最基本的方法，比如：description,retain,release等
* 建议每个新的协议都要遵守NSObject协议

## 六 定义变量时指定协议

```
//NSObject类型的对象，并且要遵守NSCopying协议
NSObject<NSCopying> *obj;
//任何OC对象，并且要遵守NSCoding协议
id<NSCoding> obj2;
```
