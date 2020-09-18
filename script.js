const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
};

// Passing joke to VoiceRSS API
function tellMe(joke) {
    // console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '289bbf6d9431495a853771a349b7b1ff',
        src: joke,
        hl: 'en-us',
        v: 'Alice',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //  Text-to-speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // Catch errors here
        console.log('whoops', error);
    }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);