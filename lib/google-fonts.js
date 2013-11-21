var _ = require('underscore')
var assert = require('assert')

var FAMILIES_RE = /\?family=([^&]*)/

exports.getFamilies = getFamilies

function getFamilies() {
    return _.chain(document.getElementsByTagName('link'))
        .map(function(n){ return parseFamiliesFromHref(n.href) })
        .flatten()
        .map(parseFamily)
        .compact()
        .uniq()
        .value()
}

function parseFamiliesFromHref(href) {
    var match
    assert(_.isString(href), 'href must be a string')
    if (href.indexOf('fonts.googleapis.com/css?') < 0) return []
    match = href.match(FAMILIES_RE)
    if (!_.isArray(match) || !match[1]) return []
    return href.match(FAMILIES_RE)[1].split('|')
}

function parseFamily(family) {
    assert(_.isString(family), 'family must be a string')
    var parts = family.split(':')
    return {
        name: parts[0].replace(/\+/g, ' '),
        variations: []//parseVariationString(parts[1])
    }
}

/*function parseVariationString(variations) {
    if (!_.isString(variations)) return []
    return variations.split(',')
}*/
