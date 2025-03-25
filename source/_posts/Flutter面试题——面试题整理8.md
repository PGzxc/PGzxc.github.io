---
title: Flutter面试题——面试题整理8
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: a1b9a9d2
date: 2024-03-25 16:19:14
---
## 一 面试题汇总

1. Flutter 中的 Navigator 是什么？
2. Flutter 中的 Navigator 2.0 是什么？
3. Flutter 中的 Navigator 接收返回值
4. Flutter 中的 Navigator 嵌套使用
5. Bloc 和 Cubit 之间有什么区别？<!--more-->
6. Flutter GetX 中 obx 和 getBuild 有什么区别
7. Flutter 中什么是依赖注入
8. Flutter 组件 Get_it 组件是什么
9. Flutter Sliver 是什么解决了什么问题

## 二  面试题解答(仅供参考)

### 2.1  Flutter 中的 Navigator 是什么？

```
在 Flutter 中，Navigator 是用来管理页面跳转和路由的工具，类似于“页面堆栈”的概念。
每次跳转新页面时，新的页面会被压入堆栈（push），返回时会将页面从堆栈弹出（pop）。

1.Navigator 的作用
1.1 页面跳转（Push）：
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => NewPage()),
);

1.2 返回上一页（Pop）：
Navigator.pop(context);

1.3 传递数据
var result = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => NewPage(data: 'Hello')),
);
print(result);  // 获取返回的数据

1.4 管理路由栈：
可以用 Navigator.popUntil、Navigator.pushReplacement 等方法灵活管理页面堆栈。

2总结：
-Navigator 使用栈（Stack）管理页面，push 新页面，pop 返回上一页。
-支持传递参数和接收返回值，方便页面间通信。
-可以配合 onGenerateRoute 实现全局路由管理，常见于中大型项目

简单来说，Navigator 是 Flutter 的页面导航器，帮助管理页面跳转和历史记录
```

### 2.2 Flutter 中的 Navigator 2.0 是什么？

```
Navigator 2.0 是 Flutter 引入的 新导航机制，用于处理更复杂的导航场景，
特别是需要手动管理页面栈的场景，比如：浏览器的前进/后退按钮、深层链接（Deep Linking）、多页面应用等。

1.Navigator 2.0 的特点
1.1 显式管理页面栈：
-Navigator 2.0 让开发者可以直接控制页面栈，而不是依赖 push/pop 的隐式机制。
-可以根据应用状态动态生成页面栈，实现更灵活的导航逻辑

2.Page 和 Router：
-Page：页面的抽象，描述页面的配置（类似于路由），可以用来比较页面状态。
-Router：管理导航逻辑，响应系统和用户的导航请求（如 URL 变化）。

3.典型结构：
-RouterDelegate：控制页面栈，决定显示哪些页面。
-RouteInformationParser：解析路由信息（如 URL），将其转换为可用的导航状态。

4.简单示例
class MyRouterDelegate extends RouterDelegate with ChangeNotifier {
  List<Page> pages = [MaterialPage(child: HomePage())];

  @override
  Widget build(BuildContext context) {
    return Navigator(
      pages: pages,
      onPopPage: (route, result) {
        if (!route.didPop(result)) return false;
        pages.removeLast();
        notifyListeners();
        return true;
      },
    );
  }
}

5.适用场景：
-深层链接（Deep Linking）。
-网页应用的多页面导航（支持浏览器的前进/后退）。
-需要手动管理页面栈的复杂场景。

6.总结：
-Navigator 1.0：简单直观，适合普通的多页面跳转。
-Navigator 2.0：提供更强的灵活性，适合需要显式管理页面栈和支持 URL 导航的复杂场景。

如果应用逻辑不复杂，Navigator 1.0 足够应对；
但如果需要处理浏览器历史、深层链接等，建议使用 Navigator 2.0
```


### 2.3  Flutter 中的 Navigator 接收返回值

