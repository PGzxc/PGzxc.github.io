---
title: NAS入门之——My Cloud EX2通过Docker安装Jellyfin(17)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: 97a5030
date: 2025-07-23 08:16:03
---
## 一 概述

```
尝试了多种方式，由于官方并未提供Jellyfin服务，最后尝试通过Docker安装Jellyfin，
由于并未找到适合EX2架构的Jellyfin镜像失败了，本文仅介绍操作过程

- EX2 安装Docker(21.04.06)
- 通过MobaXterm通过SSH连接EX2
- 下载jellyfin镜像
- Docker 安装Jellyfin
- 容器相关操作
```

<!--more-->

## 二 EX2 安装Docker(21.04.06)

### 2.1 下载Docker

```
Github-JediNite/wdpksrc:https://github.com/JediNite/wdpksrc
```

### 2.2 安装Docker

![][1]

## 三 通过MobaXterm通过SSH连接EX2

### 3.1 打开MobaXterm，通过SSH连接

![][2]

### 3.2 输入用户名和密码登录

```
用户名：sshd(EX2专有)
密码：你的登录密码
```

## 四 下载jellyfin镜像

### 4.1 思路说明

1、说明

```
由于NAS EX2无法访问：https://registry-1.docker.io/v2，
所以方案为：从电脑Docker下载镜像导出为tar并在NAS EX2上导入使用
```

2、SSH连接后通过如下指令查看EX2架构

```
uname -a
ldd --version

内核版本：Linux 4.14.22，基于 Armada 处理器架构
架构：armv7l（32 位 ARM）
显示armv7l，NAS是基于ARMv7架构，可以使用armhof版本的jellyfin镜像
```

### 4.2 Docker.Desktop打包流程

1、更换国内源daocloud(配置 DaoCloud 镜像加速)

```
"registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://mirror.sjtu.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://hub.atomgit.com"
  ]
```

2、拉ARMv7取镜像

```
docker pull m.daocloud.io/docker.io/linuxserver/jellyfin:arm32v7-10.8.10-1-ls209
```

3、查看image镜像

```
docker images
```

4、导出为.tar格式并压缩

4-1、切换到保存的路径(比如D盘)

```
cd D:\
```

4-2、导出镜像为tar包

```
1、使用Image ID 
docker save -o jellyfin-arm32v7.tar 4c959deba081

2、使用完整名

docker save -o jellyfin-arm32v7.tar m.daocloud.io/docker.io/linuxserver/jellyfin:arm32v7-10.8.10-1-ls209
```

5、压缩为.tar.gz(可以不压缩)

```
1、压缩为zip

Compress-Archive -Path jellyfin-arm32v7.tar -DestinationPath jellyfin-arm32v7.zip

2、如果安装7-zip
# 如果你已安装 7-Zip，并配置了环境变量
7z a jellyfin-arm32v7.tar.gz jellyfin-arm32v7.tar
```

### 4.3 将Jellyfin tar文件拖到MobaXterm的/mnt/HD/HD_a2/下

```
1、登录
用户名：sshd
密码：输入登录密码

2、切换到HD_a2目录下
cd /mnt/HD/HD_a2/
```

### 4.4 导入Jellyfin镜像(此步骤后面通过脚本实现)

```
1、如果是压缩包，先解压
gunzip jellyfin-arm32v7.tar.gz

4、导入镜像
docker load -i jellyfin-arm32v7.tar
```

## 五 Docker 安装Jellyfin

### 5.1 Jellyfin启动脚本(start-jellyfin.sh)

此脚本使用本地的上传Jellyfin镜像包

