---
title: Windows应用之——Win禁用或更新
categories:
  - 系统
  - Windows
tags:
  - Windows
abbrlink: b937a7c0
date: 2025-09-11 10:37:49
---
## 一 概述

```
本文介绍：
 -禁用 Windows 更新
 -恢复 Windows 更新
```

<!--more-->

## 二 禁用 Windows 更新(多种方法，选其一即可)

### 2.1 方法1：通过服务禁用(适用于所有版本)

```
-按 Win + R 输入 services.msc 打开「服务」窗口
-找到 Windows Update 服务，双击打开属性
-在「启动类型」中选择 禁用，点击「停止」（若服务正在运行）
-点击「应用」→「确定」
-同样操作禁用 Background Intelligent Transfer Service (BITS)（更新依赖的后台传输服务）
```

### 2.2 方法2：通过组策略禁用(仅专业版 / 企业版)

```
-按 Win + R 输入 gpedit.msc 打开组策略编辑器
-依次展开：计算机配置 > 管理模板 > Windows组件 > Windows更新 > 管理最终用户体验
-双击右侧「配置自动更新」，选择 已禁用，点击「确定」
```

### 2.3 方法3：通过注册表禁用(所有版本，谨慎操作)

```
-按 Win + R 输入 regedit 打开注册表编辑器（需管理员权限）
-定位到路径：
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU
（若路径不存在，右键逐级新建项：WindowsUpdate → AU）
-在右侧右键新建 DWORD (32 位) 值，命名为 NoAutoUpdate
-双击该值，将「数值数据」改为 1（1 = 禁用，0 = 启用），点击「确定」
-重启电脑生效
```

## 三 删除已下载的更新文件

```
1、确保已按上述方法停止「Windows Update」和「BITS」服务（关键步骤，否则文件可能被占用）
2、打开文件资源管理器，进入路径：
C:\Windows\SoftwareDistribution\Download
3、全选该文件夹内的所有文件（按 Ctrl + A），右键删除（无需删除 Download 文件夹本身）
4、（可选）删除系统更新缓存的其他位置：
C:\Windows\System32\catroot2 文件夹内的文件（保留文件夹）
```

## 四 恢复 Windows 更新

```
若需重新启用更新，按对应方法反向操作：

-服务：将「启动类型」改回「自动」并启动服务
-组策略：将「配置自动更新」改回「未配置」或「已启用」
-注册表：将 NoAutoUpdate 的值改为 0 或删除该键值
```

