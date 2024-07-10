---
title: Android开发之——银联支付了解
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 银联支付
abbrlink: 658d86a6
date: 2018-05-23 18:29:55
---
# 前言
上一遍讲解了银联支付的入门和演示，这篇文章继续介绍银联支付中的一些关键点解析和注意事项，希望对在银联开发接入的你有所帮助。   


<!--more-->
# 银联支付接入流程 
## 第一步：申请入网
入网即签约，分银联官网注册和服务商注册两种；
入网分以下10步：    

1. 前期准备(网站、app、Wap页)
2. 注册登录
3. 选择产品(PC、手机、二维码等)
4. 选择收单机构
5. 上传入网资料
6. 银联/收单机构审核
7. 签订意向书
8. 技术开发
9. 测试（可选）
10. 入网成功


## 第二步：申请证书
开发者调用接口前需要先获取三个证书：签名证书、敏感信息加密证书、验签证书  

### 证书  
感觉签名证书和验证证书是一个东东(如放在assert中的data.bin),SDK包中的data.bin是测试使用的，正式的需要签约后，下载使用。使用SHA-256算法做摘要，然后做Base64编码便于传输，然后发起支付请求。  



## 第三步：集成并配置SDK
### 添加资源 
1. 将data.bin放到assets目录下
2. 将UPPayAssistEx.jar、UPPayPluginExPro.jar放到libs目录下
3. 将armeabi x86等放到libs目录下

### 添加权限 
具体参考示例提供 
### 支付过程分析 
#### 参数 
使用Map集合传递参数：  

Map<String, String>  contentData = new HashMap<String, String>();

##### 全渠参数

	contentData.put("version",  DemoBase.version);//版本号 全渠道默认值
	contentData.put("encoding",  DemoBase.encoding);//字符集编码 可以使用UTF-8,GBK两种方式
	contentData.put("signMethod",  SDKConfig.getConfig().getSignMethod());//签名方法
	contentData.put("txnType",  "01"); //交易类型 01:消费
	contentData.put("txnSubType",  "01");//交易子类 01：消费
	contentData.put("bizType",  "000201");//填写000201
	contentData.put("channelType",  "08");//渠道类型 08手机

##### 商户参数

	contentData.put("merId",  merId);//商户号码
	contentData.put("accessType",  "0");   //接入类型，商户接入填0 
	contentData.put("orderId",  orderId);   //商户订单号，8-40位数字字母
	contentData.put("txnTime",  txnTime);  //订单发送时间，取系统时间，格式为YYYYMMDDhhmmss
	contentData.put("accType",  "01");   //账号类型 01：银行卡02：存折03
	contentData.put("txnAmt",  txnAmt); //交易金额 单位为分，不能带小数点
	contentData.put("currencyCode",  "156"); //境内商户固定 156 人民币
##### 对请求参数进行签名
	Map<String, String>  reqData = AcpService.sig(contentData,DemoBase.encoding);
	String requestAppUrl =  SDKConfig.getConfig().getAppRequestUrl();  
##### 发送http post请求
	Map<String, String>  rspData = AcpService.post(reqData,requestAppUrl,DemoBase.encoding); 
##### 应答码处理
## Demo代码分析 
![][1]  
如上图所示，清单文件中除了必须的PayActivity和UPPayWapActivity，只有一个JARActivity入口,可知可能只有一个显示界面。   

分析后可知，5个java文件只用到了其中的2个，即BaseActivity和JARActivity
### 代码分析 

####  RSAUtil
加密解密工具类
#### EntryActivity
只有2个按钮，实现跳转功能
#### APKActivity
用于判断插件的安装
#### JARActivity
无实际功能
#### BaseActivity
Button——》开启一个线程，请求网络——》得到消息——》handle中处理——》判断逻辑(请求成功)——》启动支付插件——》onActivityResult(结果处理)



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/yinlian-demo-analysis.png