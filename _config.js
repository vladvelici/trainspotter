var config = {
    "stomp": {
        "url": "datafeeds.nationalrail.co.uk",
        "port": 61613,
        "user": "d3user",
        "pass": "d3password",
        "qname": ""
    },
    "mongo": {
        "url": "mongodb://localhost:27017/trainspotter"
    }
}

module.exports = config;
