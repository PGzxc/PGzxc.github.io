---
title: ComfyUI开发之——ComfyUI本地API实战(6.3)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 38807ac6
date: 2026-11-04 19:44:37
---
## 一、概述

```
ComfyUI 本地 API 实战：通过 HTTP 调用工作流、查询任务与获取结果

前面的文章已经介绍了 ComfyUI 的基础操作、模型管理、图像处理和视频生成。
到目前为止，我们主要通过浏览器打开 ComfyUI，手动调整参数、点击生成，再从界面中保存图片。

但如果希望把 ComfyUI 接入自己的 AI 应用，或者通过 Python 脚本批量提交生成任务，
就需要使用它提供的 API。

ComfyUI 不仅是一个图形化工作流工具，也可以作为本地 AI 图片和视频生成服务。
通过 HTTP 接口提交工作流，再查询任务状态、获取生成结果，就能把它接入其他程序。

本文从实际开发出发，完成一次完整的 API 调用流程。
```

<!--more-->

## 二、概念

### 2.1、ComfyUI API 能做什么？

ComfyUI 启动后，通常会在本机开启一个 Web 服务：

```
http://127.0.0.1:8188
```

其中，`127.0.0.1` 表示本机地址，`8188` 是 ComfyUI 常用的默认端口。如果启动时修改了端口，就需要使用实际端口。

通过 API，我们可以实现：

- 从 Python 或其他程序提交图片生成任务。
- 动态修改提示词、随机种子和图片尺寸等参数。
- 查询任务是否完成。
- 获取生成的图片或视频。
- 将 ComfyUI 接入自己的客户端或自动化程序。

例如，未来可以开发一个简单的客户端：用户输入提示词，客户端通过 HTTP 请求 ComfyUI，等待生成完成后，再将图片展示出来。

### 2.2、准备 API 工作流

在调用 API 之前，需要先准备一个可以正常运行的 ComfyUI 工作流。

建议先使用最基础的文生图工作流，确认能够正常生成图片，再进行 API 调用。

#### 1. 区分两种工作流 JSON

这是初次使用 ComfyUI API 最容易遇到的问题。

ComfyUI 中存在两种用途不同的 JSON：

|      类型       |                           用途                            |
| :-------------: | :-------------------------------------------------------: |
| 普通工作流 JSON |  保存界面布局、节点位置、连线等信息，用于重新打开工作流   |
|  API 格式 JSON  | 保存节点类型、输入参数和连接关系，用于通过 API 执行工作流 |

两者不能直接混用。

如果将普通工作流 JSON 直接提交给 `/prompt`，通常会因为数据格式不符合要求而报错。

#### 2. 导出 API 格式工作流

在 ComfyUI 中：

1. 打开一个能够正常运行的文生图工作流。
2. 确认模型、提示词和采样参数都能正常使用。
3. 找到工作流菜单中的 API 格式导出选项。
4. 选择类似 `Save (API Format)` 的功能，将工作流保存为 JSON 文件。

不同版本的 ComfyUI，菜单位置和名称可能有所不同。如果没有看到该选项，可以检查当前版本的工作流菜单或相关设置。

假设保存后的文件名为：

```
workflow_api.json
```

API 格式的核心结构大致如下：

```
{
  "6": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "a beautiful landscape",
      "clip": ["4", 1]
    }
  },
  "9": {
    "class_type": "SaveImage",
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": ["8", 0]
    }
  }
}
```

以上只是结构示意，并不是完整可运行的工作流。

重点理解两个字段：

- `class_type`：节点对应的类型，例如 `CLIPTextEncode`、`KSampler`、`SaveImage`。
- `inputs`：节点的输入参数，包括提示词、模型连接、采样参数等。

节点 ID 通常是字符串，例如 `"6"`、`"9"`。节点之间通过输入字段中的数组引用其他节点的输出。

实际使用时，应该以自己导出的 API JSON 为准，不要直接复制示例中的节点 ID。

### 2.3、认识 ComfyUI 常用 API 接口

ComfyUI 提供了多种 HTTP 接口，用于提交任务、查询进度和获取结果。

以下是最常用的接口：

|          接口          | 请求方式  |             作用             |
| :--------------------: | :-------: | :--------------------------: |
|       `/prompt`        |   POST    |      提交工作流生成任务      |
|        `/queue`        |    GET    |       查看当前任务队列       |
| `/history/{prompt_id}` |    GET    | 查询指定任务的历史记录和输出 |
|        `/view`         |    GET    |   获取生成的图片等输出文件   |
|    `/system_stats`     |    GET    |    查看系统信息和资源状态    |
|         `/ws`          | WebSocket | 接收任务执行过程中的实时事件 |

其中，最重要的是 `/prompt`、`/history/{prompt_id}` 和 `/view`。

可以将它们理解为三个步骤：

1. 提交任务。
2. 查询任务结果。
3. 下载生成文件。

## 三、操作流程

