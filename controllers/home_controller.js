const fetch = require('node-fetch');
module.exports.home=function(req, res){
                    return res.render('home');
                   }
module.exports.search=async function(req,res){
                   try{
                      let title=req.query.title;
                      let url = 'http://www.omdbapi.com/?t=' + title + '&apikey=68fd98ab';
                      let response=await fetch(url);
                      let json=await response.json();
                      //console.log(json);
                     return  res.render('home',{search:json});
                   }catch(err){console.log('Error', err);return;}   
                }