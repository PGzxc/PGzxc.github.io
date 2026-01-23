---
title: HarmonyOS应用开发之——开发者高级认证(12)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - 高级认证
abbrlink: 465668d7
date: 2023-11-26 13:08:01
---
## 一 概述

* 测试题
* 证书
* 参考

<!--more-->

## 二测试题

### 2.1 判断题

1-ArkUI 是声明式开发范式 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

2-Harmonyos应用可以兼容OpenHarmony生态 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

3-worker线程不支持UI操作 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

4-基于端云一体化开发，开发者需要精通前端、后端不同的开发语言 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

5-每调用一次routerpushur1()方法，默认情况下，页面栈数量会加1，页面栈支持的最大页面数量为32 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

6-每一个自定义组件都有自己的生命周期 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

7-使用端云一体化开发，无需自己搭建服务器，并进行运维  <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

8-首选项preferences是以Key-Value形式存储数据，其中Key是可以重复 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

9-首选项是非关系数据库，遵循ACID特性  <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

10-所有使用@Component修饰的自定义组件都支持onPageShow，onBackPress和onPageHide生命周期函数 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

11-云函数打包完成后，需要到AppGallery Connect创建对应函数的触发器才可以在端侧中调用 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

12-在column和Row容器组件中，aligntems用于设置子组件在主轴方向上的对齐格式，justifycontent用于设置子组件在交叉轴方向上的对齐格式 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

13-只要使用端云一-体化的云端资源就需要支付费用 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

### 2.2 单选题

1-@State修饰的状态数据被修改时会触发组件的什么方法进行UI界面更新 <font color=red>(A)</font>

```
A. build方法
B. aboutToAppear方法
C. onPageShow方法
```

2-HarmonyOS提供的Webview能力是否支持与H5双向通信  <font color=red>(A)</font>

```
A. 不支持
B. 支持
```

3-HUKS中文全称是什么   <font color=red>(B)</font>

```
A. 加解密系统
B. 通用密钥库系统
C. 访问控制系统
D. 密码管理系统
```

4-Row组件中有两个Text组件，如果使用justifyContent对齐方式，下面哪个属性可以实现左右两端对齐 <font color=red>(A)</font>

```
A. FlexAlign.SpaceBetween
B. FlexAlign.End
C. FlexAlign.SpaceEvenly
D. FlexAlign.Start
```

5-Webview在HarmonyOS中的入口是通过什么组件体现的 <font color=red>(D)</font>

```
A. RichText
B. Socket
C. HTTP
D. Web组件
```

6-Worker线程最大同时激活数 <font color=red>(C)</font>

```
A. 6
B. 9
C. 8
D. 7
```

7-创建应用时，应用包名需要和app.json5文件中哪个字段保持一致？ <font color=red>(C)</font>

```
A. name
B. package
C. bundleName
```

8-端云一体化当前支持最低的鸿蒙API版本是 <font color=red>(D)</font>

```
A. 6
B. 8
C. 7
D. 9
```

9-发布后的鸿蒙应用可以在哪里获取？ <font color=red>(C)</font>

```
A. 华为服务中心
B. 华为生态市场
C. 华为应用市场
```

10-发布开放式测试版本，测试时间有限制吗？ <font color=red>(A)</font>

```
A. 有
B. 没有
```

11-发布开放式测试版本后，还可以再更新版本吗？ <font color=red>(B)</font>

```
A. 不可以
B. 可以
```

12-发布开放式测试版本后，怎么追加测试用户？ <font color=red>(B)</font>

```
A. 直接在当前版本追加新的测试用户，然后手动发送邀请
B. 需要重新发布新的测试版本追加用户
```

13-发布应用时需要创建Profile时，类型选择什么类型？ <font color=red>(B)</font>

```
A. 调试
B. 发布
```

14-发布应用时要创建证书，证书类型选择什么类型？ <font color=red>(B)</font>

```
A. 调试证书
B. 发布证书
```

15-关于Tabs组件页签的位置设置，下面描述错误的是 <font color=red>(C)</font>

```
A. 当barPosition为Start（默认值），vertical属性为false时（默认值），页签位于容器顶部。
B. 当barPosition为End ，vertical属性为false（默认值）时，页签位于容器底部。
C. 当barPosition为End ，vertical属性为true时，页签位于容器底部。
D. 当barPosition为Start（默认值） ，vertical属性为true时，页签位于容器左侧
```

