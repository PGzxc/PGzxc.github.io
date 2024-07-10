---
title: IOS开发之——私人通讯录-数据存储(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 922e8d44
date: 2020-10-07 23:33:26
---
## 一 概述

本文介绍私人通讯录数据存储相关的知识点：

* 登陆界面中：记住用户名和密码及自动登陆
* 添加联系人数据保存及更新结果保存

<!--more-->

## 二 效果图

![][1]

## 三 功能实现

### 3.1 登陆界面

#### 保存登陆数据

```
//保存登陆数据
[UserDefaults setObject:_accountField.text forKey:AccountKey];
[UserDefaults setObject:_pwdField.text forKey:PwdKey];
[UserDefaults setBool:_rmbPwdS.isOn forKey:RmbPwdKey];
[UserDefaults setBool:_autoLoginS.isOn forKey:AutoLoginKey];
//同步：当前内存中的数据和沙盒同步
[UserDefaults synchronize];
```

#### 从沙盒读取数据

```
//从沙盒里读取数据
 _accountField.text=[UserDefaults objectForKey:AccountKey];
 if (_rmbPwdS.on) {
     _pwdField.text=[UserDefaults objectForKey:PwdKey];
 }
 _rmbPwdS.on=[UserDefaults boolForKey:RmbPwdKey];
 _autoLoginS.on=[UserDefaults boolForKey:AutoLoginKey];
 if (_autoLoginS.on) {[self loginBtn:self.loginBtn];}
```

### 3.2 添加联系人和更新联系人

#### 保存数据

```
 #define FilePath [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0]stringByAppendingPathComponent:@"contact.data"]
 [NSKeyedArchiver archiveRootObject:self.contacts toFile:FilePath];
```

#### 要保存的类实现NSCoding

```
- (instancetype)initWithCoder:(NSCoder *)coder
{
    if (self=[super init])
    {
        _name=[coder decodeObjectForKey:NameKey];
        _phone=[coder decodeObjectForKey:PhoneKey];
    }
    return self;
}
- (void)encodeWithCoder:(NSCoder *)coder
{
    [coder encodeObject:_name forKey:NameKey];
    [coder encodeObject:_phone forKey:PhoneKey];
}
```

#### 读取联系人数据

```
- (NSMutableArray *)contacts
{
    if (_contacts==nil) {
        _contacts=[NSKeyedUnarchiver unarchiveObjectWithFile:FilePath];
        if (_contacts==nil) {
            _contacts=[NSMutableArray array];
        }
    }
    return _contacts;
}
```

#### 更新联系人数据

```
//协议方法，成功更新了一个联系人
-(void)editViewController:(EditViewController *)edit didUpdateContact:(Contact *)contact
{
    //刷新表格
    [self.tableView reloadData];
    //归档
    [NSKeyedArchiver archiveRootObject:self.contacts toFile:FilePath];  
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sirentongxunlu-save-data.gif