---
title: 'WinForm开发之——get和set访问器(3.5)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 483a3ae0
date: 2020-07-14 20:48:02
---
## 一 概述

* 属性经常与字段连用，并提供了get访问器和set访问器，分别用于获取或设置字段的值
* get访问器和set访问器的使用与方法非常类似，可以在操作字段时根据一些规则和 条件来设置或获取字段的值
* 此外，为了保证字段的安全性，还能选择省去get访问器或set访问器

<!--more-->

## 二 get和set访问器语法形式

```
public    数据类型    属性名
{
    get
    {
        获取属性的语句块;
        return 值;
    }
    set
    {
        设置属性得到语句块;
    }
}
```

### 2.1 get{}

* get访问器，用于获取属性的值，需要在get语句最后使用return关键字返回一个与属性类型相兼容的值
* 若在属性定义中省略了该访问器，则不能在其他类中获取私有类型的字段值，因此也称为只写属性

### 2.2 set{}

* set访问器用于设置字段的值，这里需要使用一个特殊的值value，它就是给字段赋值的值
* 在set访问器省略后无法在其他类中给字段赋值，因此也称为只读属性
* 通常属性名的命名使用的是Pascal命名法，单词的首字母大写，如果是多个单词构成，每个单词的首字母大写
* 偶遇属性都是针对某个字段赋值的，因此属性的名称通常是将字段中每个单词的首字母大写。例如：定义了一个名为name的字段，属性名则为Name

## 三 示例 <font size=2>定义一个图书信息类（Book），在类中定义图书编号（id）、图书名称（name）、图书价格（price）3 个字段，并分别为这 3 个字段设置属性，其中将图书名称设置为只读属性 </font>

### 代码

```
namespace code_1
{
    class Book
    {
        private int id;
        private string name;
        private double price;
        //设置图书编号属性
        public int Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }
        //设置图书名称属性
        public string Name
        {
            get
            {
                return name;
            }
        }
        //设置图书价格属性
        public double Price
        {
            get
            {
                return price;
            }
            set
            {
                price = value;
            }
        }
    }
}
```

###  赋值限制

* 在上面的实例中，在给字段赋值时直接将value值赋给字段，如果要对赋值字段的值加以限制，可以先判断value值是否满足条件，如果满足条件则赋值，否则给字段赋默认值或进行其他操作

*  假设上面实例中的图书价格要求是大于 0 的，如果输入的值不满足条件，则将图书价格设置为 0。修改后的图书价格字段的属性代码如下 

  ```
  public double Price
  {
      get
      {
          return price;
      }
      set
      {
       if(value >= 0)
       {
           price = value;
       }
       else
       {
           price = 0;
       }
      }
  }
  ```
### 简化

* 通过上面的实例可以看出，在定义字段属性时，属性的作用就是为字段提供get、set访问器，由于操作都比较了类似，在C#语言中可以将属性的定义简化成如下写法

  ```
  public    数据类型    属性名{get;set;}
  ```

* 这种方式也被称为自动属性设置。简化后的图书类中属性设置的代码

  ```
  public int Id{get; set;}
  public string Name{get; set;}
  public double Price{get; set;}
  ```

* 如果使用上面的方法类设置属性，则不需要先指定字段。如果要使用自动属性的方式来设置属性表示只读属性，直接省略set访问器即可。只读属性可以写成如下形式

  ```
  public int Id{get;}=1;
  ```

* 这里相当于将Id属性的值设置成1，并且要加分号结束。但是，在使用自动生成属性的方法时不能省略get访问器，如果不允许其他类访问属性值，则可以在get访问器前面加上访问修饰符private，这样，Id属性的get访问器只能在当前类中使用

  ```
  public int Id{private get; set;}
  ```


## 四  使用visual studio编辑

* Visual studio打开Book类后，选中要生成属性的字段，在菜单栏汇总依次选择“编辑——>重构——>封装字段”

  ![][1]
  
* 在该对话框中如果需要对生成属性的字段做更改，可以通过复选框选中或取消，确认生成的属性后单击“应用”按钮，即可完成封装字段的操作

  ![][2]
  
* 用户还可以右击设置好的字段，此时会弹出如下图所示的菜单

  ![][3]
  
  



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-set-get-package-field.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-set-get-package-apply.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-set-get-quick-refact.png