16-关于UIAbility的启动模式，下列说法错误的是  <font color=red>(B)</font>

```
A. UIAbility支持单实例、多实例模式和指定实例3种启动模式，在module.json中通过launchType配置。
B. muliton为多实例模式，每次startAbility都会启动一个新的实例，系统默认为muliton为模式。
C. singleton为单实例模式，系统中只存在唯一一个实例，startAbility时，如果已存在，则复用系统中的唯一一个实例。
D. specified为指定实例模式，运行时由Ability内部业务决定是否创建多实例。
```

17-关于Video组件的回调事件，下列说法错误的是 <font color=red>(D)</font>

```
A. onPrepared视频准备完成时触发该事件。
B. onFinish视频播放结束时触发该事件。
C. onUpdate播放进度变化时触发该事件，单位为s，更新时间间隔为250ms。
D. onStart视频播放时触发该事件，可以在这里获取视频时长。
```

18-关于容器组件Row和Column，下面说法错误的是 <font color=red>(D)</font>

```
A. Column的子组件在主轴方向上的对齐使用justifyContent属性来设置，其参数类型是FlexAlign。
B. 主轴和交叉轴始终是相互垂直的，Row和Column主轴的方向不一样。
C. Column容器的主轴是垂直方向，交叉轴是水平方向；Row容器的主轴是水平方向，交叉轴是垂直方向。
D. Row的子组件在交叉轴方向上的对齐方式使用alignItems属性来设置，其参数类型为HorizontalAlign
```

19-开发者在DevEco Studio中，可以通过什么方式使用端云一体化？ <font color=red>(C)</font>

```
A. 可视化工具
B. 命令行工具
C. 工程模板
D. IDE插件
```

20-元服务创建测试用户时，用户列表存储位置需要选择 <font color=red>(B)</font>

```
A. 所有站点
B. 中国
C. 俄罗斯
D. 德国
E. 新加坡
```

21-认证服务支持下列哪种帐号认证 <font color=red>(C)</font>

```
A. 支付宝
B. 微信
C. 华为帐号
D. QQ
```

22-上传鸿蒙应用或元服务软件包时，软件包的格式是什么？<font color=red>(A)</font>

```
A. .app
B. .hap
C. .zip
D. .apk
```

23-添加用户信息时，如果帐号使用手机号码，以下哪种输入格式正确？<font color=red>(B)</font>

```
A. 189****1234
B. 86-189****1234
C. +86189****1234
D. 0086-189****1234
```

24-下面哪个方法，可以跳转到一个新页面，并销毁当前页面 <font color=red>(A)</font>

```
A. router.replaceUrl()
B. router.pushUrl()
C. router.clear()
D. router.back()
```

25-下面哪个组件不能包含子组件 <font color=red>(A)</font>

```
A. LoadingProgress
B. Row
C. Text
D. Button
```

26-一个完整的软件包是否需要有一个Profile文件？ <font color=red>(B)</font>

```
A. 不需要
B. 需要
```

27-应用包名不能包含一些保留字段，以下哪个字段符合规范? <font color=red>(C)</font>

```
A. .harmony.
B. .system.
C. .test.
D. .ohos.
```

28-元服务包每个HAP包不得超过（），以提供秒开体验 <font color=red>(B)</font>

```
A. 2GB
B. 2MB
C. 无限制
```

29-在下面哪个文件中可以设置页面的路径配置信息？ <font color=red>(A)</font>

```
A. main_pages.json
B. module.json5
C. app.json5
D. package.json
```

30-自定义组件的aboutToAppear()在什么时机执行 <font color=red>(C)</font>

```
A. build函数之后
B. 页面进入之时
C. build函数之前
```

31-引用ohpm三方库的包依赖是在哪个配置文件中 <font color=red>(C)</font>

```
A. packagejson5
B. modulejson5
C. oh-package.json5
D. main pagesjson
```

32-模块提供了全双工通信协议  <font color=red>(B)</font>

```
A. HTTP
B. WebSocket
C. Socket
D. Request
```

33-开放式测试版本发布后，受邀测试用户如何体验?  <font color=red>(B)</font>

