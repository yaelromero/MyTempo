#pragma strict
import UnityEngine.SceneManagement;
import UnityEngine.EventSystems;
import UnityEditor;

var level = 0;

function NextPage() {
	Debug.Log("clicked");
	SceneManager.LoadScene(++level);
}

function PreviousPage() {
	SceneManager.LoadScene(--level);
}

function Exit() {
	Debug.Log("quit");
	if(EditorApplication.isPlaying) {
		EditorApplication.isPlaying = false;
	}
	else {
		Application.Quit();
	}
}

function Start() {
	Debug.Log("started");
}

function Update() {

}

function OnMouseDown() {
	Debug.Log("clicked2");
}