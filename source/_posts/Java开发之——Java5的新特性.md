---
title: Java开发之——Java5的新特性
categories:
  - 开发
  - A-基础语言
  - Java
tags:
  - Java5
abbrlink: bf7a93c7
date: 2017-12-14 09:04:08
---
原文请参考：[Java5的新特性][1]
# 序
这是Java语言特性系列的第一篇，从java5的新特性开始讲起。初衷就是可以方便的查看语言的演进历史。   

# 特性列表 
- 泛型
- 枚举
- 装箱拆箱
- 变长参数
- 注解
- foreach循环
- 静态导入
- 格式化
- 线程框架/数据结构
- Arrays工具类/StringBuilder/instrument
<!--more-->
## 泛型
所谓类型擦除指的就是Java源码中的范型信息只允许停留在编译前期，而编译后的字节码文件中将不再保留任何的范型信息。也就是说，范型信息在编译时将会被全部删除，其中范型类型的类型参数则会被替换为Object类型，并在实际使用时强制转换为指定的目标数据类型。而C++中的模板则会在编译时将模板类型中的类型参数根据所传递的指定数据类型生成相对应的目标代码。
  
	Map<Integer, Integer> squares = new HashMap<Integer, Integer>();  

- 通配符类型：避免unchecked警告，问号表示任何类型都可以接受

		public void printList(List<?> list, PrintStream out) throws IOException
		 {
    	   for (Iterator<?> i = list.iterator(); i.hasNext(); ) 
			{
     	      out.println(i.next().toString());
    		}
  		 }
- 限制类型

		public static <A extends Number> double sum(Box<A> box1,Box<A> box2)
		{
    	  double total = 0;
    	  for (Iterator<A> i = box1.contents.iterator(); i.hasNext(); ) 
			{
      	      total = total + i.next().doubleValue();
    	    }
    	  for (Iterator<A> i = box2.contents.iterator(); i.hasNext(); ) 
			{
     	      total = total + i.next().doubleValue();
    	    }
   	 	     return total;
 	 	 }

## 枚举

- EnumMap

		public void testEnumMap(PrintStream out) throws IOException 
		 {
    	  // Create a map with the key and a String message
   		   EnumMap<AntStatus, String> antMessages =
       	   new EnumMap<AntStatus, String>(AntStatus.class);
      	   // Initialize the map
    		antMessages.put(AntStatus.INITIALIZING, "Initializing Ant...");
    		antMessages.put(AntStatus.COMPILING,    "Compiling Java classes...");
   		 	antMessages.put(AntStatus.COPYING,      "Copying files...");
    		antMessages.put(AntStatus.JARRING,      "JARring up files...");
    		antMessages.put(AntStatus.ZIPPING,      "ZIPping up files...");
    		antMessages.put(AntStatus.DONE,         "Build complete.");
    		antMessages.put(AntStatus.ERROR,        "Error occurred.");
    		// Iterate and print messages
    		for (AntStatus status : AntStatus.values() ) 
			 {
     	 	   out.println("For status " + status + ", message is: " +
                  antMessages.get(status));
    		 }
  		 }

- switch枚举

		public String getDescription() 
		{
    	  switch(this) 
			{
     	      case ROSEWOOD:      return "Rosewood back and sides";
      	  	  case MAHOGANY:      return "Mahogany back and sides";
      	      case ZIRICOTE:      return "Ziricote back and sides";
      	      case SPRUCE:        return "Sitka Spruce top";
      	      case CEDAR:         return "Wester Red Cedar top";
      	      case AB_ROSETTE:    return "Abalone rosette";
      	      case AB_TOP_BORDER: return "Abalone top border";
      	      case IL_DIAMONDS:   
        	    return "Diamonds and squares fretboard inlay";
     	      case IL_DOTS:
        	    return "Small dots fretboard inlay";
      	      default: return "Unknown feature";
    	   }
 	    }
## Autoboxing与Unboxing
将primitive类型转换成对应的wrapper类型：Boolean、Byte、Short、Character、Integer、Long、Float、Double   

	public static void m1(Integer i)
	{
       System.out.println("this is integer");
    }
    public static void m1(double d)
	{
       System.out.println("this is double");
    }
