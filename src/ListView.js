import React, { Component } from 'react';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap'

class ListView extends Component {
  state = {

  }
  viewMarker(e, marker){
    console.log(marker);
    console.log(this.props.data);

  }
  render() {
    return (
      <div className='list-info' >
        <nav id="drawer" className={this.props.openNav? 'open':'close'} >
          <input
            className='search-marker'
            type='text'
            placeholder='search markers'
            value={this.props.query}
            onChange={(event) => this.props.updateQuery(event.target.value)}
            role='search'
            aria-labelledby='Search for location'
            tabIndex='1'
            />
            <ul aria-labelledby='list of locations' tabIndex='1'>
              {this.props.data.map((marker,index) => (
                  <li
                    aria-labelledby={`view details for ${marker.title}`}
                    tabIndex={index+2}
                    key={index}
                    // onKeyPress={''}
                    onClick={(e) => {this.viewMarker(e.target,marker)}}
                   >
                    {marker.name}
                  </li>
              ))}
            </ul>
        </nav>
      </div>
    );
  }
}

export default ListView;
