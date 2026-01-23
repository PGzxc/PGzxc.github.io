---
title: Android开发之——数据库之Realm
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 数据库
  - Realm
abbrlink: 510e4f07
date: 2018-01-04 00:09:48
---
# 简介  

数据库Realm，是用来替代sqlite的一种解决方案，它有一套自己的数据库存储引擎，比sqlite更轻量级，拥有更快的速度，并且具有很多现代数据库的特性，比如支持JSON，流式api，数据变更通知，自动数据同步，简单身份验证，访问控制，事件处理，最重要的是跨平台，目前已有Java、Objective C、Swift、React-Native、Xamarin这五种实现。  
<!--more-->

# 环境配置  
## 搜索Realm
打开Github后搜索Realm，有realm-java，并没有找到realm-android，但是我们知道，Android Studio中的代码仓库托管在jcenter中，首先打开[https://bintray.com/][1]，在搜索框中输入realm后可以看到realm-android    

![][2]
## 查看Realm  
点击realm-android，可以看到当前realm的最新版本和引用方式
![][3]
## 配置Realm    

	compile 'io.realm:realm-android:0.87.5'，
	javaCompileOptions { annotationProcessorOptions { includeCompileClasspath = true } }
![][4]   

# 初始化Realm  
## 在Application的oncreate()方法中对Realm进行相关配置  
Realm中并没有init()方法，我们使用默认配置方式

	RealmConfiguration config = new RealmConfiguration.Builder(this).build();
	Realm.setDefaultConfiguration(config);
![][5]

## 在AndroidManifest.xml配置自定义的Application  

	<application
		android:name=".MyApplication"
		...
	/>
# 创建实体  
## 新建一个类继承RealmObject
	public class Dog extends RealmObject 
	{
    	private String name;
    	private int age;
    	@PrimaryKey
    	private String id;
		//get/set方法
	}
多对多的关系： 

	public class Contact extends RealmObject 
	{
    	public String name;
    	public RealmList<Email> emails;
	}

	public class Email extends RealmObject 
	{
    	public String address;
    	public boolean active;
	}
## 其他相关说明  
### 支持的数据类型 
boolean,byte,short,int,long,float,double,String,Date,byte[]    
在Realm中byte,short,int,long最终都被映射成long类型  
### 注解说明  
@PrimaryKey

- 字段必须是String、integer、byte、short、int、long以及它们的封装类Byte、Short、Integer、Long   
- 使用了该注解之后可以使用copyToRealmOrUpdate()方法，通过主键查询它的对象，如果查询到了，则更新它，否则新建一个对象来替代。  
- 使用了该注解将默认设置@index注解  
- 使用了该注解之后，创建和更新数据库将会慢一点，查询数据会快一点   

@Required  
数据不能为null 

@Ignore  
忽略，即该字段不被存储到本地 

@Index  
为这个字段添加一个搜索引擎，这将使插入数据变慢、数据增大，但是查询会变快。建议在需要优化读取性能的情况下使用。   

# 增 
## 实现方式一：实务操作 
 
### 类型一：新建一个对象，并进行存储  

	Realm realm=Realm.getDefaultInstance();

	realm.beginTransaction();
	User user = realm.createObject(User.class); // Create a new object
	user.setName("John");
	user.setEmail("john@corporation.com");
	realm.commitTransaction();  
### 类型二：复制一个对象到Realm数据库 

	Realm realm=Realm.getDefaultInstance();
	User user = new User("John");
	user.setEmail("john@corporation.com");
	//Copy the object to Realm. Any further changes must happen on realmUser
	realm.beginTransaction();
	realm.copyToRealm(user);
	realm.commitTransaction();  

## 实现方法二：使用事务块  

	Realm  mRealm=Realm.getDefaultInstance();
	final User user = new User("John");
	user.setEmail("john@corporation.com");
	mRealm.executeTransaction(new Realm.Transaction() 
	{
            @Override
            public void execute(Realm realm) 
			{
            	realm.copyToRealm(user);
            }
     });
# 删  

	Realm  mRealm=Realm.getDefaultInstance();
    final RealmResults<Dog> dogs=  mRealm.where(Dog.class).findAll();
        mRealm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) 
			{
                Dog dog=dogs.get(5);
                dog.removeFromRealm();
                //删除第一个数据
                dogs.removeFirstFromRealm();
                //删除最后一个数据
                dogs.removeLastFromRealm();
                //删除位置为1的数据
                dogs.removeFromRealm(1);
                //删除所有数据
                dogs.removeAllFromRealm();
            }
        });
同样也可以使用同上的beginTransation和commitTransation方法进行删除  
# 改  

	Realm  mRealm=Realm.getDefaultInstance();
	Dog dog = mRealm.where(Dog.class).equalTo("id", id).findFirst();
	mRealm.beginTransaction();
	dog.setName(newName);
	mRealm.commitTransaction();  
