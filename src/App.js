import React, { Component } from 'react';
import SongsList from './SongsList';
import SongFilters from './SongFilters';
import { Container, Divider } from 'semantic-ui-react';
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

        <SongFilters songs={this.state.songslist} />
        <Divider />
        <SongsList
          songs={this.state.songslist}
        />
      </Container>
    );
  }
}

export default App;
