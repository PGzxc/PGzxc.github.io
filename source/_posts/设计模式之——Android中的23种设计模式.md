---
title: 设计模式之——Android中的23种设计模式
categories:
  - 开发
  - P-设计模式
tags:
  - 设计模式
abbrlink: 6804df
date: 2017-12-24 22:23:47
---
# 前言   
## 基本定义  
设计模式(Design pattern)是一套被反复使用的代码设计经验的总结。使用设计模式的目的是为了可重用代码，让代码更容易被他人理解。设计模式时软件工程的基石脉络，如大厦的结构一样。  

## 设计模式(Design pattern)的四大要素
-	模式名称(Name)
-	问题(Question)
-	解决方案(Solution)
-	效果(Efftive)。
<!--more-->
## 面向对象的六大原则
首先，我们为什么学习设计模式。主要是这些模式是前人总结的经验，使用这些模式能让我们的程序更加健壮、更稳定、容易扩展等等优点。在编写面向对象程序时，我们需要遵循以下6个原则，能让我们的程序维护起来更轻松(当然还有其他好处)。   

### 单一职责原则   
单一原则很简单，就是将一组相关性很高的函数、数据封装到了一个类中。换句话说，一个类应该有职责单一。  
### 开闭原则
开闭原则理解起来也不复杂，就是一个类应该对于扩展是开放的，但是对于修改是封闭的。我们知道，在开放的app或者是系统中，经常需要升级、维护等，这就要对原来的代码进行修改时容易破坏原有的系统，甚至带来一些新的难以发现的BUG。因此，我们在一开始编写代码时，就应该注意尽量通过扩展的方式实现新的功能，而不是通过修改已有的代码实现。
### 里氏替换原则  
里氏替换原则的定义为：所有引用基类的地方必须能透明地使用其子类对象。定义看起来很抽象，其实，很容易理解，本质上就是说，要好好利用继承和多态。简单地说，就是以父类的形式声明的变量(或形参)，赋值为任何继承于这个父类后不影响程序的执行。看一组代码你就明白这个原则了：  

	//窗口类
	public class Window()
	{
    	public void show(View child)
		{
        	child.draw();
    	}
	}
	public abstract class View()
	{
    	public abstract void draw();
    	public void measure(int widht,int height)
		{
        	//测量视图大小
    	}
	}
	public class Button extends View
	{
    	public void draw()
		{
        	//绘制按钮
    	}
	}

	public class TextView extends View
	{
    	public void draw()
		{
        	//绘制文本
    	}
	}
Window类中show函数需要传入View，并且调用View对象的draw函数。而每个继承于View的子类对象都有draw的实现，不存在继承于View但是却没实现draw函数的子类(abstract方法必须实现)。我们在抽象设计之时就运用到了里氏替换原则。  
### 依赖倒置原则
依赖倒置主要是实现解耦，使得高层次的模块不依赖于低层次模块的具体实现细节。怎么去理解它呢，我们需要知道几个关键点：   

- 高层模块不应该依赖底层模块(具体实现)，二者都应该依赖其抽象(抽象类或接口)
- 抽象不应该依赖细节(抽象类跟接口肯定不依赖具体的实现)
- 细节应该依赖于抽象(具体实现类肯定要依赖其继承的抽象类或接口)

其实，在我们用的java语言中，抽象就是指接口或者抽象类，二者都是不能直接被实例化；细节就是实现类，实现接口或者继承抽象类而产生的类，就是细节。使用java语言描述就简单了：就是各个模块之间相互传递的参数声明为抽象类型，而不是声明为具体的实现类； 
### 接口隔离原则
接口隔离原则定义：类之间的依赖关系应该建立在最小的接口上。其原则是将非常庞大的，臃肿的接口拆分成更小更具体的接口。  
### 迪米特原则 
一个对象应该对其他的对象有最少的了解。什么意思呢？就是说一个类应该对自己调用的类知道的最少。还是不懂？其实很简单来说：假如类A实现了某个功能，类B需要调用类A的去执行这个功能，那么类A应该只暴露一个函数给类B，这个函数表示是实现这个功能的函数，而不是让类A把实现这个功能的所有细分的函数暴露给B。   

