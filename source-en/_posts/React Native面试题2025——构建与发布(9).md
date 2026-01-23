---
title: React Native面试题2025——构建与发布(9)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 2171856b
date: 2025-04-10 10:14:16
---
## 一 概述

1. React Native 应用的构建和发布流程是怎样的？如何分别为 iOS 和 Android 构建应用？
2. 如何在 React Native 中实现自动化构建（例如使用 CI/CD 工具）？
3. React Native 中如何进行代码分割和按需加载？如何减少初始加载时间？

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 React Native 应用的构建和发布流程是怎样的？如何分别为 iOS 和 Android 构建应用？

```
在 React Native 中，构建和发布应用到 iOS 和 Android 平台的流程大致如下：

一、通用准备工作
1.1 安装依赖
npm install 或 yarn install
1.2 打包 JS Bundle（可选）
开发阶段不需要打包，发布前需要：

npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res
  
二、构建和发布 Android 应用
2.1 配置签名（android/app/ 目录）
-生成密钥：
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
-将 .keystore 文件放入 android/app 目录
-在 android/gradle.properties 中配置签名信息：
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****

2.2 构建 APK 或 AAB

cd android
./gradlew assembleRelease         # 生成 APK
./gradlew bundleRelease           # 生成 AAB（Google Play 推荐格式）
2.3 发布
-上传 APK 或 AAB 到 Google Play 控制台
-提交审核，完成发布

三、构建和发布 iOS 应用（需 macOS）
3.1 打开 Xcode 工程
npx pod-install ios
open ios/YourApp.xcworkspace
3.2 配置签名 & 证书
-在 Xcode 中配置 开发者账号、Bundle ID
-配置 Provisioning Profile 和 签名证书

3.3 构建发布包
-选择 Generic iOS Device
-菜单栏 Product → Archive
-Archive 成功后，点击 Distribute App

3.4 上传到 App Store
-使用 Xcode 或 Transporter 上传
-到 App Store Connect 中提交审核，完成发布
```

二、表格

|  平台   |         构建命令          |  发布平台   |
| :-----: | :-----------------------: | :---------: |
| Android | ./gradlew assembleRelease | Google Play |
|   iOS   |      Xcode → Archive      |  App Store  |

### 2.2 如何在 React Native 中实现自动化构建（例如使用 CI/CD 工具）？

```
一、概念
在 React Native 中实现自动化构建（CI/CD）可以借助一些常见的持续集成工具
（如 GitHub Actions、Bitrise、Fastlane、Codemagic 等），
实现代码提交后自动构建 APK/AAB 或 IPA 文件，并上传到测试平台或商店。

二、自动化构建的基本流程
-代码提交到 Git 仓库（如 GitHub/GitLab）
-CI 工具检测变更，开始执行构建流程
-安装依赖（如 npm install、pod install）
-打包 React Native Bundle
-构建平台发布包（Android APK/AAB，iOS IPA）
-自动上传到测试平台（如 Firebase App Distribution、TestFlight）或商店

三、常用 CI/CD 工具方案
3.1 GitHub Actions
配置 .github/workflows/android.yml 或 ios.yml 文件

示例 Android 构建步骤：
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 安装依赖
        run: npm install
      - name: 构建 Android APK
        run: cd android && ./gradlew assembleRelease
        
3.2 Bitrise
-免费适合移动端，图形化配置简单
-支持 React Native、Flutter 等
-内置步骤支持构建、测试、上传 TestFlight、Slack 通知等

3.3 Fastlane
-常用于上传 App Store / Google Play
-支持自动打包、签名、提交审核
# 安装 fastlane
gem install fastlane -NV

# 初始化 Android 项目
cd android && fastlane init

# 构建并上传到 Google Play
fastlane android deploy

四、 Android 自动化构建注意事项
-配置好 keystore 和签名信息
-环境变量中注入签名密码

五、 iOS 自动化构建注意事项
-需要 macOS 构建环境（如 Mac mini、MacCloud）
-需配置好签名证书和 provisioning profile
-使用 xcodebuild 或 fastlane gym 进行打包
```

二、表格

|      工具      |                    特点                     |
| :------------: | :-----------------------------------------: |
| GitHub Actions |        免费、灵活、适合 GitHub 项目         |
|    Bitrise     |         图形化界面、适合移动端项目          |
|    Fastlane    |   专注发布、支持 App Store / Google Play    |
|   Codemagic    | 针对 React Native / Flutter 的云 CI/CD 平台 |

### 2.3 React Native 中如何进行代码分割和按需加载？如何减少初始加载时间？

```
在 React Native 中，虽然不像 Web 那样直接支持代码分割，
但可以通过一些策略实现 按需加载 和 减少初始加载时间：

一、使用动态导入实现按需加载
可以使用 ES6 的 import() 动态导入模块，实现延迟加载组件。
const LazyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
注意：在 React Native 中使用 React.lazy 时，需要确保模块不是同步依赖于其他组件。

二、2. 页面级按需加载（结合导航）
通过 React Navigation 的懒加载特性，仅在用户访问页面时加载对应组件：
<Stack.Screen
  name="Profile"
  getComponent={() => require('./screens/Profile').default}
/>
或配合动态 import() 实现懒加载组件。

三、分离大模块或资源文件
-将大型组件、图片、JSON 数据等按模块拆分；
-避免在 App.js 中一次性导入所有内容；
-使用异步加载（如网络请求）获取非必要资源。

四、使用 InteractionManager 延迟执行耗时操作

五、精简首屏组件 & 控制导航栈深度
-首屏展示应尽量简单，避免复杂计算和组件树；
-初始加载页面不要嵌套过多导航结构。
```

二、表格

|          方法           |          说明          |
| :---------------------: | :--------------------: |
| React.lazy` + `Suspense |    实现组件按需加载    |
|      getComponent       |     页面级延迟加载     |
|   InteractionManager    |     推迟执行重任务     |
|        模块拆分         | 避免一次性加载所有内容 |
|        优化首屏         |    降低初始渲染压力    |

