---
title: new-api开发之——new-api安装与部署(2)
categories:
  - AI
  - AI模型
  - 模型调用
  - new-api
tags:
  - new-api
abbrlink: 11a6971d
date: 2026-04-01 17:18:04
---
## 一 概述

```
本文介绍：
 - 从 0 到可用，10 分钟跑起来 + 生产级部署建议
```

<!--more-->

## 二 项目部署前

### 2.1 部署方式选择

1-New API 支持多种部署方式

|      方式      | 难度  |   推荐   |
| :------------: | :---: | :------: |
| Docker Compose | 1颗星 | 强烈推荐 |
|  源码编译(Go)  | 3颗星 |   进阶   |
|   二进制运行   | 2颗星 |   一般   |
|   Kubernetes   | 4颗星 |  企业级  |

2-本教程采用

```
Docker Compose（最简单 & 最稳定）
```

### 2.2 环境准备

1-必备环境

```
1.必备环境:
Docker >= 20.x
Docker Compose >= v2

2.检查:
docker -v
docker compose version
```

2-推荐服务器配置:

|  场景  |   配置   |
| :----: | :------: |
|  测试  |  1核 1G  |
| 小规模 |  2核 4G  |
| 商业化 | 4核 8G + |

## 三 部署流程

### 3.1 获取项目

```
官方仓库：
GitHub 上搜索 Calcium-Ion/new-api

git clone https://github.com/Calcium-Ion/new-api.git
cd new-api
```

### 3.2 一键启动(最核心步骤)

```
1.部署指令
docker-compose up -d

2.启动完成后访问：
http://localhost:3000

3.验证是否成功
docker ps

看到类似：
new-api
redis
mysql（可选）

说明成功
```

### 3.3 目录结构解析

```
1.目录结构:
new-api/
├── data/        # 数据目录（最重要）
├── web/         # 前端
├── docker-compose.yml
├── main.go      # 后端入口

2.重点：data 目录(所有数据都在这里)：
-用户
-Token
-渠道
-配置

3.强烈建议(生产环境):
volumes:
  - ./data:/app/data
  
否则：容器删除 = 数据全丢  
```

### 3.4 默认账号 & 初始化

```
1.首次启动：
系统会自动创建 管理员账号

2.打开后台后：
第一件事：修改密码！！！
```

## 四 相关配置

### 4.1 环境变量配置(核心)-在docker-compose.yml中配置

1-必备参数

```
environment:
  - SESSION_SECRET=your_session_secret
  - CRYPTO_SECRET=your_crypto_secret
```

2-说明:

|      参数      |    作用    |
| :------------: | :--------: |
| SESSION_SECRET | 登录态加密 |
| CRYPTO_SECRET  |  数据加密  |

3-重要提示:

```
1.多实例部署必须一致：
A服务器 = SECRET1
B服务器 = SECRET1

2.否则：
登录失效 / Token 异常
```

### 4.2 Redis 配置(推荐)

```
1.配置
- REDIS_CONN_STRING=redis://redis:6379

2.作用：
-缓存
-提升性能
-降低数据库压力
```

### 4.3 数据库选择(重要)

1-默认:

```
SQLite（内置）
```

2-生产环境建议

|   数据库   | 推荐 |
| :--------: | :--: |
|   MySQL    | 推荐 |
| PostgreSQL | 推荐 |

3-示例(MySQL)

```
- SQL_DSN=root:password@tcp(mysql:3306)/newapi4-为什么不用 SQLite？
```

4-为什么不用 SQLite？

|  SQLite  |    问题    |
| :------: | :--------: |
|  单文件  |   并发差   |
|  无扩展  | 不适合商业 |
| 容易损坏 |   风险高   |

### 4.4 端口与访问

```
1.默认端口：
3000

2.自定义端口
ports:
  - "8080:3000"

3.访问：
http://服务器IP:8080
```

### 4.5 Nginx 反向代理(生产必备)

```
1.推荐使用：
Nginx

2.示例配置：
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

3.推荐升级
-HTTPS（SSL）
-CDN 加速
-WAF 防护
```

### 4.6 API 测试(是否真正可用)

```
1.启动后可以测试：
curl http://localhost:3000/v1/models

2.返回模型列表说明：
API 网关已正常工作
```

### 4.7 常见 Docker 操作

```
1.查看日志
docker logs -f new-api

2.重启服务
docker-compose restart

3.停止服务
docker-compose down
```

## 五 常见问题

### 5.1 无法访问后台

```
1.原因：
-端口未开放
-防火墙拦截

2.解决：
ufw allow 3000
```

### 5.2 数据丢失

```
1.原因：
未挂载 /data

2.解决：
必须做 volume 挂载
```

### 5.3 登录失效

```
原因：
SECRET 不一致
```

### 5.4 API 调用失败

```
原因：
未添加渠道
```

### 5.5 Redis 连接失败

```
检查：
docker ps
```

## 六 生产架构(进阶)

### 6.1 生产架构

```
        CDN
         ↓
      Nginx
         ↓
     New API（多实例）
      ↓        ↓
   Redis     MySQL
```

### 6.2 优势

```
-高可用
-可扩展
-支持高并发
-商业化稳定运行
```

## 七 总结

### 7.1 完成

```
成功部署 New API
理解核心目录结构
配置基本环境变量
掌握 Docker 运维命令
```

### 7.2 注意事项

```
/data 一定要持久化
生产必须用 MySQL + Redis
SECRET 必须固定
```

