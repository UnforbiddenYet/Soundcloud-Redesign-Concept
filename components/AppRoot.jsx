import React from 'react';

import SongsStore from '../stores/SongsStore';
import CurrentSongStore from '../stores/CurrentSongStore';

import AppDispatcher from '../dispatcher/AppDispatcher';
import config from '../config';

import Artwork from '../components/Artwork';
import InformationAside from '../components/InformationAside';
import Song from '../components/Song';

let getAppRootState = () => {
  return {
    songs: SongsStore.getItems(),
    currentSong: CurrentSongStore.get()
  };
}

class AppRoot extends React.Component {
  constructor (props) {
    super(props);
    this.state = getAppRootState();

    this._onChange = this._onChange.bind(this);
    this._initializeSouncloud();
  }

  componentDidMount() {
    CurrentSongStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CurrentSongStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getAppRootState());
  }

  _initializeSouncloud() {
    SC.initialize({
      client_id: config.clientId
    });
  }

  render() {
    let songs, currentSong, artworkStyle;

    songs = this.state.songs;
    currentSong = this.state.currentSong;

    if(!currentSong) {
      currentSong = songs[0]; //TODO: load last played track from localstorage
      AppDispatcher.dispatch({
        action: 'set-initial-song',
        song: currentSong
      });
    }

    artworkStyle = {
      backgroundImage: 'url(' + currentSong.artworkSrc + ')'
    };

    return (
      <div className="container-fluid">
        <div className="artwork"
            style={artworkStyle}></div>
        <div className="background-filter"></div>
        <div className="track-list">
          <ul className="list-unstyled">
            {songs.map((song) => {
              return (<Song key={song.tuneUrl}
                  song={song}/>)
            })}
          </ul>
        </div>
        <InformationAside
            byArtist={currentSong.byArtist}
            songName={currentSong.songName}
        />
      <div className="wave"></div>
      </div>
    );
  }
};

AppRoot.displayName = 'AppRoot';

export default AppRoot;