## vararg

	private String print(Object... values) 
	{
      StringBuilder sb = new StringBuilder();
      for (Object o : values) 
		{
          sb.append(o.toString())
          .append(" ");
    	}
     return sb.toString();
    }

## annotation
- Inherited表示该注解是否对类的子类继承的方法等起作用

		@Documented
		@Inherited
		@Retention(RetentionPolicy.RUNTIME)
		public @interface InProgress { }
- 指定Target

		@Documented
		@Retention(RetentionPolicy.RUNTIME)
		@Target({ElementType.TYPE,
         ElementType.METHOD, 
         ElementType.CONSTRUCTOR, 
         ElementType.ANNOTATION_TYPE})
		public @interface TODO 
		{ 
 		 String value();
		}
- Target类型

		public enum ElementType
		 {
   		 /** Class, interface (including annotation type), or enum declaration */
    	 TYPE,
    	 /** Field declaration (includes enum constants) */
    	 FIELD,
    	 /** Method declaration */
    	 METHOD,
    	 /** Parameter declaration */
    	 PARAMETER,
    	 /** Constructor declaration */
    	 CONSTRUCTOR,
    	 /** Local variable declaration */
    	 LOCAL_VARIABLE,
    	 /** Annotation type declaration */
    	 ANNOTATION_TYPE,
    	 /** Package declaration */
    	 PACKAGE
		}
- rentation表示annotation是否保留在编译过的class文件中还是在运行时可读。

		public enum RetentionPolicy 
		{
    	  /**
    	  * Annotations are to be discarded by the compiler.
    	  */
    	  SOURCE,
    	  /**
     	  * Annotations are to be recorded in the class file by the compiler
     	  * but need not be retained by the VM at run time.  This is the default
     	  * behavior.
     	  */
    	  CLASS,
    	  /**
    	   * Annotations are to be recorded in the class file by the compiler and
    	   * retained by the VM at run time, so they may be read reflectively.
     	   *
     	   * @see java.lang.reflect.AnnotatedElement
     	   */
   	 	   RUNTIME
		 }
- 通过反射获取元信息

		public class ReflectionTester 
		  {
		     public ReflectionTester(){}
  		     public void testAnnotationPresent(PrintStream out) throws IOException 
		  {
    		Class c = Super.class;
   			boolean inProgress = c.isAnnotationPresent(InProgress.class);
    		if (inProgress) 
			 {
      		    out.println("Super is In Progress");
    		 } else 
			 {
      		    out.println("Super is not In Progress");
     		 }
  		   }
  		 public void testInheritedAnnotation(PrintStream out) throws IOException
		 {
    		Class c = Sub.class;
    		boolean inProgress = c.isAnnotationPresent(InProgress.class);
   		    if (inProgress)
			 {
      		   out.println("Sub is In Progress");
    		 } else 
			 {
      			out.println("Sub is not In Progress");
    		 }
  		  }
  	     public void testGetAnnotation(PrintStream out) throws IOException,NoSuchMethodException 
		   {
    	     Class c = AnnotationTester.class;
    	     AnnotatedElement element = c.getMethod("calculateInterest", 
                                  float.class, float.class);
   		     GroupTODO groupTodo = element.getAnnotation(GroupTODO.class);
    	     String assignedTo = groupTodo.assignedTo();
    	     out.println("TODO Item on Annotation Tester is assigned to: '" + 
             assignedTo + "'");
  		    }
  		public void printAnnotations(AnnotatedElement e, PrintStream out)throws IOException 
		 {
            out.printf("Printing annotations for '%s'%n%n", e.toString());
    	    Annotation[] annotations = e.getAnnotations();
    	    for (Annotation a : annotations) 
		    {
             out.printf("    * Annotation '%s' found%n", a.annotationType().getName());
    	     }
  		  }
  	    public static void main(String[] args) 
	      {
             try 
		       {
      	           ReflectionTester tester = new ReflectionTester();
      			   tester.testAnnotationPresent(System.out);
     		   	   tester.testInheritedAnnotation(System.out);
     			   tester.testGetAnnotation(System.out);
      			   Class c = AnnotationTester.class;
      			   AnnotatedElement element = c.getMethod("calculateInterest", 
                                    float.class, float.class);      
      			   tester.printAnnotations(element, System.out);
        	   }catch (Exception e) 
				{
         			e.printStackTrace();
        		} 
      	  }
		 }

