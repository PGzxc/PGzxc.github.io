---
title: VPN之—Cloudflare Zero Trust使用教程
categories:
  - 工具
  - VPN
tags:
  - VPN
abbrlink: 6e9bbe31
date: 2024-04-06 11:33:40
---
### 一 准备工作(三方登录)

* AppleID或Google账号—三方账号
* 邮箱

<!--more-->

### 二 Zero Trust账号

1. Cloudflare WARP+与Cloudflare `Zero Trust`使用相同的客户端
2. Cloudflare的`Zero Trust`来进行进行企业级连接
3. WARP+无法保证100%成功，Zero Trust是可用的
4. Zero Trust最多可以支持50台设备

### 二 账号注册及配置

1.登录Cloudflare网站—https://dash.cloudflare.com/login

![][1]

2-点击注册，使用邮箱注册账号

演示图片

![][2]

账户信息

```
电子邮件：
密码：
```

3-验证邮箱后，登录账户，点击左侧的菜单栏Zero Trust

![][3]

4-然后需要输入你的`team name`，我们随便取一个名字，比如`pgzxc`

![][4]

5-选择免费计划

| 选择方案 |  提交  |
| :------: | :----: |
|  ![][5]  | ![][6] |

6-退出当前页面，返回主界面

![][7]



### 三 创建设备注册策略

1—点击Zero Trust，点击 `My Team`->`Devices`

![][8]

2-点击`Connect a device`，进入到第一个步骤`Create an enrollment policy`(如下图，填写邮箱的后缀如`@qq.com`)

| enrollment policy |  email  |
| :---------------: | :-----: |
|      ![][9]       | ![][10] |

3-安装对应的应用到设备上

![][11]

### 四 Winddws端登录Zero Trust账号

#### 4.1 登录账户

1-应用安装完成后，点击设置—>偏好设置——>账户，登录`Cloudflare Zero Trust`，输入团队名

![][12]

2-输入团队名后，点击确定跳转浏览器，输入接入用户邮箱

![][13]

3-发送验证码，去邮箱查看验证码，并输入

![][14]

4-验证码成功后，点击`打开Cloudflare WARP`或`Open Cloudflare WARP`跳转后应用

![][15]

5-授权成功后，应用显示``ZERO TRUST`

![][16]6-设置—>偏好设置——>账户，显示Zero Trust账户信息

![][17]

#### 4.2 开启VPN及访问

1-向右滑动，稍等片刻，显示已链接，表示已接入互联网

![]][18]

2-打开网页，输入要访问的网站，如[pinterest](https://www.pinterest.com/)即可访问

![][19]

#### 4.3 关闭VPN

点击按钮，切换到如图所示状态

![][20]

### 五 安卓端登录Zero Trust账号(iPhone端-同)

| 1-打开应用 | 2-输入邮箱 | 3-验证密码 | 4-打开VPN | 5--访问应用 |
| :--------: | :--------: | :--------: | :-------: | :---------: |
|  ![][21]   |  ![][22]   |  ![][23]   |  ![][24]  |   ![][25]   |

## 六 参考

* [官网地址](https://one.one.one.one/)
* [Cloudflare WARP无限流量MacOS](https://blog.csdn.net/tianclll/article/details/132346001)
* [Cloudflare WARP白嫖无限流量VPN](https://www.techxiaofei.com/post/vpn/warp/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-website.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-register-email.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-left-trust.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-team-name.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-plan-free.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-plan-free-pay.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-plan-pay-back.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices-policy.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices-policy-email.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices-install.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices-teamname.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices-teamname-login.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-devices-teamname-code.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-open-warp.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-open-zero-trust.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-zero-account.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-connected.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-connected-vist.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-myteam-connect-close.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-ios-close.jpg
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-ios-email.jpg
[23]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-ios-code.jpg
[24]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-ios-begin.jpg
[25]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vpn/vpn-zero-ios-vist.jpg