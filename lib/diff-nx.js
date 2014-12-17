module.exports = (function(){

	var diff = {};	
    
    function use(func) {
        func(diff);
    };
    use(require('./query.js'))

    return diff;

}());