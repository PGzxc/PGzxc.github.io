---
title: 'WinForm开发之——Directoryinfo(10.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: f4dd216b
date: 2020-07-23 20:29:34
---
## 一 概述

* 在C#语言中Directory类和Directoryinfo类都是对文件夹进行操作的
* Directoryinfo类能创建该类的实例，通过类的实例访问类成员

<!--more-->

## 二 构造方法

### 2.1 构造方法

```
DirectoryInfo(string path)
```

* 这里的path参数用于指定文件的目录，即路径

### 2.2 实例

```
DirectoryInfo directoryInfo = new DirectoryInfo("D:\\test");
```

* 例如创建路径为D盘中的test文件夹的实例，如上图
* 需要注意的是路径中如果使用`\`，要使用转义字符来表示，即`\\`；或者在路径中将`\`字符换成`/`

## 三 常用属性和方法

|                        **属性或方法**                        |                           **作用**                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                            Exists                            |              只读属性，获取指定目录是否存在的值              |
|                             Name                             |          只读属性，获取DirectoryInfo实例的目录名称           |
|                            Parent                            |              只读属性，获取指定的子目录的父目录              |
|                             Root                             |                  只读属性，获取目录的根部分                  |
|                        void Create()                         |                           创建目录                           |
|        DirectoryInfo CreateSubdirectory(string path)         |               在指定路径上创建一个或多个子目录               |
|                        void Delete()                         |                  如果目录为空，则将目录删除                  |
|                 void Delete(bool recursive)                  | 指定是否删除子目录和文件，如果recursive参数的值为True，则删除，否则不删除 |
|      IEnumerable\<DirectoryInfo> EnumerateDirectories()      |              返回当前目录中目录信息的可枚举集合              |
| IEnumerable\<DirectoryInfo> EnumerateDirectories(string searchPattern) |        返回与指定的搜索模式匹配的目录信息的可枚举集合        |
|           IEnumerable\<FileInfo> EnumerateFiles()            |             返回当前目录中的文件信息的可枚举集合             |
| IEnumerable\<FileInfo> EnumerateFiles(string searchPattern)  |           返回与搜索模式匹配的文件信息的可枚举集合           |
|   IEnumerable\<FileSystemInfo> EnumerateFileSystemInfos()    |           返回当前目录中的文件系统信息的可枚举集合           |
| IEnumerable\<FileSystemInfo> EnumerateFileSystemInfos(string searchPattern) |      返回与指定的搜索模式匹配的文件系统信息的可枚举集合      |
|               DirectoryInfo[] GetDirectories()               |                     返回当前目录的子目录                     |
|     DirectoryInfo[] GetDirectories(string searchPattern)     |               返回匹配给定的搜索条件的当前目录               |
|                    FileInfo[] GetFiles()                     |                    返回当前目录的文件列表                    |
|          FileInfo[] GetFiles(string searchPattern)           |         返回当前目录中与给定的搜索模式匹配的文件列表         |
|            FileSystemInfo[] GetFileSystemInfos()             |               返回所有文件和目录的子目录中的项               |
|  FileSystemInfo[] GetFileSystemInfos(string searchPattern)   |      返回与指定的搜索条件匹配的文件和目录的子目录中的项      |
|               void MoveTo(string destDirName)                |          移动 DirectoryInfo 实例中的目录到新的路径           |

## 四 实例

### 4.1 实例一 <font size=4> 在 D 盘下创建文件夹 directoryInfo，并在该文件夹中创建 code-1和 code-2 两个子文件夹 </font>

#### 4.1.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        DirectoryInfo directoryInfo = new DirectoryInfo("D:\\directoryInfo");
        directoryInfo.Create();
        directoryInfo.CreateSubdirectory("code-1");
        directoryInfo.CreateSubdirectory("code-2");
    }
}
```

#### 4.1.2 执行结果
![][1]

#### 4.1.3 说明

* 需要注意的是，在创建文件夹时即使磁盘上存在同名文件夹也可以直接创建，不会出现异常

### 4.2 实例二 <font size=5> 查看 D 盘下 code 文件夹中的文件夹 </font>

#### 4.2.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        DirectoryInfo directoryInfo = new DirectoryInfo("D:\\directoryInfo");
        IEnumerable<DirectoryInfo> dir = directoryInfo.EnumerateDirectories();
        foreach(var v in dir)
        {
            Console.WriteLine(v.Name);
        }
    }
}
```

#### 4.2.2 执行结果
![][2]

#### 4.2.2 说明

* 从上面的执行结果看出，在directoryInfo文件夹下共有两个文件
* 需要注意的是，EnumerateDirectories方法只用于检索文件夹，不能检索文件

### 4.3 实例三 <font size=4> 将 code 文件夹及其含有的子文件夹删除 </font>

#### 4.3.1 代码

```
class Program
{
    static void Main(string[] args)
    {
        DirectoryInfo directoryInfo = new DirectoryInfo("D:\\directoryInfo");
        directoryInfo.Delete(true);
    }
}
```

#### 4.3.2 说明

* 执行上面的代码即可将文件夹directoryInfo删除
* 需要注意的是，如果要删除一个非空文件夹，则要使用Delete(True)方法将文件夹中的文件一并删除，否则会出现"文件夹不为空"的异常



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-file-directoryinfo-create.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-file-directoryinfo-list.png