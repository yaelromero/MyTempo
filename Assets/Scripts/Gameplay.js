#pragma strict

import System.IO;
import UnityEngine.UI;

var songLabels = [
    "HallelujahChorus_Labels.txt",
    "OdeToJoy_Labels.txt",
    "Spring_Labels.txt",
    "PianoConcerto_Labels.txt",
    "SymphonyNo8_Labels.txt",
    "WaltzOfTheFlowers_Labels.txt",
    "RideOfTheValkyries_Labels.txt",
    "Nocturne_Labels.txt"
];

var songObjects = [
  "Hallelujah",
  "OdeToJoy",
  "Spring",
  "PianoConcerto",
  "Symphony",
  "WaltzOfTheFlowers",
  "RideOfTheValkyries",
  "Nocturne"  
];

var instruction = [
	5, 5, 5, 6, 6, 6, 7, 8
];

var readyTimes = [
	6.5,
	7.5,
	8.5,
	14.5,
	4.5,
	8.5,
	9.5,
	6.5
];

var startTimes = [
	6.6,
	7.6,
	8.6,
	14.6,
	4.6,
	8.6,
	9.6,
	6.6
];

var endTimes = [
  76, 
  90, 
  69, 
  53, 
  45, 
  43, 
  71, 
  49
];



static var times : float[] = new float[248];
static var audioSource : AudioSource;
var songIndex = -1;
static var score = 0;

function Start() {

	if (songIndex == -1) {
    	Debug.Log("started");
		var songChoice = GameObject.Find("SongChoice");
		var songChoiceScript = songChoice.GetComponent(SongChoice);
		songIndex = songChoiceScript.songChoice;
    Debug.Log("SongChoice " + songIndex);
    }

	if(gameObject.name.Contains("Start")) {
		gameObject.GetComponent(Renderer).enabled = false;
		StartCoroutine(ShowStart(startTimes[songIndex]));		
		StartCoroutine(EndSong(endTimes[songIndex]));
    return;
	}

	else if(gameObject.name.Contains("Ready")) {
    	gameObject.SetActive(true);
		StartCoroutine(ShowReady(readyTimes[songIndex]));	
    	return;
	}

	else if(songObjects.IndexOf(songObjects, gameObject.name) != -1) {
		gameObject.GetComponent.<AudioSource>().Stop();
		StartSong();
  	}

  	else if(gameObject.name.Contains("Resume")) {
  		gameObject.GetComponent(Image).enabled = false;
  		gameObject.GetComponent(Button).enabled = false;
  	}

  	else if(gameObject.name.Contains("Restart")) {
  		gameObject.GetComponent(Image).enabled = false;
  		gameObject.GetComponent(Button).enabled = false;
  	}

  	else if(gameObject.name.Contains("QuitSong")) {
  		gameObject.GetComponent(Image).enabled = false;
  		gameObject.GetComponent(Button).enabled = false;
  	}

}

function ShowStart(waitTime : float) {

	yield WaitForSeconds(waitTime);
	
	gameObject.GetComponent(Renderer).enabled = true;
  score = 0;
	StartCoroutine(TurnOff(0.8));
}

function ShowReady(waitTime : float) {

	yield WaitForSeconds(waitTime);
	
	gameObject.GetComponent(Renderer).enabled = false;
}

function EndSong(waitTime : float) {

  yield WaitForSeconds(waitTime);

  Debug.Log("Song ending...");
  var scoreObject = GameObject.Find("ScoreObject");
  var scoreObjectScript = scoreObject.GetComponent(Score);
  scoreObjectScript.score = score;
  scoreObjectScript.songIndex = songIndex;
  scoreObject.DontDestroyOnLoad(scoreObject);

  // Load score selection screen
  SceneManager.LoadScene(13);
}

function TurnOff(waitTime : float) {

	yield WaitForSeconds(waitTime);
	
	gameObject.GetComponent(Renderer).enabled = false;
}

function StartSong() {
    if (songObjects[songIndex] == gameObject.name) {
        // Activate the appropriate song
        audioSource = gameObject.GetComponent.<AudioSource>();
        gameObject.SetActive(true);
        audioSource.Play();
        
        // Read labels for the song
        times = Read(songIndex);      
    }
    else {
        gameObject.SetActive(false);
        gameObject.GetComponent.<AudioSource>().Stop();
        return;
    }
}

// Return an array of timestamps
function Read (songIndex: int) {

    var times : float[] = new float[248];
    try {
        // Create instance of StreamReader to read from a file
        var sr = new StreamReader(Application.dataPath + "/Audio/Labels/" + songLabels[songIndex]);
        // Read and get timestamp from the file until the end of the
        // file is reached
        var line = sr.ReadLine();
        var i = 0;
        while (line != null) {
            var timestamps = line.Split('\t'[0]);
            times[i++] = parseFloat(timestamps[0]);

            line = sr.ReadLine();
        }
        sr.Close();
        return times;
    }
    catch (e) {
        // Let user know what went wrong
        print("The file could not be read");
        Debug.LogException(e);
        return times;
    }
}

