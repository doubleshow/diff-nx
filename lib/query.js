module.exports = function(diff) {

    var _graphs = {};

    diff.importFromJson = function importFromJson(json) {
        _graphs = JSON.parse(json);
    }

    diff.find = function find() {
        return new Finder();
    }

    function Finder() {    	
        this.results = [];
        this.selectors = [];
        //this.projection = und;
    };

    Finder.prototype = {

        constructor: Finder,

        year: function(year) {
            this.selectors.push(function(g) {
                return g.year == year;
            });
            return this;
        },

        month: function(month) {
            this.selectors.push(function(g) {
                return g.month == month;
            });
            return this;
        },

        developers: function(){
        	this.projection = function(g){
        		return g.developers;
        	};
        	return this;
        },

        print: function() {
        	var self = this;

        	// select graphs
        	var selected_graphs = _graphs.filter(function(g){
				return self.selectors.every(function(s){
					return s(g);
				})
        	});

	       	// apply projection
        	if ('projection' in self){
	        	var results = selected_graphs.map(function(g){
	        		return self.projection(g);
	        	});
        	}else{
        		var results = selected_graphs;
        	}

            console.log(results);
        }

    };

};