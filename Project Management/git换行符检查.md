# git换行符检查

一、AutoCRLF
```
#提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

#提交时转换为LF，检出时不转换
git config --global core.autocrlf input

#提交检出均不转换
git config --global core.autocrlf false
```


二、SafeCRLF
```
#拒绝提交包含混合换行符的文件
git config --global core.safecrlf true

#允许提交包含混合换行符的文件
git config --global core.safecrlf false

#提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```


如果你是Windows程序员，且正在开发仅运行在Windows上的项目，可以如下进行设置，取消换行符检查功能（core.safecrlf）：
```
[core]
	safecrlf = false
```

参考链接：
http://blog.csdn.net/feng88724/article/details/11600375




