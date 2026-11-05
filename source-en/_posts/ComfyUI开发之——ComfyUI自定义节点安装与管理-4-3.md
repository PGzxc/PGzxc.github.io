---
title: ComfyUI开发之——ComfyUI自定义节点安装与管理(4.3)
categories:
  - AI
  - AI图视频短剧
  - AI绘图
  - ComfyUI
tags:
  - ComfyUI
abbrlink: 6211410d
date: 2026-11-04 19:39:00
---
## 一、概述

```
前面我们学习了 ComfyUI 的常用节点，已经能够理解模型加载、提示词编码、采样、图片处理等基本流程。

但是，随着使用场景越来越复杂，ComfyUI 自带的节点可能无法满足所有需求。

例如：
- 想要自动识别人物姿势，需要 OpenPose 相关节点。
- 想要实现智能抠图，需要背景移除节点。
- 想要保持人物面部特征，需要 IP-Adapter 或 InstantID。
- 想要生成视频，需要视频处理和相关模型节点。
- 想要批量处理图片，需要额外的自动化节点。

这时就需要安装 ComfyUI 自定义节点（Custom Nodes）。

这篇文章介绍自定义节点的作用、安装方法、Manager 使用方式，以及常见问题排查。
```

<!--more-->

## 二、自定义节点

### 2.1、什么是 ComfyUI 自定义节点？

ComfyUI 自带了大量基础节点，可以完成常见的图片生成和处理任务。

但 AI 图像领域发展很快，新的模型和处理方法不断出现。为了扩展功能，ComfyUI 支持开发者编写自己的节点，并通过插件形式安装。

这些第三方扩展通常称为自定义节点。

例如：

|     自定义节点项目     |          主要功能          |
| :--------------------: | :------------------------: |
| ComfyUI_IPAdapter_plus |     图片参考与特征引导     |
| comfyui_controlnet_aux |    ControlNet 预处理器     |
|    ComfyUI-Manager     |       自定义节点管理       |
|  ComfyUI-Impact-Pack   | 图片处理、检测及工作流辅助 |
|    ComfyUI-Easy-Use    |  提供一系列便捷工作流节点  |

自定义节点可以增加新的功能，也可以改变原有工作流的处理方式。

需要注意：自定义节点不是模型文件。节点负责提供处理功能，模型文件则负责提供生成或识别能力。部分节点需要额外下载模型才能正常使用。

### 2.2、ComfyUI 自定义节点存放在哪里？

通常，自定义节点安装在 ComfyUI 的：

```
ComfyUI/custom_nodes/
```

例如：

```
ComfyUI/
├── models/
│   ├── checkpoints/
│   ├── loras/
│   └── controlnet/
│
├── custom_nodes/
│   ├── ComfyUI-Manager/
│   ├── ComfyUI_IPAdapter_plus/
│   ├── comfyui_controlnet_aux/
│   └── ComfyUI-Impact-Pack/
│
├── input/
├── output/
└── main.py
```

每个自定义节点通常是一个独立目录。

安装后，ComfyUI 启动时会尝试加载这些节点，并将注册成功的节点加入节点菜单。

不同安装版本的目录可能有所不同，尤其是桌面版、便携版和手动安装版。

如果使用的是桌面版，应以实际安装目录和官方说明为准。

### 2.3、安装自定义节点的三种方式

目前常见的安装方式有三种：

1. 通过 ComfyUI Manager 安装。
2. 通过 Git 克隆仓库安装。
3. 手动下载项目文件安装。

初学者优先推荐使用 Manager。

#### 1. 使用 ComfyUI Manager 安装

ComfyUI Manager 是专门用于管理 ComfyUI 扩展的工具。

官方项目：

https://github.com/Comfy-Org/ComfyUI-Manager

它可以帮助用户查找、安装、更新和管理自定义节点。

不同版本的 Manager 界面和菜单可能有所区别，但主要功能类似。

常见功能包括：

