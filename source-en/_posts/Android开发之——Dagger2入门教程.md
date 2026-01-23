---
title: Android开发之——Dagger2入门教程
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Dagger2
abbrlink: 7361483e
date: 2017-12-11 22:51:46
---

## 一 概述

现在Dagger2在项目里用的越来越多了，特别是RxJava+Retrofit+MVP+Dagger2在Android框架搭建时被越来越多的使用了。   

Dagger2是Google出的依赖注入框架。肯定有小伙伴疑问，为什么会有个 2 呢。该框架是基于square开发的dagger基础上开发的。   

Dagger2的原理是在编译期生成相应的依赖注入代码。这也是和其他依赖注入框架不同的地方，其他框架是在运行时期反射获取注解内容，影响了运行效率。   
<!--more-->
## 二 Dagger2配置   

使用Dagger2之前需要一些配置，该配置是在Android Studio中进行操作
最新的AS只需在Module的build.gradle中添加如下配置 

```
dependencies 
{
  implementation 'com.google.dagger:dagger:2.9'
  annotationProcessor 'com.google.dagger:dagger-compiler:2.9'
}
```

## 三 Dagger2的简单使用

Dagger2的使用，需要大量的学习成本，不是很能够容易的上手并使用。该博客将从简单入手，尽可能的使用简单的例子演示Dagger2的功能。   
在之前的分析中，通过Dagger2的目的是将程序分为三个部分。   

- 实例化部分：对象的实例化。类似于容器，将类的实例放在容器里。
- 调用者：需要实例化对象的类。
- 沟通桥梁：利用Dagger2中的一些API 将两者联系。   

### 3.1 先看实例化部分(容器)，在此处是Module 

```
@Module // 提供依赖对象的实例
public class MainModule {
	@Provides // 关键字，标明该方法提供依赖对象
	Person providerPerson() {
		// 提供Person对象
		return new Person();
	}
}
```

### 3.2 沟通部分Component

```
@Component(modules = MainModule.class)// 作为桥梁，沟通调用者和依赖对象库
public interface MainComponent 
{
	//定义注入的方法
	void inject(MainActivity activity);
}
```

### 3.3 Person对象类

```
public class Person 
{
   public Person()
	{
     Log.i("dagger","person create!!!");
	}
 }
```

### 3.4 在Actvity中调用

```
public class MainActivity extends AppCompatActivity
{
	@Inject   //标明需要注入的对象
	Person person;

	@Override
	protected void onCreate(@Nullable Bundle savedInstanceState) 
	{
     super.onCreate(savedInstanceState);
     // 构造桥梁对象
     MainComponent component = DaggerMainComponent.builder().mainModule(new MainModule()).build();
     //注入
     component.inject(this);

	}
}
```

## 四 过程分析   

### 4.1 创建Component(桥梁)，并调用注入方法 

```
//构造桥梁对象
MainComponent component=DaggerMainComponent.builder().mainModule(new MainModule()).build();
//注入
component.inject(this);
```

### 4.2 查找当前类中带有@Inject的成员变量

```
 @Inject//标明需要注入的对象   
 Person person;
```

### 4.3 根据成员变量的类型从Module中查找哪个有@Provides注解的方法返回值为当前类型 

```
@Provides // 关键字，标明该方法提供依赖对象
Person providerPerson()
	{
   //提供Person对象
   return new Person();
}
```

![dagger2][1]  
在使用过程出现了很多注解：   

- @Module:作为实例对象的容器
- @Provides:标注能够提供实例化对象的方法
- @Component:作为桥梁，注入对象的通道
- @Inject：需要注入的方法

如上使用有一种变通，修改MainModule和Person类

```
@Module // 提供依赖对象的实例
public class MainModule {

	/*
	@Provides // 关键字，标明该方法提供依赖对象
	Person providerPerson() {
		// 提供Person对象
		Log.i("dagger", " from Module");
		return new Person();
	}
    */
}

public class Person {
	@Inject // 添加注解关键字
	public Person() {
		Log.i("dagger", "person create!!!");
	}
}
```

将Module中的providePerson()方法注释，在Person中添加@Inject注解，依然能够实现  

逻辑如下：  

- 先判断Module中是否有提供该对象实例化的方法。
- 如果有则返回。结束。
- 如果没有，则查找该类的构造方法，是否有带有@Inject的方法。如过存在，则返回。

## 五 其他

### 5.1 @Singleton 单例注解
假如，对于同一个对象，我们需要注入两次，如下方式 

