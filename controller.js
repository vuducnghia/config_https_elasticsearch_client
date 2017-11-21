
var client = new $.es.Client({
  host:
  {
    protocol: 'https',
    host: 'demo',
    port: 8111,

  },
  ssl: {
    // ca: fs.readFileSync('./cacert.pem'),
    rejectUnauthorized: true
  }

});

function searchdata1(data) {

  var y = {
    "bool": {
      "should": [{
        "prefix": {
          "com_customer_code": {
            "prefix": data,
            "boost": 0.5
          }
        }
      }, {
        "prefix": {
          "com_company_code": {
            "prefix": data,
            "boost": 0.5
          }
        }
      }, {
        "prefix": {
          "com_company_name": {
            "prefix": data,
            "boost": 0.2
          }
        }
      }, {
        "prefix": {
          "com_company_furigana": {
            "prefix": data,
            "boost": 0.2
          }
        }
      }, {
        "prefix": {
          "com_url": {
            "prefix": data,
            "boost": 0.1
          }
        }
      }]
    }
  }


  return client.search({
    index: 'it_company_msts',
    body: {
      query: y,
      size: 1000
    }

  })

}
function searchdata2(data) {
  var x = {
    "bool": {
      "should": [{
        "query_string": {
          "query": "?*" + data + "*",
          "fields": ["com_customer_code"],
          "boost": 0.5
        }
      }, {
        "query_string": {
          "query": "?*" + data + "*",
          "fields": ["com_company_code"],
          "boost": 0.6
        }
      }, {
        "query_string": {
          "query": "?*" + data + "*",
          "fields": ["com_company_name"],
          "boost": 0.2
        }
      }, {
        "query_string": {
          "query": "?*" + data + "*",
          "fields": ["com_company_furigana"],
          "boost": 0.2
        }
      }, {
        "query_string": {
          "query": "?*" + data + "**",
          "fields": ["com_url"],
          "boost": 0.1
        }
      }]
    }
  }
  return client.search({
    index: 'it_company_msts',
    body: {
      query: x,
      size: 1000
    }

  })
}

function searchdata3(data) {
  var x = {
    "bool": {
      "should": [{
        "query": {
          "wildcard": { "name_company": "VTVジャパン株式会社" }
        }
      }
      ]
    }
  }
  return client.search({
    index: 'it_san_card_data',
    body: {
      query: x,
      size: 1000
    }

  })
}
