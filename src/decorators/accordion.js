//HOC === Higher Order Component == Decorator
import React, { Component } from 'react'

const accordionDecorator = (OriginalComponent) =>
  class AccordionDecorator extends Component {
    state = {
      openItemId: null
    }

    toggleOpenItem = (openItemId) =>
      this.setState({
        openItemId: openItemId === this.state.openItemId ? null : openItemId
      })

    render() {
      return (
        <OriginalComponent
          {...this.props}
          toggleOpenItem={this.toggleOpenItem}
          openItemId={this.state.openItemId}
        />
      )
    }
  }

export default accordionDecorator
