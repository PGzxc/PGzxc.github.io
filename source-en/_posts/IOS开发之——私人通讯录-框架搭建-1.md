---
title: IOS开发之——私人通讯录-框架搭建(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: f9a1b427
date: 2020-06-28 23:05:22
---
## 一 概述

从本节开始开发一款私人通讯录，主要功能：

* 通讯录登记界面，输入账户和密码，点击登陆，进入联系人列表界面
* 联系人列表显示联系人列表，注销和添加联系人功能

<!--more-->

## 二 功能演示

![][1]

## 三 功能实现

### 3.1 框架搭建

* Navigation 页面
* Login账户密码输入页面
* 通讯录页面

### 3.2 LoginController监听

#### 3.2.1 代理

* 设置代理:_accountField.delegate=self;

* 继承代理类：@interface LoginControllerViewController ()<UITextFieldDelegate>

* 调用代理的方法

  ```
  - (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
  {
      NSLog(@"shouldChangeCharactersInRange---%@",textField.text);
      return YES;
  }
  ```

#### 3.2.2 通知

* viewDidLoad设置通知监听

  ```
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:_accountField];
  ```

* 设置监听方法(textChange)

  ```
  -(void)textChange
  {
      NSLog(@"%@",_accountField.text);
      _loginBtn.enabled=_accountField.text.length&&_pwdField.text.length;
      
  }
  ```

* dealloc移除监听

  ```
  -(void)dealloc
  {
      [[NSNotificationCenter defaultCenter]removeObserver:self];
  }
  ```

#### 3.2.3 addTarget

* 设置Target

  ```
   [_accountField addTarget:self action:@selector(textChange) forControlEvents:UIControlEventEditingChanged];
   [_pwdField addTarget:self action:@selector(textChange) forControlEvents:UIControlEventEditingChanged];
  ```

* 设置Target中的方法(textChange)

  ```
  -(void)textChange
  {
      NSLog(@"%@",_accountField.text);
      _loginBtn.enabled=_accountField.text.length&&_pwdField.text.length; 
  }
  ```

  

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tongxunlu-kuangjia.gif