---
title: IOS面试题——高频面试题之架构(2)
categories:
  - 面试相关
  - IOS面试题
tags:
  - IOS面试题
abbrlink: c112e0c1
date: 2025-09-23 08:54:43
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题

### 2.1 面试要求(技术点提取)

```
1.组件化开发
2.常见架构模式：mvc及mvvm，clean architecture，Rxswift+mvvm等
3.框架与库：Cocoa官方框架 + 第三方如Alamofire, SwiftyJSON, Kingfisher
4.三方框架 AFNetworking
```

## 三 面试题解答(仅供参考)

### 3.1 组件化开发

面试考点

```
组件化开发：强调将应用拆分为独立、可复用模块，解决“大型项目维护难、Controller 臃肿”问题。
常用实现：Swift Package Manager、CocoaPods。
考察重点：为什么要组件化、如何实现、模块间通信方式、组件化与模块化区别。
```

1、什么是组件化？为什么要做组件化？

```
1、定义：
将 App 按功能或业务拆分成独立模块（如用户、支付、UI），每个模块可独立开发、测试和发布。

2、好处：
-解耦：降低依赖，避免「牵一发而动全身」
-并行开发：多人协作效率更高
-可维护性：逻辑清晰，问题定位更快
-复用性：核心功能可跨项目复用

3、面试常问
3-1、常被问及如何解决“Massive View Controller”？
通过组件化将Controller逻辑拆分到独立模块（如ViewModel或Service），结合SwiftUI可进一步简化UI逻辑
```

2、如何在iOS项目中实现组件化架构？

```
1、实现步骤
模块拆分：使用SPM、CocoaPods或Carthage创建独立模块（Framework或Library）。
定义接口：通过协议（Protocol）或抽象层定义模块接口，避免直接依赖。
模块通信：使用Router（如CTMediator）或URL Scheme管理模块间调用。
依赖管理：通过依赖注入（DI）解决循环依赖，优化编译时间。
测试与发布：为每个模块配置单元测试，支持独立CI/CD流程

2、示例：
在电商App中，将“用户模块”（登录、注册）、“支付模块”拆分为独立Framework，通过Router调用支付接口。
SwiftUI的声明式UI（2025年趋势）与SPM结合，使组件化更轻量和灵活

3、面试高频问题：

3-1、如何优化编译时间？
答：将大模块拆分为小模块，使用动态框架减少全量编译，结合SPM的二进制缓存。
3-2、如何处理循环依赖？
答：通过抽象协议或中间层（如Mediator）解耦，注入依赖而非直接import
```

3、组件化开发的优缺点是什么？

```
1、优点：
-模块隔离，降低耦合，便于维护和扩展。
-支持单元测试，保障模块质量。
-高效团队协作，适合分布式开发。
-支持CI/CD和动态更新（如远程模块加载）。

2、缺点：
-初期设计复杂，需定义清晰接口和路由机制。
-调试成本较高，需管理模块间通信。
-可能增加Bundle大小，需优化资源加载。

3、面试提示：
3-1、常被问及如何权衡组件化的成本与收益。
答：小型项目可用模块化，组件化更适合中大型App，尤其是需要动态化或跨团队协作的场景。
```

4、举例说明如何处理模块间通信？

```
模块间通信是组件化的核心，需确保低耦合和高可维护性。

一、以下是常见方式：

1.1、Router（推荐）：
使用CTMediator或自定义Router，通过协议或URL（如scheme://module/function）调用模块。
优点：类型安全、便于测试；缺点：需维护路由表。
示例：Router.shared.performAction(for: "payment://process?amount=100")。

1.2、协议/代理（Protocol-Delegate）：
适合一对一通信，定义协议让调用方实现。
优点：简单直观；缺点：不适合复杂场景。
示例：支付模块通过协议回调用户模块的支付结果。

1.3、通知（Notification）：
适合一对多广播，如状态更新。
缺点：需管理生命周期，避免内存泄漏。
示例：NotificationCenter广播登录状态变更。

1.4、Block回调：
简洁但耦合度高，适合简单场景。
示例：网络模块通过Block返回数据。

1.5、URL Scheme：
跨模块或跨App调用，灵活但类型安全较差。
示例：myapp://user/login?token=xxx。

二、面试高频问题：

2.1、如何避免通信导致的耦合？
答：优先使用Router或协议，结合依赖注入，避免直接import其他模块。
2.2、如何处理异步通信？
答：用RxSwift或Combine的Observable绑定数据，或通过PromiseKit处理异步回调。
```

