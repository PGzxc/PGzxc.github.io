---
title: IOS开发之——彩票-帮助(11)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 50b94099
date: 2022-02-13 12:09:21
---
## 一 概述

* 设置页面点击帮助，跳转帮助TableViewController页面
* 点击帮助列表中的每一项，打开WebView显示具体信息

<!--more-->

## 二 设置页面点击帮助，跳转帮助TableViewController页面

### 2.1 页面结构及功能分析

* 帮助页面是一个列表，构建ILHelpViewController继承ILBaseTableViewController
* 列表数据从Data下的help.json中获取，构建ILHtml Model存储help中的列表项
* 重写tableView的didSelectRowAtIndexPath方法，ILHtmlViewController的view(WebView)展示信息
* ILHtmlViewController中多个信息在同一个页面需要跳转时，使用window.location.href跳转id的指定位置

##  三 设置页面点击帮助，跳转帮助ableViewController页面

### 3.1 ILHtml(help.json)Model

#### ILHtml.h

```
#import <Foundation/Foundation.h>

@interface ILHtml : NSObject
@property(nonatomic,copy) NSString *title;
@property(nonatomic,copy) NSString *ID;
@property(nonatomic,copy) NSString *html;

+(instancetype)htmlWithDict:(NSDictionary *)dict;

@end
```

####  ILHtml.m

```
#import "ILHtml.h"

@implementation ILHtml

+ (instancetype)htmlWithDict:(NSDictionary *)dict
{
    ILHtml *html=[[ILHtml alloc]init];
    
    html.title=dict[@"title"];
    html.ID=dict[@"id"];
    html.html=dict[@"html"];
    return html;
}
@end
```

### 3.2 ILHelpViewController(帮助页面)

```
#import "ILHelpViewController.h"
#import "ILSettingItem.h"
#import "ILSettingGroup.h"
#import "ILSettingCell.h"
#import "ILSettingArrowItem.h"
#import "ILSettingSwitchItem.h"
#import "ILScoreNoticeViewController.h"
#import "ILHtml.h"
#import "ILHtmlViewController.h"
#import "ILUINavigationController.h"


@interface ILHelpViewController ()
//存储help.json
@property (nonatomic,strong) NSMutableArray *htmls;

@end

@implementation ILHelpViewController

-(NSMutableArray *)htmls
{
    if (_htmls==nil) {
        _htmls=[NSMutableArray array];
        
        NSString *fileName=[[NSBundle mainBundle]pathForResource:@"MyResource/Data/help.json" ofType:nil];
        NSData *data=[NSData dataWithContentsOfFile:fileName];
        NSArray *jsonArr=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];

        for (NSDictionary *dict in jsonArr) {
            ILHtml *html=[ILHtml htmlWithDict:dict];
            [_htmls addObject:html];
        }
    }
    return _htmls;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addGroup0];

}
-(void)addGroup0
{
    //第0组
//    ILSettingItem *item1=[ILSettingArrowItem itemWithIcon:nil title:@"如何领奖？" destVcClass:nil];
//    ILSettingItem *item2=[ILSettingArrowItem itemWithIcon:nil title:@"如何充值？"];
//    ILSettingItem *item3=[ILSettingArrowItem itemWithIcon:nil title:@"如何提现？"];
//    ILSettingItem *item4=[ILSettingArrowItem itemWithIcon:nil title:@"如何购彩？"];
//    ILSettingItem *item5=[ILSettingArrowItem itemWithIcon:nil title:@"如何连续多期购买？"];
//
//    ILSettingGroup *group0=[[ILSettingGroup alloc]init];
//    group0.items=@[item1,item2,item3,item4,item5];
//    group0.header=@"标题头部-1";
//    group0.footer=@"标题尾部-1";
//
//    [self.dataList addObject:group0];
    
    NSMutableArray *items=[NSMutableArray array];
    //遍历模型
    for(ILHtml *html in self.htmls)
    {
        ILSettingArrowItem *item=[ILSettingArrowItem itemWithIcon:nil title:html.title destVcClass:nil];
        [items addObject:item];
        
    }
    ILSettingGroup *group0=[[ILSettingGroup alloc]init];
    group0.items=items;
    [self.dataList addObject:group0];

}

//重写tableView的点击跳转
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    //取出每一行对应的Html模型
    ILHtml *html=self.htmls[indexPath.row];
    ILHtmlViewController *htmlVc=[[ILHtmlViewController alloc]init];
    htmlVc.html=html;
    htmlVc.title=html.title;
    
    ILUINavigationController *nav=[[ILUINavigationController alloc]initWithRootViewController:htmlVc];
    
    [self presentViewController:nav animated:YES completion:nil];
}

@end
```

说明：

* 跳转时使用`ILUINavigationController`,已经定义好了标题颜色和样式
* ILUINavigationController通过initWithRootViewController关联ILHtmlViewController

## 四 点击帮助列表中的每一项，打开WebView显示具体信息

### 4.1 ILHtmlViewController.h

```
#import <UIKit/UIKit.h>
@class ILHtml;
@interface ILHtmlViewController : UIViewController
@property(nonatomic,strong) ILHtml *html;

@end
```

### 4.2 ILHtmlViewController.m

```
#import "ILHtmlViewController.h"
#import "ILHtml.h"
@interface ILHtmlViewController ()<UIWebViewDelegate>

@end

@implementation ILHtmlViewController

-(void)loadView
{
    self.view=[[UIWebView alloc]init];
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor=[UIColor whiteColor];
    
    UIBarButtonItem *cancle=[[UIBarButtonItem alloc]initWithTitle:@"取消" style:UIBarButtonItemStyleBordered target:self action:@selector(cancel)];
    
    self.navigationItem.leftBarButtonItem=cancle;
    
    UIWebView *webView=(UIWebView *)self.view;
    NSURL *url=[[NSBundle mainBundle]URLForResource:[NSString stringWithFormat:@"MyResource/Html/%@",_html.html] withExtension:nil];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    webView.delegate=self;
    [webView loadRequest:request];
}

-(void)cancel
{
    //回到上一个控制器
    [self dismissViewControllerAnimated:YES completion:nil];
}
-(void)webViewDidFinishLoad:(UIWebView *)webView
{
    NSString *js=[NSString stringWithFormat:@"window.location.href='#%@';",_html.ID];
    [webView stringByEvaluatingJavaScriptFromString:js];
}
@end
```

## 五 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-help-view.gif