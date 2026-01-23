---
title: IOS开发之——加法计算器
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 2502a12e
date: 2020-05-05 22:19:29
---
## 一 概述

本文以一个示例：加法计算器，介绍iOS开发的步骤，并提供OC和Swift两个版本：
工具：
* xcode:11.4.1
* Mac：10.15.4

<!--more-->

## 二 新建项目

1. 打开xcode后，依次点击：File—>New—>Project，打开项目创建模版
   ![][1]
2. 选择Single View App后，输入应用的名称
   ![][2]
3. 项目创建完成后，项目文件结构
   ![][3]

## 三 界面布局

1. 点击项目文件中的Main.storyboard，代码编辑区显示空白布局
   ![][4]
   
2. 点击项目右侧的“+”Library或者使用`Shift(⇧)+Command(⌘)+L`调出Library组件库
   ![][5]
   
3. 按照如图所示，选择Label，Button和Text Field组件，调整布局如图所示

   ![][6]



## 四 代码实现

### 4.1 OC模式

#### 4.1.1 ViewController.h

```
#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
@property (weak, nonatomic) IBOutlet UITextField *num1;
@property (weak, nonatomic) IBOutlet UITextField *num2;
@property (weak, nonatomic) IBOutlet UILabel *result;
- (IBAction)comput:(id)sender;

@end
```

#### 4.1.2 ViewController.m

```
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}


- (IBAction)comput:(id)sender {
    int calcResult= self.num1.text.intValue+self.num2.text.intValue;
    self.result.text=[NSString stringWithFormat:@"%d",calcResult];
    //[self.num1 resignFirstResponder];
    //[self.num2 resignFirstResponder];
    [self.view endEditing:YES];
}
@end
```

### 4.2 Swift模式

#### 4.2.1 ViewController.swift

```
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBOutlet weak var num1: UITextField!
    @IBOutlet weak var num2: UITextField!
    @IBOutlet weak var calcResult: UILabel!
    
    @IBAction func compute(_ sender: Any) {
        
        let result:Int=Int.init(num1.text!)!+Int.init(num2.text!)!
        calcResult.text=String.init(result)
        self.view.endEditing(true)
        
        //num1.resignFirstResponder()
        //num2.resignFirstResponder();  
    }
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-new-project-template-choice.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-new-project-projectname.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-new-project-create-finished.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-main-storyboard-preview.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-add-component-library.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-project-calc-layout-view.png