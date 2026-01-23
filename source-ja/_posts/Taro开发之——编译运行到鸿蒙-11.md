---
title: Taro开发之——编译运行到鸿蒙(11)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: ee20850d
date: 2025-07-02 08:15:27
---
## 一 概述

* 开发环境
* Taro执行指令生成dist文件
* 鸿蒙开发工具创建项目及配置
* 默认程序效果及修改程序并运行

<!--more-->

## 二 开发环境

* 操作系统：Win 11 专业版 24H2
* 开发工具：VSCode、DevEco Studio 鸿蒙应用开发工具
* Node: 22.16.0
* Yarn: 1.22.22

## 二 Taro执行指令生成dist文件

### 2.1 终端执行如下指令

```
yarn build:harmony-hybrid
```

![][1]

### 2.2 编译完成后，dist目录下文件生成

![][2]

## 三 鸿蒙开发工具创建项目及配置

### 3.1 创建空白项目

1、File—>New—>Create Project选择模板

![][3]

2、创建完成后，项目结构图示如下

![][4]

### 3.2 鸿蒙开发工具配置

1、在 `entry/oh-package.json5` 文件中添加 `@hybrid/web-container`模块的依赖并点击 `Sync Now` 进行同步

```
{
  "name": "entry",
  "version": "1.0.0",
  "description": "Please describe the basic information.",
  "main": "",
  "author": "",
  "license": "",
  "dependencies": {
    "@hybrid/web-container": "2.0.0-rc.3"
  }
}
```

![][5]

2、在`entry/src/main/ets/entryability/EntryAbility.ets` 文件中初始化web-container环境：

```
windowStage.loadContent('pages/Index', (err, data) => {
      const windowClass: window.Window = windowStage.getMainWindowSync();
      TaroHybridManager.init({
        uiAbilityContext: this.context,
        windowClass,
      })
});
```

![][6]

3、将TaroDemo项目下的dist文件复制到鸿蒙开发工具下的rawfile文件夹下

![][7]

4、在 `entry/src/main/ets/pages/Index.ets` 主页面文件中使用 `TaroWebContainer` 组件

```
import Url from '@ohos.url';
import { TaroWebContainer, InjectObject, HostPageState, TaroWebController } from '@hybrid/web-container';

@Entry
@Component
struct TaroMpharmonySample {
  @State pageState: HostPageState = HostPageState.PageInit;
  @State taroWebController: TaroWebController = new TaroWebController();

  // 用户可以自定义对象注入到Web环境中，使用native.sayHello格式进行调用
  nativeObj: InjectObject = {
    sayHello: () => console.log('Hello World'),
  }

  onBackPress() {
    if (this.taroWebController.accessBackward()) {
      this.taroWebController.backward();
      return true;
    }
    return false;
  }

  onPageShow() {
    this.pageState = HostPageState.PageOnShow;
  }

  onPageHide() {
    this.pageState = HostPageState.PageOnHide;
  }

  webUrl(): string {
    // 开发阶段可以把网站静态资源文件放置到src/main/resources/rawfile/目录下
    // 生产环境下把网站静态资源放置到web服务器, 这里填写实际的网站地址url
    return 'resource://rawfile/index.html';
  }

  webUrlPrefix() {
    try {
      const url = Url.URL.parseURL(this.webUrl());
      return `${url.protocol}//${url.host}/`;
    } catch (err) {
      return '';
    }
  }

  build() {
    Column() {
      TaroWebContainer({
        pageState: this.pageState, // 页面状态同步到组件
        webUrl: this.webUrl(), // 初始Url
        webUrlPrefix: this.webUrlPrefix(),
        useCache: false,
        taroWebController: this.taroWebController,
        isFullScreen: true, // 是否全屏显示
        injectObj: this.nativeObj, // 注入对象
        forceDarkAccess: true,
      })
        .width('100%')
        .height('100%')
    }
  }
}
```

![][8]

## 四 默认程序效果及修改程序并运行

### 4.1 默认运行效果

![][9]

### 4.2 pages/index/index.tsx文件修改内容

```
const items = ['Item 1', 'Item 2', 'Item 3','Item 4','Item 5']; //添加数据项
//添加显示列表
{ 
    items.map((item, index) => {
        return <View key={index}>{item}</View>
     })
  }
```

### 4.3 修改后效果(重新编译执行并复制到rawfile下)

![][10]

### 五 参考

* [Taro官网文档——鸿蒙开发](https://docs.taro.zone/docs/GETTING-STARTED#harmony-hybrid)
* [DevEco工具—下载地址](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-software-install)
* [OpenHarmony三方库中心仓—@hybrid/web-container](https://ohpm.openharmony.cn/#/cn/detail/@hybrid%2Fweb-container/v/2.0.0-rc.9)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-build-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-dist-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-create-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-struct-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-dependy-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-activity-modi-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-dist-move-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-index-re-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-deafult-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-11-hm-modify-view-10.png