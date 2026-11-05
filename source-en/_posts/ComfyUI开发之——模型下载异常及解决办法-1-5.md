---
title: ComfyUI开发之——模型下载异常及解决办法(1.5)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 2e26ad9c
date: 2026-11-04 19:26:45
---
## 一 Comfy启动异常

```
从Github/Comfy-Org/ComfyUI下载并启动后，启动模板。
启动后，显示异常：显示错误。点击详情。调整错误。显示缺失模型。
从此页面下载模型可能无法直接下载或错误。HTTP 403 Forbidden
```

<!--more-->

## 二 错误原因分析

### 2.1 原因 1：HuggingFace 海外 CDN 地域封禁（最常见）

```
HuggingFace 的模型 CDN 会对国内 IP 直接返回 403，
仓库本身是公开不需要授权，只是 IP 地区拦截，不是模型 gated 权限问题。
```

### 2.2 原因 2：高频下载触发限流、UA 校验

```
短时间多次拉取大文件、ComfyUI 自动下载工具缺少合法 User-Agent，
CDN 判定为爬虫，直接 403 拦截。
```

### 2.3 原因 3：网络代理 / 梯子异常

```
代理 IP 被 HF 拉黑；或者代理没有完整转发请求头，CDN 校验失败返回 403。
```

### 2.4 原因 4：本地 HF Token 无效

```
如果在代码 /huggingface-cli 里填了错误、过期 token，也会 403；
Z-Image Turbo 不需要同意协议、不需要申请权限，这点和 Llama 不一样。
```

## 三 解决方案

### 3.1 方案 1：hf-mirror 镜像（推荐，不用魔法）

把链接域名 `huggingface.co` 替换成 `hf-mirror.com`

```
替换前：https://huggingface.co/Comfy-Org/z_image_turbo/resolve/main/split_files/diffusion_models/z_image_turbo_bf16.safetensors

替换后：https://hf-mirror.com/Comfy-Org/z_image_turbo/resolve/main/split_files/diffusion_models/z_image_turbo_bf16.safetensors

浏览器打开直接下载，也可以用这个链接填进 ComfyUI 模型下载器。
```

### 3.2 方案 2：魔搭 ModelScope 国内镜像

```
去 modelscope：https://www.modelscope.cn/models 

搜索 `Comfy-Org/z_image_turbo`，
魔搭国内服务器，速度稳定，同样可以找到 `z_image_turbo_bf16.safetensors`
```

## 四 模型存放位置

### 4.1 查找位置

```
工作流总览——>节点——>Model Links
```

### 4.2 存放结构(minimax_h3为例)

```
📂 ComfyUI/
├── 📂 models/
│   ├── 📂 vae/
│   │   ├── minimax_h3_video_vae_fp16.safetensors
│   │   └── minimax_h3_audio_vae_fp32.safetensors
│   ├── 📂 diffusion_models/
│   │   └── minimax_h3_fl2va_pruned_int8_convrot.safetensors
│   ├── 📂 text_encoders/
│   │   └── qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors
│   ├── 📂 loras/
│   │   └── minimax_h3_fl2v_turbo_8step_v1.0_comfyui_bf16.safetensors
│   └── 📂 embeddings/
│       └── minimaxh3_art_is_explosion.safetensors
```

说明：

```
下载后将model存放到对应位置
```

## 五 最终效果

```
将model存放到对应位置。重新刷新页面。
没有错误提示，项目可正常运行
```

