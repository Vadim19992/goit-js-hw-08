import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoPlayer = new Player(document.getElementById('vimeo-player'));

const saveCurrentTime = () => {
  videoPlayer.getCurrentTime().then(seconds => {
    localStorage.setItem('videoplayer-current-time', seconds);
  });
};

const loadCurrentTime = () => {
  return parseFloat(localStorage.getItem('videoplayer-current-time')) || 0;
};

const setPlayerCurrentTime = time => {
  videoPlayer.setCurrentTime(time);
};

const throttleSaveCurrentTime = throttle(saveCurrentTime, 1000);

videoPlayer.on('timeupdate', throttleSaveCurrentTime);

window.addEventListener('load', () => {
  const currentTime = loadCurrentTime();
  setPlayerCurrentTime(currentTime);
});
