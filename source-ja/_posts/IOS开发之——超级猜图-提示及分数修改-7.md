---
title: IOS开发之——超级猜图-提示及分数修改(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 6c8812cb
date: 2020-06-26 22:54:40
---
## 一 概述

超级猜图提示功能：

* 把答案区中所有的按钮清空
* 把正常答案的第一个字，设置到答题区中
* 答题正确得分，使用提示功能减分

<!--more-->

## 二 效果图

![][1]

## 三 代码

```
#pragma mark 提示功能
-(IBAction)tipClick
{

    //1.把答题区中所有的按钮清空
    for (UIButton *btn in self.answerView.subviews)
    {
        //用代码执行点击答题按钮的操作
        [self answerClick:btn];
    }
    //2.把正确答案的第一个字，设置到答题区中
    Question *question=self.questions[self.index];
    NSString *first=[question.answer substringToIndex:1];
    UIButton *btn=[self optionButtonWithTitle:first isHidden:NO];
    [self optionClick:btn];
    //扣分
    [self changeScore:-1000];

}
#pragma 分数处理
-(void)changeScore:(int)score
{
    //取出当前的分数
    int currentScore=self.scoreButton.currentTitle.intValue;
    //使用score调整分数
    currentScore+=score;
    //重新设置分数
    [self.scoreButton setTitle:[NSString stringWithFormat:@"%d",currentScore] forState:UIControlStateNormal];
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-tishi.gif