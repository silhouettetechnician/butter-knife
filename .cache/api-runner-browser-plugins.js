module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-layout/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-fontawesome-css/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"BUTTER KNIFE","short_name":"BUTTER KNIFE","start_url":"/","display":"minimal-ui","icon":"src/images/favicon-32x32.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"77d455abdc481d26ea067de687fb5a50"},
    },{
      plugin: require('../node_modules/gatsby-plugin-apollo-shopify/gatsby-browser.js'),
      options: {"plugins":[],"shopName":"butter-knife-concession-store","accessToken":"46be9998df79d3221b6f6af6f0c6c67a","apiVersion":"2020-07"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
