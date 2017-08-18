# git常用命令

拉取
```
git pull --rebase
```

提交（no message）
```
git commit -m "no message"
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

丢弃未跟踪文件
```
OLDIFS=$IFS;
IFS=$'\n';
for f in $FILENAMES;
do git clean -f "$f";
done;
IFS=$OLDIFS
```

删除空文件夹和未跟踪文件
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



