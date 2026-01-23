---
title: Vue2.0开发之——ESLint—ESLint开发指南2(64)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: e136f4be
date: 2023-03-28 12:40:01
---
## 一 概述

* ESLint的语法规则
* 修改ESLint的语法规则

<!--more-->

## 二 ESLint的语法规则

### 2.1 no-multiple-empty-lines(禁止出现多行空行)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\main.js
  9:1  error  Too many blank lines at the end of file. Max of 0 allowed  no-multiple-empty-lines

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第9行第1列位置出现多个空行
```

### 2.2 no-trailing-spaces(禁用行尾空格)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\main.js
  8:18  error  Trailing spaces not allowed  no-trailing-spaces

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第8行第18列出现行尾空格
```

![][1]

### 2.3 eol-last(要求或禁止文件末尾存在空行)

错误信息：

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\main.js
  8:18  error  Newline required at end of file but not found  eol-last

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第8行第18列位置没有空行(最后必须有空行)
```

### 2.4 quotes(强制使用一致的反勾号、双引号或单引号)

错误信息：

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\main.js
  1:17  error  Strings must use singlequote                   quotes
  8:18  error  Newline required at end of file but not found  eol-last

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第一行第17列没有使用单引号——import Vue from "vue"(vue使用单引号)
```

### 2.5 key-spacing(强制在对象字面量的属性中键和值之间使用一致的间距)

错误信息：

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  12:8  error  Missing space before value for key 'name'  key-spacing

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
App.vue中第12行第8列在name属性缺失空格
```

### 2.6 comma-dangle(要求或禁止末尾逗号)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  14:15  error  Unexpected trailing comma  comma-dangle

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
App.vue中第14行第15列出现逗号
```

### 2.7 spaced-comment(强制在注释中 `//` 或 `/*` 使用一致的空格)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  10:1  error  Expected space or tab after '//' in comment  spaced-comment

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第10行第1列，//后面没有空格
```

### 2.8 indent(强制使用一致的缩进)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  11:1  error  Expected indentation of 0 spaces but found 2  indent

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第11行第1列，缩进问题
```

### 2.9 import/first(import语句必须放到js的顶部)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  12:1  error  Import in body of module; reorder to top  import/first

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第12行第1列，import导入语句放到顶部(前面不能写语句)
```

### 2.10 no-unused-vars( 禁止出现未使用过的变量)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  13:7  error  'a' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

根据错误信息查找位置：

```
第13行第7列，出现了从未使用过的变量a
```

### 2.11 space-before-function-paren(强制在 `function`的左括号之前使用一致的空格)

错误信息

```
ERROR
[eslint] 
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  19:9  error  Missing space before function parentheses  space-before-function-paren

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

根据错误信息查找位置：

```
第19行第9列，方法的形参之前必须有空格
```

## 三 修改ESLint的语法规则(space-before-function-paren为例)

### 3.1 规则修改说明

![][2]

### 3.2 .eslintrc.js文件中修改规则

```
 rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-function-paren": ["warn", "always"],
  }
```

警告信息

```
WARNING  Compiled with 1 warning                                                      

[eslint]
D:\Code\Vue2\vue-eslint-demo\src\App.vue
  19:9  warning  Missing space before function parentheses  space-before-function-paren

✖ 1 problem (0 errors, 1 warning)
  0 errors and 1 warning potentially fixable with the `--fix` option.
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-64-eslint-rules-no-trailing-spaces.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-64-eslint-rules-modify-explain.png