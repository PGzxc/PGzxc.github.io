---
title: Flutter开发之——TextField(12)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 86fbb818
date: 2021-03-03 19:20:11
---
## 一 概述

```
Flutter中处理文本输入的组件有：TextField 或 TextFormField
 -TextField：更适用于简单的文本输入场景。
 -TextFormField：用于表单中，提供验证、保存、重置等功能。
```

<!--more-->

## 二 TextField

### 2.1 说明

```
TextField 是最常用的文本输入框组件。
它允许用户输入一行文本
```

### 2.2 示例

```
TextField(
  decoration: InputDecoration(
    labelText: '请输入文本',
    hintText: '输入一些内容...',
  ),
  onChanged: (text) {
    print("输入的文本: $text");
  },
)
```

## 三 TextFormField

### 3.1 说明

```
TextFormField 是一个用于表单的 TextField，它提供了更多的功能，特别是在表单验证时更为有用。
它通常与 Form 组件一起使用。
```

### 3.2 示例

```
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: TextFormField(
    decoration: InputDecoration(
      labelText: '请输入用户名',
    ),
    validator: (value) {
      if (value == null || value.isEmpty) {
        return '请输入用户名';
      }
      return null;
    },
  ),
)
```

## 四 文字处理

### 4.1 说明

```
通过 controller 来控制文本的值、清空文本框等
限制输入字符、获取光标位置等，
可以通过 TextInputFormatter 和 TextSelection 等来增强功能
```

### 4.2 示例

```
TextEditingController _controller = TextEditingController();

TextField(
  controller: _controller,
  decoration: InputDecoration(
    labelText: '请输入内容',
  ),
),
```

