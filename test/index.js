var fracas = require('../')
var should = require('should')

describe('typkit.getId()', function(){

    it('should find .net matches', function(){
        document.body.innerHTML = [
            '<script type="text/javascript" src="//use.typekit.net/aaa.js"></script>'
        ].join()
        fracas.typekit.getId().should.equal('aaa')
    })

    it('should find .com matches', function(){
        document.body.innerHTML = [
            '<script type="text/javascript" src="//use.typekit.com/aaa.js"></script>'
        ].join()
        fracas.typekit.getId().should.equal('aaa')
    })

    it('should not find false positives', function(){
        document.body.innerHTML = [
            '<script type="text/javascript" src="//use.typekit.blerg/aaa.js"></script>',
            '<script type="text/javascript" src="//used.typekit.com/aaa.js"></script>',
            '<script type="text/javascript" src="//use.typekith.com/aaa.js"></script>',
            '<script type="text/javascript" src="//use.typekit.com/aaa.jst"></script>'
        ].join()
        should.not.exist(fracas.typekit.getId())
    })

})
