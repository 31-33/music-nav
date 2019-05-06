import React, { Component } from 'react';
import { Segment, Header, Divider, Button } from 'semantic-ui-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class ArtistFilter extends Component {

  constructor(props){
    super(props);

    let data = this.extractData(props.filterInput);
    this.state = {
      data: data,
      artistsList: data.map(item => ({
        name: item.artist,
        selected: true,
      })),
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      let data = this.extractData(this.props.filterInput);
      this.setState({
        data: data,
        artistsList: data.map(item => ({
          name: item.artist,
          selected: true,
        })),
      }, () => this.notifyUpdated());
    }
  }

  extractData(list){
    let artists = [];

    list.forEach(({artist}) => {
      let index = artists.findIndex(item => item.artist===artist);
      if(index < 0){
        artists.push({
          artist: artist,
          count: 1,
        });
      }
      else{
        artists[index] = {
          artist: artist,
          count: artists[index].count + 1,
        };
      }
    });
    return artists.sort((a1, a2) => a2.count - a1.count);
  }

  notifyUpdated(){
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    const selectedArtists = this.state.artistsList
      .filter(a => a.selected===true)
      .map(a => a.name);

    return this.props.filterInput.filter(song => {
      return selectedArtists.includes(song.artist);
    });
  }

  barClicked = (item) => {
    const artists = this.state.artistsList;
    let clickedIndex = artists.findIndex(artist => artist.name===item.artist);
    artists[clickedIndex] = {
      name: item.artist,
      selected: !artists[clickedIndex].selected,
    };
    this.setState({
      artistsList: artists,
    }, () => this.notifyUpdated());
  }

  clearSelection(){
    this.setState({
      artistsList: this.state.artistsList.map(item => ({name: item.name, selected: false})),
    }, () => this.notifyUpdated());
  }

  selectAll(){
    this.setState({
      artistsList: this.state.artistsList.map(item => ({name: item.name, selected: true})),
    }, () => this.notifyUpdated());
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Artist</Header>
        <Divider />
        <BarChart width={750} height={400} layout="vertical" data={this.state.data}>
          <CartesianGrid strokeDasharray="1 1"/>
          <XAxis type="number" />
          <YAxis dataKey="artist" type="category" />
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
                    fill={this.state.artistsList[index].selected ? '#33FF66' : '#808080'}
                  />
                );
              })
            }
          </Bar>
        </BarChart>
        <Button onClick={this.selectAll.bind(this)}>Select All</Button>
        <Button onClick={this.clearSelection.bind(this)}>Clear Selection</Button>
      </Segment>
    ) : '';
  }
}

export default ArtistFilter;
