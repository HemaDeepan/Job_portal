$(document).ready(function(){  
 /*  $(".container1 ").hide();*/
   $(".experienceDiv").hide();
  
   $(".rightImg+div ").hide();
   $(".postDiv").hide(); 
   $(".trainee").hide(); 
   $(".profileinfo").hide(); 
       $("#fresher").click(function(){
       $(".signupPage ").hide();
       });
     
       $(".radio1").click(function(){
       $(".experienceDiv").hide();
       });
    
       $(".radio2").click(function(){
       $(".fresherDiv").hide();
       $(".experienceDiv").show();
       });
  
       $(".signupBtn").click(function(){
       $(".signinHeader").show();
       $(".rightImg+div ").show();
       $(".rightImg").hide();
       $(".signupDiv").hide();
       });
        $(".postBtn").click(function(){
       $(".searchMain").hide();
       $(".popupDiv").hide();
       $(".postDiv").show(); 
              });
     
       $(".submitPost").click(function(){
       $(".searchMain").show();
       $(".popupDiv").show();
       $(".postDiv").hide(); 
       });
    
       $(".trineebtn").click(function(){
       $(".trainee").show();
       });
       
      
       $(".serachProfile").click(function(){
       $(".profileinfo").toggle(); 
       });
     
       
});
   
   
   
   
   
   
   
   
   