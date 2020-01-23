const fetch = require('node-fetch');
const jsonData = require('../movies.json');

module.exports.home=function(req, res){
                    return res.render('home');
                   }
module.exports.search=async function(req,res){
                   try{
                      let ss=[];
                      let s=req.query.s;
                      let y=req.query.y;
                      if(s==""&&y=="")
                      return  res.render('home',{search:jsonData});
                    
                      let url = 'http://www.omdbapi.com/?s=' + s +'&y=' + y + '&apikey=68fd98ab';
                      let response=await fetch(url);
                      let json=await response.json();
                      let str=s.toLowerCase();
                     
                      if(json.Response=="False")
                      {  
                        for(j of jsonData)
                        if((str==j.Title.toLowerCase())||(y==j.Year))
                            ss.push(j);
                        
                        return  res.render('home',{search:ss});
                      }
                    
                      for(j of jsonData){ 
                      if((str==j.Title.toLowerCase())||(y==j.Year))
                          json.Search.push(j);
                       }
                      

                     return  res.render('home',{search:json.Search});
                   }catch(err){console.log('Error', err);return;}   
                }