---
title: IOS开发之——数据库-FMDB(04)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 数据库
abbrlink: 356d6c99
date: 2022-04-24 08:20:23
---
## 一 概述

上一节介绍过使用SQLite3实现数据的CRUD，本文使用FMDB实现相同的功能

* FMDB官方地址及项目导入
* FMDB核心类
* FMDB数据库示例

<!--more-->

## 二 FMDB官方地址及项目导入

### 2.1 FMDB地址

Github-FMDB：https://github.com/ccgus/fmdb

### 2.2 FMDB如何导入项目(已安装CocoaPods)

打开项目所在路径终端，执行如下指令

```
pod init
```

打开生成的Profile文件，添加FMDB支持

```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'FMDBDemo' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
 
  pod 'FMDB'

  # Pods for FMDBDemo
end
```

执行如下指令，安装FMDB依赖

```
pod install
```

打开FMDBDemo.xcworkspace项目

### 2.3 FMDB介绍

#### 什么是FMDB

* FMDB是iOS平台的SQLite数据库框架
* FMDB以OC的方式封装了SQLite的C语言API

#### FMDB的优点

* 使用起来更加面向对象，省去了很多麻烦、冗余的C语言代码
* 对比苹果自带的Core Data框架，更加轻量级和灵活
* 提供了多线程安全的数据库操作方法，有效地防止数据混乱

## 三 FMDB核心类

FMDB有三个主要的类：FMDatabase、FMResultSet、FMDatabaseQueue

### 3.1 FMDatabase

* 一个FMDatabase对象就代表一个单独的SQLite数据库
* 用来执行SQL语句

### 3.2 FMResultSet

使用FMDatabase执行查询后的结果集

### 3.3 FMDatabaseQueue

用于在多线程中执行多个查询或更新，它是线程安全的

## 四 FMDB数据库示例

同上一节SQLite类似，项目结构图(数据实体类：Shop，数据库工具类：FMDBTools)

![][1]

### 4.1 Shop(数据库实体类)-未变

```
#import <Foundation/Foundation.h>
@interface Shop : NSObject
@property (nonatomic, copy) NSString *name; //商品名称
@property (nonatomic, assign) double  price; //商品价格
@end
```

### 4.2 FMDBTools(将FMDB操作数据的封装到此类)

#### FMDBTools.h(方法未变)

```
#import <Foundation/Foundation.h>
@class Shop;

@interface FMDBTools : NSObject
//创建表格
+(void)createTable;
//添加数据
+(void)insertShop:(Shop *)shop;
//查询数据
+(NSMutableArray *)selectTableAll;
//更新数据
+(void)updateTable;
//删除表格数据
+(void)deleteTable;

@end
```

#### FMDBTools.m(将SQLite的操作切换成FMDB)

```
#import "FMDBTools.h"
#import "FMDB.h"
#import "Shop.h"


@implementation FMDBTools

static FMDatabase *_db;

+(void)initialize{
    // 1.打开数据库
    NSString *path = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:@"shops.sqlite"];
    _db = [FMDatabase databaseWithPath:path];
    [_db open];
}
//创建表格
+(void)createTable
{
    // 创表
    BOOL success = [_db executeUpdate:@"CREATE TABLE IF NOT EXISTS t_shop (id integer PRIMARY KEY, name text NOT NULL, price real);"];
    if (success) {
        NSLog(@"Table创建成功");
    }else{
        NSLog(@"error = %@", [_db lastErrorMessage]);
    }
    
}
//添加数据
+(void)insertShop:(Shop *)shop
{
    BOOL success = [_db executeUpdateWithFormat:@"INSERT INTO t_shop(name, price) VALUES (%@, %f);", shop.name, shop.price];
    if (success) {
        NSLog(@"添加数成功");
    }else{
        NSLog(@"error = %@", [_db lastErrorMessage]);
    }
}
//查询数据
+(NSMutableArray *)selectTableAll
{
        //得到结果集
        FMResultSet *set = [_db executeQuery:@"SELECT * FROM t_shop;"];
         //集合
        NSMutableArray *array = [NSMutableArray array];
        // 不断往下取数据
        while (set.next) {
            // 获得当前所指向的数据
            Shop *shop = [[Shop alloc] init];
            shop.name = [set stringForColumn:@"name"];
            shop.price = [set doubleForColumn:@"price"];
            [array addObject:shop];
        }
        return array;
}
//更新数据
+(void)updateTable
{
    NSString *sql = [NSString stringWithFormat:@"update t_shop set price=%u;",arc4random()%5];
    BOOL success = [_db executeUpdate:sql];
    if (success) {
        NSLog(@"更新数据成功");
    }else{
        NSLog(@"error = %@", [_db lastErrorMessage]);
    }
}
//删除表格数据
+(void)deleteTable
{
    NSString *sql = [NSString stringWithFormat:@"delete from t_shop"];
    BOOL success = [_db executeUpdate:sql];
    if (success) {
        NSLog(@"删除表格成功");
    }else{
        NSLog(@"error = %@", [_db lastErrorMessage]);
    }
}
@end
```

### 4.3 ViewController(Storyboard按钮点击相关的方法)

```
#import "ViewController.h"
#import "Shop.h"
#import "FMDBTools.h"

@interface ViewController ()

@end

@implementation ViewController

//创建表格
- (IBAction)createTableBtn
{
    [FMDBTools createTable];
}
//添加数据
- (IBAction)insertTableBtn
{
    Shop *shop=[[Shop alloc]init];
    shop.name=[NSString stringWithFormat:@"白菜-%d",arc4random() % 200];
    shop.price=(arc4random() % 10);
        
    [FMDBTools insertShop:shop];
    //执行查询
    [self selectTableBtn];
}
//查询数据
- (IBAction)selectTableBtn
{
    NSMutableArray *array= [FMDBTools selectTableAll];
    for (Shop *shop in array) {
       NSLog(@"shop:name=%@,price=%f",shop.name,shop.price);
    }
}
//更新数据
- (IBAction)updateTableBtn
{
    NSLog(@"更新前数据：");
    [self selectTableBtn];
    [FMDBTools updateTable];
    NSLog(@"更新后数据：");
    [self selectTableBtn];
}
//删除表格
- (IBAction)deleteTableBtn
{
    NSLog(@"删除前数据：");
    [self selectTableBtn];
    [FMDBTools deleteTable];
    NSLog(@"删除后数据：");
    [self selectTableBtn];
}
@end
```

### 4.4 效果图
![][2]

## 五 参考

[Github-FMDBDemo](https://github.com/PGzxc/FMDBDemo)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-04-fmdb-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-04-fmdb-table-operate.png