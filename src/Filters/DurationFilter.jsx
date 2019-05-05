import React, { Component } from 'react';
import { Segment, Header, Label, Divider } from 'semantic-ui-react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class DurationFilter extends Component {

  constructor(props){
    super(props);

    let minDuration = props.filterInput.reduce((acc, curr) => Math.min(acc, curr.duration), 999);
    let maxDuration = props.filterInput.reduce((acc, curr) => Math.max(acc, curr.duration), 0);

    this.state = {
      minDuration: minDuration,
      maxDuration: maxDuration,
      filterMin: minDuration,
      filterMax: maxDuration,
      data: this.extractData(props.filterInput, minDuration, maxDuration),
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      let minDuration = this.props.filterInput.reduce((acc, curr) => Math.min(acc, curr.duration), 999);
      let maxDuration = this.props.filterInput.reduce((acc, curr) => Math.max(acc, curr.duration), 0);
      console.log(this.state.filterMin);
      console.log(this.state.filterMax);
      this.setState({
        minDuration: minDuration,
        maxDuration: maxDuration,
        filterMin: minDuration,
        filterMax: maxDuration,
        data: this.extractData(this.props.filterInput, minDuration, maxDuration),
      });

      console.log("duration filter source updated!");
      this.notifyUpdated();
    }
  }

  extractData(list, minDuration, maxDuration){
    let data = [];
    // fill relevant range
    for(var tmp = minDuration; tmp <= maxDuration; tmp++){
      data.push({
        duration: tmp,
        frequency: 0,
      })
    }
    // calculate raw frequencies
    list.sort((s1, s2) => s1.duration - s2.duration).forEach(song => {
      let index = data.findIndex(item => item.duration===song.duration);
      data[index] = {
        duration: song.duration,
        frequency: data[index].frequency + 1,
      }
    });
    // cumulative freq
    if(data.length >= 2){
      for(var i = data.length-2; i >= 0; i--){
        for(var j = i; j < data.length; j++){
          data[j] = {
            duration: data[j].duration,
            frequency: data[j].frequency + data[i].frequency
          }
        }
      }
    }
    let norm = data.length >= 1 ? data[data.length-1].frequency/100 : 1;
    return data.map(e => ({duration: e.duration, cumulative_frequency: e.frequency / norm}));
  }

  notifyUpdated(){
    console.log("duration filter output updated");
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    return this.props.filterInput.filter(song => {
      return song.duration <= this.state.filterMax && song.duration >= this.state.filterMin;
    });
  }

  onSliderChange(args){
    this.setState({
      filterMin: args[0],
      filterMax: args[1],
    });
    this.notifyUpdated();
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Song Duration</Header>
        <Divider />
        <AreaChart
          width={750}
          height={300}
          data={this.state.data}
        >
          <CartesianGrid strokeDasharray="1 1"/>
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="cumulative_frequency" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <Segment>
          <Segment basic>
            <Nouislider
              connect
              tooltips
              step={1}
              range={{min: this.state.minDuration, max: this.state.maxDuration}}
              start={[this.state.filterMin, this.state.filterMax]}
              onChange={this.onSliderChange.bind(this)}
            />
          </Segment>
          <Segment basic>
            <Label attached="bottom left" pointing="above">{this.state.minDuration}</Label>
            <Label attached="bottom right" pointing="above">{this.state.maxDuration}</Label>
          </Segment>
        </Segment>
      </Segment>
    ) : '';
  }
}

export default DurationFilter;