# 设计模式
## 单利模式
单利模式可以说是最容易理解的模式了，也是应用最广的模式之一，先看看定义吧。    
### 定义  
确保单利类只有一个实例，并且这个单利类提供一个函数接口让其他类获取这个唯一的实例。  
### 什么时候需要使用单利模式呢？
如果某个类，创建时需要消耗很多资源，即new出这个类的代价很大；或者是这个类占用很多内存，如果创建太多这个类实例会导致内存占用太多。  

关于单利模式，虽然很简单，无需过多的解释，但是这里还要提个醒，其实单利模式里面有很多坑。我们去会会单利模式。最简单的单利模式如下：  

	public class Singleton
	{
    	private static Singleton instance;
    	//将默认的构造函数私有化，防止其他类手动new
    	private Singleton(){};
    	public static Singleton getInstance()
		{
        	if(instance==null)
            instance=new Singleton();
        	 return instatnce;
    	}
	}
如果是单线程下的系统，这么写肯定没问题。可是如果是多线程环境呢？这代码明显不是线程安全的，存在隐患：某个线程拿到的instance可能是null，可能你会想，这有什么难的，直接在getInstance()函数上加synchronized关键字不就好了。可是你想过没有，每次调用getInstance（）时都要执行同步，这带来没必要的性能上的消耗。注意，在方法上加synchronized关键字时，一个线程访问这个方法时，其他线程无法同时访问这个类其他sychronized方法的。我们看看另外一种实现：  

	public class Singleton
	{
    	private static Singleton instance;
    	//将默认的构造函数私有化，防止其他类手动new
    	private Singleton(){};
    	public static Singleton getInstance()
		{
        	if(instance==null)
			{
            	sychronized(Singleton.class)
				{
                	if(instance==null)
                    instance=new Singleton();
            	}
        	}
        	return instatnce;
    	}
	}
相比前面的代码，这里只是对instance变量加了一个volatile关键字。   volatile关键字的作用是：线程每次使用到被volatile关键字修饰的变量时，都会去堆里拿最新的数据。换句话说，就是每次使用instance时，保证了instance是最新的。注意：volatile关键字并不能解决并发的问题，关于volatile请查看其它相关文章。但是volatile能解决我们这里的问题。  

那么在Android中哪些地方用到了单利模式呢？其实，我们在调用系统服务时拿到的Builder对象就是个单利。比如：   

	//获取WindowManager服务引用
	WindowManager wm = (WindowManager)getSystemService(getApplication().WINDOW_SERVICE);
其内部是通过单利的方式返回的。  

## Builder模式  
### 定义 
将一个复杂对象的构造与的表示分离，使得同样的构造过程可以创建不同的表示。  
### 什么情况下使用Build模式  
主要是在创建某个对象时，需要设定很多的参数(通过setter方法)，但是这些参数必须按照某个顺序设定或者是设置步骤不同会得到不同结果。   
### 例子  
举个非常简单的例子：   

	public class MyData
	{
    	private int id;
    	private String num; 
    	public void Test(){} 
    	public void setId(int id){this.id=id;}
	    public void setNum(String num){this.num=num+"id";}
	}
当然了，没有人会这么去写代码。这里只是举例子，或者是有时候很多参数有这种类似的依赖关系时，通过构造函数未免太多参数了。回到主题，就是如果是上面的代码，该怎么办呢？你可能会说，那还不简单，先调用setId函数，再调用setNum函数。是的，没错。可是，万一你一不小心先调用了setNum呢？这是比较简单的示例，如果是比较复杂的，有很多变量之间依赖的关系，那你每次都得小心翼翼的把各个函数的执行步骤写正确。   

我们看看Builder模式是怎么去做的：  

	public class MyBuilder
	{
    	private int id;
    	private String num;
    	public MyData build()
		{
        	MyData d=new MyData();
        	d.setId(id);
        	d.setNum(num);
        	return t;
    	}
    	public MyBuilder setId(int id)
		{
        	this.id=id;
        	return this;
    	}
    	public MyBuilder setNum(String num)
		{
        	this.num=num;
        	return this;
    	}
	}

	public class Test
	{
    	public static void  main(String[] args)
		{
        	MyData d=new MyBuilder().setId(10).setNum("hc").build();
    	}
	}
