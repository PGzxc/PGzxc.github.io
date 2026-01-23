---
title: Flutter开发之——getX-小组件(115)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 2cd86c7f
date: 2022-05-03 10:31:32
---
## 一 概述

在getX中，无需context上下文，便可使用SmallWidget小组件：

* SnackBars提示信息
* Dialog对话框
* BottomSheets底部弹窗

<!--more-->

## 二 SnackBars提示信息

### 2.1 SnackBars属性信息

| 编号 |     属性      |         说明         |
| :--: | :-----------: | :------------------: |
|  1   |     title     |         标题         |
|  2   |    message    |         内容         |
|  3   |   colorText   |       文字颜色       |
|  4   |   duration    |       显示时长       |
|  5   | snackPosition | 显示位置(Top/Bottom) |
|  6   |     icon      |         图标         |
|  7   |     onTap     |       点击事件       |

### 2.2 代码示例

```
Get.snackbar(
      "SnackBar--Title!", // title
      "SnackBar-Content",
      // message
      icon: Icon(Icons.alarm),
      colorText: Colors.black,
      shouldIconPulse: true,
      onTap: (_) => { print('onTap')},
      barBlur: 20,
      isDismissible: true,
      duration: Duration(seconds: 3),
 );
```

### 2.3 效果图

![][1]

## 三 Dialog对话框

### 3.1 Dialog的两种使用方式

* 使用默认的对话框：Get.defaultDialog
* 自定义Dialog对话框：Get.dialog(YourDialogWidget())

### 3.2 示例 

#### 默认对话框

```
Get.defaultDialog(
        onConfirm: () => Get.back(),
        // onCancel:()=>{},
        middleText: "Dialog made in 3 lines of code");
```

#### 自定义对话框

```
Get.dialog(SimpleDialog(
      title: Text('提示'),
      children: <Widget>[
        Container(height: 80, alignment: Alignment.center, child: Text('确认删除吗？'),),
        Divider(height: 1,),
        FlatButton(child: Text('取消'), onPressed: () {Get.back();},),
        Divider(height: 1,),
        FlatButton(child: Text('确认'), onPressed: () {Get.back();},),
      ],
    )
    );
```

### 3.3 效果图

| 默认Dialog | 自定义Dialog |
| :--------: | :----------: |
|   ![][2]   |    ![][3]    |

## 四 BottomSheets底部弹窗

### 4.1 代码

```
void showBottomSheets() {
    Get.bottomSheet(
        Container(
          child: Wrap(
            children: <Widget>[
              ListTile(leading: Icon(Icons.music_note), title: Text('Music'), onTap: () {Get.back();}),
              ListTile(leading: Icon(Icons.videocam), title: Text('Video'), onTap: () {Get.back();},),
            ]),
        ),
        backgroundColor: Colors.white);
  }
```

### 4.2 效果图
![][4]

## 五 参考
* [Github-getX-route_management](https://github.com/jonataslaw/getx/blob/master/documentation/en_US/route_management.md)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-05-snackbar-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-05-dialog-default.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-05-dialog-custom.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-05-bottom-sheet.png

