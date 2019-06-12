import React, { Component } from 'react';
import { Map } from 'google-maps-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';



export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {} ,         //Shows the infoWindow to the selected place upon a marker
    l:this.props.lat,
    t:this.props.long,
    name:this.props.name,
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  
componentDidUpdate(prevProps) {
  

  if(prevProps.lat !== this.props.lat || prevProps.long !==this.props.long){
  this.setState({
  l:this.props.lat,
  t:this.props.long,
  name:this.props.name,
  });
  console.log("hhhhihi");
  }
  
  }
  render() {
    const my={
        height:"90%",
        width:"40%",
        border:"2px solid black",
        position:"relative",
        float:"left",
    } 
    return (
      <div >

      <Map  style={my}
        google={this.props.google}
        zoom={14}
        center={{ lat: this.state.l, lng: this.state.t}}
        initialCenter={{ lat: this.state.l, lng: this.state.t}}
      >
       
       
        <Marker
          onClick={this.onMarkerClick}
          name={this.state.name}
          position={{ lat: this.state.l, lng: this.state.t}}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDMZeToCUlyugQApuoEPB30MTPwP8fDx-k'
})(MapContainer);