---
title: IOS开发之——彩票-检查更新(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e4bffb40
date: 2022-02-08 23:06:13
---
## 一 概述

* 初始化SettingItem时，指定跳转页面地址或执行动作
* 检查更新——MBProgressHUD用法
* 检查更新——UIAlertController用法

<!--more-->

##  二 初始化SettingItem时，指定跳转页面地址或执行动作

### 2.1 destVcClass跳转页面(ILSettingArrowItem)

```
+(instancetype)itemWithIcon:(NSString *)icon title:(NSString *)title destVcClass:(Class)destVcClass
{
    ILSettingArrowItem *item=[super itemWithIcon:icon title:title];
    item.destVcClass=destVcClass;
    return item;
}
```

### 2.2 点击ILSettingItem执行动作(block)

#### ILSettingItem.h

```
typedef void(^ILSettingItemOption)();
//保存一段功能，在恰当的时候吊用
@property(nonatomic,copy) ILSettingItemOption option;
```

#### ILSettingTableViewController

```
//定义时
newVersion.option=^{
}
//使用时
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (item.option) {
        item.option();
    }
}
```

## 三 检查更新——MBProgressHUD用法
### 3.1 MBProgressHUB初始化
####  安装cocoapods

```
sudo gem install cocoapods
```

#### 在项目上右键——>Show In Folder，并在终端打开次目录

```
pod init
```

生成`Podfile`文件

####  将 MBProgressHUD添加到Podfile中

```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Lettery' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
  pod 'MBProgressHUD', '~> 1.2.0'

  # Pods for Lettery
end
```

####  执行`pod install`安装依赖

![][1]

####  打开Lettery.xcworkspace而不是Lettery.xcodeproj，添加头文件

```
#import "MBProgressHUD.h".
```

### 3.2 MBProgressHUD使用

```
//1-显示蒙版
 MBProgressHUD *hud= [MBProgressHUD  showHUDAddedTo:self.view animated:YES];
 hud.mode = MBProgressHUDModeIndeterminate;
 hud.label.text = @"Loading";
 dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)),   dispatch_get_main_queue(), ^{
            //2-隐藏蒙版
            [MBProgressHUD hideHUDForView:self.view animated:YES];      
}            
```

### 3.3 效果图
![][2]

## 四 检查更新——UIAlertController用法

### 4.1 UIAlertController样式

* 普通弹框
* ActionSheet

### 4.2 示例(普通弹框)

```
   //1.创建UIAlertControler
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"标题" message:@"这是一些信息" preferredStyle:UIAlertControllerStyleAlert];
    /*
     参数说明：
     Title:弹框的标题
     message:弹框的消息内容
     preferredStyle:弹框样式：UIAlertControllerStyleAlert
     */
    
    //2.添加按钮动作
    //2.1 确认按钮
    UIAlertAction *conform = [UIAlertAction actionWithTitle:@"确认" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        NSLog(@"点击了确认按钮");
    }];
    //2.2 取消按钮
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        NSLog(@"点击了取消按钮");
    }];
    //2.3 还可以添加文本框 通过 alert.textFields.firstObject 获得该文本框
    [alert addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.placeholder = @"请填写您的反馈信息";
    }];
 
    //3.将动作按钮 添加到控制器中
    [alert addAction:conform];
    [alert addAction:cancel];
    
    //4.显示弹框
    [self presentViewController:alert animated:YES completion:nil];

```

### 4.3 效果图
![][3]

## 四 参考

* [CSDN——OC中的弹框之UIAlertController](https://blog.csdn.net/u010057914/article/details/83027646)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-mbprogress-pod-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-mbprogress-show.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-alert-show.png