### 3.1、使用 Python 提交生成任务

下面通过 Python 实现一次完整的 API 调用。

#### 1. 安装 requests

先安装 Python HTTP 请求库：

```
pip install requests
```

然后准备好前面导出的 `workflow_api.json`，将它与 Python 脚本放在同一个目录。

目录结构：

```
ComfyUI-API/
├── workflow_api.json
└── main.py
```

#### 2. 提交工作流

创建 `main.py`：

```
import json
import requests

BASE_URL = "http://127.0.0.1:8188"

# 读取 API 格式工作流
with open("workflow_api.json", "r", encoding="utf-8") as f:
    workflow = json.load(f)

# 根据实际工作流修改节点 ID 和输入字段
# 下面的 "6" 只是示例，请替换为自己工作流中的节点 ID
workflow["6"]["inputs"]["text"] = (
    "a beautiful landscape, "
    "mountains, lake, sunset"
)

# 提交生成任务
response = requests.post(
    f"{BASE_URL}/prompt",
    json={
        "prompt": workflow
    },
    timeout=30
)

response.raise_for_status()

result = response.json()

prompt_id = result["prompt_id"]

print("任务提交成功")
print("Prompt ID:", prompt_id)
```

这里需要注意：

- `workflow` 必须是 API 格式 JSON。
- `"6"` 必须替换为自己工作流中实际的提示词节点 ID。
- `text` 是示例节点的输入字段，其他工作流可能存在不同的节点结构。
- `/prompt` 返回的 `prompt_id` 是本次任务的标识，后续查询结果需要使用它。

如果接口返回错误，可以先检查 ComfyUI 是否已经启动，以及工作流 JSON 是否正确。

### 3.2、查询任务状态和生成结果

任务提交成功后，并不意味着图片已经生成。

ComfyUI 可能正在执行其他任务，因此需要等待任务完成。

这里介绍两种方式：HTTP 轮询和 WebSocket 实时监听。

#### 1. 使用 HTTP 轮询

轮询的思路比较简单：

每隔一段时间请求一次 `/history/{prompt_id}`，检查任务是否已经生成结果。

在前面代码的基础上，增加：

```
import time

def wait_for_result(prompt_id):
    url = f"{BASE_URL}/history/{prompt_id}"

    while True:
        response = requests.get(url, timeout=30)
        response.raise_for_status()

        history = response.json()

        if prompt_id in history:
            task = history[prompt_id]

            outputs = task.get("outputs", {})

            if outputs:
                print("任务已完成")
                return outputs

        print("任务执行中...")
        time.sleep(2)


outputs = wait_for_result(prompt_id)

print(json.dumps(
    outputs,
    ensure_ascii=False,
    indent=2
))
```

当任务完成后，历史记录中通常会包含节点输出信息。

例如，图片保存节点可能返回：

```
{
  "images": [
    {
      "filename": "ComfyUI_00001_.png",
      "subfolder": "",
      "type": "output"
    }
  ]
}
```

实际输出结构取决于工作流中的节点类型。

如果是视频生成工作流，输出字段和文件类型可能不同，需要根据实际返回结果处理。

#### 2. 使用 WebSocket 实时监听

如果希望客户端实时显示生成进度，可以使用 WebSocket。

与 HTTP 轮询不同，WebSocket 建立连接后，服务端可以主动向客户端发送执行事件。

常见事件包括：

- `execution_start`：开始执行任务。
- `executing`：正在执行某个节点。
- `progress`：采样进度更新。
- `execution_cached`：使用了缓存结果。
- `execution_success`：任务成功完成。
- `execution_error`：任务执行出错。

不同版本及节点扩展可能影响事件内容，具体结构应以当前版本实际收到的消息为准。

Python 可以使用 `websocket-client`：

```
pip install websocket-client
```

连接地址通常类似：

```
ws://127.0.0.1:8188/ws?clientId=YOUR_CLIENT_ID
```

其中，`clientId` 用于标识客户端连接。实际开发中，应在提交任务前建立 WebSocket 连接，并在提交 `/prompt` 时传入相同的 `client_id`，方便关联任务事件。

简单来说：

- HTTP 轮询：实现简单，适合先完成基础功能。
- WebSocket：可以实时接收执行事件，适合开发交互式客户端。

初学阶段建议先掌握 HTTP 轮询，再进一步实现 WebSocket。

### 3.3、下载生成的图片

查询任务完成后，我们已经拿到了输出文件信息。

接下来通过 `/view` 接口获取文件。

```
import os

def download_image(image_info):
    url = f"{BASE_URL}/view"

    response = requests.get(
        url,
        params={
            "filename": image_info["filename"],
            "subfolder": image_info.get("subfolder", ""),
            "type": image_info.get("type", "output")
        },
        timeout=60
    )

    response.raise_for_status()

    os.makedirs("results", exist_ok=True)

    save_path = os.path.join(
        "results",
        image_info["filename"]
    )

    with open(save_path, "wb") as f:
        f.write(response.content)

    print("图片已保存:", save_path)


# 下载第一个图片输出
images = outputs.get("保存图片节点ID", {}).get("images", [])

if images:
    download_image(images[0])
```

