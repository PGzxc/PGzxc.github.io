---
title: Flutter开发之——底部导航栏BottomNavigationBar(118)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 63ef9a3d
date: 2022-05-06 19:44:48
---
## 一 底部导航栏效果图

|   模式   |  首页  | 关系图 | 导航页 | 关于我 |
| :------: | :----: | :----: | :----: | :----: |
|  Fixed   | ![][1] | ![][2] | ![][3] | ![][4] |
| Shifting | ![][5] | ![][6] | ![][7] | ![][8] |

<!--more-->

## 二 BottomNavigationBar详解

### 2.1 BottomNavigationBar介绍

* BottomNavigationBar是Scaffold脚手架中的位于底部的一个组件
* BottomNavigationBar位于body的下方，属于底部导航栏
* BottomNavigationBar包含多个BottomNavigationBarItem，BottomNavigationBarItem用于设置显示图标和文字
* 点击BottomNavigationBarItem，切换到BottomNavigationBarItem对应的页面

### 2.2 BottomNavigationBar和BottomNavigationBarItem

#### BottomNavigationBar

```
  BottomNavigationBar({
    Key? key,
    required this.items,
    this.onTap,
    this.type,
    this.currentIndex = 0,
    Color? fixedColor,
    this.backgroundColor,
    this.iconSize = 24.0,
    Color? selectedItemColor,
    this.unselectedItemColor,
    this.selectedFontSize = 14.0,
    this.unselectedFontSize = 12.0,
  })
```

| 编号 |        属性         |                 类型                 |                        说明                        |
| :--: | :-----------------: | :----------------------------------: | :------------------------------------------------: |
|  1   |        items        | List\<BottomNavigationBarItem> items |                 导航栏显示BarItem                  |
|  2   |        onTap        |         ValueChanged\<int>?          |                  BarItem点击事件                   |
|  3   |        type         |       BottomNavigationBarType?       |       导航栏类型，有fixed和shifting两个类型        |
|  4   |    currentIndex     |                 int                  |                 当前选中的BarItem                  |
|  5   |     fixedColor      |                Color?                | BarItem选中时颜色，和selectedItemColor不可同时存在 |
|  6   |   backgroundColor   |                Color?                |               整个底部导航栏的背景色               |
|  7   |      iconSize       |                double                |                     大小为24.0                     |
|  8   |  selectedItemColor  |                Color?                |    BarItem选中时颜色，和fixedColor不可同时存在     |
|  9   | unselectedItemColor |                Color?                |                BarItem未选中时颜色                 |
|  10  |  selectedFontSize   |                double                |               BarItem选中时文字大小                |
|  11  | unselectedFontSize  |                double                |              BarItem未选中时文字大小               |

#### BottomNavigationBarItem

```
const BottomNavigationBarItem({
    required this.icon,
    this.label,
    Widget? activeIcon,
    this.backgroundColor,
    this.tooltip,
  })
```

| 编号 |      属性       |  类型   |                       说明                        |
| :--: | :-------------: | :-----: | :-----------------------------------------------: |
|  1   |      icon       | Widget  |              BarItem图标，一般是Icon              |
|  2   |      label      | String? |    BarItem下方显示文字，用于渲染Text时的字符串    |
|  3   |   activeIcon    | Widget? | BarItem选中时显示图标，一般是Icon(颜色一样不一样) |
|  4   | backgroundColor | Color?  |   BottomNavigationBarType为shifting时的背景颜色   |

## 三 页面切换相关知识点

### 3.1 PageView

#### 什么是PageView

* PageView类似于Android中的Viewpager，可以做垂直或水平滑动
* 通过children，创建一个可滚动视图列表
* 构造PageView时，需要传入一个PageController(页面控制器)
* 页面切换时调用onPageChanged方法，切换页面显示

#### PageView构造方法

```
PageView({
    Key? key,
    this.scrollDirection = Axis.horizontal,
    this.reverse = false,
    PageController? controller,
    this.physics,
    this.pageSnapping = true,
    this.onPageChanged,
    List<Widget> children = const <Widget>[],
  })
```

| 编号 |      属性       |        类型         |                   说明                   |
| :--: | :-------------: | :-----------------: | :--------------------------------------: |
|  1   | scrollDirection |        Axis         | 滚动方向，有horizontal和vertical两个方向 |
|  2   |     reverse     |        bool         |               滚动方向反转               |
|  3   |   controller    |   PageController?   |                页面控制器                |
|  4   |     physics     |   ScrollPhysics?    |   滚动的方式，如：阻尼效果、水波纹效果   |
|  5   |  pageSnapping   |        bool         |      是否具有回弹效果，默认为 true       |
|  6   |  onPageChanged  | ValueChanged\<int>? |              页面切换时调用              |
|  7   |    children     |    List\<Widget>    |               子控件视图集               |

