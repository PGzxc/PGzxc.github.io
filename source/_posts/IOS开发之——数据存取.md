---
title: IOS开发之——数据存取
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 872fcaf5
date: 2020-07-09 22:48:46
---
## 一 IOS数据存储常用方式

* XML属性列表(plist)归档(Documents)
* Preference(偏好设置)
* NSKeyedArchiver归档(NSCoding)
* SQLite3
* Core Data

<!--more-->

## 二数据存储位置(应用沙盒)

* Documents：保存应用运行时需要持久化的数据，iTunes同步设备时会备份该目录。例如：游戏应用可将游戏归档保存在该目录
* tmp：保存应用运行时所需的临时数据，使用完毕后再将相应的文件从该目录删除。应用没有运行时，系统也可能会清除该目录下的文件。iTunes不会备份该目录
* Library/Caches：保存应用运行时生成的需要持久化的数据，iTunes同步设备时不会备份该目录。一般存储体积大，不需要备份的非常重要数据
* Library/Preference：保存应用的所有偏好设置，iOS的Settings(设置)应用会在该目录中查找应用的设置信息。iTunes同步设备时会备份该目录

## 三 演示方式
* 页面上有存储和读取两个按钮
* 点击存储按钮时，写入数据
* 点击读取按钮时，读取写入的数据

![][1]

## 四 常见的数据存储

### 4.1 Documents归档
####  代码

```
    //保存按钮
    NSLog(@"%@",NSHomeDirectory());
    NSString *home=NSHomeDirectory();
    NSString *docPath=NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES )[0];
    NSLog(@"%@",docPath);
    //文件路径
    NSString *filePath=[docPath stringByAppendingPathComponent:@"data.plist"];
    //只有具备了writeToFile的对象才能写入plist
    NSArray *array=@[@1,@2,@"123"];
    [array writeToFile:filePath atomically:YES];
    
    //读取
    NSString *docPath=NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES )[0];
    NSLog(@"%@",docPath);
    //文件路径
    NSString *filePath=[docPath stringByAppendingPathComponent:@"data.plist"];
    NSArray *data=[NSArray arrayWithContentsOfFile:filePath];
    NSLog(@"%@",data);
```
### 结果

* 数据写入时

  ![][2]
  
* 读取Document存储的数据

  ![][3]
  
### 4.2 偏好设置存储方式

#### 存储位置

偏好设置的存储路径是

```
 应用沙盒/Library/Preferences
```

#### 代码

```
   //保存
   //[NSUserDefaults standardUserDefaults]可以直接操作偏好设置文件夹
    NSUserDefaults *defaults= [NSUserDefaults standardUserDefaults];
    //自动帮我们生成一个plist文件存放偏好设置的文件夹
    [defaults setObject:@"123" forKey:@"key"];
    //同步，把内存中的数据和硬盘同步
    [defaults synchronize];
    
    //读取
    NSUserDefaults *defaults=[NSUserDefaults standardUserDefaults];
    NSLog(@"%@",[defaults objectForKey:@"key"]);
```

### 4.3 归档方式

#### Person存储对象

```
//Person.h
#import <Foundation/Foundation.h>
@interface Person : NSObject<NSSecureCoding>
@property (nonatomic,assign) int age;
@end

//Person.m
#import "Person.h"
@implementation Person
+ (BOOL)supportsSecureCoding
{
    return YES;
}
//在对象归档的时候调用
- (void)encodeWithCoder:(NSCoder *)coder
{
    [coder encodeInt:_age forKey:@"age"];
}
- (nullable instancetype)initWithCoder:(nonnull NSCoder *)coder {
    if ([super init])
    {
        self.age=[coder decodeIntForKey:@"age"];
    }
    return self;
}
- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@ : %p, \"%d\">", [self class], self, _age];
}
@end
```

#### 保存归档文件

```
   //创建Person对象
    Person *person=[Person new];
    person.age=18;
    //1.对需要保存的数据进行编码
    NSData *data = [NSKeyedArchiver archivedDataWithRootObject:person requiringSecureCoding:YES error:nil];
    //2将二进制数据保存到文件
    //创建文件
    NSString *docPath=NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
    //文件路径
    NSString *filePath=[docPath stringByAppendingPathComponent:@"person.archiver"];
    //创建文件
    [[NSFileManager defaultManager]createFileAtPath:filePath contents:nil attributes:nil];
    [data writeToFile:filePath atomically:YES];
```

#### 解归档

```
   //解归档
    NSString *docPath=NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)[0];
      //文件路径
    NSString *filePath=[docPath stringByAppendingPathComponent:@"person.archiver"];
    //读取文件的内容
    NSData *data = [NSData dataWithContentsOfFile:filePath];
    //将二进制数据转换为对应的对象类型
    Person *person=[NSKeyedUnarchiver unarchivedObjectOfClass:[Person class] fromData:data error:nil];
    NSLog(@"%@",person);
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-data-write-read-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-data-document-write.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-data-document-read.png