注意：上面的 `"保存图片节点ID"` 是占位符，需要替换成自己工作流中实际的保存图片节点 ID。

如果工作流中存在多个图片输出节点，可以遍历 `outputs`，找到包含 `images` 的节点，再逐个下载。

至此，就完成了从 Python 提交任务、查询结果到下载图片的基本流程。

### 3.4、使用 curl 测试 API

如果暂时不想编写 Python 程序，也可以使用 curl 测试接口。

例如，查看当前任务队列：

```
curl http://127.0.0.1:8188/queue
```

查看系统信息：

```
curl http://127.0.0.1:8188/system_stats
```

提交任务时，需要将 API 格式工作流 JSON 放入请求体。

在 Windows PowerShell 中，`curl` 可能是 PowerShell 命令的别名。建议使用：

```
curl.exe
```

也可以直接使用 Postman 测试 HTTP 接口。

不过，涉及 JSON 文件读取、动态修改参数、任务轮询和结果下载时，Python 通常更加方便。

### 3.5、局域网访问与安全问题

默认情况下，ComfyUI 通常只监听本机地址。

如果希望手机、平板或其他电脑访问，需要让 ComfyUI 监听局域网网卡地址。

例如，部分版本可以通过启动参数：

```
python main.py --listen 0.0.0.0
```

然后通过电脑的局域网 IP 访问：

```
http://192.168.1.100:8188
```

其中，`192.168.1.100` 只是示例，需要替换成运行 ComfyUI 的电脑实际 IP。

还需要检查：

1. 电脑和客户端是否连接同一个局域网。
2. Windows 防火墙是否允许 ComfyUI 使用的端口。
3. ComfyUI 是否成功监听局域网地址。
4. 路由器是否开启了设备隔离。

**安全提醒：**

ComfyUI 的本地服务不能默认视为具备完善的身份认证和访问控制能力。

不要为了方便直接将 `8188` 端口映射到公网，也不要随意向不可信网络开放服务。API 请求可能直接消耗电脑的 GPU、内存和磁盘资源。

如果只是自己开发客户端，优先使用本机访问；确实需要局域网访问时，也应限制在可信网络中。

## 四、常见问题排查

|        问题        |             可能原因             |            处理方法            |
| :----------------: | :------------------------------: | :----------------------------: |
| Connection refused |     ComfyUI 未启动或端口错误     |       检查服务状态和端口       |
|   404 Not Found    |      请求地址或接口路径错误      |      检查 URL 和接口名称       |
|  400 Bad Request   |       请求 JSON 格式不正确       |      检查 API 工作流格式       |
|      缺少节点      |  工作流使用了未安装的自定义节点  |       安装对应节点并重启       |
|     找不到模型     |     模型文件缺失或路径不正确     |     检查模型目录和节点配置     |
|    任务一直等待    | 前面存在其他任务或当前任务未开始 |   查看 `/queue` 和控制台日志   |
|    查询不到结果    | `prompt_id` 不正确或任务尚未完成 |     检查提交响应和历史记录     |
|    图片下载失败    |  文件名、子目录或文件类型不正确  | 检查 `/history` 返回的输出信息 |
|   局域网无法访问   |     监听地址或防火墙配置问题     |  检查 `--listen` 和防火墙规则  |

排查时，建议同时观察 ComfyUI 启动窗口中的日志。很多模型加载失败、节点执行异常和参数错误，都会在控制台中给出更具体的信息。

## 五、动手练习：完成一次 API 文生图

建议按照下面的顺序自己操作一遍：

1. 打开 ComfyUI，运行一个正常的文生图工作流。
2. 导出 API 格式 JSON。
3. 使用 Python 读取工作流文件。
4. 修改提示词节点的输入内容。
5. 调用 `POST /prompt` 提交任务。
6. 获取返回的 `prompt_id`。
7. 通过 `/history/{prompt_id}` 查询任务。
8. 从输出信息中获取图片文件名。
9. 调用 `/view` 下载图片。
10. 修改提示词，再次提交任务，观察生成结果的变化。

完成后，你就拥有了一个最基础的 ComfyUI API 调用程序。

## 六、总结

本文介绍了 ComfyUI 本地 API 的基本使用方式。

需要重点掌握三个核心接口：

- `/prompt`：提交工作流。
- `/history/{prompt_id}`：查询任务及输出。
- `/view`：获取生成文件。

此外，还需要理解普通工作流 JSON 与 API 格式 JSON 的区别。只有使用正确的 API 格式，才能通过 HTTP 接口执行工作流。

掌握这些内容后，ComfyUI 就不再只是一个需要手动操作的网页工具，而是可以被 Python 脚本、桌面软件、手机应用和其他 AI 系统调用的本地生成服务。

