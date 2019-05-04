import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class ArtistFilter extends Component {

  menuItem = "Artist";

  applyFilter(){
    return this.props.data;
  }

  render(){
    return (
      <Segment>
        <Header>Artist</Header>
      </Segment>
    );
  }
}

export default ArtistFilter;