|     功能     |              说明              |
| :----------: | :----------------------------: |
|   安装节点   |      搜索并安装第三方节点      |
|   更新节点   |        更新已安装的节点        |
| 缺失节点检查 |    根据工作流查找缺少的节点    |
|   节点管理   |      查看和管理已安装节点      |
|   模型管理   |  部分版本提供相关资源管理入口  |
|   依赖管理   | 部分版本提供依赖检查或修复辅助 |

##### 安装 ComfyUI Manager

如果当前环境还没有安装 Manager，可以参考官方仓库的最新安装说明。

传统手动安装方式如下：

打开终端，进入 ComfyUI 的自定义节点目录：

```
cd ComfyUI/custom_nodes
```

克隆官方仓库：

```
git clone https://github.com/Comfy-Org/ComfyUI-Manager.git
```

然后按照当前 Manager 版本的说明安装依赖。

如果使用 Windows 便携版，需要使用 ComfyUI 对应的 Python 环境。

安装完成后，重启 ComfyUI。

新版 ComfyUI 和 Manager 可能已经提供不同的安装入口，因此实际操作应优先参考官方 README：

https://github.com/Comfy-Org/ComfyUI-Manager

##### 使用 Manager 安装节点

安装完成后，打开 ComfyUI。

根据当前版本的界面，在 Manager 或扩展管理入口中查找自定义节点安装功能。

例如，搜索：

```
ComfyUI_IPAdapter_plus
```

找到对应项目后，选择安装。

安装完成后，根据提示重启 ComfyUI。

重启成功后，就可以在节点菜单中查找对应功能。

#### 2. 使用 Git 安装

如果 Manager 无法找到某个节点，或者需要安装指定版本，可以使用 Git。

例如，安装 IP-Adapter 节点：

```
cd ComfyUI/custom_nodes

git clone https://github.com/cubiq/ComfyUI_IPAdapter_plus.git
```

安装完成后，进入项目目录：

```
cd ComfyUI_IPAdapter_plus
```

如果项目提供 `requirements.txt`，可以根据说明安装依赖：

```
python -m pip install -r requirements.txt
```

注意：这里的 `python` 必须是 ComfyUI 实际使用的 Python 环境。

不同项目的安装要求不同，并不是所有节点都需要执行这条命令。

#### 3. 手动下载 ZIP 安装

如果电脑没有安装 Git，也可以手动下载。

操作步骤：

1. 打开自定义节点的 GitHub 仓库。
2. 找到 Code 按钮。
3. 选择 Download ZIP。
4. 下载并解压文件。
5. 将项目文件夹放入 `ComfyUI/custom_nodes/`。
6. 根据项目说明安装 Python 依赖。
7. 重启 ComfyUI。

需要注意，解压后不要出现多层重复目录。

错误示例：

```
custom_nodes/
└── ComfyUI_IPAdapter_plus-main/
    └── ComfyUI_IPAdapter_plus-main/
        ├── __init__.py
        └── ...
```

正确示例：

```
custom_nodes/
└── ComfyUI_IPAdapter_plus/
    ├── __init__.py
    └── ...
```

实际项目目录名称可以不同，关键是 ComfyUI 能够识别项目结构。

### 2.3、最重要的问题：如何使用正确的 Python 环境？

很多人安装自定义节点时，明明提示安装成功，重启 ComfyUI 后却发现节点依然无法使用。

一个常见原因就是 Python 环境不一致。

例如，电脑可能同时存在：

- 系统 Python
- Anaconda Python
- 虚拟环境 Python
- ComfyUI 便携版 Python

如果把节点依赖安装到了系统 Python，而 ComfyUI 实际使用便携版 Python，就会出现依赖找不到的问题。

#### 1. Windows 便携版

部分便携版 ComfyUI 使用内置 Python 环境。

常见目录：

```
ComfyUI_windows_portable/
├── python_embeded/
├── ComfyUI/
│   ├── main.py
│   └── custom_nodes/
└── run_nvidia_gpu.bat
```

安装依赖时，可以使用：

```
python_embeded\python.exe -m pip install -r ComfyUI\custom_nodes\节点目录\requirements.txt
```

