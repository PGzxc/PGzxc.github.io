---
title: 'WinForm开发之——Driveinfo(10.1)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 673a6cb3
date: 2020-07-23 20:24:37
---
## 一 概述

查看计算机驱动器信息主要包括查看磁盘的空间、磁盘的文件格式、磁盘的卷标等，在C#语言中这些操作可以通过Driveinfo类来实现

<!--more-->
## 二  构造方法

### 2.1 构造方法

```
Driveinfo(string driveName)
```

* Driveinfo类是一个密封类，即不能被继承，其仅提供了一个构造方法
* driveName参数是指有效驱动器路径或驱动器号，Null值是无效的

### 2.2 创建实例

```
Driveinfo driveInfo=new Driveinfo("C");
```

* 上面的代码创建了磁盘的盘符是C的驱动器实例，通过该实例能获取该盘符下的信息，包括磁盘的名称、磁盘的格式等

## 三 Driveinfo常用属性和方法

|       属性和方法        |                             作用                             |
| :---------------------: | :----------------------------------------------------------: |
|   AvailableFreeSpace    |       只读属性，获取驱动器上的可用空间量(以字节为单位)       |
|       DriveFormat       |      只读属性，获取文件系统格式的名称，例如NTFS或FAT32       |
|        DriveType        | 只读属性，获取驱动器的类型，例如CD-ROM、可移动驱动器、网络驱动器或固定驱动器 |
|         IsReady         | 只读属性，获取一个指示驱动器是否已准备好的值，True为准备好了，False为未准备好 |
|          Name           |             只读属性，获取驱动器的名称，例如C:\              |
|      RootDirectory      |                 只读属性，获取驱动器的根目录                 |
|     TotalFreeSpace      |    只读属性，获取驱动器上的可用空闲空间总量(以字节为单位)    |
|        TotalSize        |     只读属性，获取驱动器上存储空间的总大小(以字节为单位)     |
|       VolumeLabel       |                 属性，获取或设置驱动器的卷标                 |
| Driveinfo[] GetDrives() |       静态方法，检索计算机上所有逻辑驱动器的驱动器名称       |

## 三 实例

### 3.1 实例一 <font size=4.5> 获取 D 盘中的驱动器类型、名称、文件系统名称、可用空间以及总空间大小 </font>

#### 3.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        DriveInfo driveInfo = new DriveInfo("D");
        Console.WriteLine("驱动器的名称：" + driveInfo.Name);
        Console.WriteLine("驱动器类型：" + driveInfo.DriveType);
        Console.WriteLine("驱动器的文件格式：" + driveInfo.DriveFormat);
        Console.WriteLine("驱动器中可用空间大小：" + driveInfo.TotalFreeSpace);
        Console.WriteLine("驱动器总大小：" + driveInfo.TotalSize);
    }
}
```

#### 3.1.2 执行结果
![][1]

#### 3.1.3 说明

* 驱动器类型中的Fixed值代表的本地磁盘，驱动器中可用空间的大小和总大小的单位是字节(B)
* 如果需要对空间大小的单位进行转换，按照规则进行运算即可，即1kB=1024B，1MB=1024KB,1GB=1024MB

### 3.2 实例二 <font size=5> 获取计算机中所有驱动器的名称和文件格式 </font>

#### 3.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        DriveInfo[] driveInfo = DriveInfo.GetDrives();
        foreach(DriveInfo d in driveInfo)
        {
            if (d.IsReady)
            {
                Console.WriteLine("驱动器名称：" + d.Name);
                Console.WriteLine("驱动器的文件格式" + d.DriveFormat);
            }
        }
    }
}
```

#### 3.2.2 执行结果
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-file-driveinfo-d.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-file-driveinfo-all.png
