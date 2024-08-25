
const weirdVideoIds = {
    100: 'uaDQB8lOlTk',  //     League
    101: 'qbBNE5eOT_8',  //     Scissor Seven
    102: 'jErmQdQs4_4',  //     Livecom
    103: 'lmaQt5WcUcw',  //     Study
    104: 'EmFAmTNxSuM',  //     Fitness
    105: 'gdZLi9oWNZg',  //     BTS - Dynamite
    106: 'M4zeVrWsTHE',  //     Fiebertraum
    107: 'U_pa4E23elQ',  //     News
    108: 'lX44CAz-JhU',  //     The Wolf
    109: '1s58rW0_LN4',  //     Bob Ross
    110: 'qOs9b1vTo4s',  //     J Talent
    111: 'dWEJNi8NdGA',  //     The Gentlemen's Guide To Knife Fighting - Rude Waiter
    112: '1KxDVAUghWY',  //     Japanese Dance
    113: 'wUpBrALhlnc',  //     Ruin your Life
    114: 'MRAZ_mSLXrA',  //     Taste New York
    115: 'WHHmIfog0Fs',  //     Catventures
    116: 'pjkOB8rXs6E',  //     Tooboe
    117: 'IDYxLj3bYds',  //     Twins in Paradise
    118: 'E0Xl1f-fXLo',  //     Sumo
    119: 'NjahiPD445k',  //     AOT
    120: 'Unzc731iCUY',  //     Going to the Store
    121: 'hkHCnZ5GrNc',  //     Car of Scooters
    122: 'k-HBorb_bqQ',  //     Rick Roll
    123: 'EuySE6259wQ',  //     Mukbang
    124: 'vynUmJwSzn0',  //     Osu!
    125: 'To2Vsflb42I',  //     Takeshis Castle
    126: 's363Jfv7p74',  //     Pranks
    127: 'zt2uIhAvQZ8',  //     Broom Commercial
    128: 'GmYVfyqzu4Y',  //     Commercials
    129: 'FeJKJ5MoCHY',  //     Animals
    130: 'IrRRTiwoGx8',  //     Flute 
    131: 'AkoML0_FiV4',  //     Sonder
    132: 'kc-z_lBNyV0',  //     Samstigs Jass
    133: 'rn4FY_k9FyE',  //     Seven Samurai
    134: '8d_INVOZ7x4',  //     ASDF
    135: '6riDJMI-Y8U',  //     JuJu Kaisen
    136: 'FQAyoaa18J0',  //     Penny
    137: 'g3p2TZ5q9to',  //     Stop Motion Parkour
    138: 'hiCaS9JfCUw',  //     Weather
    139: '6DYJXSSgW08',  //     Japanese Gameshow
    140: 'ktlsjmjgUIk',  //     Jeux Olympiques
    // ... add more channels and videos as needed
  };

  let currentChannel = 137;
let staticNoiseAudio = new Audio('https://hikaru.ch/music/zapp.mp3');
staticNoiseAudio.loop = true;

function getRandomStartTime(videoDuration) {
    return Math.floor(Math.random() * videoDuration);
}

const videoDuration = 300;

function changeChannel(direction) {
    
    if (direction === 'next') {
        currentChannel++;
    } else if (direction === 'prev') {
        currentChannel--;
    } else if (direction === 'random') {
        currentChannel = Math.floor(Math.random() * Object.keys(weirdVideoIds).length) + 100;
    }

    if (currentChannel > Math.max(...Object.keys(weirdVideoIds))) currentChannel = 100;
    if (currentChannel < 100) currentChannel = Math.max(...Object.keys(weirdVideoIds));

    document.getElementById('channel-number').textContent = `CH.${currentChannel}`;
    
    const videoId = weirdVideoIds[currentChannel] || weirdVideoIds[100];
    const randomStartTime = getRandomStartTime(videoDuration);

    console.log(`Channel: ${currentChannel}, Video ID: ${videoId}, Start Time: ${randomStartTime}`);

    document.getElementById('loader').style.display = 'block';
    staticNoiseAudio.play();
    
    document.getElementById('video-frame').style.opacity = '0';
    
    document.getElementById('video-frame').src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&start=${randomStartTime}`;

    document.getElementById('video-frame').onload = function() {
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            staticNoiseAudio.pause();
            staticNoiseAudio.currentTime = 0;
            document.getElementById('video-frame').style.opacity = '1';
        }, 1000);
    };
    
    applyGlitchEffect();
}

function applyGlitchEffect() {
    const channelDisplay = document.getElementById('channel-number');
    channelDisplay.classList.add('glitch');
    setTimeout(() => {
        channelDisplay.classList.remove('glitch');
    }, 1000);
}

changeChannel('random');