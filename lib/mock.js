module.exports = (function() {

    function create(){
        return new NetworkList();
    }

    function NetworkList() {
        this.networks = [];
    }

    NetworkList.prototype = {
        constructor: NetworkList,

        add: function() {
            var g = new Builder();
            this.networks.push(g);
            return g;
        },

        json: function(){
            return JSON.stringify(this.networks);
        }
    }

    function Builder() {
        this.developers = [];
        this.relationships = [];
    }

    Builder.prototype = {
        constructor: Builder,

        year: function(year) {
            this.year = year;
            return this;
        },

        month: function(month) {
            this.month = month;
            return this;
        },

        developer: function(name) {
            this.developers.push(name);
            return this;
        },

        relationship: function(name1, name2) {
            this.relationships.push([name1, name2]);
            return this;
        }
    };

    return {
        create: create
    };
}());