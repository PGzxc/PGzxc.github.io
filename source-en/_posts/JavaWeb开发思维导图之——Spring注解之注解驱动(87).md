---
title: JavaWeb开发思维导图之——Spring注解之注解驱动(87)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c0c83c5d
date: 2025-03-22 08:29:21
---
## 一 概述

* 注解驱动
* 常用注解

<!--more-->

## 二 内容详情

### 2.1 注解驱动

1-什么是注解驱动

```
1-注解驱动时使用注解的形式替代xml配置
2-将复杂的spring配置文件从工程中彻底消除掉，简化书写
```

2-注解驱动的弊端

```
1-为达成注解驱动的目的,可能将原来简单的书写变得复杂
2-xml中配置第三方开发的资源很方面，使用注解驱动会增加工作量
```

### 2.2 常用注解

#### 2.2.1 开启注解驱动

```
1-作用: 启动注解扫描，加载类中配置的注解项

2-配置: 
-1-格式: <context: component-scan base-package="packageName"/>
-2-示例: <context: component-scan base-package="com.example"/>

3-说明
-1-在进行包扫描时，会对配置的包及其子包中所有文件进行扫描
-2-扫描过程是以文件夹递归迭代的形式进行的
-3-扫描过程仅读取合法的java文件
-4-扫描过程仅读取spring可识别的注解
-5-扫描结束后将可能识别的有效注解转换为sprng对应的资源加入Ico容器

4-注意
-1-无论是注解格式还是xml配置格式，最终都是将资源加载到IoC容器中，差别仅仅是数据读取方式不同
2-从加载效率上来说，注解优于xml配置文件
```

#### 2.2.2 bean的定义

```
1-名称
-1-@Component
2-@Controller
-3-@Service
-4-@Repository

2-位置及类型: 
-类的上方，类注解

3-作用
-替代applicationContext中的<bean>标签方式
-设置该类为spring管理的bean

4-示例：@Component public class ClassName{}

5-说明
-@Controller、@Service、@Repository是@Component的衍生注解
-衍生注解的功能同@Component，可互换

6-相关属性：value(默认)，定义bean的访问id
```

#### 2.2.3 bean的作用域

```
1-名称: @Scope
2-位置及类型: 类的上方，类注解
3-作用: 设置该类作为bean对应的scope属性
4-示例：@Scope public class ClassName{}
5-相关属性：value(默认)，定义bean的作用域，默认为singleton
```

#### 2.2.4 bean的生命周期

```
1-名称: 
-1-@PostConstruct-对应init方法
-2-@PreDestroy-对应descroy方法

2-位置及类型: 类的上方，方法注解
3-作用: 设置该类作为bean对应的生命周期方法
4-示例：@PostConstruct public void init{}
```

#### 2.2.5 加载第三方资源

```
1-名称: @Bean
2-位置及类型: 方法定义上方，方法注解
3-作用: 设置该方法的返回值为spring管理的bean
4-示例：@Bean("dataSource") public DruidDataSource createDataSource(){}
5-说明：
-1-因为第三方bean无法在其源码上进行修改，使用@Bean解决第三方bean的引入问题
-2-该注解用于替代xml配置中的静态工厂与实例工厂创建bean，不区分方法是否为静态或非静态
-3-@Bean所在的类必须被spring扫描加载 ，否则该注解无效

6-相关属性：value(默认), 定义bean的访问id
```

#### 2.2.6 属性注解

1-bean的非引用类型属性注入

```
1-名称: @Value
2-位置: 属性定义上方，方法定义上方；
3-类型: 属性注解、方法注解
4-作用: 设置对应属性的值或对方法进行传参
5-示例：@Value("{jdbc.username}") private String username;
6-说明：
-1-value值仅支持非引用类型数据，赋值时对方法的所有参数全部赋值
-2-value值仅支持读取properties文件中的属性值, 通过类属性将properties中数据传入类中
-3-value值支持SpEL
-4-@value注解如果添加在属性上方, 可以省略set方法
7-相关属性：value(默认), 定义对应的属性值或参数值
```

2-bean的引用类型属性注入

```
1-名称: @Autowired、@Qualifier
2-位置: 属性定义上方，方法定义上方；
3-类型: 属性注解、方法注解
4-作用: 设置对应属性的值或对方法进行引用类型传参
5-示例:@Autowired(required=false) @Qualifier("userDao") private UserDao userDao;
6-说明:
-1-@Autowired默认按类型装配
-2-指定@Qualifier后可以指定自动装配的bean的id
7-相关属性:required: 定义该属性是否允许为null
```

3-bean的引用类型属性注入

```
1-名称: @Primary
2-位置: 类定义上方
3-类型: 类注解
4-作用: 设置类对应的bean按类型装配时优先装配
5-示例:@Primary public class ClassName{}
6-说明:
-1-@Autowired默认按类型装配, 当出现相同类型的bean，使用@Primary提高按类型自动装配的优先级
2-多个@Primary会导致优先级设置无效
```

4-bean的引用类型属性注入

```
1-名称:
-1-@Inject
-2-@Named
-3-@Resource

2-说明
-1-@Inject与@Named是JSR330规范中的注解，功能与@Autowired和@Qualifier相同，适用不同架构
-2-@Resource是JSR250规范中的注解，可以简化书写格式

3-Resource相关属性
-1-name: 设置注入的bean的id
-2-type: 设置注入的bean的类型，接收的参数为class类型
```

#### 2.2.7 加载properties文件

```
1-名称: @PropertySource
2-位置: 类定义上方
3-类型: 类注解
4-作用: 加载properties文件中的属性值
5-示例:@PropertySource(value="classpath:filename.properties")
6-说明:1-不支持*通配符，一旦加载，所有spring控制的bean中均可使用对应属性值
7-相关属性:
-1-value(默认): 设置加载的properties文件名
2-ignoreResourceNotFound: 如果资源未找到，是否忽略，默认为false
```

#### 2.2.8 纯注解格式

```
1-名称
-1-@Configuration
-2-ComponentScan

2-位置: 类定义上方
3-类型: 类注解
4-作用: 设置当前类为spring核心配置加载类
5-示例:@Configuration @ComponentScan("scanPackageName") public class clssName{}
6-说明:
-1-核心配置类用于替换spring核心配置文件，此类可以设置空的，不设置变量与属性
-2-bean扫描工作使用注解@ComponentScan替代
-3-加载纯注解格式上下文对象，使用AnnotationonfigApplicationContext
```

#### 2.2.9 第三方bean配置与管理

```
1-名称: @Import
2-类型: 类注解
3-位置: 类定义上方
5-示例:@Configuration @Import(OtherClassName.class) public class clssName{}
6-说明:
-1-@Import注解在同一个类上，仅允许添加一次，如需导入多个使用数组形式设定
-2-在被导入的类中可以继续使用@Import导入其他资源
-3-@Bean所在的类可以使用导入的形式进入spring容器，无需声明为bean
```



## 三 思维导图

![javaweb-xmind-spring-inject-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-spring-inject-6.png