注意到，Builder类的setter函数都会返回自身的引用this，这主要是用于链式调用，这也是Builder设计模式中的一个很明显的特征。  
### Android中用过的代码 
那么在Android中哪里用到了Builder设计模式呢？在创建对话框时，是不是跟上面有点类似呢？  

	AlertDialog.Builer builder=new AlertDialog.Builder(context);
	builder.setIcon(R.drawable.icon)
    .setTitle("title")
    .setMessage("message")
    .setPositiveButton("Button1", 
        new DialogInterface.OnclickListener(){
            public void onClick(DialogInterface dialog,int whichButton){
                setTitle("click");
            }   
        })
    .create()
    .show();
这里的create()函数就想到了上面蛋蛋代码中的builder函数。看到了这里是不是在内心中默默的把Builder设计模式拿下了呢？  

## 原型模式
### 定义
原型设计模式非常简单，就是将一个对象进行拷贝。对于类A实例a，要对a进行拷贝，就是创建一个跟a一样的类型A的实例b，然后将a的属性全部复制到b。   
### 什么时候使用
什么时候使用原型模式呢？我个人认为，可以在类的属性特别多但是又要经常对类进行拷贝的时候可以用原型模式，这样代码比较简洁，而且比较方便。  

另外需要注意的是，还有深拷贝和浅拷贝。深拷贝就是把对象里面的引用的对象也要拷贝一份新的对象，并将这个新的引用对象作为拷贝的对象引用。  举个例子，假设A类中有B类的引用b，现在需要对A类实例进行拷贝，那么深拷贝就是，先对b进行一次拷贝得到nb，然后把nb作为A类拷贝的对象的引用，如此一层一层迭代拷贝，把所有的引用都拷贝结束。浅拷贝则不是。   

原型模式比较简单，看看Android怎么运用原型模式：  

	Uri uri=Uri.parse("smsto:10086");
	Intent shareIntent=new Intent(Intent.ACTION_SENDTO,uri);

	//克隆副本
	Intent intent=(Intetn)shareIntent.clone();
	startActivity(intent);
或许我们平时不会这么去写，但是intent对象确实提供了原型模式的函数clone().
## 工厂方法模式
### 定义 
定义一个创建对象的接口，让子类决定实例化哪个类
先看一个例子：  

	public abstract class Product
	{
    	public abstract void method();
	} 

	public class ConcreteProductA extends Prodect
	{
    	public void method(){System.out.println("我是产品A!");}
	}

	public class ConcreteProductB extends Prodect
	{
    	public void method(){System.out.println("我是产品B!");}
	}

	public  abstract class Factory
	{
    	public abstract Product createProduct();
	}

	public class MyFactory extends Factory
	{
    	public Product createProduct(){return new ConcreteProductA();}
	}
看到上面的代码，是不是觉得工厂模式很简单呢？还可以通过传参的方式，让MyFactory的createProduct方法根据传入蛋蛋参数决定是创建ConcreteProductA还是ConcreteProductB.  

同样的，我们不希望记住这个例子，而是通过Android中的代码来记忆：  
其实，在getSystemService方法中就是用到了工厂模式，它就是根据传入的参数决定创建哪个对象，当然了，由于返回的都是以单利模式存在的对象，因此不用new了，直接把单利返回就好。   

	public Object getSystemService(String name) 
	{
    	if (getBaseContext() == null) 
		{
        	throw new IllegalStateException("System services not available to Activities before onCreate()");
    	}
    	//........
    	if (WINDOW_SERVICE.equals(name)) 
		{
        	 return mWindowManager;
    	} else if (SEARCH_SERVICE.equals(name)) 
		{
        	ensureSearchManager();
        	return mSearchManager;
    	}
    	//.......
    	return super.getSystemService(name);
	}

## 抽象工厂模式
### 定义
抽象工厂模式：为创建一组相关或者是相互依赖的对象提供一个接口，而不需要指定它们具体类  
### 例子  
看个例子吧，将它跟工厂模式做个对比：  

	public abstract class AbstractProductA
	{
    	public abstract void method();
	}
	public abstract class AbstractProdectB
	{
    	public abstract void method();
	}

	public class ConcreteProductA1 extends AbstractProductA
	{
    	public void method(){System.out.println("具体产品A1的方法！");}
	}
	public class ConcreteProductA2 extends AbstractProductA
	{
    	public void method(){System.out.println("具体产品A2的方法！");}
	}
	public class ConcreteProductB1 extends AbstractProductB
	{
    	public void method(){System.out.println("具体产品B1的方法！");}
	}
	public class ConcreteProductB2 extends AbstractProductB
	{
    	public void method(){System.out.println("具体产品B2的方法！");}
	}

	public abstract class AbstractFactory
	{
    	public abstract AbstractProductA createProductA();
	    public abstract AbstractProductB createProductB();
	}

	public  class ConcreteFactory1 extends AbstractFactory
	{
    	public  AbstractProductA createProductA()
		{
        	return new ConcreteProductA1();
    	}
    	public  AbstractProductB createProductB()
		{
        	return new ConcreteProductB1();
    	}
	}

	public  class ConcreteFactory2 extends AbstractFactory
	{
    	public  AbstractProductA createProductA()
		{
        	return new ConcreteProductA2();
    	}
    	public  AbstractProductB createProductB()
		{
        	return new ConcreteProductB2();
    	}
	}
