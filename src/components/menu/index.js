import React, { Component } from 'react'
import MenuItem from './menu-item'

class Menu extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2 className="title">Main Menu</h2>
        <nav>{this.props.children}</nav>
      </div>
    )
  }
}

export { MenuItem }
export default Menu
