---
title: 'WinForm开发之——类的定义(3.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 42b0440a
date: 2020-07-14 20:43:58
---
## 一 概述

* 在C#语言中创建的任何项目都有类的存在，通过类能很好地体现面向对象语言中封装、继承、多态的特性
* 本节将讲解C#中的类和定义类的方式
* 类定义的语法形式并不复杂，使用class关键字，它是定义类的关键字

<!--more-->

## 二 类定义的语法形式

```
类的访问修饰符    修饰符    类名
{
    类的成员
}
```

* 类的访问修饰符：用于设定对类的访问限制，包括public、internal或者不写，用internal或者不写代表只能在当前项目中访问类；public则代表可以在任何项目中访问类
* 修饰符：修饰符是对类本身特点的描述，包括abstract、sealed和static。abstract是抽象的意思，使用它修饰的类不能被实例化；sealed修饰的类是密封类，不能被继承；static修饰的类是静态类，不能被实例化
* 类名：类名用于描述类的功能，因此在定义类名时最好是具有实际意义，这样方便用户理解类中描述的内容。在同一个命名空间下类名必须是唯一的
* 类的成员：在类中能定义的元素，主要包括字段、属性、方法

## 三 实例 <font size=3>在visual studio的项目中添加类文件</font>

* 创建控制台应用程序code_1

  ![][1]
  
* 项目创建后的结构示意图

  ![][2]
  
* 在上图中右击项目名称，在弹出的菜单中依次选择“添加”一“新建项”一“类”命令

  ![][3]
  
* 将此类名设置为Test

  ![][4]
  
* 添加后的类内容如下(从创建的Test类可以看出，默认情况下创建的类在class关键字前面没有任何修饰符 ，因此默认创建的类能在同一个项目中被访问)

  ```
  using System;
  using System.Collections.Generic;
  using System.Text;
  
  namespace code_1
  {
      class Test
      {
      }
  }
  ```

* 另外，在同一个命名空间中也可以定义多个类。例如上面的代码所示的文件中在定义一个名为Test1的类(尽管可以在一个命名空间中定义多个类，但不建议使用这种方式，最好是每一个文件定义一个类，这样方便阅读和查找)

  ```
  namespace code_1
  {
      class Test
      {
      }
      class Test1
      {
      }
  }
  ```

  

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-define-create-code-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-define-code-1-struct.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-define-add-new-class.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-class-define-test.png