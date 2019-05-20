import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  articlesLoadedSelector,
  articlesLoadingSelector,
  filtratedArticlesSelector
} from '../selectors'
import { loadAllArticles } from '../ac'
import Loader from './common/loader'
import { NavLink, withRouter } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchData: PropTypes.func
  }

  render() {
    if (this.props.loading) return <Loader />
    return (
      <div className="articles">
        <h4 className="articles__title">Articles:</h4>
        <ListGroup>{this.items}</ListGroup>
      </div>
    )
  }

  get items() {
    const { articles } = this.props
    return articles.map((article) => (
      <ListGroupItem key={article.id} className="test--article-list__item">
        <NavLink to={`/articles/${article.id}`} activeStyle={{ color: 'red' }}>
          {article.title}
        </NavLink>
      </ListGroupItem>
    ))
  }

  componentDidMount() {
    const { fetchData, loaded, loading } = this.props
    fetchData && !loading && !loaded && fetchData()
  }
}

export default withRouter(
  connect(
    (state) => {
      return {
        articles: filtratedArticlesSelector(state),
        loading: articlesLoadingSelector(state),
        loaded: articlesLoadedSelector(state)
      }
    },
    { fetchData: loadAllArticles }
    /*
    null,
  { pure: false }
*/
  )(ArticleList)
)
