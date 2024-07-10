---
title: IOS开发之——登陆界面
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: dab03936
date: 2020-05-07 23:10:19
---
## 一 概述

* 本文模拟输入用户名和密码进行用户登陆
* 输入用户名时，可以点击用户名右侧的删除标志删除已经输入的内容
* 输入密码时，为密文显示
* 点击登陆，将输入的用户名和密码打印出来

<!--more-->

## 二 效果图

![][1]
## 三 界面布局

* 在界面上拖拽两个TextField(一个是用户名一个是密码)和一个UIButton(登陆)
* 用户名的placeholder设置为“请输入用户名”，并设置clear Button属性为`Appears while editing`
* 密码的placeholder设置为`请输入密码`，并勾选`Secure Text Entry`

## 四 代码

### 4.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()<UITextFieldDelegate>
@property (weak, nonatomic) IBOutlet UITextField *userName;
@property (weak, nonatomic) IBOutlet UITextField *passWord;
@property (weak, nonatomic) IBOutlet UIButton *button;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
- (IBAction)login:(UIButton *)button
{
    NSLog(@"%@  %@",self.userName.text,self.passWord.text);
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    if(textField==self.userName)
    {
        [self.passWord becomeFirstResponder];
    }else if(textField==self.passWord)
    {
        [self login:self.button];
    }
    return YES;
}
@end
```

### 4.2 Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController,UITextFieldDelegate{

    @IBOutlet weak var userName: UITextField!
    @IBOutlet weak var passWord: UITextField!
    @IBOutlet weak var loginBtn: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func login(_ sender: UIButton)
    {
        NSLog("用户名是%@，密码是%@", self.userName.text!,self.passWord.text!);
        
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if(textField==userName)
        {
            passWord.becomeFirstResponder()
        }else if(textField==passWord)
        {
            login(self.loginBtn)
        }
        return true
    }
}
```

说明：

* `  login(_ sender: UIButton)`中，下划线`_`是用来省略参数标签（parameter label）的
* 不省略时` login(from sender: UIButton)`，需要使用参数标签`from`


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-login-username-password.gif

