import React, { Component } from 'react';
import { Container, Header, Tab, Button } from 'semantic-ui-react';
import GenreFilter from './Filters/GenreFilter';
import ArtistFilter from './Filters/ArtistFilter';
import ReleaseDateFilter from './Filters/ReleaseDateFilter';
import DurationFilter from './Filters/DurationFilter';
import AlbumFilter from './Filters/AlbumFilter';

class SongFilters extends Component {
  constructor(){
    super();

    this.state = {
      filters: [
        new GenreFilter(),
        new ArtistFilter(),
        new ReleaseDateFilter(),
        new DurationFilter(),
        new AlbumFilter(),
      ],
    }
  }

  onDrag = (e) => {
    e.preventDefault();
    this.setState({
      draggedItem: e.target.innerHTML,
    })
  }
  onDragOver = (e) => {
    e.preventDefault();

    if(e.target.className==="item"){
      let orderedFilters = this.state.filters.map(filter => filter.menuItem);
      let selectedIndex = orderedFilters.indexOf(this.state.draggedItem);
      let targetIndex = orderedFilters.indexOf(e.target.innerHTML);

      if(selectedIndex > targetIndex){
        let tmp = this.state.filters[targetIndex];
        this.state.filters[targetIndex] = this.state.filters[selectedIndex];
        this.state.filters[selectedIndex] = tmp;
      }
      else if(selectedIndex < targetIndex){
        let tmp = this.state.filters[selectedIndex];
        this.state.filters[selectedIndex] = this.state.filters[targetIndex];
        this.state.filters[targetIndex] = tmp;
      }
    }
  }

  render(){
    return (
      <Container>
      <Header>Filters</Header>
      <Tab
        onDrag={this.onDrag.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        menu={{ fluid: true, vertical: true, attached:true, tabular: true }}
        panes={this.state.filters}
      />
      </Container>
    );
  }
}

export default SongFilters;
