---
title: HarmonyOS第一课——从简单的页面开始(4)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 58757b1e
date: 2023-11-25 21:53:29
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-在Column容器中的子组件默认是按照从上到下的垂直方向布局的，其主轴的方向是垂直方向，在Row容器中的组件默认是按照从左到右的水平方向布局的，其主轴的方向是水平方向 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

2-List容器可以沿水平排列，也可以沿垂直方向排列 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

3-当Tabs组件的参数barPosition为BarPosition.End时，页签位于页面底部<font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

注解：除了底部导航，还有侧边栏。需要两个属性：(barPosition、vertical)

```
Tabs({ barPosition: BarPosition.Start }) {
  // TabContent的内容:首页、发现、推荐、我的
  ...
}
.vertical(true)
.barWidth(100)
.barHeight(200)
```

4-Resource是资源引用类型，用于设置组件属性的值，可以定义组件的颜色、文本大小、组件大小等属性 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

### 2.2 单选题

1-使用TextInput完成一个密码输入框，推荐设置type属性为下面的哪个值？ <font color=red>(B)</font>

```
A-InputType.Normal
B-InputType.Password
C-InputType.Email
D-InputType.Number
```

2-使用Image加载网络图片，需要以下那种权限？ <font color=red>(B)</font>

```
A-ohos.permision.USE_BLUETOOTH
B-ohos.permision.INTERNET
C-ohos.permision.REQUIRE_FORM
D-ohos.permision.LOCATION
```

3-下面哪个组件层次结构是错误的？ <font color=red>(C)</font>

```
A-List>ListItem>Column
B-Column>List>ListItem
C-Grid>Row>GridItem
D-Grid>GridItem
```

注解：Grid和GridItem之间没有其他组件，比如Row、Column

### 2.3 多选题

1-Row容器的主轴是水平方向，交叉轴是垂直方向，其参数类型为VerticalAlign(垂直对齐)，VerticalAlign(定义了以下几种类型)？<font color=red>(ABE)</font>

```
A-Top
B-Bottom
C-Start
D-End
E-Center
```

2-下面哪些组件是容器组件？<font color=red>(BC)</font>

```
A-Button
B-Row
C-Column
D-Image
E-TextInput
```

3-关于Tabs组件页签的位置设置，下面其描述正确的是？<font color=red>(ABCD)</font>

```
A-当barPosition为Start(默认值),Vertical属性为false时(默认值),页签位于容器顶部
B-当barPosition为Start(默认值)，Vertical属性为true时，页签位于容器左侧
C-当barPosition为End，Vertical属性为false(默认值)时，页签位于容器底部
D-当barPosition为End，vertical属性为true时，页签位于容器右侧
```

## 三 随堂测试截图

1-判断题

![][1]

2-单选题

![][2]

3-多选题

![][3]

4-随堂测试-结果

![][4]

## 四 随堂测试证书

![][5]

## 五 思维导图

![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson4-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson4-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson4-multiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson4-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson4-certify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson4-xmind.png