---
title: AI开发之——学习路线
categories:
  - AI
  - AI图谱
  - AI路线图
tags:
  - AI路线图
abbrlink: d65c22de
date: 2026-04-06 21:27:21
---
##  概述

```
本文介绍：
 - AI学习路线
 - 从基础理论 到模型框架部署 再到 工具应用和产品
```

<!--more-->

## 一、AI基础理论(最浅层：先理解核心概念与原理)

### 1.1 机器学习基础
```
- 自然语言处理（NLP）
- 机器学习（Machine Learning）
- 深度学习（Deep Learning）
- 神经网络（Neural Network）
- 监督学习（Supervised Learning）
- 无监督学习（Unsupervised Learning）
- 强化学习（Reinforcement Learning）
```

### 1.2 神经网络结构
```
- 卷积神经网络（CNN）
- 循环神经网络（RNN）
- Transformer
- 混合专家模型（MoE / Mixture of Experts）
- 注意力机制（Attention）
- 自注意力机制（Self Attention）
- 交叉注意力（Cross Attention）
```

### 1.3 模型训练
```
- 预训练(Pretraining)
- 微调(Fine-tuning)
- 指令微调(Instruction Tuning)
- 监督微调(SFT（Supervised Fine-Tuning）)
- 基于人类反馈的强化学习(RLHF)
- 基于 AI 反馈的强化学习(RLAIF)
- 直接偏好优化(DPO，2026主流替代RLHF）)
- 参数高效微调(PEFT)
- 低秩适配(LoRA)
- 量化版 LoRA(QLoRA)
```

### 1.4 模型优化
```
- 知识蒸馏（Knowledge Distillation / 蒸馏）
- 模型剪枝（Pruning）
- 模型量化（Quantization）
- 模型压缩（Model Compression）
- Sparsity / MoE稀疏激活（DeepSeek、Mixtral、Qwen核心技术）
```

## 二、LLM基础技术(从基础模型到使用技巧)

### 2.1 LLM概念
```
- 基础模型（Foundation Model）
- 大模型 / 大语言模型（Large Language Model / LLM）
- 多模态大模型（Multimodal Model）
- 推理大模型（Reasoning Model）
- 思考模式（Thinking Model / Test-time Compute / Thinking Modes）
- 模型（通用概念）
```

### 2.2 Prompt工程
```
- 提示词(Prompt)
- 提示词工程(Prompt Engineering)
- 系统提示词(System Prompt)
- 提示词模板(Prompt Template)
- 少样本(Few-shot)/零样本(Zero-shot)/单样本(One-shot)
- 思维链(Chain of Thought（CoT）)
- 思维树(Tree of Thoughts（ToT）)
- 自一致性(Self Consistency)
- 思考+行动(ReAct)
- Plan-and-Solve(先计划，再执行) / Least-to-Most(从简单推到难)（2026高频高级技巧）
```

### 2.3 Token机制
```
- Token:大语言模型里的「最小单位」
- Tokenization：分词
- Context Window：上下文窗口（1M+上下文已成为标配）
```

### 2.4 记忆机制

```
- Context（LLM 内部上下文 / 短期记忆）
- Memory（LLM 长期记忆）
- Vector Memory(向量记忆)/Episodic Memory(情景记忆/事件记忆)（2026 Agent常用）
```

## 三、RAG与检索系统(从向量到完整流水线)

### 3.1 向量技术
```
1. 向量技术
   - Embedding:嵌入
   - Vector Database:向量数据库
   - Vector Index:向量索引

2. 数据库（2026主流）
   - Milvus / Zilliz Cloud
   - Pinecone
   - Weaviate
   - Chroma
   - Qdrant
   - PGVector（PostgreSQL插件，企业最常用）
```

### 3.2 检索技术
```
1. 检索技术
   - Similarity Search:相似度检索
   - Semantic Search:语义检索
   - ANN Search:近似最近邻
   - Hybrid Search:混合检索

2. 算法
   - FAISS（Facebook）
   - HNSW:综合最强
   - ScaNN（Google）
   - DiskANN（Microsoft）
```

### 3.3 RAG系统
```
1-RAG系统
- RAG（Retrieval-Augmented Generation，原RGA）
- Chunking:分块
- Rerank:重排序
- Vector Search:向量检索
- Query Expansion:查询扩展
- RAG Pipeline:完整流水线
- Graph RAG（知识图谱增强）
- Multi-hop RAG（多跳推理）
- Context Compression（上下文压缩）

2.RAG流程：
User Query
↓
Embedding
↓
Vector Search
↓
Retrieve Documents
↓
LLM Generation
```

