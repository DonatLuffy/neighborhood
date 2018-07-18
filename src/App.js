import React, { Component } from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer'
import dataMarkers from './dataMarkers.js'
import ButtonNav from './ButtonNav.js'
import ListView from './ListView'
// import scriptLoader from 'react-async-script-loader'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      openNav: false,
      query: '',
      map: {},
      isMapLoaded: false
    }
    this.SwitchNav = this.SwitchNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }
  clearQuery = () => {
    this.setState({query: ''})
  }

  SwitchNav(){
    if(!this.state.openNav){
      this.setState({openNav: true})
    }else{
      this.setState({openNav: false})
    }
  }
  closeNav(){
    if(this.state.openNav){
      this.setState({openNav: false})
    }
  }

  componentWillMount() {
    this.setState({data: dataMarkers})
    // this.state.data.forEaach(marker =>
    //   bounds.extend(marker.position))
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        let map = new window.google.maps(document.getElementById('map'), {
          zoom: 12,
          center: new window.google.maps.LatLng(24.804733, 46.609212)
        })
        this.setState({
          map: map,
          isMapLoaded: true
         })
      }
      else{
        console.log("Map isn't loaded");
        this.setState({isMapLoaded: false})
      }
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      let bounds = new window.google.maps.LatLngBounds();
      this.state.data.forEaach(marker =>
        bounds.extend(marker.position))
        this.state.map.fitBounds(bounds)
    }
  }
  render() {
    let dataFiltered
    if (this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      dataFiltered = this.state.data.filter((marker) => match.test(marker.name))
    } else {
      dataFiltered = this.state.data
    }
    dataFiltered.sort(sortBy('name'))
    return (
      <div className="app" role='application'>
          <header>
            <ButtonNav SwitchNav={this.SwitchNav}/>
          </header>
        <ListView
          updateQuery={this.updateQuery}
          query={this.state.query}
          data={dataFiltered}
          openNav={this.state.openNav}
          SwitchNav={this.closeNav}/>
        <MapContainer
          data={dataFiltered}
          closeNav={this.closeNav}/>
      </div>
    );
  }
}

export default App;
