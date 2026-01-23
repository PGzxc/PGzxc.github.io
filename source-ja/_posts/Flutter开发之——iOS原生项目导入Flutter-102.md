---
title: Flutter开发之——iOS原生项目导入Flutter(102)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 5f82523a
date: 2021-07-20 08:39:13
---
## 一 概述

* iOS开发环境介绍
* 创建iOS原生项目
* 创建Flutter module
* 将Flutter嵌入到iOS应用程序中
* 打开混合后的项目空间(MyApp.xcworkspace)
* 原生页面跳转Flutter

<!--more-->

## 二 iOS开发环境介绍

* Xcode：12.5.1
* CocoaPod：1.10.1(pod --version)
* Flutter：2.2.3
* Dart：2.13.4

## 三 创建iOS原生项目

### 3.1 说明

创建IOS2Flutter文件夹，稍后将iOS和flutter项目都放在此文件夹下

### 3.2 创建IOS项目

* 依次点击：File——>Project——>App
  ![][1]
* 设置对应的项目名称，机构id和编程语言
  ![][2]
* 选择文件的创建位置
  ![][3]
## 四 创建Flutter module

* 进入到IOS2Flutter文件夹(iOS项目文件夹)，并在终端中打开

  ![][4]
  
* 执行如下指令创建Flutter module

  ```
  flutter create --template module my_flutter
  ```

  ![][5]
  
* 执行后原生iOS和Flutter项目的目录结构

  ![][6]
  说明：
  
  ```
  1-.ios 是隐藏目录，可以单独运行Flutter module，测试此模块的功能
  2-iOS代码添加到现有应用程序的项目或插件中，而不是添加到模块的.ios /目录中
  ```

## 五 将Flutter嵌入到iOS应用程序中

### 5.1 嵌入方式说明

将Flutter嵌入到IOS应用程序中，使用：使用CocoaPods和已安装的Flutter SDK

### 5.2 创建IOS端Podfile文件

* 终端进入到iOS项目路径下

  ```
  cd MyApp/
  ```

* 执行如下指令，生成Podfile文件

  ```
  pod init
  ```

* 默认创建的Podfile文件内容如下

  ```
  # Uncomment the next line to define a global platform for your project
  # platform :ios, '9.0'
  
  target 'MyApp' do
    # Comment the next line if you don't want to use dynamic frameworks
    use_frameworks!
  
    # Pods for MyApp
  
    target 'MyAppTests' do
      inherit! :search_paths
      # Pods for testing
    end
  
    target 'MyAppUITests' do
      # Pods for testing
    end
  
  end
  ```

* 修改Podfile文件的内容(导入flutter模块)

  ```
  # Uncomment the next line to define a global platform for your project
  platform :ios, '9.0'
  flutter_application_path = '../my_flutter'
  load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
  
  target 'MyApp' do
    # Comment the next line if you don't want to use dynamic frameworks
    use_frameworks!
    install_all_flutter_pods(flutter_application_path)
  
    # Pods for MyApp
  
    target 'MyAppTests' do
      inherit! :search_paths
      install_all_flutter_pods(flutter_application_path)
      # Pods for testing
    end
  
    target 'MyAppUITests' do
      install_all_flutter_pods(flutter_application_path)
      # Pods for testing
    end
  
  end
  ```

  说明：CocoaPods 相关请[参考官网](https://cocoapods.org/)

  ```
  1-platform：ios版本9.0
  2-flutter_application_path = '../my_flutter'：flutter模块的路径
  ```

* 执行`pod install`命令

## 六 打开混合后的项目空间(MyApp.xcworkspace)

* 关闭Xcode，找到Ios2Flutter/MyApp/MyApp.xcworkspace，用xcod打开

  ![][8]
  
* 打开后的项目包含iOS原生项目(MyApp)和Flutter依赖Pods

  ![][9]
* `⌘B` 或者`Product—>Build` 编译项目，编译成功后Flutter已成功导入，可以在iOS中正常使用


## 七 原生页面跳转Flutter

### 7.1 IOS跳转Flutter界面

在Main.storyboard上添加一个按钮`IOS跳转Flutter`

### 7.2 ViewController中跳转Flutter方法

```
import UIKit
import Flutter

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @IBAction func jumpFlutter(_ sender: Any)
    {
         let flutterViewController = FlutterViewController.init()
         present(flutterViewController, animated: true, completion: nil)
    }  
}
```

### 7.3 效果图
![][10]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-add-create-ios-project.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-add-create-ios-project-setting.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-add-create-ios-project-position.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-flutter-open-terminal.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-flutter-module-create.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-flutter-struct.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-pod-install.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-xcworkspace-select.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-xcwork-open-two-pro.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-jump-flutter-result.gif

