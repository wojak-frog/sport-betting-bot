function getdata() {
     
      var getPendingOrders = setInterval(async ()=>{
      clearInterval(getPendingOrders)
      
      const KEY = "09ae6f831bc3686a57d16996c30a8fdf"
      const response = await fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=${KEY}&sport=soccer&region=eu&mkt=totals`)
      let json = await response.json()
      console.log(response)
      console.log(json)

      const TEAMS = [];
      const LEAUGUES = [];
      const ODDS = [];
      const TIME = [];
      const matches = new Map();
      const sites = new Map();

      for(i = 0; i < json['data'].length; i++) {
        // console.log(json['data'][i]['teams'])
        TEAMS.push(json['data'][i]['teams'])
        matches.set(json['data'][i]['sport_nice'], json['data'][i]['teams'])

        // Get Odds for single match
        if (json['data'][i]['sites'].length > 2) {
            console.log(json['data'][i]['teams'])
            for ( site of json['data'][i]['sites'] ) {
                sites.set(`${site['site_key']} : ${json['data'][i]['teams']}`,
                        s = site['odds']['totals']['points'][0] === 2.5 ? site['odds']['totals']['odds'] : null)

            }
        }


      }
      
      console.log(sites)
    }
)
}

getdata()
