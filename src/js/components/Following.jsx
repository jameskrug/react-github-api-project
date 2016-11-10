var React = require("react");
var $ = require('jquery');
var GithubUser = require('./GithubUser.jsx')



var Following = React.createClass({
   
     getInitialState: function(){
        return({
            following: [],
            page: 1,
            loading:false
        });
    },
    
    fetchData: function(){
        var that = this;
        var theUrl = `https://api.github.com/users/${this.props.params.username}/following?client_id=d1bd4fb2096c1b3d66fb&client_secret=34d5a12aef7b9fec6bd6c6b8e50facb891dc7293&page=${this.state.page}&per_page=50`
        
        this.setState({
            loading:true
        })
        
        $.getJSON(theUrl)
        .then(
        function(following){
            var newFollowing = that.state.following.concat(following);
            that.setState({
                following : newFollowing,
                loading:false,
                page: that.state.page+1
            })
            // console.log(followers);
        }
        )
    },
    
    componentDidMount: function(){
      this.fetchData();  
    },
    render: function(){

        return (
            <div className="following-page">
                <h2>{this.props.params.username} is following:</h2>
                <Infinite isInfiniteLoading = {this.state.loading} onInfiniteLoad = {this.fetchData} useWindowAsScrollContainer elementHeight = {60} infiniteLoadBeginEdgeOffset = {100} loadingSpinnerDelegate={<div>LOADING</div>}>
                    {this.state.following.map(function(x){return(<GithubUser user = {x} key = {x.id}/>)})}
                </Infinite>
            </div>
        );
    
    }
});

module.exports = Following;