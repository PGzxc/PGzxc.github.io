---
title: KMP开发之——交互组件之用户输入的组件(6.1)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: 900074ae
date: 2026-01-20 10:08:12
---
## 一 概述

```
在KMP中，用户输入的组件不仅需要能处理用户的行为(点击、输入、切换等)，
还需要与状态管理、事件流、UI 更新紧密配合。
本节介绍如下组件：Button / TextField / Checkbox / Switch 
```

<!--more-->

## 二 交互组件

### 2.1 Button：用户点击的常见交互

1-Button 的基本用法

```
Button(onClick = { /* 点击事件 */ }) {
    Text("Click Me")
}

说明：
-onClick：按钮点击后的事件处理
-Text：按钮内部的文本组件
```

2-按钮的禁用状态

```
Button(
    onClick = { /* 点击事件 */ },
    enabled = false
) {
    Text("Disabled Button")
}
说明：enabled：是否禁用按钮，禁用后点击事件不会触发，且外观会改变
```

3-按钮样式定制(背景、圆角、边框等)

```
1-代码
Button(
    onClick = { /* 点击事件 */ },
    colors = ButtonDefaults.buttonColors(backgroundColor = Color.Cyan),
    shape = RoundedCornerShape(16.dp)
) {
    Text("Custom Button")
}

2-说明
-ButtonDefaults.buttonColors：自定义按钮背景色、内容色等
-RoundedCornerShape：自定义按钮圆角
```

### 2.2 TextField：用户输入的文本框

1-TextField 的基本用法

```
1-代码
@Composable
fun SimpleTextField() {
    var text by remember { mutableStateOf("") }

    TextField(
        value = text,
        onValueChange = { newText -> text = newText },
        label = { Text("Enter text") }
    )
}

2-说明
-value：输入框的当前值
-onValueChange：输入框值变化的回调，用于更新 text 状态
```

2-TextField 的样式定制(边框、背景色等)

```
1-代码
TextField(
    value = text,
    onValueChange = { newText -> text = newText },
    label = { Text("Enter your name") },
    colors = TextFieldDefaults.textFieldColors(
        backgroundColor = Color.LightGray
    ),
    modifier = Modifier.fillMaxWidth()
)

2-说明
TextFieldDefaults.textFieldColors：自定义输入框的颜色样式
Modifier.fillMaxWidth()：让输入框占满父布局宽度
```

3-密码输入框

```
1-代码
var password by remember { mutableStateOf("") }

TextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("Password") },
    visualTransformation = PasswordVisualTransformation()  // 密码显示为星号
)
2-说明
visualTransformation：对输入内容进行可视化转化，常用于密码输入框
```

4-键盘类型

```
1-代码
TextField(
    value = phoneNumber,
    onValueChange = { phoneNumber = it },
    keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Phone)
)

2-说明
keyboardOptions：设置键盘的类型，常用于设置电话号码、电子邮件等专用键盘
```

### 2.3 Checkbox：用户选择的复选框

1-Checkbox 的基本用法

```
1-代码
var checked by remember { mutableStateOf(false) }

Checkbox(
    checked = checked,
    onCheckedChange = { checked = it }
)

2-说明
checked：表示复选框的选中状态
onCheckedChange：复选框状态变化的回调，用于更新 checked 状态
```

2-自定义复选框的外观

```
1-代码
Checkbox(
    checked = checked,
    onCheckedChange = { checked = it },
    colors = CheckboxDefaults.colors(checkedColor = Color.Green, uncheckedColor = Color.Red)
)

2-说明
CheckboxDefaults.colors：自定义复选框的颜色样式
```

3-复选框与文本的组合

```
1-代码
Row(verticalAlignment = Alignment.CenterVertically) {
    Checkbox(
        checked = checked,
        onCheckedChange = { checked = it }
    )
    Text("Agree to terms and conditions")
}

2-说明
复选框和文本可以结合在一起，常见于用户协议等界面
```

### 2.4 Switch：用户切换的开关

1- Switch 的基本用法

```
1-代码
var isChecked by remember { mutableStateOf(false) }

Switch(
    checked = isChecked,
    onCheckedChange = { isChecked = it }
)

2-说明
checked：表示开关的开关状态
onCheckedChange：开关状态变化的回调，用于更新 isChecked 状态
```

2-自定义 Switch 样式

```
1-代码
Switch(
    checked = isChecked,
    onCheckedChange = { isChecked = it },
    colors = SwitchDefaults.colors(
        checkedThumbColor = Color.Green,
        uncheckedThumbColor = Color.Red
    )
)

2-说明
SwitchDefaults.colors：自定义开关的颜色样式
```

3- Switch 与文本的组合

```
1-代码
Row(verticalAlignment = Alignment.CenterVertically) {
    Switch(
        checked = isChecked,
        onCheckedChange = { isChecked = it }
    )
    Text("Enable notifications")
}

2-说明
Switch 和文本组合，常见于设置项中的开关组件
```

## 三 综合示例：表单类交互组件

### 3.1 代码

```
@Composable
fun UserForm() {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var agreeToTerms by remember { mutableStateOf(false) }

    Column(modifier = Modifier.padding(16.dp)) {
        TextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Name") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))

        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Email),
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))

        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = agreeToTerms,
                onCheckedChange = { agreeToTerms = it }
            )
            Text("Agree to terms and conditions")
        }
        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = { /* Handle submit */ },
            enabled = name.isNotEmpty() && email.isNotEmpty() && agreeToTerms
        ) {
            Text("Submit")
        }
    }
}
```

### 3.2 说明

```
这个表单组件包含 TextField（用于姓名和邮箱输入），Checkbox（用于同意协议），Button（提交按钮）。
表单提交按钮仅在所有字段都填写且复选框勾选的情况下才可用。
```

