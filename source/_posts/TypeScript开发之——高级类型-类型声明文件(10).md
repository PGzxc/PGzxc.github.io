---
title: TypeScript开发之——高级类型-类型声明文件(10)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: e44ddb90
date: 2023-04-28 10:53:11
---
## 一 概述

* 类型声明文件概述
* TS中的两种文件类型
* 使用已有的类型声明文件
* 创建自己的类型声明文件

<!--more-->

## 二 类型声明文件概述

### 2.1 类型声明文件

* 类型声明文件：用来为已存在的 JS 库提供类型信息
* 这样在 TS 项目中使用这些库时，就像用 TS 一样，都会有代码提示、类型保护等机制了

### 2.2 类型声明文件示例

TS文件代码(使用js依赖库axios)

```
import axios from 'axios'

axios({
    url:'',
    method:'GET'
})
```

查看js中TS声明

![][1]

通过`package.json`中的`typings`指定对应哪个`.d.ts`文件

![][2]

说明：

* 所有的 JavaScript 应用都会引入许多第三方库来完成任务需求
* 这些第三方库不管是否是用 TS 编写的，最终都要编译成 JS 代码，才能发布给开发者使用
* 我们知道是 TS 提供了类型，才有了代码提示和类型保护等机制

## 三 TS中的两种文件类型

### 3.1 概念

TS 中有两种文件类型：1 .ts 文件 2 .d.ts 文件

#### .ts文件

* 既包含类型信息又可执行代码
* 可以被编译为 .js 文件，然后，执行代码
* 用途：编写程序代码的地方

#### .d.ts文件

* 只包含类型信息的类型声明文件
* 不会生成 .js 文件，仅用于提供类型信息
* 用途：为 JS 提供类型信息

总结：.ts 是 implementation（代码实现文件）；.d.ts 是 declaration（类型声明文件）

如果要为 JS 库提供类型信息，要使用 .d.ts 文件

### 3.2 .ts文件示例(index.ts)

```
//类型
type Props={a:number;b:string;c:boolean}

//可执行代码
function add(num1:number,num2:number){
    return num1+num2
}

console.log(add(1,2))
```

### 3.3 .d.ts示例(index.d.ts)

```
//类型
type Props1={a:number;b:string;c:boolean}
```

## 四 使用已有的类型声明文件

使用已有的类型声明文件：1 内置类型声明文件 2 第三方库的类型声明文件

### 4.1 内置类型声明文件

TS 为 JS 运行时可用的所有标准化内置 API 都提供了声明文件

```
let arr = [1, 3, 5]
arr.forEach

document.querySelector

window
```

点击代码中的方法，可以跳转到声明文件位置(以forEach为例跳转到lib.es5.d.ts类型声明文件中)

```
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
```

### 4.2 第三方库的类型声明文件

目前，几乎所有常用的第三方库都有相应的类型声明文件。第三方库的类型声明文件有两种存在形式：1 库自带类型声明文件 2 由 DefinitelyTyped 提供

#### 库自带类型声明文件，比如axios

![][1]

说明：这种情况下，正常导入该库，TS 就会自动加载库自己的类型声明文件，以提供该库的类型声明

#### 由 DefinitelyTyped 提供

1-DefinitelyTyped 介绍

* DefinitelyTyped 是一个 github 仓库，用来提供高质量 TypeScript 类型声明
* 可以通过 npm/yarn 来下载该仓库提供的 TS 类型声明包，这些包的名称格式为：@types/*。比如，@types/react、@types/lodash 等

2-使用第三方库时，如lodash

2.1-安装依赖库

```
npm i lodash
```

2.2-安装类型声明包

```
npm i --save-dev @types/lodash
```

若不安装类型声明包，会出现以下提示

```
无法找到模块“lodash”的声明文件。“node_modules/lodash/lodash.js”隐式拥有 "any" 类型。
尝试使用 `npm i --save-dev @types/lodash` (如果存在)，或者添加一个包含 `declare module 'lodash';` 的新声明(.d.ts)文件ts(7016)
```

说明：

* 当安装 @types/* 类型声明包后，TS 也会自动加载该类声明包，以提供该库的类型声明
* TS 官方文档提供了一个页面，可以来查询 @types/* 库

## 五 创建自己的类型声明文件

创建自己的类型声明文件：1 项目内共享类型 2 为已有 JS 文件提供类型声明

### 5.1 项目内共享类型

#### 操作步骤

* 创建 index.d.ts 类型声明文件
* 创建需要共享的类型，并使用 export 导出（TS 中的类型也可以使用 import/export 实现模块化功能）
* 在需要使用共享类型的 .ts 文件中，通过 import 导入即可（.d.ts 后缀导入时，直接省略）

#### 示例代码

1-index.d.ts文件

```
type Props = { x: number; y: number }

export {Props}
```

2-a.ts

```
import {Props} from './index'

let p1: Props = {
    x: 10,
    y: 20
}
```

3-b.ts

```
import {Props} from './index'
let p2: Props = {
    x: 12,
    y: 22
}
```

说明：项目内共享类型：如果多个 .ts 文件中都用到同一个类型，此时可以创建 .d.ts 文件提供该类型，实现类型共享

### 5.2 为已有 JS 文件提供类型声明

#### 何时使用

* 在将 JS 项目迁移到 TS 项目时，为了让已有的 .js 文件有类型声明
* 成为库作者，创建库给其他人使用

#### 原有js文件提供类型声明

utils.js

```
let count = 10
let songName = '痴心绝对'
let position = {
  x: 0,
  y: 0
}

function add(x, y) {
  return x + y
}

function changeDirection(direction) {
  console.log(direction)
}

const fomartPoint = point => {
  console.log('当前坐标：', point)
}

export { count, songName, position, add, changeDirection, fomartPoint }
```

utils.d.ts

```
// 为 utils.js 文件来提供类型声明

declare let count: number
declare let songName: string
interface Point {
  x: number
  y: number
}
declare let position: Point

declare function add(x: number, y: number): number
declare function changeDirection(
  direction: 'up' | 'down' | 'left' | 'right'
): void

type FomartPoint = (point: Point) => void
declare const fomartPoint: FomartPoint

// 注意：类型提供好以后，需要使用 模块化方案 中提供的
//      模块化语法，来导出声明好的类型。然后，才能在
//      其他的 .ts 文件中使用
export { count, songName, position, add, changeDirection, fomartPoint, Point }
```

index.ts(使用utils.d.ts)

```
import { count, songName, add, Point } from './utils'

type Person = {
  name: string
  age: number
}

let p: Partial<Person> = {
  name: 'jack'
}

let p1: Point = {
  x: 10,
  y: 20
}

// console.log('项目启动了')
console.log('count', count)
console.log('songName', songName)
console.log('add()', add(1, 4))
```

说明：

* 对于 type、interface 等这些明确就是 TS 类型的（只能在 TS 中使用的），可以省略 declare 关键字
* 对于 let、function 等具有双重含义（在 JS、TS 中都能用），应该使用 declare 关键字，明确指定此处用于类型声明

## 六 参考

* [GitHub - DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day3-img10-type-axios.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day3-img10-type-axios-typings.png