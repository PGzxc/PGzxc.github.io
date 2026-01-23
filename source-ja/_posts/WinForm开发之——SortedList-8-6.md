---
title: 'WinForm开发之——SortedList(8.6)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 6a0a71e3
date: 2020-07-22 21:56:27
---
## 一 概述

* C# SortedList类实现了IDictionary接口，集合中的值都是以键值对的形式存取的
* SortedList称为有序列表，按照key值对集合中的元素排序

<!--more-->

## 二 实例 <font size=3> 使用 SortedList 实现挂号信息的添加、查找以及遍历操作 </font>

### 2.1 分析

 根据题目要求，向 SortedList 集合中添加 3 位挂号信息（挂号编号、姓名），并根据患者编号查找患者姓名，遍历所有的挂号信息 

### 2.2 代码

```
class Program
{
    static void Main(string[] args)
    {
        SortedList sortList = new SortedList();
        sortList.Add(1, "小张");
        sortList.Add(2, "小李");
        sortList.Add(3, "小刘");
        Console.WriteLine("请输入挂号编号：");
        int id = int.Parse(Console.ReadLine());
        bool flag = sortList.ContainsKey(id);
        if (flag)
        {
            string name = sortList[id].ToString();
            Console.WriteLine("您查找的患者姓名为：{0}", name);
        }
        else
        {
            Console.WriteLine("您查找的挂号编号不存在！");
        }
        Console.WriteLine("所有的挂号信息如下：");
        foreach(DictionaryEntry d in sortList)
        {
            int key = (int)d.Key;
            string value = d.Value.ToString();
            Console.WriteLine("挂号编号：{0}，姓名：{1}", key, value);
        }
    }
}
```
