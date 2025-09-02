---
title: WinForm开发之——Inno Setup打包应用
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 7da0d692
date: 2025-09-02 09:14:43
---
## 一 概述

```
本文介绍：Inno Setup 打包应用流程
```

<!--more-->

## 二 下载与安装

```
官网地址：http://www.jrsoftware.org/isinfo.php
安装好 Inno Setup Compiler（会带有脚本编辑器和编译器）
```

## 三 准备应用文件

```
假设你的应用目录是：D:\MyApp\release\
 -MyApp.exe（主程序）
 -config\（配置文件目录）
 -assets\（资源目录）
```

## 四 基础脚本示例（.iss 文件）

```
1、你可以新建一个 setup.iss 文件

2、内容如下
; Inno Setup 脚本示例
[Setup]
AppName=MyApp
AppVersion=1.0.0
DefaultDirName={pf}\MyApp
DefaultGroupName=MyApp
OutputDir=output
OutputBaseFilename=MyAppSetup
Compression=lzma
SolidCompression=yes

[Languages]
Name: "chinesesimplified"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "D:\MyApp\release\MyApp.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\MyApp\release\config\*"; DestDir: "{app}\config"; Flags: recursesubdirs ignoreversion
Source: "D:\MyApp\release\assets\*"; DestDir: "{app}\assets"; Flags: recursesubdirs ignoreversion

[Icons]
Name: "{group}\MyApp"; Filename: "{app}\MyApp.exe"
Name: "{commondesktop}\MyApp"; Filename: "{app}\MyApp.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "在桌面创建快捷方式"; GroupDescription: "额外选项"; Flags: unchecked

[Run]
Filename: "{app}\MyApp.exe"; Description: "运行 MyApp"; Flags: nowait postinstall skipifsilent
```

## 五 编译安装包

```
打开 Inno Setup Compiler
加载 setup.iss 脚本
点击 Compile
会生成 output\MyAppSetup.exe
```

## 六 常见扩展功能

```
添加 .NET/VC 运行库检测：在 [Run] 或 [Code] 部分写检测逻辑
自定义皮肤 UI：可用 Inno Script Studio：https://www.kymoto.org/products/inno-script-studio
多语言安装：在 [Languages] 添加多种语言 .isl 文件
```

