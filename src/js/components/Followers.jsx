var React = require("react");
var $ = require('jquery');
var GithubUser = require('./GithubUser.jsx')



var Followers = React.createClass({
   
     getInitialState: function(){
        return({});
    },
    
    fetchData: function(){
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?client_id=d1bd4fb2096c1b3d66fb&client_secret=34d5a12aef7b9fec6bd6c6b8e50facb891dc7293`)
        .then(
        function(followers){
            that.setState({
                followers : followers,
            })
            // console.log(followers);
        }
        )
    },
    
    componentDidMount: function(){
      this.fetchData();  
    },
    render: function(){
        // console.log(this.props.params.username)
        // console.log(this.state.followers)
        if (!this.state.followers) {
            console.log("not yet")
            return <div>LOADING FOLLOWERS...</div>
        }
        else{
            return (
                <div className="followers-page">
                    <h2>Followers of {this.props.params.username}</h2>
                    <ul>
                        {this.state.followers.map(function(x){return(<GithubUser user = {x} key = {x.id}/>)})}
                    </ul>
                </div>
        
            );
        }
    }
        // .map(function(x){console.log(x);
    // {this.state.followers.map(function(x){console.log(x);<GithubUser user = {x} key = {x.id}/>})}
    // {this.state.followers.map((x, index) => (<GithubUser user = {x} key = {index}/>))}
})

module.exports = Followers;