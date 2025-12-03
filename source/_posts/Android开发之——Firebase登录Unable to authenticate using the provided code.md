---
title: Android开发之——Firebase登录Unable to authenticate using the provided code
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Flutter
  - Firebase
abbrlink: 438b38f6
date: 2024-07-21 17:25:45
---
## 一 现象

![][1]

<!--more-->

## 二 失败执行操作

### 2.1 登录执行操作

```
firebase login --no-localhost
```

### 2.2 过程

```
C:\Windows\System32>firebase login --no-localhost
i  Firebase optionally collects CLI and Emulator Suite usage and error reporting information to help improve our products. Data is collected in accordance with Google's privacy policy (https://policies.google.com/privacy) and is not used to identify you.

? Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? Yes
i  To change your data collection preference at any time, run `firebase logout` and log in again.

To sign in to the Firebase CLI:

1. Take note of your session ID:

   7A37D

2. Visit the URL below on any device and follow the instructions to get your code:

   https://auth.firebase.tools/login?code_challenge=sWABTevakNKBH18PQQn6dOxJZZGPmNQhXKd2wTD7fqU&session=7a37d6e0-5ca9-4b61-9a78-52c76c6eea7d&attest=rcOimxwekhIpwkp-X-N6QHrmTlpKjy9k4EusfgwEJyo

3. Paste or enter the authorization code below once you have it:

? Enter authorization code: 4/0AcvDMrAwp0pvskSfVOhoonFIAUWhynIA2VjNFsGydyrP_v3MBMAuYSxaXzSjPyffnlL5qw

Error: Unable to authenticate using the provided code. Please try again.
```

## 三 通过代理执行过程

### 3.1 添加代理

```
C:\Windows\System32>set HTTP_PROXY=http://127.0.0.1:7890
C:\Windows\System32>set HTTPS_PROXY=http://127.0.0.1:7890
```

说明：

* 在cmd终端中执行上诉操作
* `http://127.0.0.1:7890`为Clash对应端口，其他根据软件切换即可

图例

![][2]

### 3.2 执行firebase  login

1-执行登录指令

```
firebase  login
```

2-执行过程

![][3]

3-网页显示登录成功

![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-firebase-login-error-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-firebase-login-set-proxy-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-firebase-login-cmd-success-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-firebase-login-web-success-4.png