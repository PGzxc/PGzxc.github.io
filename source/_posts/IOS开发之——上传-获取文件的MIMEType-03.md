---
title: IOS开发之——上传-获取文件的MIMEType(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 上传
abbrlink: cab9b4d5
date: 2022-03-18 09:20:38
---
## 一 概述

* 常用文件的MIMEType
* 如何通过一次请求获取文件的MIMEType

<!--more-->

## 二 常用文件的MIMEType

### 2.1 图片

| 类型 |  文件拓展名  |  MIMEType  |
| :--: | :----------: | :--------: |
| 图片 |     png      | image/png  |
| 图片 |   bmp\dib    | image/bmp  |
| 图片 | jpe\jpeg\jpg | image/jpeg |
| 图片 |     gif      | image/gif  |

### 2.2 多媒体
|  类型  |    文件拓展名    |  MIMEType  |
| :----: | :--------------: | :--------: |
| 多媒体 |       mp3        | audio/mpeg |
| 多媒体 | mp4\mpg4\m4vmp4v | video/mp4  |

### 2.3 文本
| 类型 | 文件拓展名 |        MIMEType        |
| :--: | :--------: | :--------------------: |
| 文本 |     js     | application/javascript |
| 文本 |    pdf     |    application/pdf     |
| 文本 |  text\txt  |       text/plain       |
| 文本 |    json    |    application/json    |
| 文本 |    xml     |        text/xml        |

## 三 如何通过一次请求获取文件的MIMEType

### 3.1 代码

```
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{  
    NSURL *url=[NSURL fileURLWithPath:@"/Users/zxc/Downloads/time.png"];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task =  [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSLog(@"%@",response.MIMEType);
    }];
    [task resume];
}
```

### 3.2 输出结果

```
2022-03-17 23:01:19.507574+0800 获取文件类型[13046:191712] image/png
```

