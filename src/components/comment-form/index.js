import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../ac'
import './style.css'
import { Button, ButtonGroup } from 'reactstrap'

class CommentForm extends Component {
  static propTypes = {}

  state = {
    user: '',
    text: ''
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <ButtonGroup className="form-row">
          <label className="mb-2 mr-sm-2 mb-sm-0 form-group">
            <p className="mr-sm-2">user: </p>
            <input
              value={this.state.user}
              onChange={this.handleChange('user')}
              className={this.getClassName('user') && 'form-control'}
            />
          </label>
          <label className="mb-2 mr-sm-2 mb-sm-0 form-group">
            <p className="mr-sm-2">comment: </p>
            <textarea
              value={this.state.text}
              onChange={this.handleChange('text')}
              className={this.getClassName('text') && 'form-control'}
            />
          </label>
          <Button
            type="submit"
            disabled={!this.isValidForm()}
            className="btn btn-secondary"
          >
            Submit
          </Button>
        </ButtonGroup>
      </form>
    )
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addComment(this.state)
    this.setState({
      user: '',
      text: ''
    })
  }

  isValidForm = () => ['user', 'text'].every(this.isValidField)

  isValidField = (type) => this.state[type].length >= limits[type].min

  getClassName = (type) => (this.isValidField(type) ? '' : 'form-input__error')

  handleChange = (type) => (ev) => {
    const { value } = ev.target
    if (value.length > limits[type].max) return
    this.setState({
      [type]: value
    })
  }
}

const limits = {
  user: {
    min: 10,
    max: 50
  },
  text: {
    min: 10,
    max: 50
  }
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    addComment: (comment) => dispatch(addComment(comment, ownProps.articleId))
  })
)(CommentForm)
