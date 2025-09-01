---
title: 'WinForm开发之——virtual关键字(6.8)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 81282f21
date: 2020-07-21 20:39:35
---
## 一 概述

* C#中virtual是虚拟的含义，在C#语言中，默认情况下类中的成员都是非虚拟的，通常将类中的成员定义成虚拟的，表示这些成员将会在继承后重写其中的内容
* virtual关键字能够修饰方法、属性、索引器以及事件，用到父类的成员中

<!--more-->

## 二 virtual 语法形式

### 2.1 语法形式

#### 2.1.1 使用virtual关键字修饰属性语法形式

```
//修饰属性
public  virtual  数据类型  属性名{get; set; }
```

#### 2.1.2 使用virtual关键字修饰方法语法形式

```
//修饰方法
访问修饰符  virtual  返回值类型 方法名
{
    语句块；
}
```

#### 2.1.3 说明

* 需要注意的是，virtual关键字不能修饰使用static修饰的成员
* 此外，virtual关键字既可以添加到访问修饰符的后面，也可以添加到访问修饰符的前面，但实际应用中习惯将该关键字放访问修饰符的后面
* 子类基层父类中能重写父类中的成员，重写的关键字是override
* 所谓重写是指子类和父类的成员定义一致，仅在子类中增加了override关键字修饰成员

#### 2.1.3 重写override

##### 例如在父类中有一个求长方形面积的方法，方法定义如下：

```
publie int Area（int x, int y）
{
    return x * y
}
```

##### 在子类中重写该方法的代码如下

```
public override int Area（int x,int y）
{
    语句块；
    return  整数类型的值;
}
```

在子类中重写父类中的方法后能改变方法体中的内容，但是方法的定义不能改变

## 三 实例

### 3.1 实例一 <font size=3>将上一节中定义的Person类中的Print方法更改为虚拟的方法，分别用Student类和Teacher类继承Person类，并重写Print方法，打印出学生信息和教师信息</font>

#### 3.1.1 代码

```
 class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Cardid { get; set; }
        public string Tel { get; set; }
        public virtual void Print()
        {
            Console.WriteLine("编号：" + Id);
            Console.WriteLine("姓名：" + Name);
            Console.WriteLine("性别：" + Sex);
            Console.WriteLine("身份证号：" + Cardid);
            Console.WriteLine("联系方式：" + Tel);
        }
    }
    class Student : Person
    {
        public string Major { get; set; }
        public string Grade { get; set; }
        public override void Print()
        {
            Console.WriteLine("编号：" + Id);
            Console.WriteLine("姓名：" + Name);
            Console.WriteLine("性别：" + Sex);
            Console.WriteLine("身份证号：" + Cardid);
            Console.WriteLine("联系方式：" + Tel);
            Console.WriteLine("专业：" + Major);
            Console.WriteLine("年级：" + Grade);
        }
    }
    class Teacher:Person
    {
        public string Title { get; set; }
        public string WageNo { get; set; }
        public override void Print()
        {
            Console.WriteLine("编号：" + Id);
            Console.WriteLine("姓名：" + Name);
            Console.WriteLine("性别：" + Sex);
            Console.WriteLine("身份证号：" + Cardid);
            Console.WriteLine("联系方式：" + Tel);
            Console.WriteLine("职称：" + Title);
            Console.WriteLine("工资号：" + WageNo);
        }
    }
```

#### 3.1.2 说明

* 通过上面的代码即可完成对Person类中Print方法的重写，在重写后的Print方法中能直接调用在Person类中定义的成员
* 但在Person类的Person类的Print中已经对Person中的相关属性编写了输出操作的代码，而每一个子类中又重复地编写了代码，造成了代码的冗余，也没有体现代码重用的特点
* 在重写Print方法后仍然需要使用base关键字调用父类中的Print方法执行相应的操作

### 3.2 实例二 <font size=3>改写实例1中的Student和Teacher类中重写Print方法，使用base关键字调用父类中的Print方法</font>

#### 3.2.1 代码

```
 class Student : Person
    {
        public string Major { get; set; }
        public string Grade { get; set; }
        public override void Print()
        {
            base.Print();
            Console.WriteLine("专业：" + Major);
            Console.WriteLine("年级：" + Grade);
        }
    }
    class Teacher:Person
    {
        public string Title { get; set; }
        public string WageNo { get; set; }
        public override void Print()
        {
            base.Print();
            Console.WriteLine("职称：" + Title);
            Console.WriteLine("工资号：" + WageNo);
        }
    }
```
### 3.3 实例三 <font size=3> 方法隐藏和重写方法有区别 </font>
#### 3.3.1 代码
```
class Program
{
    static void Main(string[] args)
    {
        A a1 = new B();
        a1.Print();
        A a2 = new C();
        a2.Print();
    }
}
class A
{
    public virtual void Print()
    {
        Console.WriteLine("A");
    }
}
class B :A
{
    public new void Print()
    {
        Console.WriteLine("B");
    }
}
class C :A
{
    public override void Print()
    {
        Console.WriteLine("C");
    }
}
```

#### 3.3.2 执行结果

![][1]

#### 3.3.3 说明

* 从上面的执行结果可以看出，使用方法隐藏的方法调用的结果是父类A中Print方法的内容

* 而使用方法重写的方法调用的结果是子类C中Print方法的内容

* 因此，方法隐藏相当于在子类中定义新方法，而方法重写则是重新定义父类中方法的内容

* 从上面的代码可以看出，在`A a1=new B()`语句中，A类是父类，B类是子类，相当于将子类转换成父类，即隐式转换

* 如果需要将父类转换成子类，则需要强制转换，并且在强制转换前需要先将所需的子类转换成父类

  ```
  A a2=new C();
  C c=(C) a2;
  c.Print();
  ```

#### 3.3.4  在 Student 类中添加重写的 ToString 方法 

```
class Student
{
    public string Major{ get; set;}
    public string Grade{ get; set;}
    public void Print()
    {
        Console.WriteLine("专业："+ Major);
        Console.WriteLine("年级："+ Grade);
    }
    public override string ToString()
    {
        return Major+","+Grade;
    }
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-virtual-print.png