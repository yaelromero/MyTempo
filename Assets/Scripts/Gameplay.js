#pragma strict

import System.IO;

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

static var times : float[] = new float[248];
static var audioSource : AudioSource;
static var songIndex = -1;
static var score = 0;

function Start() {

	if (songIndex == -1) {
    	Debug.Log("started");
		var songChoice = GameObject.Find("SongChoice");
		var songChoiceScript = songChoice.GetComponent(SongChoice);
		songIndex = songChoiceScript.songChoice;
		Debug.Log(songIndex);
    }

	if(gameObject.name.Contains("Start")) {
		gameObject.GetComponent(Renderer).enabled = false;
		switch(songIndex) {
			case 0: StartCoroutine(ShowStart(6.6));	break;
			case 1: StartCoroutine(ShowStart(7.6)); break;
			case 2: StartCoroutine(ShowStart(8.6)); break;
			case 3: StartCoroutine(ShowStart(14.6)); break;
			case 4: StartCoroutine(ShowStart(4.6)); break;
			case 5: StartCoroutine(ShowStart(8.6)); break;
			case 6: StartCoroutine(ShowStart(9.6)); break;
			case 7: StartCoroutine(ShowStart(6.6)); break;
		}
		return;
	}

	else if(gameObject.name.Contains("Ready")) {
    	gameObject.SetActive(true);
		switch(songIndex) {
			case 0: StartCoroutine(ShowReady(6.5)); break;
			case 1: StartCoroutine(ShowReady(7.5)); break;
			case 2: StartCoroutine(ShowReady(8.5)); break;
			case 3: StartCoroutine(ShowReady(14.5)); break;
			case 4: StartCoroutine(ShowReady(4.5)); break;
			case 5: StartCoroutine(ShowReady(8.5)); break;
			case 6: StartCoroutine(ShowReady(9.5)); break;
			case 7: StartCoroutine(ShowReady(6.5)); break;
		}
    return;
	}

  else if(songObjects.IndexOf(songObjects, gameObject.name) != -1) {
    gameObject.GetComponent.<AudioSource>().Stop();
    StartSong();
  }


}

function ShowStart(waitTime : float) {

	yield WaitForSeconds(waitTime);
	
	gameObject.GetComponent(Renderer).enabled = true;

	StartCoroutine(TurnOff(0.8));
}

function ShowReady(waitTime : float) {

	yield WaitForSeconds(waitTime);
	
	gameObject.GetComponent(Renderer).enabled = false;
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
    if (!audioSource.isPlaying)
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
 
        if (currentTime < searchTime) {
            if (times[currentIndex+1] > searchTime) {
                return currentIndex;
            }
            minIndex = currentIndex + 1;
        }
        else if (currentTime > searchTime) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}