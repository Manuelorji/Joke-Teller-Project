const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS.speech({
//   key: "16ffecea93ee40cd8b6f73276744f2b8",
//   src: "A mad man once said he won't say anything until his head is cut off",
//   hl: "en-us",
//   v: "Linda",
//   r: 0,
//   c: "mp3",
//   f: "44khz_16bit_stereo",
//   ssml: false,
// });

// disable/enable toggle button function
function toggleButton() {
  button.disabled = !button.disabled;
}
// passing joke to voiceRss Api
function tellMe(joke) {
  VoiceRSS.speech({
    key: "16ffecea93ee40cd8b6f73276744f2b8",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

// getJokes();
// EventListeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
