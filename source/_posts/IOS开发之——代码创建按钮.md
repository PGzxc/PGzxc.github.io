---
title: IOS开发之——代码创建按钮
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 237c9b4b
date: 2020-05-17 23:24:39
---
## 一 概述

之前创建的项目中，比较简单，一般步骤：

* 布局文件是在Main.storyboard中通过拖拽组件实现，代码逻辑在ViewController.m中
* 本文组件的创建和代码逻辑实现都放在VIewController.m中

<!--more-->

## 二 代码

### 2.1 OC模式下(ViewController.m)

```
   //创建按钮
    UIButton *btn=[[UIButton alloc]initWithFrame:CGRectMake(100,100, 100, 100)];
    //设置背景色
    btn.backgroundColor=[UIColor grayColor];
    //设置背景图片
    [btn setBackgroundImage:[UIImage imageNamed:@"btn_01"] forState:UIControlStateNormal];
    [btn setBackgroundImage:[UIImage imageNamed:@"btn_02"] forState:UIControlStateHighlighted];
    //设置按钮文字
    [btn setTitle:@"点我啊" forState:UIControlStateNormal];
    [btn setTitle:@"点我干啥" forState:UIControlStateHighlighted];
    //设置文字颜色
    [btn setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
    [btn setTitleColor:[UIColor blueColor] forState:UIControlStateHighlighted];
    
    //设置对其方式
    btn.contentVerticalAlignment=UIControlContentVerticalAlignmentBottom;
    [self.view addSubview:btn];
```

### 2.2 Swift模式下(ViewController.swift)

```
 let btn:UIButton=UIButton.init(frame: CGRect.init(x: 100, y: 100, width: 100, height: 100))
 btn.backgroundColor=UIColor.darkGray
  //设置背景图片
 btn.setBackgroundImage(UIImage.init(named: "btn_01"), for: UIControl.State.normal)
 btn.setBackgroundImage(UIImage.init(named: "btn_02"), for: UIControl.State.highlighted)
        
 //设置按钮文字
 btn.setTitle("点我啊", for: UIControl.State.normal)
 btn.setTitle("点我干啥", for: UIControl.State.highlighted)
        
 //设置文字颜色
 btn.setTitleColor(UIColor.red, for: UIControl.State.normal)
 btn.setTitleColor(UIColor.blue, for: UIControl.State.highlighted)
        
 //设置对其方式
btn.contentVerticalAlignment=UIControl.ContentVerticalAlignment.bottom
self.view.addSubview(btn);
```

