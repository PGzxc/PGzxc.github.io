---
title: Android面试题——掘金-JetPack之Room(3.6)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: b01f3366
date: 2025-04-07 09:43:32
---
## 一 概述

```
Room 是 Android Jetpack 提供的官方数据库持久化框架，
基于 SQLite，提供 更简单、易用且安全 的 API，让开发者更高效地操作数据库，
同时支持 LiveData、Flow、RxJava 等响应式编程方式。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 Room？它的作用是什么？

```
1.概念
Room 是 SQLite 的抽象封装

2.主要作用：
✅ 简化数据库操作，避免手写 SQL 语句
✅ 编译时检查 SQL 语法，避免运行时错误
✅ 支持 LiveData、Flow、RxJava，便于数据监听
✅ 默认在子线程执行数据库操作，防止 UI 卡顿
```

### 2.2 Room 的核心组件有哪些？

|   组件    |      作用      |
| :-------: | :------------: |
|  @Entity  |  定义数据库表  |
|   @Dao    | 数据库操作接口 |
| @Database | 创建数据库实例 |
|  @Query   | 执行 SQL 查询  |
|  @Insert  |    插入数据    |
|  @Update  |    更新数据    |
|  @Delete  |    删除数据    |

### 2.3 如何使用 Room？（完整示例）

```
1.创建 Entity（数据库表）
@Entity(tableName = "users")
public class User {
    @PrimaryKey(autoGenerate = true)
    public int id;

    @ColumnInfo(name = "user_name")
    public String name;

    @ColumnInfo(name = "age")
    public int age;
}

2.创建 Dao（数据库操作接口）
@Dao
public interface UserDao {
    @Insert
    void insert(User user);

    @Update
    void update(User user);

    @Delete
    void delete(User user);

    @Query("SELECT * FROM users WHERE id = :userId")
    LiveData<User> getUserById(int userId);

    @Query("SELECT * FROM users")
    LiveData<List<User>> getAllUsers();
}

3.创建 Database（数据库实例）
@Database(entities = {User.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    private static volatile AppDatabase instance;

    public abstract UserDao userDao();

    public static AppDatabase getInstance(Context context) {
        if (instance == null) {
            synchronized (AppDatabase.class) {
                if (instance == null) {
                    instance = Room.databaseBuilder(context.getApplicationContext(),
                            AppDatabase.class, "user_database")
                            .fallbackToDestructiveMigration() // 处理数据库升级
                            .build();
                }
            }
        }
        return instance;
    }
}

4.在 ViewModel 里使用 Room
public class UserViewModel extends AndroidViewModel {
    private UserDao userDao;
    private LiveData<List<User>> allUsers;

    public UserViewModel(@NonNull Application application) {
        super(application);
        AppDatabase db = AppDatabase.getInstance(application);
        userDao = db.userDao();
        allUsers = userDao.getAllUsers();
    }

    public LiveData<List<User>> getAllUsers() {
        return allUsers;
    }

    public void insert(User user) {
        Executors.newSingleThreadExecutor().execute(() -> userDao.insert(user));
    }
}

5.在 Activity / Fragment 中使用
public class MainActivity extends AppCompatActivity {
    private UserViewModel userViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);

        userViewModel.getAllUsers().observe(this, users -> {
            // 更新 UI
            textView.setText("用户数：" + users.size());
        });

        button.setOnClickListener(v -> {
            User user = new User();
            user.name = "张三";
            user.age = 25;
            userViewModel.insert(user);
        });
    }
}
```

### 2.4  @Entity 注解常见参数

1-示例

```
@Entity(
    tableName = "users",
    indices = {@Index(value = {"user_name"}, unique = true)}
)
```

2.参数

|    参数     |          作用          |
| :---------: | :--------------------: |
|  tableName  |  指定表名（默认类名）  |
| primaryKeys |       自定义主键       |
|   indices   | 创建索引，提高查询效率 |
| foreignKeys |      设置外键关系      |

### 2.5 @Dao 注解的用法

```
1.插入数据
@Insert
void insertUser(User user);

2.更新数据
@Update
void updateUser(User user);

3.删除数据
@Delete
void deleteUser(User user);

4.查询数据
@Query("SELECT * FROM users WHERE id = :userId")
LiveData<User> getUserById(int userId);

5.分页查询
@Query("SELECT * FROM users ORDER BY id DESC LIMIT :limit OFFSET :offset")
List<User> getUsersPaged(int limit, int offset);
```

### 2.6 Room 如何支持协程 Flow？

```
1.概念
Room 直接支持 Flow，可用于 异步数据流更新。

2.步骤
2.1 修改 Dao，使用 Flow
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    fun getAllUsers(): Flow<List<User>>
}

2.2 在 ViewModel 中使用
class UserViewModel(application: Application) : AndroidViewModel(application) {
    private val userDao = AppDatabase.getInstance(application).userDao()

    val allUsers: Flow<List<User>> = userDao.getAllUsers()
}
```

### 2.7 Room 如何支持 RxJava？

```
1.概念
Room 支持 RxJava，可以用 Flowable、Single、Maybe 处理数据库查询。

2.步骤
2.1 在 Dao 使用 RxJava
@Dao
public interface UserDao {
    @Query("SELECT * FROM users")
    Flowable<List<User>> getAllUsersRx();
}

2.2 在 ViewModel 监听
public class UserViewModel extends ViewModel {
    private UserDao userDao;

    public UserViewModel(Application application) {
        AppDatabase db = AppDatabase.getInstance(application);
        userDao = db.userDao();
    }

    public Flowable<List<User>> getAllUsersRx() {
        return userDao.getAllUsersRx();
    }
}
```

### 2.8 Room 如何进行数据库升级？

```
1.概念
Room 通过 version 参数 + Migration 进行数据库升级

2.步骤
2.1 定义新的数据库版本
@Database(entities = {User.class}, version = 2)
public abstract class AppDatabase extends RoomDatabase {
    public abstract UserDao userDao();
}

2.2 创建 Migration
static final Migration MIGRATION_1_2 = new Migration(1, 2) {
    @Override
    public void migrate(@NonNull SupportSQLiteDatabase database) {
        database.execSQL("ALTER TABLE users ADD COLUMN phoneNumber TEXT");
    }
};

2.3 在 Database 里添加 Migration
Room.databaseBuilder(context, AppDatabase.class, "user_database")
    .addMigrations(MIGRATION_1_2)
    .build();
```

### 2.9 Room 与 SQLite 的区别？

|   对比项   |          Room           |     SQLite     |
| :--------: | :---------------------: | :------------: |
|  语法检查  |   编译时检查 SQL 语法   |   运行时报错   |
|  异步支持  | 内置 LiveData/Flow 支持 | 需手动处理线程 |
| 数据库升级 |  `Migration` 自动迁移   | 手写 SQL 语句  |
|  数据观察  |  支持 LiveData/RxJava   |   需手动监听   |

### 2.10 总结

```
✅ Room 简化数据库操作，支持 LiveData / Flow / RxJava
✅ @Entity 定义表，@Dao 操作数据，@Database 创建数据库
✅ 数据库升级使用 Migration
✅ 支持分页、外键、索引优化查询
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)