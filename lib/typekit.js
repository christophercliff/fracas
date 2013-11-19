var SCRIPT_SRC_RE = /use\.typekit\.(com|net)\/(.+)\.js$/

exports.getId = getId

function getId() {

    var nodes = document.getElementsByTagName('script')

    for (var i = 0, m = null; i < nodes.length; i++, m = null) {
        m = nodes[i].src.match(SCRIPT_SRC_RE)
        if (!m) continue
        return m[2]
    }

}