其实Android源码中对抽象工厂出现的比较少，好在抽象工厂方法并不复杂，很容易记住，我们可以从Service中去理解，Service的onBinder方法可以看成是一个工厂方法，从framework角度来看Service，可以看成是一个具体的工厂，这相当于一个抽象工厂方法模式的雏形。  
 
	public class BaseService extends Service
	{
    	@Nullable
    	@Override
    	public IBinder onBind(Intent intent)
		{
        	return new Binder();
    	}    
	}
## 策略模式
### 定义 
有一系列的算法，将每个算法封装起来(每个算法可以封装到不同的类中)，各个算法之间可以替换，策略模式让算法独立于使用它的客户而独立变化。  
### 例子  
举个例子来理解吧，比如，你现在有很多排序算法：冒泡，希尔，归并，选择等等。我们要根据实际情况来选择使用哪种算法，有一种常见的方法是，通过if...else或者case...等条件判断语句来选择。但是这个类的维护成本会变高，维护时也容易发生错位。  
### 如何使用 
如何使用策略模式呢，我不打算写示例代码了，简单描述一下，就将前面说的算法选择进行描述。我们可以定义一个算法抽象类AbstractAlogrthm，这个类定义了一个抽象方法sort()。每个具体的排序算法去继承AbstractAlgorithm类并重写sort()实现排序。在需要使用排序的类Client类中，添加一个setAlgorithm(AbstractAlgorithm al);方法将算法设置进去，每次Client需要排序而是调用al.sort()。
### 简单理解 
不知道简单描述能不能让你理解  
看看Android中哪些出现了策略模式，其中在属性动画中使用时间插值器的时候就用到了。在使用动画时，你可以选择线性插值器Linearliterpolator、加减速插值器AccelerateDecelerateInterpolator、减速插值器DecelerateInterpolator以及自定义的插值器。这些插值器都是实现根据时间流逝的百分比来计算出当前属性改变的百分比。通过根据需要选择不同的插值器，实现不同的动画效果。这些比较好理解，就不去黏贴Android源码了。   
## 状态模式 
状态模式中，行为是由状态来决定的，不同状态下有不同行为。状态模式和策略模式的结构几乎是一模一样的，主要是他们表达的目的和本质是不同。状态模式的行为是平行的、不可替换的，策略模式的行为是彼此独立可相互替换的。
举个例子把，比如电视，电视有2个状态，一个是开机，一个是关机，开机时可以切换频道，关机时切换频道不做任何响应。

	public interface TvState
	{
    	public void nextChannerl();
    	public void prevChannerl();
    	public void turnUp();
    	public void turnDown();
	}
	public class PowerOffState implements TvState
	{
    	public void nextChannel(){}
    	public void prevChannel(){}
    	public void turnUp(){}
    	public void turnDown(){}
	}

	public class PowerOnState implements TvState
	{
    	public void nextChannel(){System.out.println("下一频道");}
    	public void prevChannel(){System.out.println("上一频道");}
    	public void turnUp(){System.out.println("调高音量");}
    	public void turnDown(){System.out.println("调低音量");}
	}

	public interface PowerController
	{
    	public void powerOn();
    	public void powerOff();
	}

	public class TvController implements PowerController
	{
    	TvState mTvState;
    	public void setTvState(TvStete tvState){ mTvState=tvState;}
    	public void powerOn()
		{
        	setTvState(new PowerOnState());
        	System.out.println("开机啦");
    	}
    	public void powerOff()
		{
        	setTvState(new PowerOffState());
        	System.out.println("关机啦");
    	}
    	public void nextChannel()
		{
        	mTvState.nextChannel();
    	}
    	public void prevChannel()
		{
    	    mTvState.prevChannel();
    	}
    	public void turnUp()
		{
        	mTvState.turnUp();
    	}
    	public void turnDown()
		{
        	mTvState.turnDown();
    	}
	}
	public class Client
	{
    	public static void main(String[] args)
		{
        	TvController tvController=new TvController();
        	tvController.powerOn();
        	tvController.nextChannel();
        	tvController.turnUp();
        
        	tvController.powerOff();
        	//调高音量，此时不会生效
        	tvController.turnUp();
    	}
	}
