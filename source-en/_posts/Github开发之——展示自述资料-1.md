---
title: Github开发之——展示自述资料(1)
categories:
  - 开发
  - I-版本控制
  - Github
tags:
  - Github
abbrlink: d6a7f1b1
date: 2020-12-09 09:53:54
---
## 一 概述

* 创建与用户名同名的仓库
* 编辑README.md

<!--more-->

## 二 创建与用户名同名的仓库

```
1、登录你的 GitHub 账号
2、点击右上角 ➕ → New repository

3、填写：
-Repository name：必须与你的 GitHub 用户名完全一致（大小写敏感）
-Description（可选）：比如“个人简介”
-勾选 "Add a README file"

4、创建完成后，你会看到一个默认的 README.md 文件，自动展示在你的 GitHub 首页上
```

## 三 编辑README.md

### 3.1 熟悉Markdown语法

```
1、标题与层级
2、文本样式：加粗、斜体、删除线
3、列表与引用
4、代码与分割
5、表格与对齐方式：使用`|`分割列，`:-`左对齐，`-:`右对齐，`:-:`居中
```

### 3.2 编辑README项目

1、项目地址

```
https://rahuldkjain.github.io/gh-profile-readme-generator/
```

2、如何使用

2-1 编辑标题

![][1]

2-2 编辑社交信息(GitHub必填)

![][2]

2-3 选择Add-one

![][3]

2-4 点击`Generate`生成Readme文件

![][4]

2-5 跳转预览界面

![][5]

### 3.3 将readme-generator生成文件替换项目下的Readme

## 四 参考Readme文件

```
# 👋 Hi, I'm 你的用户名!

- 🔭 I’m currently working on Android / HarmonyOS projects
- 🌱 I’m exploring Flutter / SwiftUI / AI side-projects
- 💬 Ask me about mobile development, fullstack or Docker on NAS
- 📫 How to reach me: [your email] / [your blog]
- ⚡ Fun fact: I love learning & building across platforms!

## 🛠️ Tech Stack
![Android](https://img.shields.io/badge/-Android-3DDC84?logo=android&logoColor=white)
![Flutter](https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white)
![HarmonyOS](https://img.shields.io/badge/-HarmonyOS-000000?logo=huawei&logoColor=white)
...

## 📈 GitHub Stats
![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=你的用户名&show_icons=true&theme=radical)

## 🧠 Top Skills
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=你的用户名&layout=compact)
```

## 五 参考

* [gh-profile-readme-generator](https://rahuldkjain.github.io/gh-profile-readme-generator/)
* [Github文档——设置个人资料](https://docs.github.com/zh/get-started/start-your-journey/setting-up-your-profile#next-steps)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-profile-info-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-profile-social-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-profile-addone-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-profile-generate-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-profile-preview-5.png