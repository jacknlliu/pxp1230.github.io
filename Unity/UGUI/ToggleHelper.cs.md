## ToggleHelper.cs ##

	using UnityEngine;
	using System.Collections;
	using UnityEngine.EventSystems;
	using UnityEngine.UI;
	using UnityEngine.Events;

	[RequireComponent(typeof(Toggle))]
	public class ToggleHelper : MonoBehaviour
	{
	    public Text text;
	    public Image uncheckMark;
	    public EventTrigger.TriggerEvent OnTurnOn;
	    BaseEventData eventData;
	    Toggle toggle;

	    void Start()
	    {
	        toggle = GetComponent<Toggle>();
	        toggle.onValueChanged.AddListener(OnToggleChanged);
	        eventData = new BaseEventData(EventSystem.current);
	        OnToggleChanged(toggle.isOn);
	        if (!text)
	        {
	            text = GetComponentInChildren<Text>();
	        }
	    }

	    void OnToggleChanged(bool isOn)
	    {
	        if (isOn)
	        {
	            eventData.selectedObject = gameObject;
	            OnTurnOn.Invoke(eventData);
	        }
	        if (uncheckMark)
	            uncheckMark.gameObject.SetActive(!isOn);
	    }
	}