在Android源码中，哪里有用到状态模式呢？其实很多地方用到了，举一个例子，就是WIFI管理模块。当WIFI开启时，自动扫描周围的接入点，然后以列表的形式展示；当wifi关闭时则清空。这里wifi管理模块就是根据不同的状态执行不同的行为。  
## 责任链模式  
定义：使多个对象都有机会处理请求，从而避免请求的发送者和接受者直接的耦合关系，将这些对象连成一条链，并沿这条链传递该请求，直到有对象处理它为止。

相信聪明的你很容易理解吧，基本不需要例子来解释了，直接进如到Android源码中哪里用到了责任链：在Android处理点击事件时，父View先接收到点击事件，如果父View不处理则交给子View，依次往下传递~

## 解释器模式
定义：给定一个语言，定义它的语法，并定义一个解释器，这个解释器用于解析语言。

从定义中看起来比较抽象，其实，很简单，很容易理解！就是相当于自定义一个格式的文件，然后去解析它。不用理解的那么复杂！

我们看看Android中哪里用到了，从我们第一次学Android时就知道，四大组件需要在AndroidManifest.xml中定义，其实AndroidManifest.xml就定义了<Activity>，<Service>等标签（语句）的属性以及其子标签，规定了具体的使用（语法），通过PackageManagerService（解释器）进行解析。

## 命令模式
定义：命令模式将每个请求封装成一个对象，从而让用户使用不同的请求把客户端参数化；将请求进行排队或者记录请求日志，以及支持可撤销操作。

举个例子来理解：当我们点击“关机”命令，系统会执行一系列操作，比如暂停事件处理、保存系统配置、结束程序进程、调用内核命令关闭计算机等等，这些命令封装从不同的对象，然后放入到队列中一个个去执行，还可以提供撤销操作。

那么Android中哪里用到了命令模式呢？在framework层还真不多。但是在底层却用到了，一个比较典型的例子就是在Android事件机制中，底层逻辑对事件的转发处理。每次的按键事件会被封装成NotifyKeyArgs对象。通过InputDispatcher封装具体的事件操作。

## 观察者模式
定义：定义了对象之间的一对多的关系，其实就是1对n，当“1”发生变化时，“n”全部得到通知，并更新。

观察者模式一个比较经典的应用就是：订阅——发布系统。很容易理解，发布消息时，将消息发送给每个订阅者。我们常用的微信公众号就是典型，当我们关注某个公众号时，每当公众号推送消息时，我们就会去接收到消息，当然了，每个订阅（关注）公众号的的人都能接收到公众号推送的消息。

那么Android哪里用到了观察者模式呢？我们看看ListView的适配器，有个函数notifyDataSetChanged()函数，这个函数其实就是通知ListView的每个Item，数据源发生了变化，请各位Item重新刷新一下。

## 备忘录模式
备忘录模式定义：在不破坏封闭的前提下，捕获一个对象的内部状态，并在对象之外保存这个状态，这样，以后就可将对象恢复到原先保存的状态中。

其实就是相当于一个提前备份，一旦出现啥意外，能够恢复。像我们平时用的word软件，意外关闭了，它能帮我们恢复。其实就是它自动帮我们备份过。

那么Android哪里用到了备忘录模式呢？Activity的onSaveInstanceState和onRestoreInstanceState就是用到了备忘录模式，分别用于保存和恢复。

## 迭代器模式
迭代器模式定义：提供一种方法顺序访问一个容器对象中的各个元素，而不需要暴露该对象的内部表示。

相信熟悉Java的你肯定知道，Java中就有迭代器Iterator类，本质上说，它就是用迭代器模式。

按照惯例，看看Android中哪里用到了迭代器模式，Android源码中，最典型的就是Cursor用到了迭代器模式，当我们使用SQLiteDatabase的query方法时，返回的就是Cursor对象，通过如下方式去遍历：

	cursor.moveToFirst();
	do{
	//cursor.getXXX(int);
	}while(cursor.moveToNext);