```
public class MainActivity extends AppCompatActivity {
	@Inject
	Person person;

	@Inject
	Person person2;

	@Override
	protected void onCreate(@Nullable Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 构造桥梁对象
		MainComponent component = DaggerMainComponent.builder().mainModule(new MainModule()).build();
		// 注入
		component.inject(this);
		// 打印两个对象的地址
		Log.i("dagger", "person = " + person.toString() + "; person2 = " + person2.toString());
	}
}
```

看一下结果：

```
person = com.example.dagger2.Person@430d1620;  
person2 = example.dagger2.Person@430d17c8  
```

可见两个对象不一致。也就是说创建了两个对象。    
可以在提供实例化对象的方法上添加@Singleton注解 

```
@Provides //关键字,标明该方法提供依赖对象
@Singleton
Person providerPerson()
{
   return new Person();
} 
```

同时，对于MainComponent也需要添加注解，不添加会无法编译 

```
@Singleton
@Component(modules = MainModule.class)  // 作为桥梁，沟通调用者和依赖对象库
public interface MainComponent 
{
 //定义注入的方法
 void inject(MainActivity activity);
}
```

此时在Log,会发现两个对象的地址一样，可见是同一个对象。

```
person = com.example.dagger2.Person@4310f898;   
person2 = com.example.dagger2.Person@4310f898  
```

那么不同的Activity之间，能否保持单例呢？  
创建一个新的Activity，代码如下：

```
public class Main2Actvity extends AppCompatActivity 
{
   @Inject
   Person person;
   @Override
   protected void onCreate(@Nullable Bundle savedInstanceState) 
	{
      super.onCreate(savedInstanceState);
      // 构造桥梁对象
      MainComponent component = DaggerMainComponent.builder().mainModule(new MainModule()).build();
      //注入
      component.inject(this);
      Log.i("dagger","person = "+ person.toString());
	}
}
```

结果如下：

```
person create!!!
person = com.example.dagger2.Person@4310f898;    
person2 = com.example.dagger2.Person@4310f898
person create!!!
person = com.example.dagger2.Person@43130058  
```

可见，@Singleton只对一个Component有效，即其单例所依赖Component对象。
### 5.2 需要参数的实例化对象
Person的构造方法发生了变化，需要传入一个Context，代码如下

```
public class Person {
	private Context mContext;

	public Person(Context context) {
		mContext = context;
		Log.i("dagger", "create");
	}
}
```

这样的话，我们需要修改MainModule

```
@Module // 提供依赖对象的实例
public class MainModule {
	private Context mContext;

	public MainModule(Context context) {
		mContext = context;
	}

	@Provides
	Context providesContext() {
		// 提供上下文对象
		return mContext;
	}

	@Provides // 关键字，标明该方法提供依赖对象
	@Singleton
	Person providerPerson(Context context) {
		return new Person(context);
	}

}
```

修改providerPerson方法，传入Context对象。
添加providesContext(),用以提供Context对象。

看一下使用: 

```
//构造桥梁对象
MainComponent component = DaggerMainComponent.builder().mainModule(new MainModule(this)).build();
//注入
component.inject(this);
```

逻辑：   

- 根据@Inject注解，查找需要依赖注入的对象。
- 从MainModule中根据返回值，找到providerPerson(Context context)对象。
- 发现其需要传入参数Context，找到moudule中具有返回值为Context的方法providesContext()。
- 最后就成功的构建了实例化对象。

可能会有疑问，我既然module中已经保存了Context对象，那么为什么不直接使用Context对象呢，因为解耦，如果使用了保存的对象，会导致下次Context获取发生变化时，需要修改providerPerson(Context context)中的代码。   

在编写Module中，不能出现传入参数和返回参数一致的情况，会导致死循环。  

很容易理解，需要的和获取的是同一个方法，循环调用。  

### 5.3 依赖一个组件

在使用中，往往会有依赖另一个组件的情况。比如，在AppMoudle中能够提供Context对象，如下：

```
@Module
public class AppModule {
	private Context mContext;

	public AppModule(Context context) {
		mContext = context;
	}

	@Provides
	Context providesContext() {
		// 提供Context对象
		return mContext;
	}
}
```

而在另一个Module中需要依赖Context对象，那么怎么写呢？  
首先编写当前AppModule的Component类 

```
@Component(modules = AppModule.class)
public interface AppComponent 
{
  // 向其下层提供Context 对象
  Context proContext();
}
```

在此种，因为Module中需要向下层提供Context对象，而其与下层的联系时通过Component 
，所以需要在这里声明一个其所提供对象的方法。以便下层Module获取。 

