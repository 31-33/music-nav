import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class GenreFilter extends Component {

  menuItem = "Genre";

  applyFilter(){
    return this.props.data;
  }

  render(){
    return (
      <Segment>
        <Header>Genre</Header>
      </Segment>
    );
  }
}

export default GenreFilter;