5、组件化与模块化区别？

5-1、对比

|   特性   |                模块化                |                      组件化                      |
| :------: | :----------------------------------: | :----------------------------------------------: |
|   定义   | 代码按功能分层拆分，通常在单一工程内 | 模块可独立编译、测试、运行和发布，支持跨项目复用 |
| 实现方式 |      通过文件夹、Target或静态库      |    使用SPM、CocoaPods、Carthage创建Framework     |
|  耦合度  | 模块间可能有一定耦合，依赖工程环境。 |         高度解耦，通过接口或Router通信。         |
| 应用场景 |      适合中小型项目，快速开发。      |       适合大型项目、分布式团队或动态更新。       |
|   示例   | 将网络请求封装为NetworkManager模块。 |   “支付模块”独立为Framework，通过Router调用。    |

5-2、面试常问

```
2.1、常被问及如何从模块化迁移到组件化。

1) 识别可复用功能；
2) 抽取为SPM模块；
3) 定义协议和Router；
4) 逐步替换直接依赖
```

6、公共组件管理

```
一、方法：

1.1、使用CocoaPods或SPM进行版本化管理，发布到私有/公共仓库。
1.2、抽取通用功能为独立组件，如：
-网络层：封装URLSession或Alamofire。
-工具库：日志、加密、数据处理等。
-UI基础组件：按钮、弹窗、通用控件。

1.3、配置CI/CD pipeline，自动化测试和发布。

二、面试高频问题：

2.1、如何管理组件版本冲突？
答：使用SPM的精确版本控制（如1.2.3），或通过CocoaPods的Podspec定义依赖范围。
```

7、组件化路由实现

```
一、实现方式
1.1、URL-based Router：
格式：scheme://host/path?params（如myapp://payment/process?amount=100）。
实现：解析URL，分发到目标模块。
优点：灵活，支持跨App调用；缺点：类型安全差，需手动解析参数。
示例：支付宝App的URL Scheme跳转。

1.2、Protocol-based Router：
定义协议描述服务，路由中心（如CTMediator）维护协议与实现的映射。
优点：类型安全，便于单元测试；缺点：需预先注册服务。
示例：protocol PaymentService { func process(amount: Double) }，Router动态调用实现。

二、面试高频问题：

2.1、URL Router与Protocol Router的优劣？
答：
URL Router灵活但易出错，Protocol Router类型安全但需更多前期设计。
大型项目推荐Protocol Router以提升可维护性。
```

### 3.2 常见架构模式：mvc及mvvm，clean architecture，Rxswift+mvvm等

面试考点

```
1、招聘要求：
熟练掌握MVC（Apple默认），
但中大型项目更倾向MVVM、Clean Architecture或VIPER；
RxSwift+MVVM用于响应式编程。

2、2025年趋势：
SwiftUI推动MVVM普及，Combine逐渐取代RxSwift，Clean Architecture在企业级项目中更常见。

3、考察重点：
各架构的定义、优缺点及适用场景。
如何避免Controller膨胀、实现解耦。
项目中的架构选型与优化经验
```

1、解释iOS中的MVC架构及其优缺点

```
1、定义：
MVC（Model-View-Controller）是Apple推荐的架构：

Model：管理数据和业务逻辑（如API响应）。
View：展示UI（如UIView）。
Controller：协调Model与View，处理用户交互。

2、优缺点：
优点：简单直观，适合小型项目，Apple生态集成度高。
缺点：Controller易膨胀（Massive View Controller），逻辑与UI耦合，难以测试。

3、如何避免Controller膨胀（面试高频）：
抽取业务逻辑到Service或Manager类。
使用Extension分担Controller职责。
引入子Controller（如UIViewControllerContainment）管理复杂页面。

4、面试高频问题：
4.1、如何优化MVC项目？
答：将网络请求、数据处理移到独立Service，UI逻辑用ViewModel，结合SwiftUI减少Controller负担。
```

2、MVC和MVVM的区别是什么？何时选择MVVM？

