---
title: ComfyUI开发之——ComfyUI自动化实战(6.4)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: ad64a656
date: 2026-11-04 19:45:04
---
## 一、概述

```
ComfyUI 自动化实战：使用 Python 批量处理图片与管理生成任务

上一篇介绍了 ComfyUI 本地 API，已经实现了通过 Python 提交工作流、查询任务状态和下载生成结果。

但如果每次只能处理一张图片、手动修改一次提示词，再运行一次程序，自动化程度仍然有限。

本篇继续使用 Python 和 ComfyUI API，实现一个更实用的自动化程序：

- 批量读取本地图片。
- 自动将图片提交给 ComfyUI。
- 根据不同图片修改提示词。
- 批量提交和管理生成任务。
- 自动等待任务完成。
- 下载并整理生成结果。
- 记录任务状态，方便排查失败任务。

通过这些操作，可以把 ComfyUI 从单张图片生成工具，扩展为一个简单的本地 AI 图片处理服务。
```

<!--more-->

## 二、先理解自动化处理流程

批量处理图片，并不是简单地循环调用一次生成接口。

一个完整的自动化流程通常包括：

1. 准备输入图片和 API 工作流。
2. Python 遍历图片目录。
3. 将当前图片传入工作流。
4. 修改提示词及其他生成参数。
5. 通过 API 提交任务。
6. 查询任务执行状态。
7. 下载生成结果。
8. 保存处理记录。
9. 继续处理下一张图片。

整体流程如下：

```
       输入图片目录
             │
             ▼
      Python 遍历图片
             │
             ▼
       读取当前图片
             │
             ▼
      修改 ComfyUI 工作流
             │
             ▼
       POST /prompt
             │
             ▼
        获取 prompt_id
             │
             ▼
       查询任务执行状态
             │
        ┌────┴────┐
        │         │
      未完成     已完成
        │         │
        ▼         ▼
      继续等待   下载生成结果
                  │
                  ▼
              保存处理记录
                  │
                  ▼
              处理下一张
```

这里需要注意：批量处理不一定意味着同时执行所有任务。对于显存有限的电脑，逐个提交、等待完成后再处理下一张，通常更稳定。

## 三、准备工作

### 3.1、准备项目目录

先创建一个项目目录：

```
ComfyUI-Batch/
│
├── workflow_api.json
├── main.py
│
├── input/
│   ├── image01.png
│   ├── image02.png
│   └── image03.jpg
│
├── output/
│
└── logs/
```

各目录的作用：

|     文件或目录      |             作用              |
| :-----------------: | :---------------------------: |
| `workflow_api.json` | ComfyUI 导出的 API 格式工作流 |
|      `main.py`      |       Python 自动化程序       |
|      `input/`       |    存放需要处理的原始图片     |
|      `output/`      |       保存生成后的图片        |
|       `logs/`       |       保存任务执行记录        |

安装所需依赖：

```
pip install requests
```

本篇使用标准的 ComfyUI API，不需要额外安装自定义节点。具体工作流仍然需要使用它所依赖的模型和节点。

### 3.2、准备图生图工作流

本篇以批量图生图为例。

例如，输入三张风景照片，希望 ComfyUI 分别将它们转换成不同风格的图片。

工作流可以使用以下基本结构：

```
Load Image
     │
     ▼
VAE Encode
     │
     ▼
KSampler
     │
     ▼
VAE Decode
     │
     ▼
Save Image
```

同时，工作流还需要加载模型、CLIP，并连接正向和负向提示词编码节点。

实际节点连接以所使用的模型架构为准。例如，部分模型采用不同的文本编码、采样或潜空间处理方式，不能直接套用传统 SD 1.5 的节点结构。

在 ComfyUI 中完成工作流搭建并测试成功，然后导出 API 格式 JSON。

#### 1. 需要修改哪些节点？

批量图生图时，通常需要动态修改两个部分：

- 输入图片：每次循环替换为不同的图片。
- 提示词：根据处理需求修改生成风格或内容。

如果希望每张图片使用不同的随机结果，还可以修改 Seed。

下面的代码使用占位符表示节点 ID，实际使用时必须根据自己的 API JSON 修改。

| 节点           | 需要修改的输入    |
| -------------- | ----------------- |
| LoadImage      | `image`           |
| CLIPTextEncode | `text`            |
| KSampler       | `seed`            |
| SaveImage      | `filename_prefix` |

注意：不同模型和工作流的节点名称、输入字段可能不同，不能假定每个工作流都有完全相同的节点结构。

## 四、操作流程

### 4.1、编写批量处理程序

接下来实现一个完整的 Python 示例。

#### 1. 定义基本配置

在 `main.py` 中添加：

