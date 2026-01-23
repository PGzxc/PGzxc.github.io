---
title: Vue2.0开发之——Vue基础用法-事件绑定-按键修饰符(21)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: b6f02d1a
date: 2022-11-17 09:44:24
---
## 一 概述

* 什么是@keyup
* @keyup.esc示例
* @keyup.enter示例

<!--more-->

## 二 什么是@keyup

@keyup(键盘事件)是按键松开，当指定的按键松开会触发的事件

|   事件代码    |   事件描述   |
| :-----------: | :----------: |
| @keyup.enter  | 回车按键松开 |
|  @keyup.left  | 左键按键松开 |
| @keyup.right  | 右键按键松开 |
|   @keyup.up   | 上键按键松开 |
|  @keyup.down  | 下键按键松开 |
| @keyup.delete |  删除键松开  |
|  @keyup.esc   |  esc键松开   |

## 三 @keyup.esc示例-输入框按ESC时清空输入框

### 3.1 布局代码

```
<div id="app">
     <input type="text" @keyup.esc="clearInput">
</div>
```

### 3.2 vue代码

```
clearInput(e){
        e.target.value=''
        console.log("clearInput")
},
```

### 3.3 效果图

![][1]

## 四 @keyup.enter示例-输入框按enter键提交内容

### 4.1 布局代码

```
<div id="app">
     <input type="text" @keyup.enter="submit">
 </div>
```

### 4.2 vue代码

```
submit(){
      console.log('submit')
}
```

### 4.3 效果图
![][2]

## 五 参考

[Vue中文网-按键修饰符][00]



[00]:https://v2.cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-21-event-keyup-esc.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-21-event-keyup-enter.gif