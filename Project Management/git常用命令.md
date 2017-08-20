# git常用命令

不常用/列出所有本地分支和跟踪哪个远程分支
```
git branch -vv
```

不常用/设置master分支跟踪远程master分支
```
git branch -u origin/master
```

不常用/将当前分支重置到HEAD
```
git reset --hard
```

储藏并拉取
```
git stash;
git pull
```

提取储藏
```
git stash apply
```

不常用/清空储藏
```
git stash clear
```

提交（no message）
```
git commit -m "no message"
```

提交（no message）并推送
```
git commit -m "no message";
git push
```

丢弃修改（Git GUI已有，Ctrl+J）
```
OLDIFS=$IFS;
IFS=$'\n';
for f in $FILENAMES;
do git checkout -- "$f";
done;
IFS=$OLDIFS
```

不常用/丢弃未跟踪文件
```
OLDIFS=$IFS;
IFS=$'\n';
for f in $FILENAMES;
do git clean -f "$f";
done;
IFS=$OLDIFS
```

不常用/删除空文件夹和未跟踪文件
```
git clean -fd
```

在文件资源管理器中打开
```
explorer /select,$(cygpath -w ${PWD}"/"${FILENAME})
```



# git常用变量

查看当前所有可用的环境变量：输入 set 即可查看
```
$FILENAME
$FILENAMES
$PWD
```



