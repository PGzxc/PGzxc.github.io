---
title: Android数据加密之——MD5加密
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - MD5加密
abbrlink: 96f14beb
date: 2018-03-30 19:47:37
---
注：本文为转载文章，原文请参考：[Android数据加密之MD5加密][1] 
# 前言：
项目中无论是密码的存储或者说判断文件是否是同一文件，都会用到MD5算法，今天来总结一下MD5加密算法。 

# 什么是MD5加密？
MD5英文全称“Message-Digest Algorithm 5”，翻译过来是“消息摘要算法5”，由MD2、MD3、MD4演变过来的，是一种单向加密算法，是不可逆的一种的加密方式。

<!--more-->

# MD5加密有哪些特点？

- 压缩性：任意长度的数据，算出的MD5值长度都是固定的。
- 容易计算：从原数据计算出MD5值很容易。
- 抗修改性：对原数据进行任何改动，哪怕只修改1个字节，所得到的MD5值都有很大区别。
- 强抗碰撞：已知原数据和其MD5值，想找到一个具有相同MD5值的数据（即伪造数据）是非常困难的。

# MD5应用场景：

- 一致性验证
- 数字签名
- 安全访问认证

# MD5加密算法实现：
## 计算字符串MD5值
  
	public static String md5(String string) 
	{
        if (TextUtils.isEmpty(string)) 
		{
            return "";
        }
        MessageDigest md5 = null;
        try 
		{
            md5 = MessageDigest.getInstance("MD5");
            byte[] bytes = md5.digest(string.getBytes());
            String result = "";
            for (byte b : bytes) 
			{
                String temp = Integer.toHexString(b & 0xff);
                if (temp.length() == 1) 
				{
                    temp = "0" + temp;
                }
                result += temp;
            }
            return result;
        } catch (NoSuchAlgorithmException e) 
		{
            e.printStackTrace();
        }
        return "";
    }
## 计算文件的MD5值

	// 计算文件的 MD5 值
    public static String md5(File file) 
	{
        if (file == null || !file.isFile() || !file.exists()) 
		{
            return "";
        }
        FileInputStream in = null;
        String result = "";
        byte buffer[] = new byte[8192];
        int len;
        try 
		{
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            in = new FileInputStream(file);
            while ((len = in.read(buffer)) != -1) 
			{
                md5.update(buffer, 0, len);
            }
            byte[] bytes = md5.digest();
            for (byte b : bytes) 
			{
                String temp = Integer.toHexString(b & 0xff);
                if (temp.length() == 1) 
				{
                    temp = "0" + temp;
                }
                result += temp;
            }
        } catch (Exception e) 
		{
            e.printStackTrace();
        }finally 
		{
            if(null!=in){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

 或者采用nio的方式

	public static String md5(File file) {
        String result = "";
        FileInputStream in = null;
        try {
            in = new FileInputStream(file);
            MappedByteBuffer byteBuffer = in.getChannel().map(FileChannel.MapMode.READ_ONLY, 0, file.length());
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(byteBuffer);
            byte[] bytes = md5.digest();
            for (byte b : bytes) {
                String temp = Integer.toHexString(b & 0xff);
                if (temp.length() == 1) {
                    temp = "0" + temp;
                }
                result += temp;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (null != in) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

# MD5加密安全性探讨：
虽然说MD5加密本身是不可逆的，但并不是不可破译的，网上有关MD5解密的网站数不胜数，破解机制采用穷举法，就是我们平时说的跑字典。所以如何才能加大MD5破解的难度呢？
## 对字符串多次MD5加密

	public static String md5(String string, int times) 
	{
        if (TextUtils.isEmpty(string)) 
		{
            return "";
        }
        String md5 = md5(string);
        for (int i = 0; i < times - 1; i++) 
		{
            md5 = md5(md5);
        }
        return md5(md5);
    }
## MD5加盐

加盐的方式也是多种多样

- string+key（盐值key）然后进行MD5加密
- 用string明文的hashcode作为盐，然后进行MD5加密
- 随机生成一串字符串作为盐，然后进行MD5加密


		public static String md5(String string, String slat) 
		{
        	if (TextUtils.isEmpty(string)) 
			{
            	return "";
        	}
        	MessageDigest md5 = null;
        	try {
            		md5 = MessageDigest.getInstance("MD5");
            		byte[] bytes = md5.digest((string + slat).getBytes());
            		String result = "";
            		for (byte b : bytes) 
					{
                		String temp = Integer.toHexString(b & 0xff);
                		if (temp.length() == 1) 
						{
                    		temp = "0" + temp;
                		}
                		result += temp;
            		}
            		return result;
        	} catch (NoSuchAlgorithmException e) 
			{
           		 e.printStackTrace();
        	}
        	return "";
		}

# 总结：
MD5加密简单的总结到此为止。


[1]: http://www.cnblogs.com/whoislcj/p/5885006.html