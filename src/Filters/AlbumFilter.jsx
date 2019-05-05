import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class AlbumFilter extends Component {

  constructor(props){
    super(props);

    let data = this.extractData(props.filterInput);
    this.state = {
      data: data,
      albumList: data.map(item => ({
        name: item.album,
        selected: true,
      })),
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      console.log("album filter source updated!");

      let data = this.extractData(this.props.filterInput);
      this.setState({
        data: data,
        albumList: data.map(item => ({
          name: item.album,
          selected: true,
        })),
      });
      this.notifyUpdated();
    }
  }

  extractData(list){
    let albums = [];

    list.forEach(({album}) => {
      let index = albums.findIndex(item => item.album===album);
      if(index < 0){
        albums.push({
          album: album,
          count: 1,
        })
      }
      else{
        albums[index] = {
          album: album,
          count: albums[index].count + 1,
        }
      }
    });

    return albums.sort((a1, a2) => a2.count - a1.count);
  }

  notifyUpdated(){
    console.log("album filter output updated!");
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    const selectedAlbums = this.state.albumList
      .filter(a => a.selected===true)
      .map(a => a.name);

    return this.props.filterInput.filter(song => {
      return selectedAlbums.includes(song.album);
    });
  }

  barClicked = (item) => {
    const albums = this.state.albumList;
    let clickedIndex = albums.findIndex(album => album.name===item.album);
    albums[clickedIndex] = {
      name: item.album,
      selected: !albums[clickedIndex].selected,
    };
    this.setState({
      albumList: albums,
    });

    this.notifyUpdated();
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Album</Header>
        <Divider />
        <BarChart width={750} height={400} layout="vertical" data={this.state.data}>
          <CartesianGrid strokeDasharray="1 1"/>
          <XAxis type="number" />
          <YAxis dataKey="album" type="category" />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#8884d8"
            onClick={this.barClicked}
          >
            {
              this.state.data.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={this.state.albumList[index].selected ? '#33FF66' : '#808080'}
                  />
                );
              })
            }
          </Bar>
        </BarChart>
      </Segment>
    ) : '';
  }
}

export default AlbumFilter;
