import {EventEmitter} from 'events';
import _ from 'lodash';

import config from '../config';

let SongsStore = _.extend({}, EventEmitter.prototype, {

  items: [
    {byArtist: 'Hans Zimmer', songName: 'Stay', artworkSrc: 'img/interstellar.jpg', tuneUrl: 'https://soundcloud.com/ahmed-gado-4-1/hans-zimmer-interstellar-film-soundtrack'},
    {byArtist: 'Dick Dale and His Del Tones', songName: 'Misirlou', artworkSrc: 'img/pulp-fiction.jpg', tuneUrl: 'https://soundcloud.com/decio-vanderlei-nogueira/01-misirlou-dick-dale-and-his'},
    {byArtist: 'Bob Dylan', songName: 'The Man In Me', artworkSrc: 'img/big-lebowski.png', tuneUrl: 'https://soundcloud.com/wolf-in-loveland/the-man-in-me-bob-dylan-cover'}
  ],

  // getters and setters
  getItems: function() {
    return this.items;
  },

  getSongByUrl: function(url) {
    return _.find(this.items, (item) => {
      return item.tuneUrl === url;
    });
  },

  // api
  addSCData: function(url, data) {
    let song = this.getSongByUrl(url);
    if(song) {
      song.scData = data;
    } else {
      console.error('Can\'t find song by url ${url}')
    }
  },

  addStream: function(url, stream) {
    let song = this.getSongByUrl(url);
    if(song) {
      song.stream = stream;
    } else {
      console.error('Can\'t find song by url ${url}')
    }
  },

  emitChange: function() {
    this.emit('change');
  },

  // event listeners
  addChangeListener: function(fn) {
    this.on('change', fn)
  },

  removeChangeListener: function(fn) {
    this.removeListener('change', fn);
  }

});

export default SongsStore;
