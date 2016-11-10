var React = require("react");
var $ = require('jquery');
var GithubUser = require('./GithubUser.jsx');
var Infinite = require('react-infinite');



var Followers = React.createClass({
   
     getInitialState: function(){
        return({
            followers:[],
            page:1,
            loading:false
        });
    },
    
    fetchData: function(){
        var that = this;
        var theUrl =`https://api.github.com/users/${this.props.params.username}/followers?client_id=d1bd4fb2096c1b3d66fb&client_secret=34d5a12aef7b9fec6bd6c6b8e50facb891dc7293&page=${this.state.page}&per_page=50`;
        console.log(theUrl);
        
        this.setState({
            loading:true
        });
        
        $.getJSON(theUrl)
        .then(
        function(followers){
            var newFollowers = that.state.followers.concat(followers);
            that.setState({
                followers : newFollowers,
                loading:false,
                page: that.state.page +1
                
            });
        }
        );
    },
    
    componentDidMount: function(){
      this.fetchData();  
    },
    render: function(){
 
        return (
            <div className="followers-page">
                <h2>Followers of {this.props.params.username}</h2>
                <Infinite isInfiniteLoading = {this.state.loading} onInfiniteLoad = {this.fetchData} useWindowAsScrollContainer elementHeight = {60} infiniteLoadBeginEdgeOffset = {100} loadingSpinnerDelegate={<div>LOADING</div>}>
                    {this.state.followers.map(function(x){return(<GithubUser user = {x} key = {x.id}/>)})}
                </Infinite>
            </div>
        );
    }
});

module.exports = Followers;