```
1、区别：
1.1、MVC：
结构：Controller直接连接View和Model。
耦合性：View与Controller强耦合。
测试性：Controller难测试。

1.2、MVVM
结构：ViewModel处理逻辑，View通过绑定更新。
耦合性：View与ViewModel解耦，Model独立。
测试性：ViewModel易测试，无UI依赖。


2、MVVM 优点：
-关注点分离，ViewModel独立于UI。
-支持数据绑定（Combine/RxSwift），减少样板代码。
-ViewModel便于单元测试。

3、MVVM 适用场景：
-需要大量数据绑定（如表单、实时输入校验）。
-状态驱动的UI（如SwiftUI项目）。
-中大型项目需高可测试性。

4、缺点：学习曲线陡峭，绑定逻辑可能复杂。
5、2025年趋势：SwiftUI的声明式UI天然适配MVVM，招聘JD常要求MVVM+Combine经验
6、面试高频问题：
6.1、MVVM如何提升可维护性？
答：ViewModel隔离业务逻辑，View仅负责UI，单元测试覆盖ViewModel逻辑，降低维护成本。
```

3、什么是MVVM架构？如何实现？

```
1、定义：
MVVM（Model-View-ViewModel）：
-Model：数据和业务逻辑。
-View：UI展示（UIView或SwiftUI）。
-ViewModel：处理业务逻辑，转换数据为View可用的格式，通过绑定更新UI。

2、实现方式：
-ViewModel暴露可观察属性（如@Published或Observable)。
-View通过Combine（SwiftUI）或RxSwift订阅更新。
-示例：登录页面，ViewModel校验输入，更新按钮状态，View绑定显示。

代码示例（SwiftUI+Combine）：
class LoginViewModel: ObservableObject {
    @Published var username: String = ""
    @Published var isButtonEnabled: Bool = false
    
    func validate() {
        isButtonEnabled = username.count > 3
    }
}

struct LoginView: View {
    @StateObject var viewModel = LoginViewModel()
    
    var body: some View {
        VStack {
            TextField("Username", text: $viewModel.username)
                .onChange(of: viewModel.username) { _ in viewModel.validate() }
            Button("Login", action: {}).disabled(!viewModel.isButtonEnabled)
        }
    }
}

3、优点：解耦UI与逻辑，ViewModel可单元测试。

4、面试高频问题：
4.1、如何实现数据绑定？
答：SwiftUI用@Published和$绑定，UIKit用Combine或RxSwift订阅Observable。
```

4、什么是Clean Architecture？如何在iOS中应用？

```
1、定义：
Clean Architecture强调分层和依赖倒置，核心业务逻辑独立于框架/UI/数据库：
-Entities：核心业务实体（如User）。
-Use Cases/Interactor：业务逻辑（如登录、支付）。
-Presenter/Adapter：转换数据为UI格式。
-Frameworks：外部依赖（如网络、数据库、UI）。

2、核心原则：依赖倒置，内层（Entities、Use Cases）不依赖外层（UI、网络）。

3、iOS实现：
Interactor：封装Use Case，处理业务逻辑。
Presenter：将数据转为ViewModel，传递给View。
Router：管理页面导航（如UINavigationController推送）。
示例：电商App中，ProductInteractor获取商品数据，ProductPresenter格式化后传给View。

4、优缺点：
优点：高可测试性，可替换外层实现（如切换数据库），适合企业级项目。
缺点：初期设计复杂，代码量较多。

5、面试高频问题：

5.1、如何实现依赖倒置？
答：通过协议定义依赖（如NetworkService协议），具体实现（如URLSession）注入到Interactor。
5.2、Clean Architecture的实际案例？
答：如支付模块，PaymentEntity定义数据，PaymentInteractor处理逻辑，PaymentPresenter格式化UI数据。
```

5、RxSwift+MVVM如何工作？常见应用场景？

