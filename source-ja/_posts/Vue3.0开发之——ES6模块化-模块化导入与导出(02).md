---
title: Vue3.0开发之——ES6模块化-模块化导入与导出(02)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: eef06aff
date: 2023-04-05 11:37:53
---
## 一 概述

* ES6模块化的基本语法
* 默认导出与默认导入
* 按需导出与按需导入
* 直接导入并执行模块中的代码

<!--more-->

## 二 ES6模块化的基本语法

ES6 的模块化主要包含如下 3 种用法：

1. <font color=red>默认导出</font>与<font color=red>默认导入</font>
2. <font color=red>按需导出</font>与<font color=red>按需导入</font>
3. <font color=red>直接导入</font>并<font color=red>执行</font>模块中的代码

## 三 默认导出与默认导入

### 3.1 默认导出

默认导出的语法： <font color=red>export default</font> 默认导出的成员

新建`01-默认导出.js`文件，编写默认导出代码如下

```
let n1 = 10
let n2 = 20 
function show(){}

export default{
    n1,
    show
}
```

### 3.2 默认导入

默认导入的语法：<font color=red> import</font> <font color=#3469ff>接收名称</font> <font color=red>from</font> '<font color=#3469ff>模块标识符</font>'

新建`02-默认导入.js`文件，编写默认导入代码如下

```
import m1 from './01-默认导出.js'

console.log(m1)
```

执行如下代码，查看执行效果

```
node .\02-默认导入.js
```

### 3.3 默认导出的注意事项

每个模块中，<font color=red>只允许使用唯一的一次</font> export default，否则会报错

![][1]

### 3.4 默认导入的注意事项

默认导入时的<font color=red>接收名称</font>可以任意名称，<font color=red>只要是合法的成员名称即可</font>

```
import 123 from './01-默认导出.js'
```

上面的导入语句是错误的不合法名称，因为成员名称不能以数字开头

## 四 按需导出与按需导入

### 4.1 按需导出

按需导出的语法：<font color=red> export</font> 按需导出的成员

新建`03-按需导出.js`文件，编写默认导出代码如下

```
export let s1 = 'aaa'
export let s2 = 'ccc'
export function say(){}
```

### 4.2 按需导入

按需导入的语法： <font color=red>import</font> { s1 } <font color=red>from</font> '模块标识符'

新建`04-按需导入.js`文件，编写默认导入代码如下

```
import { s1, s2, say } from './03-按需导出.js'

console.log(s1)
console.log(s2)
console.log(say)
```

执行如下代码，查看执行效果

```
 node .\04-按需导入.js
```

### 4.3 按需导出与按需导入的注意事项

注意事项：

* 每个模块中可以使用<font color=red>多次</font>按需导出
* 按需<font color=red>导入的成员名称</font>必须和<font color=red>按需导出的名称</font>保持一致
* 按需导入时，可以使用<font color=red>as 关键字</font>进行重命名
* 按需导入可以和默认导入一起使用

示例修改—03-按需导出.js

```
export let s1 = 'aaa'
export let s2 = 'ccc'
export function say(){}

export default{
    name:'zs',
    age:18
}
```

示例修改—04-按需导入.js

```
import info, { s1, s2 as str2, say } from './03-按需导出.js'

console.log(s1)
//console.log(s2)
console.log(str2)
console.log(say)

console.log(info)
```

## 五 直接导入并执行模块中的代码

### 5.1 单纯执行模块中的代码

* 如果只<font color=red>想单纯地执行某个模块中的代码</font>，并不需要得到模块中向外共享的成员。
* 此时，可以直接导入并执行模块代码

### 5.2 示例代码

05-模块中的代码.js

```
for(let i=0;i<3;i++){
    console.log(i)
}
```

06-导入并运行模块中的代码.js

```
import './05-模块中的代码.js'
```

说明：直接导入并执行代码，不需要得到模块向外共享的成员


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-02-es6-export-more-error.png