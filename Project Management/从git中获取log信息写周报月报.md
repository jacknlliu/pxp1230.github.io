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

> 参考来源：
> https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2




# 表格列出一些 format 支援的選項

選項	選項的說明
%H	該更新的SHA1雜湊值
%h	該更新的簡短SHA1雜湊值
%T	存放該更新的根目錄的Tree物件的SHA1雜湊值
%t	存放該更新的根目錄的Tree物件的簡短SHA1雜湊值
%P	該更新的父更新的SHA1雜湊值
%p	該更新的父更新的簡短SHA1雜湊值
%an	作者名字
%ae	作者電子郵件
%ad	作者的日期 (格式依據 date 選項而不同)
%ar	相對於目前時間的作者的日期
%cn	提交者的名字
%ce	提交者的電子郵件
%cd	提交的日期
%cr	相對於目前時間的提交的日期
%s	提交信息



# 实战

print git log.bat
```
@echo off
cd /d F:\pxp1230.github.io\.git
setlocal
PATH="C:\Program Files (x86)\Git\cmd"
set PATH>nul
git --no-pager log --pretty=format:"%%s	%%an	%%ad" --date=short --since=1.weeks
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













