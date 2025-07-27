---
title: Flutter开发之——getX-国际化(119)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 807e16b4
date: 2022-05-07 15:14:40
---
## 一 国际化效果图

如下图所示，点击`中文`按钮显示中文；点击`EN`按钮显示英文，进行切换

| 国际化中文 | 国际化英文 |
| :--------: | :--------: |
|   ![][1]   |   ![][2]   |

<!--more-->

## 二 国际化步骤

### 2.1 项目结构图说明

![][3]

本项目是在上文`Flutter开发之——底部导航栏BottomNavigationBar`的基础上进行修改，关于这方面的知识点，请查看上文，这里只对国际化的内容做如下说明：

* Main：入口文件配置
* string：Messages各种语言键值对中的键，方便复用和显示时引用
* Messages：国际化语言配置，根据需要配置中文/英文/其他

### 2.2 项目代码

#### main

```
void main() => runApp(GetMaterialApp(
    translations: Messages(), //显示继承Translations，配置显示国际化内容
    locale: const Locale('zh', 'CN'),//默认展示本地语言
    fallbackLocale: const Locale('zh', 'CN'),//语言选择无效时，备用语言
    getPages: [
      GetPage(name: '/', page: () => IndexWidget(), binding: IndexBinding())
    ]));
```

说明：

* 在GetMaterialApp分别配置`translations`、`locale`、`fallbackLocale`三个选项
* translations：显示继承Translations，配置显示国际化内容
* locale：刚进入App时，默认显示语言
* fallbackLocale：语言选择无效时，备用语言

#### string(国际化键值对和显示内容)

```
class I18nContent{

  static const String title="title";
  static const String BottomBarHome="home";
  static const String BottomBarTree="tree";
  static const String BottomBarNavi="navi";
  static const String BottomBarMe="me";

}
```

#### Messages

```
class Messages extends Translations{
  @override
  Map<String, Map<String, String>> get keys => {

    //1-配置中文简体
    'zh_CN':{
        I18nContent.title:"国际化",
        I18nContent.BottomBarHome:"首页",
        I18nContent.BottomBarTree:"分支",
        I18nContent.BottomBarNavi:"导航",
        I18nContent.BottomBarMe:"我",
    },
    //2-配置英文
    'en_US':{
      I18nContent.title:"I18n",
      I18nContent.BottomBarHome:"Home",
      I18nContent.BottomBarTree:"Tree",
      I18nContent.BottomBarNavi:"Navi",
      I18nContent.BottomBarMe:"Me",
    }
  };
}
```

### 2.3 中英文切换

#### 界面显示内容(IndexWidget)

```
Widget build(BuildContext context) {
   return Scaffold(
     appBar: AppBar(title: Text(I18nContent.title.tr),
                    actions: <Widget>[
                      IconButton(icon:  Image.asset("images/zh.png"), onPressed: () {controller.changeZh();}),
                      IconButton(icon:  Image.asset("images/en.png"), onPressed: () {controller.changeEn();})
                ],),
     bottomNavigationBar: _buildBottomNavigationBar(),
     body: _buildPageView(),
   );
  }
```

#### 界面切换逻辑(IndexController)

```
void changeEn() {
    var locale = Locale('en', 'US');
    Get.updateLocale(locale);
    Get.offAllNamed('/');
  }
 void changeZh(){
    var locale = Locale('zh', 'CN');
    Get.updateLocale(locale);
    Get.offAllNamed('/');
 }
```

说明：

* 调用`Get.updateLocale(locale);`便可设置语言切换
* 若要全部语言切换，还需要调用`Get.offAllNamed('/');`
* 若持久化存储，可将`Local`保存到Sharepreference中

## 三 参考

* [Github-getx-国际化文档](https://github.com/jonataslaw/getx#utils)
* [CSDN-参考代码](https://download.csdn.net/download/Calvin_zhou/85311169)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-08-i18n-zh.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-08-i18n-en.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-08-i18n-project-struct.png