### 3.4 Search系统

```
- Web Search：全网搜索
- Enterprise Search：企业搜索
- Real-time Retrieval：实时检索
```

## 四、AI模型生态（2026年4月最新版本）

### 4.1 国外模型

```
1-OpenAI
- GPT-4o
- GPT-5 series(GPT-5.4 最新，含Thinking/Pro变体、1M上下文、原生Computer Use)
- o1 / o3 / o3-pro
- Codex（历史，已被Copilot取代）

2、Anthropic
Claude 4 series（Opus 4.6 / Sonnet 4.6 当前主力，2月发布；Haiku 4.x）

3、Google
Gemini 3 series(Gemini 3.1 Pro 当前最强；Gemini 3.1 Flash-Lite 3月轻量版)

4、Meta
Llama 4 / Llama 4 Scout / Llama 4 Maverick（10M上下文王者）
```

### 4.2 中国模型
```
- DeepSeek（V3.2 / R1 / V4）
- Qwen（Qwen 3 / Qwen 3.5）
- GLM（GLM-4.7 / GLM-5）
- Kimi（Kimi K2 / Kimi K2.5）
- Baichuan
- Yi
- MiniMax（M2.1 / M2.5）
- Moonshot
```

### 4.3 开源模型
```
- Mistral / Mixtral
- Phi
- Falcon
- RWKV
- Llama 4系列（开源版）
- Qwen 3.5系列
- DeepSeek系列
- Nemotron（NVIDIA）
```

## 五、AI开发框架

### 5.1 LLM开发框架
```
- LangChain
- LangGraph（2026多Agent标配）
- LlamaIndex
- Haystack
- Semantic Kernel
```

### 5.2 Agent框架
```
- LangGraph
- AutoGen
- CrewAI
- Semantic Kernel
- OpenAI Swarm（轻量多代理）
- Letta（记忆增强Agent）
```

### 5.3 本地AI运行
```
- Ollama
- LM Studio（UI最友好）
- GPT4All
- Jan
- LocalAI
- Pinokio
- Faraday.dev
- 私有化部署(Private/On-premise Deployment，企业级本地化部署)
```

### 5.4 深度学习框架
```
- PyTorch
- TensorFlow
- JAX
- ONNX
```

## 六、AI推理与部署

### 6.1 推理框架
```
- vLLM（2026推理加速王者）
- TensorRT-LLM
- DeepSpeed
- Triton Inference Server
- SGLang（结构化生成加速）
```

### 6.2 本地推理
```
- llama.cpp
- ExLlama
- MLC-LLM（手机/边缘端）
```

### 6.3 推理优化
```
- FlashAttention
- PagedAttention
- Quantization
- KV Cache Optimization
- Speculative Decoding
- Continuous Batching（vLLM核心）
```

## 七、AI应用领域

### 7.1 AI绘图
```
1. 核心模型
   - Flux.1 / Flux.2（开源最强）
   - Stable Diffusion（SD3/SD3.5）
   - Midjourney
   - DALL·E
   - Ideogram
   - Google Nano Banana 2（一致性顶尖）

2. 工具
   - ComfyUI
   - Automatic1111
   - InvokeAI
   - Fooocus
```

### 7.2 AI视频
```
- Runway（Gen-3 / Gen-3 Alpha → Gen-4.5趋势）
- Luma（Dream Machine）
- Kling（快手，Kling 3.0 中国最强，人物一致性/4K 60fps领先）
- Veo（Google，Veo 3.1 企业级最完整，4K+原生音频）
- Sora（OpenAI，Sora 2 叙事/物理模拟最强）
- Pika
- Seedance 2.0（字节高质量）
```

### 7.3 AI语音
```
- ElevenLabs
- PlayHT
- Suno
- Udio
- Whisper
- Google Veo Audio
- GPT-Realtime Audio（OpenAI实时语音）
```

### 7.4 AI数字人
```
- HeyGen
- D-ID
- Synthesia
- Hour One
```

## 八、AI Agent

