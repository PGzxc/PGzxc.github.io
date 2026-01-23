---
title: Android开发之——Lottie动画
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Lottie动画
abbrlink: d9faa022
date: 2017-12-26 09:37:47
---
## 一 简介
Lottie是Airbnb开源的一个面向IOS、Android、React Native的动画库，能分析Adobe After Effects导出的动画，并且能让原生App像使用静态素材一样使用这些动画，完美实现动画效果。 

现在使用各个平台的native代码实现一套复杂的动画是一件很困难并且耗时的事，我们需要为不同尺寸的屏幕加载不同的材料资源，还需要写大量难维护的代码，而Lottie可以做到同一个动画文件在不同平台上实现相同的效果，极大减少开发时间，实现不同的动画，只需要设置不同的动画文件即可极大减少开发和维护成本。  
<!--more-->

官方效果图：  
![lottie][1]
![lottie2][2]
## 二 如何使用
Lottie支持多个平台，使用同一个JSON动画文件，可在不同平台实现相同的效果。  
Android通过Airbnb开源项目lottie-android实现，最低支持API 16;  
IOS通过Airbnb的开源项目lottie-ios实现，最低支持IOS7
React Native通过Airbnb的开源项目lottie-react-native实现  
![][3]
这是React logo的动画，以下是以Android平台为例如何使用Lottie  
### 2.1 下载Lottie
在项目build.gradle文件添加依赖

```
dependencies 
{  
	compile 'com.airbnb.android:lottie:2.1.0'
}
```

### 2.2 添加Adobe After Effects导出的动画文件  
Lottie默认读取Assets中的文件，我们需要把动画文件react.json保存在app/src/main/assets文件里。(文件比较大，只展示了部分内容，文件链接)

```
{
	"v": "4.6.0", 
	"fr": 29.9700012207031, 
	"ip": 0, 
	"op": 141.000005743048, 
	"w": 800, 
	"h": 800, 
	"ddd": 0, 
	"assets": [ ], 
	"layers": [
    	{
        	"ddd": 0, 
        	"ind": 0, 
        	"ty": 4, 
        	"nm": "center_circle", 
        	"ks": {...}, 
        	"ao": 0, 
        	"shapes": [...], 
        	"ip": 0, 
        	"op": 900.000036657751, 
        	"st": 0, 
        	"bm": 0, 
        	"sr": 1
    	}, 
    	{...}, 
    	{...}, 
    	{...}
	]
}  
```

### 2.3 使用Lottie  
在布局文件中直接添加Lottie的LottieAnimationView控件，即可在界面显示React logo动画效果

```
<com.airbnb.lottie.LottieAnimationView
    android:id="@+id/animation_view"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:lottie_fileName="react.json"
    app:lottie_loop="true"
    app:lottie_autoPlay="true" />
```

### 2.4 引入Lottie影响
- 兼容性
Lottie 最低支持版本API 16，低版本系统需要做降级动画或者不展示动画
- 安装包    
![][4]
这是用全民K歌release包的测试数据，lottie本身方法数不小，有方法数超标和安装包过大的风险，业务可自行评估    
注：LottieAnimationView继承于V7的AppCompatImageView，需要引入V7兼容包，根据业务需要，可以源码引入Lottie，让LottieAnimationView继承与ImageView，就不用引入V7兼容包，可减少安装包大小。 

## 三 使用小技巧 
### 3.1 加载SDCard动画文件
```
StringBuilder stringBuilder = new StringBuilder();
BufferedReader bufferedReader = new BufferedReader(new FileReader(new File(JSON_PATH + "react.json")));
String content = null;
while ((content = bufferedReader.readLine()) != null)
{
	stringBuilder.append(content);
}
JSONObject jsonObject = new JSONObject(stringBuilder.toString());
animationView.setAnimation(jsonObject);
animationView.loop(true);
animationView.playAnimation();
```

### 3.2 加载SDCard图片
```
animationView.setImageAssetDelegate(new ImageAssetDelegate() 
{
	@Override
	public Bitmap fetchBitmap(LottieImageAsset asset) 	{
    	try {
        	FileInputStream fileInputStream = new FileInputStream(IMAGE_PATH + asset.getFileName());
        	return BitmapFactory.decodeStream(fileInputStream);  ///把流转化为Bitmap图片
    		} catch (Exception e) 
			{
       			 Log.e(TAG, "", e);
    		}
    		return null;
		}
});
```

### 3.3  加载SDCard字体
```
animationView.setFontAssetDelegate(new FontAssetDelegate()
{
	public Typeface fetchFont(String fontFamily) 
	{
    	Typeface customFont = Typeface.createFromFile(FONT_PATH + fontFamily);
    	return customFont;
	}
});
```

### 3.4 缓存动画

