---
title: Kotlin开发之——扩展函数
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 扩展函数
abbrlink: 18d6bb69
date: 2017-12-21 10:27:48
---
# 什么是扩展函数  
扩展函数是指在一个类上增加一种新的行为，甚至我们没有这个类代码的访问权限。这是一个在缺少有用函数的类上扩展的方法，Kotlin能够为我们做到那些令人关注的事情，而这些Java做不到。  

在Java中，通常会实现很多带有static方法的工具类，而Kotlin中扩展函数的一个优势是我们不需要在调用方法的时候把整个对象当做参数传入，它表现的就像属于这个类的一样，而且我们可以使用this关键字和调用所有public方法。  

- Kotlin的扩展函数功能使得我们可以为现有的类添加新的函数，实现某一具体功能。  
- 扩展函数是静态解析的，并未对原类添加函数或属性，对类本身没有任何影响。
- 扩展属性允许定义在类或者Kotlin文件中，不允许定义在函数中。  

<!--more-->

# 扩展函数的使用  
## 函数的扩展 
简单来说，Kotlin扩展函数允许我们在不改变已有类的情况下，为类添加新的函数。例如，我们能能够为Activity中添加新的方法，让我们以更简单的术语显示toast，并且这个函数不需要传入任何context，它可以被任何Context或者它的子类调用，比如Activity或者service：  

	fun Context.toast(message: CharSequence, duration: Int = Toast.LENGTH_SHORT) 
	{
    	Toast.makeText(this, message, duration).show()
	}
当然你也可以这样写：   

	fun Activity.toast(message: CharSequence, duration: Int = Toast.LENGTH_SHORT)
	{
    	Toast.makeText(this, message, duration).show()
	}
对参数的解释：  

- Activity:表示函数的接收者，也就是函数扩展的对象  
- "."：扩展函数修饰符
- toast:扩展函数名称 

我们可以在任何地方(例如在一个工具类文件中)声明这个函数，然后在我们的Activity中将它作为普通方法来直接使用(这里的两种使用方式后文会做出解释)

	override fun onCreate(savedInstanceState: Bundle?) 
	{ 
    	super<BaseActivity>.onCreate(savedInstanceState)
    	toast("This is onCreate!!")
    	toast("Hello world!", Toast.LENGTH_LONG)
	}
当然了，Anko已经包括了自己的toast扩展函数，跟上面的这个很相似(关于Anko是什么，可以在Github上搜索Anko查看)，Anko提供了一些针对CharSequence和resource的函数，还有两个不同toast和longToast方法。
  
	toast("Hello world!")
	longToast(R.id.hello_world)
有一点值得注意：扩展函数并不是真正地修改了原来的类，它的这些作用效果是以静态导入的方式来实现的。扩展函数可以被声明在任何文件中，因此有个通用的方式是把一系列有关的函数放在一个新建的文件里，就像我们刚才所说的工具类当中。   
我觉得还是再举几个例子来说明一下吧，因为他们完全显示扩展函数的力量。  
### 在Toast中的高级用法  
我们首先看看这个例子：  

	fun Context.niceToast(message: String,
                tag: String = javaClass<MainActivity>().getSimpleName(),
                length: Int = Toast.LENGTH_SHORT) 
	{
    	Toast.makeText(this, "[$className] $message", length).show()
	}
我们增加了一个默认值是类名的参数，如果这是在java中的话，那么总数开销会以集合形式增长，而现在我们可以通过以下方式调用：   

	toast("Hello")
	toast("Hello", "MyTag")
	toast("Hello", "MyTag", Toast.LENGTH_SHORT)
我们甚至还有其他选择，因为我们可以使用参数名字来调用，也就是说我们可以通过在值前写明参数名来传入我们希望的参数：  

	toast(message = "Hello", length = Toast.LENGTH_SHORT)
这样我们就使用了第二个参数的默认形式，而使用了第一第三个参数的传入形式。但是你可能觉得这样的函数调用比较难以理解，“[className]message”，这个是Kotlin中的String模板，我们接下来讲解一下它。  
### String模板  
我们可以在String中直接使用模板表达式，它可以帮助我们很简单地在静态值和变量的基础上编写复杂的String。在上面的例子中，我们使用了“[className]message”.  
  
这就意味着，在任何时候我们使用一个符号就可以插入一个表达式。如果这个表达式有一点复杂，我们就需要使用一对大括号括起来，比如：“My{user.anem}”。字符串可以包含模板表达式，既可求值的代码片段，并将其结果连接到字符串中。下面我们举几个例子。    

1. 一个模板表达式由一个$和简单名称组成

	val i=10;
	val s="i=$i"//输出结果为"i=10"