```
import os
import json
import time
import copy
import uuid
import requests

BASE_URL = "http://127.0.0.1:8188"

INPUT_DIR = "input"
OUTPUT_DIR = "output"
LOG_DIR = "logs"

WORKFLOW_FILE = "workflow_api.json"

# 根据自己的 API 工作流修改这些节点 ID
IMAGE_NODE_ID = "10"
PROMPT_NODE_ID = "6"
SEED_NODE_ID = "3"

# 轮询间隔
POLL_INTERVAL = 2

# 单个任务最大等待时间，单位：秒
TASK_TIMEOUT = 600

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(LOG_DIR, exist_ok=True)
```

这里的节点 ID 都是示例。

例如，`IMAGE_NODE_ID = "10"` 表示输入图片节点的 ID 是 `"10"`。如果自己的工作流中图片节点 ID 是 `"12"`，就需要修改为 `"12"`。

#### 2. 读取 API 工作流

```
with open(WORKFLOW_FILE, "r", encoding="utf-8") as f:
    WORKFLOW_TEMPLATE = json.load(f)
```

为什么使用模板？

因为每处理一张图片，都需要修改工作流中的部分输入参数。

如果直接修改同一个工作流对象，前一次循环修改的内容可能影响后一次任务。

因此，建议使用 `copy.deepcopy()`，为每张图片创建一份独立工作流。

#### 3. 上传输入图片

ComfyUI 提供了图片上传接口，可以通过 `/upload/image` 将本地图片上传到 ComfyUI 的输入目录。

```
def upload_image(image_path):
    url = f"{BASE_URL}/upload/image"

    with open(image_path, "rb") as f:
        files = {
            "image": (
                os.path.basename(image_path),
                f,
                "application/octet-stream"
            )
        }

        response = requests.post(
            url,
            files=files,
            data={"overwrite": "true"},
            timeout=60
        )

    response.raise_for_status()

    return response.json()
```

上传成功后，接口会返回图片相关信息。

例如，可能包含：

```
{
  "name": "image01.png",
  "subfolder": "",
  "type": "input"
}
```

实际返回字段以当前 ComfyUI 版本为准。

这里的 `name` 和 `subfolder` 后续需要传给工作流中的图片加载节点。

#### 4. 修改工作流参数

创建一个函数，为每张图片生成独立的工作流：

```
def build_workflow(image_info, prompt, seed):
    workflow = copy.deepcopy(WORKFLOW_TEMPLATE)

    # 替换输入图片
    workflow[IMAGE_NODE_ID]["inputs"]["image"] = (
        image_info["name"]
    )

    # 修改正向提示词
    workflow[PROMPT_NODE_ID]["inputs"]["text"] = prompt

    # 修改随机种子
    workflow[SEED_NODE_ID]["inputs"]["seed"] = seed

    return workflow
```

注意：部分图片加载节点可能还需要设置其他输入，或者使用不同的节点类型。请根据自己导出的 API JSON 检查字段。

另外，随机种子字段的名称也应以实际节点为准。

#### 5. 提交生成任务

```
def submit_task(workflow):
    url = f"{BASE_URL}/prompt"

    response = requests.post(
        url,
        json={"prompt": workflow},
        timeout=30
    )

    response.raise_for_status()

    result = response.json()

    if "prompt_id" not in result:
        raise RuntimeError(
            f"任务提交失败: {result}"
        )

    return result["prompt_id"]
```

每次提交任务，ComfyUI 都会返回一个 `prompt_id`。

后续查询任务状态时，就需要使用这个 ID。

#### 6. 等待任务完成

```
def wait_for_task(prompt_id):
    url = f"{BASE_URL}/history/{prompt_id}"

    start_time = time.time()

    while True:
        if time.time() - start_time > TASK_TIMEOUT:
            raise TimeoutError(
                f"任务等待超时: {prompt_id}"
            )

        response = requests.get(
            url,
            timeout=30
        )

        response.raise_for_status()

        history = response.json()

        if prompt_id in history:
            task = history[prompt_id]

            status = task.get("status", {})
            status_str = status.get("status_str")

            if status_str == "error":
                raise RuntimeError(
                    f"任务执行失败: {status}"
                )

            outputs = task.get("outputs", {})

            if outputs and status.get("completed"):
                return outputs

        time.sleep(POLL_INTERVAL)
```

这里通过历史记录判断任务是否完成。

需要注意，任务历史结构可能随 ComfyUI 版本变化。如果发现任务已完成但程序一直等待，应先打印 `/history/{prompt_id}` 的完整返回内容，再根据实际状态字段调整判断逻辑。

#### 7. 下载生成结果

