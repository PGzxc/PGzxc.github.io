---
title: OC开发之——NSDictionary(58)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 62ae083e
date: 2020-04-20 23:35:40
---
## 一 概述

* NSDictionary又叫字典，类似于Java中的Map集合，一个key，有且只有一个对应的value
* NSDictionary是不可变的，一旦初始化完毕后，里面的内容就无法修改
* NSMutableDictionary是可变的，可向集合中添加新数据

<!--more-->

## 二 NSDictionary的操作

```
NSDictionary *dict=[NSDictionary dictionaryWithObject:@"jack" forKey:@"name"];
id obj=[dict objectForKey:@"name"];
NSLog(@"%@",obj);
        
NSArray *keys=@[@"name",@"address"];
NSArray *objects=@[@"jack",@"北京"];
NSDictionary *dicts=[NSDictionary dictionaryWithObjects:keys forKeys:objects];
NSDictionary *dicts2=[NSDictionary dictionaryWithObjectsAndKeys:
                              @"jack",@"name",
                              @"北京",@"address",
                              @"11111",@"qq",nil];
id obj2=[dicts2 objectForKey:@"qq"];
NSLog(@"%@",obj2);
        
NSDictionary *dict3=@{@"name": @"jack",@"address": @"北京"};
id obj3=[dict3 objectForKey:@"name"];
NSLog(@"%@",obj3);
        
id obj4=dict3[@"name"];
NSLog(@"%@",obj4);
NSLog(@"%d",dict3.count);      
```

## 三 NSMutableDictionary的操作

```
NSMutableDictionary *mdict=[NSMutableDictionary dictionary];
[mdict setObject:@"jack" forKey:@"name"];
[mdict setObject:@"北京" forKey:@"addredd"];
[mdict setObject:@"rose" forKey:@"name"];
        
NSString *str= mdict[@"name"];
NSLog(@"%@",str);
[mdict removeObjectForKey:@"name"];
NSLog(@"%@",mdict);
```

## 四 Dictionary的遍历

```
NSDictionary *dict4=@{@"address":@"北京",
                              @"name":@"jack",
                              @"qq":@"121212",
                              @"address":@"北京",
                              @"name":@"jack",
                              @"qq":@"121212"};
NSArray *keys2=[dict4 allKeys];
for (int i=0; i<dict4.count; i++) 
{
   NSString *key= keys2[i];
   NSString *object= dict4[key];
   NSLog(@"%@=%@",key,object);
}
        
[dict4 enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop)
{
    NSLog(@"%@=%@",key,obj);
}];
```
