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
	new Song("01", 125),
	new Song("02", 79),
	new Song("03", 122),
	new Song("04", 90),
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
