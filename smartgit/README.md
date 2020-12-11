https://my.oschina.net/monroe/blog/1826556



## git使用指令

// https导致ssl验证问题解决：设置取消ssl验证
git config --global http.sslVerify false

git clone https://101.133.208.118/scm/cad-client/cad-quality-shell.git
// 重置用户和邮箱
git config --global user.name "xuguoyuan"
git config --global user.email "xuguoyuan@gsafety.com"

git config --global --replace-all user.name "xuguoyuan"
git config --global --replace-all user.email "xuguoyuan@gsafety.com" 

// 修改或者删除凭据
进入，删除凭据或者修改凭据
控制面板\用户帐户\凭据管理器



## ssl密钥生成

### 1 生成密钥

```shell
ssh-keygen -t ed25519 -C "xuguoyuan@gsafety.com"
```

路径是默认的即可  记住名称/c/Users/xuguoyuan/.ssh/id_ed25519

输入密码 18255153428xgy

### 2 启动服务

```shell
eval $(ssh-agent -s)
```

### 3 密钥加到服务

```shell
ssh-add ~/.ssh/id_ed25519
```



### 4 找到密钥并复制

自动复制到剪贴板，添加到远程仓库中

```shell
clip < ~/.ssh/id_ed25519.pub
```



### 5 本地仓库链接远程仓库

```shell
ssh -T gogs.gsafety.com
```

输入密码



// https导致ssl验证问题解决：设置取消ssl验证
git config --global http.sslVerify false

git clone https://101.133.208.118/scm/cad-client/cad-quality-shell.git
// 重置用户和邮箱
git config --global user.name "xuguoyuan"
git config --global user.email "xuguoyuan@gsafety.com"

git config --global --replace-all user.name "xuguoyuan"
git config --global --replace-all user.email "xuguoyuan@gsafety.com" 

// 修改或者删除凭据
进入，删除凭据或者修改凭据
控制面板\用户帐户\凭据管理器