2. 一个模板表达式由一个$和大括号括起来的表达式组成  

	val s="abc"
	val str="$s.length is${s.length}" //输出结果为"abc.length is 3"

3. 如果想输出字符，比如"$"

	${'$'}
### 在onCreateViewHolder中的使用  
第一个是我们在RecycleView中的适配器中用到的例子，正常情况下我们这样使用：   

	override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder 
	{
    	val v = LayoutInflater.from(parent.context).inflate(R.layout.view_item, parent, false)
    	return ViewHolder(v)
	}
但是实际上加载布局的逻辑实在是太麻烦了，并且绝大多数情况下我们都在重复编写同样的适配器代码，那么我们为什么不给ViewGroups赋予inflate的能力呢?   

	fun ViewGroup.inflate(layoutRes: Int): View 
	{
    	return LayoutInflater.from(context).inflate(layoutRes, this, false)
	}
然后我们可以想现在这样使用它：  

	override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder 
	{
    	val v = parent.inflate(R.layout.view_item)
    	return ViewHolder(v)
	}
### 在加载图片的时候使用 

如果你使用过Picasso加载图片的话，那真是再好不活了，而且你会发现你也可以用相同的方法给ImageView增加一个扩展函数：  

	fun ImageView.loadUrl(url: String) 
	{
    	Picasso.with(context).load(url).into(this)
	}
然后我们在使用的时候只需这样简单的一行： 
 
	imageView.loadUrl(url)
## 属性的扩展  
扩展函数也可以是一个属性，所以我们可以通过相似的方法来扩展属性。我们知道Kotlin由于互操作性的特征已经提供了getter、setter这个属性，但是我们仍然通过下面的例子来展示一下使用自己的getter/setter生成一个属性的方式，因为这很有助于理解扩展属性背后的思想：  

	public var TextView.text: CharSequence
    get() = getText()
    set(v) = setText(v)
再比如：我们可以用次方法来设置View的padLeft属性：  

	// 使用扩展属性(extension property)
	var View.padLeft: Int
    set(value) 
	{
        setPadding(value, paddingTop, paddingRight, paddingBottom)
    }
    get() 
	{
        return paddingLeft
    }
有一点值得注意：由于扩展属性实际上不会向类中添加新的成员，因此无法让一个扩展拥有一个后端域变量，所以对于扩展属性不允许存在初始化器。扩展属性的行为只能通过明确给定的取值方法与设置方法来定义，也就意味着扩展属性只能被声明为val而不能被声明为var，如果强制声明为var，即使进行了初始化，在运行也会报异常错误，提示该属性没有后端域变量。  

## 扩展函数中的操作符 
通常来讲，我们不需要去扩展我们自己的类，但是我需要使用扩展函数扩展我们已经存在的类让第三方的库能提供更多的操作，比如我们可以去像访问List的方式去访问ViwGroup的view  

	operator fun ViewGroup.get(position: Int): View = getChildAt(position)  
于是我们就可以像这样非常简单地从一个viewgroup中通过position得到一个view：  

	val container: ViewGroup = find(R.id.container)
	val view = container[2]
# 可选参数和默认值  
聪明的你不知道有没有注意到刚才的那段代码中，Toast的第二个形参为什么一开始就赋予了一个默认值呢？其实这就涉及到了Kotlin中可选参数的概念。   

什么是可选参数呢？   
简而言之，就是我们在调用该函数的时候，对于该参数既可以传参也可以不传参，比如上文中的第二个参数。那么在不传参时，默认的参数自然就成了我们上下文代码中指明的Toast.LENGTH_SHORT   

所以说这样做的好处也是显而易见的，那就是借助于参数和构造函数的默认值，我们将不再需要进行函数重载了。只需要我们做一个函数的声明就可以满足我们几乎所有的需求。还是拿刚才的Toast来说事：   

	fun Activity.toast(message: CharSequence, duration: Int = Toast.LENGTH_SHORT)
	{
    	Toast.makeText(this, message, duration)
	}
第二个参数表示toast的显示持续时间，这就是一个我们刚刚说的可选参数，但是没有显示指定时，它将使用默认的Toast.LENGTH_SHORT这个值。因此，我们可以采用前面的两种方式来调用这个函数。   

	override fun onCreate(savedInstanceState: Bundle?) 
	{ 
	    super<BaseActivity>.onCreate(savedInstanceState)
	    toast("This is onCreate!!")
	    toast("Hello world!", Toast.LENGTH_LONG)
	}
