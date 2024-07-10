---
title: IOS开发之——数据库-Couchbase(05)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 数据库
abbrlink: cc71b0df
date: 2022-04-27 20:26:22
---
## 一 概述

Couchbase是一个跨平台、轻量级、非关系型数据库，适用于Android和IOS移动平台

* Couchbase官方项目地址及项目导入
* Couchbase核心类介绍
* Couchbase数据库示例

<!--more-->

## 二 Couchbase官方项目地址及项目导入

### 2.1 Github项目地址

Github-Couchbase-lite-ios：https://github.com/couchbase/couchbase-lite-ios

### 2.2 Couchbase官方地址(OC语言)

Couchbase Lite(Object-C)：https://docs.couchbase.com/couchbase-lite/2.7/objc.html

### 2.3 Couchbase-lite导入项目

打开项目所在路径终端，执行如下指令，生成Profile文件

```
pod init
```

打开生成的Profile文件，添加Couchbase支持

```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'CouchBase-OC' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
  pod 'CouchbaseLite'

  # Pods for CouchBase-OC

end
```

添加完成后，执行如下指令，安装Couchbase依赖

```
pod install
```

关闭原项目，打开`CouchBase-OC.xcworkspace`,以`xcworkspace`为后缀的项目

## 三 Couchbase核心类介绍

### 3.1 Couchbase说明

* Couchbase是一个跨平台的数据库，提供了：Node、PHP、Python、Ruby、Scala、C++、.NET、C、Go等诸多平台等数据库支持
* Couchbase中一条记录是一个Document(文档结构)，保存数据等格式是：[document setXXX:value forKey:@"key"];
* Couchbase支持数据库加密，可以通过CBLDatabaseConfiguration进行配置

### 3.2 导入头文件

```
#import <CouchbaseLite/CouchbaseLite.h>
```

### 3.3 CBLDatabaseConfiguration(数据库配置-加密等)

```
CBLDatabaseConfiguration *config = [[CBLDatabaseConfiguration alloc] init];
config.encryptionKey = [[CBLEncryptionKey alloc] initWithPassword:@"secretpassword"];

NSError *error;
self.database = [[CBLDatabase alloc] initWithName:@"my-database" config:config error:&error];
if (!self.database) {
    NSLog(@"Cannot open the database:%@", error);
}
```

### 3.4 创建数据库(如mydb)

```
NSError *error;
CBLDatabase *database = [[CBLDatabase alloc] initWithName:@"mydb" error:&error];
```

### 3.5 创建一条数据记录(Document)

```
// 创建一个Document
CBLMutableDocument *mutableDoc = [[CBLMutableDocument alloc] init];
[mutableDoc setFloat:2.0 forKey:@"version"];
[mutableDoc setString:@"SDK" forKey:@"type"];

// 将Document保存到数据库database
[database saveDocument:mutableDoc error:&error];
```

说明(CBLMutableDocument的创建方式)：

* [[CBLMutableDocument alloc] init];----此处为随机到document-id
* [[CBLMutableDocument alloc] initWithID:@“document-id”];---指定固定的id，可用于数据更新

### 3.6 CBLQueryExpression、CBLQuery、CBLQueryResult(数据查询相关)

#### CBLQueryExpression(查询数据表达式-查询条件-如下：查询数据库中type的值是SDK符合条件的结果)

```
CBLQueryExpression *type = [[CBLQueryExpression property:@"type"] equalTo:[CBLQueryExpression string:@"SDK"]];
```

#### CBLQuery(查询语句)

查询所有

```
CBLQuery *query = [CBLQueryBuilder select:@[[CBLQuerySelectResult all]]
                                          from:[CBLQueryDataSource database:database]];
```

查询CBLQueryExpression条件的(where后面的type)

```
CBLQuery *query = [CBLQueryBuilder select:@[[CBLQuerySelectResult all]]
                                          from:[CBLQueryDataSource database:database]
                                         where:type];
```

#### CBLQueryResult(查询结果)

执行query execute即可得到CBLQueryResult查询结果，通过如下的语句即可查询有几条符合结果

```
[result allResults] count]
```

### 3.6 关闭数据库

