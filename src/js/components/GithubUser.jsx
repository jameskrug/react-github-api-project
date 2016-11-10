var React = require('react');
var Link = require('react-router').Link;

var GithubUser = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    
    render: function(){
        return(
            <Link to = {"/user/"+this.props.user.login} className = "followerlist">
              <img className = "followeravatar" src={this.props.user.avatar_url}/>
              <p>{this.props.user.login}</p>
            </Link>
        );
    }
});

module.exports = GithubUser;