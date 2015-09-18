// AppDispatcher.js
import {Dispatcher} from 'flux';
let AppDispatcher = new Dispatcher();

import CurrentSongStore from '../stores/CurrentSongStore';
import SongsStore from '../stores/SongsStore';

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch (action) {
    case 'set-initial-song':
      CurrentSongStore.setInitialSong(payload.song);
      break;

    case 'set-current-song':
      CurrentSongStore.set(payload.song);
      CurrentSongStore.emitChange();
      break;

    case 'pause-playing-current-song':
      CurrentSongStore.pausePlaying();
      break;

    case 'start-playing-current-song':
      CurrentSongStore.startPlaying();
      break;

    default:
      return true;
  }

});

export default AppDispatcher;
