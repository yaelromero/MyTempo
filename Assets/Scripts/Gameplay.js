#pragma strict

import UnityEngine.SceneManagement;
import UnityEngine.EventSystems;
import UnityEditor;

var songIndex = 0;
var songIndices = {
	"Hallelujah": 0,
	"OdeToJoy": 1,
	"Spring": 2,
	"PianoConcerto": 3,
	"Symphony": 4,
	"WaltzOfTheFlowers": 5,
	"RideOfTheValkyries": 6,
	"Nocturne": 7
};

var songLevels = [
	9, 9, 9, 10, 10, 10, 11, 12
];

function Continue() {
	Debug.Log("clicked");
	var songChoice = GameObject.Find("SongChoice");
	songChoice.DontDestroyOnLoad(songChoice);
	SceneManager.LoadScene(songLevels[songIndex]);
}

function Start () {
	Debug.Log("started");
	var songChoice = GameObject.Find("SongChoice");
	var songChoiceScript = songChoice.GetComponent(SongChoice);
	songIndex = songChoiceScript.songChoice;
	Debug.Log(songIndex);
}

function Update () {

}