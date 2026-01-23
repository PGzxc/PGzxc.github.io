---
title: Vue2.0开发之——Vue基础用法-事件绑定$event(20)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 908b66ed
date: 2022-11-16 08:47:54
---
## 一 概述

* 事件参数对象
* $event表示事件参数对象event
* 事件修饰符

<!--more-->

## 二 事件参数对象

### 2.1 说明

在原生的 DOM 事件绑定中，可以在事件处理函数的形参处，接收事件参数对象 event

### 2.2 示例

布局代码

```
<button v-on:click="addCount">+1</button>
```

vue代码(默认参数event，打印此event)

```
addCount(e){
       console.log(e)
}
```

打印结果(PointerEvent)

![][1]

## 三 $event表示事件参数对象event

### 3.1 没有事件参数时

布局代码

```
<button v-on:click="addCount">+1</button>
```

vue代码

```
addCount(e){
          this.count+=1;
          if(this.count%2==0){ //偶数
            e.target.style.backgroundColor='red'
          }else{
            e.target.style.backgroundColor=''
          }
        }
```

### 3.2 $event表示事件参数对象

布局代码

```
<button v-on:click="addCount(1,$event)">+1</button>
```

vue代码

```
addCount(n,e){
          this.count+=n;
          if(this.count%2==0){ //偶数
            e.target.style.backgroundColor='red'
          }else{
            e.target.style.backgroundColor=''
          }
        }
```

### 3.3 效果图

![][2]



## 四 事件修饰符

### 4.1 事件修饰符

在事件处理函数中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。因此， vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。常用的 5 个事件修饰符如下：

| 事件修饰符 |                           说明                            |
| :--------: | :-------------------------------------------------------: |
|  .prevent  | 阻止默认行为（例如：阻止 a 连接的跳转、阻止表单的提交等） |
|   .stop    |                       阻止事件冒泡                        |
|  .capture  |             以捕获模式触发当前的事件处理函数              |
|   .once    |                    绑定的事件只触发1次                    |
|   .self    |   只有在 event.target 是当前元素自身时触发事件处理函数    |

### 4.2 .prevent示例

#### 未使用vue标签

布局代码

```
<a href="http://www.baidu.com" @click="show">跳转到百度首页</a>
```

vue代码(使用了`preventDefault`)

```
show(e){
        e.preventDefault()
        console.log('点击了a标签')
}
```

#### 使用vue标签.prevent

布局代码

```
<a href="http://www.baidu.com" @click.prevent="show">跳转到百度首页</a>
```

vue代码

```
show(e){
        console.log('点击了a标签')
}
```

#### 效果图
![][3]

### 4.3 .stop示例(阻止冒泡)

#### 未使用vue标签

布局代码

```
<div @click="divHandle" style="height:150px;background-color:orange;padding-left:100px;line-height: 150px;">
      <button @click="btnHandle">按钮</button>
</div>
```

vue代码

```
btnHandle(e){
        e.stopPropagation()
        console.log('btnHandle')
},
divHandle(){
        console.log('divHandle')
}
```

#### 使用vue标签.stop

布局代码

```
 <div @click="divHandle" style="height:150px;background-color:orange;padding-left:100px;line-height: 150px;">
      <button @click.stop="btnHandle">按钮</button>
</div>
```

vue代码

```
btnHandle(){
        console.log('btnHandle')
      },
divHandle(){
        console.log('divHandle')
      }
```

#### 效果图
![][4]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-20-event-param-print.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-20-event-effect.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-20-event-prevent.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-20-event-stop.gif

