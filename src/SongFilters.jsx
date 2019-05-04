import React, { Component } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
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
      activeIndex: 0,
    }
  }

  onDrag = (e) => {
    let dragIndex = this.state.filters.map(filter => filter.menuItem).indexOf(e.target.innerHTML);
    this.setState({
      draggedItem: e.target,
      activeIndex: dragIndex < 0 ? this.state.activeIndex : dragIndex,
    });
  }
  onDragOver = (e) => {
    this.setState({
      dragTargetItem: e.target,
    });
  }
  onDragEnd = (e) => {
    const { draggedItem, dragTargetItem, filters } = this.state;
    if(draggedItem.className.includes("item") && dragTargetItem.className.includes("item")){
      let orderedFilters = filters.map(filter => filter.menuItem);
      let selectedIndex = orderedFilters.indexOf(draggedItem.innerHTML);
      let targetIndex = orderedFilters.indexOf(dragTargetItem.innerHTML);
      if(selectedIndex < 0 || targetIndex < 0 || selectedIndex === targetIndex){
        return;
      }
      let newOrder = [...filters];
      let movingItem = newOrder.splice(selectedIndex, 1)[0];
      newOrder.splice(targetIndex, 0, movingItem);

      this.setState({
        filters: newOrder,
        activeIndex: targetIndex,
      });
    }
  }

  handleTabChange = (e, {activeIndex}) => {
    this.setState({
      activeIndex: activeIndex,
    });
  }

  render(){
    return (
      <Container>
      <Header>Filters</Header>
      <Tab
        onDrag={this.onDrag.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
        menu={{ fluid: true, vertical: true, attached:true, tabular: true }}
        panes={this.state.filters}
        activeIndex={this.state.activeIndex}
        onTabChange={this.handleTabChange.bind(this)}
      />
      </Container>
    );
  }
}

export default SongFilters;
