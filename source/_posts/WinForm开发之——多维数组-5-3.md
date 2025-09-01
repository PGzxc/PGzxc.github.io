---
title: 'WinForm开发之——多维数组(5.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ee1cd668
date: 2020-07-20 21:33:25
---
## 一 概述

* 我们在介绍一维数组中降到一维数组中的元素时使用的是一个下标，例如a[0]，
* 而多维数组使用多个下标来访问，例如：a[0,0],a[1,0,0]等

<!--more-->

## 二 多维数组的语法形式

### 2.1 多维数组语法形式

```
/定义多维数组
数据类型[ , , ...]  数组名;
//创建多维数组并初始化
数据类型[ , , ...]   数组名 = new  数据类型[m,n,...]  {{ , , ...},{ , , ...}};
```

### 2.2 说明

* 从上面定义的语法可以看出，它与一维数组的定义非常类似，每多一个维度则在定义的`[]`中增加一个','
* 存取数组中的值也是将下标用","隔开

## 三 实例

### 3.1 实例一 <font size=3> 在 Main 方法中定义一个存放学生成绩的二维数组，并将该数组中每个学生的成绩输出 </font>

#### 3.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        double[,] points = { { 90, 80 }, { 100, 89 }, { 88.5, 86 } };
        for(int i = 0; i < points.GetLength(0); i++)
        {
            Console.WriteLine("第" + (i + 1) + "个学生成绩：");
            for(int j = 0; j < points.GetLength(1); j++)
            {
                Console.Write(points[i, j] + " ");
            }
            Console.WriteLine();
        }
    }
}
```

#### 3.1.2 执行结果

![][1]

#### 3.1.3 说明

* 在遍历多维数组元素时使用GetLength(维度)方法能获取多维数组中每一维的元素
* 维度也是从0开始的，因此在该实例中获取数组中第一维度的值时使用的是points.GetLengt(0)

#### 3.1.4 延伸

* 在C#语言上不仅支持上面给出的多维数组，也支持锯齿型数组，即在多维数组中的每一维中所存放值的个数不同

* 锯齿型数组也被称为数组中的数组。定义锯齿型数组的语法形式如下：

  ```
  数据类型[][]  数组名 = new 数据类型[数组长度][];
  数组名[0] = new 数据类型[数组长度];
  ```

* 在这里，数据类型指的是整个数组中元素的类型，在滴定仪锯齿形数组时必须要指定维度

### 3.2 实例二<font size=3> 在 Main 方法中创建一个锯齿型数组，第一维数组的长度是 2、第二维数组的长度是 3、第三维数组的长度是 4，并直接向数组中赋值，最后输出数组中的元素 </font>

#### 3.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        int[][] arrays = new int[3][];
        arrays[0] = new int[] { 1, 2 };
        arrays[1] = new int[] { 3, 4, 5 };
        arrays[2] = new int[] { 6, 7, 8, 9 };
        for(int i = 0; i < arrays.Length; i++)
        {
            Console.WriteLine("输出数组中第" + (i + 1) + "行的元素：");
            for(int j=0;j<arrays[i].Length; j++)
            {
                Console.Write(arrays[i][j] + " ");
            }
            Console.WriteLine();
        }
    }
}
```

#### 3.2.2 执行结果

![][2]

#### 3.2.3  arrays 数组中的元素从控制台输入的具体语句如下 

```
int[][] arrays = new int[3][];
arrays[0] = new int[2];
arrays[1] = new int[3];
arrays[2] = new int[4];
for(int i = 0; i < arrays.Length; i++)
{
    Console.WriteLine("输入数组中第" + (i + 1) + "行的元素：");
    for(int j=0;j<arrays[i].Length; j++)
    {
        arrays[i][j] = int.Parse(Console.ReadLine());
    }
    Console.WriteLine();
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-multi-array-score.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-multi-array-wave.png

