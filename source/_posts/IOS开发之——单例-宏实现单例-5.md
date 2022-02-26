---
title: IOS开发之——单例-宏实现单例(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: aa3495c1
date: 2022-02-26 12:53:59
---
## 一 概述

用宏实现单例的过程如下：

* 新建一个`ILSingleton.h`文件(GCD中定义的内容)
* 定义头文件(.h)文件方法`+(instancetype)sharedInstance`
* 定义.m文件(将之前GCD中实现单例的内容复制进来)，并用`\`放在后面(有间隔)

<!--more-->

## 二 宏实现单例

### 2.1 ILSingleton.h

```
//1.头文件
#define ILSingletonH  +(instancetype)sharedInstance;

//1.m文件
#define ILSingletonM \
 \
static id _instance; \
 \
+(instancetype)allocWithZone:(struct _NSZone *)zone \
{ \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{  \
        _instance=[super allocWithZone:zone]; \
    }); \
    return _instance; \
} \
 \
+(instancetype)sharedInstance \
{ \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{ \
        _instance=[[self alloc]init]; \
    }); \
    return _instance; \
} \
-(id)copyWithZone:(NSZone *)zone \
{ \
    return _instance; \
}
```

说明：

* 头文件命名ILSingleton+H，用于定义创建示例的类方法
* .m文件为ILSingleton+M，后面是懒汉式创建示例方法，每行后用`\`

### 2.2 单例类(ILSingleton)

#### ILMusicTool.h

```
#import <Foundation/Foundation.h>
#import "ILSingleton.h"
@interface ILMusicTool : NSObject
ILSingletonH
@end
```

说明：导入ILSingleton.h中的ILSingletonH及sharedInstance方法

#### ILMusicTool.m

```
#import "ILMusicTool.h"
@implementation ILMusicTool
ILSingletonM
@end
```

说明：导入ILSingleton.h中创建懒汉式的内容ILSingletonM

## 三 示例应用

### 3.1 代码

```
#import "ViewController.h"
#import "ILMusicTool.h"
#import "ILDataTool.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    ILMusicTool *tool1=[ILMusicTool sharedInstance];
    ILMusicTool *tool2=[ILMusicTool sharedInstance];
    
    ILDataTool *tool3=[ILDataTool sharedInstance];
    ILDataTool *tool4=[ILDataTool sharedInstance];
    NSLog(@"%@ %@",tool1,tool2);
    NSLog(@"%@ %@",tool3,tool4);
}

@end
```

### 3.2 输出内容

```
2022-02-25 23:15:43.943593+0800 简化单利模式[20162:200413] <ILMusicTool: 0x600003248170> <ILMusicTool: 0x600003248170>
2022-02-25 23:15:43.943745+0800 简化单利模式[20162:200413] <ILDataTool: 0x600003248180> <ILDataTool: 0x600003248180>
```

## 四 初始化时不使用shareInstance指定name

### 4.1 ILSingleton.h文件

```
//1.头文件
#define ILSingletonH(name)  +(instancetype)shared##name;

//1.m文件
#define ILSingletonM(name) \
 \
static id _instance; \
 \
+(instancetype)allocWithZone:(struct _NSZone *)zone \
{ \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{  \
        _instance=[super allocWithZone:zone]; \
    }); \
    return _instance; \
} \
 \
+(instancetype)shared##name \
{ \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{ \
        _instance=[[self alloc]init]; \
    }); \
    return _instance; \
} \
-(id)copyWithZone:(NSZone *)zone \
{ \
    return _instance; \
}
```

说明：

* .h头文件，构造时传入name：ILSingletonH(name)
* .m文件，构造时也传入name： ILSingletonM(name)，+(instancetype)shared##name

### 4.2 单例示例对象(ILMusicTool)

#### ILMusicTool.h

```
#import <Foundation/Foundation.h>
#import "ILSingleton.h"
@interface ILMusicTool : NSObject
ILSingletonH(ILMusicTool)
@end
```

#### ILMusicTool.m

```
#import "ILMusicTool.h"

@implementation ILMusicTool
ILSingletonM(ILMusicTool)
@end
```

### 4.3 示例使用

```
#import "ViewController.h"
#import "ILMusicTool.h"
#import "ILDataTool.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    ILMusicTool *tool1=[ILMusicTool sharedILMusicTool];
    ILMusicTool *tool2=[ILMusicTool sharedILMusicTool];
    
    ILDataTool *tool3=[ILDataTool sharedILDataTool];
    ILDataTool *tool4=[ILDataTool sharedILDataTool];
    NSLog(@"%@ %@",tool1,tool2);
    NSLog(@"%@ %@",tool3,tool4);
}

@end
```

