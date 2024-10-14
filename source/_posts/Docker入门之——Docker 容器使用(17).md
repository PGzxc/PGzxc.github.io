---
title: Docker入门之——Docker 容器使用(17)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 45f01399
date: 2024-10-14 08:37:53
---
## 一 概述

* Docker 客户端
* 容器使用

<!--more-->

## 二 Docker 客户端(客户端命令)

### 2.1 准备条件

* VPN

### 2.2 Docker 

1-运行指令

```
docker
```

2-操作结果

```
C:\Users\83422>docker

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container from an image
  exec        Execute a command in a running container
  ps          List containers
  build       Build an image from a Dockerfile
  pull        Download an image from a registry
  push        Upload an image to a registry
  images      List images
  login       Log in to a registry
  logout      Log out from a registry
  search      Search Docker Hub for images
  version     Show the Docker version information
  info        Display system-wide information

Management Commands:
  builder     Manage builds
  buildx*     Docker Buildx
  compose*    Docker Compose
  container   Manage containers
  context     Manage contexts
  debug*      Get a shell into any image or container
  desktop*    Docker Desktop commands (Alpha)
  dev*        Docker Dev Environments
  extension*  Manages Docker extensions
  feedback*   Provide feedback, right in your terminal!
  image       Manage images
  init*       Creates Docker-related starter files for your project
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  plugin      Manage plugins
  sbom*       View the packaged-based Software Bill Of Materials (SBOM) for an image
  scout*      Docker Scout
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Swarm Commands:
  swarm       Manage Swarm

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  import      Import the contents from a tarball to create a filesystem image
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

Global Options:
      --config string      Location of client config files (default
                           "C:\\Users\\83422\\.docker")
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket to connect to
  -l, --log-level string   Set the logging level ("debug", "info",
                           "warn", "error", "fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "C:\\Users\\83422\\.docker\\ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "C:\\Users\\83422\\.docker\\cert.pem")
      --tlskey string      Path to TLS key file (default
                           "C:\\Users\\83422\\.docker\\key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Run 'docker COMMAND --help' for more information on a command.

For more help on how to use Docker, head to https://docs.docker.com/go/guides/
```

### 2.3 docker stats

操作指令

```
docker stats --help
```

操作结果

```
C:\Users\83422>docker stats --help

Usage:  docker stats [OPTIONS] [CONTAINER...]

Display a live stream of container(s) resource usage statistics

Aliases:
  docker container stats, docker stats

Options:
  -a, --all             Show all containers (default shows just running)
      --format string   Format output using a custom template:
                        'table':            Print output in table format
                        with column headers (default)
                        'table TEMPLATE':   Print output in table format
                        using the given Go template
                        'json':             Print in JSON format
                        'TEMPLATE':         Print output using the given
                        Go template.
                        Refer to https://docs.docker.com/go/formatting/
                        for more information about formatting output with
                        templates
      --no-stream       Disable streaming stats and only pull the first result
      --no-trunc        Do not truncate output
```

## 三 容器使用

### 3.1 获取镜像

操作指令

```
docker pull ubuntu
```

说明：

* 如果我们本地没有 ubuntu 镜像，我们可以使用 docker pull 命令来载入 ubuntu 镜像

### 3.2 启动容器

操作指令

```
docker run -it ubuntu /bin/bash
```

操作结果

```
C:\Users\83422>docker run -it ubuntu /bin/bash
root@031567981bbd:/#
```

### 3.3 退出交互

```
root@031567981bbd:/# exit
exit
```

### 3.4 查看所有容器

操作指令

```
docker ps -a
```

操作结果

```
C:\Users\83422>docker ps -a
CONTAINER ID   IMAGE                    COMMAND                   CREATED          STATUS                        PORTS     NAMES
031567981bbd   ubuntu                   "/bin/bash"               20 seconds ago   Exited (0) 7 seconds ago
   stupefied_yalow
c271f97774e5   ubuntu                   "/bin/sh -c 'while t…"   28 minutes ago   Exited (137) 27 minutes ago
  recursing_maxwell
34fc40bd0a8d   ubuntu                   "/bin/bash"               29 minutes ago   Exited (0) 28 minutes ago
   focused_driscoll
84d1c02f955e   ubuntu                   "/bin/echo 'Hello wo…"   29 minutes ago   Exited (0) 29 minutes ago
  xenodochial_ishizaka
bdac7461f907   ubuntu                   "/bin/echo 'Hello wo…"   30 minutes ago   Exited (0) 30 minutes ago
  fervent_buck
22aca0b2b568   tomcat:9-jdk8-corretto   "catalina.sh run"         13 hours ago     Exited (143) 12 hours ago
   tomcat
```

### 3.5 启动一个已停止的容器

操作指令

```
docker start stupefied_yalow
```

操作结果

```
C:\Users\83422>docker start stupefied_yalow
stupefied_yalow
```

### 3.6 停止容器

操作指令

```
docker stop stupefied_yalow
```

操作结果

```
C:\Users\83422>docker stop stupefied_yalow
stupefied_yalow
```

### 3.7 重启容器

操作指令

```
docker restart stupefied_yalow
```

操作结果

```
C:\Users\83422>docker restart stupefied_yalow
stupefied_yalow
```

### 3.8 进入容器

操作指令

```
docker attach stupefied_yalow
```

操作结果

```
C:\Users\83422>docker attach stupefied_yalow
root@031567981bbd:/#
```

## 四 参考

* [菜鸟教程—Docker 容器使用](https://www.runoob.com/docker/docker-container-usage.html)

