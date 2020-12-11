## [npm太慢， 淘宝npm镜像使用方法](https://blog.csdn.net/quuqu/article/details/64121812)

### 1.临时使用

```
npm --registry https://registry.npm.taobao.org install express
```

### 2.持久使用

```
npm config set registry https://registry.npm.taobao.org
```

### 3.通过cnpm使用

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

