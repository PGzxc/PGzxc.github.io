---
title: less开发之——less语法以及配置
categories:
  - 开发
  - C-前端开发
  - Less
tags:
  - Less
abbrlink: fcfb12c8
date: 2024-08-04 09:56:49
---
## 一 概述

* 前言
* less前置 — css 变量、特殊符号介
* less 环境配置
* less 语法

<!--more-->

## 二 前言

* Less.js 是将 Less 样式转换为 CSS 样式的 JavaScript 工具
* Less（Leaner Style Sheets 的缩写）是一种向后兼容的 CSS 语言扩展

## 三 less前置 — css 变量、特殊符号介

### 3.1 css 变量

只可以在括号内声明变量，限制比较多，一般不常用

```
// 两边名前加入 --变量名
// 使用 var(--变量名) 使用变量
.test-text {
  //有效，且变量不允许声明到外面
  --font-z: 100px;
  font-size: var(--font-z);
  
  //无效，不能拼接，只能设置最终结果
  --font-z: 100px;
  font-size: var(--font-z)px;
}
```

### 3.2 css 特殊符号

主要介绍：`逗号(,)`、`空格`、`>`、`+`、`~`、`*`

`逗号(,)`： 可以让多个选择器拥有`相同属性`，此外，`同名选择器`会同时应用该名字`所有属性`（这两个功能一起应用，可以理解为选择器的多态)

`空格`、`>`、`+`、`~`、`*`： 可以给`子节点`设置属性

```
/*  逗号、空格、>、+、~、*   */

/*  ,： 逗号隔开的选择器，同时拥有括号内声明的属性 */
/* 设置选择器的，需要通过 className 设置到对应标签中 */
.test-text, .test-text1, .test-text2 {
  color: blue;
}

/* 应用于当前节点，此时他会比另外两个属性多出一个font-size属性，同名属性属性最终会被合并 */
.test-text {
  font-size: 40px;
}

/*   下面的应用于所有子节点(标签选择器：div、类别选择器：.test-text)   */
/* 空格： 容器内，所有 p 节点 */
.test-text p {
  font-size: 20px;
}

/* 空格： 容器内，所有类别选择器为 test-text1 的 */
.test-text .test-text1 {
  font-size: 20px;
}

/* 后面案例均以标签选择器，即节点为例 */
/* >： 容器内，指定第一层直接子节点 p，不会应用于孙节点以及以后节点*/
.test-text > p {
  font-size: 60px;
}

/* +： 容器内的所有子节点中， 符合 p 后面紧相邻兄弟节点(下一个节点)为 div 时生效，有一组生效一组 */
.test-text p + div {
  color: red;
}

/* ~： 容器内的所有子节点中，符合 p 的同级节点中为 div 的兄弟节点，都生效 */
.test-text div ~ p {
  color: green;
}

/* * 应用到容器内，所有子元素 */
.test-text * {
  background-color: yellow;
}
```

## 四 less 环境配置

### 4.1 安装 `craco` 相关环境

```
yarn add @craco/craco --dev
yarn add craco-less --dev
```

### 4.2 修改 `package.json` 中的 `script` 标签

```
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
},
```

### 4.3 `package.js` 同级目录下加入 `craco.config.js` 

```
//引入 craco-less插件
const CracoLessPlugin = require('craco-less');

module.exports = {
    typescript: {
        enableTypeChecking: true /* (default value) */,
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            // options: {
            //     lessLoaderOptions: {
            //         lessOptions: {
            //             modifyVars: { '@primary-color': '#1DA57A' },
            //             javascriptEnabled: true,
            //         },
            //     },
            // },
        },
    ],
};
```

## 五 less 语法

### 5.1 变量声明

通过 `@ + 变量名` 的方式来声明变量，如下所示

```
@theme-color: blue;
@normal-text: 14px;
```

### 5.2 变量的使用

通过`@{变量名}`、 `@变量名`两种方式来使用， `@变量名` 用于值， `@{变量名}`主要用于选择器、属性、字符串拼接

```
//在外部声明一些可能会多次使用的变量
@text-color: #333;
@line-name: width;
@line-value: 100px;

@mine: './images/mine/';
@home: './images/home/';

@selector-name: app;

//如果给选择器命名需要@{}
.@{selector-name} {
    display: flex;
    flex-direction: column;
}

.text1 {
    color: @text-color; //值类型，直接使用 @ + 变量名
    font-size: 30px;
}

.text2 {
    color: @text-color * 3; //值类型可以参与运算，不仅可以计算颜色 px也可以参与运算
    font-size: 20px;
}

.red-block {
    @{line-name}: @line-value; //属性也需要@{}，值只需要@
    height: @line-value;
    background-color: red;
}

.img-logo {
    width: 100px;
    height: 100px;
    background-image: url("@{mine}logo192.png"); //拼接字符串你需要 @{}
    background-repeat: no-repeat;
    background-size: cover;
}
```

### 5.3 全局选择器和变量

可以单独编写一个 `global.less` 文件，声明比较常用的一些全局变量、选择器，配合使用，可以说更为方便

```
@theme-color: blue;
@theme-bkg: blue;

.theme-color {
    color: @theme-color;
}

.theme-bkg {
    background-color: @theme-color;
}
```

### 5.4 父子选择器

从下面可以看到，直接镶嵌到里面就可以了，父子关系一目了然，需要注意的是特殊符号，默认为空格，需要用到特殊符号的加上即可

