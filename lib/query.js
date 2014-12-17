var _ = require('lodash')

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

        developers: function() {
            this.projection = function(g) {
                return g.developers;
            };
            return this;
        },

        relationships: function() {
            this.projection = function(g) {
                return g.relationships;
            };
            return this;
        },

        added: function() {
            this.diff = function(x1, x2) {
                return _.difference(x1, x2);
            }
            return this;
        },

        removed: function() {
            this.diff = function(x1, x2) {
                return _.difference(x2, x1);
            }
            return this;
        },

        print: function() {
            var self = this;

            // select graphs
            var selected_graphs = _graphs.filter(function(g) {
                return self.selectors.every(function(s) {
                    return s(g);
                })
            });

            // apply projection
            if ('projection' in self) {
                var projected = selected_graphs.map(function(g) {
                    return self.projection(g);
                });

                if ('diff' in self && projected.length >= 2) {

                    var x1 = projected[0]
                    var x2 = projected[1]
                    
                    projected = self.diff(x1, x2);

                } else {

                    // flatten only a single level
                    projected = _.unique(_.flatten(projected, true));
                }

                var results = projected;

            } else {
                var results = selected_graphs;
            }



            console.log(results);
        }

    };

};