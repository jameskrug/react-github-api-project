var React = require("react");
var $ = require('jquery');
var GithubRepo = require('./GithubRepo.jsx');
var Infinite = require("react-infinite");



var Repos = React.createClass({
   
     getInitialState: function(){
        return({
            repos: [],
            page:1,
            loading:false
        });
    },
    
    fetchData: function(){
        var that = this;
        var theUrl = `https://api.github.com/users/${this.props.params.username}/repos?client_id=d1bd4fb2096c1b3d66fb&client_secret=34d5a12aef7b9fec6bd6c6b8e50facb891dc7293&page=${this.state.page}&per_page=50`;
        
        this.setState({
            loading:true
        });
        
        $.getJSON(theUrl)
        .then(
        function(repos){
            var newRepo = that.state.repos.concat(repos);
            that.setState({
                repos : newRepo,
                loading:false,
                page:that.state.page+1
            });
        });
    },
    
    componentDidMount: function(){
      this.fetchData();  
    },
    
    render: function(){
        return (
            <div className="followers-page">
                <h2>{this.props.params.username}'s' Repos</h2>
                <Infinite isInfiniteLoading = {this.state.loading} onInfiniteLoad = {this.fetchData} useWindowAsScrollContainer elementHeight = {30} infiniteLoadBeginEdgeOffset = {100} loadingSpinnerDelegate={<div>LOADING</div>}>
                    {this.state.repos.map(function(x){return(<GithubRepo repo = {x} key = {x.id}/>)})}
                </Infinite>
            </div>
        );
    }
});


module.exports = Repos;