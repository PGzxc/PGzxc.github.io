---
title: Vue2.0开发之——Vue基础用法-过滤器(26)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 1772d9ba
date: 2022-11-23 08:21:20
---
## 一 概述

* 过滤器的基本用法
* 使用Vue.filter定义全局过滤器
* 使用全局过滤器格式化时间
* 过滤器的其他用法
* 过滤器的兼容性

<!--more-->

## 二 过滤器的基本用法

### 2.1 过滤器概念

* <font color=red>过滤器（Filters）</font>是 vue 为开发者提供的功能，常用于<font color=red>文本的格式化</font>。
* 过滤器可以用在两个地方：<font color=red>插值表达式</font> 和<font color=red> v-bind 属性绑定</font>。
*  过滤器应该被添加在 JavaScript 表达式的<font color=red>尾部</font>，由“<font color=red>管道符</font>”进行调用

### 2.2 示例

布局文件

```
<div id="app">
    <p>message 的值是：{{ message | capi }}</p>
 </div>
```

数据文件

```
data: {
        message: 'hello vue.js'
      }
```

过滤器文件(与data平级)

```
 filters: {
        capi(val) {
          const first = val.charAt(0).toUpperCase()
          const other = val.slice(1)
          return first + other
        }
      }
```

效果图

![][1]

## 三 使用Vue.filter定义全局过滤器

### 3.1 私有过滤器和全局过滤器

* 在 filters 节点下定义的过滤器，称为“<font color=red>私有过滤器</font>”，因为它<font color=red>只能在当前 vm 实例所控制的 el 区域内使用</font>。
*  如果希望在<font color=red>多个 vue 实例之间共享过滤器</font>，则可以按照如下的格式定义<font color=red>全局过滤器</font>

### 3.2 全局过滤器示例

布局文件

```
<div id="app">
    <p>message 的值是：{{ message | capi }}</p>
</div>

<div id="app2">
    <p>message 的值是：{{ message | capi }}</p>
</div>
```

vue代码—统一修改(全局过滤器)

```
<script>
    // 使用 Vue.filter() 定义全局过滤器
    Vue.filter('capi', function (str) {
      const first = str.charAt(0).toUpperCase()
      const other = str.slice(1)
      return first + other + '~~~'
    })
</script>    
```

vue代码—两个app

```
const vm = new Vue({
      el: '#app',
      data: {
        message: 'hello vue.js'
      },
      filters: {
        capi(val) {
          const first = val.charAt(0).toUpperCase()
          const other = val.slice(1)
          return first + other
        }
      }
    })

// ----------------------------------

const vm2 = new Vue({
      el: '#app2',
      data: {
        message: 'js'
      }
    })
```

效果图

![][2]

## 四 使用全局过滤器格式化时间

```
Vue.filter('dateFormat', function (time) {
      const dtStr = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      return dtStr
 })
```

说明：使用了dayjs

## 五 过滤器的其他用法

### 5.1 过滤器串联

过滤器可以<font color=red>串联地</font>进行调用，例如

```
{{message|filterA|filterB}}
```

说明：

* 把message的值交给filterA进行处理
* 把filterA处理的结果，再交给filterB进行处理
* 最终把filterB处理的结果，作为最终的值渲染到页面上

示例代码

布局文件代码

```
<div id="app">
    <p>{{ text | capitalize | maxLength }}</p>
</div>
```

全局过滤器代码

```
//全局过滤器-首字母大写
Vue.filter('capitalize',(str)=>{
        return str.charAt(0).toUpperCase()+str.slice(1)+"~~"
       })
//全局过滤器-控制文本的最大长度    
Vue.filter('maxLength',(str)=>{
        if(str.length<=10) return str
        return str.slice(0,11)+'...'
       })
```

### 5.2 过滤器传参

过滤器的本质是 JavaScript 函数，因此可以接收参数，格式如下

```
<p>{{message|filterA(arg1,arg2)}}</p>
Vue.filter('filterA',(msg,arg1,arg2)=>{
	
})
```

示例代码

布局文件代码

```
<div id="app">
    <p>{{ text | capitalize | maxLength(5) }}</p>
</div>
```

全局过滤器代码

```
//全局过滤器-首字母大写
Vue.filter('capitalize',(str)=>{
        return str.charAt(0).toUpperCase()+str.slice(1)+"~~"
       })
//全局过滤器-控制文本的最大长度         
Vue.filter('maxLength',(str,len=10)=>{
        if(str.length<=len) return str
        return str.slice(0,len)+'...'
})
```

## 六  过滤器的兼容性

过滤器仅在 vue 2.x 和 1.x 中受支持，在 vue 3.x 的版本中剔除了过滤器相关的功能。



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-26-filter-sample-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-26-filter-global-sample-2.png