```
在 Flutter 中，Navigator 可以通过 pop 方法返回值给上一个页面，方便页面之间的数据传递。
下面简单介绍一下用法：

1. 发送返回值
当从新页面返回时，用 Navigator.pop 传递返回值
示例
// 新页面（SecondPage）
Navigator.pop(context, '返回的数据');

2.接收返回值
在跳转页面时，使用 await 接收返回值
示例
// 主页面（MainPage）
final result = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondPage()),
);

print('接收到的返回值: $result');

3.总结：
-用 push 跳转页面，用 pop 带回数据。
-await 可以让代码同步等待返回值，非常直观。
-适合需要返回用户输入、选择结果等场景
```

### 2.4 Flutter 中的 Navigator 嵌套使用

```
在 Flutter 中，Navigator 用于管理应用程序中的路由（页面）。
虽然技术上可以嵌套使用 Navigator，但在实际开发中，通常不建议这样做，因为它可能会导致一些问题。
以下是关于 Flutter 中 Navigator 嵌套使用的详细说明：

1.为什么可以嵌套使用 Navigator？
-Navigator 本身是一个 Widget，因此它可以作为其他 Widget 的子 Widget 使用。
-Flutter 的 Widget 树结构允许 Widget 的任意嵌套，只要符合布局约束。

2.为什么不建议嵌套使用 Navigator？
2.1视觉和行为冲突：
-Scaffold 组件提供了应用的基本结构，包括 AppBar、BottomNavigationBar、Drawer 等。
嵌套使用 Navigator 可能会导致这些组件的显示和行为冲突。
-例如，嵌套的 Navigator 都试图控制 AppBar，可能导致 UI 混乱。
-嵌套的 Navigator 可能会导致出现多个 AppBar，底部的导航栏等，会严重影响用户体验。

2.2 状态管理复杂性：
Navigator 通常与导航和状态管理相关。
嵌套使用会增加状态管理的复杂性，使得代码难以维护。

2.3 性能问题：
嵌套的 Navigator 会增加 Widget 树的深度，可能导致性能问题，尤其是在低端设备上。

2.4 不符合 Material Design 规范：
Scaffold 的设计目的是提供应用的基本结构，嵌套使用通常不符合 Material Design 规范。

3.替代方案

3.1使用 NestedScrollView：
-如果需要创建复杂的滚动效果，例如带有折叠工具栏和滚动列表的页面，
可以使用 NestedScrollView。

3.2 使用自定义布局：
可以使用 Column、Row、Stack 等布局组件，自定义页面的布局。

3.3 使用 Overlay：
如果需要显示覆盖在其他内容之上的 UI 元素，可以使用 Overlay。

3.4提取可重用的 Widget：
将页面的某些部分提取为可重用的 Widget，并在需要的地方使用它们。

3.5使用 TabView 或者 PageView:
当需要在一个页面中切换显示多个子页面时，使用 TabView 或者 PageView 是一个更好的选择。
```

### 2.5 Bloc 和 Cubit 之间有什么区别？

```
在 Flutter 中，Bloc 和 Cubit 都属于 状态管理工具，都是 flutter_bloc 包的一部分。
两者的主要区别在于：复杂度 和 事件处理机制。
```

1.Cubit（简单）

```
-单一事件触发状态改变：调用一个方法直接改变状态。
-代码更简洁，适合简单逻辑或小型项目。
-无需事件类，直接用方法触发状态变化
-示例
// Cubit 示例
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);

  void increment() => emit(state + 1);
}
使用时
final cubit = CounterCubit();
cubit.increment();  // 直接调用方法
```

2.Bloc（复杂）

```
-事件驱动：通过事件（Event）来触发状态变化，适合复杂逻辑或大型项目。
-解耦逻辑和 UI：事件处理逻辑和状态管理完全分开，代码更清晰、可维护。
-更强扩展性：支持多事件、多状态的复杂场景。
-示例
// Bloc 示例
class CounterEvent {}
class IncrementEvent extends CounterEvent {}

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<IncrementEvent>((event, emit) => emit(state + 1));
  }
}
-使用时
final bloc = CounterBloc();
bloc.add(IncrementEvent());  // 通过事件触发
```

3.总结：

|  对比项  |          Cubit           |            Bloc            |
| :------: | :----------------------: | :------------------------: |
| 事件机制 |       直接调用方法       |        通过事件触发        |
|  复杂度  |      简单、代码量少      |    结构清晰，但代码量多    |
| 适用场景 |    小型项目、简单逻辑    |   大型项目、复杂状态逻辑   |
|  维护性  | 较简单，逻辑和 UI 易耦合 | 逻辑与 UI 完全解耦，易维护 |

