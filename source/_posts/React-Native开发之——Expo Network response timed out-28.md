---
title: React Native开发之——Expo Network response timed out(28)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
  - Expo
abbrlink: 2e43690c
date: 2023-10-20 11:48:03
---
## 一 错误现象

执行如下指令后，界面效果如下

```
npx expo start
```

![][1]

<!--more-->

## 二 解决办法

### 2.1 添加环境变量(不是必须)

1-通过如下指令，查看本机ip地址

```
ipconfig
```

2-添加系统变量REACT_NATIVE_PACKAGER_HOSTNAME

```
REACT_NATIVE_PACKAGER_HOSTNAME:192.168.1.12
```

### 2.2 将19000 和19001端口添加到防火墙入站规则

1-打开高级安全Windows Defender防火墙

![][2]

2-选择左侧的`入站规则`，操作选择`新建规则`，规则类型选择`端口`

![][3]

3-分别添加`TCP`和`UDP`规则，端口号填写`19000,19001`

![][4]

## 三 执行结果

1-执行`npx exop start`执行，终端显示正常

![][5]

2-手机端界面正常显示
![][6]

## 四 参考
* [Stack overflow——React native expo - Reponse timed out](https://stackoverflow.com/questions/45759758/react-native-expo-reponse-timed-out)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-expo-01-error-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-expo-01-error-open-fire.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-expo-01-error-fire-in-new.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-expo-01-error-fire-port.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-expo-01-error-cmd-restart.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rn/rn-expo-01-error-phone-view.png

