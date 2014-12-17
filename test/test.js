diff = require("../lib/diff-nx")

function create_test_network_list() {
    var mock = require('../lib/mock')
    var list = mock.create()
    list.add()
        .year(2014)
        .month(2)
        .developer('adam')
        .developer('ben')
        .developer('cindy')
        .relationship('adam', 'ben')
        .relationship('ben', 'cindy')

    list.add()
        .year(2014)
        .month(3)
        .developer('adam')
        .developer('ben')
        .developer('cindy')
        .developer('dave')
        .relationship('adam', 'ben')
        .relationship('ben', 'cindy')
        .relationship('dave', 'cindy')

    return list;
}

var network_list = create_test_network_list();

diff.importFromJson(network_list.json())

function query(expr) {
    it(expr, function() {
    	console.log("> " + expr);
        eval(expr).print()
    })
}

describe('diff', function() {
    query('diff.find().year(2014)')
    query('diff.find().year(2014).month(2)')
    query('diff.find().year(2014).developers()')
    query('diff.find().year(2014).month(2).developers()')
    query('diff.find().year(2014).month(3).developers()')
})