```
.content1 {
    display: flex;
    flex-direction: row;

    //会自动生效到子选择器
    .text {
        color: red();
        font-size: 30px;
    }

    //应用到直属子节点，其他一样 > + , ~ 等均生效
    > .img-logo {
        width: 100px;
        height: 100px;
        background-image: url("../images/logo192.png");
        background-repeat: no-repeat;
        background-size: cover;
    }
}
```

同时使用 `&` 来实现名称替换，如下所示，实际能应用得更多

```
.content2 {
    display: flex;
    flex-direction: row;
    
    //下面的 & 均会被替换为父类名称 div
    div {
        width: 20px;
        height: 20px;
        background-color: red;

        //&会自动替换外层名称,下面相当于 div:hover
        //如果是类选择器存在前缀的也可以
        &:hover {
            background-color: green;
        }

        // 相当于 div-subdiv，字符拼接了,&必须在前，因此比较适合标签选择器
        &-subdiv {
            background-color: green;
        }
    }
}
```

### 5.5 样式继承 extend

如下所示，使用 `extend` 继承实体样式，看起来更像类的继承了

```
.center {
    justify-content: center;
    align-items: center;
}

//可以继承实体样式，共同拥有，却不重复生成
.content3:extend(.center) {
    display: flex;
    width: 80px;
    height: 40px;
    background-color: greenyellow;

    div {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
    }
}
```

### 5.6 隐藏样式(虚拟节点)

虚拟节点是一个隐藏样式，调用时会被默认展开到指定类，实际编译的 css 类并不会存在

```
//虚拟节点实际不存在，调用时，类似宏定义，展开后使用内容更换外部调用出，因此会重复
.center() {
    justify-content: center;
    align-items: center;
}

.content4 {
    display: flex;
    width: 100px;
    height: 40px;
    background-color: yellow;
    // .center();
    .center; //这两种都可以，推荐这个，且实体节点也可以这么展开

    div {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
    }
}
```

### 5.7 !important

在继承展开虚拟节点的时候，可以使用 `!important`，其可以让继承的节点所有属性都加上 `!important`，这对于修改一些三方组件时，别提有多方便了

```
.mixin_content5() {
    background-color: red;
    width: 100px;
    height: 10px;

    .height() {
        height: 60px;
    }

    .gray() {
        background-color: green;
    }

}

.content5 {
    /*可以使继承到的所有属性都添加!important*/
    .mixin_content5 !important;
    //符号类似
    .mixin_content5>.height; //应用内部的子样式，由于前面 import 所以不生效
    .mixin_content5>.gray !important; //!important更新属性生效了
}
```

### 5.8 模式匹配

通过固定参数，来选择展开哪一个选择器，如下所示

```
.mixin (dark, @color) {
    background-color: #333;
}

.mixin (light, @color) {
    background-color: #fff;
}

div {
    .mixin(dark, red)
}
```

### 5.9 参数混合

我们设计虚拟节点的时候也可以设置参数，继承调用时，通过传递指定参数，调用更简单，开发代码更少了，更好理解了

```
/*可以设定参数,也可以同时设置默认值*/
//下面的参数实际上就是局部变量，可通过修改局部变量来更新内容
.transition(@property: all; @duration: 1s; @function: linear; @delay: 0s; ) {
    -webkit-transition: @property @duration @function @delay;
    -moz-transition: @property @duration @function @delay;
    -ms-transition: @property @duration @function @delay;
    -o-transition: @property @duration @function @delay;
    transition: @property @duration @function @delay;
}

/*等同于上式,Less中也有arguments*/
.transition(@property: all; @duration: 1s; @function: linear; @delay: 0s; ) {
    -webkit-transition: @arguments;
    -moz-transition: @arguments;
    -ms-transition: @arguments;
    -o-transition: @arguments;
    transition: @arguments;
}

.content6 {
    width: 60px;
    height: 60px;
    background-color: yellow;
    .transition(@property: width; @duration: 2s; )
}
```

### 5.10 兼并 merge

兼并多个相同属性（`+`代表以`逗号,`分隔，`+_`代表多个之前以`空格 `分隔）

```
// 兼并多个相同属性（+代表以逗号分隔，+_代表多个之前以空格分隔）
.shadow() {
    box-shadow+: inset 0 0 10px #555; //内阴影
}

.scale(@num) {
    transform+_: scale(@num); //大小变换
}

.content8 {
    width: 200px;
    height: 60px;
    margin-top: 10px;
    border-radius: 20px;
    .shadow;
    box-shadow+: 0 10px 20px #333; //外阴影
    transform+_: translateX(60px); //位移变换
    .scale(1.2);
}

方便理解，这里面翻译一下
// box-shadow: inset 0 0 10px #555, 0 0 20px black;
// transform: translateX(100px) scale(2);
```

###  5.11 条件语句 when

`when` 有点像`if`了，使用也很简洁，如下所示

`ps`：如果想展开多个，可以通过，`参数混合 + 递归(调用自身)`等方式展开，这样就能一次生成多条css数据了

```
//when条件语句，也可以在里面调用自身，形成递归，通过变量控制，一次性生成多条属性
.alpha(@a) when (@a >=0.5) {
    background-color: #eee;
}

.alpha(@a) when (@a < 0.5) {
    background-color: #333;
}

.content7 {
    width: 200px;
    height: 60px;
    background-color: red;
    .alpha(0.3);
}
```

## 六 参考

* [less语法以及配置(包含css变量和特殊符号简介)](https://www.pipipi.net/27124.html)
* [lesscss.cn](https://www.pipipi.net/27124.html)