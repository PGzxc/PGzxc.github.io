---
title: IOS开发之——多线程-NSOperation(9)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 多线程
abbrlink: ddba6a48
date: 2022-02-27 11:59:44
---
## 一 概述

* NSOperation中的几个概念
* NSOperation示例

<!--more-->

## 二 NSOperation中的几个概念
### 2.1 NSOperation说明
#### NSOperation的作用

配合使用NSOperation和NSOperationQueue也能实现多线程编程

#### NSOperation和NSOperationQueue实现多线程的具体步骤

* 先将需要执行的操作封装到一个NSOperation对象中
* 然后将NSOperation对象添加到NSOperationQueue中
* 系统会自动将NSOperationQueue中的NSOperation取出来
* 将取出的NSOperation封装的操作放到一条新线程中执行

### 2.2 NSOperation的子类

NSOperation是个抽象类，并不具备封装操作的能力，必须使用它的子类，使用NSOperation子类的方式有3种：

* NSInvocationOperation
* NSBlockOperation
* 自定义子类继承NSOperation，实现内部相应的方法

### 2.3 NSOperationQueue

#### NSOperationQueue的作用

* NSOperation可以调用start方法类执行任务，但默认是同步执行的
* 如果将NSOperation添加到NSOperationQueue(操作队列)中，系统会自动异步执行NSOperation中的操作

#### 添加操作到NSOperationQueue中

```
-(void)addOperation:(NSOperation *)op;
-(void)addOperationWithBlock:(void (^)(void))block;
```

### 2.4 最大并发数

#### 什么是最大并发数

* 同时执行的任务数
* 比如，同时开3个线程执行3个任务，并发数就是3

#### 最大并发数的相关方法

```
-(NSInteger)maxConcurrentOperationCount;
-(void)setMaxConcurrentOperationCount:(NSInteger)cnt;
```

### 2.5 操作依赖

NSOperation之间可以设置依赖来保证执行顺序
比如一定要让操作A执行完后，才能执行操作B，可以这么写
```
[operationB addDependency:operationA];//操作B依赖于操作A
```
可以在不同queue的NSOperation之间创建依赖关系
![][1]

注意：不能相互依赖，比如A依赖B，B依赖A

### 2.6 操作的监听

可以监听一个操作的执行完毕

```()
-(void)(^)(void)completionBlock;
-(void)setCompletionBlock:(void)(^)(void)block;
```

### 2.7 队列的取消、暂停、恢复

#### 取消队列的所有操作

```
-(void)cancelAllOperations;
```

提示：也可以调用NSOperation的-(void)cancel方法取消单个操作

#### 暂停和恢复队列

```
-(void)setSuspended:(Bool)b;YES代表暂停队列，NO代表恢复队列
-(BOOL)isSuspended;
```

### 2.8 自定义NSOperation

#### 自定义NSOperation的步骤很简单

重写-(void)main方法，在里面实现想执行的任务

#### 重写-(void)main方法的注意点

* 自己创建自动释放(因为如果异步操作，无法访问主线程的自动释放池)
* 经常通过-(BOOL)isCancelled方法检测操作是否被取消，对取消作出响应

#### 自定义NSOperation下载图片思路

![][2]



## 三 NSOperation示例

### 3.1 NSInvocationOperation

```
#import "ViewController.h"
@interface ViewController ()
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];

    //operation直接调用start，是同步执行(在当前线程)
    NSInvocationOperation *operation=[[NSInvocationOperation alloc]initWithTarget:self selector:@selector(download) object:nil];
    //[operation start];
    //添加操作到队列中，会自动异步执行
    [queue addOperation:operation];
    
}
-(void)download{
    NSLog(@"download......%@",[NSThread currentThread]);
}
@end
```

### 3.2 NSBlockOperation示例

```
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSBlockOperation *operation1=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"---下载图片--1-%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operation2=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"---下载图片--1-%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operation3=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"---下载图片--1-%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operation4=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"---下载图片--1-%@",[NSThread currentThread]);
    }];
    //创建队列
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
    //主队列
    //NSOperationQueue *queue=[NSOperationQueue mainQueue];
    
    //添加操作到队列中(自动异步执行)
    [queue addOperation:operation1];
    [queue addOperation:operation2];
    [queue addOperation:operation3];
    [queue addOperation:operation4];
}
-(void)test{
    //    NSBlockOperation *operation=[NSBlockOperation blockOperationWithBlock:^{
    //        NSLog(@"---下载图片--1-%@",[NSThread currentThread]);
    //    }];
    
    NSBlockOperation *operation=[[NSBlockOperation alloc]init];
    [operation addExecutionBlock:^{
        NSLog(@"---下载图片--1-%@",[NSThread currentThread]);
    }];
    
    [operation addExecutionBlock:^{
        NSLog(@"---下载图片--2-%@",[NSThread currentThread]);
    }];
    [operation addExecutionBlock:^{
        NSLog(@"---下载图片--3-%@",[NSThread currentThread]);
    }];
    [operation start];
    //任务数量>1，才会开始异步执行。
}
@end
```