## 模板方法模式
定义：定义一个操作中的算法框架，而将一些步骤延迟到子类中，使得子类可以不改变一个算法的结构即可重定义该算法的某些特定的步骤。

不用解释太多，感觉越解释越糊涂，直接拿Android中的源码来说事！

我们知道，启动一个Activity过程非常复杂，如果让开发者每次自己去调用启动Activity过程无疑是一场噩梦。好在启动Activity大部分代码时不同的，但是有很多地方需要开发者定制。也就是说，整体算法框架是相同的，但是将一些步骤延迟到子类中，比如Activity的onCreate、onStart等等。这样子类不用改变整体启动Activity过程即可重定义某些具体的操作了~。

## 访问者模式
定义：封装一些作用于某种数据结构中各元素的操作，它可以在不改变这个数据结构的前提下定义作用于这些元素的新的操作。

访问者模式是23种设计模式中最复杂的一个，但他的使用率并不高，大部分情况下，我们不需要使用访问者模式，少数特定的场景才需要。

Android中运用访问者模式，其实主要是在编译期注解中，编译期注解核心原理依赖APT(Annotation Processing Tools)，著名的开源库比如ButterKnife、Dagger、Retrofit都是基于APT。APT的详细使用这里不提，后面我会写关于APT相关的文章，敬请期待~

## 中介者模式
定义：中介者模式包装了一系列对象相互作用的方式，使得这些对象不必相互明显调用，从而使他们可以轻松耦合。当某些对象之间的作用发生改变时，不会立即影响其他的一些对象之间的作用保证这些作用可以彼此独立的变化，中介者模式将多对多的相互作用转为一对多的相互作用。

什么时候用中介者模式呢？其实，中介者对象是将系统从网状结构转为以调停者为中心的星型结构。

举个简单的例子，一台电脑包括：CPU、内存、显卡、IO设备。其实，要启动一台计算机，有了CPU和内存就够了。当然，如果你需要连接显示器显示画面，那就得加显卡，如果你需要存储数据，那就要IO设备，但是这并不是最重要的，它们只是分割开来的普通零件而已，我们需要一样东西把这些零件整合起来，变成一个完整体，这个东西就是主板。主板就是起到中介者的作用，任何两个模块之间的通信都会经过主板协调。

那么Android中那些地方用到了中介者模式呢？在Binder机制中，就用到了中介者模式，对Binder不是很熟悉的童鞋请参考我的《 简单明了，彻底地理解Binder》。我们知道系统启动时，各种系统服务会向ServiceManager提交注册，即ServiceManager持有各种系统服务的引用 ，当我们需要获取系统的Service时，比如ActivityManager、WindowManager等（它们都是Binder），首先是向ServiceManager查询指定标示符对应的Binder，再由ServiceManager返回Binder的引用。并且客户端和服务端之间的通信是通过Binder驱动来实现，这里的ServiceManager和Binder驱动就是中介者。

## 代理模式
定义：为其他类提供一种代理以控制这个对象的访问。
其实代理模式我们平时用的也比较多，其实比较好理解，就是当我们需要对一个对象进行访问时，我们不直接对这个对象进行访问，而是访问这个类的代理类，代理类能帮我们执行我们想要的操作。代理模式比较容易理解，既然你来看这篇文章相信你对代理模式不陌生。

我们直接看看代理模式在Android中的应用，如果你查看AIDL生成的代码就知道，它会根据当前的线程判断是否要跨进程访问，如果不需要跨进程就直接返回实例，如果需要跨进程则返回一个代理，这个代理干什么事情呢?我们在《 简单明了，彻底地理解Binder》提到，在跨进程通信时，需要把参数写入到Parcelable对象，然后再执行transact函数，我们要写的代码挺多的。AIDL通过生成一个代理类，代理类中自动帮我们写好这些操作。

## 组合模式
定义：将对象组成成树形结构，以表示“部分-整体”的层次结构，使得用户对单个对象和组合对象的使用具有一致性。

上面的定义不太好理解，我们直接从Android中用到的组合模式说起。我们知道，Android中View的结构是树形结构，每个ViewGroup包含一系列的View，而ViewGroup本身又是View。这是Android中非常典型的组合模式。

