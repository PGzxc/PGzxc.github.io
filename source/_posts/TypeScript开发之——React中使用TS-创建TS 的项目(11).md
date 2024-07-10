---
title: TypeScript开发之——React中使用TS-创建TS 的项目(11)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: a7ec3bb7
date: 2023-04-29 10:22:09
---
## 一 概述

* 使用CRA创建支持TS的项目
* TS项目目录结构
* TS配置文件tsconfig.json

<!--more-->

## 二 使用CRA创建支持TS的项目

### 2.1 cmd终端，执行如下创建指令

```
npx create-react-app react-ts-demo --template typescript
```

![][1]

### 2.2 看到如下描述时，表示项目创建成功

```
We suggest that you begin by typing:

  cd react-ts-demo
  npm start

Happy hacking!
```

### 2.3 按照提示，进入项目`react-ts-demo`，执行`npm start`指令启动项目

![][2]

## 三 TS项目目录结构

### 3.1 创建完成后的项目目录结构如下

![][3]

### 3.2 目录结构说明

相对于非 TS 项目，目录结构主要由以下三个变化：

* 项目根目录中增加了 <font color=red>tsconfig.json </font>配置文件：<font color=red>指定 TS 的编译选项</font>（比如，编译时是否移除注释）
* React 组件的文件扩展名变为：<font color=red>*.tsx</font>
* src 目录中增加了 react-app-env.<font color=red>d.ts：React 项目默认的类型声明文件</font>

### 3.3 react-app-env.d.ts：React 项目默认的类型声明文件

1-内容

```
/// <reference types="react-scripts" />
```

说明：

* 三斜线指令：指定依赖的其他类型声明文件，types 表示依赖的类型声明文件包的名称
* 告诉 TS 帮我加载 react-scripts 这个包提供的类型声明

2-react-scripts 的类型声明文件包含了两部分类型

* react、react-dom、node 的类型
* 图片、样式等模块的类型，以允许在代码中导入图片、SVG 等文件

3-TS 会自动加载该 .d.ts 文件，以提供类型声明

* 通过修改 tsconfig.json 中的 include 配置来验证

## 四 TS配置文件tsconfig.json

### 4.1 官方tsconfig全部配置说明

![][4]

### 4.2 项目中文件tsconfig配置说明

```
{
  // 编译选项
  "compilerOptions": {
    // 生成代码的语言版本
    "target": "es5",
    // 指定要包含在编译中的 library
    "lib": ["dom", "dom.iterable", "esnext"],
    // 允许 ts 编译器编译 js 文件
    "allowJs": true,
    // 跳过声明文件的类型检查
    "skipLibCheck": true,
    // es 模块 互操作，屏蔽 ESModule 和 CommonJS 之间的差异
    "esModuleInterop": true,
    // 允许通过 import x from 'y' 即使模块没有显式指定 default 导出
    "allowSyntheticDefaultImports": true,
    // 开启严格模式
    "strict": true,
    // 对文件名称强制区分大小写
    "forceConsistentCasingInFileNames": true,
    // 为 switch 语句启用错误报告
    "noFallthroughCasesInSwitch": true,
    // 生成代码的模块化标准
    "module": "esnext",
    // 模块解析（查找）策略
    "moduleResolution": "node",
    // 允许导入扩展名为.json的模块
    "resolveJsonModule": true,
    // 是否将没有 import/export 的文件视为旧（全局而非模块化）脚本文件。
    "isolatedModules": true,
    // 编译时不生成任何文件（只进行类型检查）
    "noEmit": true,
    // 指定将 JSX 编译成什么形式
    "jsx": "react-jsx"
  },
  // 指定允许 ts 处理的目录
  "include": ["src"]
}
```

### 4.3 tsconfig.json文件生成

执行如下指令

```
tsc --init
```

说明：

* tsconfig.json 指定：项目文件和项目编译所需的配置项
* tsconfig.json 文件所在目录为项目根目录（与 package.json 同级）
* tsconfig.json 可以自动生成，命令：tsc --init

### 4.4 通过命令行编辑文件

1-hello.ts文件

```
type Person = {
    name: string
    age: number
}
let p: Person = {
    name: 'jack',
    age: 18
}
```

2-通过指令执行`tsc hello.ts --target es6`后，生成hello.js文件

```
let p = {
    name: 'jack',
    age: 18
};
```

3-通过指令执行`tsc hello.ts`后，生成hello.js文件

```
var p = {
    name: 'jack',
    age: 18
};
```

4-通过执行`tsc --init`，生成`tsconfig.json`文件，按照配置生成hello.js文件

## 五 参考

* [在已有项目中使用TS](https://create-react-app.dev/docs/adding-typescript/)
* [TS配置文件](https://www.typescriptlang.org/tsconfig)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day4-img11-react-ts-create.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day4-img11-react-ts-create-start.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day4-img11-react-ts-demo-struct.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ts/ts-day4-img11-react-ts-tsconfig.png