```
if (![self.database close:&error])
    NSLog(@"Error closing db:%@", error);
```

## 四 Couchbase数据库示例(同之前类似- CRUD)

同之前数据操作示例类似，项目结构图(数据实体类：VersionInfo，数据库工具类：CouchbaseTools)

![][1]

### 4.1 数据库操作实体类(VersionInfo)

```
#import <Foundation/Foundation.h>

@interface VersionInfo : NSObject
@property(nonatomic,strong) NSString *version;
@property(nonatomic,strong) NSString *type;
@property(nonatomic,strong) NSString *time;

@end
```

### 4.2 CouchbaseTools(Couchbase工具类)

#### CouchBaseTools.h

```
#import <Foundation/Foundation.h>
#include <CouchbaseLite/CouchbaseLite.h>

@class VersionInfo;

@interface CouchBaseTools : NSObject
//创建数据库
+(void)createDatabase;
//添加数据
+(void)insertVersionInfo:(VersionInfo *)versionInfo;
//查询数据
+(NSMutableArray*)queryTable;
//更新数据
+(void)updateVersionInfo:(VersionInfo *)versionInfo;

//删除数据库
+(void)deleteTable;
@end
```

#### CouchBaseTools.m

```
#import "CouchBaseTools.h"
#import "VersionInfo.h"
#include <CouchbaseLite/CouchbaseLite.h>

@implementation CouchBaseTools

static CBLDatabase *database;
NSError *error;

//使用给定名称和默认数据库配置初始化数据库对象。
//如果数据库尚不存在，将创建该数据库
+ (void)initialize{
    NSError *error;
    database = [[CBLDatabase alloc] initWithName:@"mydb" error:&error];
    if (error) {
        NSLog(@"数据库创建失败");
    }else{
        NSLog(@"数据库创建成功");
    }
}

//创建数据库
+(void)createDatabase
{
    [self initialize];
}
//添加数据
+(void)insertVersionInfo:(VersionInfo *)versionInfo
{
    // 在数据库中创建Doccument.
    //CBLMutableDocument *mutableDoc = [[CBLMutableDocument alloc] init];//此处为随机到document-id，为了方便管理，使用initWithID
    
    CBLMutableDocument *mutableDoc = [[CBLMutableDocument alloc] initWithID:versionInfo.time];
    [mutableDoc setString:versionInfo.version forKey:@"version"];
    [mutableDoc setString:versionInfo.type forKey:@"type"];
    [mutableDoc setString:versionInfo.time forKey:@"time"];

    NSError *error;
    // 保存数据
    BOOL success=  [database saveDocument:mutableDoc error:&error];
    if(success){
        NSLog(@"添加数据成功");
    }else
    {
        NSLog(@"添加数据失败");
    }
    
}
//查询数据
+(NSMutableArray*)queryTable
{
    //集合
    NSMutableArray *array = [NSMutableArray array];
    
    NSError *error;
    
    //此处为条件查找，可放到from的后面 where type
    CBLQueryExpression *type = [[CBLQueryExpression property:@"type"] equalTo:[CBLQueryExpression string:@"SDK"]];
    
    CBLQuery *query = [CBLQueryBuilder select:@[[CBLQuerySelectResult all]]
                                          from:[CBLQueryDataSource database:database]];
    // 执行查询语句
    CBLQueryResultSet *result = [query execute:&error];
    NSArray<CBLQueryResult*> *results=[result allResults];//查询结果
    
    //将查询结果转换为实体类
    for (CBLQueryResult* result in results) {
      
      NSString *type=  [[result.toDictionary allValues][0] valueForKey:@"type"];
      NSString *version=  [[result.toDictionary allValues][0] valueForKey:@"version"];
      NSString *time=  [[result.toDictionary allValues][0] valueForKey:@"time"];
        
      VersionInfo *versionInfo=[[VersionInfo alloc]init];
      versionInfo.type=type;
      versionInfo.version=version;
      versionInfo.time=time;
     //将结果添加到集合
     [array addObject:versionInfo];
    
    }
    return array;
    
}

+(void)updateVersionInfo:(VersionInfo *)versionInfo
{

    NSError *error;
    
    //CBLMutableDocument *document=  [CBLMutableDocument documentWithID:@"versionID"];
    // CBLMutableDocument *doc1= [CBLMutableDocument documentWithID:time];
    
    //CBLMutableDocument *document=  [CBLMutableDocument documentWithID:versionInfo.time];

    NSString *time=versionInfo.time;
    NSLog(@"%@",versionInfo.time);
    
    CBLMutableDocument *document=  [[database documentWithID:versionInfo.time] toMutable];

    if (document) {
        [document setString:@"App" forKey:@"type"];
        BOOL success= [database saveDocument:document error:&error];
        if (success) {
            NSLog(@"数据更新成功");
        }else{
            NSLog(@"数据更新失败");
        }
    }else{
        NSLog(@"document为空");
    }
}
//删除数据库
+(void)deleteTable
{
   NSError *error;
   BOOL success= [database delete:&error];
    if (success) {
        NSLog(@"数据库删除成功");
    }else{
        NSLog(@"数据库删除失败");
    }
}
@end
```

