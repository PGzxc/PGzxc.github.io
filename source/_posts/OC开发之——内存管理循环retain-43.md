---
title: OC开发之——内存管理循环retain(43)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 2ef11330
date: 2020-04-14 23:32:54
---
## 一 使用场景

* 对于循环依赖关系来说，比方A类引用B类，同时B类也引用A类，这时代码编译会报错
* 当使用@class在两个类相互声明，就不会出现编译报错

<!--more-->

## 二 代码实例

### 2.1 Person类

```
//Person.h
#import <Foundation/Foundation.h>
@class Car;
@interface Person : NSObject
@property (nonatomic,retain) Car *car;
@end

//Person.m
#import "Person.h"
#import "Car.h"
@implementation Person
- (void)dealloc
{
    NSLog(@"Person被回收了");
    [_car release];
    [super dealloc];
}
@end
```

### 2.2 Car类

```
//Car.h
#import <Foundation/Foundation.h>
@class Person;
@interface Car : NSObject
@property (nonatomic,assign) Person *person;
@end

//Car.m
#import "Car.h"
#import "Person.h"
@implementation Car
-(void)dealloc
{
    NSLog(@"Car被回收了");
    [super dealloc];
}
@end
```

### 2.3 main.m

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Car.h"
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        Person *p=[[Person alloc]init];
        Car *c=[[Car alloc]init];
        
        p.car=c;
        c.person=p;
        
        [c release];
        [p release]; 
    }
    return 0;
}
```
### 2.4 用法概括

* 使用@class 类名;就可以引用一个类，说明一下它是一个类

## 三 总结
### 3.1 @class和#import区别

* \#import方式会包含被引用类的所有信息，包括被引用类的变量和方法；@class方式只是告诉编译器在A.h文件中B *b只是类的声明，具体这个类里有什么信息，这里不需要知道，等实现文件中真正要用到时，才会真正去查看B类中信息
* 如果有上百个头文件都\#import了同一个文件，或者这些文件依次被\#import，那么一旦最开始的头文件稍有改动，后面引用到这个文件的所有类都需要重新编译一遍，这样的效率也是可想而知的，而相对来说，使用@class方式就不会出现这种问题了。
* 在.m实现文件中，如果需要引用到被引用类的实体变量或者方法时，还需要使用\#import方式引入被引用类

### 3.2 循环retain

* 比如A对象retain了B对象，B对象retain了A对象
* 这样会导致A对象和B对象永远无法释放

### 3.3 解决方法

* 当两端相互引用时，应该一端用retain，一端用assign