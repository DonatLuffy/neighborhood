import React, { Component } from 'react';
class ButtonNav extends Component {

  state = {

  }

  render() {
    return (
      <a onClick={this.props.SwitchNav} className='a-nav'>
        <i className="material-icons">menue</i>
      </a>
    );
  }
}

export default ButtonNav;
