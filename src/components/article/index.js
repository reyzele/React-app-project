import React, { PureComponent } from 'react'
import CSSTransition from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../comment-list'
import { deleteArticle, loadArticleById } from '../../ac'
import './style.css'
import Loader from '../common/loader'
import { articleSelector } from '../../selectors'
import i18n from '../i18n'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

class Article extends PureComponent {
  static propTypes = {
    id: PropTypes.string,

    article: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string
    }),
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  componentDidMount() {
    const { loadArticleById, article, id } = this.props
    if (!article || (!article.text && !article.loading)) loadArticleById(id)
  }

  render() {
    const { article, t } = this.props
    if (!article) return null

    return (
      <div>
        <Card className="card">
          <div className="card-header article__header">
            <CardTitle className="article__title">{article.title}</CardTitle>
            <Button onClick={this.handleDeleteClick}>{t('delete me')}</Button>
          </div>
          <CSSTransition
            transitionAppear
            transitionName="article"
            transitionEnterTimeout={500}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={300}
          >
            {this.body}
          </CSSTransition>
        </Card>
      </div>
    )
  }

  handleDeleteClick = () => {
    const { deleteArticle, article } = this.props
    deleteArticle(article.id)
  }

  get body() {
    const { isOpen, article } = this.props
    if (!isOpen) return null
    if (this.state.error) return <h3>Error</h3>
    if (article.loading) return <Loader />

    return (
      <section className="card-body test--article__body">
        <CardText>{article.text}</CardText>
        <CommentList article={article} />
      </section>
    )
  }
}

export default connect(
  (state, props) => ({
    article: articleSelector(state, props)
  }),
  { deleteArticle, loadArticleById }
)(i18n(Article))
