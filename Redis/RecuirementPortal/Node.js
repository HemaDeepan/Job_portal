
var redis = require('redis');
var client = redis.createClient();
var fs = require('fs');
var qs = require('querystring');
var http = require('http');
var request = require('request');
var path = require('path');
var formidable=require('formidable');
var express=require('express');
var url=require('url');
var list1=[];
var array=[];
http.createServer(project).listen(8080);
client.on('connect', function() {
    console.log('connected');
});

function project(req, res) {
    var bod = "";
    var q = url.parse(req.url, true);
    if (req.url == "/signup" ) {
          if (req.headers.cookie!== undefined){
   	 	res.end("<script>location.href='/job_post'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./job_signup.html").toString();
        res.write(change);
        res.end();
   	  }
    }else if(req.url=="/edit_job") {
        if (req.headers.cookie== undefined ){
   	 	res.end("<script>location.href='/job_post'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./job_signup.html").toString();
        res.write(change);
        res.end();
   	  } 
    }
    else if (req.url == "/") {
          if (req.headers.cookie !== undefined){
   	 	res.end("<script>location.href='/job_post'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./home.html").toString();
        res.write(change);
        res.end();
   	  }
    }else if (req.url == "/signin" ) {
          if (req.headers.cookie !== undefined){
   	 	res.end("<script>location.href='/job_post'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./signin.html").toString();
        res.write(change);
        res.end();
   	  }
    }
    else if (req.url == "/recsignup"  ) {
          if (req.headers.cookie !== undefined){
   	 	res.end("<script>location.href='/job_post'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./rec_signup.html").toString();
        res.write(change);
        res.end();
   	  }
    }
    if(req.url=="/edit_rec"){
      if (req.headers.cookie == undefined){
   	 	res.end("<script>location.href='/job_post'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./rec_signup.html").toString();
        res.write(change);
        res.end();
   	  }
    }
     else if (req.url == "/trnsignup"  ) {
           if (req.headers.cookie !== undefined){
   	 	res.end("<script>location.href='/'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./tn_signup.html").toString();
        res.write(change);
        res.end();
   	  }
    }
    else if(req.url=="/edit_tn" ){
       if (req.headers.cookie == undefined ){
   	 	res.end("<script>location.href='/'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./tn_signup.html").toString();
        res.write(change);
        res.end();
   	  }  
    }
     else if (req.url == "/job_post") {
           if (req.headers.cookie == undefined ){
   	 	res.end("<script>location.href='/'</script>");
      }
   	  else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        change = fs.readFileSync("./job_search.html").toString();
        res.write(change);
        res.end();
   	  }
    }
        else if(q.pathname=="/fileupload"){
            client.hget('Cookie',req.headers.cookie.split("=")[1],function(err,object){
            object=JSON.parse(object);
             var formsubmit = new formidable.IncomingForm();
            formsubmit.parse(req,function(err,fields,files){
            var oldPath=files.Profile.path;
            image=fs.readFileSync(oldPath);
            files.Profile.name=object.Email+'.png';
            var newPath=path.resolve(__dirname,'./Profile',files.Profile.name);
            var write= fs.writeFileSync(newPath,image);
            var oldPath1=files.Resume.path;
            image1=fs.readFileSync(oldPath1);
            files.Resume.name=object.Email+'.docx';
            var newPath1=path.resolve(__dirname,'./Resume',files.Resume.name);
            var write1= fs.writeFileSync(newPath1,image1);
            res.writeHead(302, {"Location": 'http://hemam-3682.zcodeusers.com/job_post'});
            res.end();
            });
            })
           
        }
        
    else if (req.method == "POST") {
        req.on('data', function(chunk) {
            bod += chunk;
        });
        req.on('end', function() {
            addCheck(bod);
        });
    }
    function addCheck(body) {
        var parseobject = qs.parse(body);
        if(req.url == "/signup1"){
            client.hvals('Details',function (err,reply){
            if(reply.indexOf(parseobject.Email)==-1) {
            client.hmset('Details', parseobject.Email, JSON.stringify(parseobject));
            create_Cookie(parseobject.Email,"jobseeker");
            res.write("OK");
            res.end();
            } else{
            res.write("already exit");
            res.end();
            }
            
            });
        }
        else if (req.url == "/signin1")
        {
            client.hkeys('Details',function(err,reply){
            var password;
            if(reply.indexOf(parseobject.Email)!==-1){
            client.hgetall('Details',function(err,object){
            password= object[parseobject.Email];
            password=JSON.parse(password);
            password=password.Password;
            if (parseobject.Password == password) 
            {
            create_Cookie(parseobject.Email,"jobseeker");
            res.write("Jobseeker");
            res.end();
            } 
            else 
            {
            res.write("wrong password");
            res.end();
            }
            });
            } 
            else {
            client.hkeys('RecDetails',function(err,reply){
            if(reply.indexOf(parseobject.Email)!==-1){
            client.hgetall('RecDetails',function(err,object){
            password= object[parseobject.Email];
            password=JSON.parse(password);
            password=password.Password;
            if (parseobject.Password == password) 
            {
            create_Cookie(parseobject.Email,"recruiter");
            res.write("Recruiter");
            res.end();
            } 
            else 
            {
            res.write("wrong password");
            res.end();
            }
            });
            } 
            else{
            client.hkeys('TrnDetails',function(err,reply){
            if(reply.indexOf(parseobject.Email)!==-1){
            client.hgetall('TrnDetails',function(err,object){
            password= object[parseobject.Email];
            password=JSON.parse(password);
            password=password.Password;
            if (parseobject.Password == password) 
            {
            create_Cookie(parseobject.Email,"trainer");
            res.write("Trainer");
            res.end();
            } 
            else {
            res.write("wrong password");
            res.end();
            }
            });
            } 
            else{
            res.write('wrng');
            res.end();  
            }
            });
            }
            });
            }
            });
        }
        else if(req.url == "/recsignup1"){
            client.hvals('RecDetails',function (err,reply){
            if(reply.indexOf(parseobject.Email)==-1) {
            client.hmset('RecDetails', parseobject.Email, JSON.stringify(parseobject));
            create_Cookie(parseobject.Email,"recruiter");
            res.write("OK");
            res.end();
            } else{
            res.write("already exit");
            res.end();
            }
            });
        }
         else if(req.url == "/trnsignup1"){
            client.hvals('TrnDetails',function (err,reply){
            if(reply.indexOf(parseobject.Email)==-1) {
            client.hset('TrnDetails', parseobject.Email, JSON.stringify(parseobject));
            create_Cookie(parseobject.Email,"trainer");
            res.write("OK");
            res.end();
            } else{
            res.write("already exit");
            res.end();
            }
            });
            }
        else if(req.url=="/post"){
            var list=[];
            client.hgetall('Post',function(err,reply){
            list.push(reply); 
            client.hgetall('RecDetails',function(err,reply){
            list.push(reply); 
            client.hgetall('TrnDetails',function(err,reply){
            list.push(reply); 
            client.hgetall('Details',function(err,reply){
            list.push(reply); 
            res.write(JSON.stringify(list));
            res.end();
            });
            });
            });
            });
        }
        else if(req.url=="/postOnWall"){
             client.hget('Cookie',parseobject.user,function(err,object){
             object=JSON.parse(object);
             client.hget('RecDetails',object.Email,function(err,object){
             object=JSON.parse(object);   
             parseobject["Company"]=object.Company;
             parseobject["Id"]=Math.floor(Math.random()*100000);
             parseobject["Email"]=object.Email;
             client.hset('Post', parseobject.Id, JSON.stringify(parseobject));
             res.write("OK");
             res.end();
             })
             })
        }
        else if(req.url=="/cookie" || req.url=="/edit"){
             client.hget("Cookie",parseobject.user,function(err,object){
             object=JSON.parse(object);
             var obj={};
             if(object !== null){
             if(object.Type=="jobseeker"){
             client.hget("Details",object.Email,function(err,object){
             var dat=JSON.parse(object);
             obj["type"]="jobseeker";
             obj["email"]=object.Email;
             obj["designation"]=dat.Designation;
             res.write(JSON.stringify(obj));
             res.end();
             })
             }else if(object.Type=="recruiter"){
             obj["Type"]="recruiter";
             obj["email"]=object.Email;
             res.write(JSON.stringify(obj))
             res.end();
             }else if(object.Type=="trainer"){
             obj["Type"]="Trainer";
             obj["email"]=object.Email;
             res.write(JSON.stringify(obj));
             res.end(); 
             }
             else{
             res.write("something wrng");
             res.end();  
             }
             }else{
                 res.end("false");
             }
            })
        }
        else if(req.url=="/trainer_Post"){
              client.hget("Cookie",parseobject.user,function(err,object){
              object=JSON.parse(object);
             client.lpush(parseobject.id, object.Email);
             client.lpush( object.Email, parseobject.btn_id); 
             res.write("ok");
             res.end();
          })
             
             
        }
        else if(req.url=="/list_id"){
            client.hget("Cookie",parseobject.user,function(err,object){
                object=JSON.parse(object);
                if(object!=null){
                client.lrange(object.Email,0,-1,function(err,reply){
                    res.write(JSON.stringify(reply));
                    res.end();
                })
                }else{
                res.end("false");
            }
            })
            
        }
        else if(req.url=="/trns_list"){
            arrar=[];
            client.lrange(parseobject.id,0,-1,function(err,reply){
                  for(i=0;i<reply.length;i++){
                  client.hget("TrnDetails",reply[i],function(err,object){
                      array.push(object);
                      res.write(JSON.stringify(array));
                      res.end();
                  })   
                }
            })
        }
        else if(req.url=="/signout"){
            client.hdel("Cookie",req.headers.cookie.split("=")[1],function(err,reply){
              if(reply == 1){
                 res.end("ok");  
              }else{
                  res.end("false");
              }
            });
           
            
        }
        else if(req.url=="/editRec"){
             client.hget("Cookie",parseobject.user,function(err,object){
                object=JSON.parse(object);
                if(object !== null){
                if(object.Type=="jobseeker"){
                   client.hget("Details",object.Email,function(err,object){
                    object=JSON.parse(object);
                    res.write(JSON.stringify(object));
                    res.end();
                })  
                }
                else if(object.Type=="trainer"){
                  client.hget("TrnDetails",object.Email,function(err,object){
                    object=JSON.parse(object);
                    res.write(JSON.stringify(object));
                    res.end();
                })   
                }
                else if(object.Type=="recruiter"){
                client.hget("RecDetails",object.Email,function(err,object){
                    object=JSON.parse(object);
                    res.write(JSON.stringify(object));
                    res.end();
                })
                }
                }else{
                    res.end("false")
                }
             })
        }
        else if(req.url=="/delete"){
                client.hget("Cookie",parseobject.key,function(err,object){
                object=JSON.parse(object);
                if(object.Type=="trainer"){
                client.hdel("TrnDetails",object.Email,function(err,reply){
                if(reply==1){
                client.hdel("Cookie",req.headers.cookie.split("=")[1],function(err,reply){
                if(reply==1){
                res.end("ok");  
                }
                });
                }
                }) 
                }
                else if(object.Type=="jobseeker"){
                client.hdel("Details",object.Email,function(err,reply){
                if(reply==1){
                client.hdel("Cookie",req.headers.cookie.split("=")[1],function(err,reply){
                if(reply==1){
                res.end("ok");  
                }
                });
                }
                })
                }
                else if(object.Type=="recruiter"){
                client.hdel("RecDetails",object.Email,function(err,reply){
                if(reply==1){
                client.hdel("Cookie",req.headers.cookie.split("=")[1],function(err,reply){
                if(reply==1){
                res.end("ok");  
                }
                });
                }
                });
                }
                });
                }
                else if(req.url=="/mail_api"){
                     client.hget("Cookie",parseobject.key,function(err,object){
                     object=JSON.parse(object);
                     
                    change = fs.readFileSync("./Resume/"+object.Email+".docx").toString();
                    var content = {
                            "fromAddress": "hema.m@zohouniv.com",
                            "toAddress": parseobject.who,
                            "subject": "Resume",
                            "content":"Hi Sir/Madam, ZU job portal" +change
                        }
                    request.post({
                    url:"https://mail.zoho.com/api/accounts/3608577000000008001/messages",
                    headers: {'Authorization':'Zoho-authtoken a4222f53ac89998263edc2af2a5c5407' },
                   body : JSON.stringify(content),
                    method:'POST'
                    },function (err, response, body){
                        res.write("true");
                        res.end();
                    });
                
                }); 
                }
    }
        function create_Cookie(email,type){
            var rndm=Math.floor(Math.random()*100000);
            var hash={};
            hash["Email"]=email;
            hash["Type"]=type;
            res.writeHead(200, {
            'set-Cookie': "User=" + rndm + ";",
            'content-type': 'text/html'
            });
            client.hset('Cookie',rndm,JSON.stringify(hash));
        }
        function cookie_there(){
            if(req.headers.cookie!==undefined){
            client.hget("Cookie",req.headers.cookie.split("=")[1],function(err,object){
                object=JSON.parse(object)
                 if(object!==null){
                     if(object.Type=="jobseeker"){
                         client.hkeys("Details",function(err,reply){
                             if(reply.indexOf(object.Email)==-1){
                                 return false;
                             }else{
                                 return true;
                             }
                         })
                     }
                     else if(object.Type=="recruiter"){
                         client.hkeys("RecDetails",function(err,reply){
                             if(reply.indexOf(object.Email)==-1){
                                 return false;
                             }else{
                                 return true;
                             }
                         })
                     }
                      else if(object.Type=="trainer"){
                         client.hkeys("TrnDetails",function(err,reply){
                             if(reply.indexOf(object.Email)==-1){
                                 return false;
                             }else{
                                 return true;
                             }
                         })
                     }
                 }else{
                     return false;
                 }
            })
            }else{
                return false;
            }
        }
}
