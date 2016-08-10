var App = React.createClass({
	getInitialState() {
		return {
			movies: []
		};
	},
	handleOnKeyUp: function(event) {
		// if user presses Enter, process data
		if(event.which === 13) {
			console.log(event.target.value);
			var input = event.target.value;
			var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + encodeURIComponent(input) + '&callback=?';

			this.serverRequest = $.getJSON(apiUrl, function (result) {
				console.log(result);
				var movieItems = [];
				var movie;
				result.results.forEach(function(obj) {
					console.log(obj);
						// movie.title = obj.title;
						// movie.overview = obj.overview;
						// movie.poster_path = obj.poster_path;
						// movie.release_date = obj.release_date;
						// movie.popularity = obj.popularity;
						// movie.adult = obj.adult;
						// movie.backdrop_path = obj.backdrop_path;
						// movie.id = obj.id;
						// movie.original_language = obj.original_language;
						// movie.original_title = obj.original_title;
						// movie.video = obj.video;
						// movie.vote_average = obj.vote_average;
						// movie.vote_count = obj.vote_count;

					movieItems.push(obj);
				});
				this.setState({
					movies: movieItems
				});
			}.bind(this));
		}
	},
	render: function() {
		return (
			<div className="section section-main section-primary">
			<div className="container">
			<div className="row">
			<div className="col-md-12 text-center">
			<h1 className="text-center heading">Welcome to Moogle!</h1>
			<h4 className="subheading">The Google for Movies</h4>
			<br/>
			<br/>
			</div>
			</div>
			<div className="row">
			<div className="col-md-6 col-md-offset-3 text-center">
			<input type="text" className="customInputField" placeholder="Input movie title and press Enter" onKeyUp={this.handleOnKeyUp}></input> 
			</div>
			</div>
			</div>
			<br />
			<br />
			{<AllMovies movies={this.state.movies} />}
			</div>
			);
	}
});

var AllMovies = React.createClass({
	getInitialState() {
		return {
			items: []  
		};
	},
	render: function() {
		var movieItems = [];
		for(var i = 0; i < this.props.movies.length; i++) {
			var movie = this.props.movies[i];
			movieItems.push(
				<Movie title={movie.title} overview={movie.overview} poster={movie.poster_path} releaseDate={movie.release_date} popularity={movie.popularity} key={i}/>
			);
		}
		return (
			<div>
				{movieItems}
			</div>
			);
	}
});

var Movie = React.createClass({
	render: function() {
		var imageUrl = 'http://image.tmdb.org/t/p/w500/' +	this.props.poster;
		var hasPoster = true;
		if(this.props.poster == null || this.props.poster == '') {
			hasPoster = false;
		}
		return (
			<div className="section sectionMovies"> 
			<div className="container movieContainer"> 
			<div className="row"> 
			<div className="col-md-6"> 
			<h1 className="title">{this.props.title}</h1>
			<div className="description">
			<h4><b>Relase Date:</b> {this.props.releaseDate}</h4>
			<h4><b>Popularity:</b> {this.props.popularity}</h4>
			<p>{this.props.overview}</p>
			</div>
			</div>
			<div className="col-md-6 text-center"> 
			{hasPoster ? <img src={imageUrl} className="poster img-center vcenter" /> : <span> <img src='../images/placeholder.png' className="placeholder img-center vcenter" /> <h3>No Image Found </h3> </span>}
			</div>
			</div>
			</div>
			</div>
			);
	}
});

ReactDOM.render(<App />, document.getElementById("app"));