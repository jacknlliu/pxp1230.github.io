## 空中滑翔Camera脚本 ##
	using System;
	using UnityEngine;
	
	/// <summary>
	/// Main Camera作为FlyingScript的子物体
	/// </summary>
	public class FlyingScript : MonoBehaviour
	{
	    public float maxSpeed = 20;
	    private float moveSpeed;
	    public Transform mainCamera;
	
	    void Update()
	    {
	        if (Input.GetKeyDown("up"))
	        {
	            maxSpeed += 10f;
	        }
	        if (Input.GetKeyDown("down"))
	        {
	            maxSpeed -= 10f;
	        }
	        moveSpeed = maxSpeed;
	        Vector3 eulerAngles = mainCamera.localRotation.eulerAngles;
	        float x = mainCamera.localRotation.eulerAngles.x;
	        if (x > 180f)
	        {
	            x -= 360f;
	        }
	        transform.Rotate(x / 9f * Time.deltaTime, 0f, 0f, Space.Self);
	        Vector3 euler = transform.rotation.eulerAngles;
	        euler.y = mainCamera.localRotation.eulerAngles.y;
	        euler.z = mainCamera.localRotation.eulerAngles.z;
	        transform.rotation = Quaternion.Euler(euler);
	        transform.position += (Vector3)((mainCamera.forward * moveSpeed) * Time.deltaTime);
	    }
	}

