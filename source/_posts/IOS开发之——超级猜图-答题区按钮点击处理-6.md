---
title: IOS开发之——超级猜图-答题区按钮点击处理(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 95299c3f
date: 2020-06-26 22:52:58
---
## 一 概述

超级猜图当点击答题区按钮时处理思路：

* 如果答题区按钮没字，直接返回
* 如果有字，清除文字，候选区按钮显示
  - 使用button的title去查候选区中对应的按钮
  - 候选区显示对应按钮
  - 清除button的文字
  - 只要点击了按钮上的文字，意味着答题区的内容不完成，修改答题区颜色

<!--more-->

## 二 效果图

![][1]

## 三 代码

```
#pragma mark 答题区按钮解决方法
-(void)answerClick:(UIButton *)button
{
    //1.如果按钮没有字，直接返回
    if (button.currentTitle.length==0) {
        return;
    }
    //2.如果有字，清除文字，候选区按钮显示
    //2.1使用button的title去查候选区中对应的按钮
    UIButton *btn=[self optionButtonWithTitle:button.currentTitle];
    //2.2显示对应按钮
    btn.hidden=NO;
    //2.3清除button的文字
    [button setTitle:@"" forState:UIControlStateNormal];
    //2.4只要点击了按钮上的文字，意味着答题区的内容不完整
    [self setAnswerButtonsColor:[UIColor blackColor]];

    
}
-(UIButton *)optionButtonWithTitle:(NSString *)title
{
    //遍历候选区中的所有按钮
    for (UIButton *btn in self.optionsView.subviews) {
        if ([btn.currentTitle isEqualToString:title]&&btn.isHidden) {
            return btn;
        }
    }
    return nil;
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-answer-click.gif