```
def download_results(outputs, task_name):
    saved_files = []

    for node_id, node_output in outputs.items():
        images = node_output.get("images", [])

        for index, image_info in enumerate(images):
            response = requests.get(
                f"{BASE_URL}/view",
                params={
                    "filename": image_info["filename"],
                    "subfolder": image_info.get("subfolder", ""),
                    "type": image_info.get("type", "output")
                },
                timeout=60
            )

            response.raise_for_status()

            filename = (
                f"{task_name}_{node_id}_{index}.png"
            )

            save_path = os.path.join(
                OUTPUT_DIR,
                filename
            )

            with open(save_path, "wb") as f:
                f.write(response.content)

            saved_files.append(save_path)

    return saved_files
```

这里遍历所有输出节点，找到包含 `images` 的结果并下载。

如果工作流输出的是视频，返回结构可能包含视频信息，而不是 `images`。需要根据对应视频节点的实际输出字段，增加视频下载逻辑。

### 3.2、整合成完整批量任务

前面的代码已经实现了上传图片、修改工作流、提交任务、等待完成和下载结果。

现在将这些步骤组合起来。

```
def process_image(image_path, index):
    image_name = os.path.basename(image_path)

    print(f"\n开始处理：{image_name}")

    # 1. 上传图片
    image_info = upload_image(image_path)

    # 2. 生成提示词
    prompt = (
        "beautiful scenery, "
        "high quality, detailed, "
        "cinematic lighting"
    )

    # 3. 创建独立工作流
    seed = int(time.time() * 1000) % (2**32)

    workflow = build_workflow(
        image_info,
        prompt,
        seed
    )

    # 4. 提交任务
    prompt_id = submit_task(workflow)

    print("任务 ID:", prompt_id)

    # 5. 等待完成
    outputs = wait_for_task(prompt_id)

    # 6. 下载结果
    task_name = f"result_{index:03d}"

    saved_files = download_results(
        outputs,
        task_name
    )

    print("处理完成:", saved_files)

    return {
        "image": image_name,
        "prompt_id": prompt_id,
        "status": "success",
        "outputs": saved_files
    }


def main():
    image_extensions = (
        ".png",
        ".jpg",
        ".jpeg",
        ".webp"
    )

    image_files = [
        os.path.join(INPUT_DIR, name)
        for name in os.listdir(INPUT_DIR)
        if name.lower().endswith(image_extensions)
    ]

    image_files.sort()

    results = []

    for index, image_path in enumerate(
        image_files,
        start=1
    ):
        try:
            result = process_image(
                image_path,
                index
            )

        except Exception as e:
            print("处理失败:", image_path, e)

            result = {
                "image": os.path.basename(image_path),
                "status": "failed",
                "error": str(e)
            }

        results.append(result)

    # 保存批量处理记录
    log_path = os.path.join(
        LOG_DIR,
        "batch_result.json"
    )

    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(
            results,
            f,
            ensure_ascii=False,
            indent=2
        )

    print("\n全部任务处理结束")
    print("处理记录:", log_path)


if __name__ == "__main__":
    main()
```

这段程序实现的是串行处理：

一张图片处理完成后，再开始下一张。

这样可以减少同时加载多个生成任务带来的显存压力，也更容易定位问题。

**运行前，请先完成以下检查：**

- ComfyUI 已正常启动。
- `workflow_api.json` 是 API 格式文件。
- 图片加载节点、提示词节点和 Seed 节点 ID 已修改正确。
- 工作流已经在 ComfyUI 界面中测试成功。
- 工作流中的图片加载节点支持通过上传接口返回的文件名读取图片。

### 3.3、如何实现不同图片使用不同提示词？

上面的示例对所有图片使用同一个提示词。

实际项目中，可能希望不同图片采用不同的处理方式。

例如：

|    图片     |   处理目标   |     提示词方向      |
| :---------: | :----------: | :-----------------: |
| image01.jpg | 风景风格转换 | cinematic landscape |
| image02.jpg | 人物照片美化 |  natural portrait   |
| image03.jpg |  老照片修复  |  photo restoration  |

可以通过字典维护不同图片的提示词：

```
PROMPT_MAP = {
    "image01.jpg": "cinematic landscape",
    "image02.jpg": "natural portrait",
    "image03.jpg": "old photo restoration"
}
```

然后在 `process_image()` 中替换原来的提示词：

```
prompt = PROMPT_MAP.get(
    image_name,
    "high quality, detailed"
)
```

这样就可以针对不同图片使用不同的生成要求。

如果图片数量较多，也可以将文件名和提示词维护在 CSV 或 Excel 文件中，由 Python 读取后自动处理。

### 3.4、批量任务如何管理？

当图片数量增加后，仅仅依靠循环处理就不够了，还需要考虑任务记录和失败恢复。

建议至少记录以下信息：

| 字段       | 说明            |
| ---------- | --------------- |
| image      | 原始图片名称    |
| prompt_id  | ComfyUI 任务 ID |
| status     | 任务状态        |
| outputs    | 输出文件路径    |
| error      | 失败原因        |
| created_at | 任务提交时间    |

