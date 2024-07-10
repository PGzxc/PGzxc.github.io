---
title: Vue2.0开发之——ESLint—ESLint开发指南3(65)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: c54dec4f
date: 2023-03-28 12:41:31
---
## 一 概述

* VSCode插件介绍及安装
* VSCode配置
* VScode配置默认格式化方式
* 修改后的使用效果

<!--more-->

## 二 VSCode插件介绍及安装

### 2.1 eslint

**插件介绍：**

在团队协作中，为避免低级 Bug、产出风格统一的代码，会预先制定编码规范。使用 Lint 工具和代码风格检测工具，则可以辅助编码规范执行，有效控制代码质量。

ESLint 由 JavaScript 红宝书 作者 Nicholas C. Zakas 编写， 2013 年发布第一个版本。 NCZ 的初衷不是重复造一个轮子，而是在实际需求得不到 JSHint 团队响应的情况下做出的选择：以可扩展、每条规则独立、不内置编码风格为理念编写一个 lint 工具。

**插件安装**(扩展商店——搜索ESLint)

![][1]

### 2.2 Vetur

**插件介绍**

这个插件主要作用就是让vscode识别.vue文件，实现语法高亮

**插件安装**(扩展商店——Vetur)

![][2]

### 2.3 Prettier

**插件介绍**

它的作用是将我们散漫的风格迥异的代码格式化为符合规范的代码。

**插件安装**(扩展商店——Prettier)
![][3]

## 三 VSCode配置

### 3.1 VSCode => file => perferences => settings => Edit in settings.json

将以下代码复制进settings.json即可

```
{
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化 
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  //  #让prettier使用eslint的代码格式进行校验 
  "prettier.eslintIntegration": true,
  //  #去掉代码结尾的分号 
  "prettier.semi": false,
  //  #使用带引号替代双引号 
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 格式化stylus, 需安装Manta‘s Stylus Supremacy插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.codeAction.disableRuleComment": {},
  "beautify.config": "" // 两个选择器中是否换行
}
```

粘贴后，效果图

![][4]

### 3.2 prettier.configPath

在`C:\Users\用户名`位置，新建`.prettierrc`文件，并填充以下内容

```
{
    // tab缩进大小,默认为2
    "tabWidth": 4,
    // 使用tab缩进，默认false
    "useTabs": false,
    // 使用分号, 默认true
    "semi": false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    "singleQuote": false,
    // 行尾逗号,默认none,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    "TrailingCooma": "all",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    "bracketSpacing": true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    "jsxBracketSameLine": false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    "arrowParens": "avoid"
}
```

![][5]

### 3.3 VSCode配置prettier.configPath

```
"prettier.configPath": "C:\\Users\\用户名\\.prettierrc", // prettierrc文件目录
```

配置图如下

![][6]

## 四 VScode配置默认格式化方式

### 4.1 查看格式化文档

在代码文档中，右键`使用...格式化文档`

![][7]

查看使用的默认格式化方式
![][8]

### 4.2 修改默认格式化方式

在窗口中选择`配置默认格式化程序`并修改

![][9]

## 五 修改后的使用效果
![][10]

## 六  参考

* [CSDN—配置prettier](https://blog.csdn.net/a1071626267/article/details/127537182)
* [Github—prettier-eslint](https://github.com/prettier/prettier-eslint)
* [CSDN—vue的默认的三种eslint模式对应的.prettierrc文件](https://blog.csdn.net/niuge8905/article/details/115839854)
* [Github—Prettier Formatter for Visual Studio Code](https://github.com/prettier/prettier-vscode)
* [Prettier官网](https://www.prettier.cn/docs/install.html)
* [CSDN—vue项目中配置eslint和prettier](https://blog.csdn.net/weixin_42349568/article/details/120937200)
* [安科网—Vue在VSCode中自动缩进](https://www.ancii.com/aa9xpuw8y/)
* [黑马头条—移动端](http://doc.toutiao.liulongbin.top/mds/1.init.html)
* [ESLint官网](https://eslint.bootcss.com/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-install-eslint.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-install-veture.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-install-prettier.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-vscode-config.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-prettierrc-file.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-install-prettier-configpath.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-format-doc-look.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-format-doc-default.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-format-doc-modify.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-65-eslint-plugin-code-preview.gif