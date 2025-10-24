---
title: IOS面试题——高频面试题之基础(1)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: bff78e88
date: 2025-09-23 08:53:36
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题(后续类似不再详述)

### 2.1 面试要求(技术点提取)

```
1.编程语言与框架项目经验：Objective-C、Swift、SwiftUI、UIKit
2.UI 渲染与动画：包括自定义 View、Core Animation
3.网络编程：包括网络请求、图片加载
4.多线程：GCD 等机制
5.数据持久化：包括存储机制、Core Data
6.JS 与原生交互
7.Block:闭包定义、捕获机制、回调与异步处理
8.App Store 上架经验：处理 4.3a/4.3b 问题，通过率 50% 以上
```

### 2.2 如何提问(注意关键词)

```
1.向谁提问：
-借助于AI：回答的精确度和准确度跟模型有关，可以多试几个或多试几次
-可以尝试的AI工具：chatgpt，gemini，grok，豆包等语言环境明确且对编程语言识别度高

2.关键词
-哪种开发语言：IOS
-来自于哪里或去哪里查找：如(结合面试招聘要求和互联网分享)
-如何归纳：结合一下知识点
-如何总结：总结常见面试题并给出解答

3.结合之后的示例
-结合面试招聘要求和互联网分享，结合一下知识点，总结常见面试题并给出解答
-用适合程序员的文档整理，要求回答尽量贴近官方文档，并加以整理优化
```

### 2.3 如何处理

```
1.每个知识点
-ai会给出答案，不一定准确，可以切换ai工具或模型来提问

2.如何处理
-根据现有知识，粗读一下，判断ai给出的知识准确性和精确性及回答专业性和扩展知识点
-多问几次或重试或切换ai工具或模型，结合每次回答或综合考虑后给出结果
-最终还是要参考官方文档，搜索官方文档最终确定下来
-帮我分析一下下面IOS的技能是否有重复
-下面是我总结的，请帮我总结后优化一下
```
## 三 面试题解答(仅供参考)

### 3.1 编程语言与框架项目经验：Objective-C、Swift、SwiftUI、UIKit

面试考点

```
1.Swift vs Objective-C 的差异
2.SwiftUI vs UIKit 的优缺点与场景选择
3.Optionals(可选类型)、Nil Coalescing(空合运算符)等语言特性
4.项目中对 UI 框架的实际应用
```

1、Swift 和 Objective-C 的主要区别？

```
Swift：现代语言，类型安全（Optionals、泛型），语法简洁，性能优，减少内存泄漏风险。
Objective-C：基于 C 的动态语言，依赖运行时反射，灵活但易出错。
应用场景：新项目优先 Swift，历史项目维护多用 Objective-C
```

2、SwiftUI 和 UIKit 的优缺点？

```
1、SwiftUI：
优点：声明式 UI，代码简洁，支持跨平台，实时预览。
缺点：仅支持 iOS 13+，复杂动画需结合 UIKit。

2、UIKit：
优点：成熟稳定，支持复杂交互和自定义控件。
缺点：命令式开发，开发周期较长。
```

3、在项目中如何选择SwiftUI还是UIKit？

```
SwiftUI：适合 iOS 13+ 的新项目，提升开发效率。
UIKit：适配旧系统或复杂 UI 场景。
混合开发：通过 UIHostingController 将 SwiftUI 嵌入 UIKit 项目。
```

4、Swift 中的 Optionals(可选类型) 和 Nil Coalescing(空合运算符)？

```
Optionals：通过 ? 声明，允许值为 nil，避免野指针崩溃。
Nil Coalescing (??)：提供默认值，如 let value = optional ?? "default"。
优势：提升代码安全性和可读性
```

5、描述一个使用UIKit的项目经验

```
在一个社交App中
-使用TableView/CollectionView构建动态列表，支持自定义Cell与手势操作。
-结合 Auto Layout 实现响应式 UI，适配多尺寸屏幕。
-采用 NSDiffableDataSource 优化性能和代码维护性
```

### 3.2 UI 渲染与动画：包括自定义 View、Core Animation

面试考点

```
1.iOS 渲染机制与绘制流程
2.Core Animation 原理与使用
3.自定义 View 的实现方式
4.UI 动画性能优化
5.UIView 与 CALayer 的区别
6.隐式/显式动画
```

1、iOS UI渲染流程是什么？

```
驱动：Run Loop 驱动 UI 更新。
流程：视图标记为 dirty → drawRect/draw(_:) → Core Animation 提交 GPU 渲染。
优化：基于 Layer 渲染，减少主线程阻塞。
```

2、UIView 绘制流程？

```
1.绘制流程
setNeedsLayout → layoutSubviews → draw(_:)

2、说明
-setNeedsLayout：标记布局更新
-layoutSubviews：计算子视图位置
-draw(_:)：执行绘制
```

