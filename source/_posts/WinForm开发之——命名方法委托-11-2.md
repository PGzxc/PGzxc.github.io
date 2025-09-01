---
title: 'WinForm开发之——命名方法委托(11.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: '11678924'
date: 2020-07-24 21:42:42
---
## 一 委托定义

在C#语言中命名方法委托是最常见的一种委托，其定义的语法形式如下

```
修饰符 delegate 返回值类型 委托明(参数列表);
```

从上面的定义可以看出，委托的定义与方法的定义是相似的。例如定义一个不带参数的委托，代码如下：  

```
public delegate void MyDelegate();
```

<!--more-->

## 二 委托的实例化

在定义好委托后就到了实例化委托的步骤，命名方法委托在实例化委托时必须带入方法的具体名称

### 2.1 实例化形式

```
委托明 委托对象名=new 委托名(方法名);
```

* 委托中传递的方法名既可以是静态方法的名称，也可以是实例方法的名称
* 需要注意的是，在委托中缩写的方法名必须与委托定义时的返回值类型和参数列表相同

## 三 委托调用

```
委托对象名(参数列表);
```

*  在实例化委托后即可调用委托，语法形式如上
* 这里，参数列表中传递的参数与委托定义的参数列表相同即可

## 四 实例

### 4.1 实例一 <font size=4> 创建委托，在委托中传入静态方法于控制台输出“Hello Delegate!” </font>

#### 4.1.1 代码

```
class Program
{
    public delegate void MyDelegate();
    static void Main(string[] args)
    {
        MyDelegate myDelegate = new MyDelegate(Test.SayHello);
        myDelegate();
    }
}
class Test
{
    public static void SayHello()
    {
        Console.WriteLine("Hello Delegate!");
    }
}
```

#### 4.1.2 说明

若使用静态方法，在向委托中传递方法名时，只需要用“类名.方法名”的形式

### 4.2 失实例二 <font size=4> 将实例 1 中的静态方法改成实例方法 </font>

#### 4.2.1 代码

```
class Program
{
    public delegate void MyDelegate();
    static void Main(string[] args)
    {
        MyDelegate myDelegate = new MyDelegate(new Test().SayHello);
        myDelegate();
    }
}
class Test
{
    public void SayHello()
    {
        Console.WriteLine("Hello Delegate!");
    }
}
```

#### 4.2.2 说明

* 由于在委托中使用的是实例方法，则需要通过类的实例来调用方法，即使用"new 类名().方法名"的形式
* 除了使用匿名对象的方法调用方法以外，也可以先创建类的实例，再通过类的实例调用方法

### 4.3 实例三 <font size=5> 使用委托完成将图书信息按照价格升序排序的操作 </font>

#### 4.3.1 分析

 根据题目要求，先定义图书信息类，然后定义对图书价格排序的方法 

#### 4.3.2 代码

```
class Book:IComparable<Book>
{
    //定义构造方法为图书名称和价格赋值
    public Book(string name,double price)
    {
        Name = name;
        Price = price;
    }
    //定义图书名称属性
    public string Name { get; set; }
    //定义图价格属性
    public double Price { get; set; }
    //实现比较器中比较的方法
    public int CompareTo(Book other)
    {
        return (int)(this.Price - other.Price);
    }
    //重写ToString方法，返回图书名称和价格
    public override string ToString()
    {
        return Name + ":" + Price;
    }
    //图书信息排序
    public static void BookSort(Book[] books)
    {
        Array.Sort(books);
    }
}

class Program
{
    //定义对图书信息排序的委托
    public delegate void BookDelegate(Book[] books);
    static void Main(string[] args)
    {
        BookDelegate bookDelegate = new BookDelegate(Book.BookSort);
        Book[] book = new Book[3];
        book[0] = new code_1.Book("计算机应用", 50);
        book[1] = new code_1.Book("C# 教程", 59);
        book[2] = new code_1.Book("VS2015应用", 49);
        bookDelegate(book);
        foreach(Book bk in book)
        {
            Console.WriteLine(bk);
        }
    }
}
```

#### 4.3.3 说明

* 从执行结果可以看出，通过委托调用的图书排序方法(BookSort)按照图书价格升序排列了图书信息
* 需要注意的是，由于Book[]数组是引用类型，因此通过委托调用后其值也发生了相应的变化，即book数组中的值已经是完成了排序操作后的结果