---
title: IOS开发之——下载-获取文件大小(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: ae1ae676
date: 2022-03-11 08:54:48
---
## 一 概述

通过网络连接请求获取文件大小的两种方式：通过返回的NSData.length

* NSData dataWithContentsOfURL:url
* NSURLConnection sendAsynchronousRequest

<!--more-->

## 二 文件的大小

![][1]
## 三 获取文件大小的方式-NSData 

### 3.1 代码

```
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/resources/images/minion_01.png"];
        NSData *data=[NSData dataWithContentsOfURL:url];
        NSLog(@"%d",data.length);
  });
```

### 3.2 打印结果

```
2022-03-13 18:23:34.372693+0800 小文件下载[38773:403064] 48347
```

## 四 获取文件大小的方式2-NSURLConnection 

### 4.1 代码

```
NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/resources/images/minion_01.png"];
NSURLRequest *request=[NSURLRequest requestWithURL:url];
    
[NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
        NSLog(@"%d",data.length);
        
    }];
```

### 4.2 打印结果

```
2022-03-13 18:24:52.672649+0800 小文件下载[38874:404835] 48347
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-01-file-size.png