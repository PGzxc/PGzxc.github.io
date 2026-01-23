---
title: Vue2.0开发之——数组中的方法(43)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 148f9b65
date: 2023-02-28 11:56:19
---
## 一 概述

* some循环
* every循环
* reduce的用法

<!--more-->

## 二 some循环

### 2.1 使用array的forEach方法—一旦循环开始，无法在中间停止

代码

```
const array=['红','黄','蓝','绿']
array.forEach((item,index)=>{
              console.log('ok')
               if(item==='蓝'){
                   console.log(index)
                   return;
               }
})
```

打印结果(所有元素都循环到了—到蓝结束)

```
3 ok
2
ok
```

### 2.2 使用some方法—找到对应项后，通过return true来终止some循环

代码

```
const array=['红','黄','蓝','绿']
array.some((item,index)=>{
                console.log('ok')
                if(item==='蓝'){
                    console.log(index)
                    return true
                }
            })
```

打印结果

```
3 ok
2
```

## 三 every循环—判断数组中，水果是否被全选了

代码

```
const arr=[
            {id:1,name:'西瓜',state:true},
            {id:2,name:'榴莲',state:true},
            {id:3,name:'草莓',state:true},
        ]

const result=arr.every(item=>item.state)
console.log(result)
```

打印结果

```
true
```

## 四 reduce的基本用法

### 4.1 计算选中水果的价格—filter,forEach

代码

```
const arr=[
            {id:1,name:'西瓜',state:true,price:10,count:1},
            {id:2,name:'榴莲',state:false,price:80,count:2},
            {id:3,name:'草莓',state:true,price:20,count:3},
        ]

let amt=0 //总价
arr.filter(item=>item.state).forEach(item=>{
            amt+=item.price*item.count
})
console.log(amt)
```

打印结果

```
70
```

### 4.2 计算选中水果的价格—filter,reduce

代码

```
const arr=[
            {id:1,name:'西瓜',state:true,price:10,count:1},
            {id:2,name:'榴莲',state:false,price:80,count:2},
            {id:3,name:'草莓',state:true,price:20,count:3},
        ]
const result = arr.filter(item=>item.state).reduce((amt,item)=>{
            return amt+=item.price*item.count
},0)
console.log(result)
```

reduce方法说明：

```
reduce((累加结果,当前循环项)=>{},初始值)
```

### 4.3  reduce的简化写法

```
const result = arr.filter(item=>item.state).reduce((amt,item)=>amt+=item.price*item.count,0)
```

