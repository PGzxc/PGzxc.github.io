---
title: React Native开发之——安全区域
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 48658a06
date: 2025-12-09 08:53:40
---
## 一 概述

```
本文介绍：
 - 官方组件SafeAreaView
 - 推荐库：react-native-safe-area-context
```

<!--more-->

## 二 官方组件SafeAreaView

### 2.1 说明

```
从 react-native 自带的 SafeAreaView（iOS ≥ 11 有效，Android 自动模拟）
```

### 2.2 示例

```
1、布局文件
import { SafeAreaView, StyleSheet, Text } from 'react-native';

<SafeAreaView style={styles.container}>
  <Text>内容不会被刘海或底部导航挡住</Text>
</SafeAreaView>

2、布局配置
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

## 三 推荐库：react-native-safe-area-context

### 3.1 说明

```
更强大的安全区域适配库，支持监听 inset 变化
横竖屏切换、刘海设备、鸿蒙系统
```

### 3.2 安装

```
npm install react-native-safe-area-context
# 或
yarn add react-native-safe-area-context
```

### 3.3 示例

```
import { SafeAreaProvider, SafeAreaInsetsContext } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={{
              paddingTop: insets?.top || 0,
              paddingBottom: insets?.bottom || 0,
              flex: 1,
              backgroundColor: '#f8f8f8',
            }}>
            <Text>安全区域内显示内容</Text>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
}
```

