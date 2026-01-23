---
title: IOS开发之——超级猜图-答案区和备选区按钮(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 6d2587c4
date: 2020-06-22 23:25:23
---
## 一 概述

本文介绍超级猜图答案区和备选区按钮思路

* 清除之前视图中的子视图
* 根据视图的宽度和按钮的个数，计算剩余边界的大小
* 根据答案长度和备选答案字符长度，设置按钮的位置
* 将按钮添加到答案区和备选区视图

<!--more-->

##  二 代码

### 2.1 答案区

```
#define kButtonWidth 35
#define kButtonHeight 35
#define kButtonMargin 10
#define kTotalCol     7

 //4.设置答案按钮
 //清除按钮
 for(UIView *view in self.optionsView.subviews)
 {
    [view removeFromSuperview];
 } 
    CGFloat answerW=self.answerView.bounds.size.width;
    NSUInteger length=question.answer.length;
    CGFloat answerX=(answerW-kButtonWidth*length-kButtonMargin*(length-1))*0.5;
    //创建所有答案的按钮
    for (int i=0; i<length; i++) 
    {
        CGFloat x=answerX+i*(kButtonMargin+kButtonWidth);
        UIButton *btn=[[UIButton alloc]initWithFrame:CGRectMake(x, 0, kButtonWidth, kButtonHeight)];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer"] forState:UIControlStateNormal];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer_heighted"] forState:UIControlStateHighlighted];
        [self.answerView addSubview:btn];
    }
```

### 2.2 备选区

```
    //5.设置备选按钮
    CGFloat optionW=self.optionsView.bounds.size.width;
    CGFloat optionX=(optionW-kTotalCol*kButtonWidth-(kTotalCol-1)*kButtonMargin)*0.5;
    for (int i=0; i<question.options.count; i++) 
    {
        int row=i/kTotalCol;
        int col=i%kTotalCol;
        CGFloat x=optionX+col*(kButtonMargin+kButtonWidth);
        CGFloat y=row*(kButtonMargin+kButtonHeight);
        UIButton *btn=[[UIButton alloc]initWithFrame:CGRectMake(x, y, kButtonWidth,kButtonHeight)];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_option"] forState:UIControlStateNormal];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_option_heighted"] forState:UIControlStateHighlighted]; 
        //设置备选区答案
        [btn setTitle:question.options[i] forState:UIControlStateNormal];
        [self.optionsView addSubview:btn];
        [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    }
```

##  三 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-chaitu-answer-option-view.gif