### 4.3 ViewController(按钮点击相关方法)

```
#import "ViewController.h"
#import "CouchBaseTools.h"
#import "VersionInfo.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
- (IBAction)createDatabase
{
    [CouchBaseTools createDatabase];
}
//1-添加数据
- (IBAction)insertVersionInfo
{
    VersionInfo *versionInfo=[[VersionInfo alloc]init];
    NSString *version=[NSString stringWithFormat:@"%u",arc4random()%10] ;
    versionInfo.version=version;
    versionInfo.type=@"SDK";
    versionInfo.time=[self.class getCurrentTime];
    
    [CouchBaseTools  insertVersionInfo:versionInfo]; 
}
//查询数据
- (IBAction)queryTable
{
    NSMutableArray *results =  [CouchBaseTools queryTable];
    //NSLog(@"%@",results);
    for (VersionInfo* versionInfo in results) {
        NSLog(@"VersionInfo:type=%@,version=%@,time=%@",versionInfo.type,versionInfo.version,versionInfo.time);
    }

}
- (IBAction)updateTable
{
    NSMutableArray *results =  [CouchBaseTools queryTable];
    //NSLog(@"%@",results);

    //修改所有的VersionInfo-type
    for (VersionInfo* versionInfo in results) {
        versionInfo.type=@"App";
        [CouchBaseTools updateVersionInfo:versionInfo];
    }

    //修改第一个VersinInfo-type
//    VersionInfo *versionInfo=(VersionInfo *)results[0];
//    versionInfo.type=@"App";
//    [CouchBaseTools  updateVersionInfo:versionInfo];
    
    //查询
    //[self queryTable];
    
}
- (IBAction)deleteTable
{
    [CouchBaseTools deleteTable];
}
+(NSString *)getCurrentTime
{
    //获取标准时间
    NSDate *date = [NSDate date];
    [[NSDate date]timeIntervalSince1970];
    //使用formatter格式化后的时间
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd HH-mm-ss"];
    NSString *time_now = [formatter stringFromDate:date];
    return time_now;
}
@end
```

### 4.4 Couchbase相关

Couchbase位置：沙盒路径/Library/Application Support/CouchbaseLite/mydb.cblite2

![][2]

数据库的结构

| Kv-default | Kv-info | Kv-meeta |
| :--------: | :-----: | :------: |
|   ![][3]   | ![][4]  |  ![][5]  |

### 3.5 执行按钮相关的CRUD操作

![][6]

说明：

* 数据库创建成功：执行了点击创建数据库按钮或者默认初始化
* 添加数据成功：点击了添加数据按钮(点击一次添加一个数据)
* VersionInfo(3条记录)：执行了点击查询按钮，且所有的type为SDK
* 数据更新成功(3条记录)：点击了更新按钮(将所有VersionInfo的type改为App)
* VersionInfo(3条记录)：执行了点击查询按钮，且所有的type为App

## 五 参考

[Github-CouchBase-OC示例](https://github.com/PGzxc/CouchBase-OC) 



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-05-couchbase-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-05-couchbase-dest-position.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-05-couchbase-table-kvdefault.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-05-couchbase-table-kvinfo.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-05-couchbase-table-kvmeeta.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-05-couchbase-dest-sample.png