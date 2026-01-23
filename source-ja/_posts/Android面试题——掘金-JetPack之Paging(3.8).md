---
title: Android面试题——掘金-JetPack之Paging(3.8)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: eca11765
date: 2025-04-07 09:49:31
---
## 一 概述-Paging(分页加载)

```
Paging 是 Jetpack 提供的分页加载框架，
用于高效加载 大数据列表，减少内存占用，并提供 流式数据加载（支持 LiveData、Flow、RxJava）。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 Paging？它的作用是什么？

```
1.概念
Paging 是 Android 提供的 分页加载库

2.主要作用：
✅ 支持本地数据库（Room）、网络 API（Retrofit）等分页加载
✅ 按需加载，减少内存占用，提高性能
✅ 自动处理分页逻辑（滚动到底部时自动加载新数据）
✅ 支持 LiveData、Flow、RxJava，适配 MVVM 架构
```

### 2.2 Paging 组件有哪些？

|       组件        |                作用                 |
| :---------------: | :---------------------------------: |
|   PagingSource    |        数据源，提供分页数据         |
|    PagingData     | **存储分页数据**（Flow / LiveData） |
|       Pager       |     协调数据流，生成 PagingData     |
| PagingDataAdapter |         RecyclerView 适配器         |

### 2.3 Paging3 的基本使用

```
Paging3 适用于 数据库 + API 组合加载，完整示例如下：

1.创建 Entity（数据库表）
@Entity(tableName = "users")
public class User {
    @PrimaryKey
    public int id;
    public String name;
}

2.创建 Dao（数据库查询）
@Dao
public interface UserDao {
    @Query("SELECT * FROM users ORDER BY id ASC")
    PagingSource<Integer, User> getUsers();
}

3.创建 RemoteMediator（远程 + 本地数据源）
@OptIn(ExperimentalPagingApi.class)
public class UserRemoteMediator extends RemoteMediator<Integer, User> {
    private final UserDao userDao;
    private final ApiService apiService;

    public UserRemoteMediator(UserDao userDao, ApiService apiService) {
        this.userDao = userDao;
        this.apiService = apiService;
    }

    @NonNull
    @Override
    public MediatorResult load(@NonNull LoadType loadType, @NonNull PagingState<Integer, User> state) {
        try {
            int page = state.getAnchorPosition() != null ? state.getAnchorPosition() / 20 : 1;
            List<User> users = apiService.getUsers(page);
            userDao.insertAll(users);
            return new MediatorResult.Success(users.isEmpty());
        } catch (Exception e) {
            return new MediatorResult.Error(e);
        }
    }
}

4.创建 Repository（数据提供层）
public class UserRepository {
    private final UserDao userDao;
    private final ApiService apiService;

    public UserRepository(UserDao userDao, ApiService apiService) {
        this.userDao = userDao;
        this.apiService = apiService;
    }

    public Flow<PagingData<User>> getUsers() {
        return new Pager(
            new PagingConfig(20), // 每页大小
            () -> userDao.getUsers()
        ).getFlow();
    }
}

5.创建 ViewModel
@HiltViewModel
public class UserViewModel extends ViewModel {
    private final UserRepository repository;
    public LiveData<PagingData<User>> userPagingData;

    @Inject
    public UserViewModel(UserRepository repository) {
        this.repository = repository;
        userPagingData = PagingLiveData.cachedIn(repository.getUsers(), viewModelScope);
    }
}

6.创建 Adapter（PagingDataAdapter）
public class UserAdapter extends PagingDataAdapter<User, UserAdapter.UserViewHolder> {
    public UserAdapter() {
        super(DIFF_CALLBACK);
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new UserViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_user, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull UserViewHolder holder, int position) {
        User user = getItem(position);
        if (user != null) {
            holder.bind(user);
        }
    }

    private static final DiffUtil.ItemCallback<User> DIFF_CALLBACK =
        new DiffUtil.ItemCallback<User>() {
            @Override
            public boolean areItemsTheSame(@NonNull User oldItem, @NonNull User newItem) {
                return oldItem.id == newItem.id;
            }

            @Override
            public boolean areContentsTheSame(@NonNull User oldItem, @NonNull User newItem) {
                return oldItem.equals(newItem);
            }
        };

    static class UserViewHolder extends RecyclerView.ViewHolder {
        public UserViewHolder(@NonNull View itemView) {
            super(itemView);
        }

        void bind(User user) {
            ((TextView) itemView.findViewById(R.id.userName)).setText(user.name);
        }
    }
}

7.在 Activity / Fragment 中使用
public class MainActivity extends AppCompatActivity {
    private UserViewModel userViewModel;
    private UserAdapter userAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        userAdapter = new UserAdapter();
        recyclerView.setAdapter(userAdapter);

        userViewModel.userPagingData.observe(this, pagingData -> userAdapter.submitData(getLifecycle(), pagingData));
    }
}
public class MainActivity extends AppCompatActivity {
    private UserViewModel userViewModel;
    private UserAdapter userAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        userAdapter = new UserAdapter();
        recyclerView.setAdapter(userAdapter);

        userViewModel.userPagingData.observe(this, pagingData -> userAdapter.submitData(getLifecycle(), pagingData));
    }
}
```

### 2.4  PagingConfig 配置

```
PagingConfig pagingConfig = new PagingConfig(
    20,  // 每页大小
    5,   // 预加载距离
    false, // 开启占位符（支持占位 UI）
    100  // 最大缓存数据
);
```

### 2.5 Paging 适配不同数据源

```
1.本地数据库（Room）
new Pager(new PagingConfig(20), () -> userDao.getUsers()).getFlow();

2.网络 API（Retrofit）
new Pager(new PagingConfig(20), () -> new UserPagingSource(apiService)).getFlow();

-UserPagingSource

public class UserPagingSource extends PagingSource<Integer, User> {
    private final ApiService apiService;

    public UserPagingSource(ApiService apiService) {
        this.apiService = apiService;
    }

    @NonNull
    @Override
    public LoadResult<Integer, User> load(@NonNull LoadParams<Integer> params) {
        try {
            int page = params.getKey() == null ? 1 : params.getKey();
            List<User> users = apiService.getUsers(page);
            return new LoadResult.Page(users, page == 1 ? null : page - 1, users.isEmpty() ? null : page + 1);
        } catch (Exception e) {
            return new LoadResult.Error(e);
        }
    }

```

### 2.6 Paging 3.0 主要优势

```
✅ 支持 Room、Retrofit、本地缓存等数据源
✅ Flow / LiveData / RxJava 适配
✅ 滚动到底部自动加载更多
✅ 内存占用更少，支持占位符
✅ 数据流式处理，提高性能
```

### 2.7 Paging 与普通分页加载的区别

|        对比项        |  Paging3   |   普通分页   |
| :------------------: | :--------: | :----------: |
|       自动分页       |    ✅ 是    |     ❌ 否     |
|       内存管理       | ✅ 自动回收 | ❌ 需手动管理 |
|     数据流式加载     |   ✅ 支持   |   ❌ 不支持   |
| 支持 Room / Retrofit |    ✅ 是    |     ❌ 否     |


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)