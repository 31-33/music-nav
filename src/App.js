import React, { Component } from 'react';
import SongFilters from './SongFilters';
import { Container, Segment } from 'semantic-ui-react';
var songs = require('./music.json');

class App extends Component {
  constructor(){
    super();
    this.state = {
      songslist: songs,
    };
  }

  render() {
    return (
      <Container>
        <Segment>
          <SongFilters songs={this.state.songslist} />
        </Segment>
      </Container>
    );
  }
}

export default App;
