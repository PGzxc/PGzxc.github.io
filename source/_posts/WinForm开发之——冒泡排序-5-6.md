---
title: 'WinForm开发之——冒泡排序(5.6)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: '62163473'
date: 2020-07-21 20:28:46
---
## 一 概述

* 冒泡排序的原理是将数组元素中相邻两个元素的值进行比较
* 将较小的数放到前面，每一次交换都将最大的数放到最后，依次交换后最终将数组中的元素从小到大排序

<!--more-->

## 二 实例

###  2.1 实例一 <font size=3> 在 Main 方法中创建一个整型数组，并在该数组中存放 5 个元素，使用冒泡排序算法将数组中的元素从小到大排序 </font>

#### 2.1.1 代码

```
class Program
{
   static void Main(string[] args)
   {
      int[] a = { 5,1,7,2,3};
      Console.WriteLine("排序前的结果为：");
      foreach (int b in a)
      {
         Console.Write(b+" ");
      }
      Console.WriteLine();
      for (int i = 0; i < a.Length; i++)
      {
         for (int j = 0; j < a.Length - i - 1; j++)
         {
             if (a[j] > a[j + 1])
             {
                 int temp = a[j];
                 a[j] = a[j+1];
                 a[j + 1] = temp; 
              }
          }
       }
       Console.WriteLine("升序排序后的结果为：");
       foreach (int b in a)
       {
           Console.Write(b+" ");
       }
       Console.WriteLine();
     }
 }
```

#### 2.1.2 执行结果

![][1]

#### 2.1.3 说明

* 如果要对数组中的元素从大到小排序，只需要将if(a[j]>a[j+1])语句更改成if(a[j]<a[j+1])即可

* System.Array是所有数组的基类，其提供的属性和方法也可以被用到任何数组中

* 下面列举了数组中常用的方法

  | **编号** |   **方法**    |                           **描述**                           |
  | :------: | :-----------: | :----------------------------------------------------------: |
  |    1     |    Clear()    |                       清空数组中的元素                       |
  |    2     |    Sort()     |              冒泡排序，从小到大排序数组中的元素              |
  |    3     |   Reverse()   |                    将数组中的元素逆序排列                    |
  |    4     |   IndexOf()   | 查找数组中是否含有某个元素，返回该元素第一次出现的位置，如果没有与之匹配的元素，则返回-1 |
  |    5     | LastIndexOf() |   查找数组中是否含有某个元素，返回该元素最后一次出现的位置   |

### 2.2 示例二 <font size=3> 使用数组中的 Sort 方法完成对数组元素的排序 </font>

#### 2.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        int[] a = {5,3,2,4,1 };
        Console.WriteLine("排序前的结果为：");
        foreach (int b in a)
        {
            Console.Write(b + " ");
        }
        Console.WriteLine();
        Array.Sort(a);
        Console.WriteLine("排序后的结果为：");
        foreach (int b in a)
        {
            Console.Write(b+" ");
        }
        Console.WriteLine();
     }
}
```

#### 2.2.2 说明

* 虽然在数组中没有提供对其降序排序的方法，但可以先将数组中的元素使用Sort排序，再使用Reverse方法将数组中的元素逆序，这样就完成了从大到小的排序

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-array-maopao.png