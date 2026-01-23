---
title: Android数据加密之——Des加密
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Des加密
abbrlink: 2855df3b
date: 2018-03-30 22:38:29
---
注：本文为转载文章，原文请参考：[Android数据加密之Des加密][1] 
# DES加密介绍：
DES是一种对称加密算法，所谓对称加密算法即：加密和解密使用相同密钥的算法。DES加密算法出自IBM的研究，后来被美国政府正式采用，之后开始广泛流传，但是近些年使用越来越少，因为DES使用56位密钥，以现代计算能力，24小时内即可被破解。

<!--more-->

# DES加密使用方式：
## DesUtil常量类介绍
	
	private final static String HEX = "0123456789ABCDEF";
    private final static String TRANSFORMATION = "DES/CBC/PKCS5Padding";//DES是加密方式 CBC是工作模式 PKCS5Padding是填充模式
    private final static String IVPARAMETERSPEC = "01020304";////初始化向量参数，AES 为16bytes. DES 为8bytes.
    private final static String ALGORITHM = "DES";//DES是加密方式
    private static final String SHA1PRNG = "SHA1PRNG";//// SHA1PRNG 强随机种子算法, 要区别4.2以上版本的调用方法

## 动态生成秘钥
长度不能够小于8位字节 因为DES固定格式为128bits，即8bytes。

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

## 处理秘钥Key的两种方式
###    第一种：

	// 对密钥进行处理
    private static Key getRawKey(String key) throws Exception 
	{
        KeyGenerator kgen = KeyGenerator.getInstance(ALGORITHM);
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
        sr.setSeed(key.getBytes());
        kgen.init(64, sr); //DES固定格式为64bits，即8bytes。
        SecretKey skey = kgen.generateKey();
        byte[] raw = skey.getEncoded();
        return new SecretKeySpec(raw, ALGORITHM);
    }
### 第二种：

	// 对密钥进行处理
    private static Key getRawKey(String key) throws Exception 
	{
        DESKeySpec dks = new DESKeySpec(key.getBytes());
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(ALGORITHM);
        return keyFactory.generateSecret(dks);
    }
## 加密实现

	/**
     * DES算法，加密
     * @param data 待加密字符串
     * @param key  加密私钥，长度不能够小于8位
     * @return 加密后的字节数组，一般结合Base64编码使用
     */
    public static String encode(String key, String data) 
	{
        return encode(key, data.getBytes());
    }


    /**
     * DES算法，加密
     * @param data 待加密字符串
     * @param key  加密私钥，长度不能够小于8位
     * @return 加密后的字节数组，一般结合Base64编码使用
     */
    public static String encode(String key, byte[] data) 
	{
        try 
		{
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            IvParameterSpec iv = new IvParameterSpec(IVPARAMETERSPEC.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, getRawKey(key), iv);
            byte[] bytes = cipher.doFinal(data);
            return Base64.encodeToString(bytes, Base64.DEFAULT);
        } catch (Exception e) 
		{
            return null;
        }
    }
## 解密实现

	/**
     * 获取编码后的值
     * @param key
     * @param data
     * @return
     */
    public static String decode(String key, String data) 
	{
        return decode(key, Base64.decode(data, Base64.DEFAULT));
    }

    /**
     * DES算法，解密
     * @param data 待解密字符串
     * @param key  解密私钥，长度不能够小于8位
     * @return 解密后的字节数组
     */
    public static String decode(String key, byte[] data) 
	{
        try 
		{
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            IvParameterSpec iv = new IvParameterSpec(IVPARAMETERSPEC.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, getRawKey(key), iv);
            byte[] original = cipher.doFinal(data);
            String originalString = new String(original);
            return originalString;
        } catch (Exception e) 
		{
            return null;
        }
    }
## DES知识扩展：3DES
3DES是DES加密算法的一种模式，它使用3条64位的密钥对数据进行三次加密。数据加密标准（DES）是美国的一种由来已久的加密标准，它使用对称密钥加密法。3DES（即Triple DES）是DES向AES过渡的加密算法（1999年，NIST将3-DES指定为过渡的加密标准），是DES的一个更安全的变形。它以DES为基本模块，通过组合分组方法设计出分组加密算法。
## DES与AES比较：

当时被问起采用DES加密内心深处我是拒绝的。单纯从名字上看AES(Advanced Encryption Standard)高级加密标准，安全性要高于DES，其实AES的出现本身就是为了取代DES的，AES具有比DES更好的安全性、效率、灵活性，所以对称加密优先采用AES。

[1]: http://www.cnblogs.com/whoislcj/p/5580950.html