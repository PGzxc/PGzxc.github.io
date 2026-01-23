---
title: 'WinForm开发之——ArrayList(8.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: abc5131a
date: 2020-07-22 21:50:58
---
## 一 概述

* C# ArrayList类(动态数组)是一个最常用的集合类，与数组的操作方法也是最类似的
* ArrayList代表了可被单独索引的对象的有序集合。它基本上可以替代一个数组
* 但是，与数组不同的是，ArrayList可以使用索引在指定的位置添加和移除项目，动态数组会自动重新调整它的大小
* 同时ArrayList也允许在列表中进行动态内存分配、增加、搜索、排序各项

<!--more-->

## 二 构造方法

### 2.1 构造方法列表

|       **构造方法**       |                           **作用**                           |
| :----------------------: | :----------------------------------------------------------: |
|       ArrayList()        |       创建 ArrayList 的实例，集合的容量是默认初始容量        |
| ArrayList(ICollection c) | 创建 ArrayList 的实例，该实例包含从指定实例中复制的元素，并且初始容量与复制的元素个数相同 |
| ArrayList(int capacity)  |           创建 ArrayList 的实例，并设置其初始容量            |

### 2.2 初始构造代码

```
ArrayList listl=new ArrayList();
ArrayList list2=new ArrayList(listl);
ArrayList list3=new ArrayList(20);
```

### 2.3 集合赋值

* 在创建ArrayList类的实例后，集合中还未存放值

* C#语言中提供了集合初始化器，允许在创建集合实例时向集合中添加元素

  ```
  ArrayList list4 = new ArrayList(){l,2,3,4};
  ```

### 2.4 集合遍历

* 集合与数组一样也能使用foreach语句遍历元素
* 由于在集合中存放的值允许任意类型，能使用var关键字来定义任意类型的变量
* 遍历list集合中的数据的代码如下(执行代码，即可将集合list4中的元素输出)：

  ```
  foreach(var v in list4)
  {
      Console.WriteLine(v);
  }
  ```

### 2.5 集合中常见属性及方法

|                       **属性或方法**                        |                           **作用**                           |
| :---------------------------------------------------------: | :----------------------------------------------------------: |
|                    int Add(object value)                    |    向集合中添加 object 类型的元素，返回元素在集合中的下标    |
|                void AddRange(ICollection c)                 |                   向集合中添加另一个集合 c                   |
|                          Capacity                           |         属性，用于获取或设置集合中可以包含的元素个数         |
|                        void Clear()                         |                     从集合中移除所有元素                     |
|                 bool Contains(object item)                  | 判断集合中是否含有 item 元素，若含有该元素则返回 True, 否则返回 False |
|                  void CopyTo(Array array)                   | 从目标数组 array 的第 0 个位置开始，将整个集合中的元素复制到类型兼容的数组 array 中 |
|           void CopyTo(Array array,int arraylndex)           | 从目标数组 array 的指定索引 arraylndex 处，将整个集合中的元素赋值到类型兼容的数组 array 中 |
| void CopyTo(int index,Array array,int arrayIndex,int count) | 从目标数组 array 的指定索引 arrayindex 处，将集合中从指定索引 index 开始的 count 个元素复制到类型兼容的数组 array 中 |
|                            Count                            |            属性，用于获取集合中实际含有的元素个数            |
|                  int IndexOf(object value)                  |            返回 value 值在集合中第一次出现的位置             |
|          int IndexOf(object value,int startIndex)           |  返回 value 值在集合的 startindex 位置开始第一次出现的位置   |
|     int IndexOf(object value,int startIndex,int count)      | 返回 value 值在集合的 startindex 位置开始 count 个元素中第一次出现的位置 |
|                int LastIndexOf(object value)                |           返回 value 值在集合中最后一次出现的位置            |
|        int LastIndexOf(object value,int startIndex)         | 返回 value 值在集合的 startindex 位置开始最后一次出现的位置  |
|   int LastIndexOf(object value,int startIndex,int count)    | 入元素 value值在集合的 startindex 位置开始 count 个元素中最后一次出现的位置 |
|             void Insert(int index,object value)             |           返回 value 向集合中的指定索引 index 处插           |
|          void InsertRange(int index,ICollection c)          |           向集合中的指定索引 index 处插入一个集合            |
|                   void Remove(object obj)                   |                 将指定兀素 obj 从集合中移除                  |
|                  void RemoveAt(int index)                   |              移除集合中指定位置 index 处的元素               |
|            void RemoveRange(int index,int count)            |         移除集合中从指定位置 index 处的 count 个元素         |
|                       void Reverse()                        |                    将集合中的元素顺序反转                    |
|              void Reverse(int index,int count)              |        将集合中从指定位置 index 处的 count 个元素反转        |
|                         void Sort()                         |             将集合中的元素排序，默认从小到大排序             |
|                void Sort(IComparer comparer)                |         将集合中的元素按照比较器 comparer 的方式排序         |
|      void Sort(int index,int count,IComparer comparer)      | 将集合中的元素从指定位置 index 处的 count 个元素按照比较器 comparer 的方式排序 |
|                      void TrimToSize()                      |            将集合的大小设置为集合中元素的实际个数            |

