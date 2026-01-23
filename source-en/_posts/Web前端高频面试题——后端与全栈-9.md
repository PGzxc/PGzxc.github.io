---
title: Web前端高频面试题——后端与全栈(9)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 8ca562e0
date: 2025-10-27 09:05:38
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.Node.js 框架：Express、Koa、NestJS、HonoJS
2.SSR/全栈框架：Next.js、Nuxt.js
3.BFF 模式：Backend For Frontend
4.模板引擎：Handlebars、Jade
5.部署与运维：Nginx、CDN、Docker
6.自动化：CI/CD 流程
```

### 三 面试题解答(仅供参考)

### 3.1 .Node.js 框架

#### 框架对比

|  框架   |           主要特点            |               优势               |           缺点           |         适用场景         |
| :-----: | :---------------------------: | :------------------------------: | :----------------------: | :----------------------: |
| Express |  轻量、基于回调、丰富中间件   |         生态成熟、上手快         |  功能固定、异步处理稍弱  |    快速开发、简单 API    |
|   Koa   | 模块化、async/await、ctx 封装 |        异步优雅、灵活性高        | 无内置中间件、需手动组合 |   现代化开发、复杂逻辑   |
| NestJS  | TypeScript、模块化、依赖注入  | 结构清晰、适合企业级、支持微服务 |     学习曲线陡、稍重     | 中大型项目、类型安全需求 |
| HonoJS  |   超轻量、边缘计算、跨平台    | 高性能、无依赖、适合 Serverless  |    生态较新、功能有限    |    轻量 API、边缘计算    |

#### 高频面试题
1、Express 和 Koa 的主要区别？

```
1、Express：
基于回调，内置中间件(如路由、HTTP 工具)，req/res 继承 Node.js 原生对象，生态成熟，适合快速开发。

2、Koa：
由 Express 团队开发，基于async/await，核心极简，ctx3、封装request/response，异步处理优雅，适合复杂逻辑。

3、总结：
Express 上手快，Koa 更现代、灵活。
```

2、NestJS 的核心概念？

```
受 Angular 启发，基于 TypeScript，

核心包括：
-模块（Module）：划分功能边界。
-控制器（Controller）：处理请求/响应。
-服务（Service）：业务逻辑，可注入。
-其他：Pipe（验证）、Guard（权限）、Interceptor（拦截）。
-适合中大型项目，支持微服务和 GraphQL，结构清晰。
```

3、HonoJS 的优势及适用场景？

```
超轻量（几十 KB），高性能，支持 Cloudflare Workers/Deno/Bun/Node.js，API 类似 Express/Koa。
适合边缘计算、轻量 BFF 或高性能 API。
```

4、Express 中间件与 Koa 的区别？

```
-Express：通过 app.use() 按序处理请求（如日志、认证），基于回调。
-Koa：中间件用 async/await，支持更灵活的请求/响应控制和错误处理。
-总结：Koa 组合性更强，Express 简单直观。
```

5、何时选择 NestJS 而非 HonoJS？

```
NestJS：适合复杂、类型安全的企业级应用，内置测试/验证，适合全栈开发。
HonoJS：适合轻量、高性能 API，特别是在 Serverless 或边缘计算场景。
```

### 3.2 SSR/全栈框架

#### 渲染模式对比

| 模式 |      渲染时机      |         优点         |       缺点       |
| :--: | :----------------: | :------------------: | :--------------: |
| SSR  |  服务器生成 HTML   |    首屏快，利 SEO    |   服务器压力大   |
| SSG  |    构建时预渲染    | 速度快、服务器负担轻 |    数据非实时    |
| CSR  |  浏览器加载后渲染  |      动态交互强      | 首屏慢、不利 SEO |
| ISR  | 定期增量更新静态页 |   兼顾速度与实时性   |    配置稍复杂    |

#### 高频面试题

1、Next.js 的 SSR 与 SSG 的区别？

```
-SSR：通过 getServerSideProps 动态渲染，适合个性化内容。
-SSG：通过 getStaticProps 构建时预渲染，速度快，适合静态内容。
-其他：getStaticPaths 处理动态路由，Next.js 13+ 的 App Router 使用Server Components减少客户端 JS。
```

2、Nuxt.js 与 Next.js 相比如何？

```
-Nuxt.js(Vue 基)：自动路由(基于文件结构)、内置模块(如 @nuxtjs/sitemap)、SSR/SSG 简单配置，适合Vue生态。
-Next.js(React 基)：功能类似，但更灵活，App Router 优化性能，适合 React 开发者。
-总结：Nuxt.js 配置更简单，Next.js 生态更强。
```

3、Next.js 的数据获取策略？

```
-SSG：getStaticProps（构建时）。
-SSR：getServerSideProps（请求时）。
-CSR：useEffect 等 hooks（客户端）。
-ISR：增量静态再生，定期更新。
-App Router 强调 Server Components，提升效率。
```

4、如何优化 Next.js/Nuxt.js 的 SEO 和性能？

```
-SEO：Nuxt.js 自动元标签/站点地图，Next.js 用 <Head> 管理。
-性能：用 ISR、代码分割、图片优化（Next.js Image 组件）、缓存，结合 Lighthouse 监控 SSR 开销。-
```

### 3.3 BFF 模式

1、什么是 Backend for Frontend（BFF）？为何使用？

```
BFF 为每个前端（Web/App）定制后端，聚合微服务数据，适配 UI 需求。

