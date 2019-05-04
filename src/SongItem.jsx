import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class SongItem extends Component {

  render(){
    return (
      <Table.Row>
        <Table.Cell>
          {this.props.song.title}
        </Table.Cell>
        <Table.Cell>
          {this.props.song.artist}
        </Table.Cell>
        <Table.Cell>
          {this.props.song.album}
        </Table.Cell>
        <Table.Cell>
          {Array.isArray(this.props.song.genre) ? this.props.song.genre.join(', ') : this.props.song.genre}
        </Table.Cell>
        <Table.Cell>
          {parseInt(this.props.song.duration / 60)}:{("00"+this.props.song.duration % 60).slice(-2)}
        </Table.Cell>
        <Table.Cell>
          {this.props.song.releasedate}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default SongItem;