请根据实际安装目录调整路径。

#### 2. Windows 虚拟环境安装版

如果使用 Python 虚拟环境安装 ComfyUI，需要先激活对应环境。

例如：

```
venv\Scripts\activate
```

然后再执行：

```
python -m pip install -r requirements.txt
```

具体依赖文件应以自定义节点项目为准。

#### 3. macOS 或 Linux

如果使用虚拟环境，先进入对应环境：

```
source venv/bin/activate
```

然后安装依赖：

```
python -m pip install -r requirements.txt
```

如果使用桌面版或其他打包方式，应先确认实际 Python 路径，不要直接套用上述命令。

**建议：始终使用** `**python -m pip**`**，并确认这里的 Python 就是 ComfyUI 实际运行的 Python。**

### 2.4、自定义节点安装后如何检查？

节点安装完成后，不要只看安装提示是否成功。

建议进行以下检查。

#### 1. 查看启动日志

重启 ComfyUI 时，终端通常会输出节点加载信息。

如果节点正常加载，一般能够看到对应的加载记录。

如果出现异常，需要关注：

- ModuleNotFoundError
- ImportError
- No module named
- DLL load failed
- CUDA 或 PyTorch 相关错误

这些错误通常说明依赖、版本或运行环境存在问题。

#### 2. 查看节点菜单

打开 ComfyUI 画布，右键打开节点菜单。

搜索刚安装的节点名称。

如果能够找到对应节点，说明至少已经成功注册。

但能找到节点不代表所有功能都能正常运行，部分节点还需要额外模型。

#### 3. 检查模型文件

例如，IP-Adapter 节点安装成功后，还需要下载对应的 IP-Adapter 模型和 CLIP Vision 模型。

ControlNet 预处理器节点安装成功后，也不代表已经安装了所有 ControlNet 模型。

因此，需要区分：

- 节点是否安装成功。
- 节点依赖是否完整。
- 节点所需模型是否存在。
- 模型是否与当前工作流兼容。

### 2.5、如何更新和卸载自定义节点？

自定义节点并不是安装一次就不需要管理。

随着 ComfyUI、PyTorch 和节点项目不断更新，可能需要升级或卸载。

#### 1. 更新节点

如果使用 Manager，可以在已安装节点管理区域查找更新功能。

如果使用 Git 安装，也可以进入对应目录：

```
cd ComfyUI/custom_nodes/ComfyUI_IPAdapter_plus
```

执行：

```
git pull
```

如果项目有特定的升级步骤，应优先遵循项目说明。

更新前建议备份当前工作流和节点版本信息。

#### 2. 卸载节点

使用 Manager 安装的节点，可以优先通过管理界面卸载。

手动安装的节点，可以在关闭 ComfyUI 后删除对应项目目录。

例如：

```
ComfyUI/custom_nodes/ComfyUI_IPAdapter_plus/
```

删除前建议确认该目录确实属于要卸载的项目。

注意：卸载节点不一定会自动删除它安装的 Python 依赖。不要为了卸载一个节点，就随意删除共享依赖库，否则可能影响其他节点。

### 2.6、常见安装冲突及解决方法

自定义节点虽然扩展了 ComfyUI 功能，但也可能带来兼容性问题。

#### 1. Python 依赖版本冲突

例如，两个节点分别要求不同版本的某个 Python 库。

安装其中一个节点后，另一个节点可能无法正常工作。

解决方法：

- 查看两个节点的依赖说明。
- 检查实际安装的库版本。
- 尽量使用项目推荐的版本组合。
- 不要随意升级全部 Python 依赖。

#### 2. PyTorch 或 CUDA 版本冲突

部分自定义节点需要特定版本的 PyTorch、CUDA 或相关运行库。

如果当前 ComfyUI 环境不符合要求，可能出现：

- CUDA 不可用。
- 节点加载失败。
- DLL 加载错误。
- 运行时出现设备或算子错误。

不要直接安装网上随意提供的 PyTorch 版本。

