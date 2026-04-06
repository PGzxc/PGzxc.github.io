---
title: Jupyter系列之——数据分析与可视化实战(6)
categories:
  - AI
  - AI应用
  - AI办公
  - Jupyter
tags:
  - Jupyter
abbrlink: e8a1c7e4
date: 2026-04-06 12:06:51
---
## 一 概述

```
本文介绍：
 - 典型流程
 - 可视化
 - 交互式输出
```

<!--more-->

## 二 典型流程

```
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data.csv")
df.head()
```

## 三 可视化

```
df.plot()
plt.show()

Notebook 支持：
- 图表
- HTML
- 视频
- LaTeX 
```

## 四 交互式输出

```
from ipywidgets import interact
```

