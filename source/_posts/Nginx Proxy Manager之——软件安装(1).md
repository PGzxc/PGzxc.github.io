---
title: Nginx Proxy Manager之——软件安装(1)
categories:
  - 开发
  - G-后端开发
  - Nginx Proxy Manager
tags:
  - Nginx Proxy Manager
abbrlink: 46fe5329
date: 2024-08-25 09:20:52
---
## 一 概述

* 当前环境
* 创建docker-compose.yml文件
* 安装Nginx
* 登录UI

<!--more-->

## 二 当前环境(已安装Docker Desktop)

当前信息

* 系统：windows 11专业版 版本号：23H2
* Docker version： 27.0.3, build 7d4bcd8(docker -v)
* Docker Compose version：v2.28.1-desktop.1(docker-compose -v)

图示

![][1]

## 三 创建docker-compose.yml文件

1-创建文件夹并在文件夹下创建docker-compose.yml文件

![][3]

2-docker-compose.yml文件中填入如下内容

```
services:
  app:
    image: 'docker.io/jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

## 四 安装Nginx

### 4.1 Docker中已有镜像

![][2]

### 4.2 打开终端并运行

运行指令

```
docker-compose up -d
```

效果图

![][4]

### 4.3 Docker中UI

1-Docker->Images镜像

![][5]

2-Docker->Containers新添容器

![][6]

## 五 登录UI

1-打开nginx，点击图示打开WebUI或输入`http://localhost:81`

![][7]

2-打开网页后界面如图

输入默认用户名和密码

```
Email:    admin@example.com
Password: changeme
```

图示

![][8]

3-登陆后主界面

![][9]

## 六 参考

* [Github-nginx-proxy-manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
* [与 Nginx Proxy Manager 配合使用](https://docs.halo.run/getting-started/install/other/nginxproxymanager/)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-info-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-images-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-create-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-run-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-images-nginx-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-container-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-nginx-run-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-nginx-login-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-docker/nginx-1-docker-webui-view-9.png