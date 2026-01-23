---
title: IOS开发之——UIKit复习
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4dc0cecf
date: 2020-05-06 23:31:08
---
##  一 概述

本文主要介绍UIKit控件中的UIButton和UITextField，并给UIButton添加点击事件和UITextField添加输入监听事件，因此引入代理的概念

<!--more-->

## 二 代码

### 2.1 OC模式下(ViewController.m)

```
#import "ViewController.h"
@interface ViewController ()<UITextFieldDelegate>
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    UIButton *btn=[UIButton buttonWithType:UIButtonTypeContactAdd];
    btn.center=self.view.center;
    [self.view addSubview:btn];
    
    [btn addTarget:self action:@selector(click:) forControlEvents:UIControlEventTouchUpInside];
}

-(void)click:(UIButton *)btn
{
    NSLog(@"%s",__func__);
    [btn removeTarget:self action:@selector(click:) forControlEvents:UIControlEventTouchUpInside];
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
{
    NSLog(@"%@  %@",NSStringFromRange(range),string);
    int loc=range.location;
    return (loc<6);
    //return YES;
    //return NO;
}

@end
```

### 2.2 Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController,UITextFieldDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let button:UIButton=UIButton.init(type: UIButton.ButtonType.contactAdd)
        button.center=self.view.center
        self.view.addSubview(button)
        
        button.addTarget(self,action: #selector(click(btn:)), for: .touchUpInside)
    }

    @objc func click(btn:UIButton){
        NSLog("%click")
        btn.removeTarget(self, action: #selector(click(btn:)), for: .touchUpInside)
    }
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        NSLog("%@  %@",NSStringFromRange(range),string)
        
        return range.location<6;
    }   
}
```

## 三 总结

* OC模式下通过让ViewController遵循协议\<UITextFieldDelegate>实现代理
* Swift模式下，通过让ViewController实现UITextFieldDelegate实现代理