优势：减少过量数据获取，提升用户体验，解耦前后端。
适用：多客户端（如 iOS/Web）需不同数据结构。
```

2、BFF 与 API 网关的区别？

```
API 网关：集中路由和安全，服务所有客户端。
BFF：针对特定客户端，处理数据编排/转换。
总结：BFF 定制 UI 逻辑，网关负责共享功能（如认证）。
```

3、BFF 的技术栈和实践要点？

```
1、技术栈：
Node.js + Express/Koa/NestJS/Hono，GraphQL 或 gRPC/REST 混合。

2、要点：
-拦截/缓存（Redis）。
-鉴权/安全（JWT/OAuth）。
-接口聚合/防抖优化。
-与前端类型联动（如 TypeScript DTO）。
```

4、BFF 的挑战是什么？

```
多 BFF 导致逻辑重复、维护成本高。
可通过共享库或按体验类型用单一 BFF 缓解
```

### 3.4 模板引擎

#### 模板引擎对比

|    引擎    |           特点            |          优势          |        缺点        |
| :--------: | :-----------------------: | :--------------------: | :----------------: |
| Handlebars | Mustache 语法，无逻辑模板 | 安全（防 XSS）、易上手 |      功能简单      |
| Pug (Jade) | 缩进语法、支持 mixin/条件 |   代码简洁、布局灵活   | 缩进敏感、学习曲线 |

#### 高频面试题

1、模板引擎的作用？

```
动态生成 HTML，结合数据与模板，常用于 SSR 场景（如 Express 渲染页面）。
```

2、Handlebars 如何工作？

```
使用 {{variable}} 语法，编译为函数插入数据，支持 helpers/partials，适合复用和安全性高的模板。
```

3、Pug 与 Handlebars 的区别？

```
Pug：缩进语法，代码简洁，支持 mixin/条件，适合复杂布局。
Handlebars：基于标签，防 XSS 强，适合熟悉 HTML 的团队。
总结：Pug 更简洁但缩进敏感，Handlebars 安全易用。
```

4、如何在 Express 集成 Pug？

```
设置 app.set('view engine', 'pug')，
用 res.render('template', {data}) 渲染，Pug 编译 .pug 文件为 HTML。
```

### 3.5 部署与运维

1、Nginx 如何作为 Node.js 反向代理？

```
Nginx 处理静态文件、负载均衡、SSL，通过 upstream 代理动态请求到 Node.js，提升安全性和性能。
用途：URL 重写、SPA history 模式、HTTPS 配置。
```

2、CDN 在 Node.js 部署中的作用？

```
全球缓存静态资源，降低延迟，减轻服务器压力。结合 Cloudflare 等服务，设置缓存头优化。
```

3、如何容器化 Node.js 应用（Docker）？

```
Dockerfile：FROM node, 复制代码，RUN npm install，CMD 启动。
优化：多阶段构建减小镜像体积，确保跨环境一致性。
```

4、如何用 Docker 和 Nginx 扩展 Node.js 应用？

```
用 Docker Compose 容器化，Nginx 实现负载均衡，结合 Kubernetes 自动扩展。
```

### 3.6 自动化

1、什么是 CI/CD 流水线？为何使用？

```
CI（持续集成）：自动构建/测试代码。
CD（持续部署/交付）：自动发布到测试/生产环境。
好处：加快发布、减少错误、提高质量。
```

2、Node.js 的典型 CI/CD 流程？

```
代码推送 → GitHub Actions/Jenkins 运行 lint/测试 → 
构建 Docker 镜像 → 通过测试后部署到 staging/production。

测试用 Jest/Vitest。
```

3、如何处理 CI/CD 失败？

```
配置通知（Slack/邮件）、回滚脚本、人工审批阶段，结合 Sentry 监控运行时错误。
```

4、常用 CI/CD 工具？

```
GitHub Actions：简单，与 GitHub 集成。
Jenkins：高度可定制，适合复杂管道。
CircleCI：速度快，易用。
结合 Docker 实现容器化部署。
```

## 四 总结

|     类别      |          技术          |               核心考点               |
| :-----------: | :--------------------: | :----------------------------------: |
| Node.js 框架  | Express/Koa/Nest/Hono  | 中间件、依赖注入、异步模型、性能优化 |
| SSR 全栈框架  |   Next.js / Nuxt.js    | SSR/SSG/ISR、App Router、Nitro 引擎  |
|      BFF      |  Backend for Frontend  |    数据聚合、多端适配、安全与性能    |
|   模板引擎    |    Handlebars / Pug    |      模板语法、渲染性能、安全性      |
|   部署运维    |  Nginx / Docker / CDN  |      反向代理、容器化、缓存加速      |
| 自动化(CI/CD) | GitHub Actions/Jenkins |      构建/测试/部署、回滚与监控      |

