## 向Unity发布的exe传递参数 ##

	using UnityEngine;
	using System.Collections;
	using System;
	using UnityEngine.UI;
	
	public class CommandLine : MonoBehaviour
	{
	    public Text t;
	    static public string[] args;
	    void Start()
	    {
	        args = Environment.CommandLine.Split(' ');
	        foreach (string item in args)
	        {
	            t.text += item + "\n";
	        }
	    }
	}
