---
title: KMP开发之——组件之基本组件(3.2)
categories:
  - 开发
  - F-跨平台
  - KMP
tags:
  - KMP
abbrlink: b63b0e1d
date: 2026-01-15 08:52:51
---
## 一 概述

```
本节介绍基本组件，聚焦的是 最常用、最基础的 UI 交互与展示组件，
相当于 Flutter 的 Text / Image / Button / TextField。
```

<!--more-->

## 二 什么是基本组件？

### 2.1 定义范围

基本组件 = 不负责复杂布局，仅用于内容展示或简单交互

| 分类 |             组件              |
| :--: | :---------------------------: |
| 文本 |             Text              |
| 图片 |             Image             |
| 按钮 |      Button / IconButton      |
| 输入 | TextField / OutlinedTextField |
| 提示 |      Snackbar / Tooltip       |
| 分割 |            Divider            |

### 2.2 特点

```
低耦合
可复用
易组合
```

## 三 基本组件

### 3.1 文本组件(Text)

```
1-基本用法
Text(text = "Hello KMP")

2-文本样式
Text(
    text = "Title",
    fontSize = 20.sp,
    fontWeight = FontWeight.Bold,
    color = Color.Black
)

3-文本对齐与行数
Text(
    text = "多行文本示例",
    maxLines = 2,
    overflow = TextOverflow.Ellipsis,
    textAlign = TextAlign.Center
)
```

### 3.2 图片组件(Image)

```
1-加载本地资源
Image(
    painter = painterResource("avatar.png"),
    contentDescription = null
)
KMP 资源路径: shared/src/commonMain/resources

2-图片裁剪与缩放
Image(
    painter = painterResource("avatar.png"),
    contentDescription = null,
    modifier = Modifier.size(80.dp),
    contentScale = ContentScale.Crop
)

3-圆形头像示例
Image(
    painter = painterResource("avatar.png"),
    contentDescription = null,
    modifier = Modifier
        .size(64.dp)
        .clip(CircleShape)
)
```

### 3.3 Icon

```
@Composable
fun SimpleIcon() {
    Icon(
        imageVector = Icons.Default.Home,
        contentDescription = null
    )
}
```

### 3.4 按钮组件(Button 系列)

```
1-Button(默认)
Button(onClick = { }) {
    Text("Confirm")
}

2-OutlinedButton
OutlinedButton(onClick = { }) {
    Text("Cancel")
}

3-TextButton
TextButton(onClick = { }) {
    Text("Skip")
}

4-IconButton
IconButton(onClick = { }) {
    Icon(Icons.Default.Favorite, contentDescription = null)
}

5-禁用状态
Button(
    onClick = { },
    enabled = false
) {
    Text("Disabled")
}
```

### 3.5 输入组件(TextField)

```
1-基础输入框
@Composable
fun InputDemo() {
    var text by remember { mutableStateOf("") }

    TextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Username") }
    )
}

2-OutlinedTextField(更常用)
OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    placeholder = { Text("请输入内容") }
)

3-密码输入
OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    visualTransformation = PasswordVisualTransformation()
)

4-键盘类型
OutlinedTextField(
    value = phone,
    onValueChange = { phone = it },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Phone
    )
)
```

### 3.6 提示与反馈组件

```
1-Snackbar（基础）
val snackbarHostState = remember { SnackbarHostState() }

LaunchedEffect(Unit) {
    snackbarHostState.showSnackbar("操作成功")
}

SnackbarHost(hostState = snackbarHostState)

2-Tooltip(Desktop/Web常见)
TooltipArea(tooltip = { Text("提示信息") }) {
    Icon(Icons.Default.Info, contentDescription = null)
}
```

### 3.7 分割与装饰组件

```
1-Divider
Divider(
    thickness = 1.dp,
    color = Color.LightGray
)
```

## 四 组合使用示例(实战)

```
@Composable
fun UserItem(name: String,onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(16.dp)
    ) {
        Image(
            painter = painterResource("avatar.png"),
            contentDescription = null,
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
        )

        Spacer(Modifier.width(12.dp))

        Text(
            text = name,
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium
        )
    }
}
```

## 五 基本组件设计规范

### 5.1 推荐

```
1、说明
-单一职责
-参数即状态
-尽量 Stateless

2、示例
@Composable
fun Title(text: String)
```

### 5.2 不推荐

```
在组件内请求网络
在组件内直接访问数据库
在组件内创建 ViewModel
```

