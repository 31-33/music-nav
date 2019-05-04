import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class ReleaseDateFilter extends Component {

  menuItem = "Release Date";

  applyFilter(){
    return this.props.data;
  }
  
  render(){
    return (
      <Segment>
        <Header>Release Date</Header>
      </Segment>
    );
  }
}

export default ReleaseDateFilter;
