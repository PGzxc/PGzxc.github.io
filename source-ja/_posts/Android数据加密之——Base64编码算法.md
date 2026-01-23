---
title: Android数据加密之——Base64编码算法
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Base64编码算法
abbrlink: caec65ac
date: 2018-03-30 17:13:33
---
注：本文为转载文章，原文请参考：[Android数据加密之Base64编码算法][1]  
# 前言：
前面学习总结了平时开发中遇见的各种数据加密方式，最终都会对加密后的二进制数据进行Base64编码，起到一种二次加密的效果，其实呢Base64从严格意义上来说的话不是一种加密算法，而是一种编码算法，为何要使用Base64编码呢？它解决了什么问题？这也是本文探讨的东西？  

<!--more-->

# 什么Base64算法？
Base64是网络上最常见的用于传输8Bit字节代码的编码方式之一，Base64并不是安全领域的加密算法，其实Base64只能算是一个编码算法，对数据内容进行编码来适合传输。标准Base64编码解码无需额外信息即完全可逆，即使你自己自定义字符集设计一种类Base64的编码方式用于数据加密，在多数场景下也较容易破解。Base64编码本质上是一种将二进制数据转成文本数据的方案。对于非二进制数据，是先将其转换成二进制形式，然后每连续6比特（2的6次方=64）计算其十进制值，根据该值在A--Z,a--z,0--9,+,/ 这64个字符中找到对应的字符，最终得到一个文本字符串。基本规则如下几点：  

- 标准Base64只有64个字符（英文大小写、数字和+、/）以及用作后缀等号；
- Base64是把3个字节变成4个可打印字符，所以Base64编码后的字符串一定能被4整除（不算用作后缀的等号）；
- 等号一定用作后缀，且数目一定是0个、1个或2个。这是因为如果原文长度不能被3整除，Base64要在后面添加\0凑齐3n位。为了正确还原，添加了几个\0就加上几个等号。显然添加等号的数目只能是0、1或2；
- 严格来说Base64不能算是一种加密，只能说是编码转换。

下图为Base64编码表：

![][2]  

# Base64编码的用处？
在计算机中任何数据都是按ascii码存储的，而ascii码的128～255之间的值是不可见字符。而在网络上交换数据时，比如说从A地传到B地，往往要经过多个路由设备，由于不同的设备对字符的处理方式有一些不同，这样那些不可见字符就有可能被处理错误，这是不利于传输的。所以就先把数据先做一个Base64编码，统统变成可见字符，这样出错的可能性就大降低了。 

# Base64具体实现
## 字符串进行Base64编码

	String encodedString = Base64.encodeToString("whoislcj".getBytes(), Base64.DEFAULT);
	Log.e("Base64", "Base64---->" + encodedString);
## 字符串进行Base64解码

	String decodedString =new String(Base64.decode(encodedString,Base64.DEFAULT));
	Log.e("Base64", "Base64---->" + decodedString);
## 对文件进行Base64编码

	File file = new File("/storage/emulated/0/pimsecure_debug.txt");
	FileInputStream inputFile = null;
	try 
	{
    	inputFile = new FileInputStream(file);
		byte[] buffer = new byte[(int) file.length()];
    	inputFile.read(buffer);
    	inputFile.close();
    	encodedString = Base64.encodeToString(buffer, Base64.DEFAULT);
    	Log.e("Base64", "Base64---->" + encodedString);
	} catch (Exception e) 
	{
    	e.printStackTrace();
	}
## 对文件进行Base64解码

	File desFile = new File("/storage/emulated/0/pimsecure_debug_1.txt");
	FileOutputStream  fos = null;
	try 
	{
    	byte[] decodeBytes = Base64.decode(encodedString.getBytes(), Base64.DEFAULT);
    	fos = new FileOutputStream(desFile);
    	fos.write(decodeBytes);
    	fos.close();
	} catch (Exception e) 
	{
    	e.printStackTrace();
	}
## 针对Base64.DEFAULT参数说明
无论是编码还是解码都会有一个参数Flags，Android提供了以下几种： 

- DEFAULT 这个参数是默认，使用默认的方法来加密
- NO_PADDING 这个参数是略去加密字符串最后的”=”
- NO_WRAP 这个参数意思是略去所有的换行符（设置后CRLF就没用了）
- CRLF 这个参数看起来比较眼熟，它就是Win风格的换行符，意思就是使用CR LF这一对作为一行的结尾而不是Unix风格的LF
- URL_SAFE 这个参数意思是加密时不使用对URL和文件名有特殊意义的字符来作为加密字符，具体就是以-和_取代+和/

# 总结：
Base64编码看似简单，但是其在实际开发中使用相当广泛。目前项目中只是用到这么多，以后用到更复杂的情况的时候再做补充。




[1]: http://www.cnblogs.com/whoislcj/p/5887859.html
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/base64.png