## 三 实例

### 3.1 完成的操作

定义 ArrayList 集合，在集合中存入任意值，完成如下操作。

- 查找集合中是否含有 abc 元素。
- 将集合中元素下标是偶数的元素添加到另一个集合中。
- 在集合中第一个元素的后面任意插入 3 个元素。
- 将集合中的元素使用 Sort 方法排序后输出。

### 3.2 实例一 <font size=3> 是查找集合中的元素，使用 IndexOf 或者 LastlndexOf 都可以 </font>

#### 3.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ArrayList list = new ArrayList() { "aaa", "bbb", "abc", 123, 456 };
        int index = list.IndexOf("abc");
        if (index != -1)
        {
            Console.WriteLine("集合中存在 abc 元素！");
        }
        else
        {
            Console.WriteLine("集合中不存在 abc 元素！");
        }
    }
}
```

### 3.3 实例二 <font size=3> 将集合中下标为偶数的元素添加到另一个集合中，由于集合中共有 5 个元素，则所添加元素的下标分别为 0、2、4 </font>

#### 3.3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ArrayList list = new ArrayList() { "aaa", "bbb", "abc", 123, 456 };
        ArrayList newList = new ArrayList();
        for(int i = 0; i < list.Count; i = i + 2)
        {
            newList.Add(list[i]);
        }
        foreach(var v in newList)
        {
            Console.WriteLine(v);
        }
    }
}
```

### 3.4 实例三 <font size=3> 在集合中的第一个元素后面添加元素，使用 Insert 方法每次只能添加一个元素，但使用 InsertRange 方法能直接将一个集合插入到另一个集合中 </font>

#### 3.4.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ArrayList list = new ArrayList() { "aaa", "bbb", "abc", 123, 456 };
        ArrayList insertList = new ArrayList() { "A", "B", "C" };
        list.InsertRange(1, insertList);
        foreach(var v in list)
        {
            Console.WriteLine(v);
        }
    }
}
```

### 3.5 实例四 <font size=3> 将集合中的元素使用 Sort 方法排序后输出 </font>

#### 3.5.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        ArrayList list = new ArrayList() { "aaa", "bbb", "abc" };
        list.Sort();
        foreach(var v in list)
        {
            Console.WriteLine(v);
        }
    }
}
```

### 3.6 实例五 <font size=3> 定义一个 ArrayList 类型的集合，并在其中任意存放 5 个值，使用 Sort 方法完成排序并输岀结果 </font>

### 3.6.1 代码

```
class MyCompare :IComparer
{
    public int Compare(object x,object y)
    {
        string str1 = x.ToString();
        string str2 = y.ToString();
        return str1.CompareTo(str2);
    }
}
class Program
{
    static void Main(string[] args)
    {
        ArrayList list = new ArrayList() { "a", "b", "c", 1, 2 };
        MyCompare myCompare = new MyCompare();//创建自定义比较器实例
        list.Sort(myCompare);
        foreach(var v in list)
        {
            Console.WriteLine(v);
        }
    }
}
```

