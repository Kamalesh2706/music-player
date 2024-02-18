const image = document.querySelector('img');
const title =document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL= document.getElementById('current-time');
const durationEL = document.getElementById('duration');
const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let isplaying = false ;

const songs = [
    {
        name:'leo-1',
        displayName:'Badass Glimpse',
        artist:'Anirudh',
    },
    {
        name:'leo-2',
        displayName:'Bloody Sweet',
        artist:'Anirudh',
    },
    {
        name:'leo-3',
        displayName:'Naa ready',
        artist:'Anirudh',
    },
    {
        name:'leo-4',
        displayName:'Anbenum',
        artist:'Anirudh',
    },
    {
        name:'antonydas-1',
        displayName:'Antony Das Glimpse',
        artist:'Anirudh',
    },
    {
        name:'harloddas-1',
        displayName:'Harlod Das Glimpse',
        artist:'Anirudh',
    },
];

function  playSong(){
isplaying = true;
playBtn.classList.replace('fa-play','fa-pause');
playBtn.setAttribute('title','pause');
music.play()
}

function pauseSong(){
    isplaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}

playBtn.addEventListener('click',()=>(isplaying ? pauseSong() : playSong() ))



function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


let songIndex = 0;


 function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


loadSong(songs[songIndex]);




function uptadeProgressBar(e){

const {currentTime,duration}=e.srcElement


const progressPercent =(currentTime/duration)*100;  
progress.style.width = `${progressPercent}%`;

// calculate the display duration minute & seconds

const durationMinutes = Math.floor(duration/60);

let durationSeconds = Math.floor(duration % 60);

if(durationSeconds < 10){
    durationSeconds = `0${durationSeconds}`
}
if(durationSeconds){
    durationEL.textContent =`${durationMinutes}:${durationSeconds}`
}

// calculate the current time current minute & seconds
const currentTimeMinutes = Math.floor(currentTime/60);

let currentTimeSeconds = Math.floor(currentTime % 60);

if(currentTimeSeconds < 10){
    currentTimeSeconds = `0${currentTimeSeconds}`
}
currentTimeEL.textContent =`${currentTimeMinutes}:${currentTimeSeconds}`

}

function setProgressBar(e){
const width = this.clientWidth;
const clickX = e.offsetX;
const {duration}=music;
music.currentTime=( (clickX / width)*duration);
}


prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',uptadeProgressBar);
progressContainer.addEventListener('click',setProgressBar);
music.addEventListener('ended',nextSong);

