---
title: Java开发之——Java8的新特性
categories:
  - 开发
  - A-基础语言
  - Java
tags:
  - Java8
abbrlink: f856f3b9
date: 2017-12-14 11:00:06
---
原文请参考[Java8的新特性][1]
# 序
本文主要讲Java8的新特性，Java8也是一个重要的版本，在语法层面有更大的改动，支持了lamda表达式，影响堪比Java5的泛型支持。   
# 特性列表

- lamda表达式(重磅)
- 集合的stream操作
- 提升HashMaps的性能
- Date-Time Package
- java.lang and java.util Packages
- Concurrency
<!--more-->
## lamda表达式(重磅)
 方法引用

	 /**
 	 * 静态方法引用：ClassName::methodName
 	 * 实例上的实例方法引用：instanceReference::methodName
 	 * 超类上的实例方法引用：super::methodName
 	 * 类型上的实例方法引用：ClassName::methodName
 	 * 构造方法引用：Class::new
 	 * 数组构造方法引用：TypeName[]::new
 	 */
	public class MethodReference
	 {
    	@Test
    	public void methodRef()
		  {
        	SampleData.getThreeArtists().stream()
                .map(Artist::getName)
                .forEach(System.out::println);
    	  }

   		 @Test
    	public void constructorRef()
		 {
       		ArtistFactory<Artist> af = Artist::new;
        	Artist a = af.create("patterncat","china");
        	System.out.println(a);
    	}
	 }
## 集合的stream操作

	/**
	 * 主要接口
 	* 1,predicate
 	* 2,Unary/BinaryOperator:传入参数和返回值必然是同一种数据类型
 	* 3,Int/Double/LongFunction/BiFunction:函数接口并不要求传入参数和返回值之间的数据类型必须一样
 	* 4,Int/Long/DoubleConsumer/BiConsumer:消费数据
 	* 5,Int/Long/DoubleSupplier:生产数据
 	*
 	* 主要方法:
 	* 1,filter
 	* 2,map
 	* 3,reduce
 	* 4,collect
 	* 5,peek
 	* -Djdk.internal.lambda.dumpProxyClasses
 	*/
	public class LamdaDemo 
	  {

   		 int[] arr = {4,12,1,3,5,7,9};

    	@Test
    	public void filter()
		  {
            Arrays.stream(arr).filter((x) -> x%2 !=0).forEach(System.out::println);
    	  }

    	@Test
    	public void map(){
        Arrays.stream(arr).map((x) -> x * x).forEach(System.out::println);
    	}

    	@Test
    	public void reduce(){
        Arrays.stream(arr).reduce((x,y) -> x+y).ifPresent(System.out::println);
        System.out.println(Arrays.stream(arr).reduce(-10, (x, y) -> x + y));
    	}

    	@Test
   		 public void collect(){
        List<Integer> list = Arrays.stream(arr).collect(ArrayList::new,ArrayList::add,ArrayList::addAll);
        System.out.println(list);

        Set<Integer> set = list.stream().collect(Collectors.toSet());
        System.out.println(set);

        Map<String,Artist> map = SampleData.getThreeArtists().stream()
                .collect(Collectors.toMap(a -> a.getName(),a -> a));
        System.out.println(map);
    	}

    	@Test
    	public void peek(){
        long count = Arrays.stream(arr).filter(x -> x > 2).peek(System.out::println).count();
        System.out.println(count);
   	 }

    	@Test
    	public void average(){
        Arrays.stream(arr).average().ifPresent(System.out::println);
    	}

    	@Test
    	public void sum(){
        System.out.println(Arrays.stream(arr).sum());
    	}

    	@Test
    	public void max(){
        Arrays.stream(arr).max().ifPresent(System.out::println);
    	}

   	 	@Test
    	public void min(){
        Arrays.stream(arr).min().ifPresent(System.out::println);
    	}

    	@Test
    	public void sorted(){
        Comparator<Artist> asc = (x,y) -> x.getName().compareTo(y.getName());
        SampleData.getThreeArtists().stream().sorted(asc).forEach(System.out::println);
        SampleData.getThreeArtists().stream().sorted(asc.reversed()).forEach(System.out::println);
        SampleData.getThreeArtists().stream().sorted(Comparator.comparing(Artist::getName)).forEach(System.out::println);
        SampleData.getThreeArtists().stream().sorted(Comparator.comparing(Artist::getName).reversed()).forEach(System.out::println);

        SampleData.getThreeArtists().stream().sorted(Comparator.comparing(Artist::getName).thenComparing(Artist::getNationality)).forEach(System.out::println);
    	}

    	@Test
    	public void groupBy(){
        Map<String,List<Artist>> rs = SampleData.getThreeArtists().stream().collect(Collectors.groupingBy(Artist::getNationality));
        System.out.println(rs);
    	}

   		 @Test
    	public void join(){
        String joinedNames = SampleData.getThreeArtists().stream().map(Artist::getName).collect(Collectors.joining(","));
        System.out.println(joinedNames);
        joinedNames.chars().mapToObj(c -> (char) Character.toUpperCase(c)).forEach(System.out::println);
    	}

    	@Test
    	public void flatMap(){
        Set<Artist> rs = SampleData.getThreeArtists().stream().flatMap(a -> a.getMembers()).collect(Collectors.toSet());
        rs.stream().forEach(System.out::println);
    	}

    	@Test
   	 	public void arrStream(){
        Arrays.stream(arr).forEach(System.out::println);
    	}

    	@Test
    	public void then(){
		//IntConsumer out = System.out::println;
		//IntConsumer err = System.err::println;
        IntConsumer out = (x) -> System.out.println("out consume:"+x);
        IntConsumer err = (x) -> System.err.println("err consume:"+x);
		//Arrays.stream(arr).forEach(out.andThen(err));
        Arrays.stream(arr).forEach(err.andThen(out));
    	}

    	@Test
    	public void foreach(){
        List<Integer> numbers = Arrays.asList(1,2,3,4,5,6);
        numbers.forEach(System.out::println);
   		 }

    	@Test
    	public void visitOuterVar(){
        final int num = 2;
        Function<Integer,Integer> fun = (from) -> from * num;
        System.out.println(fun.apply(3));
    	}
	}
