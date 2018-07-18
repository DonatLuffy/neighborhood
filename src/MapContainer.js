import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    // animation: this.props.google.maps.Animation.DROP
  };
  // MapContainer.propTypes = {
  //   showingInfoWindow: React.PropTypes.bool,
  //   activeMarker: React.PropTypes.object
  //   selectedPlace: React.PropTypes.object
  //   markers: React.PropTypes.array
  //   onMarkerClick: React.PropTypes.func
  //   onMapClicked: React.PropTypes.func
  // }


  componentDidMount() {

  }

  onMarkerClick = (props, marker, e) =>{
    console.log('props',props);
    console.log('marker',marker);
    console.log('e',e);
    this.setState({
      selectedPlace: props,
      // animation: props.google.maps.Animation.Fo,
      activeMarker: marker,
      showingInfoWindow: true
    });

}
  onMapClicked = (props, marker, e) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    // let newMarker = new google.maps.Marker({
    //   position: this.props.position,
    //   map: this.props.map
    // })
    // console.log('props',props);
    // console.log('marker',marker);
    // console.log('e',e);
    // console.log(new this.props.google.maps.Marker({
    //       position: this.props.position,
    //       map: this.props.map
    //     }));
  };

  render() {
    const style = {
      width: '100%',
      height: '100%',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    if(!this.props.loaded){
      return <div className='loading-map'>Loading...</div>
    }
    return (
      <div className='google-maps' onClick={this.props.closeNav} aria-label='Riyadh neighborhoods'>
        <Map
          google={this.props.google}
          zoom={12}
          style={style}
          initialCenter={{
            lat: 24.804733,
            lng: 46.609212
          }}
          onClick={this.onMapClicked}
          >
          {this.props.data.map((marker, index) => (
            <Marker
              key={index}
              onClick={this.onMarkerClick}
              // animation={this.state.animation}
              title={marker.title}
              name={marker.name}
              position={{lat: marker.position.lat, lng: marker.position.lng}} />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}>
              <div>
                {/* {console.log(this.state.selectedPlace)} */}
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDVkNtgTRfvzuJQpW1Nu7ITXMsO3e2K5RE')
})(MapContainer)