同样也可以用事物快来更新数据  
# 查 
## 查询全部 
查询结果为RealmResults<T>，可以使用mRealm.copyFromRealm(dogs)方法将它转为List<T>   

	public List<Dog> queryAllDog() 
	{
        Realm  mRealm=Realm.getDefaultInstance();
        RealmResults<Dog> dogs = mRealm.where(Dog.class).findAll();
        return mRealm.copyFromRealm(dogs);
    }
## 条件查询  

	public Dog queryDogById(String id) 
	{
        Realm  mRealm=Realm.getDefaultInstance();
        Dog dog = mRealm.where(Dog.class).equalTo("id", id).findFirst();
        return dog;
    }
常见的条件如下(详细资料请查官方文档)：  

- between(),greaterThan(),lessThan(),greaterThanOrEqualTo()&lessThanOrEqualTo()  
- equalTo()&noEqualTo()  
- contains(),beginsWith()&endsWith()
- isNull()&isNotNull() 
- isEmpty()&isNotEmpty()  

## 对查询结果进行排序 


    public List<Dog> queryAllDog() 
	{
        RealmResults<Dog> dogs = mRealm.where(Dog.class).findAll();
         //增序排列
         dogs=dogs.sort("id");
         //降序排列
         dogs=dogs.sort("id", Sort.DESCENDING);
         return mRealm.copyFromRealm(dogs);
     }
## 其他查询 
sum,min,max,average只支持整形数据字段  

	//查询平均年龄
    private void getAverageAge() 
	{
         double avgAge=  mRealm.where(Dog.class).findAll().average("age");
    }
	//查询总年龄
    private void getSumAge() 
	{
      Number sum=  mRealm.where(Dog.class).findAll().sum("age");
        int sumAge=sum.intValue();
    }

	//查询最大年龄
    private void getMaxId()
	{
      Number max=  mRealm.where(Dog.class).findAll().max("age");
        int maxAge=max.intValue();
    }
# 异步操作 
大多数情况下，Realm的增删改查插值足够快，可以在UI线程中执行操作。但是如果遇到较复杂的增删改查或增删改查操作的数据较多时，就可以在子线程进行操作。   
## 异步增  

	private void addCat(final Cat cat) 
	{
      RealmAsyncTask  addTask=  mRealm.executeTransactionAsync(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {
                realm.copyToRealm(cat);
            }
        }, new Realm.Transaction.OnSuccess() {
            @Override
            public void onSuccess() {
                ToastUtil.showShortToast(mContext,"收藏成功");
            }
        }, new Realm.Transaction.OnError() {
            @Override
            public void onError(Throwable error) {
                ToastUtil.showShortToast(mContext,"收藏失败");
            }
        });

    }
最后在销毁Activity或Fragment时，要取消掉异步任务  

	@Override
    protected void onDestroy() 
	{
        super.onDestroy();
       if (addTask!=null&&!addTask.isCancelled())
		{
            addTask.cancel();
        }
    }
## 异步删  

	private void deleteCat(final String id, final ImageView imageView)
	{
      RealmAsyncTask  deleteTask=   mRealm.executeTransactionAsync(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {
                Cat cat=realm.where(Cat.class).equalTo("id",id).findFirst();
                cat.deleteFromRealm();

            }
        }, new Realm.Transaction.OnSuccess() {
            @Override
            public void onSuccess() {
                ToastUtil.showShortToast(mContext,"取消收藏成功");
            }
        }, new Realm.Transaction.OnError() {
            @Override
            public void onError(Throwable error) {
                ToastUtil.showShortToast(mContext,"取消收藏失败");
            }
        });

    }

最后在销毁Activity或Fragment时，要取消掉异步任务   

	@Override
    protected void onDestroy() 
	{
        super.onDestroy();
       if (deleteTask!=null&&!addTask.isCancelled())
		{
            deleteTask.cancel();
        }
    }
## 异步改  

	RealmAsyncTask  updateTask=   mRealm.executeTransactionAsync(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {
                Cat cat=realm.where(Cat.class).equalTo("id",mId).findFirst();
                cat.setName(name);
            }
        }, new Realm.Transaction.OnSuccess() {
            @Override
            public void onSuccess() {
                ToastUtil.showShortToast(UpdateCatActivity.this,"更新成功");
             
            }
        }, new Realm.Transaction.OnError() {
            @Override
            public void onError(Throwable error) {
                ToastUtil.showShortToast(UpdateCatActivity.this,"失败成功");
            }
        });

最后在销毁Activity或Fragment时，要取消掉异步任务 

	@Override
    protected void onDestroy() 
	{
        super.onDestroy();
       if (updateTask!=null&&!addTask.isCancelled())
		{
            updateTask.cancel();
        }
    }
## 异步查 

	RealmResults<Cat>   cats=mRealm.where(Cat.class).findAllAsync();
        cats.addChangeListener(new RealmChangeListener<RealmResults<Cat>>() 
	{
            @Override
            public void onChange(RealmResults<Cat> element) {
               element= element.sort("id");
                List<Cat> datas=mRealm.copyFromRealm(element);
              
            }
        });
