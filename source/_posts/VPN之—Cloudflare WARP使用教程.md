---
title: VPN之—Cloudflare WARP使用教程
categories:
  - 工具
  - VPN
tags:
  - VPN
abbrlink: c7a4c44a
date: 2024-04-06 11:25:11
---
### 一 准备工作

* AppleID或Google账号—三方账号
* Telegram(电报)——获取密钥

<!--more-->

### 二 Warp官网及客户端下载(支持)

官网地址：

1. [1.1.1.1](https://1.1.1.1/)
2. [one.one.one.one](https://one.one.one.one/)

官网视图

![][00]

客户端：

1. Windows端
2. 安卓端
3. iPhone端
4. mac端
5. Linux

### 三 使用Telegram获得密钥

![][01]

说明：

```
1-我们使用Telegram电报搜索generatewarpplusbot，找到这个机器人，点击开始，然后点击/generate
2-它要求我们订阅两个群组，这个直接订阅就行，后面再取消订阅就好了
3-然后再次点击/generate，可能会要求我们做一个小学一年级的加减乘除，直接输入/generate空格然后加减乘除的结果就行，就会给我们生成密钥
```

生成的密钥：

```
别人的-7Ko0V93b-2JM9bd71-6cNu12b3
```

### 四 Windows端使用教程

#### 4.1 配置密钥

1-软件安装完成后，右下角点击此软件

![][02]

2-在此软件上，右键选择设置图标

![][03]

3-点击之后，弹出的窗口，选择`偏好设置`

![][04]

4-打开偏好设置窗口，切换到账户选项(此时是默认密钥，没有流量，无法使用)

![][05]

5-点击右侧的`使用其他密钥`，将Telegram电报生成的密钥填入

![][06]

6-点击确定，显示剩余数据和可用设备，表示登录成功(如图，已授权window，iPad，安卓)

![][07]

#### 4.2 开启VPN及访问

1-在软件上，点击此按钮，开启VPN

![][08]

2-等待片刻，显示如图所示，表示网络已链接

![][09]

#### 4.3 关闭VPN(向左滑动，关闭VPN)

![][08]

### 五 iPhone端使用教程

#### 5.1 配置密钥

1-打开软件，点击右上角三个横杠，打开如图所示

![][10]

2-点击账户，打开设置页面

![][11]

3-点击按键管理，替换密钥为Telegram密钥

![][12]

#### 5.2 开启VPN及访问

![][13]

#### 5.3 关闭VPN(向左滑动，关闭VPN-禁用)

![][14]

### 六 参考

* [Cloudflare WARP白嫖无限流量VPN](https://www.techxiaofei.com/post/vpn/warp/)
* [官网地址](https://one.one.one.one/)




[00]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-website.png
[01]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-telegram-generate.png
[02]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-choice.png
[03]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-cloudflare-setting.png
[04]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-cloudflare-preference.png
[05]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-account-default.png
[06]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-account-key-set.png
[07]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-account-login-data.png
[08]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-toggle-begin.png
[09]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-connected.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-ios-setting.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-ios-account.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-ios-account-change.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-ios-begin.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-wrap-ios-end.png