function Star(beatIndex: int) {
    if (!audioSource.isPlaying || audioSource.time < startTimes[songIndex])
        return;
      
    var mostRecentLabel = binaryIndexOf(audioSource.time);
    if (mostRecentLabel % 4 == beatIndex) {
        score += 5;
        GameObject.Find("Score").GetComponent(UI.Text).text = "" + score;
        Debug.Log("beat" + beatIndex+1);
        // Update score text field
        // Make star bigger/change color
    }
}

function Star34(beatIndex: int) {
    if (!audioSource.isPlaying || audioSource.time < startTimes[songIndex])
        return;
      
    var mostRecentLabel = binaryIndexOf(audioSource.time);
    if (mostRecentLabel % 3 == beatIndex) {
        score += 5;
        GameObject.Find("Score").GetComponent(UI.Text).text = "" + score;
        Debug.Log("beat" + beatIndex+1);
        // Update score text field
        // Make star bigger/change color
    }
}

function Star98(beatIndex: int) {
    if (!audioSource.isPlaying || audioSource.time < startTimes[songIndex])
        return;
      
    var mostRecentLabel = binaryIndexOf(audioSource.time);
    if (mostRecentLabel % 9 == beatIndex) {
        score += 5;
        GameObject.Find("Score").GetComponent(UI.Text).text = "" + score;
        Debug.Log("beat" + beatIndex+1);
        // Update score text field
        // Make star bigger/change color
    }
}

function Star128(beatIndex: int) {
    if (!audioSource.isPlaying || audioSource.time < startTimes[songIndex])
        return;
      
    var mostRecentLabel = binaryIndexOf(audioSource.time);
    if (mostRecentLabel % 12 == beatIndex) {
        score += 5;
        GameObject.Find("Score").GetComponent(UI.Text).text = "" + score;
        Debug.Log("beat" + beatIndex+1);
        // Update score text field
        // Make star bigger/change color
    }
}

// Modified from - http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
/**
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not found.
 */
function binaryIndexOf(searchTime : float) { 
    var minIndex = 0;
    var maxIndex = times.length - 1;
    var currentIndex : int;
    var currentTime : float;
 
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentTime = times[currentIndex];
 
        if (currentTime < searchTime && currentTime > 0) {
            if (times[currentIndex+1] > searchTime) {
                return currentIndex;
            }
            minIndex = currentIndex + 1;
        }
        else if (currentTime > searchTime || currentTime <= 0) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}

function Update() {
	if (Input.GetKeyDown("p") && audioSource.time > startTimes[songIndex]) {
		Debug.Log("p");
		var renderers : Renderer[] = FindObjectsOfType(Renderer) as Renderer[];
		for(var renderer : Renderer in renderers) {
			renderer.enabled = false;
		}
		var images : Image[] = FindObjectsOfType(Image) as Image[];
		for(var image : Image in images) {
			image.enabled = false;
		}
		var buttons : Button[] = FindObjectsOfType(Button) as Button[];
		for(var button : Button in buttons) {
			button.enabled = false;
		}

		gameObject.Find("Curtains").GetComponent(Renderer).enabled = true;
		gameObject.Find("Restart").GetComponent(Image).enabled = true;
		gameObject.Find("Restart").GetComponent(Button).enabled = true;
		gameObject.Find("Resume").GetComponent(Image).enabled = true;
		gameObject.Find("Resume").GetComponent(Button).enabled = true;
		gameObject.Find("QuitSong").GetComponent(Image).enabled = true;
		gameObject.Find("QuitSong").GetComponent(Button).enabled = true;

		audioSource.Pause();

	}
}

function Resume() {
	Debug.Log("Resume");
	var renderers : Renderer[] = FindObjectsOfType(Renderer) as Renderer[];
	for(var renderer : Renderer in renderers) {
		renderer.enabled = true;
	}
	var images : Image[] = FindObjectsOfType(Image) as Image[];
	for(var image : Image in images) {
		image.enabled = true;
	}
	var buttons : Button[] = FindObjectsOfType(Button) as Button[];
	for(var button : Button in buttons) {
		button.enabled = true;
	}

	gameObject.Find("Curtains").GetComponent(Renderer).enabled = true;
	gameObject.Find("Ready").GetComponent(Renderer).enabled = false;
	gameObject.Find("Start").GetComponent(Renderer).enabled = false;
	gameObject.Find("Restart").GetComponent(Image).enabled = false;
	gameObject.Find("Restart").GetComponent(Button).enabled = false;
	gameObject.Find("Resume").GetComponent(Image).enabled = false;
	gameObject.Find("Resume").GetComponent(Button).enabled = false;
	gameObject.Find("QuitSong").GetComponent(Image).enabled = false;
	gameObject.Find("QuitSong").GetComponent(Button).enabled = false;

	audioSource.Play();
}

function QuitSong() {
	SceneManager.LoadScene(1);
}

function Restart() {
	SceneManager.LoadScene(instruction[songIndex]);
}