## 提升HashMaps的性能
当hash冲突时，以前都是用链表存储，在java8里头，当节点个数>=TREEIFY_THRESHOLD - 1时，HashMap将采用红黑树存储，这样最坏的情况下即所有的key都Hash冲突，采用链表的话查找时间为O(n)，而采用红黑树为O(logn)。   
## Date-Time Package
Java 8新增了LocalDate和LocalTime接口，一方面把月份和星期都改成了enum防止出错，另一方面把LocalDate和LocalTime变成不可变类型，这样就线程安全了。   

	@Test
    public void today(){
        LocalDate today = LocalDate.now();
        System.out.println(today);
    }
    @Test
    public void parseString(){
        // 严格按照ISO yyyy-MM-dd验证，02写成2都不行，当然也有一个重载方法允许自己定义格式
        LocalDate date = LocalDate.parse("2016-02-05");
        System.out.println(date);
    }

    @Test
    public void calculate(){
        LocalDate today = LocalDate.now();
        LocalDate firstDayOfThisMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        System.out.println(firstDayOfThisMonth);

        // 取本月第2天：
        LocalDate secondDayOfThisMonth = today.withDayOfMonth(2);
        System.out.println(secondDayOfThisMonth);

        // 取本月最后一天，再也不用计算是28，29，30还是31：
        LocalDate lastDayOfThisMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        System.out.println(lastDayOfThisMonth);

        // 取下一天：
        LocalDate nextDay = lastDayOfThisMonth.plusDays(1);
        System.out.println(nextDay);

        // 取2015年1月第一个周一，这个计算用Calendar要死掉很多脑细胞：
        LocalDate firstMondayOf2015 = LocalDate.parse("2015-01-01").with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        System.out.println(firstMondayOf2015);
    }

    @Test
    public void getTime(){
        LocalTime now = LocalTime.now();
        System.out.println(now);
    }

    @Test
    public void getTimeWithoutMillis(){
        LocalTime now = LocalTime.now().withNano(0);
        System.out.println(now);
    }

    @Test
    public void parseTime(){
        LocalTime zero = LocalTime.of(0, 0, 0); // 00:00:00
        System.out.println(zero);

        LocalTime mid = LocalTime.parse("12:00:00"); // 12:00:00
        System.out.println(mid);
    }

## java.lang and java.util Packages
比如数组的并行排序   

	public class UtilDemo {
    int[] data = {4,12,1,3,5,7,9};
    @Test
    public void parallelSort(){
        Arrays.parallelSort(data);
        System.out.println(Arrays.toString(data));
    }

    @Test
    public void testCollectPrallel() {
        //[4, 16, 17, 20, 25, 32, 41]
        Arrays.parallelPrefix(data, Integer::sum);
        System.out.println(Arrays.toString(data));
    }
	}

比如文件遍历   

	@Test
    public void list() throws IOException {
        Files.list(Paths.get(".")).filter(Files::isDirectory).forEach(System.out::println);
    }

    @Test
    public void walk() throws IOException {
        Files.walk(Paths.get("."), FileVisitOption.FOLLOW_LINKS).forEach(System.out::println);
    }

## Concurrency

- StampedLock

		public class BankAccountWithStampedLock {

    	private final StampedLock lock = new StampedLock();
    	private double balance;

    	public void deposit(double amount) {
        long stamp = lock.writeLock();
        try {
            balance = balance + amount;
        } finally {
            lock.unlockWrite(stamp);
        }
    	}

    	public double getBalance() {
        long stamp = lock.readLock();
        try {
            return balance;
        } finally {
            lock.unlockRead(stamp);
        }
    	}
		}

测试  
 
		@Test
    	public void bench() throws InterruptedException {
        BankAccountWithStampedLock account = new BankAccountWithStampedLock();
        ExecutorService pool = Executors.newCachedThreadPool();
        List<Callable<Double>> callables = IntStream.range(1,5)
                .mapToObj(x -> (Callable<Double>) () -> {
		//                    if (x % 2 == 0) {
		//                        return account.getBalance();
		//                    } else {
		//                        account.deposit(x);
		//                        return 0d;
		//                    }
                    account.deposit(x);
                    return 0d;
                })
                .collect(Collectors.toList());
        pool.invokeAll(callables).forEach(x -> {
            try {
                System.out.println(x.get());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        });
        pool.shutdown();
        System.out.println(account.getBalance());
    }
- ConcurrentHashMap的stream支持


[1]: https://segmentfault.com/a/1190000004419611