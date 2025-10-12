---
title: React Native高频面试题——性能优化(7)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: ebb33fe2
date: 2025-10-12 18:44:41
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
1.列表性能优化：FlatList、SectionList、RecyclerListView、分页加载、虚拟化、懒加载
2.通用性能优化：内存管理(避免内存泄漏)、减小包体积(Hermes、拆分 bundle)、动画与手势优化(Reanimated、Gesture Handler)
3.适配策略：Platform API、Dimensions、自适应布局(Flexbox、Responsive UI)、SafeAreaView、屏幕适配
4.AI 辅助开发：Cursor、Trae、Claude Code、Copilot
```

### 三 面试题解答(仅供参考)

### 3.1 列表性能优化

1、FlatList 和 SectionList 的区别？何时使用？

```
1、区别：
-FlatList：渲染简单扁平列表(数组数据)，支持水平/垂直滚动、头部/尾部组件，适合商品列表、聊天记录等。
-SectionList：支持分组列表(sections 数组，含title和data)，内置SectionHeader，适合联系人、设置页面等。

2、使用场景：
FlatList 用于简单列表；SectionList 用于分组数据。

3、简化版
FlatList → 扁平列表（商品列表）。
SectionList → 分组列表（通讯录）。
区别：数据结构不同，SectionList 内置 SectionHeader。
```

2、FlatList、SectionList 和 RecyclerListView 的区别？性能优化原理？

```
1、FlatList/SectionList：基于 VirtualizedList，只渲染可见区域（虚拟化）。

2、RecyclerListView：额外实现“视图回收”，重用不可见 item 的容器，性能更优，适合上万条数据。

3、优化原理：
-虚拟化：只渲染可见项，减少 DOM 和内存开销。
-视图回收(RecyclerListView)：重用视图容器，降低创建/销毁成本。
-分页加载：结合 onEndReached 实现数据懒加载。
```

3、如何优化 FlatList/SectionList？

```
1、优化
initialNumToRender → 首屏只渲染必要的 items。
getItemLayout → 固定高度直接计算位置，避免测量。
keyExtractor + React.memo → 减少不必要的重渲染。
windowSize / maxToRenderPerBatch → 控制缓存数量。
removeClippedSubviews → 卸载不可见 item。
分页加载 → onEndReached 实现懒加载。

2、示例
<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
  windowSize={5}
  removeClippedSubviews
  renderItem={({ item }) => <MemoizedItem data={item} />}
  onEndReached={() => loadMoreData()}
/>
```

4、虚拟化（Virtualization） vs 懒加载（Lazy Loading）？

```
虚拟化：只渲染屏幕可见 items，滚出视口即卸载。
懒加载：按需请求数据，常结合分页（滚动到尾部再请求下一页）。
```

5、为什么用 FlatList/SectionList 替代 ScrollView？

```
ScrollView 一次性渲染所有子元素，长列表会严重卡顿；
FlatList/SectionList 有虚拟化，性能更优。
```

### 3.2 通用性能优化

1、如何避免 React Native 内存泄漏？

```
1.清理定时器/监听器：在 useEffect 清理函数或 componentWillUnmount 中移除。
2.取消订阅：Redux/MobX 等状态监听要及时解绑。
3.异步请求：在卸载组件时中断或忽略请求结果，避免 setState。
4.工具：用 Flipper / Chrome DevTools 做内存快照分析。
```

2、如何减小 RN 包体积？Hermes 的作用？

```
1.启用 Hermes：AOT 编译字节码，减小 bundle、加快启动。
2.移除冗余依赖/资源，压缩图片（WebP/SVG）。
3.启用 R8/ProGuard（Android 混淆压缩）。
4.代码分包：动态 import，按需加载模块。
```

3、如何优化动画和手势？

```
1.react-native-reanimated：动画运行在 UI 线程，避免 JS Bridge 卡顿。
2.react-native-gesture-handler：原生层识别手势，响应更快。
3.useNativeDriver: true：让简单动画交由原生驱动。
```

### 3.3 适配策略

1、如何实现跨平台/多尺寸适配？

```
1.Platform：区分 iOS/Android 样式或逻辑。
2.Dimensions / useWindowDimensions：获取屏幕宽高，动态布局。
3.Flexbox：自适应布局基础。
4.PixelRatio：字体/边距缩放。
5.多倍图资源（@2x、@3x）
```

2、SafeAreaView 的作用？如何兼容 Android？

```
1.IOS：自动填充安全区域（刘海、底部 home 指示条）。
2.Android：需用 react-native-safe-area-context 或手动加 StatusBar.currentHeight。
```

3、如何处理横竖屏自适应？

```
1.监听 Dimensions.addEventListener('change', handler)。
2.或用 useWindowDimensions 钩子自动触发重渲染。
3.三方库：react-native-orientation-locker
```

### 3.4 AI 辅助开发

1、常见 AI 工具在 RN 开发中的作用？

```
1.Copilot：代码补全/生成，适合常用 RN API。
2.Cursor：AI IDE，支持项目级理解、重构。
3.Claude Code：逻辑强，适合调试复杂桥接 Bug。
4.Trae：中文支持好，可生成 RN 测试用例。

场景：生成样板代码、优化 FlatList、调试 Native 模块、写测试。
```

2、你常用的 AI 工具是什么？如何帮你解决 RN 问题？

```
（示例）Copilot →

-快速生成基础组件模板。
-补全 Hook/API 用法（如 getItemLayout）。
-自动生成样式（Flexbox 布局）。
-提供复杂逻辑/正则的实现建议。
```
