---
title: Android开发之——手势识别
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 手势识别
abbrlink: b7e898af
date: 2018-01-09 17:16:01
---
# 前言
使用浏览器或者输入法应用时会有一些手势操作，还可以自定义手势。这些神奇的操作是怎么做的呢？这一篇重点记录手势的识别和创建。这篇的内容使用到了android.gesture包，具体的例子参考的是Sample中的GestureBuilder程序。 

# 手势识别的一般步骤

## 手势创建 
手势创建主要用到了GestureOverlayView和GestureLibrary。GestrueOverlayView的父类为android.widget.FrameLayout，是手势绘图区。GestureLibrary类主要对手势进行保存、删除等操作的，存放手势的仓库。下面给出创建手势的例子，如下图，可以定义如图手势打开csdn.net  
![][1]
### 创建绘图区

	GestureOverlayView overlay = (GestureOverlayView) findViewById(R.id.gestures_overlay);  
    overlay.setGestureStrokeType(GestureOverlayView.GESTURE_STROKE_TYPE_MULTIPLE);    
    overlay.setFadeOffset(2000);  //多笔画每两次的间隔时间  
    overlay.setGestureColor(Color.CYAN);//画笔颜色  
    overlay.setGestureStrokeWidth(6);//画笔粗细值   
    overlay.addOnGestureListener(new GesturesProcessor());  
### 监听绘制

	private class GesturesProcessor implements estureOverlayView.OnGestureListener 
	{  
       public void onGestureStarted(GestureOverlayView overlay, MotionEvent event) 
		{  
           mDoneButton.setEnabled(false);  
           mGesture = null;  
       	}  
       public void onGesture(GestureOverlayView overlay, MotionEvent event) {}  
  
       public void onGestureEnded(GestureOverlayView overlay, MotionEvent event) {  
           mGesture = overlay.getGesture();  
           if (mGesture.getLength() < LENGTH_THRESHOLD) {overlay.clear(false);}  
           mDoneButton.setEnabled(true);  
       }  
       public void onGestureCancelled(GestureOverlayView overlay, MotionEvent event) {}  
	}  
### 保存手势

	public void addGesture(View v) 
	{  
       if (mGesture != null) 
		{  
           final TextView input = (TextView) findViewById(R.id.gesture_name);  
           final CharSequence name = input.getText();  
           if (name.length() == 0) 
			{  
               input.setError(getString(R.string.error_missing_name));  
               return;  
        	}  
  
           /** 
            * 获取手势库 
            *   private final File mStoreFile = new File(Environment.getExternalStorageDirectory(), "gestures"); 
            *   GestureLibrary sStore = GestureLibraries.fromFile(mStoreFile); 
            *  
            */  
           final GestureLibrary store = GestureBuilderActivity.getStore();  
           store.addGesture(name.toString(), mGesture);  
           store.save();  
           setResult(RESULT_OK);  
           final String path = new File(Environment.getExternalStorageDirectory(),  
                   "gestures").getAbsolutePath();  
           Toast.makeText(this, getString(R.string.save_success, path), Toast.LENGTH_LONG).show();  
       } else {  
           setResult(RESULT_CANCELED);  
       }  
  
       finish();  
	}  
## 手势识别
手势识别也是经过创建绘图区、监听绘制、比对结果三个过程，这里直接给出代码。  

	public class GesturePerformedActivity extends Activity 
	{  
    private final File mStoreFile = new File(Environment.getExternalStorageDirectory(), "gestures");  
  
    // 手势库  
    GestureLibrary mGestureLib;  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        // TODO Auto-generated method stub  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.gesture_perform);  
        // 手势画板  
        GestureOverlayView gestures = (GestureOverlayView) findViewById(R.id.gestures_overlay);  
        gestures.setGestureStrokeType(GestureOverlayView.GESTURE_STROKE_TYPE_MULTIPLE);  
        gestures.setFadeOffset(2000); // 多笔画每两次的间隔时间  
        gestures.setGestureColor(Color.CYAN);// 画笔颜色  
        gestures.setGestureStrokeWidth(6);// 画笔粗细值  
  
        // 手势识别的监听器  
        gestures.addOnGesturePerformedListener(new GestureOverlayView.OnGesturePerformedListener() {  
            @Override  
            public void onGesturePerformed(GestureOverlayView overlay,  
                    Gesture gesture) {  
                // 从手势库中查询匹配的内容，匹配的结果可能包括多个相似的结果，匹配度高的结果放在最前面  
                ArrayList<Prediction> predictions = mGestureLib  
                        .recognize(gesture);      
                if (predictions.size() > 0) {  
                    Prediction prediction = (Prediction) predictions.get(0);  
                    // 匹配的手势  
                    if (prediction.score > 1.0) { // 越匹配score的值越大，最大为10  
                        Toast.makeText(GesturePerformedActivity.this,  
                                prediction.name, Toast.LENGTH_SHORT).show();  
                    }  
                }  
            }  
        });  
  
        if (mGestureLib == null) {  
            mGestureLib = GestureLibraries.fromFile(mStoreFile);  
            mGestureLib.load();  
        }  
    }  
  
	} 
# 效果
![][2] 
![][3]   

参考：  
[android手势创建及识别][4]   
[札记：android手势识别，MotionEvent][5]  
[Android-手势识别][6]



[1]: http://p0kng3270.bkt.clouddn.com/create-gesture
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gesture-draw.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gesture-sample.png
[4]: https://www.cnblogs.com/xyzlmn/p/3442241.html
[5]: https://www.cnblogs.com/everhad/p/6075716.html  
[6]: http://blog.csdn.net/LABLENET/article/details/48105089  

