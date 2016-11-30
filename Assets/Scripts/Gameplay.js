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

static var times = [];
static var audio : GameObject;
static var songIndex = -1;

// function Start() {

// 	if (songIndex == -1) {
//     	Debug.Log("started");
// 		var songChoice = GameObject.Find("SongChoice");
// 		var songChoiceScript = songChoice.GetComponent(SongChoice);
// 		songIndex = songChoiceScript.songChoice;
// 		Debug.Log(songIndex);
//     }

// 	if(gameObject.name.Contains("Start")) {
// 		gameObject.GetComponent(Renderer).enabled = false;
// 		StartCoroutine(ShowStart(2.0));
// 		return;
// 	}

// 	else if(gameObject.name.Contains("Ready")) {
// 		StartSong(songIndex);
// 		StartCoroutine(ShowReady(2.0));
// 	}


// }

// function ShowStart(waitTime : float) {

// 	yield WaitForSeconds(waitTime);
	
// 	gameObject.GetComponent(Renderer).enabled = true;

// 	StartCoroutine(TurnOff(1.0));
// }

// function ShowReady(waitTime : float) {

// 	yield WaitForSeconds(waitTime);
	
// 	gameObject.GetComponent(Renderer).enabled = false;
// }

// function TurnOff(waitTime : float) {

// 	yield WaitForSeconds(waitTime);
	
// 	gameObject.GetComponent(Renderer).enabled = false;
// }

// function StartSong(songIndex) {
//     if (songObjects[songIndex] == gameObject.name) {
//         // Activate the appropriate song
//         audio = gameObject;
//         audio.SetActive(true);
//         audio.Play();
        
//         // Read labels for the song
//         times = Read(songIndex);        
//     }
//     else {
//         gameObject.SetActive(false);
//         return;
//     }
// }

// // Return an array of timestamps
// function Read (songIndex) {
//     try {
//         // Create instance of StreamReader to read from a file
//         var sr = new StreamReader("../Audio/Labels/" + songLabels[songIndex]);
        
//         // Read and get timestamp from the file until the end of the
//         // file is reached
//         var line = sr.ReadLine();
//         var times = [];
//         var i = 0;
//         while (line != null) {
//             var timestamps = line.split('\t');
//             times[i++] = parseFloat(timestamps[0]);
//             line = sr.ReadLine();
//         }
//         sr.Close();
//         return times;
//     }
//     catch (e) {
//         // Let user know what went wrong
//         print("The file could not be read");
//         print(e.message);
//     }
// }

// function Star() {
//     if (!audio.isPlaying)
//         return;
        
//     var mostRecentLabel = binaryIndexOf(audio.time);
//     if (mostRecentLabel % beatIndex) {
//         score += 5;
//         // Update score text field
//         // Make star bigger/change color
//     }
// }

// // Modified from - http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
// /**
//  * Performs a binary search on the host array. This method can either be
//  * injected into Array.prototype or called with a specified scope like this:
//  * binaryIndexOf.call(someArray, searchElement);
//  *
//  * @param {*} searchElement The item to search for within the array.
//  * @return {Number} The index of the element which defaults to -1 when not found.
//  */
// function binaryIndexOf(searchTime) { 
//     var minIndex = 0;
//     var maxIndex = times.length - 1;
//     var currentIndex;
//     var currentTime;
 
//     while (minIndex <= maxIndex) {
//         currentIndex = (minIndex + maxIndex) / 2 | 0;
//         currentTime = times[currentIndex];
 
//         if (currentTime < searchTime) {
//             if (times[currentIndex+1] > searchTime) {
//                 return currentIndex;
//             }
//             minIndex = currentIndex + 1;
//         }
//         else if (currentTime > searchTime) {
//             maxIndex = currentIndex - 1;
//         }
//         else {
//             return currentIndex;
//         }
//     }
 
//     return -1;
// }