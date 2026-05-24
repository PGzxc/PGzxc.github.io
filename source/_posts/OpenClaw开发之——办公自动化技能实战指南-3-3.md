---
title: OpenClaw开发之——办公自动化技能实战指南(3.3)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: 7c956d6
date: 2026-05-24 10:40:56
---
## 一 概述

```
本文介绍：
 1. 文件处理（本地 / NAS / 下载目录）
 2. 文档处理（Excel / PDF / 文本）
 3. 通讯集成（飞书 / 邮件 / Webhook）
```

<!--more-->

## 二 安装命令

### 2.1 查看当前已支持的技能

```
openclaw skills list
```

### 2.2 搜索技能和安装

```
1. 搜索
npx clawhub search file

2. 找真实名字
3. 安装
npx clawhub install xxx
```

### 2.3 安装办公自动化三大核心技能

```
一、安装流程

1.1、搜索技能
npx clawhub search file
npx clawhub search office
npx clawhub search email

1.2、找到真实存在的 skill 名（slug）

1.3、安装
npx clawhub install <skill-name>

二、示例
clawhub install file-auto-organizer 
clawhub install chinese-office-automation
clawhub install email-mail-master
```

## 三 技能详解

### 3.1 文件能力

```
一、安装技能
clawhub install file-auto-organizer 

二、功能介绍
1.自动整理下载目录、桌面、文档文件夹
2.支持按类型、日期、项目名称分类
3.支持格式转换（PDF↔Word、图片压缩等）

三、推荐方案
1.使用 Prompt + 系统命令实现
2.使用脚本（bat / shell / python）
3.Skill 作为增强能力（可选）
4.本质：文件自动化 ≠ 安装一个 skill

四、案例(示例)—整理下载目录
4.1、输入：
帮我整理下载目录的文件，按类型分类

4.2、OpenClaw 输出（示例）：

分类方案：
- 图片 → Images/
- 视频 → Videos/
- 文档 → Docs/
- 压缩包 → Archives/

4.3、并给出执行脚本（Windows）：

mkdir Images,Videos,Docs,Archives

move *.jpg Images
move *.png Images
move *.mp4 Videos
move *.pdf Docs
move *.zip Archives

4.4、实际效果：
-可直接执行
-无需额外 skill
```

### 3.2 办公效率引擎

```
一、安装技能
clawhub install chinese-office-automation

二、功能介绍
1.自动生成周报、月报、会议纪要
2.提取Excel数据生成图表和分析报告
3.支持模板化输出（飞书文档、企业微信、邮件）

三、推荐方案
1.使用 Prompt + 系统命令实现
2.使用脚本（bat / shell / python）
3.Skill 作为增强能力（可选）
4.本质：自动化 ≠ 安装一个 skill

四、案例(示例)—Excel 数据分析
4.1、输入：分析 data.xlsx 的销售额，并给出趋势

4.2、实际执行方式：
-OpenClaw 分析逻辑
-输出公式 / 处理步骤
-或生成 Python 代码

4.3、示例输出：

import pandas as pd
df = pd.read_excel("data.xlsx")
print(df["销售额"].sum())
```

### 3.3 通讯集成

```
一、安装技能
feishu_chat
feishu_doc
feishu_drive
feishu_bitable

二、能力
-接收消息
-发送结果
-文档交互
-表格操作

三、功能介绍
1.自动分类邮件（重要/待办/订阅/垃圾）
2.提取关键信息并生成总结
3.支持智能回复和定时推送

四、推荐方案
1.使用 Prompt + 系统命令实现
2.使用脚本（bat / shell / python）
3.Skill 作为增强能力（可选）
4.本质：自动化 ≠ 安装一个 skill

五、案例(示例)—飞书自动汇报
5.1、输入：
每天整理数据并发到飞书

5.2、实际流程：
-OpenClaw 生成脚本
-定时执行
-调用 feishu_chat 发送
```