```
public class ActivityMoudule {
	@Provides
	Person providePerson(Context context) {
		// 此方法需要Context 对象
		return new Person(context);
	}
}

@Component(dependencies = AppComponent.class, modules = ActivityMoudule.class)
public interface ActivityComponent {
	// 注入
	void inject(MainActivity activity);
}
```

在子Component中，有一句关键的注解dependencies = AppComponent.class，添加了上层依赖。  

看一下使用

```
// 依赖对象　Component
 AppComponent appCom = DaggerAppComponent.builder().appModule(new AppModule(this)).build();
        // 子类依赖对象 ，并注入
        DaggerActivityComponent.builder()
                .appComponent(appCom)
                .activityMoudule(new ActivityMoudule())
                .build()
                .inject(this);
```

在其中使用过程中，有很重的两点。  

- 父依赖的Component中需要添加提供对象的接口。
- 子依赖的Component中的注解中添加dependencies = AppComponent.class

### 5.4 @Qualifier 自定义标记
在使用中，会出现两个方法返回对象相同时的情况，那么如何区分呢。  
Person对象具有两个构造方法，根据不同的参数值构造不同的方法。

```
public class Person {
	private Context mContext;

	public Person(Context context) {
		mContext = context;
		Log.i("dagger", "create");
	}

	public Person(String name) {
		Log.i("dagger", name);
	}
}
```

ActivityModule中添加@Named标记 

```
@Module
public class ActivityMoudule {
	@Named("Context") // 通过context创建Person 对象
	@Provides
	Person providePersonContext(Context context) {
		// 此方法需要Context 对象
		return new Person(context);
	}

	@Named("name") // 通过name创建Person 对象
	@Provides
	Person providePersonName() {
		// 此方法需要name
		return new Person("1234");
	}
}
```

使用时，也需要添加此标记 

```
public class MainActivity extends AppCompatActivity
{
   @Named("context") // 标记
   @Inject
   Person person;

   @Named("name")  // 标记
   @Inject
   Person person2;

 @Override
 protected void onCreate(@Nullable Bundle savedInstanceState) 
  {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    //注入
    component.inject(this);*/
    // 依赖对象　Component
    AppComponent appCom = DaggerAppComponent.builder().appModule(new AppModule(this)).build();
    // 子类依赖对象 ，并注入
    DaggerActivityComponent.builder()
            .appComponent(appCom)
            .activityMoudule(new ActivityMoudule())
            .build()
            .inject(this);
   }

}
```

使用时，使用者的@Inject上，必须要加入注解@Named("xxx"),不然编译期会报错。  
这样使用过程中，虽然解决了问题，但是通过字符串标记一个对象，容易导致前后不匹配，可以通过自定义注解的方式解决。  
添加两个注解，分别对应Context和name。 

```
@Qualifier  // 关键词
@Retention(RetentionPolicy.RUNTIME)  // 运行时仍可用
public @interface PersonForContext 
{
  // Context 对象的注解
}

@Qualifier
@Retention(RetentionPolicy.RUNTIME)
public @interface PersonForName
 {
  // name 对象的注解
 }
```

在使用@Named("")的地方替换为上面的注解 

```
@PersonForContext  // 通过context创建Person 对象
@Provides
Person providePersonContext(Context context)
{
    //　此方法需要Context 对象
    return new Person(context);
}

@PersonForName  // 通过name创建Person 对象
@Provides
Person providePersonName()
{
    //　此方法需要Context 对象
    return new Person("123");
}
```

注入时：

```
@PersonForContext // 标记
@Inject
Person person;

@PersonForName // 标记
@Inject
Person person2;  
```

###  5.5 Scope  
在前面中提到@Singleton注解，该注解能够使同一个Component中的对象保持唯一，即单例。   
回忆一下，如下方式：

```
@Provides // 关键字，标明该方法提供依赖对象
@Singleton
Person providerPerson(Context context)
{
   return new Person(context);
}
```

Module中，对应方法中添加@Singleton注解，同时其所在的Component中，类生命上也需要添加注解 

```
@Singleton
@Component(modules = MainModule.class)  // 作为桥梁，沟通调用者和依赖对象库
public interface MainComponent {
}
```

如果我们看这个意思，感觉其内部应该做了很多的实现，用以达到单例。其实，没我们想的那么复杂。  
看一下@Singleton的实现

```
@Scope //注明是Scope 
@Documented  //标记在文档 
@Retention(RUNTIME)  // 运行时级别
public @interface Singleton {}
```

通过@Scope定义的一个新的注解。  


在之前的，我们知道该单例是依托于他所在的Component组件。那么我们是否可以这样理解，因为方法上添加的@Scope标记的注解和Component上添加的@Scope标记的注解相同（确实相同，同为@Singleton），就表明了该方法提供的实例对象在Component保持唯一。保持唯一的条件是通过@Scope标记的注解相同。   

