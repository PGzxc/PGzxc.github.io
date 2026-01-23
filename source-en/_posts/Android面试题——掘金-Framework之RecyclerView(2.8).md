---
title: Android面试题——掘金-Framework之RecyclerView(2.8)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: ed422043
date: 2025-04-05 11:35:21
---
## 一 概述

```
RecyclerView 是 Android 开发中常见的 UI 组件，面试高频考点主要包括：
RecyclerView 结构、ViewHolder 复用、LayoutManager、ItemDecoration、缓存机制、滑动优化等。
以下是面试常见问题及解析。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 RecyclerView 的基本原理是什么？

```
1.原理
RecyclerView 采用 "View 复用 + 局部刷新" 机制，高效管理大数据列表。

2.核心组件
-Adapter（适配器）：绑定数据 & 负责创建 ViewHolder。
-ViewHolder（缓存项）：避免 findViewById() 提高性能。
-LayoutManager（布局管理器）：负责列表排列方式，如 LinearLayoutManager、GridLayoutManager。
-ItemDecoration（装饰类）：处理分割线、间距、背景等 UI 需求。
-ItemAnimator（动画）：负责列表的添加、删除、更新动画
```

### 2.2 RecyclerView 与 ListView 的区别？

|    对比项     |         RecyclerView         |      ListView      |
| :-----------: | :--------------------------: | :----------------: |
|  ViewHolder   |    必须使用 `ViewHolder`     | 可选 `ViewHolder`  |
|   缓存机制    | 三级缓存（RecycledViewPool） |      二级缓存      |
|   Item 复用   |    通过 `ViewHolder` 复用    | `convertView` 复用 |
| LayoutManager | 可扩展（线性、网格、瀑布流） |     仅支持线性     |
|     动画      |     内置 `ItemAnimator`      |     需要自定义     |
|     性能      |       适用于大数据集合       |      性能较弱      |

### 2.3 RecyclerView 的缓存机制是怎样的？

```
1.RecyclerView 采用 三级缓存机制：
1.1 ViewHolder 直接复用（一级缓存）：若 ViewHolder 仍在屏幕内，直接复用。
1.2 mCachedViews（二级缓存）：存放 2~5 个 ViewHolder，避免 onBindViewHolder() 重新绑定数据。
1.3 RecycledViewPool（三级缓存）：释放到 RecyclerViewPool 进行共享复用。

2.示例：获取缓存池 ViewHolder
RecyclerView.RecycledViewPool pool = recyclerView.getRecycledViewPool();
pool.getRecycledView(0); // 获取 ViewHolder
```

### 2.4 RecyclerView 复用池（RecycledViewPool）如何工作？

```
1.RecycledViewPool 负责多个 RecyclerView 之间共享 ViewHolder，减少 View 创建。

2.常见方法
recyclerView.setRecycledViewPool(pool);  // 共享缓存池
pool.setMaxRecycledViews(0, 10);         // 设置最大缓存数量
适用于 多个 RecyclerView 共享相同 Item 类型 的场景（如 ViewPager + RecyclerView）。
```

### 2.5 LayoutManager 有哪些？各有什么特点？

|       LayoutManager        |                 特点                 |
| :------------------------: | :----------------------------------: |
|    LinearLayoutManager     |   线性布局（水平/垂直），默认方式    |
|     GridLayoutManager      | 网格布局（N 列/行），类似 `GridView` |
| StaggeredGridLayoutManager |     瀑布流布局，高度/宽度不固定      |
|    Custom LayoutManager    |              自定义布局              |

示例：垂直网格

```
GridLayoutManager layoutManager = new GridLayoutManager(context, 3);
recyclerView.setLayoutManager(layoutManager);
```

### 2.6 如何优化 RecyclerView 性能？

```
1.开启 setHasFixedSize(true)（如果 Item 高度固定）
recyclerView.setHasFixedSize(true);

2.使用 DiffUtil 代替 notifyDataSetChanged()（避免全局刷新）
DiffUtil.calculateDiff(callback).dispatchUpdatesTo(adapter);

3.避免嵌套滑动（NestedScrollingEnabled = false）
recyclerView.setNestedScrollingEnabled(false);

4.预加载 & 预缓存
recyclerView.setItemViewCacheSize(10);

5.减少 onBindViewHolder() 频繁执行的逻辑。
```

### 2.7 解决 RecyclerView 滑动卡顿？

```
-优化 ViewHolder 复用
-减少 onBindViewHolder() 中的计算
-避免 Glide/Picasso 每次加载新图片
-开启 DiffUtil 局部刷新
-使用 setItemViewCacheSize() 增加缓存
```

### 2.8 如何实现 RecyclerView 局部刷新？

```
1.更新某个 Item
adapter.notifyItemChanged(position);

2.插入/删除 Item
adapter.notifyItemInserted(position);
adapter.notifyItemRemoved(position);

3.使用 DiffUtil 进行局部刷新
DiffUtil.calculateDiff(callback).dispatchUpdatesTo(adapter);
```

### 2.9 DiffUtil 是什么？如何使用？

```
1.概念
DiffUtil 通过 最小差异比对 进行高效更新，避免 notifyDataSetChanged() 全局刷新。

2.示例
DiffUtil.Callback callback = new DiffUtil.Callback() {
    @Override
    public int getOldListSize() {
        return oldList.size();
    }

    @Override
    public int getNewListSize() {
        return newList.size();
    }

    @Override
    public boolean areItemsTheSame(int oldItemPosition, int newItemPosition) {
        return oldList.get(oldItemPosition).id == newList.get(newItemPosition).id;
    }

    @Override
    public boolean areContentsTheSame(int oldItemPosition, int newItemPosition) {
        return oldList.get(oldItemPosition).equals(newList.get(newItemPosition));
    }
};

// 计算差异
DiffUtil.DiffResult result = DiffUtil.calculateDiff(callback);
result.dispatchUpdatesTo(adapter);
```

### 2.10 如何自定义 RecyclerView 的 ItemDecoration？

```
1.概念
ItemDecoration 负责 绘制分割线、间距、背景等。

2.示例：自定义分割线
public class MyItemDecoration extends RecyclerView.ItemDecoration {
    private Paint paint;

    public MyItemDecoration() {
        paint = new Paint();
        paint.setColor(Color.GRAY);
    }

    @Override
    public void onDraw(Canvas c, RecyclerView parent, RecyclerView.State state) {
        for (int i = 0; i < parent.getChildCount(); i++) {
            View child = parent.getChildAt(i);
            c.drawRect(child.getLeft(), child.getBottom(), child.getRight(), child.getBottom() + 2, paint);
        }
    }
}

3.使用
recyclerView.addItemDecoration(new MyItemDecoration());
```

### 2.11 RecyclerView 如何实现加载更多？

```
1.监听滑动事件
recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
    @Override
    public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
        if (!recyclerView.canScrollVertically(1)) { // 滚动到底部
            loadMoreData();
        }
    }
});

2.添加 FooterView
```

### 2.12 总结

```
-RecyclerView 比 ListView 性能更强，支持自定义 LayoutManager、缓存池
-三级缓存（ViewHolder、mCachedViews、RecycledViewPool）提升性能
-setHasFixedSize(true)、DiffUtil、setItemViewCacheSize() 提高滑动流畅度
-ItemDecoration 可自定义分割线
-监听 addOnScrollListener() 可实现加载更多
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)

