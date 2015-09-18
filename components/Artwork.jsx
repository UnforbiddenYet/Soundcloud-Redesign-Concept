import React from 'react';

class Artwork extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <img className="img-responsive"
          src={this.props.artworkSrc}
      />
    )
  }
}

Artwork.displayName = 'Artwork';

export default Artwork;