3、如何创建自定义View？

```
方式 1：继承 UIView，重写 draw(_:) 使用 Core Graphics 绘制。
方式 2：使用 CAShapeLayer + 贝塞尔曲线绘制复杂形状。
注意：布局使用 Auto Layout 或 frame，避免在 init 中绘制
```

4、Core Animation的工作原理是什么？

```
核心：基于 GPU 加速，操作 Layer 树（Model Layer、Presentation Layer、Render Tree）。
特点：动画独立线程执行，不阻塞主线程。
实现：CABasicAnimation、CAKeyframeAnimation 等
```

5、如何优化UI动画性能？

```
使用 shouldRasterize 缓存复杂图层（注意内存）。
优先修改 GPU 属性（如 opacity、transform），减少 CPU 计算。
避免离屏渲染，减少透明视图叠加。
使用 Instruments（Core Animation/Time Profiler）分析瓶颈
```

6、UIView 与 CALayer 的区别

```
UIView：处理事件响应、布局和视图层级。
CALayer：负责内容显示和动画。
关系：UIView 包含一个根 CALayer（view.layer），复杂动画需直接操作 CALayer
```

7、隐式动画 vs 显式动画

```
隐式动画：修改 CALayer 可动画属性，系统自动生成过渡动画。
显式动画：通过 CAAnimation 自定义时长、曲线等
```

8、自定义路径动画示例

```
let animation = CAKeyframeAnimation(keyPath: "position")
let path = UIBezierPath()
path.move(to: CGPoint(x: 0, y: 0))
path.addCurve(to: CGPoint(x: 300, y: 400),
              controlPoint1: CGPoint(x: 150, y: 0),
              controlPoint2: CGPoint(x: 150, y: 400))
animation.path = path.cgPath
animation.duration = 2.0
layer.add(animation, forKey: "pathAnimation")
```

9、 项目经验示例

```
在一个社交 App 中：
-为 UINavigationController 切换添加自定义 CATransition（fade 效果）。
-结合 UIView.animate 和 Core Animation 确保流畅自然
```

10、总结

```
重点：理解渲染机制（Run Loop + Core Animation）、性能优化和动画实现。
面试建议：结合项目（如自定义过渡动画、复杂图形绘制）展示实践经验
```

### 3.3 网络编程：包括网络请求、图片加载

面试考点

```
1.URLSession 与 Alamofire 的对比
2.异步请求与图片加载
3.错误处理与网络层封装
4.缓存与性能优化
```

1、URLSession 基本使用

```
步骤：配置 → 创建 URLRequest → 启动 dataTask → 调用 resume() → 解析响应。
特点：支持 JSON 解析、下载/上传、后台任务
```

2、Alamofire的优势是什么？

```
封装 URLSession，提供链式 API。
支持参数编码、响应验证、多部分上传、认证处理。
缺点：增加外部依赖
```

3、如何异步加载图片？

```
常用库：SDWebImage、Kingfisher（支持内存+磁盘缓存、占位图、任务取消）。
手动实现：URLSession 下载 → DispatchQueue.main.async 更新 UI
```

4、网络错误处理

```
检查 HTTP 状态码和响应数据。
使用 do-try-catch 捕获 JSON 解析异常。
提供用户友好提示，支持重试机制（如指数退避）
```

5、网络层封装

```
统一 APIClient：请求方法、参数编码、响应解析（Codable）。
拦截器：日志、认证 Token。
解耦缓存与错误处理
```

6、优化手段

```
使用 URLCache 或磁盘缓存减少重复请求。
图片加载使用内存+磁盘双缓存。
合理使用 GCD/OperationQueue，避免主线程阻塞。
使用 Instruments 分析网络性能
```

7、项目经验示例(在电商 App 中)

```
在一个电商 App 中：

-使用 Alamofire 上传商品图片，支持进度回调。
-使用 Codable 解析 JSON 响应。
-配合 SDWebImage 缓存商品图片，提升滚动性能
```

8、总结

```
重点：框架差异、异步加载、错误处理、封装与优化。
面试建议：结合项目（如电商、社交）阐述封装思路和优化实践
```

### 3.4 多线程：GCD 等机制

面试考点

```
1.GCD 基础与使用场景
2.GCD vs NSOperation 区别
3.线程安全与死锁问题
4.任务依赖/取消
5.项目实践案例
```

1、GCD是什么，如何使用？

```
1、概念：
Grand Central Dispatch，苹果并发框架，使用 DispatchQueue 管理任务

2、队列类型：
-主队列（DispatchQueue.main）：负责 UI 更新
-全局并发队列（DispatchQueue.global()）：后台任务
-自定义串行/并发队列

3、示例：

DispatchQueue.global().async {
    heavyTask()
    DispatchQueue.main.async {
        updateUI()
    }
}
```

