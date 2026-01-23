---
title: Android开发之——Google系统服务删除后恢复
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Google服务
abbrlink: 271f0f03
date: 2024-02-26 22:21:09
---
## 一 现象

通过如何指令删除系统应用后，出现Google应用市场闪退。Google服务无法访问的问题

```
adb shell pm uninstall --user 0 'com.google.android.gsf' //Google Service Framework
adb shell pm uninstall --user 0 'com.google.android.gms' //Google Play Service
```

<!--more-->

## 二 进行尝试

| 1-市场下载apk | 2-安装器 |
| :-----------: | :------: |
|    ![][1]     |  ![][2]  |

## 三  解决办法(重新安装删除应用)

### 3.1 重新安装指令

```
adb shell pm uninstall --user 0 'com.google.android.gsf'
adb shell pm uninstall --user 0 'com.google.android.gms'
```

### 3.2 解决后

| 安装器-解决前 | 安装器-解决后 |
| :-----------: | :-----------: |
|    ![][3]     |    ![][4]     |

## 四 参考

* [stackexchange-Reinstall app removed via ADB](https://android.stackexchange.com/questions/208176/reinstall-app-removed-via-adb)]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-google-service-apk-compat-error.jpg
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-google-service-apk-sign-error.jpg
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-google-service-goinstall-issue.jpg
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-google-service-goinstall-ok.jpg

