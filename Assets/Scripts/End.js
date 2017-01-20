#pragma strict

import UnityEngine.SceneManagement;
import UnityEngine.EventSystems;

var score = 0;
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

function ChooseAnother() {
	Debug.Log("Choose Another");
	SceneManager.LoadScene(1);
}

function Retry() {
	Debug.Log("Retry");
	SceneManager.LoadScene(songLevels[songIndex]);
}

function Start () {
	Debug.Log("started");
	var scoreObject = GameObject.Find("ScoreObject");
	var scoreScript = scoreObject.GetComponent(Score);
	score = scoreScript.score;
	songIndex = scoreScript.songIndex;

	GameObject.Find("Score").GetComponent(UI.Text).text = "" + score;


	Debug.Log(score);
}

function Update () {

}