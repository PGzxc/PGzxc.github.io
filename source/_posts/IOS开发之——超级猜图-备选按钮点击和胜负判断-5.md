---
title: IOS开发之——超级猜图-备选按钮点击和胜负判断(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 1fb716d1
date: 2020-06-23 23:59:55
---
## 一 概述

本文继续介绍超级猜图的以下功能：

* 点击备选按钮，备选按钮处文字替换答案区文字，并且备选按钮按钮隐藏
* 答案正确时，文字显示蓝色，自动进入下一题
* 答案错误时，文字显示红色

<!--more-->

## 二 效果图

![][1]
## 三 代码(ViewController.m)

```
#import "ViewController.h"
#import "Question.h"

#define kButtonWidth 35
#define kButtonHeight 35
#define kButtonMargin 10
#define kTotalCol     7

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIButton *iconButton;
@property (weak, nonatomic) IBOutlet UILabel *noLabel;
@property (weak, nonatomic) IBOutlet UIButton *nextQuestButton;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (nonatomic,strong) UIButton *cover;
@property (nonatomic,strong) NSArray *questions;
@property (weak, nonatomic) IBOutlet UIView *answerView;
@property (weak, nonatomic) IBOutlet UIView *optionsView;
@property (nonatomic,assign) int index;//题目索引

@end

@implementation ViewController

- (NSArray *)questions
{
    if (_questions==nil) {
        _questions=[Question questions];
    }
    return _questions;
}
- (UIButton *)cover
{
    if (_cover==nil) {

        _cover=[[UIButton alloc]initWithFrame:self.view.bounds];
        _cover.backgroundColor=[UIColor colorWithWhite:0.0 alpha:0.5];
        [self.view addSubview:_cover];
        _cover.alpha=0.0;
        [_cover addTarget:self action:@selector(bigImage:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _cover;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    self.index=-1;
    [self nextQuestion:self.nextQuestButton];
 
}
//大图小图切换
- (IBAction)bigImage:(UIButton *)sender
{
    //如果没有放大，就放大图片，否则就缩小
    //通过蒙版的alpha来判断按钮是否已被放大
    if (self.cover.alpha==0.0)
    {
          //2.将图像按钮放到最前面
          [self.view bringSubviewToFront:self.iconButton];
          //3.动画放大图像按钮
          CGFloat w=self.view.bounds.size.width;
          CGFloat h=w;
          CGFloat y=(self.view.bounds.size.height-h)*0.5;
          [UIView animateWithDuration:1.0f animations:^{
               self.iconButton.frame=CGRectMake(0,y, w, h);
              self.cover.alpha=1.0;
          }];
    }else
    {
        [UIView animateWithDuration:1.0 animations:^{
              self.iconButton.frame=CGRectMake(112, 160, 150, 150);
            self.cover.alpha=0.0;
          }];
    } 
}
#pragma mark 下一题

- (IBAction)nextQuestion:(UIButton *)sender
{
    //1.当前答题的索引，索引递增
    self.index++;
    //如果index已经到了最后一题，提示用户，播放动画
    if (self.index==self.questions.count) {
        return;
    }
    //2.从数组中按照索引取出题目模型数据
    Question *question=self.questions[self.index];
    //3.设置基本信息
    [self setupBasicInfo:question];
    //4.设置答案按钮
    [self createAnswerButtons:question];
    //5.设置备选按钮
    [self createOptionButtons:question];

}
//设置基本信息
-(void)setupBasicInfo:(Question *)question
{
    self.noLabel.text=[NSString stringWithFormat:@"%d/%lu",self.index+1,(unsigned long)self.questions.count];
       self.titleLabel.text=question.title;
       [self.iconButton setImage:[UIImage imageNamed:question.icon] forState:UIControlStateNormal];
       //如果达到最后一题，禁用下一题按钮
       self.nextQuestButton.enabled=(self.index<self.questions.count-1);
    
}
//设置答案按钮
-(void)createAnswerButtons:(Question *)question
{
    //首先清除掉答题区内的所有按钮
    for (UIView *btn in self.answerView.subviews) {
        [btn removeFromSuperview];
    }
    CGFloat answerW=self.answerView.bounds.size.width;
    NSUInteger length=question.answer.length;
    CGFloat answerX=(answerW-kButtonWidth*length-kButtonMargin*(length-1))*0.5;
    //创建所有答案的按钮
    for (int i=0; i<length; i++) {
        CGFloat x=answerX+i*(kButtonMargin+kButtonWidth);
        UIButton *btn=[[UIButton alloc]initWithFrame:CGRectMake(x, 0, kButtonWidth, kButtonHeight)];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer"] forState:UIControlStateNormal];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer_heighted"] forState:UIControlStateHighlighted];
        [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        [self.answerView addSubview:btn];
    }
}
//设置备选按钮
-(void)createOptionButtons:(Question *)question
{
    //问题：每次调用下一题方法时，都会重新创建21个按钮
    //解决：如果按钮已经存在，并且是21个，只需要更改按钮标题即可
    if (self.optionsView.subviews.count!=question.options.count) {
        //清除按钮
          for(UIView *view in self.optionsView.subviews)
          {
              [view removeFromSuperview];
          }
        CGFloat optionW=self.optionsView.bounds.size.width;
        CGFloat optionX=(optionW-kTotalCol*kButtonWidth-(kTotalCol-1)*kButtonMargin)*0.5;
        for (int i=0; i<question.options.count; i++) {
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
            [btn addTarget:self action:@selector(optionClick:) forControlEvents:UIControlEventTouchUpInside];
            [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        }
    }
    //如果按钮已经存在，在点击下一题的时候，只需要设置标题即可
    int i=0;
    for (UIButton *btn in self.optionsView.subviews) {
        //设置备选答案
        btn.hidden=NO;
        [btn setTitle:question.options[i++] forState:UIControlStateNormal];
    }   
}
#pragma mark 候选按钮点击
-(void)optionClick:(UIButton *)button
{
    //1.在答案区找到第一个文字为空的按钮
    UIButton *btn=[self firstAnswerButton];
    if (btn==nil) {
        return;
    }
    //2.将button的标题设置给答案区的按钮
    [btn setTitle:button.currentTitle forState:UIControlStateNormal];
    //3.将button隐藏
    button.hidden=YES;
    //4.判断结果
    [self judge];
    
}

//判断结果
-(void)judge
{
    BOOL isFull=YES;
    NSMutableString *strM=[NSMutableString string];
    for (UIButton *btn in self.answerView.subviews) {
        if (btn.currentTitle.length==0) {
            isFull=NO;
            break;
        }else
        {
            [strM appendString:btn.currentTitle];
        }
    }
    if (isFull) {
    //根据self.index获取当前的question
        Question *question=self.questions[self.index];
        //如果一致，进行下一题
        if ([strM isEqualToString:question.answer]) {
            [self setAnswerButtonsColor:[UIColor blueColor]];
            //等待0.5s，进入下一题
            [self performSelector:@selector(nextQuestion:) withObject:nil afterDelay:0.5];
        }else
        {
             [self setAnswerButtonsColor:[UIColor redColor]];
        }
    }
}
//修改答题区按钮的颜色
-(void)setAnswerButtonsColor:(UIColor *)color
{
    for (UIButton *btn in self.answerView.subviews) {
        [btn setTitleColor:color forState:UIControlStateNormal];
    }
}
//在答案区找到第一个文字为空的按钮
-(UIButton *)firstAnswerButton
{
    for(UIButton *btn in self.answerView.subviews)
    {
        if (btn.currentTitle.length==0) {
            return btn;
        }
    }
    return nil;
}
@end
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-chaoji-caitu-answer-right.gif