通过在上面的依赖层级上，Android中通常定义两个生命周期。  

### 5.6 全局的生命周期PerApp

```
/**
* 全局的生命周期单例
*/
@Scope
@Documented
@Retention(RetentionPolicy.RUNTIME)
public @interface PerApp {
}
```

在使用中完全和@Singleton相同。

```
@Module
public class AppModule {
	private Context mContext;

	public AppModule(Context context) {
		mContext = context;
	}

	@Provides
	@PerApp // 添加该标记表明该方法只产生一个实例
	Context providesContext() {
		// 提供上下文对象
		return mContext;
	}

}

@PerApp // 因为Module 中使用了该标记,所以需要在此添加
@Component(modules = AppModule.class)
public interface AppComponent {
// 向其下层提供Context 对象
	Context proContext();
}
```

因为单例的依托于他所在的Component中，所以需要在Application中进行实例化。 

```
public class App extends Application 
{
   // 为什么可以使用静态
   public static AppComponent appComponent;
   @Override
   public void onCreate() 
	{
      super.onCreate();
      // 实例化
      appComponent = DaggerAppComponent.builder().appModule(new AppModule(this)).build();
	}
}
```

为什么可以使用静态的，因为该AppComponent对象的生命周期是整个App。那么在使用中，其所在Module中的实例化对象，可以保持全局单例。   

### 3.7 一个Activity的生命周期PerActivity

有全局的单例，而对于一个Activity，他也有些对象需要保持单例。我们需要定义该注解。 

```
@Scope
@Documented
@Retention(RetentionPolicy.RUNTIME)
public @interface PerActivity {
}
```

会发现，除了定义名不一样，其余都和PerApp一样。在前面，说过这样一句话：保持唯一的条件是通过@Scope标记的注解相同。

```
@Module
public class ActivityMoudule 
{
   @PersonForContext
   @Provides
   @PerActivity  // 添加标记，生命其所构造的对象单例
   Person providePersonContext(Context context)
	{
      //　此方法需要Context 对象
      return new Person(context);
	}

	.....
}

@PerActivity  // ActivityMoudule 中使用了该标记
@Component(dependencies = AppComponent.class,modules = ActivityMoudule.class)
public interface ActivityComponent {
// 注入
void inject(MainActivity activity);
}
```

使用方式，因为其所保持的单例是在Activity中，具体使用如下。 

```
public class MainActivity extends AppCompatActivity {
	@PersonForContext // 标记
	@Inject
	Person person;

	@PersonForName // 标记
	@Inject
	Person person2;

	/**
	 * 不使用静态的，因为该Component只是针对于该Activity，而不是全局的
	 */
	ActivityComponent activityComponent;

	@Override
   protected void onCreate(@Nullable Bundle savedInstanceState)
	 {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        activityComponent = DaggerActivityComponent.builder()
            .appComponent(App.appComponent)  // 添加了全局的AppComponent组件,可以使用全局的实例化对象
            .activityMoudule(new ActivityMoudule())
            .build();

        activityComponent.inject(this);
```


对于具有依赖关系的Component，不能使用相同的Scope，如果使用相同的会带来语意不明  

### 3.8 懒加载Lazy和强制重新加载Provider

```
public class MainActivity extends AppCompatActivity
{
   @PersonForContext // 标记
   @Inject
   Lazy<Person> lazyPerson; // 注入Lazy元素

   @PersonForName // 标记
   @Inject
   Provider<Person> providerPerson; // 注入Provider

   /**
    * 不使用静态的，因为该Component只是针对于该Activity，而不是全局的
    */
   ActivityComponent  activityComponent;
   @Override
   protected void onCreate(@Nullable Bundle savedInstanceState) 
	{
       super.onCreate(savedInstanceState);
       setContentView(R.layout.activity_main);
       activityComponent = DaggerActivityComponent.builder()
            .appComponent(App.appComponent)  // 添加了全局的AppComponent组件
            .activityMoudule(new ActivityMoudule())
            .build();
       activityComponent.inject(this);
       Person person = lazyPerson.get();// 调用该方法时才会去创建Person,以后每次调用获取的是同一个对象
       //调用该方法时才回去创建Person1，以后每次调用都会重新加载Module中的具体方法，根据Module中的实现，可能相同，可能不相同。
      Person person1 = providerPerson.get();
     }
}
```


参考[Demo][2]















[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/dagger2.png
[2]: https://github.com/PGzxc/Dagger2Demo

