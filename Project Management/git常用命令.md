# git常用命令

查看该文件历史（2条）（不能放到Tools，因为会乱码）
```
git log -2 -- "文件相对路径或绝对路径"
```

查看该文件历史（2星期）（不能放到Tools，因为会乱码）
```
git log --since=2.weeks -- "文件相对路径或绝对路径"
```

不常用/回滚该文件到指定提交
```
git checkout $ARGS "$FILENAME"
```

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

拉取
```
git pull
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



# C:\\Users\\Administrator\\.gitconfig

```
[guitool "提交（no message）"]
	cmd = git commit -m \"no message\"
[guitool "在文件资源管理器中打开"]
	cmd = explorer /select,$(cygpath -w ${PWD}\"/\"${FILENAME})
	noconsole = yes
	needsfile = yes
[guitool "不常用/列出所有本地分支和跟踪哪个远程分支"]
	cmd = git branch -vv
[guitool "不常用/设置master分支跟踪远程master分支"]
	cmd = git branch -u origin/master
[guitool "不常用/将当前分支重置到HEAD"]
	cmd = git reset --hard
[guitool "储藏并拉取"]
	cmd = "git stash;\ngit pull"
[guitool "提取储藏"]
	cmd = git stash apply
[guitool "不常用/清空储藏"]
	cmd = git stash clear
[guitool "提交（no message）并推送"]
	cmd = "git commit -m \"no message\";\ngit push"
[guitool "不常用/删除空文件夹和未跟踪文件"]
	cmd = git clean -fd
[guitool "不常用/丢弃未跟踪文件"]
	cmd = "OLDIFS=$IFS;\nIFS=$'\\n';\nfor f in $FILENAMES;\ndo git clean -f \"$f\";\ndone;\nIFS=$OLDIFS"
[guitool "拉取"]
	cmd = git pull
[guitool "不常用/回滚该文件到指定提交"]
	cmd = git checkout $ARGS \"$FILENAME\"
	needsfile = yes
	argprompt = yes
```






