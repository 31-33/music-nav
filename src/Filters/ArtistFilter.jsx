import React, { Component } from 'react';
import { Segment, Header, Button, Divider } from 'semantic-ui-react';

class ArtistFilter extends Component {

  constructor(props){
    super(props);

    this.state = {

    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      console.log("artist filter source updated!");
      this.notifyUpdated();
    }
  }

  notifyUpdated(){
    console.log("artist filter output updated");
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    // TODO: implement filtering
    return this.props.filterInput;
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Artist</Header>
        <Divider />
        <Button onClick={this.notifyUpdated.bind(this)}>Force Update</Button>
      </Segment>
    ) : '';
  }
}

export default ArtistFilter;
