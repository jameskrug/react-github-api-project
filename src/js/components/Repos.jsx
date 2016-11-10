var React = require("react");
var $ = require('jquery');
var GithubRepo = require('./GithubRepo.jsx')



var Repos = React.createClass({
   
     getInitialState: function(){
        return({});
    },
    
    fetchData: function(){
        var that = this;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos?client_id=d1bd4fb2096c1b3d66fb&client_secret=34d5a12aef7b9fec6bd6c6b8e50facb891dc7293`)
        .then(
        function(repos){
            that.setState({
                repos : repos
            })
        }
        )
    },
    
    componentDidMount: function(){
      this.fetchData();  
    },
    
    render: function(){
        if (!this.state.repos) {
            console.log("not yet")
            return <div>LOADING FOLLOWERS...</div>
        }
        else{
            return (
                <div className="followers-page">
                    <h2>{this.props.params.username}'s' Repos</h2>
                    <ul>
                        {this.state.repos.map(function(x){return(<GithubRepo repo = {x} key = {x.id}/>)})}
                    </ul>
                </div>
            );
        }
    }
})


module.exports = Repos;