如果项目逻辑简单，推荐用 **Cubit**；若项目逻辑复杂、事件多、需要解耦，推荐用 **Bloc**！

### 2.6 Flutter GetX 中 obx 和 getBuild 有什么区别

```
在 Flutter GetX 中，Obx 和 GetBuilder 都用于监听状态变化并更新 UI，但它们的机制和使用场景不同

1. Obx（响应式）
-依赖 Rx（Reactive）变量。
-自动监听变量的变化，变量更新时，Obx 自动触发重建。
-使用场景：需要频繁更新的状态（如计数器、网络请求等）
-示例
final count = 0.obs;  // 定义 Rx 变量
Obx(() => Text('Count: $count'))  // 自动更新

2.GetBuilder（手动控制）
-依赖控制器（Controller）。
-只有在 update() 被调用时，GetBuilder 才会重建。
-使用场景：不需要频繁更新的状态，或者需要手动控制更新的时机
-示例
class CounterController extends GetxController {
  int count = 0;
  void increment() {
    count++;
    update();  // 手动触发更新
  }
}

final controller = Get.put(CounterController());

GetBuilder<CounterController>(
  builder: (ctrl) => Text('Count: ${ctrl.count}'),
)

如果需要更灵活的状态管理，Obx 是更优解；但若需要手动掌控更新时机，GetBuilder 更合适
```

总结

|  对比项  |                 Obx                  |            GetBuilder            |
| :------: | :----------------------------------: | :------------------------------: |
|   机制   |         响应式，依赖 Rx 变量         |    手动控制，依赖 Controller     |
| 更新方式 |          状态改变时自动更新          |      需手动调用 `update()`       |
|   性能   |          更轻量、更新更频繁          |   更省资源，适合少量更新的场景   |
| 适用场景 | 频繁更新的状态（如计时器、网络状态） | 不常更新的状态（如表单、配置项） |

### 2.7 Flutter 中什么是依赖注入

```
在 Flutter 中，Get_it 是一个流行的 依赖注入（DI） 组件，
提供了全局的服务定位器，帮助开发者管理对象的实例和依赖关系。
它可以轻松地将类或服务注入到应用的各个部分，从而避免了传统的构造函数注入或全局单例的冗余代码。

1.Get_it 的核心概念：
-服务定位器：
Get_it 作为一个服务定位器，允许在应用的任何地方访问和获取已经注册的依赖（如 API 服务、数据库、控制器等）。
-依赖注入：通过 Get_it 管理实例的创建和生命周期，减少类与类之间的耦合。

2.如何使用 Get_it？
2.1 安装依赖：在 pubspec.yaml 中添加 get_it 依赖
dependencies:
  get_it: ^7.2.0
2.2 注册依赖：
使用 GetIt.instance.registerSingleton() 或 registerFactory() 方法注册依赖：

final getIt = GetIt.instance;
void setup() {
  getIt.registerSingleton<ApiService>(ApiService());
}

2.3 获取依赖
使用 GetIt.instance.get() 获取已经注册的依赖
final apiService = getIt.get<ApiService>();
apiService.fetchData();

2.4 取消注册（可选）
如果需要，使用 unregister() 方法注销依赖：
getIt.unregister<ApiService>();
```

### 2.8 Flutter 组件 Get_it 组件是什么

```
get_it 是一个在 Flutter 中用于依赖注入的第三方库。
它提供了一个简单而强大的依赖注入容器，使得在应用程序中管理和访问依赖项变得更加容易。

下面是一些 get_it 库的特点和用法：

1-轻量且易于使用：
get_it 是一个轻量级的库，没有复杂的配置和依赖关系图。
它提供了简单的 API，使得注册和获取依赖项变得非常容易。

2-支持单例和懒加载：
get_it 支持将依赖项注册为单例，
这意味着同一个依赖项只会被实例化一次，并且在应用程序的不同部分共享使用。
另外，get_it 也支持懒加载，即只有在第一次访问依赖项时才会进行实例化。

3-支持异步和同步依赖项：
get_it 提供了对异步和同步依赖项的支持。
你可以注册异步工厂函数来创建异步依赖项，也可以注册同步工厂函数来创建同步依赖项。

4-支持依赖项解析：
get_it 允许你在注册依赖项时指定其解析方式。
你可以选择自动解析依赖项（默认情况下），也可以手动解析依赖项。
手动解析依赖项可以为你提供更多的灵活性和控制权。

5-支持注册别名：
get_it 允许你为依赖项注册别名，以便于识别和访问。
这对于管理大量依赖项时非常有用。
```

