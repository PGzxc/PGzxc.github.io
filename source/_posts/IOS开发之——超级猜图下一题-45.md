---
title: IOS开发之——超级猜图下一题(45)
categories:
  - 开发
  - 移动开发
  - IOS
tags:
  - IOS
abbrlink: c9a504c0
date: 2020-06-21 22:42:13
---
## 一 概述

本文介绍超级猜图的下一题，思路如下：

* 当前答题的索引，索引递增
* 从数组中按照索引取出题目模型数据
* 设置基本信息
* 如果达到最后一题，禁用下一题按钮

<!--more-->

## 二 效果图

![][1]

## 三 代码

```
	 //1.当前答题的索引，索引递增
    self.index++;
    //2.从数组中按照索引取出题目模型数据
    Question *question=self.questions[self.index];
    //3.设置基本信息
    self.noLabel.text=[NSString      stringWithFormat:@"%d/%d",self.index+1,self.questions.count];
    self.titleLabel.text=question.title;
    [self.iconButton setImage:[UIImage imageNamed:question.icon] forState:UIControlStateNormal];
    //如果达到最后一题，禁用下一题按钮
    self.nextQuestButton.enabled=(self.index<self.questions.count-1);
```



[1]:https://raw.githubusercontent.com/PGzxc/images/master/2020/ios-chaoji-caitu-nextquestion.gif