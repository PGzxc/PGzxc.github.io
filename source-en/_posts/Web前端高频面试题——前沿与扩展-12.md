---
title: Web前端高频面试题——前沿与扩展(12)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 4858406c
date: 2025-10-29 09:46:43
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
1.微前端：qiankun(基于路由的微前端框架)、Module Federation(Webpack的模块联邦机制)
2.React Server Components(RSC)
3.WebAssembly 应用
4.WebGPU 与 Three.js 可视化
5.Edge Functions(边缘计算)
6.AI 与前端结合：Chat UI、AI SDK 调用
7.低代码平台：原理与实现
8.跨端技术：React Native、Flutter、Taro、uni-app、Tauri、Electron
9.发展趋势：大屏可视化、数据交互、Web3、AI 驱动前端
```

### 三 面试题解答(仅供参考)

### 3.1 微前端

1、什么是微前端？解决了什么问题？

```
1、概念
微前端将大型单体前端应用拆分为多个独立开发、部署、运行的子应用。

2、解决的问题：
-巨石应用痛点：代码维护复杂、协作效率低、技术栈升级困难。
-团队自治：支持独立开发与部署，技术栈自由。
-示例：蚂蚁金服的 Qiankun 支持 2000+ 应用集成。
```

2、Qiankun 的核心原理与沙箱隔离

```
1、原理：
基于 single-spa，通过 HTML Entry 动态加载子应用，管理生命周期（bootstrap、mount、unmount）。

2、沙箱隔离：
 -JS 隔离：快照沙箱（复制全局状态，适合老应用）或 Proxy 沙箱（ES6 Proxy 劫持，隔离 window）。
 -样式隔离：Scoped CSS 或 Shadow DOM 限制样式作用域。
3、通信：全局状态（如 Redux）、postMessage 或自定义 EventBus。
4、判断环境：子应用通过 window.__POWERED_BY_QIANKUN__ 检测运行环境。
```

3、Module Federation 的作用与配置

```
1、定义：Webpack 5 的动态模块共享机制，支持运行时加载和复用模块。

2、配置：

// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      exposes: { './Button': './src/Button' },
      remotes: { app2: 'app2@http://localhost:3001/remoteEntry.js' },
      shared: { react: { singleton: true } }
    })
  ]
};


3、优势：避免重复打包，共享依赖（如 React 单例）。
4、问题解决：版本冲突通过 shared 配置统一依赖。
```

4、Qiankun vs Module Federation

```
Qiankun：应用级集成，适合遗留系统，需改造子应用生命周期，跨技术栈兼容性强。
Module Federation：模块级共享，运行时性能优，适合现代 JS 生态，技术栈需较统一。
```

### 3.2 RSC

1、RSC 是什么？与 SSR 的区别？

```
RSC：React 18+ 的服务器端组件，仅在服务端渲染，不发送到客户端，零 JS 开销，支持直接访问数据库或文件。
SSR：服务端渲染完整 HTML，客户端需 Hydration 重渲染。
```

2、与 SSR 的区别？

|   特性   |         RSC         |        SSR         |
| :------: | :-----------------: | :----------------: |
| 渲染位置 | 服务端 + 客户端混合 |  服务端渲染 HTML   |
| 状态管理 | React 内置流式协议  | 通常需要 Hydration |
| JS 体积  |        减少         |        全量        |

3、RSC 的实现与协作

```
实现：文件名后缀 .server.js 标记 Server Component，.client.js 或 'use client' 标记 Client Component。

// server.js
async function ServerComp() {
  const data = await db.query();
  return <ClientComp data={data} />;
}


协作：RSC 作为父组件通过 props 传递数据给 Client Component，Client Component 不可直接导入 RSC。
优势：减少客户端 Bundle、支持流式渲染（Suspense）、SEO 友好。
限制：无交互（useState/useEffect）、需异步、数据需序列化。
```

### 3.3 WebAssembly 应用

1、Wasm 是什么？优势与场景

```
定义：低级字节码，编译自 C++/Rust，接近原生性能。
优势：高性能（JIT 编译）、小体积（二进制）、安全（沙箱）。
场景：游戏（Unity）、图像/视频处理（FFmpeg.wasm）、科学计算、AI 推理（ONNX Runtime Web）。
```

2、Wasm如何与JS集成？

```
1、加载：
const wasm = await WebAssembly.instantiateStreaming(fetch('module.wasm'), importObject);
wasm.instance.exports.run();

