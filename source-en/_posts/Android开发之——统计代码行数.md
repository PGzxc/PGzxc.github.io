---
title: Android开发之——统计代码行数
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 9a977d76
date: 2021-11-30 16:14:04
---
## 一 概述

本文介紹安卓项目統計代码行数的方法：

* `statistic`插件统计代码行数
* git项目下统计代码行数

<!--more-->

## 二 `statistic`插件统计代码行数

### 2.1 `statistic`插件安裝

依次点击：File——>Settings——>Plugins——>搜索`statistic`
![][1]

### 2.2 `statistic`使用

点击底部的`statistic`按钮，打开`statistic`窗口
![][2]

点击`Refresh`按钮，执行代码分析，执行完毕后页面图
![][3]

点击`java`、`kt`，`xml`可看到对应了类型文件的行数
![][4]

## 三 git项目下统计代码行数(git版本管理)

### 3.1 本地项目代码行数(所有文件)

```
git ls-files | xargs wc -l
```

统计结果

```
16127 total
```

### 3.2 Git统计每个人提交代码行数

执行代码

```
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

统计结果

```
user1     added lines: 8640, removed lines: 1095, total lines: 7545
user2     added lines: 1, removed lines: 0, total lines: 1
user3     added lines: 9328, removed lines: 639, total lines: 8689
```

### 3.3 项目总行数

执行代码

```
git log  --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'
```

统计结果

```
added lines: 17969, removed lines: 1734, total lines: 16235
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-code-lines-statistic-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-code-lines-bottom-staticstic.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-code-line-statics-overview.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-code-lines-statistic-java.png

