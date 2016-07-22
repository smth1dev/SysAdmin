
var express = require('express');
var app = express();
var path = require('path');
var exec = require('child_process').exec;

app.use(express.static(__dirname));

app.get('/psServerStat',function(req,res){
	
   exec("ps aux | awk '{if($3>0 || $4>0){cpu+=$3;mem+=$4}}END{print cpu,mem}'", function (error, stdout, stderr) {

        var result = stdout.split(" ");
        var server ={
            
                cpu:result[0].trim(),
                mem:result[1].trim()
            
        }
        if (error !== null) {

            console.log('exec error: ' + error);
            
        }
      
         res.jsonp(server);

//       console.log(res.headersSent); // false
//   res.send('OK');
  console.log(res);
    });
});
app.get('/cpuInfo',function(req,res){
	
  exec("nproc", function (error, stdout, stderr) {

        var cpuCores = stdout.trim();
        var info ={
                cores:cpuCores
        }
        if (error !== null) {

            console.log('exec error: ' + error);
            
        }
      exec("cat /proc/cpuinfo | grep 'model name' | uniq", function (error, stdout, stderr) {
          
            var cpuModel = stdout.split(":");
            info.model = cpuModel[1].replace("\n","");
            if (error !== null) {

                console.log('exec error: ' + error);
                
            }
          
         res.jsonp(info);
         
      });

//       console.log(res.headersSent); // false
//   res.send('OK');
 // console.log(res);
    });
});

app.get('/',function(req,res){
     res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});