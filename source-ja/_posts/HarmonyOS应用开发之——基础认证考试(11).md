---
title: HarmonyOS应用开发之——基础认证考试(11)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - 基础认证
abbrlink: 5ff6ebd2
date: 2023-11-26 11:45:12
---
## 一 概述

* 测试题
* 测试结果
* 证书

<!--more-->

## 二 测试题

### 2.1 判断题

1-Ability是系统调度应用的最小单元，是能够完成一个独立功能的组件。一个应用可以包含一个或多个Ability。<font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

2-Tabs组件仅可包含子组件TabsContent，每一个页签对应一个内容视图即TabContet组件。<font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

3-使用http模块发起网络请求时，必须要使用on(‘headersReceive’）订阅请求头，请求才会成功。<font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

4-Web组件对于所有的网页都可以使用zoom(factor: number)方法进行缩放。<font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

5-首选项preferences是以Key-Value形式存储数据，其中Key是可以重复 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

6-每一个自定义组件都有自己的生命周期。 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

7-在Column和Row容器组件中，justifyContent用于设置子组件在主轴方向上的对齐格式，alignItems用于设置子组件在交叉轴方向上的对齐格式 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

8-@CustomDialog装饰器用于装饰自定义弹窗组件，使得弹窗可以动态设置内容及样式 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

9-所有使用@Component修饰的自定义组件都支持onPageShow，onBackPress和onPageHide生命周期函数 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

10-Video组件可以支持本地视频路径和网络路径播放。播放网络视频时，需要申请权限ohos.permission.INTERNET <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

11-每调用一次router.pushUrl()方法，默认情况下，页面栈数量会加1，页面栈支持的最大页面数量为32  <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

### 2.2 单选题

12-使用Image组件加载网络图片需要如下哪种权限？ <font color=red>(B)</font>

```
A. ohos.permission.READ_MEDIA
B. ohos.permission.INTERNET
C. ohos.permission.GET_NETWORK_INFO
D. ohos.permission.DISTRIBUTED_DATASYNC
```

13-下面哪个方法，可以跳转到一个新页面，并销毁当前页面  <font color=red>(B)</font>

```
A. router.pushUrl()
B. router.replaceUrl()
C. router.back()
D. router.clear()
```

14-用哪一种装饰器修饰的组件可作为页面入口组件？<font color=red>(B)</font>

```
A. @Component
B. @Entry
C. @Preview
D. @Builder
```

15-下列哪种组合方式不能实现子组件从父子组件之间双向数据同步 <font color=red>(D)</font>

```
A. @State和@Link
B. @Provide和@Consume
C. @Observed和@ObjectLink
D. @State和@Prop
```

16-关于容器组件Row和Column，下面说法错误的是  <font color=red>(D)</font>

```
A. Column容器的主轴是垂直方向，交叉轴是水平方向；Row容器的主轴是水平方向，交叉轴是垂直方向。
B. 主轴和交叉轴始终是相互垂直的，Row和Column主轴的方向不一样。
C. Column的子组件在主轴方向上的对齐使用justifyContent属性来设置，其参数类型是FlexAlign。
D. Row的子组件在交叉轴方向上的对齐方式使用alignItems属性来设置，其参数类型为HorizontalAlign。
```

17-首选项preferences值的存储支持哪些数据类型？ <font color=red>(D)</font>

```
A. 数字型
B. 字符型
C. 布尔型
D. 数字型、字符型、布尔型以及这3种类型的数组类型
```

18-下面哪个组件不能包含子组件  <font color=red>(D)</font>

```
A. Row
B. Button
C. Text
D. LoadingProgress
```

19-关于@State状态数据特征，下列描述错误的是  <font color=red>(C)</font>

```
A. @State装饰的变量是组件内部的状态数据，当这些状态数据被修改时，将会调用所在组件的build方法进行UI刷新。
B. 标记为@State的属性是私有变量，只能在组件内访问。
C. @State变量可以不用给定初始值。
D. 子组件@Link装饰的变量可以和父组件的@State变量建立双向数据绑定。
```

20-关于Resource是资源引用类型描述错误的是   <font color=red>(C)</font>

```
A. Resource是资源引用类型，用于设置组件属性的值。
B. 通过"$r(‘app.type.name’)"的形式引用应用资源，app代表是应用内resources目录中定义的资源，type代表资源类型（或资源的存放位置）。
C. Resource支持所有的数据类型。
D. 系统可以根据当前配置加载合适的Resource资源，例如，开发者可以根据屏幕尺寸呈现不同的布局效果，或根据语言设置提供不同的字符串。
```

21-页面路由需要导入以下哪个模块？ <font color=red>(B)</font>

```
A. import prompt from ‘@ohos.prompt’
B. import router from ‘@ohos.router’
C. import Notification from ‘@ohos.notification’
D. import window from ‘@ohos.window’
```

22-Row组件中有两个Text组件，如果使用justifyContent对齐方式，下面哪个属性可以实现左右两端对齐  <font color=red>(D)</font>

```
A. FlexAlign.Start
B. FlexAlign.SpaceEvenly
D. FlexAlign.SpaceBetween
```

23-关于Web组件，下面描述错误的是  <font color=red>(D)</font>

```
A. WebController控制器可以控制Web组件各种行为，比如forward、backward、runJavaScript等。
B. Web组件支持fileAccess、javaScriptAccess等多种属性的设置，例如 .javaScriptAccess(true)表示允许执行JavaScript脚本。
C. Web组件支持onConfirm、onConsole等多种事件，例如网页调用confirm()告警时触发onConfirm回调。
D. 使用Web组件访问在线和离线网页都需要添加ohos.permission.INTERNET权限
```

24-下面哪一个事件方法可以获取到List滑动的偏移量  <font color=red>(A)</font>

```
A. onScroll
B. onScrollIndex
C. onReachStart
D. onReachEnd
```

25-关于UIAbility的启动模式，下列说法错误的是  <font color=red>(C)</font>

```
A. UIAbility支持单实例、标准模式和指定实例3种启动模式，在module.json中通过launchType配置。
B. singleton为单实例模式，系统中只存在唯一一个实例，startAbility时，如果已存在，则复用系统中的唯一一个实例。
C. standard为标准模式，每次startAbility都会启动一个新的实例，系统默认为standard模式。
D. specified为指定实例模式，运行时由Ability内部业务决定是否创建多实例。
```

注解：默认情况下的启动模式为singleton启动模式，单实例模式

26-首选项key的最大长度限制大小为（）字节？ <font color=red>(C)</font>

```
A. 60
B. 70
C. 80
D. 90
```

27-发起网络数据请求需要导入以下哪个模块？ <font color=red>(A)</font>

```
A. import http from ‘@ohos.net.http’
B. import http from ‘@ohos.net.https’
C. import request from ‘@ohos.request’
D. import request from ‘@ohos.net.request’
```

28-关于Video组件的回调事件，下列说法错误的是  <font color=red>(A)</font>

```
A. onStart视频播放时触发该事件，可以在这里获取视频时长。
B. onFinish视频播放结束时触发该事件。
C. onPrepared视频准备完成时触发该事件。
D. onUpdate播放进度变化时触发该事件，单位为s，更新时间间隔为250ms
```

29-关于Tabs组件页签的位置设置，下面描述错误的是 <font color=red>(D)</font>

```
A. 当barPosition为Start（默认值），vertical属性为false时（默认值），页签位于容器顶部。
B. 当barPosition为Start（默认值） ，vertical属性为true时，页签位于容器左侧
C. 当barPosition为End ，vertical属性为false（默认值）时，页签位于容器底部。
D. 当barPosition为End ，vertical属性为true时，页签位于容器底部。
```

30-例如现在要实现一个广告弹窗，包含图片和文本等信息，使用下面那种弹窗可以实现 <font color=red>(B)</font>

```
A. AlertDialog
B. @CustomDialog
C. TextPickerDialog
D. TimePickerDialog
```

31-关于Button组件，下面哪个样式是胶囊型按钮 <font color=red>(A)</font>

```
A. ButtonType.Capsule
B. ButtonType.Normal
C. ButtonType.Circle
D. 以上都不是
```

32-在下面哪个文件中可以设置页面的路径配置信息？ <font color=red>(A)</font>

```
A. main_pages.json
B. module.json5
C. app.json5
D. package.json
```

### 2.3 多选题

33-下面哪些容器组件是可以滚动的  <font color=red>(ABD)</font>

```
A. Scroll
B. List
C. Row
D. Grid
E. Column
```

注解：

```
1-HarmonyOS中基本组件Row、Column、Flex、Stack等组件中不会出现滚动条，无论是内容超出父元素的高(height)/宽(width)
2-滚动组件
List（列表组件）：需要配合ListItem去使用
Gird（网格布局）：需要配合GirdItem、GirdRow、GridColumn去使用
Scroll（滚动条）：需要配合ScrollItem去使用
Swiper（轮播图）：需要配合Row/Column等组件去使用
WaterFolw（瀑布流）：需要配合FlowItem去使用
```

34-针对包含文本元素的组件，例如Text、Button、TextInput等，可以使用下列哪些属性 <font color=red>(ABCDE)</font>

```
A. fontColor
B. fontSize
C. fontStyle
D. fontWeight
E. fontFamily
```

35-以下关于ArkTS声明式开发范式的基本组成说明正确的是<font color=red>(ABCDEF)</font>

```
A. 装饰器：用来装饰类、结构体、方法以及变量，赋予其特殊的含义，例如@Entry表示这是个入口组件。
B. 自定义组件：可复用的 UI 单元，可组合其它组件。
C. UI描述：声明式的方法来描述UI的结构，例如build()方法中的代码块。
D. 内置组件：ArkTS中默认内置的基本组件和布局组件，开发者可以直接调用，如Column、Text、Divider、Button等。
E. 属性方法：用于组件属性的配置，统一通过属性方法进行设置，如fontSize()、width()、height()、color() 等。
F. 事件方法：用于添加组件对事件的响应逻辑，统一通过事件方法进行设置，如跟随在Button后面的onClick()。
```

36-下面哪些组件层次结构是正确的 <font color=red>(ABE)</font>

```
A. Text>Span
B. Button>Column>Image
C. Button>Image>Text
D. Image>Text>Span
E. Column>Row>Button
```

37-entry下的module.json5中包含以下哪些信息 <font color=red>(BCD)</font>

```
A. 应用包名和版本号信息
B. Ability的配置信息
C. 设备类型信息
D. 应用权限申请列表
```

38-关于Tabs组件和TabContent组件，下列描述正确的是  <font color=red>(ABCD)</font>

```
A. TabContent组件不支持设置通用宽度属性，其宽度等于Tabs组件的barWidth属性。
B. TabContent组件不支持设置通用高度属性，其高度由父组件Tabs高度与TabBar组件高度决定。
C. TabsController用于控制Tabs组件进行页签切换，不支持一个TabsController控制多个Tabs组件。
D. TabContent组件的tabBar属性支持使用@Builder构造器生成的组件
```

39-下面哪些是Ability的生命周期回调函数？ <font color=red>(ABEF)</font>

```
A. onCreate
B. onDestroy
C. onPageShow
D. onPageHide
E. onForeground
F. onBackground
```

40-关于ForEach(arr, itemGenerator, index)组件的描述正确的是  <font color=red>(BCD)</font>

```
A. ForEach中可以循环遍历逻辑代码，例如console.info(‘hello’)
B. 第一个参数必须是数组，提供循环渲染的数据源。
C. 第二个参数生成子组件的lambda函数，为数据源中的每个数组项生成子组件。
D. 第三个参数为匿名函数，用于给定数组项生成唯一且稳定的键值。
```

## 三 测试结果

![][1]

## 四 基础证书

![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-basic-test-result.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-basic-test-centify.png