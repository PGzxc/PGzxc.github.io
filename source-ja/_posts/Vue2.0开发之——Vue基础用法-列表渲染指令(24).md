---
title: Vue2.0开发之——Vue基础用法-列表渲染指令(24)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 192fef05
date: 2022-11-20 11:20:50
---
## 一 概述

* 列表渲染指令v-for
* v-for 中的索引
* 使用 key 维护列表的状态
* key 的注意事项

<!--more-->

## 二 列表渲染指令v-for

### 2.1 概念

vue 提供了 v-for 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。v-for 指令需要使 用 item in items 形式的特殊语法，其中：

* items 是待循环的数组
* item 是被循环的每一项

### 2.2 示例

布局文件

```
<div id="app">
      <ul>
        <li v-for="item in list">姓名是：{{item.name}}</li>
      </ul>
</div>
```

数据代码

```
data:{
      list:[
        {id:1,name:'张三'},
        {id:2,name:'李四'},
        {id:3,name:'王五'}
      ]
    }
```

效果图

![][1]

## 三 v-for 中的索引
样式文件导入

```
<link rel="stylesheet" href="./lib/bootstrap.css">
```

布局代码

```
<div id="app">
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <th>索引</th>
            <th>ID</th>
            <th>姓名</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :title="item.name">
              <td>{{index}}</td>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
            </tr>
          </tbody>
        </table>
</div>
```

数据文件

```
data:{
      list:[
        {id:1,name:'张三'},
        {id:2,name:'李四'},
        {id:3,name:'王五'}
      ]
 }
```

效果图
![][2]

注意：v-for 指令中的 item 项和 index 索引都是形参，可以根据需要进行重命名。例如 (user, i) in userlist

## 四 使用 key 维护列表的状态

### 4.1 概念

* 当列表的数据变化时，默认情况下，vue 会尽可能的复用已存在的 DOM 元素，从而提升渲染的性能。但这种 默认的性能优化策略，会导致有状态的列表无法被正确更新。
*  为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，提升渲 染的性能。此时，需要为每项提供一个唯一的 key 属性

### 4.2 示例

添加key维护状态，尽量把id作为key的值，key要求为字符串或数字类型

```
<tr v-for="(item,index) in list" :key="item.id">
     <td>{{index}}</td>
     <td>{{item.id}}</td>
     <td>{{item.name}}</td>
</tr>
```

key为对象类型会出错
![][3]

## 五 key 的注意事项

### 5.1 注意事项

1. key 的值只能是<font color=red>字符串</font>或<font color=red>数字</font>类型
2. key 的值<font color=red>必须具有唯一性</font>（即：key 的值不能重复）
3. 建议把<font color=red>数据项 id 属性的值</font>作为 key 的值（因为 id 属性的值具有唯一性）
4. 使用 <font color=red>index 的值</font>当作 key 的值<font color=red>没有任何意义</font>（因为 index 的值不具有唯一性）
5. 建议使用 v-for 指令时<font color=red>一定要指定 key 的值</font>（既提升性能、又防止列表状态紊乱）

### 5.2 使用index作为key时问题

布局代码

```
<div id="app">
      <!--添加用户的区域-->
      <div>
          <input type="text" v-model="name">
          <button @click="addNewUser">添加</button>
      </div>
      <!--用户列表区域-->
      <ul>
          <li v-for="(user,index) in userlist" :key="index">
            <input type="checkbox"/>
             姓名：{{user.name}}
          </li>
       </ul>
</div>
```

vue代码

```
const vm = new Vue({
    el:'#app',
    data:{
      userlist:[
        {id:1,name:'张三'},
        {id:2,name:'李四'},
        {id:3,name:'王五'}
      ],
        // 输入的用户名
        name: '',
        // 下一个可用的 id 值
        nextId: 3
    },
    methods:{
      addNewUser(){
        this.userlist.unshift({ id: this.nextId, name: this.name })
          this.name = ''
          this.nextId++
      }
    }
   })
```

效果图(选中李四，添加后导致选中了张三)
![][4]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-24-v-for-sample-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-24-v-for-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-24-v-for-key-error.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-24-v-for-index-error.gif