### 8.1 Agent核心能力
```
- 智能体/Agent
- Planning
- Reflection
- Memory
- Tool Use
- Skill（工具能力）
- Multi-Agent Coordination（Grok 4.20四代理等）
- Decision Making（决策能力）、State Management（状态管理）
- Superpowers（AI赋予Agent的超级能力）
```

### 8.2 Agent结构

```
Workflow
SubAgent（子代理）

架构：用户请求 → Agent → Planning → Workflow → Skill / SubAgent → 执行
```

### 8.3 Agent工具

```
- Manus
- AutoGPT/BabyAGI
```

### 8.4 Agent协议
```
- MCP(Model Context Protocol)(Anthropic主导，Linux基金会托管，2026 Agent核心协议)
- OpenClaw生态（2026最火开源Agent，支持本地/多模型/Telegram/WhatsApp，GitHub星数第一；现状：企业使用需注意安全/沙箱风险，社区有shield方案）
```

### 8.5 Computer Use
```
- Claude Computer Use（Claude 4.6屏幕操作已成熟）
- OpenAI Computer Use（GPT-5.4原生）
```

## 九、AI开发工具

### 9.1 AI编程助手
```
- Cursor（2026编码最强IDE）
- GitHub Copilot
- Claude Code（Claude 4.6统治SWE-bench）
- Codeium
- Windsurf
- Tabnine
```

### 9.2 Agent开发工具
```
- LangGraph Studio
- Flowise
- Dify
- Jupyter AI
```

### 9.3 Agent IDE
```
1.IDE型：
- Cursor
- Continue

2.Agent型：
- OpenDevin
- Smol Developer
- Manus

3.工具链型：
- LangGraph Studio
- Dify

4.其他：
- Trae / Qoder
- Kiro / opencode / Codebuddy
- mobile-mcp
- Google Antigravity / Google ADK
- ClawdBot
- Jupyter（AI增强版）
```

## 十、API / 网关层

```
- OpenAI API Proxy
- 多模型路由（Multi-LLM Router）
- Key管理 / 限流 / 计费

作用：统一调用 GPT / Claude / DeepSeek / Qwen
```

## 十一、AI产品

### 11.1 设计工具
```
- Canva AI
- Adobe Firefly
- Figma AI（含FigJam AI / Dev Mode）
- Pixso AI
- Uizard（AI转设计）
- 蓝湖（Lanhu）
```

### 11.2 办公工具
```
- Notion AI
- Gamma
```

### 11.3 Web生成
```
- v0（生成UI最火）
- Framer AI
- Relume
- LobeHub（MCP工具管理）
```

## 十二、AI平台层

```
- LobeHub（MCP平台）
- OpenClaw（Agent平台）
- Dify（应用平台）
- Hugging Face（模型托管与推理）
- Groq / Fireworks / Together（高速推理平台）
- Replicate
- Modal（Serverless AI）
```

## 十三、AI开发范式

```
- Vibe Coding
- Agentic Development（以Agent为核心的开发模式）
- MCP-driven Development
- Computer Use Paradigm（屏幕操作驱动开发）
- Prompt-first / Graph-first Workflow
- Tool-first Development
- Retrieval-first Development（RAG优先）
- Superpowers（Vibe Coding与Agent带来的开发超级能力）
```

## 十四、AI系统总架构

```
用户需求（Prompt）
↓
LLM（GPT-5.4 / Claude 4.6 / DeepSeek 等）
↓
RAG / Search / Real-time Retrieval
↓
Agent（Planning + Multi-Agent + Skill / SubAgent）
↓
Workflow + Tool Use / Computer Use
↓
执行 → 输出 + Memory更新（闭环）
```

## 十五 开发路线图建议(推荐顺序)：

### 一 开发路线

```
一～二（基础理论 + LLM技术 + NLP → 打牢根基）
三（RAG + Search，必学）
四（模型选型）+ 五（框架）+ 六（部署 + 私有化部署）
八（Agent：结构 + MCP + OpenClaw + Computer Use + Skill/Workflow/SubAgent）
七 + 九 + 十 + 十一（应用、工具、产品）
十 + 十二 + 十三 + 十四（API/平台/范式/总架构，生产落地）
```

### 二 学习建议

```
新手：先走1→2→3→4→5（1个月打基础）
进阶：重点8（Agent）+十三（范式），结合实践（Cursor + LangGraph + MCP）
企业级：重点6（私有化部署）+ 3（RAG）+ 12（平台）
```