```
1、工作方式：
-ViewModel通过RxSwift的Observable/Driver暴露数据流。
-View订阅更新，自动刷新UI。
-使用DisposeBag管理订阅，避免内存泄漏。

2、代码示例：
class SearchViewModel {
    let searchResults = PublishSubject<[String]>()
    private let disposeBag = DisposeBag()
    
    func search(query: String) {
        API.search(query)
            .subscribe(onNext: { [weak self] results in
                self?.searchResults.onNext(results)
            })
            .disposed(by: disposeBag)
    }
}

class SearchViewController: UIViewController {
    let viewModel = SearchViewModel()
    private let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        viewModel.searchResults
            .bind(to: tableView.rx.items) { tableView, _, item in
                let cell = tableView.dequeueReusableCell(withIdentifier: "Cell")!
                cell.textLabel?.text = item
                return cell
            }
            .disposed(by: disposeBag)
    }
}

3、应用场景：
-实时更新：聊天、股票行情、搜索联想。
-复杂异步：多API组合、表单校验。

4、优缺点：
-优点：统一异步处理，简化回调地狱，响应式UI更新。
-缺点：内存管理复杂，需DisposeBag；学习成本高。

5、2025年趋势：Combine逐渐取代RxSwift，招聘JD要求两者之一的实战经验。

6、面试高频问题：
6.1、如何避免RxSwift内存泄漏？
答：使用DisposeBag管理订阅，结合weak self避免强引用循环。
6.2、Combine与RxSwift的区别？
答：Combine是Apple原生，SwiftUI集成更好；RxSwift跨平台，社区成熟。
```

6、比较VIPER、Clean Architecture和MVVM。

```
1、对比

VIPER：
-结构：View-Interactor-Presenter-Entity-Router
-优点：强模块化，职责单一，可测试性高
-缺点：样板代码多，学习成本高
-适用场景：企业级大型项目，需严格解耦。

Clean Architecture：
-结构：Entities-Use Cases-Presenter-Frameworks
-优点：依赖倒置，业务逻辑独立，易替换框架
-缺点：设计复杂，代码量大。
-适用场景：企业级项目，需长期维护

MVVM：
-结构：Model-View-ViewModel
-优点：简单轻量，适合数据绑定，易测试
-缺点：绑定逻辑可能复杂，小项目略重。
-适用场景：中小型项目，SwiftUI开发

2、选型思路：
小型项目：MVC（简单快速）或MVVM（数据绑定）。
中型项目：MVVM（结合SwiftUI或RxSwift）。
大型/企业级项目：Clean Architecture或VIPER（高解耦、可维护）。

3、面试高频问题：
3.1、如何选择架构？
答：根据项目规模和团队经验，小型选MVC/MVVM，中大型选MVVM/Clean，复杂项目选Clean/VIPER。2、
```

7、总结与面试要点

```
1、总结
MVC：Apple默认，简单但Controller易膨胀，适合小型项目。
MVVM：数据绑定+可测试性，SwiftUI主流选择，需掌握Combine/RxSwift。
Clean Architecture：分层清晰，依赖倒置，适合企业级复杂项目。
RxSwift+MVVM：响应式编程，简化异步逻辑，需注意内存管理。
VIPER：模块化最强，但样板代码多，适合超大型项目。

2面试建议：
准备项目案例，说明架构选型理由（如为何用MVVM）。
强调优化经验（如解决Controller膨胀、内存泄漏）。
熟悉SwiftUI+MVVM（2025年趋势）及Combine/RxSwift的绑定机制
```

### 3.3 框架与库：Cocoa官方框架 + 第三方如Alamofire, SwiftyJSON, Kingfisher

面试考点

```
1.招聘要求：
熟练掌握Cocoa官方框架（Foundation、UIKit、SwiftUI等）及第三方库（如Alamofire、Kingfisher），
理解其原理和使用场景。

2.2025年趋势：
SwiftUI逐渐取代UIKit，第三方库聚焦网络、JSON解析、图片加载和性能优化。

3.考察重点：
-框架/库的核心功能、优缺点、替代方案。
-如何在项目中选型并优化性能。
-SwiftUI与UIKit的结合与迁移策略。
```

1、什么是Cocoa框架？列出主要组件

```
1、定义：
Cocoa是Apple提供的应用开发框架集合，用于iOS、macOS等平台的UI、数据处理和核心服务。

2、主要组件：
-Foundation：核心服务，如字符串（NSString）、集合（NSArray）、日期（Date）、网络（URLSession）。
-UIKit (iOS) / AppKit (macOS)：UI构建核心，管理视图（UIView）、控制器（UIViewController）。
-Core Graphics / Core Animation：2D绘图和动画（如CALayer）。
-Core Data：对象关系映射（ORM），用于本地持久化。
-SwiftUI：声明式UI框架，2025年主流，逐步取代UIKit。

3、面试高频问题：

3.1、SwiftUI与UIKit的差异？
答：SwiftUI是声明式，代码简洁，支持实时预览，跨平台（iOS、macOS）；UIKit是命令式，生态成熟但代码量大。
结合使用：SwiftUI用于新模块，UIKit处理复杂交互。

3.2、如何迁移到SwiftUI？
答：逐步迁移，UIHostingController嵌入SwiftUI视图，兼容现有UIKit项目。
```

