# 入门

获取一周的提交：
```
git log --pretty=format:"%an: %s" --since=1.weeks
```

获取具体某一天开始的提交：
```
git log --pretty=format:"%an: %s" --since="2008-10-01"
```

获取具体某一天开始到某一天结束的提交：
```
git log --pretty=format:"%an: %s" --since="2008-10-01" --before="2008-11-01"
```

从远程仓库抓取最新数据，并查看远程仓库的日志：
```
git fetch origin
git log origin --pretty=format:"%an: %s"
```

过滤merge commit：
默认情况下git log会输出merge commit.  你可以通过--no-merges标记来过滤掉merge commit:
```
git log --no-merges
```
如果你只对merge commit感兴趣可以使用--merges:
```
git log --merges
```


> 参考来源：
> https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2
> http://git.oschina.net/progit/2-Git-%E5%9F%BA%E7%A1%80.html




# 表格列出一些 format 支持的选项

```
选项 说明
    %H 提交对象（commit）的完整哈希字串
    %h 提交对象的简短哈希字串
    %T 树对象（tree）的完整哈希字串
    %t 树对象的简短哈希字串
    %P 父对象（parent）的完整哈希字串
    %p 父对象的简短哈希字串
    %an 作者（author）的名字
    %ae 作者的电子邮件地址
    %ad 作者修订日期（可以用 -date= 选项定制格式）
    %ar 作者修订日期，按多久以前的方式显示
    %cn 提交者(committer)的名字
    %ce 提交者的电子邮件地址
    %cd 提交日期
    %cr 提交日期，按多久以前的方式显示
    %s 提交说明
```



# 实战

print git log.bat
```
@echo off
cd /d F:\pxp1230.github.io\.git
setlocal
PATH="C:\Program Files (x86)\Git\cmd"
set PATH>nul
git fetch origin
git --no-pager log origin --pretty=format:"%%s	%%an	%%ad" --date=short --since=1.weeks
::git --no-pager log：不加--no-pager参数的话，必须按Q才能退出
::转义符号：如果要显示%本身时，需要在前面用%来转义
::%s：提交信息
::%an：作者
::%ad：提交日期
```

获取最近一周的提交报告.bat
```
@echo off
cd 获取最近一周的提交报告
WeekReport>..\获取最近一周的提交报告.txt
```

Program.cs
```
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Diagnostics;
using System.Windows.Forms;

class Program
{
    [STAThread]
    static void Main(string[] args)
    {
        DirectoryInfo di = new DirectoryInfo(Environment.CurrentDirectory);
        FileInfo[] files = di.GetFiles("*.bat");
        if (files.Length == 1)
        {
            Process p = new Process();
            p.StartInfo.FileName = files[0].FullName;
            p.StartInfo.CreateNoWindow = true;
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.RedirectStandardInput = true;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.StandardOutputEncoding = Encoding.UTF8;
            p.Start();
            string output = p.StandardOutput.ReadToEnd();
            p.WaitForExit();
            p.Close();
            StringBuilder sb = new StringBuilder();
            string[] lines = output.Split('\n');
            for (int i = 0; i < lines.Length; i++)
            {
                string[] cells = lines[i].Split('\t');
                if (!cells[0].StartsWith("no message") && !cells[0].StartsWith("Merge branch"))
                {
                    string newLine = "";
                    DateTime dt = new DateTime();
                    if (DateTime.TryParse(cells[2], out dt))
                    {
                        newLine += dt.ToString("yyyy/MM/dd") + "\t" + cells[1] + "\t" + cells[0];
                        sb.AppendLine(newLine);
                    }
                }
            }
            Clipboard.Clear(); //用前用后记得清除剪贴板
            if (sb.Length > 0)
                Clipboard.SetText(sb.ToString());
            else
                Clipboard.SetText("没有记录！");
        }
    }
}
```