例如：

```
[
  {
    "image": "image01.jpg",
    "prompt_id": "任务ID示例",
    "status": "success",
    "outputs": [
      "output/result_001_9_0.png"
    ]
  },
  {
    "image": "image02.jpg",
    "status": "failed",
    "error": "任务执行超时"
  }
]
```

上面只是记录格式示意。

实际项目中，可以进一步实现：

- 只重新处理失败的图片。
- 跳过已经生成过结果的图片。
- 按日期创建输出目录。
- 为不同任务设置不同的提示词和参数。
- 保存每次任务使用的模型、Seed 和工作流版本。

如果需要长期运行，建议使用 SQLite 保存任务记录，而不是只依赖一个 JSON 文件。这样更方便查询、更新和恢复任务。

## 四、如何提高批量处理效率？

批量处理时，最重要的是在处理速度和稳定性之间取得平衡。

### 4.1. 串行处理

串行处理就是一张图片完成后再处理下一张。

优点：

- 显存压力相对较小。
- 任务执行顺序清晰。
- 出错后容易定位。
- 适合普通个人电脑。

缺点是整体耗时可能较长。

### 4.2. 队列处理

ComfyUI 自身支持任务队列。

也可以在 Python 中一次提交多个任务，再通过 `prompt_id` 分别查询结果。

不过，提交多个任务不代表 GPU 一定会并行执行。ComfyUI 通常会按照执行队列调度任务，具体行为还受到工作流和运行环境影响。

建议先实现串行处理，再根据显存和实际速度逐步增加任务提交数量。

### 4.3. 控制图片尺寸和生成参数

批量处理时，分辨率、帧数、采样步数和模型大小都会影响资源占用。

尤其是视频生成和高分辨率图像生成，资源需求通常更高。

可以考虑：

- 先用小分辨率测试工作流。
- 减少不必要的采样步数。
- 避免同时运行多个高显存任务。
- 处理完一批图片后检查显存和内存使用情况。
- 对输入图片进行必要的尺寸预处理。

### 4.4. 保存原始图片和生成参数

不要只保存最终生成图片。

建议同时保存原始图片、提示词、Seed、模型名称和工作流 JSON。

这样出现效果不理想时，可以重新调整参数并复现任务。

## 五、常见问题

|          问题          |         可能原因         |             解决方法              |
| :--------------------: | :----------------------: | :-------------------------------: |
|      图片上传失败      |  文件路径错误或接口异常  |  检查文件是否存在、服务是否启动   |
|    工作流找不到图片    |  图片节点引用名称不正确  |   检查上传返回的文件名和子目录    |
|     提示词没有变化     |   修改了错误的节点 ID    |     检查 API JSON 中的节点 ID     |
| 任务提交成功但没有结果 |      工作流执行失败      | 检查 `/history` 和 ComfyUI 控制台 |
|   批量处理过程中中断   | 网络异常、超时或程序异常 |      增加异常记录和失败重试       |
|        显存不足        |    模型或图片尺寸过大    |  降低分辨率，减少同时提交的任务   |
|     输出文件被覆盖     |    保存文件名前缀重复    |  为每次任务设置不同的文件名前缀   |
|     下载结果不完整     | 没有正确检查任务完成状态 |       确认任务成功后再下载        |

另外，批量任务最好不要无限重试。对于模型缺失、节点缺失等配置问题，反复提交并不能解决问题，应该先修复工作流。

## 六、动手练习

建议准备 3～5 张不同的图片，完成以下练习：

1. 使用 ComfyUI 搭建一个图生图工作流。
2. 导出 API 格式 JSON。
3. 使用 Python 上传本地图片。
4. 动态替换工作流中的图片节点。
5. 为每张图片设置不同提示词。
6. 逐个提交任务并等待完成。
7. 自动下载生成结果。
8. 将处理记录保存为 JSON。
9. 修改 Seed，再次执行，对比生成结果。

完成后，就可以通过 Python 批量处理本地图片，而不需要每次都打开 ComfyUI 手动操作。

## 七、总结

本篇在上一章 API 调用的基础上，完成了一个简单的批量图片处理程序。

整个自动化流程可以概括为：

**读取图片 → 上传图片 → 修改工作流 → 提交任务 → 等待完成 → 下载结果 → 保存记录。**

需要注意的是，批量自动化并不只是循环调用 API，还需要做好任务状态管理、失败处理、结果归档和资源控制。

通过这套方式，ComfyUI 可以进一步接入桌面软件、手机应用、网站后台以及其他 AI 服务。

到这里，ComfyUI 的基础学习、图像生成、图像处理、视频生成和 API 自动化部分就基本完成了。

