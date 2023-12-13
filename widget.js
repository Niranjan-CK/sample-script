{
  "settings": {
    "type": {
      "mobile": "carousel",
      "desktop": "grid",
      "tablet": "list"
    },
    "columns": {
      "mobile": 2,
      "desktop": 5,
      "tablet": 3
    },
    "limit": 10,
    "position": "bottom",
    "rule": "BESTSELLERS",
    "context": "contextual",
    "template": "1.0",
    "languages": {
      "default": "en",
      "selected": ["en", "es"]
    },
    "rules": {
      "filters": [
        {
          "name": "recently_viewed",
          "type": "condition",
          "values": ["category"],
          "condition": "IN"
        }
      ],
      "display": [
        {
          "name": "accountStatus",
          "type": "condition",
          "values": ["all"],
          "condition": "IN"
        },
        {
          "name": "date",
          "type": "condition",
          "condition": "IN",
          "values": [
            {
              "to": "16/10/2027",
              "from": "13/10/2023"
            }
          ]
        }
      ]
    },
    "customHtml": {
      "status": false
    }
  },
  "config": {
    "widget": {
      "styles": {
        "background": "#000000",
        "border-color": "#D4D8DF"
      },
      "elements": {
        "title": {
          "tag": "title",
          "status": true,
          "styles": {
            "color": "#000000",
            "text-align": "center"
          }
        },
        "productName": {
          "tag": "product-name",
          "status": true,
          "styles": {
            "color": "#000000",
            "text-align": "center"
          }
        },
        "price": {
          "tag": "price",
          "status": true,
          "styles": {
            "color": "#000000"
          }
        },
        "compareAtPrice": {
          "tag": "compare-price",
          "status": true,
          "styles": {
            "color": "#212121"
          }
        },
        "productImage": {
          "tag": "product-image",
          "status": true,
          "styles": {}
        },
        "footer": {
          "poweredBy": {
            "tag": "powered-by",
            "status": true
          }
        },
        "buttons": {
          "tag": "buttons",
          "status": true,
          "elements": {
            "cart": {
              "tag": "cart-button",
              "status": true,
              "styles": {
                "color": "#FFFFFF",
                "background-color": "#000000",
                "border-color": "#1863DC"
              },
              "action": "redirectToCart"
            }
          }
        }
      },
      "page": "product",
      "id" : 12
    }
  },
  "meta": {
    "customCSS": "",
    "customHTML": ""
  }
}
