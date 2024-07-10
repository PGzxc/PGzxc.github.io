---
title: IOS开发之——图片轮播器
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 7bc8347a
date: 2020-05-12 23:54:17
---
## 一 步骤
1. ScrollView getter方法懒加载只指定了大小，添加到视图
2. viewDidLoad中添加图像，并且计算位置
3. 运行观察效果，修改scrollView的属性.......
4. 实例化UIPageControl
5. 因为分页控件和滚动视图是分离的，因此监听滚动停止代理方法，修改分页控件的页数
6. 将UIPageControl定义成属性，并且添加监听方法
7. 实现监听方法，页数变化后，修改scrollView的位置
8. 添加时钟，调用分页控件的监听方法，实现图片自动轮播
<!--more-->

## 二 效果图
![][1]

## 三 代码

### 2.1 OC模式下(ViewController.m)

```
#import "ViewController.h"
#define KImageCount 5

@interface ViewController ()<UIScrollViewDelegate>
@property (nonatomic,strong) UIScrollView *scrollView;
@property (nonatomic,strong) UIPageControl *pageControl;
@property (nonatomic,strong) NSTimer *timer;

@end

@implementation ViewController

-(UIScrollView *)scrollView
{
    if(_scrollView==nil)
    {
        _scrollView=[[UIScrollView alloc]initWithFrame:CGRectMake(12, 20, 352, 180)];
        _scrollView.backgroundColor=[UIColor redColor];
        [self.view addSubview:_scrollView];
        self.scrollView.pagingEnabled=YES;//设置分页
        //取消滚动条
        self.scrollView.showsVerticalScrollIndicator=NO;
        self.scrollView.showsHorizontalScrollIndicator=NO;
        //取消弹簧效果
        self.scrollView.bounces=NO;
        self.scrollView.contentSize=CGSizeMake(KImageCount*_scrollView.bounds.size.width, 0);
        _scrollView.delegate=self;
        
    }
    return  _scrollView;
}

- (UIPageControl *)pageControl
{
    if(_pageControl==nil)
    {
        _pageControl=[[UIPageControl alloc]init];
        _pageControl.numberOfPages=KImageCount;
        CGSize size= [_pageControl sizeForNumberOfPages:KImageCount];
        _pageControl.bounds=CGRectMake(0, 0, size.width,size.height);
        _pageControl.center=CGPointMake(self.view.center.x, 170);
        _pageControl.pageIndicatorTintColor=[UIColor redColor];
        _pageControl.currentPageIndicatorTintColor=[UIColor greenColor];
        [self.view addSubview:_pageControl];
        [_pageControl addTarget:self action:@selector(pageChange:) forControlEvents:UIControlEventValueChanged];
    }
    return _pageControl;
}
//分页控件的监听
-(void)pageChange:(UIPageControl *)pageControl
{
    NSLog(@"%ld",pageControl.currentPage);
    CGFloat x=pageControl.currentPage*self.scrollView.bounds.size.width;
    [self.scrollView setContentOffset:CGPointMake(x, 0) animated: YES];
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //设置图片
    for (int i=0; i<KImageCount; i++) {
        
        NSString *imageName=[NSString stringWithFormat:@"img_%02d",i+1];
        UIImage *image=[UIImage imageNamed:imageName];
        UIImageView *imageView=[[UIImageView alloc]initWithFrame:self.scrollView.bounds];
        imageView.image=image;
        [self.scrollView addSubview:imageView];
    }
    //计算imageView的位置
    [self.scrollView.subviews enumerateObjectsUsingBlock:^(__kindof UIImageView * _Nonnull imageView, NSUInteger idx, BOOL * _Nonnull stop) {
        //调整x=>origin=>frame
        CGRect frame=imageView.frame;
        frame.origin.x=idx*frame.size.width;
        imageView.frame=frame;
    }];
    //NSLog(@"%@",self.scrollView.subviews);
    
    self.pageControl.currentPage=0;
    [self startTimer];
}
-(void)startTimer
{
    self.timer=[NSTimer timerWithTimeInterval:2.0 target:self selector:@selector(updateTimer) userInfo:nil repeats:YES];
    [[NSRunLoop currentRunLoop]addTimer:self.timer forMode:NSRunLoopCommonModes];
//     self.timer=[NSTimer scheduledTimerWithTimeInterval:2.0 target:self selector:@selector(updateTimer) userInfo:nil repeats:YES];
}
-(void)updateTimer
{
    int page=(self.pageControl.currentPage+1)%KImageCount;
    self.pageControl.currentPage=page;
    NSLog(@"%d",self.pageControl.currentPage);
    [self pageChange:self.pageControl];
}
- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    [self.timer invalidate];
}
- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    [self startTimer];
}
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    int page=scrollView.contentOffset.x/scrollView.bounds.size.width;
    self.pageControl.currentPage=page;
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-images-lunbo.gif