Lottie内部有两个缓存map（强引用缓存，弱引用缓存），在动画文件加载完成后会根据设置的缓存策略缓存动画，方便下次使用。

```
animationView.setAnimation(animation, LottieAnimationView.CacheStrategy.Strong);    //强缓存
animationView.setAnimation(animation, LottieAnimationView.CacheStrategy.Weak);      //弱缓存
```

### 3.5  Lottie实现原理
![lottie-原理][5]
设计师把一张复杂的图片使用多个图层来表示，每个图层展示一部分内容，图层中的内容也可以拆分为多个元素。拆分元素之后，根据动画需求，可以单独对图层或者图层中的元素做平移，旋转、收缩等动画。  

Lottie的使用的资源是需要先通过bodymovin(bodymovin插件本身是用于网页上呈现各种AE效果的一个开源库)将Adobe After Effects(AE)生成的aep动画工程文件转换为通用的json格式描述文件。Lottie则负责解析动画的数据，计算每个动画在某个时间点的状态，准确地绘制到屏幕上。   

导出的json动画描述文件：

```
{
	"v": "4.6.0", 
	"fr": 29.9700012207031, 
	"ip": 0, 
	"op": 141.000005743048, 
	"w": 800, 
	"h": 800, 
	"ddd": 0, 
	"assets": [ ], 
	"layers": [
    	{...}, 
	]
} 
```

Lottie主要类图：  
![][6]
Lottie对外通过控件LottieAnimationView暴露接口，控制动画

LottieAnimationView继承自ImageView，通过当前时间绘制canvas显示到界面上。这里有两个关键类：  
LottieComposition负责解析json描述文件，把json内容转成java数据对象；  
LottieDrawable负责绘制，把LottieComposition转成的数据对象绘制成drawable显示到View上。顺序如下：   
![][7]
#### json文件解析
LottieComposition负责解析json文件，建立数据到java对象的映射关系。   
##### 解析json外部结构
LottieComposition封装了动画的信息，包括动画大小，动画时长，帧率，用到的图片，字体，图层等等  
json外部结构 

```
{
    "v": "4.6.0",               //bodymovin的版本
    "fr": 29.9700012207031,     //帧率
    "ip": 0,                    //起始关键帧
    "op": 141.000005743048,     //结束关键帧
    "w": 800,                   //动画宽度
    "h": 800,                   //动画高度
    "ddd": 0, 
    "assets": [...]             //资源信息
    "layers": [...]             //图层信息
}

//解析json的源码
static LottieComposition fromJsonSync(Resources res, JSONObject json) {
  Rect bounds = null;
  float scale = res.getDisplayMetrics().density;
  int width = json.optInt("w", -1);
  int height = json.optInt("h", -1);

  if (width != -1 && height != -1) {
    int scaledWidth = (int) (width * scale);
    int scaledHeight = (int) (height * scale);
    bounds = new Rect(0, 0, scaledWidth, scaledHeight);
  }

  long startFrame = json.optLong("ip", 0);
  long endFrame = json.optLong("op", 0);
  float frameRate = (float) json.optDouble("fr", 0);
  String version = json.optString("v");
  String[] versions = version.split("[.]");
  int major = Integer.parseInt(versions[0]);
  int minor = Integer.parseInt(versions[1]);
  int patch = Integer.parseInt(versions[2]);
  LottieComposition composition = new LottieComposition(
      bounds, startFrame, endFrame, frameRate, scale, major, minor, patch);
  JSONArray assetsJson = json.optJSONArray("assets");
  parseImages(assetsJson, composition); //解析图片
  parsePrecomps(assetsJson, composition);
  parseFonts(json.optJSONObject("fonts"), composition); //解析字体
  parseChars(json.optJSONArray("chars"), composition);  //解析字符
  parseLayers(json, composition);   //解析图层
  return composition;
}
```

##### 解析图片资源 
LottieImageAsset类封装图片信息

```
"assets": [                 //资源信息
	{                       //第一张图片
    	"id": "image_0",    //图片id
    	"w": 58,            //图片宽度
    	"h": 31,            //图片高度
    	"u": "images/",     //图片路径
    	"p": "img_0.png"    //图片名称
	},
	{...}                   //第n张图片
]
static LottieImageAsset newInstance(JSONObject imageJson) 
{
	return new LottieImageAsset(imageJson.optInt("w"), imageJson.optInt("h"), imageJson.optString("id"),
      imageJson.optString("p"));
}
```

##### 解析图层
Layer封装图层信息，现在lottie只支持PreComp，Solid，Image，Null，Shape，Text这6中图层。

