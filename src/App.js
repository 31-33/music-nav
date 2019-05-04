import React, { Component } from 'react';
import SongsList from './SongsList';
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
      <div className="App">
        <SongsList
          songs={this.state.songslist}
        />
      </div>
    );
  }
}

export default App;
