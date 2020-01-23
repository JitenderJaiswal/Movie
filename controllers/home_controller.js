const fetch = require('node-fetch');
const jsonData = require('../movies.json');
const jsonDatas = require('../movie.json');

module.exports.home=function(req, res){
                    return res.render('home');
                   }
module.exports.movies=async function(req, res){
                     try{
                      let id=req.query.id;
                      if(id=="")
                      return  res.render('home',{search:jsonData});

                      let url = 'http://www.omdbapi.com/?i=' + id + '&apikey=68fd98ab';
                      let response=await fetch(url);
                      let json=await response.json();
                      let a={"title":json.Title,"description":json.Plot,"duration":json.Runtime,
                            "Ratings":[{"source":json.Ratings[0].Source,
                                         "userrating":json.Ratings[0].Value}],
                            "Cast":[json.Director,json.Writer,json.Actors],"image":json.Poster
                             };
                      
                       let merge;
                       if(id==jsonData.imdbId)
                        merge={...jsonData,...a};
                    
                     return  res.render('home',{movies:merge});
                    }catch(err){
                      console.log('Error', err);return;}  
 }
module.exports.search=async function(req,res){
                   try{
                      let ss=[];
                      let s=req.query.s;
                      if(s=="")
                      return  res.render('home',{search:jsonDatas});
                    
                      let url = 'http://www.omdbapi.com/?s=' + s + '&apikey=68fd98ab';
                      let response=await fetch(url);
                      let json=await response.json();
                      let flag;

                        for(i of json.Search)
                       {   flag=false;
                         for(j of jsonDatas)
                         {
                           if(i.Title.toLowerCase()==j.title.toLowerCase())
                          { let a={"title":i.Title,"productionYear":i.Year,"image":i.Poster,"type":i.Type};
                            let merge={...j,...a};
                            ss.push(merge);
                            flag=true;
                          }
                          
                        }
                        if(!flag)
                         { let a={"title":i.Title,"productionYear":i.Year,"image":i.Poster,"type":i.Type};
                           ss.push(a);
                         }
                       }
                     
                        return  res.render('home',{search:ss});
                   }catch(err){console.log('Error', err);return;}   
                }