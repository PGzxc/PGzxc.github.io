---
title: IOS开发之——数据库-SQLite3(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 数据库
abbrlink: 2a270fdf
date: 2022-04-23 16:15:17
---
## 一 概述

* SQLite官网及介绍
* SQLite常见方法说明
* SQLite示例

<!--more-->

## 二 SQLite官网及介绍

### 2.1 官网地址

* 官网地址主页：https://www.sqlite.org/index.html
* C/C++ SQLite使用介绍：https://www.sqlite.org/cintro.html

### 2.2 SQLite使用说明

* 数据库，纯C语言，轻量级
* 适用于移动设备(安卓和IOS)及终端平台中
* 开源免费，任何人都可以使用

## 三 SQLite常见方法说明

打开C/C++介绍文档，可以看到SQLite常用方法

![][1]

### 3.1 sqlite3(数据库连接对象)

```
sqlite3 *db = NULL; 
```

### 3.2 sqlite_stmt(用来取出查询结果)

```
sqlite3_stmt *stmt=NULL;
int status=sqlite3_prepare(db, sql, -1, &stmt, NULL);
```

### 3.3 sqlite3_open(打开数据库连接)

```
int status=sqlite3_open(filename.UTF8String, &db);
```

### 3.4 sqlite3_close(关闭数据库)

```
sqlite3_close(db);
```

### 3.5 sqlite3_prepare(查询或更新数据库)

```
 sqlite3_stmt *stmt=NULL;
 int status=sqlite3_prepare(db, sql, -1, &stmt, NULL);
```

### 3.6 sqlite3_bind(将应用程序数据存储到SQL参数中)

```
sqlite3_stmt *stmt;
sqlite3_bind_text(stmt, 1, "白菜", -1, NULL);
sqlite3_bind_int(stmt, 2, 27);
```

### 3.7 sqlite3_stemp(执行到下一个结果行或完成)

```
if(sqlite3_step(stmt) != SQLITE_DONE) {
    NSLog(@"插入数据错误");
}
```

### 3.8 sqlite3_column(当前结果行中的列值)

```
int _id = sqlite3_column_int(stmt, 0);
```

### 3.9 sqlite3_finalize(销毁sqlite3_stmt *对象，执行析构函数)

```
sqlite3_finalize(stmt);
```

### 3.10 sqlite3_exec(包函数，可以是任意SQL语句，比如CRUD操作)

```
int result = sqlite3_exec(db, sql, NULL, NULL, &errorMsg);
```

## 四 SQLite示例

如下所示，项目结构

![][2]

### 4.1 Shop(数据库实体类)
![][3]

### 4.2 SQLite3Tools(将ViewControl中的操作封装到了此类中)

#### SQLite3Tools.h

```
#import <Foundation/Foundation.h>

@class Shop;

@interface SQLite3Tools : NSObject

//创建表格
+(void)createTable;
//插入数据
+(void)insertTable:(Shop *)shop;
//查询数据
+(NSMutableArray *)selectTableAll;
//更新数据
+(void)updateTable;
//删除表格数据
+(void)deleteTable;

@end
```

#### SQLite3Tools.m

```
#import "SQLite3Tools.h"
#import <sqlite3.h>
#import "Shop.h"

@implementation SQLite3Tools
static sqlite3 *db;
+(void)initialize
{
    //打开数据库(连接数据库)
    NSString *filename=[[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)lastObject]stringByAppendingPathComponent:@"shops.sqlite"];
    //如果数据库文件不存在，系统会自动创建文件自动初始化数据库

    int status=sqlite3_open(filename.UTF8String, &db);
    if (status==SQLITE_OK) {//打开成功
        NSLog(@"打开数据库成功");
    }else{
        NSLog(@"打开数据库失败");
    }
}
//创建表
+(void)createTable
{
        //创建表
        const char *sql="create table if not exists t_shop(id integer primary key,name text not null,price real);";
        char *errmsg=NULL;
        sqlite3_exec(db, sql, NULL, NULL, &errmsg);
        if (errmsg) {
            NSLog(@"创表失败---%s",errmsg);
        }else{
            NSLog(@"创表成功---%s",errmsg);
        }
}
//插入数据
+(void)insertTable:(Shop *)shop
{
    NSString *sql = [NSString stringWithFormat:@"INSERT INTO t_shop(name, price) VALUES ('%@', %f);",shop
                     .name, shop.price];
    sqlite3_exec(db, sql.UTF8String, NULL, NULL, NULL);
}
//查询数据
+(NSMutableArray *)selectTableAll
{
    NSMutableArray *array=[NSMutableArray array];
    
    const char *sql="select name,price from  t_shop;";
    //stmt用来取出查询结果的
    sqlite3_stmt *stmt=NULL;
    int status=sqlite3_prepare(db, sql, -1, &stmt, NULL);
    if (status==SQLITE_OK) { //准备成功-- SQL语句正确
        while(sqlite3_step(stmt)==SQLITE_ROW) {
            Shop *shop=[[Shop alloc]init];
            const unsigned char *name=sqlite3_column_text(stmt, 0);
            const unsigned char *price=sqlite3_column_text(stmt, 1);
            shop.name=[NSString stringWithUTF8String:name];
            shop.price=[[NSString stringWithUTF8String:price] floatValue];
            [array addObject:shop];
        }
    }
    return array;
}

//更新数据
+(void)updateTable
{
    NSString *sql = [NSString stringWithFormat:@"update t_shop set price=%u;",arc4random()%5];
    sqlite3_exec(db, sql.UTF8String, NULL, NULL, NULL);
}
//删除表格数据
+(void)deleteTable
{
    NSString *sql = [NSString stringWithFormat:@"delete from t_shop"];
    sqlite3_exec(db, sql.UTF8String, NULL, NULL, NULL);
}
@end
```

### 4.3 ViewController中按钮对象的操作

```
#import "ViewController.h"
#import "SQLite3Tools.h"
#import "Shop.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
//创建表
- (IBAction)createTableBtn:(UIButton *)sender
{
    [SQLite3Tools createTable];
}
//插入数据

- (IBAction)insertTableBtn
{
    Shop *shop=[[Shop alloc]init];
    shop.name=[NSString stringWithFormat:@"白菜-%d",arc4random() % 200];
    shop.price=(arc4random() % 10);
    
    [SQLite3Tools insertTable:shop];
    //执行查询
    [self selectTableBtn];

}
//查询数据库
- (IBAction)selectTableBtn
{
   NSMutableArray *array= [SQLite3Tools selectTableAll];
    for (Shop *shop in array) {
        NSLog(@"shop:name=%@,price=%f",shop.name,shop.price);
    }
}
//更新数据库
- (IBAction)updateTableBtn
{
    NSLog(@"更新前数据：");
    [self selectTableBtn];
    [SQLite3Tools updateTable];
    NSLog(@"更新后数据：");
    [self selectTableBtn];
}
//删除表格数据
- (IBAction)deleteTableBtn
{
    NSLog(@"删除前数据：");
    [self selectTableBtn];
    [SQLite3Tools deleteTable];
    NSLog(@"删除后数据：");
    [self selectTableBtn];
}
@end
```

### 4.4 效果图(点击后，可在控制台和Navicat中查看结果)
![][4]
其中,sqlite文件，可在沙盒的Documents下找到对应的.sqlite，使用Navicat打开即可
![][5]

## 五 参考

* [Github-SQLite3](https://github.com/PGzxc/SQLite3)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-03-sqlite-summary.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-03-project-struct.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-03-table-property.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-03-project-result.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-03-project-sqlite-file.png