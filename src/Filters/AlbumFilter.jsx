import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class AlbumFilter extends Component {

  menuItem = "Album";

  applyFilter(){
    return this.props.data;
  }

  render(){
    return (
      <Segment>
        <Header>Album</Header>
      </Segment>
    );
  }
}

export default AlbumFilter;