## 适配器模式
定义：把一个类的接口变换成客户端所期待的另一个接口，从而使原本因接口不匹配而无法在一起工作的两个类能够在一起工作。

其实适配器模式很容易理解，我们在Android开发时也经常用到。比较典型的有ListView和RecyclerView。为什么ListView需要使用适配器呢？主要是，ListView只关心它的每个ItemView，而不关心这个ItemView具体显示的是什么。而我们的数据源存放的是要显示的内容，它保存了每一个ItemView要显示的内容。ListView和数据源之间没有任何关系，这时候，需要通过适配器，适配器提供getView方法给ListView使用，每次ListView只需提供位置信息给getView函数，然后getView函数根据位置信息向数据源获取对应的数据，根据数据返回不同的View。

## 装饰模式
定义：动态的给一个对象添加额外的智者，就增加功能来说，装饰模式比子类继承的方式更灵活。
通过简单代码来理解装饰模式：  

	public abstract class Component
	{
    	public abstract void operate();
	}

	public class ConcreteComponent extends Component
	{
    	public void operate(){//具体的实现}
	}

	public class Decorator
	{
    	private Component component;
    	public Decorator(Component component)
		{
        	this.component=component;
    	}
    	public void operate()
		{
        	operateA();
        	component.operate();
        	operateB();
    	}
    	public void operateA()
		{
        	//具体操作
    	}
    	public void operateB()
		{
        	//具体操作
    	}
	}
那么在Android哪里出现了装饰模式呢？我们平时经常用到Context类，但是其实Context类只是个抽象类，具体实现是ContextImpl，那么谁是ContextImpl的装饰类呢？我们知道Activity是个Context,但是Activity 并不是继承于Context,而是继承于ContextThremeWrapper.而ContextThremeWrapper继承于ContextWrapper,ContextWrapper继承Context.说了这么多，跟装饰模式有啥关系？主要是引入ContextWrapper这个类。ContextWrapper内部有个Context引用mContext，并且ContextWrapper中对Context的每个方法都有实现，在实现中调用的就是mContext相同的方法。

## 享元模式
定义：使用享元对象有效地支持大量的细粒度对象。

享元模式我们平时接触真的很多，比如Java中的常量池，线程池等。主要是为了重用对象。

在Android哪里用到了享元模式呢？线程通信中的Message，每次我们获取Message时调用Message.obtain()其实就是从消息池中取出可重复使用的消息，避免产生大量的Message对象。

## 外观模式
定义：要求一个子系统的外部与其内部的通信必须通过一个统一的对象进行。

怎么理解呢，举个例子，我们在启动计算机时，只需按一下开关键，无需关系里面的磁盘、内存、cpu、电源等等这些如何工作，我们只关心他们帮我启动好了就行。实际上，由于里面的线路太复杂，我们也没办法去具体了解内部电路如何工作。主机提供唯一一个接口“开关键”给用户就好。

那么Android哪里使用到了外观模式呢？依然回到Context，Android内部有很多复杂的功能比如startActivty、sendBroadcast、bindService等等，这些功能内部的实现非常复杂，如果你看了源码你就能感受得到，但是我们无需关心它内部实现了什么，我们只关心它帮我们启动Activity，帮我们发送了一条广播，绑定了Activity等等就够了。

## 桥接模式
定义：将抽象部分与实现部分分离，使他们独立地进行变化。
其实就是，一个类存在两个维度的变化，且这两个维度都需要进行扩展。

在Android中桥接模式用的很多，举个例子，对于一个View来说，它有两个维度的变化，一个是它的描述比如Button、TextView等等他们是View的描述维度上的变化，另一个维度就是将View真正绘制到屏幕上，这跟Display、HardwareLayer和Canvas有关。这两个维度可以看成是桥接模式的应用。


参考：   
[从Android代码中来记忆23种设计模式][1]   
[Android设计模式之23种设计模式一览][2]
[8种常用的android设计模式][3]
[Android涉及到的设计模式][4]
[Android开发中常见的设计模式][5]





[1]: https://www.jianshu.com/p/1a9f571ad7c0
[2]: http://blog.csdn.net/happy_horse/article/details/50908439
[3]: http://blog.csdn.net/u013128651/article/details/51108151
[4]: https://www.cnblogs.com/childhooding/p/4348811.html
[5]: https://www.cnblogs.com/android-blogs/p/5530239.html
















