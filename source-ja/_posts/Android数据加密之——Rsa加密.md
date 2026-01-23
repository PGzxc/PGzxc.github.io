---
title: Android数据加密之——Rsa加密
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Rsa加密
abbrlink: bd1a518b
date: 2018-03-30 23:06:20
---
注：本文为转载文章，原文请参考：[Android数据加密之Rsa加密][1] 

# 什么是Rsa加密？
RSA算法是最流行的公钥密码算法，使用长度可以变化的密钥。RSA是第一个既能用于数据加密也能用于数字签名的算法。

RSA算法原理如下：  

- 随机选择两个大质数p和q，p不等于q，计算N=pq； 
- 选择一个大于1小于N的自然数e，e必须与(p-1)(q-1)互素。
- 用公式计算出d：d×e = 1 (mod (p-1)(q-1)) 。
- 销毁p和q。

RSA的安全性依赖于大数分解，小于1024位的N已经被证明是不安全的，而且由于RSA算法进行的都是大数计算，使得RSA最快的情况也比DES慢上倍，这是RSA最大的缺陷，因此通常只能用于加密少量数据或者加密密钥，但RSA仍然不失为一种高强度的算法。

<!--more-->

# 该如何使用呢?
## 第一步：首先生成秘钥对
	
	/**
     * 随机生成RSA密钥对
     * @param keyLength 密钥长度，范围：512～2048
     *                  一般1024
     * @return
     */
    public static KeyPair generateRSAKeyPair(int keyLength) 
	{
        try 
		{
            KeyPairGenerator kpg = KeyPairGenerator.getInstance(RSA);
            kpg.initialize(keyLength);
            return kpg.genKeyPair();
        } catch (NoSuchAlgorithmException e) 
		{
            e.printStackTrace();
            return null;
        }
    }
## 具体加密实现：
### 公钥加密

	/**
     * 用公钥对字符串进行加密
     * @param data 原文
     */
    public static byte[] encryptByPublicKey(byte[] data, byte[] publicKey) throws Exception 
	{
        // 得到公钥
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKey);
        KeyFactory kf = KeyFactory.getInstance(RSA);
        PublicKey keyPublic = kf.generatePublic(keySpec);
        // 加密数据
        Cipher cp = Cipher.getInstance(ECB_PKCS1_PADDING);
        cp.init(Cipher.ENCRYPT_MODE, keyPublic);
        return cp.doFinal(data);
    }

### 私钥加密

 	/**
     * 私钥加密
     * @param data       待加密数据
     * @param privateKey 密钥
     * @return byte[] 加密数据
     */
    public static byte[] encryptByPrivateKey(byte[] data, byte[] privateKey) throws Exception 
	{
        // 得到私钥
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKey);
        KeyFactory kf = KeyFactory.getInstance(RSA);
        PrivateKey keyPrivate = kf.generatePrivate(keySpec);
        // 数据加密
        Cipher cipher = Cipher.getInstance(ECB_PKCS1_PADDING);
        cipher.init(Cipher.ENCRYPT_MODE, keyPrivate);
        return cipher.doFinal(data);
    }

### 公钥解密

	/**
     * 公钥解密
     * @param data      待解密数据
     * @param publicKey 密钥
     * @return byte[] 解密数据
     */
    public static byte[] decryptByPublicKey(byte[] data, byte[] publicKey) throws Exception 
	{
        // 得到公钥
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKey);
        KeyFactory kf = KeyFactory.getInstance(RSA);
        PublicKey keyPublic = kf.generatePublic(keySpec);
        // 数据解密
        Cipher cipher = Cipher.getInstance(ECB_PKCS1_PADDING);
        cipher.init(Cipher.DECRYPT_MODE, keyPublic);
        return cipher.doFinal(data);
    }
### 私钥解密

	/**
     * 使用私钥进行解密
     */
    public static byte[] decryptByPrivateKey(byte[] encrypted, byte[] privateKey) throws Exception 
	{
        // 得到私钥
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKey);
        KeyFactory kf = KeyFactory.getInstance(RSA);
        PrivateKey keyPrivate = kf.generatePrivate(keySpec);

        // 解密数据
        Cipher cp = Cipher.getInstance(ECB_PKCS1_PADDING);
        cp.init(Cipher.DECRYPT_MODE, keyPrivate);
        byte[] arr = cp.doFinal(encrypted);
        return arr;
    }
## 几个全局变量解说：

	public static final String RSA = "RSA";// 非对称加密密钥算法
    public static final String ECB_PKCS1_PADDING = "RSA/ECB/PKCS1Padding";//加密填充方式
    public static final int DEFAULT_KEY_SIZE = 2048;//秘钥默认长度
    public static final byte[] DEFAULT_SPLIT = "#PART#".getBytes();    // 当要加密的内容超过bufferSize，则采用partSplit进行分块加密
    public static final int DEFAULT_BUFFERSIZE = (DEFAULT_KEY_SIZE / 8) - 11;// 当前秘钥支持加密的最大字节数



[1]: http://www.cnblogs.com/whoislcj/p/5470095.html