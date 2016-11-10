var React = require("react");
var $ = require('jquery');
var GithubUser = require('./GithubUser.jsx')



var Following = React.createClass({
   
     getInitialState: function(){
        return({});
    },
    
    fetchData: function(){
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/following?client_id=d1bd4fb2096c1b3d66fb&client_secret=34d5a12aef7b9fec6bd6c6b8e50facb891dc7293`)
        .then(
        function(following){
            that.setState({
                following : following
            })
            // console.log(followers);
        }
        )
    },
    
    componentDidMount: function(){
      this.fetchData();  
    },
    render: function(){
        console.log(this.props.params.username)
        console.log(this.state.following)
        if (!this.state.following) {
            console.log("not yet")
            return <div>LOADING FOLLOWERS...</div>
        }
        else{
            return (
                <div className="following-page">
                    <h2>{this.props.params.username} is following:</h2>
                    <ul>
                        {this.state.following.map(function(x){return(<GithubUser user = {x} key = {x.id}/>)})}
                    </ul>
                </div>
            );
        }
    }
        // .map(function(x){console.log(x);
    // {this.state.followers.map(function(x){console.log(x);<GithubUser user = {x} key = {x.id}/>})}
    // {this.state.followers.map((x, index) => (<GithubUser user = {x} key = {index}/>))}
})

module.exports = Following;