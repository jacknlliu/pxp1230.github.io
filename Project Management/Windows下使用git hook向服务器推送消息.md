# Git 钩子

git hook 是 git 提供的事件钩子，能被特定的事件触发后调用。简单点来说，当你执行 pull 或 push 命令时，git hook 就会同时自动执行你所预定的脚本。

钩子都被存储在 Git 目录下的 hooks 子目录中。 也即绝大部分项目中的 .git/hooks 。 当你用 git init 初始化一个新版本库时，Git 默认会在这个目录中放置一些示例脚本。这些脚本除了本身可以被调用外，它们还透露了被触发时所传入的参数。这些示例的名字都是以 .sample 结尾，如果你想启用它们，得先移除这个后缀。

把一个正确命名且可执行的文件放入 Git 目录下的 hooks 子目录中，即可激活该钩子脚本。 这样一来，它就能被 Git 调用。

参考资料：
https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90



# post-receive示例

post-receive
```
#!/bin/sh
echo "executing post-receive"
hooks/post-receive.exe
```

post-receive.bat
```
@echo off
echo AGY
git --no-pager log --pretty=format:"%%an	%%ae	%%s" -1
```

post-receive.exe
```
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            FileInfo file = new FileInfo(Process.GetCurrentProcess().MainModule.FileName);
            file = new FileInfo(file.Directory.FullName + "\\post-receive.bat");
            if (file.Exists)
            {
                Process p = new Process();
                p.StartInfo.FileName = file.FullName;
                p.StartInfo.CreateNoWindow = true;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.RedirectStandardInput = true;
                p.StartInfo.RedirectStandardOutput = true;
                p.StartInfo.StandardOutputEncoding = Encoding.UTF8;
                p.Start();
                string output = p.StandardOutput.ReadToEnd();
                p.WaitForExit();
                p.Close();
                string[] lines = output.Split('\n');
                string arg0, arg1, arg2, arg3;
                arg0 = arg1 = arg2 = arg3 = "";
                if (lines.Length >= 1)
                {
                    arg0 = lines[0].Trim();
                }
                if (lines.Length >= 2)
                {
                    string[] cells = lines[1].Trim().Split('\t');
                    if (cells.Length == 3)
                    {
                        if (!cells[2].StartsWith("no message") && !cells[2].StartsWith("Merge branch"))
                        {
                            arg1 = cells[0];
                            arg2 = cells[1];
                            arg3 = cells[2];
                        }
                    }
                }
                if (lines.Length >= 1)
                {
                    Dns.BeginGetHostEntry("1993.fg0hsj43.gq", (ar) =>
                    {
                        IPHostEntry hostinfo = Dns.EndGetHostEntry(ar);
                        HttpClientDoGet(hostinfo.HostName, arg0, arg1, arg2, arg3);
                    }, null);
                    Thread.Sleep(4000);
                    Process.GetCurrentProcess().Kill();
                }
            }
        }
        public static async void HttpClientDoGet(string hostName, string project, string name, string email, string text)
        {
            if (!string.IsNullOrEmpty(hostName) && !text.StartsWith("no message") && !text.StartsWith("Merge branch"))
            {
                Console.WriteLine("project: " + project);
                string uri = "http://" + hostName + "/git?text=" + System.Web.HttpUtility.UrlEncode(project + "\t" + name + "\t" + email + "\t" + text);
                using (var httpclient = new HttpClient())
                {
                    httpclient.Timeout = new TimeSpan(0, 0, 4);
                    try
                    {
                        Console.WriteLine("GET " + uri);
                        HttpResponseMessage response = await httpclient.GetAsync(uri);
                        if (response.IsSuccessStatusCode)
                        {
                            string responseString = await response.Content.ReadAsStringAsync();
                            Console.WriteLine(responseString);
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.ToString());
                    }
                }
            }
            Process.GetCurrentProcess().Kill();
        }
    }
}
```





