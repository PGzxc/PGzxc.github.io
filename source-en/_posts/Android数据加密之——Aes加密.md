---
title: Android数据加密之——Aes加密
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Aes加密
abbrlink: 62c29a74
date: 2018-03-30 22:52:57
---
注：本文为转载文章，原文请参考：[Android数据加密之Aes加密][1] 

# 前言：
项目中除了登陆，支付等接口采用rsa非对称加密，之外的采用aes对称加密，今天我们来认识一下aes加密。
# 什么是aes加密？
高级加密标准（英语：Advanced Encryption Standard，缩写：AES），在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。

<!--more-->

# 接下来我们来实际看下具体怎么实现：  

对于AesUtils类常量简介：  

	private final static String HEX = "0123456789ABCDEF";
    private  static final String CBC_PKCS5_PADDING = "AES/CBC/PKCS5Padding";//AES是加密方式 CBC是工作模式 PKCS5Padding是填充模式
    private  static final String AES = "AES";//AES 加密
    private  static final String  SHA1PRNG="SHA1PRNG";//// SHA1PRNG 强随机种子算法, 要区别4.2以上版本的调用方法

## 如何生成一个随机Key？ 
 
	/** 生成随机数，可以当做动态的密钥 加密和解密的密钥必须一致，不然将不能解密*/
    public static String generateKey() 
	{
        try 
		{
            SecureRandom localSecureRandom = SecureRandom.getInstance(SHA1PRNG);
            byte[] bytes_key = new byte[20];
            localSecureRandom.nextBytes(bytes_key);
            String str_key = toHex(bytes_key);
            return str_key;
        } catch (Exception e) 
		{
            e.printStackTrace();
        }
        return null;
    }

## Aes密钥处理  

	// 对密钥进行处理
    private static byte[] getRawKey(byte[] seed) throws Exception 
	{
        KeyGenerator kgen = KeyGenerator.getInstance(AES);
        //for android
        SecureRandom sr = null;
        // 在4.2以上版本中，SecureRandom获取方式发生了改变
        if (android.os.Build.VERSION.SDK_INT >= 17) 
		{
            sr = SecureRandom.getInstance(SHA1PRNG, "Crypto");
        } else 
		{
            sr = SecureRandom.getInstance(SHA1PRNG);
        }
        // for Java
        // secureRandom = SecureRandom.getInstance(SHA1PRNG);
        sr.setSeed(seed);
        kgen.init(128, sr); //256 bits or 128 bits,192bits
        //AES中128位密钥版本有10个加密循环，192比特密钥版本有12个加密循环，256比特密钥版本则有14个加密循环。
        SecretKey skey = kgen.generateKey();
        byte[] raw = skey.getEncoded();
        return raw;
    }
## Aes加密过程

	/** 加密*/
    public static String encrypt(String key, String cleartext) 
	{
        if (TextUtils.isEmpty(cleartext)) 
		{
            return cleartext;
        }
        try 
		{
            byte[] result = encrypt(key, cleartext.getBytes());
            return Base64Encoder.encode(result);
        } catch (Exception e) 
		{
            e.printStackTrace();
        }
        return null;
    }

    /** 加密*/
    private static byte[] encrypt(String key, byte[] clear) throws Exception 
	{
        byte[] raw = getRawKey(key.getBytes());
        SecretKeySpec skeySpec = new SecretKeySpec(raw, AES);
        Cipher cipher = Cipher.getInstance(CBC_PKCS5_PADDING);
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, new IvParameterSpec(new byte[cipher.getBlockSize()]));
        byte[] encrypted = cipher.doFinal(clear);
        return encrypted;
    }
## Aes解密过程
	
	/** 解密*/
    public static String decrypt(String key, String encrypted) 
	{
        if (TextUtils.isEmpty(encrypted)) 
		{
            return encrypted;
        }
        try 
		{
            byte[] enc = Base64Decoder.decodeToBytes(encrypted);
            byte[] result = decrypt(key, enc);
            return new String(result);
        } catch (Exception e) 
		{
            e.printStackTrace();
        }
        return null;
    }

    /** 解密*/
    private static byte[] decrypt(String key, byte[] encrypted) throws Exception {
        byte[] raw = getRawKey(key.getBytes());
        SecretKeySpec skeySpec = new SecretKeySpec(raw, AES);
        Cipher cipher = Cipher.getInstance(CBC_PKCS5_PADDING);
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, new IvParameterSpec(new byte[cipher.getBlockSize()]));
        byte[] decrypted = cipher.doFinal(encrypted);
        return decrypted;
    }

## 二进制转字符

	//二进制转字符
    public static String toHex(byte[] buf) 
	{
        if (buf == null)
            return "";
        StringBuffer result = new StringBuffer(2 * buf.length);
        for (int i = 0; i < buf.length; i++) 
		{
            appendHex(result, buf[i]);
        }
        return result.toString();
    }
    private static void appendHex(StringBuffer sb, byte b) 
	{
        sb.append(HEX.charAt((b >> 4) & 0x0f)).append(HEX.charAt(b & 0x0f));
    }
## 测试程序：
	
	  List<Person> personList = new ArrayList<>();
        int testMaxCount = 1000;//测试的最大数据条数
        //添加测试数据
        for (int i = 0; i < testMaxCount; i++) 
		{
            Person person = new Person();
            person.setAge(i);
            person.setName(String.valueOf(i));
            personList.add(person);
        }
        //FastJson生成json数据
        String jsonData = JsonUtils.objectToJsonForFastJson(personList);
        Log.e("MainActivity", "AES加密前json数据 ---->" + jsonData);
        Log.e("MainActivity", "AES加密前json数据长度 ---->" + jsonData.length());

        //生成一个动态key
        String secretKey = AesUtils.generateKey();
        Log.e("MainActivity", "AES动态secretKey ---->" + secretKey);

        //AES加密
        long start = System.currentTimeMillis();
        String encryStr = AesUtils.encrypt(secretKey, jsonData);
        long end = System.currentTimeMillis();
        Log.e("MainActivity", "AES加密耗时 cost time---->" + (end - start));
        Log.e("MainActivity", "AES加密后json数据 ---->" + encryStr);
        Log.e("MainActivity", "AES加密后json数据长度 ---->" + encryStr.length());

        //AES解密
        start = System.currentTimeMillis();
        String decryStr = AesUtils.decrypt(secretKey, encryStr);
        end = System.currentTimeMillis();
        Log.e("MainActivity", "AES解密耗时 cost time---->" + (end - start));
        Log.e("MainActivity", "AES解密后json数据 ---->" + decryStr);

 



[1]: http://www.cnblogs.com/whoislcj/p/5473030.html