Get_it 与其他 DI 框架的比较：

|    对比项    |                   Get_it                   |               Provider               |
| :----------: | :----------------------------------------: | :----------------------------------: |
|   Provider   |            服务定位器和依赖注入            |          依赖注入和状态管理          |
| 依赖注入方式 |           基于全局单例和工厂模式           |         基于上下文的依赖注入         |
|   适用场景   |     无需 UI 刷新时使用，简洁的依赖管理     |     适合 UI 绑定和响应式数据管理     |
| 生命周期管理 | 开发者控制生命周期，适合全局服务或单例对象 | 自动管理生命周期，适合短生命周期对象 |
### 2.9 Flutter Sliver 是什么解决了什么问题

```
在 Flutter 中，Sliver 是一种用于构建可滚动区域的 高级滚动效果。
它通常与 CustomScrollView 配合使用，解决了列表或内容区域动态布局的需求，
尤其是需要 自定义滚动行为、延迟加载、视图切换等场景

1. Sliver 的作用：
-动态布局：Sliver 允许根据滚动视图动态改变布局，比如头部随着滚动变化的效果（吸顶、渐变等）。
-懒加载：通过 Sliver 来实现懒加载效果，使得列表项仅在滚动时才加载，从而节省内存和提升性能。
-自定义滚动效果：支持复杂的自定义滚动行为和动画效果，提升用户体验

2.常见的 Sliver 组件：
2.1 SliverAppBar：
实现滚动时的 可折叠 AppBar，如顶部导航栏吸顶、滑动缩放等效果
示例
SliverAppBar(
  expandedHeight: 200.0,
  floating: false,
  pinned: true,
  flexibleSpace: FlexibleSpaceBar(
    title: Text('SliverAppBar Example'),
    background: Image.network('https://example.com/image.jpg', fit: BoxFit.cover),
  ),
);

2.2 SliverList：
实现 可滚动的列表，其子元素通常使用 ListView 进行渲染。
示例
SliverList(
  delegate: SliverChildBuilderDelegate(
    (BuildContext context, int index) {
      return ListTile(title: Text('Item $index'));
    },
    childCount: 100,
  ),
);

2.3 SliverGrid：
用于构建 可滚动的网格，类似于 GridView。
示例
SliverGrid(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
  ),
  delegate: SliverChildBuilderDelegate(
    (BuildContext context, int index) {
      return GridTile(child: Text('Grid item $index'));
    },
    childCount: 50,
  ),
);

2.4 SliverToBoxAdapter：
用于将普通的 Widget（如 Container、Text）转换为 Sliver 组件，
方便将非 Sliver 组件嵌入到 Sliver 布局中。


3. Sliver 解决的问题
3.1 提高性能：
通过懒加载技术，只渲染当前屏幕可见的内容，减少了不必要的渲染，提升性能，尤其是当内容量非常大时。
3.2 灵活的滚动行为：
Sliver 允许创建复杂的滚动效果，如 折叠、吸顶、渐变等，这些在普通的 ListView 和 GridView 中难以实现。
3.3 自定义布局：
使用 Sliver，你可以灵活控制每个页面元素的滚动行为、尺寸和状态，为用户提供更细致的体验。


4.总结：
-Sliver 是 Flutter中用于构建高性能、动态且可定制的可滚动区域的组件，适用于复杂的滚动效果和懒加载场景。
-常用的Sliver组件有SliverAppBar、SliverList、SliverGrid等，可以帮助你实现自定义的滚动行为和布局。

如果你需要实现复杂的滚动效果或者懒加载，Sliver 是一个非常有力的工具
```
## 三 参考

* [狗哥课堂—Flutter 面试题整理 03](https://ducafecat.com/blog/flutter-interview-questions-with-answers-03)


