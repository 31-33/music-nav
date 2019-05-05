import React, { Component } from 'react';
import { Segment, Header, Label, Divider } from 'semantic-ui-react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class DurationFilter extends Component {

  constructor(props){
    super(props);

    this.state = {
      minDuration: props.filterInput.reduce((acc, curr) => Math.min(acc, curr.duration), 999),
      filterMin: props.filterInput.reduce((acc, curr) => Math.min(acc, curr.duration), 999),
      maxDuration: props.filterInput.reduce((acc, curr) => Math.max(acc, curr.duration), 0),
      filterMax: props.filterInput.reduce((acc, curr) => Math.max(acc, curr.duration), 0),
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      this.state = {
        minDuration: this.props.filterInput.reduce((acc, curr) => Math.min(acc, curr.duration), 999),
        maxDuration: this.props.filterInput.reduce((acc, curr) => Math.max(acc, curr.duration), 0),
      }
      if(this.state.filterMin < this.state.minDuration){
        this.setState({
          filterMin: this.state.minDuration,
        });
      }
      if(this.state.filterMax < this.state.maxDuration){
        this.setState({
          filterMax: this.state.maxDuration,
        });
      }

      console.log("duration filter source updated!");
      this.notifyUpdated();
    }
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
    ) : '';
  }
}

export default DurationFilter;