2、Alamofire是什么？与URLSession的区别？

```
1、定义：
Alamofire是基于URLSession的HTTP网络库，提供链式API、请求管理、响应验证等功能，简化REST API开发。

2、与URLSession的对比：
2.1 URLSession
类型：Apple原生，轻量，控制粒度细。
功能：基础网络请求，需手动处理响应
适用场景：简单请求、系统级网络需求

2.2 Alamofire
类型：第三方封装，API简洁
功能：链式调用、请求队列、验证、JSON解析。
适用场景：复杂REST API、多请求管理

3、代码示例
// Alamofire
AF.request("https://api.example.com").responseJSON { response in
    print(response.result)
}
// URLSession
URLSession.shared.dataTask(with: URL(string: "https://api.example.com")!) { data, _, _ in
    print(data)
}.resume()

4、面试高频问题
4.1、何时选择Alamofire？
答：简单请求或系统集成用URLSession；复杂场景（如多请求并发、拦截器）用Alamofire。
4.2、如何优化网络性能？
答：配置Alamofire的SessionManager调整超时时间，结合缓存策略（如ETag）减少重复请求。
```

3、SwiftyJSON如何工作？为什么用它解析JSON？

```
1、定义：
SwiftyJSON是一个JSON解析库，简化复杂JSON的访问，避免繁琐的可选链和类型转换。

2、工作原理：
将JSON数据封装为JSON对象，支持链式访问（如json["key"].string），内置空值处理。

3、代码示例：
let json = JSON(data)
let name = json["user"]["name"].stringValue // 安全访问

4、优缺点：
优点：简洁，适合动态或不规则JSON；避免手动解析的复杂性。
缺点：性能低于Codable，类型安全较弱，2025年趋势更推崇Codable。

5、面试高频问题：

5.1、SwiftyJSON与Codable的对比？
答：Codable是Swift原生，类型安全、性能高，适合固定结构JSON；SwiftyJSON适合快速原型或动态JSON。
5.2、如何选择解析方案？
答：优先Codable，复杂或遗留项目可用SwiftyJSON，需权衡性能与开发效率。
```

4、Kingfisher是什么？如何实现图像缓存？

```
1、定义：
Kingfisher是异步图像下载与缓存库，支持占位图、GIF、渐进加载，类似SDWebImage。

2、代码示例：
imageView.kf.setImage(with: URL(string: "https://image.jpg"), placeholder: UIImage(named: "default"))

3、缓存机制：

内存缓存：基于NSCache，以URL为Key，缓存解码后的UIImage。
磁盘缓存：基于URLCache或自定义存储，定期清理过期数据。
优化策略：支持图像预处理、渐进加载、缓存大小控制。

4、面试高频问题：

4.1、如何优化图像加载？
答：
1) 设置合理缓存大小（ImageCache.default.memoryStorage.config.totalCostLimit）；
2) 定期清理磁盘缓存；
3) 启用下采样（downsampling）减少内存占用。

4.2、Kingfisher与SDWebImage的区别？
答：
两者功能类似，Kingfisher更轻量，Swift原生优化更好；
SDWebImage生态更成熟，Objective-C兼容性强。
```

5、数据存储？

```
1、常见存储方式（结合2025年趋势）：

1.1、UserDefaults / MMKV：
用途：轻量级键值存储，适合配置、用户偏好。
示例：UserDefaults.standard.set("value", forKey: "key")。
特点：简单但不适合大数据量。MMKV（微信开源）性能更高，跨平台。

1.2、Core Data：
用途：Apple原生ORM，适合复杂对象关系和本地持久化。
特点：功能强大但学习曲线高，支持iCloud同步。

1.3、Realm：
用途：轻量级NoSQL数据库，跨平台，适合中小型项目。
特点：易用、性能优于Core Data，但生态较小。

1.4、SQLite：
用途：底层数据库，灵活但需手动管理。
特点：适合高性能需求，开发成本高。

2、面试高频问题：

2.1、Core Data与Realm的选型？
答：Core Data适合Apple生态集成、复杂关系模型；Realm上手快，适合快速开发或跨平台项目。

2.2、如何优化存储性能？
答：1) Core Data使用批量操作（NSBatchUpdateRequest）；2) Realm启用懒加载；3) SQLite优化索引和查询。
```

