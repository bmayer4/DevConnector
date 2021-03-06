import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearCurrentProfile } from '../../actions/profileActions';


class ProfileGithub extends Component {    

  state = {
    clientId: '9e4ab976f405889fde47',
    clientSecret: 'eb993bcdb1f869ad8d24e642fc167fe63cc3427d',
    count: 5,
    sort: 'created: asc',
    repos: []
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    // axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}
    // &client_secret=${clientSecret}`).then(res => {
    //   if (this.refs.myRef) {  
    //     this.setState({
    //       repos: res.data
    //     })
    //   }
    // }).catch(err => console.log(err));  axios didn't work...
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef && !data.message) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

componentWillUnmount() {
  this.props.clearCurrentProfile();
}

  render() {

    const { repos } = this.state;
    const repoItems = repos.map(repo => {
      return (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4><a href={repo.html_url} className="text-info" target="_blank">{repo.name}</a></h4>
              <p>{repo.discription}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div ref="myRef">
        <hr/>
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch)  => ({
  clearCurrentProfile: () => dispatch(clearCurrentProfile())
})

export default connect(null, mapDispatchToProps)(ProfileGithub);
