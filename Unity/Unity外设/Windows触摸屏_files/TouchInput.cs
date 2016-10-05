using UnityEngine;
using System.Collections;
using System;
using System.Runtime.InteropServices;
using System.Diagnostics;
using UnityEngine.UI;

static public class WindowsTouchState
{
    static public bool isTouching;
}

[StructLayout(LayoutKind.Sequential, Pack = 1)]
public class TouchInput : MonoBehaviour
{
    [DllImport("TouchOverlay", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
    public static extern int Initialise(string Str);
    [DllImport("TouchOverlay")]
    public static extern bool IsTouching();

    // Use this for initialization
    void Start()
    {
        int ret = Initialise(Application.productName);
    }

    // Update is called once per frame
    void Update()
    {
        WindowsTouchState.isTouching = IsTouching();
    }
}