再比如，我们可以采用这样的方式在Activity中支持lollipop动画

	inline public fun <reified T : Activity> Activity.navigate(
        id: String,
        sharedView: View? = null,
        transitionName: String? = null) {...}
所以我们就有了三种方式去调用这个函数，先看一下我们刚介绍过的前两种：   

	navigate<DetailActivity>("2")
	navigate<DetailActivity>("2", sharedView, TRANSITION_NAME)
而对于第三种方式，虽说在这种情况下意义不大，但却让我们知道了我们也是可以通过使用参数名字来决定哪个参数会被调用的：  

	navigate<DetailActivity>(id = "2", transitionName = TRANSITION_NAME)
所以，参数的默认值可以让我们只声明一个构造函数，当却会得到很多重载。  
除此之外，我们呢还可以扩展view的dp转换函数：   

	// 使用扩展函数
	fun View.dp_f(dp: Float): Float 
	{
    	// 引用View的context
    	return TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, dp, context.resources.displayMetrics)
	}
	// 转换Int
	fun View.dp_i(dp: Float): Int 
	{
    	return dp_f(dp).toInt()
	}
可以看到，扩展函数让我们在编写代码时省去了很多功夫。  

我们总结下Kotlin的三个特点：  

- Kotlin的扩展函数功能能试的我们可以为现有的类添加新的函数，实现某一具体功能。  
- 扩展函数是静态解析的，并未对原类添加函数或属性，对类本身没有任何影响。
- 扩展属性允许定义在类或者kotlin文件中，不允许定义在函数中。  

# Kotlin标准库扩展函数集合   

Kotlin标准库提供了一些扩展javahttp库的函数，我们接下来一一介绍下。    

## apply  
apply是Any的扩展函数，因而所有类型都能调用。   
apply接受一个lambda表达式作为参数，并在apply调用时立即执行，apply返回原来的对象。   
apply主要作用是将多个初始化代码链式操作，提高代码可读性。  

比如：   

	val task = Runnable { println("Running") }
    val thread = Thread(task)
    thread.setDaemon(true)
    thread.start()
上面这段代码可以简化为：   

	val task = Runnable { println("Running") }
	Thread(task).apply { setDaemon(true) }.start()
## let   
let和apply类似，唯一的不同是返回值，let返回的不是原来的对象，而是闭包里面的值。  

	val outputPath = Paths.get("/user/home").let 
	{
    	val path = it.resolve("output")
		path.toFile().createNewFile()
		path
	}
outputPath结果是闭包里面的path.  

## with  
with是一个顶级函数，当你想调用对象的多个方法但是不想重复对象引用，比如diamante：   

	val g2: Graphics2D = ...
	g2.stroke = BasicStroke(10F)
	g2.setRenderingHint(...)
	g2.background = Color.BLACK

可以用with这样写：  

	with(g2) 
	{
    	stroke = BasicStroke(10F)
    	setRenderingHint(...)
    	background = Color.BLACK
	}
## run   
run是with和let的组合，例如：  

	val outputPath = Paths.get("/user/home").run 
	{
    	val path = resolve("output")
    	path.toFile().createNewFile()
    	path
	}
## lazy  
lazy延迟运算，当第一次访问时，调用相应的初始化函数，例如：  

	fun readFromDb(): String = ...
	val lazyString = lazy { readFromDb() }
	val string = lazyString.value
当第一次使用lazySting时，lazy闭包会调用，它一般用在单利模式中。  
## user   
use用在java上的try-with-resources表达式上，例如：  

	val input = Files.newInputStream(Paths.get("input.txt"))
	val byte = input.use({ input.read() })
## repeat 
顾名思义，repeat就是重复的意思，它接受函数和整数作为参数，函数会被调用n次，这个函数避免写循环。  

	repeat(10, { println("Hello") })

## require/assert/check  
require/assert/check用来检测条件是否为true，否则抛出异常。其中require用在参数检查；而assert/check用在内部状态检查，assert抛出AssertionException，check抛出illegalStateException.
  
	fun neverEmpty(str: String) 
	{
    	require(str.length > 0, { "String should not be empty" })
    	println(str)
	}

# 用kotlin的扩展函数findViewOften丢掉Viewholder

## ViewHlder介绍
作为一名Android开发者，对ViewHolder应该再熟悉不过了。ViewHolder一开始并不是Android原生提供的(现在已经是RecycleView的默认实现了)，而是Google为了提高ListView的使用性能，为开发者提供的一种最佳实践。   

Google提供的ViewHolder的标准实现如下，熟悉者可以直接跳到下个部分ViewHolder的变种。  

	staticclassViewHolder
	{
    	TextView text;
    	TextView timestamp;
    	ImageView icon;
    	ProgressBar progress;
	}
