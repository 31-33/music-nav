import React, { Component } from 'react';
import { Container, Header, Menu, Grid, Divider } from 'semantic-ui-react';
import GenreFilter from './Filters/GenreFilter';
import ArtistFilter from './Filters/ArtistFilter';
import ReleaseDateFilter from './Filters/ReleaseDateFilter';
import DurationFilter from './Filters/DurationFilter';
import AlbumFilter from './Filters/AlbumFilter';
import SongsList from './SongsList';

class SongFilters extends Component {

  constructor(props){
    super(props);

    this.state = {
      activeIndex: 0,
      filterList: [
        {
          index: 0,
          name: "Genre",
        },
        {
          index: 1,
          name: "Artist",
        },
        {
          index: 2,
          name: "Release",
        },
        {
          index: 3,
          name: "Duration",
        },
        {
          index: 4,
          name: "Album",
        },
      ],
      genreFilterSource: props.songs,
      artistFilterSource: props.songs,
      releaseFilterSource: props.songs,
      durationFilterSource: props.songs,
      albumFilterSource: props.songs,
      filterOutput: props.songs,
    }
  }

  filterChangedCallback = (index, filterOutput) => {
    let orderedFilters = this.getOrderedFilterList();
    if(index + 1 < orderedFilters.length){
      switch(orderedFilters[index+1].name){
        case 'Genre':
          this.setState({ genreFilterSource: filterOutput });
          break;
        case 'Artist':
          this.setState({ artistFilterSource: filterOutput });
          break;
        case 'Release':
          this.setState({ releaseFilterSource: filterOutput });
          break;
        case 'Duration':
          this.setState({ durationFilterSource: filterOutput });
          break;
        case 'Album':
          this.setState({ albumFilterSource: filterOutput });
          break;
        default: break;
      }
    }
    else{
      this.setState({ filterOutput: filterOutput });
    }
  }

  getFilterIndexFromName(name){
    return this.state.filterList.findIndex(filter => filter.name===name);
  }

  onDrag = (e) => {
    let dragIndex = this.getFilterIndexFromName(e.target.innerHTML);
    this.setState({
      draggedIndex: dragIndex,
      activeIndex: dragIndex < 0 ? this.state.activeIndex : dragIndex,
    });
  }
  onDragOver = (e) => {
    this.setState({
      dragTargetIndex: this.getFilterIndexFromName(e.target.innerHTML),
    });
  }
  onDragEnd = (e) => {
    const { draggedIndex, dragTargetIndex } = this.state;

    if(draggedIndex < 0 || dragTargetIndex < 0 || draggedIndex === dragTargetIndex){
      return;
    }

    let newOrder = [...this.getOrderedFilterList()];
    let movingItem = newOrder.splice(draggedIndex, 1)[0];
    newOrder.splice(dragTargetIndex, 0, movingItem);
    for(var i=0; i<newOrder.length; i++){
      newOrder[i].index = i;
    }
    this.setState({
      filterList: newOrder,
      activeIndex: dragTargetIndex,
    });

    // Feed source data into first filter
    switch(newOrder[0].name){
      case 'Genre':
        this.setState({ genreFilterSource: this.props.songs });
        break;
      case 'Artist':
        this.setState({ artistFilterSource: this.props.songs });
        break;
      case 'Release':
        this.setState({ releaseFilterSource: this.props.songs });
        break;
      case 'Duration':
        this.setState({ durationFilterSource: this.props.songs });
        break;
      case 'Album':
        this.setState({ albumFilterSource: this.props.songs });
        break;
      default: break;
    }
  }

  handleTabChange = (e, {index}) => {
    this.setState({
      activeIndex: index,
    });
  }

  getOrderedFilterList(){
    return this.state.filterList.sort((f1, f2) => f1.index - f2.index);
  }

  renderFilterList(){
    return this.getOrderedFilterList()
      .map(filter => {
        return (
          <Menu.Item
            name={filter.name}
            active={this.state.activeIndex===filter.index}
            onClick={this.handleTabChange.bind(this)}
            key={filter.index}
            index={filter.index}
            onDrag={this.onDrag.bind(this)}
            onDragOver={this.onDragOver.bind(this)}
            onDragEnd={this.onDragEnd.bind(this)}
          />
        );
      })
  }

  renderFilters(){
    return (
      <Container>
        <GenreFilter
          onChange={this.filterChangedCallback}
          index={this.state.filterList.findIndex(e => e.name==='Genre')}
          isActive={this.state.filterList.findIndex(e => e.name==='Genre')===this.state.activeIndex}
          filterInput={this.state.genreFilterSource}
        />
        <ArtistFilter
          onChange={this.filterChangedCallback}
          index={this.state.filterList.findIndex(e => e.name==='Artist')}
          isActive={this.state.filterList.findIndex(e => e.name==='Artist')===this.state.activeIndex}
          filterInput={this.state.artistFilterSource}
        />
        <ReleaseDateFilter
          onChange={this.filterChangedCallback}
          index={this.state.filterList.findIndex(e => e.name==='Release')}
          isActive={this.state.filterList.findIndex(e => e.name==='Release')===this.state.activeIndex}
          filterInput={this.state.releaseFilterSource}
        />
        <DurationFilter
          onChange={this.filterChangedCallback}
          index={this.state.filterList.findIndex(e => e.name==='Duration')}
          isActive={this.state.filterList.findIndex(e => e.name==='Duration')===this.state.activeIndex}
          filterInput={this.state.durationFilterSource}
        />
        <AlbumFilter
          onChange={this.filterChangedCallback}
          index={this.state.filterList.findIndex(e => e.name==='Album')}
          isActive={this.state.filterList.findIndex(e => e.name==='Album')===this.state.activeIndex}
          filterInput={this.state.albumFilterSource}
        />
      </Container>
    );
  }

  render(){
    return (
      <Container>
        <Header>Filters</Header>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              {this.renderFilterList()}
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            {this.renderFilters()}
          </Grid.Column>
        </Grid>
        <Divider />
        <SongsList
          songs={this.state.filterOutput}
        />
      </Container>
    );
  }
}

export default SongFilters;
