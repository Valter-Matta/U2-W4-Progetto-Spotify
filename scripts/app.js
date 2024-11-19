"use strict";

const musicPlayerElement = document.querySelector(".music-player");
const songElement = document.querySelector("#playing-song");
const playPauseButton = document.querySelector("#player-play-pause-button");
const nextButton = document.querySelector("#player-next-button");
const previousButton = document.querySelector("#player-previous-button");
const progressBar = document.querySelector(".progress");
const progressWrapper = document.querySelector(".progress-wrapper");
const volumeBar = document.querySelector(".volume-bar");
const volumeWrapper = document.querySelector(".volume-wrapper");

const playlist = new Playlist(
	new Song("./assets/mp3/01.mp3", 125),
	new Song("./assets/mp3/02.mp3", 79),
	new Song("./assets/mp3/03.mp3", 122),
	new Song("./assets/mp3/04.mp3", 90),
);

const musicPlayer = new MusicPlayer(
	{
		musicPlayerElement,
		songElement,
		playPauseButton,
		nextButton,
		previousButton,
		progressBar,
		progressWrapper,
		volumeBar,
		volumeWrapper,
	},
	playlist,
);