2、内存共享：通过 WebAssembly.Memory 实现 JS 与 Wasm 数据交互。
3、关系：Wasm 专注计算密集任务，JS 负责 UI 和交互。
```

### 3.4 可视化

1、WebGPU是什么？与WebGL区别？

```
WebGPU：新一代 GPU API，支持计算/图形管线，性能更高，接近 Vulkan/Metal。
WebGL：基于 OpenGL ES，性能较低，管线灵活性差。
优势：WebGPU 支持多线程、Compute Shader，调试更友好。
```

2、如何用Three.js实现WebGPU可视化？

```
1、实现：

import * as THREE from 'three/webgpu';
const renderer = new THREE.WebGPURenderer();
renderer.render(scene, camera);


2、优化：使用 Compute Shaders 处理粒子/纹理，HMR 支持，兼容 WebGL 回退。
3、场景：3D 可视化、AR、游戏。
```

3、大规模数据可视化

```
1、优化：
-Instancing 批量渲染。
-Shader 在 GPU 执行复杂逻辑。
-LOD（细节层次）动态加载模型。
-内存管理：及时释放几何体/纹理。

2、工具：ECharts GL、Deck.gl、Babylon.js。
```

### 3.5 边缘计算

1、Edge Functions是什么？

```
定义：在 CDN 边缘节点（如 Vercel Edge Runtime）运行的无服务器函数，靠近用户。
优势：低延迟（10-50ms）、全球分布、自动伸缩。
场景：实时数据处理（IoT）、A/B 测试、个性化渲染。
```

2、实现与限制

```
1、实现：

// Next.js Edge Function
export const runtime = 'edge';
export async function GET(req) {
  return new Response('Hello Edge');
}

2、限制：无 Node.js API（如 fs）、资源有限（CPU/内存）、无持久状态。
```


### 3.7 AI 与前端结合

1、AI Chat UI 实现

```
1、技术：Vercel AI SDK 的 useChat Hook，流式渲染（streamText）。

import { useChat } from 'ai/react';
const { messages, input, handleInputChange, handleSubmit } = useChat();

2、持久化：通过 onFinish 回调保存消息到数据库，initialMessages 恢复。
```

2、安全调用 AI SDK

```
注意：API Key 需放在后端或 Edge Functions，前端通过接口间接调用。
流式响应：使用 SSE/WebSocket + TextDecoder 实现“打字机”效果。
```

3、应用方向

```
AI Copilot（代码生成、Figma 插件）。
智能表单（自然语言生成 UI）。
语音/图像交互（Web Speech、Vision API）。
```

### 3.7 低代码平台

1、核心原理

```
1、组成：
-可视化编辑器：拖拽式组件树管理。
-DSL（JSON Schema）：描述 UI 和逻辑。
-渲染引擎：解析 Schema 动态生成 DOM。
-插件机制：支持组件扩展。

2、实现：
如 amis，通过 Schema 递归渲染，事件绑定实现联动。
```

2、优势与限制

```
优势：快速开发、非码用户友好。
限制：复杂逻辑需自定义 JS，递归渲染性能有限。
跨框架：JSON Schema + 适配层（如 Vue createApp、React createElement）。
```
### 3.8 跨端技术

1、跨端技术对比

|     技术     |         原理         |       优点       |  适用场景  |
| :----------: | :------------------: | :--------------: | :--------: |
| React Native | JS Bridge + 原生组件 | 生态丰富、热重载 |   移动端   |
|   Flutter    |   Dart + Skia 自绘   | 高性能、一致性强 |   跨平台   |
| Taro/uni-app |   编译为小程序/H5    |   一套代码多端   |   小程序   |
|    Tauri     |    Rust + WebView    |    轻量、安全    |   桌面端   |
|   Electron   |  Node.js + Chromium  |     功能强大     | 重桌面应用 |

2、核心原理与挑战

```
Taro/uni-app：DSL 编译为多端代码（如 WXML/AXML），条件编译适配平台差异。
挑战：API 差异、桥接性能开销，需原生模块或条件编译解决。
```

### 3.9 发展趋势

1、大屏可视化

```
技术：Three.js、ECharts GL、WebGPU、Cesium。
优化：实时数据（WebSocket/SSE）、GPU 加速、响应式布局（vw/rem）。
```

2、数据交互

```
趋势：从 REST 到 GraphQL/WebSocket，PWA 支持离线。
BFF 模式：如 GraphQL、tRPC 优化后端接口。
```

3、Web3前端集成？

```
技术：ethers.js、Wagmi（钱包/合约交互）、IPFS（去中心化存储）。
挑战：Gas 费用、签名复杂性。
```

4、AI驱动前端？

```
1、方向：
-代码生成（Copilot）。
-图稿转代码（设计稿生成组件）。
-智能测试与 AIGC（内容生成）。

2、趋势：
RSC + AI 数据获取，自动化前端开发流程。
```
