const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req,res){

const nameofcoin=req.body.coinname;
  const url="https://data.messari.io/api/v1/assets/" + nameofcoin + "/metrics";
console.log(nameofcoin);
  https.get(url,(response)=>{
    console.log("Data");
    response.on("data",function(data){

      const coin=JSON.parse(data);
      if(coin.data==null){
      res.render("error",{CoinName: nameofcoin});
      }
      else {


     const cname=coin.data.name;
      const csymbol =coin.data.symbol;
      const cprice_usd=(coin.data.market_data.price_usd).toLocaleString();
      const cvolume=coin.data.market_data.volume_last_24_hours.toLocaleString();
      const cmarketcap=coin.data.marketcap.current_marketcap_usd.toLocaleString();
      const crank=coin.data.marketcap.rank;
      const call_time_high=coin.data.all_time_high.price.toLocaleString();
      const cmarketdominance=coin.data.marketcap.marketcap_dominance_percent;
      const cannualinflationpercent=coin.data.supply.annual_inflation_percent;

res.render("final",{Pagetitle: cname ,
                   CoinName: cname,
                   symbol: csymbol,
                   volume: cvolume,
                   price_usd : cprice_usd,
                   market_cap : cmarketcap,
                  rank : crank,
                 marketdominance : cmarketdominance,
                all_time_high : call_time_high,
                annualinflationpercent : cannualinflationpercent});
}
    });

  });

});



app.listen(3000,()=>{
  console.log("You just popped into the server");
});