## for/in
for/in循环办不到的事情：

- 遍历同时获取index
- 集合逗号拼接时去掉最后一个
- 遍历的同时删除元素

## 静态import

	import static java.lang.System.err;
	import static java.lang.System.out;
	import java.io.IOException;
	import java.io.PrintStream;
	public class StaticImporter 
	  {
  		public static void writeError(PrintStream err, String msg) throws IOException 
			{
    			// Note that err in the parameter list overshadows the imported err
    			err.println(msg); 
  			}
 	public static void main(String[] args) 
	  {
        if (args.length < 2) 
		 {
      		err.println("Incorrect usage: java com.oreilly.tiger.ch08 [arg1] [arg2]");
     		 return;
    	}
    	out.println("Good morning, " + args[0]);
    	out.println("Have a " + args[1] + " day!");
    	try 
		{
          writeError(System.out, "Error occurred.");
    	} catch (IOException e) 
		{
      	  e.printStackTrace();
    	}
  		}
	}

## 格式化

	/**
 	* java.text.DateFormat
 	* java.text.SimpleDateFormat
 	* java.text.MessageFormat
 	* java.text.NumberFormat
 	* java.text.ChoiceFormat
 	* java.text.DecimalFormat
 	*/
	public class FormatTester 
	{
        public static void printf() 
			{
       		    //printf
        		String filename = "this is a file";
        	try {
           		    File file = new File(filename);
            	    FileReader fileReader = new FileReader(file);
            		BufferedReader reader = new BufferedReader(fileReader);
            		String line;
            		int i = 1;
            		while ((line = reader.readLine()) != null) 
						{
               			   System.out.printf("Line %d: %s%n", i++, line);
           				}
        		} catch (Exception e) 
				{
           			 System.err.printf("Unable to open file named '%s': %s",
                    filename, e.getMessage());
        		}
    		}
    	public static void stringFormat() 
			{
        		// Format a string containing a date.
        		Calendar c = new GregorianCalendar(1995, MAY, 23);
        		String s = String.format("Duke's Birthday: %1$tm %1$te,%1$tY", c);
        		// -> s == "Duke's Birthday: May 23, 1995"
        		System.out.println(s);
    		}
   	   public static void formatter() 
			{
       			 StringBuilder sb = new StringBuilder();
        		// Send all output to the Appendable object sb
        		Formatter formatter = new Formatter(sb, Locale.US);
        		// Explicit argument indices may be used to re-order output.
        		formatter.format("%4$2s %3$2s %2$2s %1$2s", "a", "b", "c", "d");
        		// -> " d  c  b  a"
        		// Optional locale as the first argument can be used to get
       		   // locale-specific formatting of numbers.  The precision and width can be
        		// given to round and align the value.
        		formatter.format(Locale.FRANCE, "e = %+10.4f", Math.E);
        		// -> "e =    +2,7183"
        		// The '(' numeric flag may be used to format negative numbers with
        		// parentheses rather than a minus sign.  Group separators are
       			 // automatically inserted.
        		formatter.format("Amount gained or lost since last statement: $ %(,.2f",
                6217.58);
        		// -> "Amount gained or lost since last statement: $ (6,217.58)"
   			 }
    	public static void messageFormat() 
			{
        		String msg = "欢迎光临，当前（{0}）等待的业务受理的顾客有{1}位，请排号办理业务！";
        		MessageFormat mf = new MessageFormat(msg);
        		String fmsg = mf.format(new Object[]{new Date(), 35});
        		System.out.println(fmsg);
    		}
   		 public static void dateFormat()
			{
       			String str = "2010-1-10 17:39:21";
        		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        		try
				 {
           			 System.out.println(format.format(format.parse(str)));
        		 } catch (ParseException e) 
				 {
            		// TODO Auto-generated catch block
            		e.printStackTrace();
       			 }
   			 }
    	public static void main(String[] args) 
			{
        		formatter();
        		stringFormat();
        		messageFormat();
        		dateFormat();
        		printf();
   			 }
	}