最后在销魂Activity或Fragment时，要取消掉异步任务  

	@Override
    protected void onDestroy() 
	{
        super.onDestroy();
        cats.removeChangeListeners();
    }
# 数据迁移(版本升级)
## 方法一：删除旧版本的数据 

	RealmConfiguration config = new RealmConfiguration.Builder()
    .deleteRealmIfMigrationNeeded()
    .build()  
## 方法二：设置schema版本和migration，对改变的数据进行处理 

	RealmConfiguration config = new RealmConfiguration.Builder()
    .schemaVersion(2) // Must be bumped when the schema changes
    .migration(new Migration()) // Migration to run instead of throwing an exception
    .build()  

处理版本数据变化Migration  

	public class Migration implements RealmMigration 
	{
    	@Override
    	public void migrate(final DynamicRealm realm, long oldVersion, long newVersion) {
        // During a migration, a DynamicRealm is exposed. A DynamicRealm is an untyped variant of a normal Realm, but
        // with the same object creation and query capabilities.
        // A DynamicRealm uses Strings instead of Class references because the Classes might not even exist or have been
        // renamed.

        // Access the Realm schema in order to create, modify or delete classes and their fields.
        RealmSchema schema = realm.getSchema();

        /************************************************
            // Version 0
            class Person
                @Required
                String firstName;
                @Required
                String lastName;
                int    age;
            // Version 1
            class Person
                @Required
                String fullName;            // combine firstName and lastName into single field.
                int age;
        ************************************************/
        // Migrate from version 0 to version 1
        if (oldVersion == 0) {
            RealmObjectSchema personSchema = schema.get("Person");

            // Combine 'firstName' and 'lastName' in a new field called 'fullName'
            personSchema
                    .addField("fullName", String.class, FieldAttribute.REQUIRED)
                    .transform(new RealmObjectSchema.Function() {
                        @Override
                        public void apply(DynamicRealmObject obj) {
                            obj.set("fullName", obj.getString("firstName") + " " + obj.getString("lastName"));
                        }
                    })
                    .removeField("firstName")
                    .removeField("lastName");
            oldVersion++;
        }

        /************************************************
            // Version 2
                class Pet                   // add a new model class
                    @Required
                    String name;
                    @Required
                    String type;
                class Person
                    @Required
                    String fullName;
                    int age;
                    RealmList<Pet> pets;    // add an array property
         ************************************************/
        // Migrate from version 1 to version 2
        if (oldVersion == 1) {

            // Create a new class
            RealmObjectSchema petSchema = schema.create("Pet")
                    .addField("name", String.class, FieldAttribute.REQUIRED)
                    .addField("type", String.class, FieldAttribute.REQUIRED);

            // Add a new field to an old class and populate it with initial data
            schema.get("Person")
                .addRealmListField("pets", petSchema)
                .transform(new RealmObjectSchema.Function() {
                    @Override
                    public void apply(DynamicRealmObject obj) {
                        if (obj.getString("fullName").equals("JP McDonald")) {
                            DynamicRealmObject pet = realm.createObject("Pet");
                            pet.setString("name", "Jimbo");
                            pet.setString("type", "dog");
                            obj.getList("pets").add(pet);
                        }
                    }
                });
            oldVersion++;
        }

        /************************************************
            // Version 3
                class Pet
                    @Required
                    String name;
                    int type;               // type becomes int
                class Person
                    String fullName;        // fullName is nullable now
                    RealmList<Pet> pets;    // age and pets re-ordered (no action needed)
                    int age;
         ************************************************/
        // Migrate from version 2 to version 3
        if (oldVersion == 2) {
            RealmObjectSchema personSchema = schema.get("Person");
            personSchema.setNullable("fullName", true); // fullName is nullable now.

            // Change type from String to int
            schema.get("Pet")
                .addField("type_tmp", int.class)
                .transform(new RealmObjectSchema.Function() {
                    @Override
                    public void apply(DynamicRealmObject obj) {
                        String oldType = obj.getString("type");
                        if (oldType.equals("dog")) {
                            obj.setLong("type_tmp", 1);
                        } else if (oldType.equals("cat")) {
                            obj.setInt("type_tmp", 2);
                        } else if (oldType.equals("hamster")) {
                            obj.setInt("type_tmp", 3);
                        }
                    }
                })
                .removeField("type")
                .renameField("type_tmp", "type");
            oldVersion++;
        }
    }
	}

参考：   
[Realm for Android详细教程][6]  
[RealmSample][7]


[1]: https://bintray.com/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/realm-bintray.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/realm-compile.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/realm-as-config.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/realm-application.png
[6]: https://www.jianshu.com/p/28912c2f31db
[7]: https://github.com/PGzxc/RealmSample/
