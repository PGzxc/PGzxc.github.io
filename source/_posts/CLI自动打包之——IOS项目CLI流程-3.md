---
title: CLI自动打包之——IOS项目CLI流程(3)
categories:
  - 运维
  - 自动化
  - CLI
tags:
  - Github
abbrlink: a3db180c
date: 2025-08-02 13:05:15
---
## 一 概述

```
使用 fastlane 自动打包 .ipa

然后使用GitHub Action的softprops/action-gh-release插件
将.ipa上传到对应的 tag下的 Release Assets 中
```

<!--more-->

## 二 已完成工作

```
1、配置好了 Fastlane 的 build lane，

2、并能在本地成功运行 fastlane build 输出 .ipa 文件
```

## 三 ios-build.yml

### 3.1 位置

```
.github/workflows/ios-build.yml 
```

### 3.2 Workflow内容

```
name: Build iOS IPA

on:
  push:
    tags:
      - 'v*'  # 监听以 v 开头的 tag，比如 v1.0.0

permissions:
  contents: write  # ✅ 允许上传 Release 资源

jobs:
  build:
    name: Build and Upload IPA
    runs-on: macos-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Ruby and Fastlane
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.1

      - name: Install Fastlane
        run: gem install fastlane  # ✅ 建议不要再装 bundler，除非你用 Gemfile

      - name: Install CocoaPods & Dependencies
        run: |
          brew install cocoapods
          pod install

      - name: Build IPA using Fastlane
        run: fastlane build  # 确保你本地能生成 ./build/WanAndroid_SwiftUI.ipa

      - name: Upload IPA to GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: ./build/WanAndroid_SwiftUI.ipa
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3.3 构建结果(失败)

```
[16:15:52]: ⬆️  Check out the few lines of raw `xcodebuild` output above for potential hints on how to solve this error
[16:15:52]: 📋  For the complete and more detailed error log, check the full log at:
[16:15:52]: 📋  /Users/runner/Library/Logs/gym/WanAndroid_SwiftUI-WanAndroid_SwiftUI.log
[16:15:52]: 
[16:15:52]: Looks like fastlane ran into a build/archive error with your project
[16:15:52]: It's hard to tell what's causing the error, so we wrote some guides on how
[16:15:52]: to troubleshoot build and signing issues: https://docs.fastlane.tools/codesigning/getting-started/
[16:15:52]: Before submitting an issue on GitHub, please follow the guide above and make
[16:15:52]: sure your project is set up correctly.
[16:15:52]: fastlane uses `xcodebuild` commands to generate your binary, you can see the
[16:15:52]: the full commands printed out in yellow in the above log.
[16:15:52]: Make sure to inspect the output above, as usually you'll find more error information there
[16:15:52]: 
+------------------------------+
|         Lane Context         |
+------------------+-----------+
| DEFAULT_PLATFORM | ios       |
| PLATFORM_NAME    | ios       |
| LANE_NAME        | ios build |
+------------------+-----------+
[16:15:52]: Called from Fastfile at line 21
[16:15:52]: ```
[16:15:52]:     19:	  desc "Build IPA"
[16:15:52]:     20:	  lane :build do
[16:15:52]:  => 21:	    gym(
[16:15:52]:     22:	      workspace: "WanAndroid_SwiftUI.xcworkspace",
[16:15:52]:     23:	      scheme: "WanAndroid_SwiftUI",
[16:15:52]: ```
[16:15:52]: Error building the application - see the log above
```

## 四 Release时上传文件

| 1-上传ipa | 2-显示TAG ipa |
| :-------: | :-----------: |
|  ![][1]   |    ![][2]     |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-7-ios-tag-update-ipa-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-7-ios-tag-update-ipa-show-2.png