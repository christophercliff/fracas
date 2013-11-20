var _ = require('underscore')

var SCRIPT_SRC_RE = /use\.typekit\.(com|net)\/(.+)\.js$/

exports.getIds = getIds
exports.getPublicUrl = getPublicUrl
exports.getApiEndpoint = getApiEndpoint
exports.parseApiResponse = parseApiResponse

function getApiEndpoint(id) {
    assert(_.isString(id), 'id must be a string')
    return 'https://typekit.com/api/v1/json/kits/' + id + '/published'
}

function getIds() {
    return _.chain(document.getElementsByTagName('script'))
        .map(function(n){
            var match = n.src.match(SCRIPT_SRC_RE)
            if (!match) return null
            return match[2]
        })
        .compact()
        .uniq()
        .value()
}

function getPublicUrl(slug) {
    assert(_.isString(slug), 'slug must be a string')
    return 'http://typekit.com/fonts/' + slug
}

function parseApiResponse(res) {
    assert(_.isObject(res), 'res must be an object')
    if (res.errors) throw new Error(res.errors.join(', '))
    assert(_.isObject(res.kit), 'res.kit must be an object')
    assert(_.isArray(res.kit.families), 'res.kit.families must be an array')
    _.chain(res.kit.families)
        .map(function(family){
            return {
                name: family.name,
                variations: family.variations
            }
        })
        .value()
}
