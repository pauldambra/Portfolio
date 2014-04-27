console.log("main..");

var Tweet = Backbone.Model.extend({});

var TweetList = Backbone.Collection.extend({
	model : Tweet,
	url : 'data/mockTweets.json',

	initialize : function() {
	},
});

var tweetTemplate = $("#tweet-item-template").html();
console.log("tweetTemplate=" + tweetTemplate);

var TweetView = Backbone.View.extend({	
		initialize : function() {
		},
		
		 render: function() { 		 			 			 			 	
		  	return _.template(tweetTemplate, ({ message : this.model.message }));
  		}
});

var TwitterView = Backbone.View.extend({
	tagName : "li",
	el : '#twitter-feed',

	initialize : function() {
		this.collection = new TweetList();
		this.render();
	},

	render : function() {
		console.log("Fetching tweets");
		
		var that = this;
		
		this.collection.fetch({
			success : function(collection, response) {
				_.each(that.collection.models, function (item){
					that.renderApp(item.toJSON());
				}, that);
				
			},
			error : function(collection, response) {
				throw new Error("Twitter fetch error" + response.responseText);
			}
		});
	},
	
	renderApp: function(item) {
		var tweetView = new TweetView({
				model: item
		});
								
		this.$el.append( tweetView.render() );
	}
});

twitterView = new TwitterView();