## threading
- uncaught exception

		public class BubbleSortThread extends Thread 
			{
 		 		private int[] numbers;
  				public BubbleSortThread(int[] numbers) 
					{
   		 				setName("Simple Thread");
    					setUncaughtExceptionHandler(
     					new SimpleThreadExceptionHandler());
    					this.numbers = numbers;
  			}
  		public void run() 
			{
    			int index = numbers.length;
    			boolean finished = false;
   				while (!finished) 
					{
      					index--;
      					finished = true;
      					for (int i=0; i<index; i++) 
							{
       						 	// Create error condition
        						if (numbers[i+1] < 0) 
									{
          								throw new IllegalArgumentException(
            					"Cannot pass negative numbers into this thread!");
       						 }
       						 if (numbers[i] > numbers[i+1]) 
								{
         							// swap
         					 		int temp = numbers[i];
         					 		numbers[i] = numbers[i+1];
         							numbers[i+1] = temp;
          					 		finished = false;
       							 }
      				}
    		}    
  		 }
		 }
	 	class SimpleThreadExceptionHandler implements
    	Thread.UncaughtExceptionHandler 
		{
 			 public void uncaughtException(Thread t, Throwable e)
				 {
    			 	System.err.printf("%s: %s at line %d of %s%n",
        			t.getName(), 
       				e.toString(),
        		    e.getStackTrace()[0].getLineNumber(),
        			e.getStackTrace()[0].getFileName());
  				 }
		}

- blocking queue

		public class Producer extends Thread 
			{
  				private BlockingQueue q;
  				private PrintStream out;
  			    public Producer(BlockingQueue q, PrintStream out) 
				 {
    				setName("Producer");
    				this.q = q;
    				this.out = out;
 				 }
 				public void run() 
					{
   					 	 try 
							{
     					        while (true) {
        				 		q.put(produce());
     						}
    				} catch (InterruptedException e) 
					{
      					out.printf("%s interrupted: %s", getName(), e.getMessage());
    				}
  			}
  		private String produce() 
			{
   				while (true)
				 {
     				 double r = Math.random();
      				// Only goes forward 1/10 of the time
      				if ((r*100) < 10) 
						{
       						 String s = String.format("Inserted at %tc", new Date());
        				return s;
     			        }
    			}
 			 }
		}

- 线程池

	著名的JUC类库。

	- 每次提交任务时，如果线程数还没达到coreSize就创建新线程并绑定该任务。 所以第coreSize次提交任务后线程总数必达到coreSize，不会重用之前的空闲线程。
	- 程数达到coreSize后，新增的任务就放到工作队列里，而线程池里的线程则努力的使用take()从工作队列里拉活来干。
	- 如果队列是个有界队列，又如果线程池里的线程不能及时将任务取走，工作队列可能会满掉，插入任务就会失败，此时线程池就会紧急的再创建新的临时线程来补救。
	- 临时线程使用poll(keepAliveTime，timeUnit)来从工作队列拉活，如果时候到了仍然两手空空没拉到活，表明它太闲了，就会被解雇掉。
	- 如果core线程数＋临时线程数 >maxSize，则不能再创建新的临时线程了，转头执行RejectExecutionHanlder。默认的AbortPolicy抛RejectedExecutionException异常，其他选择包括静默放弃当前任务(Discard)，放弃工作队列里最老的任务(DisacardOldest)，或由主线程来直接执行(CallerRuns)，或你自己发挥想象力写的一个。

## 其他

- Arrays

Arrays.sort(myArray);
Arrays.toString(myArray)
Arrays.binarySearch(myArray, 98)
Arrays.deepToString(ticTacToe)
Arrays.deepEquals(ticTacToe, ticTacToe3)

- Queue

避开集合的add/remove操作，使用offer、poll操作（不抛异常）    
Queue q = new LinkedList(); 采用它来实现queue     

-  Override返回类型   
  支持协变返回
- 单线程StringBuilder   
线程不安全，在单线程下替换string buffer提高性能  
- java.lang.instrument








[1]: https://segmentfault.com/a/1190000004417288#articleHeader1