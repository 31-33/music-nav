import React, { Component } from 'react';
import { Segment, Header, Divider, Label } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class ReleaseDateFilter extends Component {

  constructor(props){
    super(props);

    let minYear = props.filterInput.reduce((acc, curr) => Math.min(acc, curr.releasedate), 3000);
    let maxYear = props.filterInput.reduce((acc, curr) => Math.max(acc, curr.releasedate), 0);

    this.state = {
      minYear: minYear,
      maxYear: maxYear,
      filterMin: minYear,
      filterMax: maxYear,
      data: this.extractData(props.filterInput, minYear, maxYear),
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      let minYear = this.props.filterInput.reduce((acc, curr) => Math.min(acc, curr.releasedate), 3000);
      let maxYear = this.props.filterInput.reduce((acc, curr) => Math.max(acc, curr.releasedate), 0);

      this.setState({
        minYear: minYear,
        maxYear: maxYear,
        minFilter: minYear,
        maxFilter: maxYear,
        data: this.extractData(this.props.filterInput, minYear, maxYear),
      }, () => this.notifyUpdated());
    }
  }

  extractData(list, minYear, maxYear){
    var yearCounts = [];
    for(var i = minYear; i <= maxYear; i++){
      yearCounts.push({
        year: i,
        count: 0,
      });
    }
    list.forEach(song => {
      yearCounts[yearCounts.findIndex(item => item.year===song.releasedate)] = {
        year: song.releasedate,
        count: yearCounts.find(item => item.year===song.releasedate).count + 1,
      };
    });
    return yearCounts;
  }

  notifyUpdated(){
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    return this.props.filterInput.filter(song => {
      return song.releasedate <= this.state.filterMax && song.releasedate >= this.state.filterMin;
    });
  }

  onSliderChange(args){
    this.setState({
      filterMin: args[0],
      filterMax: args[1],
    }, () => this.notifyUpdated());
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Release Date</Header>
        <Divider />
        <BarChart width={750} height={300} data={this.state.data}>
          <CartesianGrid strokeDasharray="1 1"/>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8"/>
        </BarChart>
        <Segment>
          <Segment basic>
            <Nouislider
              connect
              tooltips
              step={1}
              range={{min: this.state.minYear, max: this.state.maxYear}}
              start={[this.state.filterMin, this.state.filterMax]}
              onChange={this.onSliderChange.bind(this)}
            />
          </Segment>
          <Segment basic>
            <Label attached="bottom left" pointing="above">{this.state.minYear}</Label>
            <Label attached="bottom right" pointing="above">{this.state.maxYear}</Label>
          </Segment>
          </Segment>
      </Segment>
    ) : '';
  }
}

export default ReleaseDateFilter;