2、GCD和NSOperation的区别？

```
GCD：轻量、性能高，但不支持任务依赖/取消。
NSOperation：支持依赖、优先级、取消，适合复杂任务管理。
关系：OperationQueue 基于 GCD 实现
```

3、死锁问题与避免

```
1、死锁场景：
主线程调用 DispatchQueue.main.sync 导致死锁。

2、避免方法：
-优先使用 async 而非 sync。
-避免嵌套同步调用。
-使用 Thread Sanitizer 检查并发问题
```

4、NSOperationQueue 使用场景

```
适合任务依赖或可取消场景（如下载 → 解析 → 存储）。
可通过 maxConcurrentOperationCount 控制并发数
```

5、常见多线程场景

```
异步网络请求后主线程更新 UI。
串行队列确保线程安全（如数据库写入）。
并发队列提升性能（如批量图片处理）
```

6、项目经验示例

```
在文件下载 App 中：
-使用 OperationQueue 管理多任务下载，支持暂停/恢复/取消。
-配合 GCD 切回主线程更新进度 UI
```

7、总结

```
GCD：适合简单并发任务。
NSOperation：适合复杂任务管理。
面试重点：阐述死锁原因、避免方法及项目实践
```

### 3.5 数据持久化：包括存储机制、Core Data

面试考点

```
存储方式对比
Core Data 原理与迁移
项目中持久化选型
```

1、iOS 数据持久化方式有哪些？

```
UserDefaults：轻量键值对（配置、偏好）。
FileManager/Plist：文件存储。
Keychain：加密敏感数据（Token、密码）。
Core Data：对象图管理，适合复杂关系。
SQLite/Realm：灵活数据库，适合结构化数据
```

2、Core Data的工作原理？

```
1、组件：
NSManagedObjectContext：对象增删改查。
Persistent Store Coordinator：连接存储（如 SQLite）。
NSManagedObjectModel：数据模型。

2、特性：
对象关系映射、批量查询、版本迁移
```

3、Core Data 优点？

```
对象化管理，优于直接 SQL。
支持复杂查询、关系映射、自动迁移
```

4、UserDefaults vs Core Data？

```
UserDefaults：小规模键值对，简单快捷
Core Data：支持复杂关系、查询和版本控制，适合复杂关系和中大型应用
```

5、Core Data 迁移方案

```
轻量迁移：字段简单增减，自动处理。
自定义迁移：复杂变化需实现 NSEntityMigrationPolicy。
最佳实践：多测试，避免线上崩溃
```

6、项目经验示例

```
在笔记类 App 中：
-使用 Core Data 存储笔记实体，支持搜索、分类查询。
-使用 UserDefaults 存储用户偏好（如主题、排序方式）。
-在版本升级时采用轻量迁移，保证老用户数据无缝迁移。
```

### 3.6 JS 与原生交互

面试考点

```
WKWebView 与 JavaScriptCore
JSBridge 通信机制
Hybrid 应用场景
```

1、如何实现 JS 与原生交互？

```
1、JS → 原生：
window.webkit.messageHandlers.<name>.postMessage() 调用。
iOS 端实现 WKScriptMessageHandler 接口接收消息。

2、原生 → JS：
使用 evaluateJavaScript(_:completionHandler:) 执行 JS 并获取回调。
```

2、WKWebView vs UIWebView？

```
WKWebView：性能更佳、内存占用低、安全性高，运行在独立进程，支持 Nitro JS 引擎。
UIWebView：已废弃，不建议使用。
```

3、JavaScriptCore的使用？

```
1、主要用于 离线执行 JS 代码 或在不依赖 WebView 的场景。

2、使用 JSContext 创建执行环境，可通过：
-context.evaluateScript("...") 执行 JS。
-context["nativeFunc"] = { ... } 注入原生方法供 JS 调用。
```

4、如何处理JS回调？

```
消息回调：WKScriptMessageHandler 接收。
执行回调：evaluateJavaScript 的闭包返回结果或错误。
```

5、常见实现方式

```
WKWebView + WKScriptMessageHandler：主流 Hybrid 通信方案。
JavaScriptCore：无 UI 的 JS 执行与数据处理。
JSBridge：封装统一调用层，方便多端维护。
```

6、应用场景？

```
Hybrid App（原生 + H5 混合开发）。
活动页、内嵌小程序容器。
本地 JS 引擎执行（如规则解析、脚本计算）。
```

7、项目经验示例

```
在一个 Hybrid App 中：
-使用 WKWebView 加载 H5 活动页。
-JS 调用原生相机 API 上传图片。
-原生调用 JS 更新 UI。
-封装 JSBridge 提升维护性
```
### 3.7 Block:闭包定义、捕获机制、回调与异步处理