应先确认当前 ComfyUI 使用的 PyTorch、CUDA 运行环境和显卡驱动，再根据节点项目说明处理。

#### 3. 节点版本不兼容

有些工作流是在较旧版本的节点上制作的。

如果直接安装最新版本，可能出现：

- 节点名称变化。
- 输入参数变化。
- 输出端口变化。
- 原有工作流无法正确运行。

遇到这种情况，可以查看原工作流作者提供的节点版本信息，必要时安装对应版本。

#### 4. 安装后 ComfyUI 无法启动

如果安装某个节点后，ComfyUI 启动失败，可以按照下面的步骤排查：

1. 关闭 ComfyUI。
2. 查看启动日志，找到报错的节点目录。
3. 暂时将该节点目录移出 `custom_nodes`。
4. 重新启动 ComfyUI。
5. 如果恢复正常，说明问题很可能与该节点或它的依赖有关。
6. 根据项目说明重新安装或更换兼容版本。

例如，可以先将：

```
custom_nodes/ComfyUI_IPAdapter_plus/
```

临时改名为：

```
custom_nodes/ComfyUI_IPAdapter_plus_disabled/
```

这是一种临时排查方法，并不等于彻底解决依赖问题。

### 2.7、如何管理自己的自定义节点？

随着安装的节点越来越多，建议建立自己的管理记录。

例如：

```
ComfyUI/
└── custom_nodes/
    ├── ComfyUI-Manager/
    ├── ComfyUI_IPAdapter_plus/
    ├── comfyui_controlnet_aux/
    ├── ComfyUI-Impact-Pack/
    └── ComfyUI-Easy-Use/
```

可以额外建立一份节点清单：

|        节点名称        |    主要用途    |    是否需要模型    |
| :--------------------: | :------------: | :----------------: |
|    ComfyUI-Manager     |    节点管理    |     通常不需要     |
| ComfyUI_IPAdapter_plus |    图片参考    |        需要        |
| comfyui_controlnet_aux |   图片预处理   | 视具体预处理器而定 |
|  ComfyUI-Impact-Pack   | 图片处理和检测 |    部分功能需要    |
|    ComfyUI-Easy-Use    | 便捷工作流节点 |   视具体功能而定   |

建议记录：

- 项目仓库地址。
- 安装日期。
- 当前版本或 Git 提交记录。
- 需要的 Python 依赖。
- 是否需要额外模型。
- 对应工作流。

这样以后出现问题，就能快速定位是哪一个节点导致的。

另外，建议定期备份：

- `custom_nodes/`
- `models/`
- `workflows/`
- `extra_model_paths.yaml`

其中模型文件通常比较大，可以单独管理，不必每次完整复制。

## 三、动手练习：安装一个自定义节点

这次建议安装一个前面学习过的 IP-Adapter 扩展。

项目地址：

https://github.com/cubiq/ComfyUI_IPAdapter_plus

练习步骤：

1. 打开项目官方仓库。
2. 阅读 README，确认安装要求。
3. 通过 Manager 或 Git 安装。
4. 按照项目要求安装 Python 依赖。
5. 重启 ComfyUI。
6. 在节点菜单中搜索 IP-Adapter。
7. 确认节点是否正常显示。
8. 查看项目说明，了解所需模型及存放目录。

注意：安装节点只是第一步，后续还需要准备兼容的 IP-Adapter 模型、CLIP Vision 等资源，才能运行完整工作流。

如果当前电脑显存有限，可以先完成节点安装和菜单检查，不必立即运行复杂的人物一致性工作流。

## 四、总结

ComfyUI 自定义节点是扩展功能的重要方式。

初学阶段，建议先掌握三种安装方法：

- Manager：适合日常查找和安装。
- Git：适合安装指定项目和版本。
- ZIP：适合没有 Git 环境的用户。

同时要特别注意 Python 环境、依赖版本和模型文件。

遇到节点无法使用时，不要急着重新安装整个 ComfyUI。先看启动日志，再检查节点目录、Python 依赖和模型文件，通常更容易定位问题。

