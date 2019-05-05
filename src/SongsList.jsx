import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Header, Table } from 'semantic-ui-react';
import SongItem from './SongItem';

class SongsList extends Component {

  constructor(props){
    super(props);
    this.state = {
      column: null,
      direction: null,
      songs: props.songs,
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.songs !== this.props.songs){
      this.setState({
        songs: this.props.songs,
      })
    }
  }

  handleSort = clickedColumn => () => {
    if(this.state.column !== clickedColumn){
      this.setState({
        column: clickedColumn,
        songs: _.sortBy(this.state.songs, [clickedColumn]),
        direction: 'ascending',
      });
    }
    else{
      this.setState({
        songs: this.state.songs.reverse(),
        direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
      });
    }
  }

  renderSongs(){
    return this.props.songs.map(song => {
      return (
        <SongItem
          key={song.id}
          song={song}
        />
      );
    })
  }

  render(){
    return (
      <Container>
        <Header>Songs</Header>
        <Table sortable celled striped fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={ this.state.column==='title' ? this.state.direction : null }
                onClick={this.handleSort('title')}
              >
                Title
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ this.state.column==='artist' ? this.state.direction : null }
                onClick={this.handleSort('artist')}
              >
                Artist
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ this.state.column==='album' ? this.state.direction : null }
                onClick={this.handleSort('album')}
              >
                Album
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ this.state.column==='genre' ? this.state.direction : null }
                onClick={this.handleSort('genre')}
              >
                Genre
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ this.state.column==='duration' ? this.state.direction : null }
                onClick={this.handleSort('duration')}
              >
                Duration
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={ this.state.column==='releasedate' ? this.state.direction : null }
                onClick={this.handleSort('releasedate')}
              >
                Release Date
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {_.map(this.state.songs, song => (
            <SongItem key={song.id} song={song}/>
         ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default SongsList;