在item第一次创建视图的时候，填充ViewHolder并且将其保存在视图中：  

	ViewHolder holder = newViewHolder();
	holder.icon = (ImageView) convertView.findViewById(R.id.listitem_image);
	holder.text = (TextView) convertView.findViewById(R.id.listitem_text);
	holder.timestamp = (TextView) convertView.findViewById(R.id.listitem_timestamp);
	holder.progress = (ProgressBar) convertView.findViewById(R.id.progress_spinner);
	convertView.setTag(holder);
这样在填充item数据的时候，直接使用ViewHolder对象的属性，这样可以减少在滚动ListView频繁调用findViewByid()而导致的性能问题。当然关于ListView性能优化的问题还有一些内容可以介绍，不过我们在这里不做展开。  
## ViewHolder的变种  
Google提供的ViewHolder的确能够提升List的使用效率，但是ViewHolder的实现相对繁琐，需要为每一种item定义一个ViewHolder，对代码书写和维护都是额外的开销。于是有人针对ViewHolder的实现做了一些优化，让ViewHolder写起来更方便。网上有很多种写法，下面提供一种最为简单优雅又高效的方式：  

	public class ViewHolder 
	{ 
		@SuppressWarnings("unchecked") 
		public static <T extends View> T get(View view, int id) 
		{ 
    		SparseArray<View> viewHolder = (SparseArray<View>) view.getTag(); 
    		if (viewHolder == null) 
			{ 
      			viewHolder = new SparseArray<View>(); 
      			view.setTag(viewHolder); 
    		} 
    		View childView = viewHolder.get(id); 
    		if(childView == null) 
			{ 
      			childView = view.findViewById(id); 
      			viewHolder.put(id, childView); 
    		} 
    		return (T) childView; 
		} 
	}
这里我们使用SparseArray映射每个视图id和对应的视图并将其保存在视图中，这样既保证在滚动过程中频繁回去视图的效率，使用起来也极其方便：  

	ImageView bananaView = ViewHolder.get(convertView, R.id.banana); 
	TextView phoneView = ViewHolder.get(convertView, R.id.phone); 
	BananaPhone bananaPhone = getItem(position); 
	phoneView.setText(bananaPhone.getPhone());
## Kotlin扩展函数findViewOften()
这里Kotlin实现ViewHolder的扩展函数和上面的变种使用的同一种思路，但得益于Kotlin语言提供的特性，实现和使用起来更加方便流畅，设置都感觉不到ViewHolder这种特殊机制的存在：  

	fun <T : View> View.findViewOften(viewId: Int): T 
	{
        var viewHolder: SparseArray<View> = tag as? SparseArray<View> ?: SparseArray()
        tag = viewHolder
        var childView: View? = viewHolder.get(viewId)
        if (null == childView) 
		{
            childView = findViewById(viewId)
            viewHolder.put(viewId, childView)
        }
        return childView as T
	}
这里了实现了一个View的扩展函数findViewOften(viewid:Int)意味着在需要频繁寻找一个视图的子视图的情况下使用，这样我们在item中就可以这样写了：  

	val subTitle: TextView = convertView.findViewOften(R.id.list_item_subtitle)
	subTitle.text = itemData.subTitle
由于Kotlin提供类型推断功能，所以findViewOften的返回值不用手动转换或者手动指定泛型类型。所以利用Kotlin的语言特性，为View扩展一个方法，从此再也不用繁琐的定义ViewHolder了，使用的时候也是如此的顺畅。  
## RecycleView中的ViewHolder  
最后，不得不提一下在RecycleView应该怎么办，因为在RecycleView的机制里面，在创建item的View的时候，必须创建一个Recycle.ViewHolder并且返回。对于我们上面那么完美的封装，Google这明显是在帮倒忙，还好这忙虽然帮倒了，不过还不至于无法挽回。  

如果大家在使用RecycleView还想使用文本提供的方法的话，可以参考下面的方式实现：提供一个RecycleView.ViewHolder默认实现类，该类提供了一个通过id获取视图的方法，在创建item的View的时候默认都返回这个类的实例。  


	class MyViewHolder(val convertView: View) : RecyclerView.ViewHolder(convertView) 
	{
        fun <T : View> findView(viewId: Int): T 
		{
        	return convertView.findViewOften(viewId)
    	}
	}
如果不想MyViewHolder的外部有不需要的依赖，可以将findViewOfter直接实现在MyViewHolder里面。

参考：   

[Kotlin 扩展函数详解与应用][1]


[1]: http://blog.csdn.net/comwill/article/details/77206508
