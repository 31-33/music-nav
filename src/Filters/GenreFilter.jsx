import _ from 'lodash';
import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';
import { PieChart, Pie, Cell } from 'recharts';

class GenreFilter extends Component {

  constructor(props){
    super(props);

    let data = this.extractData(props.filterInput);
    this.state = {
      data: data,
      genresList: data.map(e => ({ name: e.genre, selected: true })),
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      let data = this.extractData(this.props.filterInput);
      this.setState({
        data: data,
        genresList: data.map(e => ({ name: e.genre, selected: true }))
      }, () => this.notifyUpdated());
    }
  }

  extractData(list){
    let genres = [];

    let processGenre = (genre) => {
      let index = genres.findIndex(item => item.genre===genre);
      if(index < 0){
        genres.push({
          genre: genre,
          count: 1,
        });
      }
      else{
        genres[index] = {
          genre: genre,
          count: genres[index].count + 1
        };
      }
    };

    list.forEach(song => {
      if(Array.isArray(song.genre)){
        song.genre.forEach(genre => {
          processGenre(genre);
        });
      }
      else{
        processGenre(song.genre);
      }
    });

    return genres;
  }

  notifyUpdated(){
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    const selectedGenres = this.state.genresList
      .filter(g => g.selected===true)
      .map(g => g.name);

    return this.props.filterInput.filter(song => {
      if(Array.isArray(song.genre)){
        return _.intersection(song.genre, selectedGenres).length > 0;
      }
      else{
        return selectedGenres.includes(song.genre);
      }
    });
  }

  segmentClicked = (item) => {
    let genres = this.state.genresList;
    genres[item.name] = {
      name: genres[item.name].name,
      selected: !genres[item.name].selected,
    };
    this.setState({
      genresList: genres,
    });

    this.notifyUpdated();
  }

  renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {this.state.data[index].genre} ({value})
      </text>
    );
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Genre</Header>
        <Divider />
        <PieChart width={750} height={300}>
          <Pie
            data={this.state.data}
            dataKey="count"
            label={this.renderLabel}
            onClick={this.segmentClicked}
            isAnimationActive={false}
          >
            {
              this.state.data.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={this.state.genresList[index].selected ? '#33FF66' : '#808080'}
                  />
                );
              })
            }
          </Pie>
        </PieChart>
      </Segment>
    ) : '';
  }
}

export default GenreFilter;
