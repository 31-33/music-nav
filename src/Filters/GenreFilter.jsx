import React, { Component } from 'react';
import { Segment, Header, Button, Divider } from 'semantic-ui-react';

class GenreFilter extends Component {

  constructor(props){
    super(props);

    this.state = {

    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.filterInput !== this.props.filterInput){
      console.log("genre filter source updated!");
      this.notifyUpdated();
    }
  }

  notifyUpdated(){
    console.log("genre filter output updated");
    this.props.onChange(this.props.index, this.applyFilter());
  }

  applyFilter(){
    // TODO: implement filtering
    return this.props.filterInput;
  }

  render(){
    return this.props.isActive ? (
      <Segment>
        <Header>Genre</Header>
        <Divider />
        <Button onClick={this.notifyUpdated.bind(this)}>Force Update</Button>
      </Segment>
    ) : '';
  }
}

export default GenreFilter;
