---
title: Android开发之——nowinAndroid项目tools模块(12)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: c7faaeaf
date: 2025-09-26 17:06:20
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下tools模块
 -模块剖析:tools
```

<!--more-->

## 二 项目结构

```
tools/
 ├── setup.sh
 └── pre-push.sh
```

## 三 核心职责说明

### 3.1 setup.sh

```
1、主要作用
-开发环境初始化脚本：在开发者第一次 clone 项目后运行，帮助自动配置必要的环境。

2、典型功能

2-1、安装 Git Hooks
-将 tools/pre-push.sh 安装到 .git/hooks/pre-push。
-确保 push 前会执行检查。

2-2、设置执行权限
-自动执行 chmod +x tools/*.sh，避免 Linux/macOS 下报 Permission denied。

2-3、准备配置文件
-复制模板配置，例如 secrets.defaults.properties → secrets.properties，让开发者填写 API Key 等。

2-4、提示依赖检查
-检查 JDK、Android SDK、Gradle 等开发环境是否可用。
```

### 3.2 pre-push.sh

```
1、主要作用
-Git pre-push hook 脚本：在执行 git push 之前触发，阻止不合格代码推送。

2、典型功能

2-1、代码格式检查
-调用 ./gradlew spotlessCheck（或其他格式化工具）。

2-2、Lint 检查
-调用 ./gradlew lint 确保代码规范。

2-3、单元测试
-调用 ./gradlew test，避免未通过测试的代码进入远程仓库。

2-4、阻止 Push
-如果任何检查失败，脚本会终止 push，开发者需要修复后再试。
```

## 四 使用流程

```
1、开发者 clone 项目后运行：
./tools/setup.sh
这会安装 pre-push hook，并初始化必要配置。

2、开发者在写代码后执行
git push
pre-push.sh 会自动运行检查，保证代码质量
```

## 五 常见问题

```
1、权限问题
clone 下来后脚本可能没有执行权限，需要
chmod +x tools/setup.sh tools/pre-push.sh

2、跨平台兼容
-Windows 上直接运行 .sh 会有问题，需要 Git Bash 或 WSL

3、效率问题
如果 pre-push.sh 检查太多内容，会导致 push 变慢
```

## 六 总结

|    文件     |                  作用                   |                    关键点                    |
| :---------: | :-------------------------------------: | :------------------------------------------: |
|  setup.sh   |     初始化开发环境，安装 git hooks      |        主要在项目 clone 后第一次运行         |
| pre-push.sh | Git push 前自动检查(格式 / lint / 测试) | 保证提交代码质量，阻止不合格代码进入远程仓库 |

