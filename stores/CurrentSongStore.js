import {EventEmitter} from 'events';
import _ from 'lodash';

let CurrentSongStore = _.extend({}, EventEmitter.prototype, {

  currentSong: null,

  // getters and setters
  get: function() {
    return this.currentSong;
  },

  getStream: function(stream) {
    return this.songStream;
  },

  set: function(song) {
    this.currentSong = song;
  },

  setInitialSong: function(song) {
    this.currentSong = song;
  },

  setStream: function(stream) {
    this.songStream = stream;
  },

  // api
  emitChange: function() {
    this.emit('change');
  },

  pausePlaying: function() {
    this.currentSong.stream.pause();
  },

  startPlaying: function() {
    this.currentSong.stream.play();
  },

  // Event Listeners
  addChangeListener: function(fn) {
    this.on('change', fn)
  },

  removeChangeListener: function(fn) {
    this.removeListener('change', fn);
  }

});

export default CurrentSongStore;
