const cheerio = require('cheerio');
const superagent = require('superagent');
const dbUtil = require('./dbUtil.js');

const myUrl = 'https://pubg.op.gg';

getCurrentUserNum();

function getCurrentUserNum(){
    superagent
    .get(myUrl)
    .set('user-agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36')
    .end(function(err,res){
        if (err) throw err;
        let $ = cheerio.load(res.text);
        let originNum = $('.pubg__inner .current-user span').html();
        var data = originNum.replace(/,/g,'');
        console.log(data);
        if(data){
            dbUtil.query('insert into pubg_analysis (num_of_people) values (?)', [data], function (err, results){
                if (err) throw err;
                console.log('成功');
                timeControl();
            });
        }
    });
}

function timeControl(){
    setTimeout(function(){
        getCurrentUserNum();
    },1000*60*60);
}