面试考点

```
Block 本质与分类、变量捕获机制、循环引用与解决方案
Swift 闭包与函数的区别、捕获列表（weak/unowned）
Block/闭包在异步回调中的应用（GCD、网络请求）
```

1、Block 的本质是什么？有哪几种类型？

```
1、本质：
Block 是封装了代码和上下文变量的 对象，编译时会被转换为一个 struct，内部包含函数指针和捕获的变量。

2、类型：
_NSConcreteGlobalBlock：存储在全局区，无捕获或仅捕获全局/静态变量。
_NSConcreteStackBlock：存储在栈上，捕获局部变量，随作用域销毁。
_NSConcreteMallocBlock：存储在堆上，由栈拷贝而来（如属性赋值、dispatch_async 时自动 copy）。
```

2、Block 的循环引用是如何产生的？如何解决？

```
1、产生原因：
Block 内部强引用了外部对象（如 self），而外部对象又持有该 Block → Retain Cycle。

2、解决方案：
__weak typeof(self) weakSelf = self; → Block 内使用 weakSelf。
__block：允许修改外部变量，但 ARC 下仍可能引起持有，需谨慎使用。
手动置空捕获对象（较少用，容易出错）。
```

3、什么是Swift中的闭包？与函数有何不同？

```
闭包：匿名代码块，可捕获上下文变量，支持类型推断，常用于简洁回调（类似 lambda）。
函数：具名、结构化，适合复用和清晰调用。
Swift 闭包语法简洁：支持省略参数名、返回类型。
```

4、Swift 闭包的捕获机制

```
1、默认 强引用捕获，延长变量生命周期。

2、捕获列表：
[weak self]：弱引用，目标释放后自动置 nil。
[unowned self]：无主引用，假设目标存在，不置 nil（更高效，但易崩溃）
```

5、闭包在回调与异步处理中的应用

```
常用于 异步任务回调：网络请求、动画完成、定时器等。
@escaping：闭包在函数返回后执行（异步回调常用）。
非逃逸闭包：函数作用域内立即执行。
```

6、Block 在 GCD 中的应用

```
GCD 的核心即以 Block 作为任务单元。
典型场景：dispatch_async 异步执行耗时任务，完成后回调更新 UI。
```

7、总结

```
Block 本质（struct 封装 + 三类存储方式） 是必问。
循环引用及 weak/unowned 捕获 是高频考点。
Swift 闭包与函数的区别、@escaping 是 Swift 部分常见考题。
异步场景（GCD/网络请求） 是实际应用切入点。
```

### 3.8 App Store 上架经验：处理 4.3a/4.3b 问题，通过率 50% 以上

面试考点

```
App 审核流程、
常见拒绝原因（尤其 4.3a/4.3b）、
提高通过率的经验
```

1、App 提交流程

```
1.使用 App Store Connect 上传构建（Xcode / Transporter）。
2.填写 元数据、截图、隐私政策、支持链接等。
3.提交审核（通常 24-48 小时）。
4.可用 TestFlight 做 Beta 测试。
```

2、常见拒绝及解决方案

```
1、4.3a（垃圾应用/模板化）
-应用过于相似，被判定为 spam。
-解决：强调独特功能、差异化 UI，提供实际价值证明。

2、4.3b（重复提交/马甲包）
-同一开发者提交多个雷同应用。
-解决：合并功能、减少马甲，保证 Bundle ID 唯一性。

3、其他常见问题
-缺少 demo 账户/隐私政策/支持链接 → 需补齐。
-涉及 UGC → 增加内容审核机制。
```

3、如何应对 App Store 拒绝？

```
-阅读 App Store 审核指南，定位问题。
-修改后 迭代提交，目标通过率 >50%。
-回复 App Review 时，提供证据与解释差异，保持沟通礼貌专业。
```

4、ASO(应用商店优化)经验

```
关键词：优化标题、副标题、描述。
截图/视频：突出核心功能，提升转化率。
版本迭代：更新日志突出新功能或 bug 修复。
监控工具：App Annie、Sensor Tower 等跟踪排名。
```

5、通过率提升经验

```
控制提审频率：拒绝后优化再提，不要频繁提交。
保持账号信誉：避免批量上架雷同应用。
添加 差异化功能（如 AI、UGC(用户生成内容)、分布式能力）。
注重 隐私与合规（App Tracking Transparency、数据收集说明）
```

6、项目实践示例

```
在一个工具类 App 中，初次因 4.3a 被拒（功能与已有应用相似）。
通过增加 AI 功能、优化 UI，强调差异点，成功通过。
整体通过率 ~60%，过程中多次迭代隐私条款与 UGC 审核机制。
```
