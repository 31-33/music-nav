import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class DurationFilter extends Component {

  menuItem = "Duration";

  applyFilter(){
    return this.props.data;
  }

  render(){
    return (
      <Segment>
        <Header>Song Duration</Header>
      </Segment>
    );
  }
}

export default DurationFilter;
