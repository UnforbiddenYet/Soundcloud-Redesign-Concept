import React from 'react';

class InformationAside extends React.Component {
  propTypes: {
    songName: React.PropTypes.func.isRequired,
    byArtist: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="song-info-aside">
        <h2 className="title">{this.props.songName}</h2>
        <h4 className="artist">{this.props.byArtist}</h4>
      </div>
    )
  }
}

InformationAside.displayName = 'InformationAside';

export default InformationAside;
