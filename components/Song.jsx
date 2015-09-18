import React from 'react';
import Resolve from 'soundcloud-resolve';

import AppDispatcher from '../dispatcher/AppDispatcher';
import config from '../config';

import CurrentSongStore from '../stores/CurrentSongStore';
import SongsStore from '../stores/SongsStore';

let icons = {
  playAction: 'glyphicon glyphicon-play',
  pauseAction: 'glyphicon glyphicon-pause'
};

let states = config.playerStates;

class Song extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerState: states.idle
    };

    this.stream = null;

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
  }

  componentWillMount() {
    if(!this.stream) {
      this._prepareStream(this.props.song.tuneUrl);
    }
  }

  _isActive() {
    let currentSong = CurrentSongStore.get();
    return currentSong.songName === this.props.song.songName;
  }

  _isPlaying() {
    return this.state.playerState === states.playing;
  }

  _prepareStream(tuneUrl) {
    var that = this;

    function setPlayerState() {
      that.setState({playerState: that.stream.getState()});
    }

    Resolve(config.clientId, tuneUrl, function(err, result, streamUrl){
      // Update sound model
      SongsStore.addSCData(tuneUrl, result);
      // Get sound stream from Soundcloud
      SC.stream(result.uri, function(stream){
        that.stream = stream;
        // add stream object to sound model
        SongsStore.addStream(tuneUrl, stream);

        let html5Audio = stream._player._html5Audio;

        html5Audio.addEventListener('playing', function(){
          setPlayerState();
          console.log('event fired: play');
        });
        html5Audio.addEventListener('pause', function(){
          setPlayerState();
          console.log('event fired: pause');
        });
        html5Audio.addEventListener('ended', function(){
          setPlayerState();
          console.log('event fired: ended');
        });
      });
    });
  }

  handleButtonClick() {
    let playerState = this.state.playerState;

    if(playerState === states.playing) {
      this.stream.pause();
    } else {
      this.stream.play();
    }
  }

  handleSongClick() {
    if(!this._isActive()) {
      // pause playing
      AppDispatcher.dispatch({
        action: 'pause-playing-current-song'
      });
      // set new song as current
      AppDispatcher.dispatch({
        action: 'set-current-song',
        song: this.props.song
      });
      AppDispatcher.dispatch({
        action: 'start-playing-current-song'
      });
    }
  }

  render () {
    let activeClass = '',
        iconClass;

    iconClass = !this._isPlaying() ? icons.playAction : icons.pauseAction;

    if(this._isActive()) {
      activeClass = 'active';
    }

    return (
      <li className={activeClass}
          onClick={this.handleSongClick}>
        <h4 className="song-name">{this.props.song.songName}</h4>
        <span className="by-artist">{this.props.song.byArtist}</span>
        <div className="button"
            onClick={this.handleButtonClick}>
          <span className={iconClass}></span>
        </div>
      </li>
    );
  }
}

Song.displayName = 'Song';

export default Song;
