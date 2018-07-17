import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

export class MapContainer extends Component {
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    if(!this.props.loaded){
      return <div className='loading-map'>Loading...</div>
    }
    return (
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

        <Marker
          onClick={this.onMarkerClick}
          name={'The Boulevard Riyadh'}
          position={{lat: 24.75064188, lng: 46.61337426}} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Al Nakheel Centre'}
          position={{lat: 24.7609601, lng: 46.60271395}} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Hittin Square'}
          position={{lat: 24.74183609, lng: 46.60376123}} />
        <Marker
          onClick={this.onMarkerClick}
          name={'KSU'}
          position={{lat: 24.73806344, lng: 46.61924072}} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Sky Zone'}
          position={{lat: 24.791642, lng: 46.61210161}} />

        <InfoWindow
          onClose={this.onInfoWindowClose}>
            <div>

            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDVkNtgTRfvzuJQpW1Nu7ITXMsO3e2K5RE')
})(MapContainer)
