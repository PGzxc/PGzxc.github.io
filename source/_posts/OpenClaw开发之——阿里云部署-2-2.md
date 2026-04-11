---
title: OpenClaw开发之——阿里云部署(2.2)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: a30d3398
date: 2026-04-11 09:22:00
---
## 一 概述

```
本文介绍：
 1.阿里云部署介绍
 2.阿里云部署步骤
```

<!--more-->

## 二 阿里云部署介绍

### 2.1 阿里云部署(长期运行首选，新手易上手)

```
阿里云为2026版OpenClaw打造了专属一键部署方案，
通过预置镜像、简化流程设计，彻底打破技术门槛，
无需用户掌握编程技能，同时提供手动部署与Docker部署两种方式，适配不同需求。
```

### 2.2 一键脚本部署(新手首选，5分钟完成)

```
适配阿里云轻量应用服务器特性，脚本自动优化系统配置、安装依赖并启动服务，无需手动干预，新手快速上手。
```

## 三 阿里云部署步骤

### 3.1 第1步

打开访问阿里云OpenClaw一键部署专题页面，找到并点击【一键购买并部署】。

| ![][1] | ![][2] | ![][3] |
| ------ | ------ | ------ |
| ![][4] | ![][5] |        |

### 3.2 第二步

```
打开选购阿里云轻量应用服务器，配置参考如下：

-镜像：OpenClaw(Moltbot)镜像（已经购买服务器的用户可以重置系统重新选择镜像）
-实例：内存必须2GiB及以上。
-地域：默认美国（弗吉尼亚），目前中国内地域（除香港）的轻量应用服务器，联网搜索功能受限。
-时长：根据自己的需求及预算选择。
```

图示

| ![][6] | ![][7] |
| :----: | :----: |
| ![][8] |        |

### 3.3 第3步

```
1-打开访问阿里云百炼大模型控制台，找到密钥管理，单击创建API-Key。
```

![][9]

```
2-前往轻量应用服务器控制台，找到安装好OpenClaw的实例，
进入「应用详情」放行18789端口、配置百炼API-Key、执行命令，生成访问OpenClaw的Token。


-端口放通：需要放通对应端口的防火墙，单击一键放通即可。
-配置百炼API-Key，单击一键配置，输入百炼的API-Key。单击执行命令，写入API-Key。
-配置OpenClaw：单击执行命令，生成访问OpenClaw的Token。
-访问控制页面：单击打开网站页面可进入OpenClaw对话页面。
```

![][10]

```
3-阿里云百炼Coding Plan 配置教程：
创建API-Key，推荐访问订阅阿里云百炼Coding Plan，阿里云百炼Coding Plan每天两场抢购活动，
从按tokens计费升级为按次收费，可以进一步节省费用！
```

![][11]

```
4-购买后，在控制台生成API Key。注：这里复制并保存好你的API Key，后面要用。
```

![][12]

```
5-回到轻量应用服务器-控制台，单击服务器卡片中的实例 ID，进入服务器概览页。
```

![][13]

```
6-在服务器概览页面单击应用详情页签，进入服务器详情页面。
```

![][14]

```
7-端口放通在OpenClaw使用步骤区域中，单击端口放通下的执行命令，可开放获取OpenClaw 服务运行端口的防火墙。
```

![][15]

```
8-这里系统会列出我们第一步中创建的阿里云百炼 Coding Plan的API Key，直接选择就可以
```

![][16]

```
9-获取访问地址单击访问 Web UI 面板下的执行命令，获取 OpenClaw WebUI 的地址。
```

![][17]
![][18]

## 四 总结

### 4.1 服务器选购与基础配置

```
1.访问阿里云轻量应用服务器控制台，选择“Ubuntu 22.04 LTS”系统镜像；

2.核心配置：
2vCPU+4GiB内存+40GiB ESSD+200Mbps带宽，
地域优先选择中国香港（免备案）或华东1（杭州），
付费类型选“包年包月”；

3.提交订单后，
记录服务器公网IP、默认登录账号（root）与密码，在阿里云控制台“安全组”中，
一键放行22（SSH远程端口）、18789（OpenClaw核心端口）、443（API调用端口）。
```

### 4.2 一键部署操作(通过FinalShell远程连接服务器)

```
# 1. SSH连接服务器（替换为你的服务器公网IP，按提示输入密码）
ssh root@你的服务器公网IP

# 2. 执行阿里云专属一键部署脚本（国内优化版，自动处理依赖与配置）
curl -fsSL https://openclaw.ai/aliyun-install.sh | bash

# 3. 按向导完成核心配置（新手直接按默认选择，无需修改）
# 关键步骤提示：
# 1. 风险提示：按左方向键选择Yes，回车确认
# 2. 绑定地址：0.0.0.0:18789（默认，支持远程访问）
# 3. 模型选择：暂时选择“Custom Provider”（后续配置阿里云百炼API）
# 4. 通讯平台：选择Skip for now（后续按需添加）
# 5. 技能配置：选择No（后续单独安装核心技能）
# 6. 认证设置：自动生成访问令牌（Token），复制保存好，登录Web控制台需用

# 4. 验证部署与开机自启（确保服务器重启后服务不中断）
systemctl status openclaw  # 显示active(running)即为服务正常
systemctl enable openclaw  # 设置开机自启
curl http://127.0.0.1:18789/api/v1/health  # 返回healthy即为部署成功
```

### 4.3 远程访问验证

```
1.打开浏览器，
输入http://服务器公网IP:18789，粘贴之前保存的访问令牌，能正常进入OpenClaw Web控制台，即为部署成功；

2.控制台可直观查看服务状态、配置技能、发送指令，新手可先熟悉界面布局。
```

## 五 参考

* [开发者社区/OpenClaw保姆级部署](https://developer.aliyun.com/article/1716721)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-1-open.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-2-apply.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-3-service.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-4-plan.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-5-config.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-6-demo.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-7-use.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-8-model.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-9-key.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-10-token.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-11-api-plan.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-12-keep.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-13-id.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-14-detail.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-15-port.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-16-apikey.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-17-url.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/openclaw-2-aliyun-18-run.png