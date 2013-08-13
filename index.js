var request = require('request'),
    cheerio = require('cheerio'),
    Iconv  = require('iconv').Iconv;

var url = 'http://m.avito.ru/ufa/avtomobili_s_probegom/toyota/corolla?f=188_2844b';

request({
    uri: url,
    method: 'GET',
    encoding: 'binary'
}, function (err, res, body) {
    var iconv = new Iconv('utf-8', 'utf8//IGNORE'); //windows-1251
    body = new Buffer(body, 'binary');
    body = iconv.convert(body).toString();
    var $ = cheerio.load(body);

    /** FULL VERSION
     $('.catalog-default .t_i .t_i_i').each(function(){
                var carId = $(this).children('.t_i_title').children('.t_i_h3').children('.second-link').attr('name');
                var date = $(this).children('.t_i_date').text();
                console.log(date + ' - ' + carId);
            }); */
    //console.log(size);

    /*$('a').each(function () {
     var tmp = $(this).attr('href');
     console.log(tmp);
     })*/

    var cars = [];

    $('.b-catalog-list li:not(.yad-line)').each(function(){
        var item = $(this).children('a');
        var id = item.attr('href');
        var date = item.children('.date').text();
        var price = item.children('.price').text();

        cars.push({id: id, date: date, price: price});
    });

    console.log(cars);
    console.log('LENGTH: ', cars.length);

});