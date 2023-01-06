import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

const iframeRef = document.getElementById('vimeo-player');

const iframePlayer = new Player(iframeRef);

iframePlayer.on('timeupdate', throttle(handleCurrentTimeValue, 1000));

iframePlayer.setCurrentTime(localStorage.getItem(PLAYER_CURRENT_TIME) || 0);

function handleCurrentTimeValue({ seconds }) {
  localStorage.setItem(PLAYER_CURRENT_TIME, seconds);
}
