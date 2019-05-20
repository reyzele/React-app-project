import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

class MenuItem extends Component {
  static propTypes = {}

  render() {
    const { link, children } = this.props
    return (
      <Nav vertical>
        <NavItem>
          <NavLink to={link} activeStyle={{ color: 'red' }}>
            {children}
          </NavLink>
        </NavItem>
      </Nav>
    )
  }
}

export default MenuItem
