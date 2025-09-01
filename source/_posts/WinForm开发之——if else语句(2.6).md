---
title: 'WinForm开发之——if else语句(2.6)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: abd949db
date: 2020-07-10 22:40:40
---
## 一 概述

C#中if else语句是最常用的条件语句，并且if else语句的形式有多种

* 包括单一条件的If语句
* 二选一条件的if else语句
* 以及多选一条件的if else if语句。

<!--more-->

## 二 单一条件的 if 语句

* 单一 条件的if语句是最简单的if语句，只有满足if语句中的条件才能执行相应的语句

* 具体的语法形式如下

  ```
  if(布尔表达式)
  {
      语句块;
  }
  ```

* 这里语句块是指多条语句。当布尔表达式中的值为True时执行语句块中的内容，否则不执行

## 三 二选一条件的 if 语句

* 二选一条件的If语句与前面介绍的三元运算符完成的效果是一样的，只是比三元运算符实现的构成灵活一些

* 具体的语法形式如下

  ```
  if(布尔表达式)
  {
      语句块 1;
  }else{
      语句块 2;
  }
  ```

* 上面语句的执行过程是当If中的布尔表达式的结果为True时执行语句块1，否则执行语句块2

## 四 多选一条件的 if 语句

* 多选一条件是最复杂的if语句，但是语法形式并不难

* 具体的语法形式如下

  ```
  if(布尔表达式 1)
  {
      语句块 1;
  }else if(布尔表达式 2){
      语句块 2;
  }
  ...
  else{
      语句块 n;
  }
  ```

* 上面语句的执行过程是先判断布尔表达式1的值是否为True，如果为True，执行语句块1，整个语句结束，否则依次判断每个布尔表达式的值，如果都不为True，执行else语句中的语句块n。

* 需要注意的是：在上面的语法中最后一个else{}语句是可以省略的，如果省略了else{}语句，那么多分枝的if语句中如果没有布尔型表达式的值为True的语句，则不会执行任何语句块

## 五 实例(<font size=1> 使用多分支 if 语句完成对游戏账户积分等级的判断，判断的条件是当游戏积分为 0~100 时是初级、100~200 时是中级、200~500 时是高500以上时是特级 </font>)

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("请输入游戏积分（大于0的整数）");
        int points = int.Parse(Console.ReadLine());
        //如果输入的积分小于0则将其设置为0
        if (points < 0)
        {
            points = 0;
        }
        if (points <= 100)
        {
            Console.WriteLine("您的游戏等级为初级");
        }else if (points <= 300)
        {
            Console.WriteLine("您的游戏等级为中级");
        }else if (points <= 500)
        {
            Console.WriteLine("您的游戏等级为高级");
        }else
        {
            Console.WriteLine("您的游戏等级为特级");
        }
    }
}
```
