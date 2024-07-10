---
title: IOS开发之——文件的压缩和解压缩
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 3a6dab8f
date: 2022-03-19 16:53:33
---
## 一 概述

* 第三方解压缩框架——SSZipArchive
* 文件压缩示例
* 文件解压缩示例

<!--more-->

## 二 第三方解压缩框架——SSZipArchive

### 2.1 项目地址

[Github/ZipArchive](https://github.com/ZipArchive/ZipArchive)：https://github.com/ZipArchive/ZipArchive

### 2.2 添加SSZipArchive依赖

在项目位置打开终端，执行如下指令

```
pod init
```

打开Podfile文件，添加SSZipArchive依赖

```
pod 'SSZipArchive'
```

添加依赖更新

```
pod install
```

### 2.3 SSZipArchive使用

在引用位置添加依赖头文件

```
#import <SSZipArchive.h>
```

创建Zip压缩

```
[SSZipArchive createZipFileAtPath:zipPath withContentsOfDirectory:sampleDataPath];
```

Zip解压缩

```
[SSZipArchive unzipFileAtPath:zipPath toDestination:unzipPath];
```

## 三 文件压缩示例

### 3.1 代码

```
-(void)createZip
{
    NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
    NSString *images=[caches stringByAppendingPathComponent:@"images"];
    NSString *zipFile=[caches stringByAppendingPathComponent:@"images.zip"];
    
    //创建一个zip文件压缩
    [SSZipArchive createZipFileAtPath:zipFile withContentsOfDirectory:images];
}
```

### 3.2 效果图(将缓存目录下的images压缩)

![][1]

## 四 文件解压缩示例

### 4.1 代码

```
-(void)unZip
{
    NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
    
    NSString *unzipPath=[caches stringByAppendingPathComponent:@"images.zip"];
    NSString *desPath=[caches stringByAppendingPathComponent:@"unzip"];
    
    [SSZipArchive unzipFileAtPath:unzipPath toDestination:desPath];
}
```


### 4.2 效果图(将缓存目录下的zip解压缩)
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sszip-file-zip.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sszip-file-unzip.gif