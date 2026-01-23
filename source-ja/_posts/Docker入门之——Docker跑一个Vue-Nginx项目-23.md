---
title: Docker入门之——Docker跑一个Vue&Nginx项目(23)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: b78dc5e3
date: 2025-07-29 09:41:11
---
## 一 基本流程概览

1、本地使用 `npm run build` 构建 Vue 项目（或用 Docker 构建）
2、使用 多阶段构建 Dockerfile 生成生产镜像
3、镜像中用 Nginx 运行 `/dist` 内容
4、本地或服务器运行容器

<!--more-->

## 二 使用Vite快速创建Vue项目

### 2.1 创建指令

```
npm create vite@latest my-vue-app -- --template vue
```

### 2.2 项目结构

```
my-vue-app/
├── Dockerfile
├── nginx.conf             # 可选：自定义 Nginx 配置
├── package.json
├── vue.config.js          # 如果需要设置 publicPath
├── public/
├── src/
└── ...
```

## 三 Dockerfile 示例(推荐：多阶段构建)

```
# 阶段一：构建 Vue 项目
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 阶段二：Nginx 容器部署静态文件
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# 可选：自定义 nginx 配置
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 四 可选 nginx.conf(支持 history 模式的路由)

```
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

把它保存为 `nginx.conf`，然后加上

```
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## 五 构建镜像

### 5.1 构建指令(项目目录下执行)

```
docker build -t vue-nginx-app .
```

### 5.2 构建图示

![][1]

## 六 运行容器

```
docker run -d -p 8080:80 vue-nginx-app

浏览器访问：http://localhost:8080 就能访问你的 Vue 应用了！
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-docker/docker-23-build-view-1.png

