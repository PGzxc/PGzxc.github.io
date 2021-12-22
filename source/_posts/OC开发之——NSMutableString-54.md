---
title: OC开发之——NSMutableString(54)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 9930967a
date: 2020-04-19 23:16:58
---

## 一 概述

NSString与NSMutableString的区别：

* NSString：不可变字符串
* NSMutableString：可变字符串

<!--more-->

## 二 示例

### 2.1 代码

```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSMutableString *mus=[NSMutableString stringWithFormat:@"11"];
        [mus appendString:@"22 33"];
        NSRange range= [mus rangeOfString:@"22"];
        [mus deleteCharactersInRange:range];
        
        //NSString
        NSString *s2=[NSString stringWithFormat:@"11"];
        NSString *s3=[s2 stringByAppendingString:@"22 33"];
        NSLog(@"mus=%@,s2=%@,s3=%@",mus,s2,s3);  
    }
    return 0;
}
```

### 2.2 输出结果

```
NSMultableString[3112:45276] mus=11 33,s2=11,s3=1122 33
```

