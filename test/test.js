diff = require("../lib/diff-nx")

function create_test_network_list() {
    var mock = require('../lib/mock')
    var list = mock.create()
    list.add()
        .year(2014)
        .month(1)
        .developer('adam')
        .developer('ben')
        .relationship('adam', 'ben')

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
        .developer('dave')
        .developer('mario')
        .relationship('adam', 'ben')
        .relationship('ben', 'mario')
        .relationship('dave', 'mario')


    list.add()
        .year(2014)
        .month(4)
        .developer('adam')
        .developer('ben')
        .developer('caleb')
        .developer('dave')
        .developer('eva')
        .developer('mario')
        .relationship('eva', 'caleb')
        .relationship('adam', 'ben')
        .relationship('ben', 'mario')
        .relationship('dave', 'mario')

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
    query('diff.find().year(2014).month(3).relationships()')
    query('diff.find().year(2014).developers().added()')
    query('diff.find().year(2014).developers().removed()')
})