### 3.3 NSOperationQueue

```


@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
    [queue addOperationWithBlock:^{
        //1-异步下载图片
        NSURL *url = [NSURL URLWithString:@"https://img0.baidu.com/it/u=1929941019,3324507395&fm=253&fmt=auto&app=120&f=JPEG"];
        NSData *data = [NSData dataWithContentsOfURL:url];
        UIImage *image = [UIImage imageWithData:data];
        
        //2-回到主线程，显示图片
        //[self performSelectorOnMainThread:<#(nonnull SEL)#> withObject:<#(nullable id)#> waitUntilDone:dispath];
        //dispatch_async(dispatch_main(), <#^(void)block#>)
        
        [[NSOperationQueue mainQueue]addOperationWithBlock:^{
                    self.imageView.image=image;
                }];
        
    }];
    [queue cancelAllOperations];//取消队列中的所有任务(不可恢复)
    [queue setSuspended:YES];//暂停队列中的所有任务
    [queue setSuspended:NO];//恢复队列中的所有任务
    
}

-(void)addOperation3{
    //假设有A、B、C三个操作，要求：
    //1.3个操作都异步执行
    //2.操作C依赖于操作B
    //3.操作B依赖于操作A
    
    //1.创建一个队列(非主队列)
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
    //2.创建3个操作
    NSBlockOperation *operationA=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"A1----%@",[NSThread currentThread]);
    }];
//    [operationA addExecutionBlock:^{
//        NSLog(@"A2----%@",[NSThread currentThread]);
//        }];
//    [operationA setCompletionBlock:^{
//        NSLog(@"AAA----%@",[NSThread currentThread]);
//    }];
    NSBlockOperation *operationB=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"B----%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operationC=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"C----%@",[NSThread currentThread]);
    }];
    
    //设置依赖
    [operationB addDependency:operationA];
    [operationC addDependency:operationB];
    
    //添加操作到队列中(自动异步执行)
    [queue addOperation:operationA];
    [queue addOperation:operationB];
    [queue addOperation:operationC];
}
-(void)addOperationDepend{
    //假设有A、B、C三个操作，要求：
    //1.3个操作都异步执行
    //2.操作C依赖于操作B
    //3.操作B依赖于操作A
    
    //1.创建一个队列(非主队列)
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
    //2.创建3个操作
    NSBlockOperation *operationA=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"A----%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operationB=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"B----%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operationC=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"C----%@",[NSThread currentThread]);
    }];
    
    //设置依赖
    [operationB addDependency:operationA];
    [operationC addDependency:operationB];
    
    //添加操作到队列中(自动异步执行)
    [queue addOperation:operationA];
    [queue addOperation:operationB];
    [queue addOperation:operationC];
    
}
-(void)maxcount{
    //1-创建一个队列
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
    
    //2-设置最大并发数
    [queue setMaxConcurrentOperationCount:2];
    
    //3添加操作队列中(自动异步执行任务，并发)
    NSBlockOperation *operation1=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"下载图片1----%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operation2=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"下载图片2----%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operation3=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"下载图片3----%@",[NSThread currentThread]);
    }];
    NSBlockOperation *operation4=[NSBlockOperation blockOperationWithBlock:^{
        NSLog(@"下载图片4----%@",[NSThread currentThread]);
    }];
    
    [queue addOperation:operation1];
    [queue addOperation:operation2];
    [queue addOperation:operation3];
    [queue addOperation:operation4];
}
-(void)baseUse{
    //1-创建一个队列
    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
    
    //2添加操作队列中(自动异步执行任务，并发)
//    NSBlockOperation *operation1=[NSBlockOperation blockOperationWithBlock:^{
//        NSLog(@"下载图片1----%@",[NSThread currentThread]);
//    }];
//    NSBlockOperation *operation2=[NSBlockOperation blockOperationWithBlock:^{
//        NSLog(@"下载图片2----%@",[NSThread currentThread]);
//    }];
    
    //[queue addOperation:operation1];
    //[queue addOperation:operation2];
    
    [queue addOperationWithBlock:^{
        NSLog(@"下载图片3----%@",[NSThread currentThread]);
    }];
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-operation-dependency.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-operation-define-process.png