const songs = [
    {
        id: 1,
        title: " MIC DROP",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/1.jpg",
        src: "audio/1.mp3"
    },
    {
        id: 2,
        title: "Boy with LUV",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/2.jpg",
        src: "audio/2.mp3"
    },
    {
        id: 3,
        title: "  Fire",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/3.jpg",
        src: "audio/3.mp3"
    },
    {
        id: 4,
        title: "Fake Love",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/4.jpg",
        src: "audio/4.mp3"
    },
    {
        id: 5,
        title: "IDOL",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/5.jpg",
        src: "audio/5.mp3"
    },
    {
        id: 6,
        title: "Butter",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/6.jpg",
        src: "audio/6.mp3"
    },
    {
        id: 7,
        title: " Dynamite",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/7.jpg",
        src: "audio/7.mp3"
    },
    {
        id: 8,
        title: " Home",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/8.jpg",
        src: "audio/8.mp3"
    },
    {
        id: 9,
        title: "Life goes on",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/9.jpg",
        src: "audio/9.mp3"
    },
    {
        id: 10,
        title: " Blood Sweat & Tears",
        artist: "RM,Jin,Jhope,Suga,<br>Jimin,V,JK",
        img: "images/10.jpg",
        src: "audio/10.mp3"
    },
    {
        id: 11,
        title: " Still Life",
        artist: "RM",
        img: "images/11.jpg",
        src: "audio/11.mp3"
    },
    {
        id: 12,
        title: "  Epiphany ",
        artist: "Jin",
        img: "images/12.jpg",
        src: "audio/12.mp3"
    },
    {
        id: 13,
        title: "  Arson",
        artist: "Jhope",
        img: "images/13.jpg",
        src: "audio/13.mp3"
    },
    {
        id: 14,
        title: " August D",
        artist: "Suga",
        img: "images/14.jpg",
        src: "audio/14.mp3"
    },
    {
        id: 15,
        title: " Filter",
        artist: "Jimin",
        img: "images/15.jpg",
        src: "audio/15.mp3"
    },
    {
        id: 16,
        title: "Singularity",
        artist: "V",
        img: "images/16.jpg",
        src: "audio/16.mp3"
    },
    {
        id: 17,
        title: " Dreamers",
        artist: "JK",
        img: "images/17.jpg",
        src: "audio/17.mp3"
    },
    {
        id: 18,
        title: " Seven",
        artist: "JK",
        img: "images/18.jpg",
        src: "audio/18.mp3"
    },
    {
        id: 19,
        title: "  Daechwita",
        artist: "Suga",
        img: "images/19.jpg",
        src: "audio/19.mp3"
    },
    {
        id: 20,
        title: "  Wild Flower ",
        artist: "RM",
        img: "images/20.jpg",
        src: "audio/20.mp3"
    },
];

const audioPlayer = document.getElementById('audioPlayer');
const masterPlay = document.getElementById('masterPlay');
const currentStart = document.getElementById('currentStart');
const currentEnd = document.getElementById('currentEnd');
const seek = document.getElementById('seek');
const bar2 = document.getElementById('bar2');
const vol = document.getElementById('vol');
const volIcon = document.getElementById('vol_icon');
const volDot = document.getElementById('vol_dot');

// Handle play button click for each song
document.querySelectorAll('.playlistPlay').forEach((playButton, index) => {
    playButton.addEventListener('click', () => {
        const song = songs[index];
        audioPlayer.src = song.src;
        audioPlayer.play();
        updateMasterPlay(song);
    });
});

function updateMasterPlay(song) {
    // Update the master play section with the song details
    document.querySelector('.master_play img').src = song.img;
    document.querySelector('.master_play h5').innerHTML = `${song.title} <br><div class="subtitle">${song.artist}</div>`;
    // Add the active2 class to animate the wave
    document.querySelector('.wave').classList.add('active2');
    masterPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
}

// Event listener for master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioPlayer.paused || audioPlayer.currentTime <= 0) {
        audioPlayer.play();
        masterPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
        document.querySelector('.wave').classList.add('active2');
    } else {
        audioPlayer.pause();
        masterPlay.classList.replace('bi-pause-fill', 'bi-play-fill');
        document.querySelector('.wave').classList.remove('active2');
    }
});

// Update progress bar and current time
audioPlayer.addEventListener('timeupdate', () => {
    const progress = parseInt((audioPlayer.currentTime / audioPlayer.duration) * 100);
    seek.value = progress;
    bar2.style.width = `${progress}%`;
    currentStart.innerText = formatTime(audioPlayer.currentTime);
    currentEnd.innerText = formatTime(audioPlayer.duration);
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Event listener for seek bar
seek.addEventListener('input', () => {
    audioPlayer.currentTime = (seek.value / 100) * audioPlayer.duration;
});

// Volume control

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const vol = document.querySelector('header .master_play .vol input');
    const volIcon = document.querySelector('header .master_play .vol .bi');
    const volBar = document.querySelector('header .master_play .vol .vol_bar');
    const volDot = document.querySelector('header .master_play .vol .dot');
    const skipStartButton = document.querySelector('.bi-skip-start-fill');
    const skipEndButton = document.querySelector('.bi-skip-end-fill');

    if (audioPlayer && skipStartButton && skipEndButton) {
        // Volume control
        vol.addEventListener('input', () => {
            const volumeValue = vol.value / 100;
            audioPlayer.volume = volumeValue;
            volBar.style.width = `${vol.value}%`;
            volDot.style.left = `${vol.value}%`;

            if (volumeValue === 0) {
                volIcon.classList.replace('bi-volume-up-fill', 'bi-volume-mute-fill');
                volIcon.classList.replace('bi-volume-down-fill', 'bi-volume-mute-fill');
            } else if (volumeValue > 0.5) {
                volIcon.classList.replace('bi-volume-mute-fill', 'bi-volume-up-fill');
                volIcon.classList.replace('bi-volume-down-fill', 'bi-volume-up-fill');
            } else {
                volIcon.classList.replace('bi-volume-mute-fill', 'bi-volume-down-fill');
                volIcon.classList.replace('bi-volume-up-fill', 'bi-volume-down-fill');
            }
        });

        // Skip start button functionality
        skipStartButton.addEventListener('click', () => {
            audioPlayer.currentTime -= 10; // Skip 10 seconds backwards
        });

        // Skip end button functionality
        skipEndButton.addEventListener('click', () => {
            audioPlayer.currentTime += 10; // Skip 10 seconds forwards
        });
    } else {
        console.error('Some elements are missing in the DOM.');
    }
});


