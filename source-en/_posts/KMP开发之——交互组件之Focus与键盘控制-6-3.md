---
title: KMP开发之——交互组件之Focus与键盘控制(6.3)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 623a0d87
date: 2026-01-25 08:05:25
---
## 一 概述

```
本文介绍：
-如何在 Compose 中管理焦点和键盘的行为。
```

<!--more-->

## 二 Focus 控制

### 2.1 什么是焦点(Focus)？

```
在应用中，焦点表示当前可以接收输入的 UI 元素。
例如，文本框可以接收用户输入，按钮可以响应点击。焦点可以是：
-用户点击的控件
-通过键盘或其他方式激活的控件
```

### 2.2 设置焦点的基本操作

```
1、说明
在 Compose 中，可以通过 FocusRequester 和 Modifier.focusRequester 来控制焦点。

2-示例：控制焦点跳转
@Composable
fun FocusExample() {
    val focusRequester1 = remember { FocusRequester() }
    val focusRequester2 = remember { FocusRequester() }

    Column(
        modifier = Modifier.padding(16.dp)
    ) {
        TextField(
            value = "",
            onValueChange = {},
            label = { Text("Field 1") },
            modifier = Modifier.focusRequester(focusRequester1)
        )
        Spacer(modifier = Modifier.height(16.dp))
        TextField(
            value = "",
            onValueChange = {},
            label = { Text("Field 2") },
            modifier = Modifier.focusRequester(focusRequester2)
        )

        Button(
            onClick = { focusRequester2.requestFocus() },
            modifier = Modifier.padding(top = 16.dp)
        ) {
            Text("Focus on Field 2")
        }
    }
}

3-结论
FocusRequester：创建一个焦点请求器，用于控制焦点的跳转。
Modifier.focusRequester(focusRequester)：将焦点请求器应用到组件上。
解释：点击按钮时，焦点会跳转到第二个文本框。
```

### 2.3 监听焦点变化

```
1-说明
有时，我们需要监听组件的焦点变化来做出相应的处理。可以使用 onFocusChanged 来实现。

2-示例
@Composable
fun FocusChangeListener() {
    var isFocused by remember { mutableStateOf(false) }

    TextField(
        value = "",
        onValueChange = {},
        label = { Text("Input Field") },
        modifier = Modifier.onFocusChanged { focusState ->
            isFocused = focusState.isFocused
        }
    )

    Text("Is focused: $isFocused")
}
3-概述
onFocusChanged：监听焦点状态变化，focusState.isFocused 判断当前是否有焦点。
```

## 三 键盘控制

### 3.1 显示与隐藏键盘

```
1-说明
在 Compose 中，可以使用 LocalSoftwareKeyboardController 来显示或隐藏键盘。

2-示例：隐藏键盘
@Composable
fun KeyboardControlExample() {
    val keyboardController = LocalSoftwareKeyboardController.current

    Button(onClick = {
        // 隐藏键盘
        keyboardController?.hide()
    }) {
        Text("Hide Keyboard")
    }
}

3-概述
LocalSoftwareKeyboardController.current：获取当前的键盘控制器。
keyboardController?.hide()：隐藏键盘。

4-示例：显示键盘
@Composable
fun ShowKeyboardExample() {
    val focusRequester = remember { FocusRequester() }
    val keyboardController = LocalSoftwareKeyboardController.current

    TextField(
        value = "",
        onValueChange = {},
        label = { Text("Input Field") },
        modifier = Modifier.focusRequester(focusRequester)
    )

    Button(onClick = {
        // 让焦点进入文本框并显示键盘
        focusRequester.requestFocus()
        keyboardController?.show()  // 显示键盘
    }) {
        Text("Focus and Show Keyboard")
    }
}

5-概述
keyboardController?.show()：显示键盘。
```

### 3.2 键盘与焦点同步

```
1-说明
在很多表单场景中，键盘应该随着焦点变化而自动弹出或收起。通过 FocusRequester 和 LocalSoftwareKeyboardController 的结合，能够方便地控制焦点和键盘的显示与隐藏

2-示例：点击文本框显示键盘
@Composable
fun AutoShowKeyboard() {
    val focusRequester = remember { FocusRequester() }
    val keyboardController = LocalSoftwareKeyboardController.current

    TextField(
        value = "",
        onValueChange = {},
        label = { Text("Click to type") },
        modifier = Modifier
            .focusRequester(focusRequester)
            .onFocusChanged {
                if (it.isFocused) {
                    // 当获得焦点时显示键盘
                    keyboardController?.show()
                }
            }
    )
}

3-概述
onFocusChanged 监听焦点变化，焦点获得时自动显示键盘。
```

### 3.3 键盘类型与行为配置

```
1-说明
有时候，你需要配置键盘的类型（例如：数字键盘、电子邮件键盘等）。这可以通过 keyboardOptions 来配置：

2-示例
@Composable
fun KeyboardTypeExample() {
    var email by remember { mutableStateOf("") }

    TextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("Email") },
        keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Email)
    )
}

3-概述
keyboardOptions：配置键盘的类型，keyboardType = KeyboardType.Email 会显示一个电子邮件专用的键盘。
```

## 四 焦点和键盘控制的综合示例

### 4.1 示例

```
@Composable
fun FormWithFocusAndKeyboard() {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    val focusRequesterName = remember { FocusRequester() }
    val focusRequesterEmail = remember { FocusRequester() }
    val keyboardController = LocalSoftwareKeyboardController.current

    Column(modifier = Modifier.padding(16.dp)) {
        TextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Name") },
            modifier = Modifier
                .focusRequester(focusRequesterName)
                .onFocusChanged {
                    if (it.isFocused) {
                        keyboardController?.show()
                    }
                }
        )
        Spacer(modifier = Modifier.height(8.dp))

        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier
                .focusRequester(focusRequesterEmail)
                .onFocusChanged {
                    if (it.isFocused) {
                        keyboardController?.show()
                    }
                }
        )
        Spacer(modifier = Modifier.height(16.dp))

        Row {
            Button(onClick = {
                focusRequesterEmail.requestFocus()  // 设置焦点到 Email
            }) {
                Text("Focus on Email")
            }
            Spacer(modifier = Modifier.width(16.dp))
            Button(onClick = {
                keyboardController?.hide()  // 隐藏键盘
            }) {
                Text("Hide Keyboard")
            }
        }
    }
}
```

### 4.2 说明

```
该示例创建了一个包含 姓名 和 电子邮件 输入框的表单，用户可以通过按钮切换焦点，同时控制键盘的显示与隐藏。
```

## 五 小结

```
如何使用 FocusRequester 控制焦点
使用 LocalSoftwareKeyboardController 控制键盘的显示与隐藏
如何让键盘与焦点同步
配置不同类型的键盘，提升用户输入体验
```