```
"layers": [                 //图层信息
	{                       //第一层动画
    	"ddd": 0, 
    	"ind": 0,           //layer id 图层 id
    	"ty": 4,            //图层类型
    	"nm": "center_circle", 
    	"ks": {...},        //动画
    	"ao": 0, 
    	"shapes": [...], 
    	"ip": 0,            //inFrame 该图层起始关键帧
    	"op": 90,           //outFrame 该图层结束关键帧
    	"st": 0,            //startFrame 开始
    	"bm": 0, 
    	"sr": 1
	}, 
	{...}                   //第n层动画
]	
```

#### 如何动起来
![][8]
利用属性动画控制进度，每次进度改变通知到每一层，触发LottieAnimationView重绘。

##### 利用属性动画计算进度
这里用到了属性动画来产生一个0～1的插值，根据不同的插值来设置当前动画进度。  
代码如下： 

```
public LottieDrawable() {
animator.setRepeatCount(0);
animator.setInterpolator(new LinearInterpolator());
animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
    @Override
    public void onAnimationUpdate(ValueAnimator animation) {
        if (systemAnimationsAreDisabled) {
            animator.cancel();
            setProgress(1f);
        } else {
            setProgress((float) animation.getAnimatedValue());
        }
    }
});
}
```

##### 通过CompositionLayer把进度传递到各个图层
```
@Override
public void setProgress(@FloatRange(from = 0f, to = 1f) float progress) {
    super.setProgress(progress);
    if (timeRemapping != null) {
        long duration = lottieDrawable.getComposition().getDuration();
    	long remappedTime = (long) (timeRemapping.getValue() * 1000);
    	progress = remappedTime / (float) duration;
	}
	if (layerModel.getTimeStretch() != 0) {
    	progress /= layerModel.getTimeStretch();
	}
	progress -= layerModel.getStartProgress();
	for (int i = layers.size() - 1; i >= 0; i--) {
    layers.get(i).setProgress(progress);
	}
}
```

##### 通知进度改变
```
void setProgress(@FloatRange(from = 0f, to = 1f) float 	progress) {
    if (progress < getStartDelayProgress()) {
      progress = 0f;
    } else if (progress > getEndProgress()) {
      progress = 1f;
    }

    if (progress == this.progress) {
      return;
    }
    this.progress = progress;

    for (int i = 0; i < listeners.size(); i++) {
      listeners.get(i).onValueChanged();
    }
  }
```

##### 最终回调到LottieAnimationView的invalidateDrawable
```
@Override
public void invalidateDrawable(@NonNull Drawable dr) {
    if (getDrawable() == lottieDrawable) {
      // We always want to invalidate the root drawable so it redraws the whole drawable.
  	// Eventually it would be great to be able to invalidate just the changed region.
    	super.invalidateDrawable(lottieDrawable);
	} else {
  	// Otherwise work as regular ImageView
    	super.invalidateDrawable(dr);
	}
}
```

##### 最后触发LottieDrawable重绘
```
@Override
public void draw(@NonNull Canvas canvas) {
 ...
	matrix.reset();
	matrix.preScale(scale, scale);
	compositionLayer.draw(canvas, matrix, alpha);   //这里会调用所有layer的绘制方法
	if (hasExtraScale) {
    	canvas.restore();
	}
}
```

## 四 性能
### 4.1 官方说明
如果没有mask和mattes，那么性能和内存非常好，没有bitmap创建，大部分操作都是简单的cavas绘制。

如果存在mattes，将会创建2～3个bitmap。bitmap在动画加载到window时被创建，被window删除时回收。所以不宜在RecyclerView中使用包涵mattes或者mask的动画，否则会引起bitmap抖动。除了内存抖动，mattes和mask中必要的bitmap.eraseColor()和canvas.drawBitmap()也会降低动画性能。对于简单的动画，在实际使用时性能不太明显。

如果在列表中使用动画，推荐使用缓存LottieAnimationView.setAnimation(String, CacheStrategy) 。
### 4.2 属性动画和Lottie动画对比
Lottie动画在未开启硬件加速的情况下，帧率、内存，CPU都比属性动画差，开启硬件加速后，性能差不多。
### 4.3 未开启硬件加速，Lottie动画大小帧率对比
主要耗时在draw方法，绘制区域越小，耗时越小  

# 五 参考：  
[Lottie : 让动画如此简单][9]   
[GitHub - airbnb/lottie-android: Render After Effects animations natively on Android and iOS][10]   
[Lottie的使用及原理浅析 - 彩笔学长 - CSDN博客][11]    






[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie_sample_1.gif
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie_sample_2.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie-react-native.gif
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie-before-after.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie-yuanli.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie-leitu.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie-anim-sunxu.jpg
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lottie-move.jpg
[9]: https://www.qcloud.com/community/article/494397
[10]: https://github.com/airbnb/lottie-android
[11]: http://blog.csdn.net/XSF50717/article/details/55121478