```
A.不接受邀请，直接进入应用市场搜索待体验的元服务名称
B.点击邀请链接接受邀请，自动跳转到应用市场或者进入应用市场搜索待体验的元服务名称
```

### 2.3 多选题

1-entry下的module.json5中包含以下哪些信息 <font color=red>(BCD)</font>

```
A. 应用包名和版本号信息
B. Ability的配置信息
C. 设备类型信息
D. 应用权限申请列表
```

注解：

```
应用包名和版本信息在AppScope/app.json5内
```

2-UIAbility的启动模式有哪些 <font color=red>(ABC)</font>

```
A. singleton
B. specified
C. multition
D. Builder
```

3-UIAbility的生命周期包括哪些函数? <font color=red>(ABEF)</font>

```
A. onCreate
B. onDestroy
C. onPageShow
D. onPageHide
E. onForeground
F.onBackground
```

4-端云一体化已经集成以下哪些服务SDK <font color=red>(ABC)</font>

```
A.云函数
B.云数据库
C.云存储
D.云托管
```

5-端云一体化中的云函数支持哪些操作 <font color=red>(ABCD)</font>

```
A.编写函数
B.测试函数
C.打包函数
D.部署函数
```

6-公共事件服务为应用程序提供哪些能力<font color=red>(BCD)</font>

```
A.取消发布公共事件
B.订阅公共事件
C.发布公共事件
D.取消订阅公共事件
```

7-鸿蒙特征包含哪些场景化能力<font color=red>(ABC)</font>

```
A.一次开发、多端部署
B.可分可合、自由流转
C.统一生态、原生智能
D.高频操作、提升效率
```

8-鸿蒙应用/元服务上架过程上传软件包常见的问题有哪些<font color=red>(ABCD)</font>

```
A.软件包中的发布Profile文件和当前上传软件包的应用不匹配
B.软件包中的发布证书与发布Profile文件中的发布证书不匹配
C.软件包未签名导制提示非法软件包
D.软件包中使用证书已经失效过者过期
```

10-下面哪些容器组件是可以滚动的 <font color=red>(ABD)</font>

```
A. Scroll
B. List
C. Row
D. Grid
E. Column
```

11-下面哪些组件层次结构是正确的<font color=red>(ABE)</font>

```
A. Text>Span
B. Button>Column>lmage
C. Button>lmage> Text
D. Image>Text> Span
E. Column>Row>Button
```

12-一次开发多端部署的三个层次有哪些<font color=red>(ABC)</font>

```
A. 界面级一多
B. 功能级一多
C. 工程级一多
D. 系统级一多
```

13-以下关于ArkTS声明式开发范式的基本组成说明正确的是<font color=red>(ABCDEF)</font>

```
A.装饰器:用来装饰类.结构体、方法以及变量，赋予其特殊的含义，例如@Entry表示这是个入口组件。
B.自定义组件:可复用的UI单元，可组合其它组件。
C.UI描述:声明式的方法来描述U的结构,例如build0方法中的代码块。
D.内置组件: ArkTS中默认内置的基本组件和布局组件,开发者可以直接调用，如Column. Text, Divider. Button等。
E.属性方法:用于组件属性的配置,统- -通过属性方法进行设置,如fontSize0. width0. height)、 color( 等。
F.事件方法:用于添加组件对事件的响应逻辑，统-通过事件方法进行设置，如跟随在Button后面的onClick)。
```

14-自定义组件的组件化特点有哪些<font color=red>(ABCD)</font>

```
A.可组合
B.可重用
C.配置化生命周期
D.数据驱动更新
```

## 三 证书

![][1]

## 四 参考

* [如何考取HarmonyOS应用开发者基础认证和高级认证](https://blog.csdn.net/qq_70814008/article/details/136773696)
* [刚拿到的《HarmonyOS应用开发者高级认证》，全网整理的题目](https://blog.csdn.net/jifashihan/article/details/136297913)
* [HarmonyOS云开发基础认证考试满分答案(100分)](https://download.csdn.net/blog/column/12051302/135049637)
* [HarmonyOS应用开发者高级认证](https://www.cnblogs.com/Megasu/p/17884698.html)
* [HarmonyOS应用开发者高级认证学习认证知识答疑笔记（五）](HarmonyOS应用开发者高级认证学习认证知识答疑笔记（五）)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-hight-test-centify.png