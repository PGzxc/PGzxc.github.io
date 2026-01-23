---
title: Android开发之——依赖注入的原理
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 依赖注入
  - Dagger2
abbrlink: 74be698c
date: 2017-12-11 21:12:45
---
原文请参考：[依赖注入的原理][1]   
## 一 什么是依赖注入
### 1.1 控制反转
依赖注入是实现程序解耦的一种方式。依赖注入是控制反转的一种类型，首先我们看下什么是控制反转；
下面是百度给出的答案：

控制反转：
控制反转（Inversion of Control，英文缩写为IoC）是一个重要的面向对象编程的法则来削减计算机程序的耦合问题。控制反转一般分为两种类型，依赖注入（Dependency Injection，简称DI）和依赖查找（Dependency Lookup）。依赖注入应用比较广泛。        

<!--more-->

### 1.2  这里给出一个比较形象的比喻和解释：   

- 原始社会里，几乎没有社会分工。需要斧子的人(调用者)只能自己去磨一把斧子(被调用者)。对应的情形为：Java程序里的调用者自己创建被调用者。
- 进入工业社会，工厂出现。斧子不再由普通人完成，而在工厂里被生产出来，此时需要斧子的人(调用者)找到工厂，购买斧子，无须关心斧子的制造过程。对应Java程序的简单工厂的设计模式。   
- 进入“按需分配”社会，需要斧子的人不需要找到工厂，坐在家里发出一个简单指令：需要斧子。斧子就自然出现在他面前。对应Spring的依赖注入。


### 1.3 对应分析： 

- 第一种情况下，Java实例的调用者创建被调用的Java实例，必然要求被调用的Java类出现在调用者的代码里。无法实现二者之间的松耦合。
- 第二种情况下，调用者无须关心被调用者具体实现过程，只需要找到符合某种标准(接口)的实例，即可使用。此时调用的代码面向接口编程，可以让调用者和被调用者解耦，这也是工厂模式大量使用的原因。但调用者需要自己定位工厂，调用者与特定工厂耦合在一起。 
- 第三种情况下，调用者无须自己定位工厂，程序运行到需要被调用者时，系统自动提供被调用者实例。  

## 二 实例分析

```
public class Classes {
// 依赖类
	private Boy boy;

	public Classes() {
//在当前对象中直接 new 出依赖类
		boy = new Boy();
	}

	public void run() {
		boy.run();
	}
}

public class Boy {
	String name;

	public Boy() {
	}

	public void run() {
	}
}
```


有一个班级，班级中有一个boy。直接在班级中new出boy。班级中有一个run()方法，其内部实际调用的是boy的run()。

此时看着无大碍，那么如果boy发生了变化，其构造方法发生了变化，需要传入一个姓名。那么需要修改代码： 

```
public class Boy {
	String name;

	public Boy(String name) {
		// 修改了构造方法
		this.name = name;
	}

	public void run() {
	}

public class Classes 
{
//依赖类
private Boy boy;
public Classes()
{
 //因为Boy的构造方法发生变化，所以需要修改该处代码
 boy = new Boy("lilei");
}
public void run()
{
    boy.run();
}
}
```

修改了Boy的构造方法之后，因为Classes依赖Boy，所以其内部也需要修改。

如果又发生了变化，Boy的姓名更改了，又要修改Classes中的代码。。。这样的话，一个还是不明显，当工程量很浩大时，呵呵了。

此时，我们可以将Boy该对象的实例化交给其调用者，通过某种方式传入进来。这种模式就是依赖注入。 


## 三 依赖注入的三种实现方式

依赖注入常见的有三种方式：  

- 构造方法注入
- Setter方式注入
- 接口注入

### 3.1 构造方法注入

该方式是通过构造方法将其所依赖的外部类对象传入进来，是我认为的最简单的方式。其实现方式如下，我们修改之前的代码：

```
public class Classes {
//依赖类
	private Boy boy;

	/**
	 * 构造方法注入，通过构造方法传入该对象
	 * 
	 * @param boy
	 */
	public Classes(Boy boy) {
		this.boy = boy;
	}

	public void run() {
		boy.run();
	}
}
```

### 3.2 Setter 注入

```
public class Classes 
{
//....
private Boy boy;
public void setBoy(Boy boy)
{
    this.boy = boy;
}
//....
}
```

通过手动方式调用set方法将Boy设置进来。  

### 3.3 接口方式
接口方式是定义一个接口，该接口中声明一个注入的方法，而需要注入的类实现该接口，实现接口中定义的方法。

```
public interface BoyInjection 
{
 void inject(Boy boy);
}

public class Classes implements BoyInjection 
{
//....
private Boy boy;
@Override
public void inject(Boy boy) 
{
   //实现接口中的方法
   this.boy = boy;
}
//....
}
```

## 四 依赖注入总结

如上的方式只不过是比较简单的方式，真正的使用中，往往涉及到效率，性能等很多的影响。此时，往往使用一些框架实现依赖注入。   

Dagger2便是一个很好的依赖注入框架。本篇博客也是对Dagger2学习的一个铺垫;   





[1]: http://blog.csdn.net/lisdye2/article/details/51887402
