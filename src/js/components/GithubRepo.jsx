var React = require('react');

var GithubRepo = React.createClass({
    propTypes: {
        repo: React.PropTypes.object.isRequired
    },
    
    render: function(){
        var theUrl = "http://www.github.com/"+this.props.repo.full_name;
        console.log(theUrl);
        console.log(this.props.repo)
        return(
            <a href = {theUrl} className = "repolist">
              <p className = "reponame">{this.props.repo.full_name}</p>
              <p className = "repostars">{this.props.repo.stargazers_count} stars</p>
            </a>
        );
    }
});

module.exports = GithubRepo;