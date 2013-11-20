var fracas = require('../')
var should = require('should')

describe('typkit.getIds()', function(){

    var ids

    beforeEach(function(){
        document.head.innerHTML = ''
    })

    it('should find .net matches', function(){
        document.body.innerHTML = [
            '<script type="text/javascript" src="//use.typekit.net/qto3kyx.js"></script>'
        ].join()
        ids = fracas.typekit.getIds()
        ids.should.eql(['qto3kyx'])
    })

    it('should find .com matches', function(){
        document.body.innerHTML = [
            '<script type="text/javascript" src="//use.typekit.com/qto3kyx.js"></script>'
        ].join()
        ids = fracas.typekit.getIds()
        ids.should.eql(['qto3kyx'])
    })

    it('should not find false positives', function(){
        document.body.innerHTML = [
            '<script type="text/javascript" src="//use.typekit.blerg/qto3kyx.js"></script>',
            '<script type="text/javascript" src="//used.typekit.com/qto3kyx.js"></script>',
            '<script type="text/javascript" src="//use.typekith.com/qto3kyx.js"></script>',
            '<script type="text/javascript" src="//use.typekit.com/qto3kyx.jst"></script>'
        ].join()
        ids = fracas.typekit.getIds()
        ids.should.eql([])
    })

})

describe('googleFonts.getFamilies()', function(){

    var families

    beforeEach(function(){
        document.head.innerHTML = ''
    })

    it('should find single matches', function(){
        document.body.innerHTML = [
            '<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic" rel="stylesheet" type="text/css">'
        ].join()
        families = fracas.googleFonts.getFamilies()
        families.should.eql([
            { name: 'Source Sans Pro', variations: [] }
        ])
    })

    it('should find double matches', function(){
        document.body.innerHTML = [
            '<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic|Antic+Slab" rel="stylesheet" type="text/css">'
        ].join()
        families = fracas.googleFonts.getFamilies()
        families.should.eql([
            { name: 'Source Sans Pro', variations: [] },
            { name: 'Antic Slab', variations: [] }
        ])
    })

})
