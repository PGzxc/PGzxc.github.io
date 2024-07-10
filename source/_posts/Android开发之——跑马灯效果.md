---
title: Android开发之——跑马灯效果
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 跑马灯
abbrlink: 91b0c8ff
date: 2018-03-29 22:26:54
---
# 前言 
在看商城类的项目时，如淘宝头条，京东头条，经常会看到跑马灯效果，上下轮播显示热门商品！ 
![][1]  
<!--more--> 

# 跑马灯效果 
实现跑马灯效果，我们可以借助于第三方和自己实现两种方式，下面我们将介绍一下：  
## 借助于第三方提供 
### MarqueeView

- 项目地址：   
		[MarqueeView][2]
- 使用方式：   
	![][3]  
### XMarqueeView

- 项目地址：  
	[XMarqueeView][4]
- 使用方式 
	![][5]  

## 自己实现  
本文的跑马灯是借助于ViewFlipper实现的
### ViewFlipper
将两个或更多的子view添加到它上面，每次只显示一个子view，按照周期依次显示子view(个人翻译)原文请参考： 

![][6]  

### 自定义view
	class NewsFlipperView @JvmOverloads constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0) : FrameLayout(context, attrs, defStyleAttr) {
    private val mFlipperView: ViewFlipper

    init 
	{
        val rootView = View.inflate(context, R.layout.layout_news_flipper, null)
        mFlipperView = rootView.find(R.id.mFlipperView)
        mFlipperView.setInAnimation(context, R.anim.news_bottom_in)
        mFlipperView.setOutAnimation(context, R.anim.news_bottom_out)
        addView(rootView)
    }


    /*
        构建公告
     */
    private fun buildNewsView(text: String): View 
	{
        val textView = TextView(context)
        textView.text = text
        textView.textSize = px2sp(dimen(R.dimen.text_small_size))
        textView.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
        return textView
    }

    	/*
       	 设置公告数据
     	*/
    	fun setData(data: Array<String>) 
		{
        	for (text in data) 
			{
          		var view=  buildNewsView(text)
            	mFlipperView.addView(view)
           		view.setOnClickListener({ _ ->
               	mOnItemClickListener!!.onItemClick( text)
                	})

        	}
        	mFlipperView.startFlipping()
    	}
    	private var mOnItemClickListener: OnItemClickListener<String>? = null
    	interface OnItemClickListener<in String> 
		{
        	fun onItemClick(data: String)
    	}
	
    	fun <T> setOnItemClickListener(listener: OnItemClickListener<String>) 
		{
        	mOnItemClickListener = listener
    	}
	}

### 使用自定义view
		mNewsFlipperView.setData(arrayOf("小米MIX2发布","抢眼Couple装，点亮情人节"))
        mNewsFlipperView.setOnItemClickListener<String>(object : NewsFlipperView.OnItemClickListener<String> {
            override fun onItemClick( data: String) {
                toast(data)
            }

        })
### 效果 
![][7]  
# 其他 
参考：[Github下载][8]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-marqueeview.gif  
[2]: https://github.com/sfsheng0322/MarqueeView
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/marqueeview-use.png
[4]: https://github.com/xiaohaibin/XMarqueeView
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/xmarqueeview-use.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/viewfilpper.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/viewflipper.gif
[8]: https://github.com/PGzxc/ViewFlipper