```
#!/bin/bash

# 镜像 tar 包路径，请确认此路径下有你的镜像包
IMAGE_TAR="/mnt/HD/HD_a2/jellyfin-arm32v7.tar"

# 镜像最终名字和标签（完整名）
IMAGE_NAME="m.daocloud.io/docker.io/linuxserver/jellyfin:arm32v7-latest"

echo "开始导入镜像：$IMAGE_TAR"
docker load -i "$IMAGE_TAR"
if [ $? -ne 0 ]; then
  echo "镜像导入失败，请确认文件路径和权限。"
  exit 1
fi

# 获取刚导入镜像的 ID（取最近导入）
IMAGE_ID=$(docker images --format "{{.ID}} {{.Repository}}:{{.Tag}}" | grep "<none>" | head -n1 | awk '{print $1}')
if [ -n "$IMAGE_ID" ]; then
  echo "发现未命名镜像 ID：$IMAGE_ID，开始打标签为 $IMAGE_NAME"
  docker tag "$IMAGE_ID" "$IMAGE_NAME"
else
  echo "无未命名镜像，假设镜像已经存在。"
fi

# 删除旧容器（如有）
docker rm -f jellyfin 2>/dev/null

# 自动获取当前用户和组 ID
USER_ID=$(id -u)
GROUP_ID=$(id -g)

# 创建目录（如不存在）
mkdir -p /mnt/HD/HD_a2/jellyfin/config
mkdir -p /mnt/HD/HD_a2/jellyfin/cache
mkdir -p /mnt/HD/HD_a2/media/movies
mkdir -p /mnt/HD/HD_a2/media/tvshows
mkdir -p /mnt/HD/HD_a2/media/music
mkdir -p /mnt/HD/HD_a2/media/photos

echo "启动 Jellyfin 容器..."

docker run -d \
  --name jellyfin \
  -u $USER_ID:$GROUP_ID \
  -e TZ="Asia/Shanghai" \
  -e PUID=$USER_ID \
  -e PGID=$GROUP_ID \
  -p 8099:8096 \
  -p 8922:8920 \
  -p 7399:7359/udp \
  -p 1999:1900/udp \
  -v /mnt/HD/HD_a2/jellyfin/config:/config \
  -v /mnt/HD/HD_a2/jellyfin/cache:/cache \
  -v /mnt/HD/HD_a2/media/movies:/media/movies \
  -v /mnt/HD/HD_a2/media/tvshows:/media/tvshows \
  -v /mnt/HD/HD_a2/media/music:/media/music \
  -v /mnt/HD/HD_a2/media/photos:/media/photos \
  --restart unless-stopped \
  "$IMAGE_NAME"

if [ $? -eq 0 ]; then
  echo "Jellyfin 容器启动成功，访问 http://<NAS-IP>:8099"
else
  echo "启动失败，请检查日志。"
fi
```

### 5.2 执行操作

```
1、用 dos2unix 转换脚本格式
dos2unix /mnt/HD/HD_a2/start-jellyfin.sh

2、赋予可执行权限(chmod或执行右键赋予)
chmod +x /mnt/HD/HD_a2/start-jellyfin.sh

3、运行脚本启动容器
./start-jellyfin.sh
```

操作图示

| 赋予权限 | ![][3] |
| :------: | :----: |
| 执行脚本 | ![][4] |

## 六 容器相关操作

### 6.1 删除image

```
1、查看现有镜像
docker images  # 查看本地所有镜像

2、删除单个镜像
docker rmi 1234567890ab  # 删除指定ID的镜像

3、删除所有未使用的镜像
docker image prune
```

### 6.2 查看当前运行容器

```
1、查看正在运行的容器
docker ps

2、查看所有容器（包括已停止的）
docker ps -a

3、查看容器详细信息
docker inspect jellyfin

4、查看容器日志
docker logs jellyfin

5、实时监控容器资源使用情况
docker stats
```

### 6.3 启动已创建容器

```
docker start jellyfin
```

## 6.4 删除jellyfin

```
docker stop jellyfin
docker rm jellyfin
```

### 6.5 运行指令

```
bash /mnt/HD/HD_a2/start-jellyfin.sh
```

### 6.6 查看是否正常

```
curl http://localhost:8099
curl http://127.0.0.1:8099
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-jellyfin-docker-install-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-jellyfin-ssh-login-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-jellyfin-permission-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-jellyfin-start-4.png