### 3.2 PageController-属性和方法说明

| 编号 |    属性(方法)    |  类型  |                     说明                      |
| :--: | :--------------: | :----: | :-------------------------------------------: |
|  1   |   initialPage    |  int   |       首次创建PageView时显示第几个页面        |
|  2   |     keepPage     |  bool  |               是否保存当前页面                |
|  3   | viewportFraction | double | 页面在PageView视图中占比，默认1.0，全部填充满 |
|  4   |    jumpToPage    |  Func  |            改变PageView中显示页面             |

## 四 示例项目

### 4.1 项目结构
![][9]

### 4.2 项目代码

#### main

```
void main()=>runApp(GetMaterialApp(
    getPages: [
      GetPage(name: '/', page: ()=>IndexWidget(),binding: IndexBinding())
    ]
));
```

#### IndexWidget

```
class IndexWidget extends StatelessWidget{
  IndexController controller=Get.find<IndexController>();
  @override
  Widget build(BuildContext context) {
   return Scaffold(
     appBar: AppBar(title: Text('BottomNavigationBar'),),
     bottomNavigationBar: _buildBottomNavigationBar(),
     body: _buildPageView(),
   );
  }

  Widget _buildBottomNavigationBar(){
    return Obx(()=>BottomNavigationBar(
        items: controller.bottomTabs,
        currentIndex: controller.currentPage,
        type: BottomNavigationBarType.fixed,
        // fixedColor: Colors.red,
        selectedFontSize: 16,
        unselectedFontSize: 13,
        onTap:  (int index) => controller.switchBottomTabBar(index),
       ));
  }
  /// 内容页
  Widget _buildPageView() {
    return PageView(
      //禁止滑动
      //physics: const NeverScrollableScrollPhysics(),
      children: controller.tabPageBodies,
      controller: controller.pageController,
      onPageChanged: (index) => controller.onPageChanged(index),
    );
  }
}
```

#### IndexBinding

```
class IndexBinding implements Bindings{
  @override
  void dependencies() {
    Get.lazyPut(() => IndexController());
  }
}
```

#### IndexController

```
class IndexController extends GetxController{
  /// 响应式成员变量，默认位置指引0
  final _currentPage = 0.obs;
  set currentPage(index) => _currentPage.value = index;
  get currentPage => _currentPage.value;


  /// PageView页面控制器
  late PageController pageController;
  //Page页面集合
  late List<Widget> tabPageBodies;
  /// 底部BottomNavigationBarItem
  late List<BottomNavigationBarItem> bottomTabs;


  switchBottomTabBar(int index) {
   //点击底部BottomNavigationBarItem切换PageView页面
    //pageController.animateToPage(index,duration: Duration(seconds: 1),curve: Curves.fastLinearToSlowEaseIn);
    pageController.jumpToPage(index);
  }

  onPageChanged(int index) {
    currentPage = index;
  }
  /// 在Widget内存中分配后立即调用，可以用它来初始化initialize一些东西
  @override
  void onInit() {
    super.onInit();
    pageController = PageController(initialPage: currentPage);
    bottomTabs=const <BottomNavigationBarItem>[
      BottomNavigationBarItem(backgroundColor: Colors.orange,icon: Icon(Icons.home_outlined,size: 20,),activeIcon:Icon(Icons.home,size: 25) ,label: 'home'),
      BottomNavigationBarItem(backgroundColor: Colors.green,icon: Icon(Icons.account_tree_outlined,size: 20,),activeIcon:Icon(Icons.account_tree,size: 25) ,label: 'Tree'),
      BottomNavigationBarItem(backgroundColor: Colors.red,icon: Icon(Icons.navigation_outlined,size: 20,),activeIcon:Icon(Icons.navigation,size: 25) ,label: 'Navigator'),
      BottomNavigationBarItem(backgroundColor: Colors.deepOrange,icon: Icon(Icons.person_outline,size: 20,),activeIcon:Icon(Icons.person,size: 25) ,label: 'Me'),
    ];

    tabPageBodies = <Widget>[
      HomeWidget(),
      TreeWidget(),
      NavigatorWidget(),
      MeWidget()
    ];
  }

}
```

#### HomeWidget

```
class HomeWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Home'));
  }

}
```

#### TreeWidget

```
class TreeWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
   return Center(child: Text('Tree'));
  }

}
```

#### NavigatorWidget

```
class NavigatorWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Navigator'));
  }

}
```

#### MeWidget

```
class MeWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Me'));
  }
}
```

## 五 参考

[CSDN-参考代码](https://download.csdn.net/download/Calvin_zhou/85303067)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-home-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-tree-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-navigator-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-me-view.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-shift-home-view.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-shift-tree-view.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-shift-navigator-view.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-shift-me-view.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bottombar-project-struct.png