6、总结

```
1、Cocoa框架：
核心：Foundation（数据处理）、UIKit/SwiftUI（UI）、Core Data（持久化）。
面试重点：SwiftUI与UIKit的迁移策略，结合实际项目说明。

2、第三方库：
Alamofire：简化网络请求，需掌握URLSession替代方案。
SwiftyJSON：历史JSON解析工具，面试需对比Codable。
Kingfisher：图像加载与缓存，需了解优化策略（如内存管理）。

3、数据存储：
选型场景：UserDefaults（简单配置）、Core Data（复杂关系）、Realm（快速开发）、SQLite（高性能）。
面试常问：如何根据项目需求选择存储方案，优化性能的方法。

4、2025年趋势：
SwiftUI为主流，需熟悉其与UIKit的混合开发。
第三方库向轻量化和Swift原生优化靠拢（如SPM集成）。
性能优化（如缓存管理、异步加载）是面试重点。
```

### 3.4 三方框架AFN

面试考点

```
特点：简洁易用、功能全面、模块化、安全性。  
作用：简化 iOS 网络请求开发，提高开发效率。  
对比：与 Alamofire（Swift 现代化）、URLSession（原生轻量）差异。  
选择依据：项目语言、功能需求、维护性。  
```

1、简述 AFNetworking 的特点及其在 iOS 项目中的作用？

```
1、特点
-简洁易用：封装 NSURLSession，提供直观 API，如 AFHTTPSessionManager。
-功能全面：支持 GET/POST/PUT/DELETE 请求、文件上传/下载、JSON 序列化、网络状态监控。
-模块化设计：核心类职责清晰（如 AFHTTPRequestSerializer、AFHTTPSessionManager），易扩展和维护。
-安全性：支持 SSL Pinning，防止中间人攻击。

2、作用
-简化网络请求和响应处理，开发者专注业务逻辑。
-常用于 API 调用、文件传输、网络状态检测，提高开发效率。
```

2、AFNetworking 和 Alamofire 有何区别？如何选择？

2-1、对比

|    特性    |           AFNetworking            |              Alamofire               |
| :--------: | :-------------------------------: | :----------------------------------: |
|    语言    |            Objective-C            |                Swift                 |
|  API 设计  |      简洁，基于 NSURLSession      | 链式调用，支持 async/await (iOS 15+) |
|    特性    | 文件上传/下载、JSON、网络状态监控 |   更现代化，类型安全、错误处理丰富   |
|  适用场景  |   兼容旧项目，Objective-C 项目    |     Swift 项目，需现代化并发特性     |
| 社区与维护 |          较稳定，更新少           |          社区活跃，更新频繁          |

2-2、选择依据

```
项目语言：Objective-C → AFNetworking；Swift → Alamofire。
新特性需求：iOS 15+ async/await → Alamofire。
维护性：长期维护或社区活跃 → Alamofire。
```

3、使用 AFNetworking 处理网络请求及与 URLSession 对比

```
1、使用方法
创建 AFHTTPSessionManager 实例并配置序列化器。
支持 GET/POST/PUT/DELETE 等 HTTP 方法。
错误处理：success/failure 回调，可结合网络状态管理器或重试机制。
安全性：启用 SSL Pinning。

2、优点
简洁：封装复杂细节，减少样板代码。
功能丰富：JSON 解析、文件上传/下载、网络状态监控。

3、缺点
第三方依赖：增加项目体积和维护成本。
灵活性略低：不如原生 URLSession 自由定制。

4、注意事项
错误处理：超时、重试、认证（token 刷新）。
性能优化：避免频繁创建 AFHTTPSessionManager，复用实例。
安全性：SSL Pinning，验证服务器证书。
版本迁移：Swift 项目可逐步迁移到 Alamofire 或原生 URLSession。

5、建议
小项目或快速开发 → AFNetworking/Alamofire。
对性能和无依赖要求高 → 原生 URLSession。
```