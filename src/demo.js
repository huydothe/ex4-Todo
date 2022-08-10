const fs = require('fs');
const http = require('http');
const qs = require('qs');

const server = http.createServer((req, res)=> {
    if (req.method === 'GET') {
        fs.readFile('./src/ToDo.html',"utf-8", (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end()
        })
    }else{
        let data = '';
        req.on('data',(chunk)=>{
            data += chunk;
        })
        req.on('end',()=>{
            const dataInfo = qs.parse(data)
            fs.readFile('./src/Display.html', "utf-8",(err, datahtml)=>{
                if(err){
                    console.log(err.message);
                }else {
                    datahtml=datahtml.replace('{CV1}',dataInfo.CV1);
                    datahtml=datahtml.replace('{CV2}',dataInfo.CV2);
                    datahtml=datahtml.replace('{CV3}',dataInfo.CV3);
                    res.writeHead(200,{'Content-Type': 'text/html'});
                    res.write(datahtml);
                    res.end();
                }
            })
        })
        res.on('error',()=>{
            console.log('error')
        })
    }
})
server.listen(8080,()=>{
    console.log('Server running at localhost8080');
})
