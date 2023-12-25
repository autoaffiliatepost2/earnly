var express = require('express');
var router = express.Router();
var async = require('async');
var nodeTelegramBotApi = require("node-telegram-bot-api");
let request = require("request");
var config = require('../config/global');
var connection = require('../config/connection');
const BitlyClient = require('bitly').BitlyClient;
const htmlToText = require('html-to-text');
const axios = require('axios');
const cheerio = require('cheerio')
var _ = require('underscore');
const unshort = require('url-unshorten');
var urlExpander=require('expand-url');
var atob = require('atob');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

setInterval(function setup() {
    // axios('https://telegram.me/s/tricksbystg03')
    // axios('https://telegram.me/s/postwomensworld')
    // axios('https://telegram.me/s/IHDBroadcast')
    // axios('https://telegram.me/s/dealbeeofficial')
    // axios('https://telegram.me/s/Dailytricks99')
    // axios('https://telegram.me/s/frcp_deals')
    // axios('https://telegram.me/s/stg003')
    // axios('https://telegram.me/s/HotDealsOfficials')
    axios('https://t.me/s/zzwpbotposting')
        .then(response => {
            var html = response.data;
            var $ = cheerio.load(html);
            var matchObj = [];

            $('.tgme_widget_message_wrap').each((i, el) => {
              var photoWithData = $(el).find('.tgme_widget_message_photo_wrap').attr('style');
              var photoOnly;
              if(photoWithData != undefined){
                var seprateData; 
                seprateData =  photoWithData.split("image:url('");
                photoOnly =  seprateData[1].slice(0,-2).replace(/telesco.pe/g, 'telegram-cdn.org');
              }else{
                photoOnly =  photoWithData;
              }
              var linkss = $(el).find('.tgme_widget_message_footer').find('a').attr('href').split('/');
              var link = htmlToText.fromString($(el).find('.tgme_widget_message_text').html());
              matchObj.push({ id: Number(linkss[4]), text_data: emmoji(link),text_img :photoOnly })
            });

            function emmoji(string) {
                return string.replace(/[[]]/g, '').replace(/¶m/g, '&param').replace(/\[(((ftp|https?):\/\/)[\-\w@:%_\!+.~#?,&\/\/=]+)]/g, '').replace(/&apos;/g, " '").replace(/&#x1F6CD;/g, '%F0%9F%9B%8D').replace(/&#x20B9;/g, ' %E2%82%B9').replace(/&#x269C;/g, ' %E2%9A%9C').replace(/&#x1F91D;/g, '%F0%9F%8E%B8').replace(/&amp;/g, " &").replace(/&gt;/g, " >").replace(/&lt;/g, " <").replace(/&quot;/g, "  ").replace(/&#x00A9;/g, '%C2%A9').replace(/&#x00AE;/g, '%C2%AE').replace(/&#x1F004;/g, '%F0%9F%80%84').replace(/&#x1F0CF;/g, '%F0%9F%83%8F').replace(/&#x1F170;/g, '%F0%9F%85%B0').replace(/&#x1F171;/g, '%F0%9F%85%B1').replace(/&#x1F17E;/g, '%F0%9F%85%BE').replace(/&#x1F17F;/g, '%F0%9F%85%BF').replace(/&#x1F18E;/g, '%F0%9F%86%8E').replace(/&#x1F191;/g, '%F0%9F%86%91').replace(/&#x1F192;/g, '%F0%9F%86%92').replace(/&#x1F193;/g, '%F0%9F%86%93').replace(/&#x1F194;/g, '%F0%9F%86%94').replace(/&#x1F195;/g, '%F0%9F%86%95').replace(/&#x1F196;/g, '%F0%9F%86%96').replace(/&#x1F197;/g, '%F0%9F%86%97').replace(/&#x1F198;/g, '%F0%9F%86%98').replace(/&#x1F199;/g, '%F0%9F%86%99').replace(/&#x1F19A;/g, '%F0%9F%86%9A').replace(/&#x1F201;/g, '%F0%9F%88%81').replace(/&#x1F202;/g, '%F0%9F%88%82').replace(/&#x1F21A;/g, '%F0%9F%88%9A').replace(/&#x1F22F;/g, '%F0%9F%88%AF').replace(/&#x1F232;/g, '%F0%9F%88%B2').replace(/&#x1F233;/g, '%F0%9F%88%B3').replace(/&#x1F234;/g, '%F0%9F%88%B4').replace(/&#x1F235;/g, '%F0%9F%88%B5').replace(/&#x1F236;/g, '%F0%9F%88%B6').replace(/&#x1F237;/g, '%F0%9F%88%B7').replace(/&#x1F238;/g, '%F0%9F%88%B8').replace(/&#x1F239;/g, '%F0%9F%88%B9').replace(/&#x1F23A;/g, '%F0%9F%88%BA').replace(/&#x1F250;/g, '%F0%9F%89%90').replace(/&#x1F251;/g, '%F0%9F%89%91').replace(/&#x1F300;/g, '%F0%9F%8C%80').replace(/&#x1F301;/g, '%F0%9F%8C%81').replace(/&#x1F302;/g, '%F0%9F%8C%82').replace(/&#x1F303;/g, '%F0%9F%8C%83').replace(/&#x1F304;/g, '%F0%9F%8C%84').replace(/&#x1F305;/g, '%F0%9F%8C%85').replace(/&#x1F306;/g, '%F0%9F%8C%86').replace(/&#x1F307;/g, '%F0%9F%8C%87').replace(/&#x1F308;/g, '%F0%9F%8C%88').replace(/&#x1F309;/g, '%F0%9F%8C%89').replace(/&#x1F30A;/g, '%F0%9F%8C%8A').replace(/&#x1F30B;/g, '%F0%9F%8C%8B').replace(/&#x1F30C;/g, '%F0%9F%8C%8C').replace(/&#x1F30D;/g, '%F0%9F%8C%8D').replace(/&#x1F30E;/g, '%F0%9F%8C%8E').replace(/&#x1F30F;/g, '%F0%9F%8C%8F').replace(/&#x1F310;/g, '%F0%9F%8C%90').replace(/&#x1F311;/g, '%F0%9F%8C%91').replace(/&#x1F312;/g, '%F0%9F%8C%92').replace(/&#x1F313;/g, '%F0%9F%8C%93').replace(/&#x1F314;/g, '%F0%9F%8C%94').replace(/&#x1F315;/g, '%F0%9F%8C%95').replace(/&#x1F316;/g, '%F0%9F%8C%96').replace(/&#x1F317;/g, '%F0%9F%8C%97').replace(/&#x1F318;/g, '%F0%9F%8C%98').replace(/&#x1F319;/g, '%F0%9F%8C%99').replace(/&#x1F31A;/g, '%F0%9F%8C%9A').replace(/&#x1F31B;/g, '%F0%9F%8C%9B').replace(/&#x1F31C;/g, '%F0%9F%8C%9C').replace(/&#x1F31D;/g, '%F0%9F%8C%9D').replace(/&#x1F31E;/g, '%F0%9F%8C%9E').replace(/&#x1F31F;/g, '%F0%9F%8C%9F').replace(/&#x1F320;/g, '%F0%9F%8C%A0').replace(/&#x1F330;/g, '%F0%9F%8C%B0').replace(/&#x1F331;/g, '%F0%9F%8C%B1').replace(/&#x1F332;/g, '%F0%9F%8C%B2').replace(/&#x1F333;/g, '%F0%9F%8C%B3').replace(/&#x1F334;/g, '%F0%9F%8C%B4').replace(/&#x1F335;/g, '%F0%9F%8C%B5').replace(/&#x1F337;/g, '%F0%9F%8C%B7').replace(/&#x1F338;/g, '%F0%9F%8C%B8').replace(/&#x1F339;/g, '%F0%9F%8C%B9').replace(/&#x1F33A;/g, '%F0%9F%8C%BA').replace(/&#x1F33B;/g, '%F0%9F%8C%BB').replace(/&#x1F33C;/g, '%F0%9F%8C%BC').replace(/&#x1F33D;/g, '%F0%9F%8C%BD').replace(/&#x1F33E;/g, '%F0%9F%8C%BE').replace(/&#x1F33F;/g, '%F0%9F%8C%BF').replace(/&#x1F340;/g, '%F0%9F%8D%80').replace(/&#x1F341;/g, '%F0%9F%8D%81').replace(/&#x1F342;/g, '%F0%9F%8D%82').replace(/&#x1F343;/g, '%F0%9F%8D%83').replace(/&#x1F344;/g, '%F0%9F%8D%84').replace(/&#x1F345;/g, '%F0%9F%8D%85').replace(/&#x1F346;/g, '%F0%9F%8D%86').replace(/&#x1F347;/g, '%F0%9F%8D%87').replace(/&#x1F348;/g, '%F0%9F%8D%88').replace(/&#x1F349;/g, '%F0%9F%8D%89').replace(/&#x1F34A;/g, '%F0%9F%8D%8A').replace(/&#x1F34B;/g, '%F0%9F%8D%8B').replace(/&#x1F34C;/g, '%F0%9F%8D%8C').replace(/&#x1F34D;/g, '%F0%9F%8D%8D').replace(/&#x1F34E;/g, '%F0%9F%8D%8E').replace(/&#x1F34F;/g, '%F0%9F%8D%8F').replace(/&#x1F350;/g, '%F0%9F%8D%90').replace(/&#x1F351;/g, '%F0%9F%8D%91').replace(/&#x1F352;/g, '%F0%9F%8D%92').replace(/&#x1F353;/g, '%F0%9F%8D%93').replace(/&#x1F354;/g, '%F0%9F%8D%94').replace(/&#x1F355;/g, '%F0%9F%8D%95').replace(/&#x1F356;/g, '%F0%9F%8D%96').replace(/&#x1F357;/g, '%F0%9F%8D%97').replace(/&#x1F358;/g, '%F0%9F%8D%98').replace(/&#x1F359;/g, '%F0%9F%8D%99').replace(/&#x1F35A;/g, '%F0%9F%8D%9A').replace(/&#x1F35B;/g, '%F0%9F%8D%9B').replace(/&#x1F35C;/g, '%F0%9F%8D%9C').replace(/&#x1F35D;/g, '%F0%9F%8D%9D').replace(/&#x1F35E;/g, '%F0%9F%8D%9E').replace(/&#x1F35F;/g, '%F0%9F%8D%9F').replace(/&#x1F360;/g, '%F0%9F%8D%A0').replace(/&#x1F361;/g, '%F0%9F%8D%A1').replace(/&#x1F362;/g, '%F0%9F%8D%A2').replace(/&#x1F363;/g, '%F0%9F%8D%A3').replace(/&#x1F364;/g, '%F0%9F%8D%A4').replace(/&#x1F365;/g, '%F0%9F%8D%A5').replace(/&#x1F366;/g, '%F0%9F%8D%A6').replace(/&#x1F367;/g, '%F0%9F%8D%A7').replace(/&#x1F368;/g, '%F0%9F%8D%A8').replace(/&#x1F369;/g, '%F0%9F%8D%A9').replace(/&#x1F36A;/g, '%F0%9F%8D%AA').replace(/&#x1F36B;/g, '%F0%9F%8D%AB').replace(/&#x1F36C;/g, '%F0%9F%8D%AC').replace(/&#x1F36D;/g, '%F0%9F%8D%AD').replace(/&#x1F36E;/g, '%F0%9F%8D%AE').replace(/&#x1F36F;/g, '%F0%9F%8D%AF').replace(/&#x1F370;/g, '%F0%9F%8D%B0').replace(/&#x1F371;/g, '%F0%9F%8D%B1').replace(/&#x1F372;/g, '%F0%9F%8D%B2').replace(/&#x1F373;/g, '%F0%9F%8D%B3').replace(/&#x1F374;/g, '%F0%9F%8D%B4').replace(/&#x1F375;/g, '%F0%9F%8D%B5').replace(/&#x1F376;/g, '%F0%9F%8D%B6').replace(/&#x1F377;/g, '%F0%9F%8D%B7').replace(/&#x1F378;/g, '%F0%9F%8D%B8').replace(/&#x1F379;/g, '%F0%9F%8D%B9').replace(/&#x1F37A;/g, '%F0%9F%8D%BA').replace(/&#x1F37B;/g, '%F0%9F%8D%BB').replace(/&#x1F37C;/g, '%F0%9F%8D%BC').replace(/&#x1F380;/g, '%F0%9F%8E%80').replace(/&#x1F381;/g, '%F0%9F%8E%81').replace(/&#x1F382;/g, '%F0%9F%8E%82').replace(/&#x1F383;/g, '%F0%9F%8E%83').replace(/&#x1F384;/g, '%F0%9F%8E%84').replace(/&#x1F385;/g, '%F0%9F%8E%85').replace(/&#x1F386;/g, '%F0%9F%8E%86').replace(/&#x1F387;/g, '%F0%9F%8E%87').replace(/&#x1F388;/g, '%F0%9F%8E%88').replace(/&#x1F389;/g, '%F0%9F%8E%89').replace(/&#x1F38A;/g, '%F0%9F%8E%8A').replace(/&#x1F38B;/g, '%F0%9F%8E%8B').replace(/&#x1F38C;/g, '%F0%9F%8E%8C').replace(/&#x1F38D;/g, '%F0%9F%8E%8D').replace(/&#x1F38E;/g, '%F0%9F%8E%8E').replace(/&#x1F38F;/g, '%F0%9F%8E%8F').replace(/&#x1F390;/g, '%F0%9F%8E%90').replace(/&#x1F391;/g, '%F0%9F%8E%91').replace(/&#x1F392;/g, '%F0%9F%8E%92').replace(/&#x1F393;/g, '%F0%9F%8E%93').replace(/&#x1F3A0;/g, '%F0%9F%8E%A0').replace(/&#x1F3A1;/g, '%F0%9F%8E%A1').replace(/&#x1F3A2;/g, '%F0%9F%8E%A2').replace(/&#x1F3A3;/g, '%F0%9F%8E%A3').replace(/&#x1F3A4;/g, '%F0%9F%8E%A4').replace(/&#x1F3A5;/g, '%F0%9F%8E%A5').replace(/&#x1F3A6;/g, '%F0%9F%8E%A6').replace(/&#x1F3A7;/g, '%F0%9F%8E%A7').replace(/&#x1F3A8;/g, '%F0%9F%8E%A8').replace(/&#x1F3A9;/g, '%F0%9F%8E%A9').replace(/&#x1F3AA;/g, '%F0%9F%8E%AA').replace(/&#x1F3AB;/g, '%F0%9F%8E%AB').replace(/&#x1F3AC;/g, '%F0%9F%8E%AC').replace(/&#x1F3AD;/g, '%F0%9F%8E%AD').replace(/&#x1F3AE;/g, '%F0%9F%8E%AE').replace(/&#x1F3AF;/g, '%F0%9F%8E%AF').replace(/&#x1F3B0;/g, '%F0%9F%8E%B0').replace(/&#x1F3B1;/g, '%F0%9F%8E%B1').replace(/&#x1F3B2;/g, '%F0%9F%8E%B2').replace(/&#x1F3B3;/g, '%F0%9F%8E%B3').replace(/&#x1F3B4;/g, '%F0%9F%8E%B4').replace(/&#x1F3B5;/g, '%F0%9F%8E%B5').replace(/&#x1F3B6;/g, '%F0%9F%8E%B6').replace(/&#x1F3B7;/g, '%F0%9F%8E%B7')
                    .replace(/&#x1F3B8;/g, '%F0%9F%8E%B8').replace(/&#x1F3B9;/g, '%F0%9F%8E%B9').replace(/&#x1F3BA;/g, '%F0%9F%8E%BA').replace(/&#x1F3BB;/g, '%F0%9F%8E%BB').replace(/&#x1F3BC;/g, '%F0%9F%8E%BC').replace(/&#x1F3BD;/g, '%F0%9F%8E%BD').replace(/&#x1F3BE;/g, '%F0%9F%8E%BE').replace(/&#x1F3BF;/g, '%F0%9F%8E%BF').replace(/&#x1F3C0;/g, '%F0%9F%8F%80').replace(/&#x1F3C1;/g, '%F0%9F%8F%81').replace(/&#x1F3C2;/g, '%F0%9F%8F%82').replace(/&#x1F3C3;/g, '%F0%9F%8F%83').replace(/&#x1F3C4;/g, '%F0%9F%8F%84').replace(/&#x1F3C6;/g, '%F0%9F%8F%86').replace(/&#x1F3C7;/g, '%F0%9F%8F%87').replace(/&#x1F3C8;/g, '%F0%9F%8F%88').replace(/&#x1F3C9;/g, '%F0%9F%8F%89').replace(/&#x1F3CA;/g, '%F0%9F%8F%8A').replace(/&#x1F3E0;/g, '%F0%9F%8F%A0').replace(/&#x1F3E1;/g, '%F0%9F%8F%A1').replace(/&#x1F3E2;/g, '%F0%9F%8F%A2').replace(/&#x1F3E3;/g, '%F0%9F%8F%A3').replace(/&#x1F3E4;/g, '%F0%9F%8F%A4').replace(/&#x1F3E5;/g, '%F0%9F%8F%A5').replace(/&#x1F3E6;/g, '%F0%9F%8F%A6').replace(/&#x1F3E7;/g, '%F0%9F%8F%A7').replace(/&#x1F3E8;/g, '%F0%9F%8F%A8').replace(/&#x1F3E9;/g, '%F0%9F%8F%A9').replace(/&#x1F3EA;/g, '%F0%9F%8F%AA').replace(/&#x1F3EB;/g, '%F0%9F%8F%AB').replace(/&#x1F3EC;/g, '%F0%9F%8F%AC').replace(/&#x1F3ED;/g, '%F0%9F%8F%AD').replace(/&#x1F3EE;/g, '%F0%9F%8F%AE').replace(/&#x1F3EF;/g, '%F0%9F%8F%AF').replace(/&#x1F3F0;/g, '%F0%9F%8F%B0').replace(/&#x1F400;/g, '%F0%9F%90%80').replace(/&#x1F401;/g, '%F0%9F%90%81').replace(/&#x1F402;/g, '%F0%9F%90%82').replace(/&#x1F403;/g, '%F0%9F%90%83').replace(/&#x1F404;/g, '%F0%9F%90%84').replace(/&#x1F405;/g, '%F0%9F%90%85').replace(/&#x1F406;/g, '%F0%9F%90%86').replace(/&#x1F407;/g, '%F0%9F%90%87').replace(/&#x1F408;/g, '%F0%9F%90%88').replace(/&#x1F409;/g, '%F0%9F%90%89').replace(/&#x1F40A;/g, '%F0%9F%90%8A').replace(/&#x1F40B;/g, '%F0%9F%90%8B').replace(/&#x1F40C;/g, '%F0%9F%90%8C').replace(/&#x1F40D;/g, '%F0%9F%90%8D').replace(/&#x1F40E;/g, '%F0%9F%90%8E').replace(/&#x1F40F;/g, '%F0%9F%90%8F').replace(/&#x1F410;/g, '%F0%9F%90%90').replace(/&#x1F411;/g, '%F0%9F%90%91').replace(/&#x1F412;/g, '%F0%9F%90%92').replace(/&#x1F413;/g, '%F0%9F%90%93').replace(/&#x1F414;/g, '%F0%9F%90%94').replace(/&#x1F415;/g, '%F0%9F%90%95').replace(/&#x1F416;/g, '%F0%9F%90%96').replace(/&#x1F417;/g, '%F0%9F%90%97').replace(/&#x1F418;/g, '%F0%9F%90%98').replace(/&#x1F419;/g, '%F0%9F%90%99').replace(/&#x1F41A;/g, '%F0%9F%90%9A').replace(/&#x1F41B;/g, '%F0%9F%90%9B').replace(/&#x1F41C;/g, '%F0%9F%90%9C').replace(/&#x1F41D;/g, '%F0%9F%90%9D').replace(/&#x1F41E;/g, '%F0%9F%90%9E').replace(/&#x1F41F;/g, '%F0%9F%90%9F').replace(/&#x1F420;/g, '%F0%9F%90%A0').replace(/&#x1F421;/g, '%F0%9F%90%A1').replace(/&#x1F422;/g, '%F0%9F%90%A2').replace(/&#x1F423;/g, '%F0%9F%90%A3').replace(/&#x1F424;/g, '%F0%9F%90%A4').replace(/&#x1F425;/g, '%F0%9F%90%A5').replace(/&#x1F426;/g, '%F0%9F%90%A6').replace(/&#x1F427;/g, '%F0%9F%90%A7').replace(/&#x1F428;/g, '%F0%9F%90%A8').replace(/&#x1F429;/g, '%F0%9F%90%A9').replace(/&#x1F42A;/g, '%F0%9F%90%AA').replace(/&#x1F42B;/g, '%F0%9F%90%AB').replace(/&#x1F42C;/g, '%F0%9F%90%AC').replace(/&#x1F42D;/g, '%F0%9F%90%AD').replace(/&#x1F42E;/g, '%F0%9F%90%AE').replace(/&#x1F42F;/g, '%F0%9F%90%AF').replace(/&#x1F430;/g, '%F0%9F%90%B0').replace(/&#x1F431;/g, '%F0%9F%90%B1').replace(/&#x1F432;/g, '%F0%9F%90%B2').replace(/&#x1F433;/g, '%F0%9F%90%B3').replace(/&#x1F434;/g, '%F0%9F%90%B4').replace(/&#x1F435;/g, '%F0%9F%90%B5').replace(/&#x1F436;/g, '%F0%9F%90%B6').replace(/&#x1F437;/g, '%F0%9F%90%B7').replace(/&#x1F438;/g, '%F0%9F%90%B8').replace(/&#x1F439;/g, '%F0%9F%90%B9').replace(/&#x1F43A;/g, '%F0%9F%90%BA').replace(/&#x1F43B;/g, '%F0%9F%90%BB').replace(/&#x1F43C;/g, '%F0%9F%90%BC').replace(/&#x1F43D;/g, '%F0%9F%90%BD').replace(/&#x1F43E;/g, '%F0%9F%90%BE').replace(/&#x1F440;/g, '%F0%9F%91%80').replace(/&#x1F442;/g, '%F0%9F%91%82').replace(/&#x1F443;/g, '%F0%9F%91%83').replace(/&#x1F444;/g, '%F0%9F%91%84').replace(/&#x1F445;/g, '%F0%9F%91%85').replace(/&#x1F446;/g, '%F0%9F%91%86').replace(/&#x1F447;/g, '%F0%9F%91%87').replace(/&#x1F448;/g, '%F0%9F%91%88').replace(/&#x1F449;/g, '%F0%9F%91%89').replace(/&#x1F44A;/g, '%F0%9F%91%8A').replace(/&#x1F44B;/g, '%F0%9F%91%8B').replace(/&#x1F44C;/g, '%F0%9F%91%8C').replace(/&#x1F44D;/g, '%F0%9F%91%8D').replace(/&#x1F44E;/g, '%F0%9F%91%8E').replace(/&#x1F44F;/g, '%F0%9F%91%8F').replace(/&#x1F450;/g, '%F0%9F%91%90').replace(/&#x1F451;/g, '%F0%9F%91%91').replace(/&#x1F452;/g, '%F0%9F%91%92').replace(/&#x1F453;/g, '%F0%9F%91%93').replace(/&#x1F454;/g, '%F0%9F%91%94').replace(/&#x1F455;/g, '%F0%9F%91%95').replace(/&#x1F456;/g, '%F0%9F%91%96').replace(/&#x1F457;/g, '%F0%9F%91%97').replace(/&#x1F458;/g, '%F0%9F%91%98').replace(/&#x1F459;/g, '%F0%9F%91%99').replace(/&#x1F45A;/g, '%F0%9F%91%9A').replace(/&#x1F45B;/g, '%F0%9F%91%9B').replace(/&#x1F45C;/g, '%F0%9F%91%9C').replace(/&#x1F45D;/g, '%F0%9F%91%9D').replace(/&#x1F45E;/g, '%F0%9F%91%9E').replace(/&#x1F45F;/g, '%F0%9F%91%9F').replace(/&#x1F460;/g, '%F0%9F%91%A0').replace(/&#x1F461;/g, '%F0%9F%91%A1').replace(/&#x1F462;/g, '%F0%9F%91%A2').replace(/&#x1F463;/g, '%F0%9F%91%A3').replace(/&#x1F464;/g, '%F0%9F%91%A4').replace(/&#x1F465;/g, '%F0%9F%91%A5').replace(/&#x1F466;/g, '%F0%9F%91%A6').replace(/&#x1F467;/g, '%F0%9F%91%A7').replace(/&#x1F468;/g, '%F0%9F%91%A8').replace(/&#x1F469;/g, '%F0%9F%91%A9').replace(/&#x1F46A;/g, '%F0%9F%91%AA').replace(/&#x1F46B;/g, '%F0%9F%91%AB').replace(/&#x1F46C;/g, '%F0%9F%91%AC').replace(/&#x1F46D;/g, '%F0%9F%91%AD').replace(/&#x1F46E;/g, '%F0%9F%91%AE').replace(/&#x1F46F;/g, '%F0%9F%91%AF').replace(/&#x1F470;/g, '%F0%9F%91%B0').replace(/&#x1F471;/g, '%F0%9F%91%B1').replace(/&#x1F472;/g, '%F0%9F%91%B2').replace(/&#x1F473;/g, '%F0%9F%91%B3').replace(/&#x1F474;/g, '%F0%9F%91%B4').replace(/&#x1F475;/g, '%F0%9F%91%B5').replace(/&#x1F476;/g, '%F0%9F%91%B6').replace(/&#x1F477;/g, '%F0%9F%91%B7').replace(/&#x1F478;/g, '%F0%9F%91%B8').replace(/&#x1F479;/g, '%F0%9F%91%B9').replace(/&#x1F47A;/g, '%F0%9F%91%BA').replace(/&#x1F47B;/g, '%F0%9F%91%BB').replace(/&#x1F47C;/g, '%F0%9F%91%BC').replace(/&#x1F47D;/g, '%F0%9F%91%BD').replace(/&#x1F47E;/g, '%F0%9F%91%BE').replace(/&#x1F47F;/g, '%F0%9F%91%BF').replace(/&#x1F480;/g, '%F0%9F%92%80').replace(/&#x1F481;/g, '%F0%9F%92%81').replace(/&#x1F482;/g, '%F0%9F%92%82').replace(/&#x1F483;/g, '%F0%9F%92%83').replace(/&#x1F484;/g, '%F0%9F%92%84').replace(/&#x1F485;/g, '%F0%9F%92%85').replace(/&#x1F486;/g, '%F0%9F%92%86').replace(/&#x1F487;/g, '%F0%9F%92%87').replace(/&#x1F488;/g, '%F0%9F%92%88').replace(/&#x1F489;/g, '%F0%9F%92%89').replace(/&#x1F48A;/g, '%F0%9F%92%8A').replace(/&#x1F48B;/g, '%F0%9F%92%8B').replace(/&#x1F48C;/g, '%F0%9F%92%8C').replace(/&#x1F48D;/g, '%F0%9F%92%8D').replace(/&#x1F48E;/g, '%F0%9F%92%8E').replace(/&#x1F48F;/g, '%F0%9F%92%8F').replace(/&#x1F490;/g, '%F0%9F%92%90').replace(/&#x1F491;/g, '%F0%9F%92%91').replace(/&#x1F492;/g, '%F0%9F%92%92').replace(/&#x1F493;/g, '%F0%9F%92%93').replace(/&#x1F494;/g, '%F0%9F%92%94').replace(/&#x1F495;/g, '%F0%9F%92%95').replace(/&#x1F496;/g, '%F0%9F%92%96').replace(/&#x1F497;/g, '%F0%9F%92%97').replace(/&#x1F498;/g, '%F0%9F%92%98').replace(/&#x1F499;/g, '%F0%9F%92%99').replace(/&#x1F49A;/g, '%F0%9F%92%9A')
                    .replace(/&#x1F49B;/g, '%F0%9F%92%9B').replace(/&#x1F49C;/g, '%F0%9F%92%9C').replace(/&#x1F49D;/g, '%F0%9F%92%9D').replace(/&#x1F49E;/g, '%F0%9F%92%9E').replace(/&#x1F49F;/g, '%F0%9F%92%9F').replace(/&#x1F4A0;/g, '%F0%9F%92%A0').replace(/&#x1F4A1;/g, '%F0%9F%92%A1').replace(/&#x1F4A2;/g, '%F0%9F%92%A2').replace(/&#x1F4A3;/g, '%F0%9F%92%A3').replace(/&#x1F4A4;/g, '%F0%9F%92%A4').replace(/&#x1F4A5;/g, '%F0%9F%92%A5').replace(/&#x1F4A6;/g, '%F0%9F%92%A6').replace(/&#x1F4A7;/g, '%F0%9F%92%A7').replace(/&#x1F4A8;/g, '%F0%9F%92%A8').replace(/&#x1F4A9;/g, '%F0%9F%92%A9').replace(/&#x1F4AA;/g, '%F0%9F%92%AA').replace(/&#x1F4AB;/g, '%F0%9F%92%AB').replace(/&#x1F4AC;/g, '%F0%9F%92%AC').replace(/&#x1F4AD;/g, '%F0%9F%92%AD').replace(/&#x1F4AE;/g, '%F0%9F%92%AE').replace(/&#x1F4AF;/g, '%F0%9F%92%AF').replace(/&#x1F4B0;/g, '%F0%9F%92%B0').replace(/&#x1F4B1;/g, '%F0%9F%92%B1').replace(/&#x1F4B2;/g, '%F0%9F%92%B2').replace(/&#x1F4B3;/g, '%F0%9F%92%B3').replace(/&#x1F4B4;/g, '%F0%9F%92%B4').replace(/&#x1F4B5;/g, '%F0%9F%92%B5').replace(/&#x1F4B6;/g, '%F0%9F%92%B6').replace(/&#x1F4B7;/g, '%F0%9F%92%B7').replace(/&#x1F4B8;/g, '%F0%9F%92%B8').replace(/&#x1F4B9;/g, '%F0%9F%92%B9').replace(/&#x1F4BA;/g, '%F0%9F%92%BA').replace(/&#x1F4BB;/g, '%F0%9F%92%BB').replace(/&#x1F4BC;/g, '%F0%9F%92%BC').replace(/&#x1F4BD;/g, '%F0%9F%92%BD').replace(/&#x1F4BE;/g, '%F0%9F%92%BE').replace(/&#x1F4BF;/g, '%F0%9F%92%BF').replace(/&#x1F4C0;/g, '%F0%9F%93%80').replace(/&#x1F4C1;/g, '%F0%9F%93%81').replace(/&#x1F4C2;/g, '%F0%9F%93%82').replace(/&#x1F4C3;/g, '%F0%9F%93%83').replace(/&#x1F4C4;/g, '%F0%9F%93%84').replace(/&#x1F4C5;/g, '%F0%9F%93%85').replace(/&#x1F4C6;/g, '%F0%9F%93%86').replace(/&#x1F4C7;/g, '%F0%9F%93%87').replace(/&#x1F4C8;/g, '%F0%9F%93%88').replace(/&#x1F4C9;/g, '%F0%9F%93%89').replace(/&#x1F4CA;/g, '%F0%9F%93%8A').replace(/&#x1F4CB;/g, '%F0%9F%93%8B').replace(/&#x1F4CC;/g, '%F0%9F%93%8C').replace(/&#x1F4CD;/g, '%F0%9F%93%8D').replace(/&#x1F4CE;/g, '%F0%9F%93%8E').replace(/&#x1F4CF;/g, '%F0%9F%93%8F').replace(/&#x1F4D0;/g, '%F0%9F%93%90').replace(/&#x1F4D1;/g, '%F0%9F%93%91').replace(/&#x1F4D2;/g, '%F0%9F%93%92').replace(/&#x1F4D3;/g, '%F0%9F%93%93').replace(/&#x1F4D4;/g, '%F0%9F%93%94').replace(/&#x1F4D5;/g, '%F0%9F%93%95').replace(/&#x1F4D6;/g, '%F0%9F%93%96').replace(/&#x1F4D7;/g, '%F0%9F%93%97').replace(/&#x1F4D8;/g, '%F0%9F%93%98').replace(/&#x1F4D9;/g, '%F0%9F%93%99').replace(/&#x1F4DA;/g, '%F0%9F%93%9A').replace(/&#x1F4DB;/g, '%F0%9F%93%9B').replace(/&#x1F4DC;/g, '%F0%9F%93%9C').replace(/&#x1F4DD;/g, '%F0%9F%93%9D').replace(/&#x1F4DE;/g, '%F0%9F%93%9E').replace(/&#x1F4DF;/g, '%F0%9F%93%9F').replace(/&#x1F4E0;/g, '%F0%9F%93%A0').replace(/&#x1F4E1;/g, '%F0%9F%93%A1').replace(/&#x1F4E2;/g, '%F0%9F%93%A2').replace(/&#x1F4E3;/g, '%F0%9F%93%A3').replace(/&#x1F4E4;/g, '%F0%9F%93%A4').replace(/&#x1F4E5;/g, '%F0%9F%93%A5').replace(/&#x1F4E6;/g, '%F0%9F%93%A6').replace(/&#x1F4E7;/g, '%F0%9F%93%A7').replace(/&#x1F4E8;/g, '%F0%9F%93%A8').replace(/&#x1F4E9;/g, '%F0%9F%93%A9').replace(/&#x1F4EA;/g, '%F0%9F%93%AA').replace(/&#x1F4EB;/g, '%F0%9F%93%AB').replace(/&#x1F4EC;/g, '%F0%9F%93%AC').replace(/&#x1F4ED;/g, '%F0%9F%93%AD').replace(/&#x1F4EE;/g, '%F0%9F%93%AE').replace(/&#x1F4EF;/g, '%F0%9F%93%AF').replace(/&#x1F4F0;/g, '%F0%9F%93%B0').replace(/&#x1F4F1;/g, '%F0%9F%93%B1').replace(/&#x1F4F2;/g, '%F0%9F%93%B2').replace(/&#x1F4F3;/g, '%F0%9F%93%B3').replace(/&#x1F4F4;/g, '%F0%9F%93%B4').replace(/&#x1F4F5;/g, '%F0%9F%93%B5').replace(/&#x1F4F6;/g, '%F0%9F%93%B6').replace(/&#x1F4F7;/g, '%F0%9F%93%B7').replace(/&#x1F4F9;/g, '%F0%9F%93%B9').replace(/&#x1F4FA;/g, '%F0%9F%93%BA').replace(/&#x1F4FB;/g, '%F0%9F%93%BB').replace(/&#x1F4FC;/g, '%F0%9F%93%BC').replace(/&#x1F500;/g, '%F0%9F%94%80').replace(/&#x1F501;/g, '%F0%9F%94%81').replace(/&#x1F502;/g, '%F0%9F%94%82').replace(/&#x1F503;/g, '%F0%9F%94%83').replace(/&#x1F504;/g, '%F0%9F%94%84').replace(/&#x1F505;/g, '%F0%9F%94%85').replace(/&#x1F506;/g, '%F0%9F%94%86').replace(/&#x1F507;/g, '%F0%9F%94%87').replace(/&#x1F509;/g, '%F0%9F%94%89').replace(/&#x1F50A;/g, '%F0%9F%94%8A').replace(/&#x1F50B;/g, '%F0%9F%94%8B').replace(/&#x1F50C;/g, '%F0%9F%94%8C').replace(/&#x1F50D;/g, '%F0%9F%94%8D').replace(/&#x1F50E;/g, '%F0%9F%94%8E').replace(/&#x1F50F;/g, '%F0%9F%94%8F').replace(/&#x1F510;/g, '%F0%9F%94%90').replace(/&#x1F511;/g, '%F0%9F%94%91').replace(/&#x1F512;/g, '%F0%9F%94%92').replace(/&#x1F513;/g, '%F0%9F%94%93').replace(/&#x1F514;/g, '%F0%9F%94%94').replace(/&#x1F515;/g, '%F0%9F%94%95').replace(/&#x1F516;/g, '%F0%9F%94%96').replace(/&#x1F517;/g, '%F0%9F%94%97').replace(/&#x1F518;/g, '%F0%9F%94%98').replace(/&#x1F519;/g, '%F0%9F%94%99').replace(/&#x1F51A;/g, '%F0%9F%94%9A').replace(/&#x1F51B;/g, '%F0%9F%94%9B').replace(/&#x1F51C;/g, '%F0%9F%94%9C').replace(/&#x1F51D;/g, '%F0%9F%94%9D').replace(/&#x1F51E;/g, '%F0%9F%94%9E').replace(/&#x1F51F;/g, '%F0%9F%94%9F').replace(/&#x1F520;/g, '%F0%9F%94%A0').replace(/&#x1F521;/g, '%F0%9F%94%A1').replace(/&#x1F522;/g, '%F0%9F%94%A2').replace(/&#x1F523;/g, '%F0%9F%94%A3').replace(/&#x1F524;/g, '%F0%9F%94%A4').replace(/&#x1F525;/g, '%F0%9F%94%A5').replace(/&#x1F526;/g, '%F0%9F%94%A6').replace(/&#x1F527;/g, '%F0%9F%94%A7').replace(/&#x1F528;/g, '%F0%9F%94%A8').replace(/&#x1F529;/g, '%F0%9F%94%A9').replace(/&#x1F52A;/g, '%F0%9F%94%AA').replace(/&#x1F52B;/g, '%F0%9F%94%AB').replace(/&#x1F52C;/g, '%F0%9F%94%AC').replace(/&#x1F52D;/g, '%F0%9F%94%AD').replace(/&#x1F52E;/g, '%F0%9F%94%AE').replace(/&#x1F52F;/g, '%F0%9F%94%AF').replace(/&#x1F530;/g, '%F0%9F%94%B0').replace(/&#x1F531;/g, '%F0%9F%94%B1').replace(/&#x1F532;/g, '%F0%9F%94%B2').replace(/&#x1F533;/g, '%F0%9F%94%B3').replace(/&#x1F534;/g, '%F0%9F%94%B4').replace(/&#x1F535;/g, '%F0%9F%94%B5').replace(/&#x1F536;/g, '%F0%9F%94%B6').replace(/&#x1F537;/g, '%F0%9F%94%B7').replace(/&#x1F538;/g, '%F0%9F%94%B8').replace(/&#x1F539;/g, '%F0%9F%94%B9').replace(/&#x1F53A;/g, '%F0%9F%94%BA').replace(/&#x1F53B;/g, '%F0%9F%94%BB').replace(/&#x1F53C;/g, '%F0%9F%94%BC').replace(/&#x1F53D;/g, '%F0%9F%94%BD').replace(/&#x1F550;/g, '%F0%9F%95%90').replace(/&#x1F551;/g, '%F0%9F%95%91').replace(/&#x1F552;/g, '%F0%9F%95%92').replace(/&#x1F553;/g, '%F0%9F%95%93').replace(/&#x1F554;/g, '%F0%9F%95%94').replace(/&#x1F555;/g, '%F0%9F%95%95').replace(/&#x1F556;/g, '%F0%9F%95%96').replace(/&#x1F557;/g, '%F0%9F%95%97').replace(/&#x1F558;/g, '%F0%9F%95%98').replace(/&#x1F559;/g, '%F0%9F%95%99').replace(/&#x1F55A;/g, '%F0%9F%95%9A').replace(/&#x1F55B;/g, '%F0%9F%95%9B').replace(/&#x1F55C;/g, '%F0%9F%95%9C').replace(/&#x1F55D;/g, '%F0%9F%95%9D').replace(/&#x1F55E;/g, '%F0%9F%95%9E').replace(/&#x1F55F;/g, '%F0%9F%95%9F').replace(/&#x1F560;/g, '%F0%9F%95%A0').replace(/&#x1F561;/g, '%F0%9F%95%A1').replace(/&#x1F562;/g, '%F0%9F%95%A2').replace(/&#x1F563;/g, '%F0%9F%95%A3').replace(/&#x1F564;/g, '%F0%9F%95%A4').replace(/&#x1F565;/g, '%F0%9F%95%A5').replace(/&#x1F566;/g, '%F0%9F%95%A6').replace(/&#x1F567;/g, '%F0%9F%95%A7').replace(/&#x1F5FB;/g, '%F0%9F%97%BB').replace(/&#x1F5FC;/g, '%F0%9F%97%BC').replace(/&#x1F5FD;/g, '%F0%9F%97%BD').replace(/&#x1F5FE;/g, '%F0%9F%97%BE').replace(/&#x1F5FF;/g, '%F0%9F%97%BF').replace(/&#x1F600;/g, '%F0%9F%98%80')
                    .replace(/&#x1F601;/g, '%F0%9F%98%81').replace(/&#x1F602;/g, '%F0%9F%98%82').replace(/&#x1F603;/g, '%F0%9F%98%83').replace(/&#x1F604;/g, '%F0%9F%98%84').replace(/&#x1F605;/g, '%F0%9F%98%85').replace(/&#x1F606;/g, '%F0%9F%98%86').replace(/&#x1F607;/g, '%F0%9F%98%87').replace(/&#x1F608;/g, '%F0%9F%98%88').replace(/&#x1F609;/g, '%F0%9F%98%89').replace(/&#x1F60A;/g, '%F0%9F%98%8A').replace(/&#x1F60B;/g, '%F0%9F%98%8B').replace(/&#x1F60C;/g, '%F0%9F%98%8C').replace(/&#x1F60D;/g, '%F0%9F%98%8D').replace(/&#x1F60E;/g, '%F0%9F%98%8E').replace(/&#x1F60F;/g, '%F0%9F%98%8F').replace(/&#x1F610;/g, '%F0%9F%98%90').replace(/&#x1F611;/g, '%F0%9F%98%91').replace(/&#x1F612;/g, '%F0%9F%98%92').replace(/&#x1F613;/g, '%F0%9F%98%93').replace(/&#x1F614;/g, '%F0%9F%98%94').replace(/&#x1F615;/g, '%F0%9F%98%95').replace(/&#x1F616;/g, '%F0%9F%98%96').replace(/&#x1F617;/g, '%F0%9F%98%97').replace(/&#x1F618;/g, '%F0%9F%98%98').replace(/&#x1F619;/g, '%F0%9F%98%99').replace(/&#x1F61A;/g, '%F0%9F%98%9A').replace(/&#x1F61B;/g, '%F0%9F%98%9B').replace(/&#x1F61C;/g, '%F0%9F%98%9C').replace(/&#x1F61D;/g, '%F0%9F%98%9D').replace(/&#x1F61E;/g, '%F0%9F%98%9E').replace(/&#x1F61F;/g, '%F0%9F%98%9F').replace(/&#x1F620;/g, '%F0%9F%98%A0').replace(/&#x1F621;/g, '%F0%9F%98%A1').replace(/&#x1F622;/g, '%F0%9F%98%A2').replace(/&#x1F623;/g, '%F0%9F%98%A3').replace(/&#x1F624;/g, '%F0%9F%98%A4').replace(/&#x1F625;/g, '%F0%9F%98%A5').replace(/&#x1F626;/g, '%F0%9F%98%A6').replace(/&#x1F627;/g, '%F0%9F%98%A7').replace(/&#x1F628;/g, '%F0%9F%98%A8').replace(/&#x1F629;/g, '%F0%9F%98%A9').replace(/&#x1F62A;/g, '%F0%9F%98%AA').replace(/&#x1F62B;/g, '%F0%9F%98%AB').replace(/&#x1F62C;/g, '%F0%9F%98%AC').replace(/&#x1F62D;/g, '%F0%9F%98%AD').replace(/&#x1F62E;/g, '%F0%9F%98%AE').replace(/&#x1F62F;/g, '%F0%9F%98%AF').replace(/&#x1F630;/g, '%F0%9F%98%B0').replace(/&#x1F631;/g, '%F0%9F%98%B1').replace(/&#x1F632;/g, '%F0%9F%98%B2').replace(/&#x1F633;/g, '%F0%9F%98%B3').replace(/&#x1F634;/g, '%F0%9F%98%B4').replace(/&#x1F635;/g, '%F0%9F%98%B5').replace(/&#x1F636;/g, '%F0%9F%98%B6').replace(/&#x1F637;/g, '%F0%9F%98%B7').replace(/&#x1F638;/g, '%F0%9F%98%B8').replace(/&#x1F639;/g, '%F0%9F%98%B9').replace(/&#x1F63A;/g, '%F0%9F%98%BA').replace(/&#x1F63B;/g, '%F0%9F%98%BB').replace(/&#x1F63C;/g, '%F0%9F%98%BC').replace(/&#x1F63D;/g, '%F0%9F%98%BD').replace(/&#x1F63E;/g, '%F0%9F%98%BE').replace(/&#x1F63F;/g, '%F0%9F%98%BF').replace(/&#x1F640;/g, '%F0%9F%99%80').replace(/&#x1F645;/g, '%F0%9F%99%85').replace(/&#x1F646;/g, '%F0%9F%99%86').replace(/&#x1F647;/g, '%F0%9F%99%87').replace(/&#x1F648;/g, '%F0%9F%99%88').replace(/&#x1F649;/g, '%F0%9F%99%89').replace(/&#x1F64A;/g, '%F0%9F%99%8A').replace(/&#x1F64B;/g, '%F0%9F%99%8B').replace(/&#x1F64C;/g, '%F0%9F%99%8C').replace(/&#x1F64D;/g, '%F0%9F%99%8D').replace(/&#x1F64E;/g, '%F0%9F%99%8E').replace(/&#x1F64F;/g, '%F0%9F%99%8F').replace(/&#x1F680;/g, '%F0%9F%9A%80').replace(/&#x1F681;/g, '%F0%9F%9A%81').replace(/&#x1F682;/g, '%F0%9F%9A%82').replace(/&#x1F683;/g, '%F0%9F%9A%83').replace(/&#x1F684;/g, '%F0%9F%9A%84').replace(/&#x1F685;/g, '%F0%9F%9A%85').replace(/&#x1F686;/g, '%F0%9F%9A%86').replace(/&#x1F687;/g, '%F0%9F%9A%87').replace(/&#x1F688;/g, '%F0%9F%9A%88').replace(/&#x1F689;/g, '%F0%9F%9A%89').replace(/&#x1F68A;/g, '%F0%9F%9A%8A').replace(/&#x1F68C;/g, '%F0%9F%9A%8C').replace(/&#x1F68D;/g, '%F0%9F%9A%8D').replace(/&#x1F68E;/g, '%F0%9F%9A%8E').replace(/&#x1F68F;/g, '%F0%9F%9A%8F').replace(/&#x1F690;/g, '%F0%9F%9A%90').replace(/&#x1F691;/g, '%F0%9F%9A%91').replace(/&#x1F692;/g, '%F0%9F%9A%92').replace(/&#x1F693;/g, '%F0%9F%9A%93').replace(/&#x1F694;/g, '%F0%9F%9A%94').replace(/&#x1F695;/g, '%F0%9F%9A%95').replace(/&#x1F696;/g, '%F0%9F%9A%96').replace(/&#x1F697;/g, '%F0%9F%9A%97').replace(/&#x1F698;/g, '%F0%9F%9A%98').replace(/&#x1F699;/g, '%F0%9F%9A%99').replace(/&#x1F69A;/g, '%F0%9F%9A%9A').replace(/&#x1F69B;/g, '%F0%9F%9A%9B').replace(/&#x1F69C;/g, '%F0%9F%9A%9C').replace(/&#x1F69D;/g, '%F0%9F%9A%9D').replace(/&#x1F69E;/g, '%F0%9F%9A%9E').replace(/&#x1F69F;/g, '%F0%9F%9A%9F').replace(/&#x1F6A0;/g, '%F0%9F%9A%A0').replace(/&#x1F6A1;/g, '%F0%9F%9A%A1').replace(/&#x1F6A2;/g, '%F0%9F%9A%A2').replace(/&#x1F6A3;/g, '%F0%9F%9A%A3').replace(/&#x1F6A4;/g, '%F0%9F%9A%A4').replace(/&#x1F6A5;/g, '%F0%9F%9A%A5').replace(/&#x1F6A6;/g, '%F0%9F%9A%A6').replace(/&#x1F6A7;/g, '%F0%9F%9A%A7').replace(/&#x1F6A8;/g, '%F0%9F%9A%A8').replace(/&#x1F6A9;/g, '%F0%9F%9A%A9').replace(/&#x1F6AA;/g, '%F0%9F%9A%AA').replace(/&#x1F6AB;/g, '%F0%9F%9A%AB').replace(/&#x1F6AC;/g, '%F0%9F%9A%AC').replace(/&#x1F6AD;/g, '%F0%9F%9A%AD').replace(/&#x1F6AE;/g, '%F0%9F%9A%AE').replace(/&#x1F6AF;/g, '%F0%9F%9A%AF').replace(/&#x1F6B0;/g, '%F0%9F%9A%B0').replace(/&#x1F6B1;/g, '%F0%9F%9A%B1').replace(/&#x1F6B2;/g, '%F0%9F%9A%B2').replace(/&#x1F6B3;/g, '%F0%9F%9A%B3').replace(/&#x1F6B4;/g, '%F0%9F%9A%B4').replace(/&#x1F6B5;/g, '%F0%9F%9A%B5').replace(/&#x1F6B6;/g, '%F0%9F%9A%B6').replace(/&#x1F6B7;/g, '%F0%9F%9A%B7').replace(/&#x1F6B8;/g, '%F0%9F%9A%B8').replace(/&#x1F6B9;/g, '%F0%9F%9A%B9').replace(/&#x1F6BA;/g, '%F0%9F%9A%BA').replace(/&#x1F6BB;/g, '%F0%9F%9A%BB').replace(/&#x1F6BC;/g, '%F0%9F%9A%BC').replace(/&#x1F6BD;/g, '%F0%9F%9A%BD').replace(/&#x1F6BE;/g, '%F0%9F%9A%BE').replace(/&#x1F6BF;/g, '%F0%9F%9A%BF').replace(/&#x1F6C0;/g, '%F0%9F%9B%80').replace(/&#x1F6C1;/g, '%F0%9F%9B%81').replace(/&#x1F6C2;/g, '%F0%9F%9B%82').replace(/&#x1F6C3;/g, '%F0%9F%9B%83').replace(/&#x1F6C4;/g, '%F0%9F%9B%84').replace(/&#x1F6C5;/g, '%F0%9F%9B%85').replace(/&#x203C;/g, '%E2%80%BC').replace(/&#x2049;/g, '%E2%81%89').replace(/&#x2122;/g, '%E2%84%A2').replace(/&#x2139;/g, '%E2%84%B9').replace(/&#x2194;/g, '%E2%86%94').replace(/&#x2195;/g, '%E2%86%95').replace(/&#x2196;/g, '%E2%86%96').replace(/&#x2197;/g, '%E2%86%97').replace(/&#x2198;/g, '%E2%86%98').replace(/&#x2199;/g, '%E2%86%99').replace(/&#x21A9;/g, '%E2%86%A9').replace(/&#x21AA;/g, '%E2%86%AA').replace(/&#x231A;/g, '%E2%8C%9A').replace(/&#x231B;/g, '%E2%8C%9B').replace(/&#x23000000000;/g, '%E2%8F%A9').replace(/&#x23EA;/g, '%E2%8F%AA').replace(/&#x23EB;/g, '%E2%8F%AB').replace(/&#x23EC;/g, '%E2%8F%AC').replace(/&#x23F0;/g, '%E2%8F%B0').replace(/&#x23F3;/g, '%E2%8F%B3').replace(/&#x24C2;/g, '%E2%93%82').replace(/&#x25AA;/g, '%E2%96%AA').replace(/&#x25AB;/g, '%E2%96%AB').replace(/&#x25B6;/g, '%E2%96%B6').replace(/&#x25C0;/g, '%E2%97%80').replace(/&#x25FB;/g, '%E2%97%BB').replace(/&#x25FC;/g, '%E2%97%BC').replace(/&#x25FD;/g, '%E2%97%BD').replace(/&#x25FE;/g, '%E2%97%BE').replace(/&#x2600;/g, '%E2%98%80').replace(/&#x2601;/g, '%E2%98%81').replace(/&#x260E;/g, '%E2%98%8E').replace(/&#x2611;/g, '%E2%98%91').replace(/&#x2614;/g, '%E2%98%94').replace(/&#x2615;/g, '%E2%98%95').replace(/&#x261D;/g, '%E2%98%9D').replace(/&#x263A;/g, '%E2%98%BA').replace(/&#x2648;/g, '%E2%99%88').replace(/&#x2649;/g, '%E2%99%89').replace(/&#x264A;/g, '%E2%99%8A').replace(/&#x264B;/g, '%E2%99%8B').replace(/&#x264C;/g, '%E2%99%8C').replace(/&#x264D;/g, '%E2%99%8D').replace(/&#x264E;/g, '%E2%99%8E').replace(/&#x264F;/g, '%E2%99%8F').replace(/&#x2650;/g, '%E2%99%90').replace(/&#x2651;/g, '%E2%99%91').replace(/&#x2652;/g, '%E2%99%92').replace(/&#x2653;/g, '%E2%99%93')
                    .replace(/&#x2660;/g, '%E2%99%A0').replace(/&#x2663;/g, '%E2%99%A3').replace(/&#x2665;/g, '%E2%99%A5').replace(/&#x2666;/g, '%E2%99%A6').replace(/&#x2668;/g, '%E2%99%A8').replace(/&#x267B;/g, '%E2%99%BB').replace(/&#x267F;/g, '%E2%99%BF').replace(/&#x2693;/g, '%E2%9A%93').replace(/&#x26A0;/g, '%E2%9A%A0').replace(/&#x26A1;/g, '%E2%9A%A1').replace(/&#x26AA;/g, '%E2%9A%AA').replace(/&#x26AB;/g, '%E2%9A%AB').replace(/&#x26BD;/g, '%E2%9A%BD').replace(/&#x26BE;/g, '%E2%9A%BE').replace(/&#x26C4;/g, '%E2%9B%84').replace(/&#x26C5;/g, '%E2%9B%85').replace(/&#x26CE;/g, '%E2%9B%8E').replace(/&#x26D4;/g, '%E2%9B%94').replace(/&#x26EA;/g, '%E2%9B%AA').replace(/&#x26F2;/g, '%E2%9B%B2').replace(/&#x26F3;/g, '%E2%9B%B3').replace(/&#x26F5;/g, '%E2%9B%B5').replace(/&#x26FA;/g, '%E2%9B%BA').replace(/&#x26FD;/g, '%E2%9B%BD').replace(/&#x2702;/g, '%E2%9C%82').replace(/&#x2705;/g, '%E2%9C%85').replace(/&#x2708;/g, '%E2%9C%88').replace(/&#x2709;/g, '%E2%9C%89').replace(/&#x270A;/g, '%E2%9C%8A').replace(/&#x270B;/g, '%E2%9C%8B').replace(/&#x270C;/g, '%E2%9C%8C').replace(/&#x270F;/g, '%E2%9C%8F').replace(/&#x2712;/g, '%E2%9C%92').replace(/&#x2714;/g, '%E2%9C%94').replace(/&#x2716;/g, '%E2%9C%96').replace(/&#x2728;/g, '%E2%9C%A8').replace(/&#x2733;/g, '%E2%9C%B3').replace(/&#x2734;/g, '%E2%9C%B4').replace(/&#x2744;/g, '%E2%9D%84').replace(/&#x2747;/g, '%E2%9D%87').replace(/&#x274C;/g, '%E2%9D%8C').replace(/&#x274E;/g, '%E2%9D%8E').replace(/&#x2753;/g, '%E2%9D%93').replace(/&#x2754;/g, '%E2%9D%94').replace(/&#x2755;/g, '%E2%9D%95').replace(/&#x2757;/g, '%E2%9D%97').replace(/&#x2764;/g, '%E2%9D%A4').replace(/&#x2795;/g, '%E2%9E%95').replace(/&#x2796;/g, '%E2%9E%96').replace(/&#x2797;/g, '%E2%9E%97').replace(/&#x27A1;/g, '%E2%9E%A1').replace(/&#x27B0;/g, '%E2%9E%B0').replace(/&#x2934;/g, '%E2%A4%B4').replace(/&#x2935;/g, '%E2%A4%B5').replace(/&#x2B05;/g, '%E2%AC%85').replace(/&#x2B06;/g, '%E2%AC%86').replace(/&#x2B07;/g, '%E2%AC%87').replace(/&#x2B1B;/g, '%E2%AC%9B').replace(/&#x2B1C;/g, '%E2%AC%9C').replace(/&#x2B50;/g, '%E2%AD%90').replace(/&#x2B55;/g, '%E2%AD%95').replace(/&#x3030;/g, '%E3%80%B0').replace(/&#x303D;/g, '%E3%80%BD').replace(/&#x3297;/g, '%E3%8A%97').replace(/&#x3299;/g, '%E3%8A%99')
            }
            let last_insert_id = _.last(matchObj);
            console.log('last_insert_id: ', last_insert_id);

            let sql = 'SELECT COUNT(*) as cnt FROM post_telegram2 WHERE post_telegram2.post_id =' + last_insert_id.id;
            connection.query(sql, function(err, rides) {
                if (err) {
                    console.log('err: ', err);
                } else if (rides[0].cnt == 0) {
                    posttele(rides[0].cnt, last_insert_id.id, matchObj);
                } else {
                    // nextCall(null, bodyss);
                }
            })
        }).catch(function(error) {
            setup();
            console.log(error);
        })
}, 15000)

function urlencode(str) {
    return str.replace(/%21/g, '!').replace(/%22/g, '"').replace(/pr%26/g, 'pr?').replace(/%26/g, '&')
        .replace(/%27/g, '\'').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3D/g, '=')
        .replace(/%28/g, '(').replace(/%3F/g, '?').replace(/%29/g, ')').replace(/%2A/g, '*')
        .replace(/%20/g, '+');
}

function urldecode(str) {
    return str.replace(/&/g, '%26').replace(/=/g, '%3D').replace(/[?]/g, '%3F').replace(/[+]/g, '%2B').replace(/[[]/g, '%5B').replace(/[]]/g, '%5D');
}

function posttele(bodyss, lastInsertId, lastArrayData) {
    let sqlsss = "SELECT * FROM post_flags";
    connection.query(sqlsss, function(err, flagData) {
        if (err) {
            console.log('err: ', err);
        }
        let ListflagData = flagData[0];
        ListflagData.papa_post_tag = "sdcreation054-21";
        let ListflagAmazon = "nonamazon";
        let bitly = new BitlyClient(ListflagData.current_bitly);
        let uFinalUrl1 = "https://bestshoppingdeal.in/v/index.html?trackurl=";

        let sqls = "SELECT post_id FROM post_telegram2 ORDER BY id DESC LIMIT 1";
        connection.query(sqls, function(err, rides) {
            if (err) {
                console.log('err: ', err);
            }
            for (let i = 0; i < lastInsertId - rides[0].post_id; i++) {
                let nextId = rides[0].post_id + i + 1;
                let userExists = lastArrayData.filter(user => user.id == nextId);
                if (userExists.length > 0 && userExists[0].text_data != 'null\n') {
                    if (userExists[0].text_data.match(/adminPanelPost/g)){
                        postConvertAdmin(userExists, ListflagData, bitly,uFinalUrl1,nextId,ListflagAmazon)
                    }else{
                        postConvert(userExists, ListflagData, bitly,uFinalUrl1,nextId,ListflagAmazon)
                    }
                }
            }
        })
    })
}

function postConvertAdmin(userExistsData, ListflagData, bitly,uFinalUrl1,nextId,ListflagAmazon) {
    let userExists1 = JSON.parse(userExistsData[0].text_data);
    let userExistsUrl = atob(userExists1.url);
    let final = [];
    let bufferObj = Buffer.from(userExists1.msg, "base64");
    let decodedString = bufferObj.toString("utf8");
    let linkPresent = decodedString.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,!&\/\/=]+)/g);
    let array = decodedString.split("\n");
    let array_length = decodedString.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#!?,&\/\/=]+)/g).length;
    if(array_length > 0 && userExists1.convert == true ){
        for (let j = 0; j < array.length; j++) {
            if (array[j].match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&!\/\/=]+)/g)) {
                if (array[j].match(/ern.li/g)) {
                    array[j] = "";
                } else {
                    array[j] = array[j];
                }
            }
            if (array[j].match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,!&\/\/=]+)/g)) {
                let xzhxzh;
                if (array[j].match(/amazon.in/g)) {
                    xzhxzh = array[j].replace(/[[\]]/g, '').replace(/ /g, '@')
                } else {
                    xzhxzh = array[j]
                }
                let urls = xzhxzh.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,!&\/\/=]+)/g)
                unshort(urls[0].replace(/https:\/\/dl.flipkart.com\/s/g, 'http://fkrt.it').replace(/http:\/\/dl.flipkart.com\/s/g, 'http://fkrt.it')).then(function(unshortenedUrls) {
                        let unshortenedUrl = unshortenedUrls.unshorten.replace(/&amp;/g, '&');
                        if (unshortenedUrl.match(/amazon.in/g)) {
                            ListflagAmazon = "amazon";
                            let tagnot;
                            if (unshortenedUrl.match(/earnkaro/g)) {
                                let finalLink = unshortenedUrl.split('dl=');
                                if (urlencode(finalLink[1]).match(/[?]/g)) {
                                    tagnot = urlencode(finalLink[1]).concat('&tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                } else {
                                    tagnot = urlencode(finalLink[1]).concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                }
                            } else if (unshortenedUrl.match(/paisawapas/g)) {
                                let finalLink = unshortenedUrl.split('url=');
                                if (urlencode(finalLink[1]).match(/[?]/g)) {
                                    tagnot = urlencode(finalLink[1]).concat('&tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                } else {
                                    tagnot = urlencode(finalLink[1]).concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                }
                            } else {
                                if (urlencode(unshortenedUrl).match(/[?]/g)) {
                                    let finalLink = urlencode(unshortenedUrl).split('&');
                                    for (let h = 0; h < finalLink.length; h++) {
                                        if (finalLink[h].match(/[?]/g)) {
                                            if (finalLink[h].match(/tag/g)) {
                                                let finalLinkssd = finalLink[h].split('?');
                                                finalLink[h] = finalLinkssd[0].concat('?')
                                            } else if (finalLink[h].match(/ascsubtag/g)) {
                                                let finalLinkssd = finalLink[h].split('?');
                                                finalLink[h] = finalLinkssd[0].concat('?')
                                            } else if (finalLink[h].match(/ascsub/g)) {
                                                let finalLinkssd = finalLink[h].split('?');
                                                finalLink[h] = finalLinkssd[0].concat('?')
                                            } else if (finalLink[h].match(/keywords/g)) {
                                                let finalLinkssdd = finalLink[h].split('?');
                                                finalLink[h] = finalLinkssdd[0].concat('?')
                                            }
                                        } else if (finalLink[h].match(/^ascsubtag/g)) {
                                            finalLink[h] = "";
                                        } else if (finalLink[h].match(/^tag/g)) {
                                            finalLink[h] = ""
                                        } else if (finalLink[h].match(/^ascsub/g)) {
                                            finalLink[h] = ""
                                        } else if (finalLink[h].match(/^keywords/g)) {
                                            finalLink[h] = ""
                                        } else if (finalLink[h].match(/^k/g)) {
                                            finalLink[h] = ""
                                        }
                                    }

                                    let tagnots = finalLink.join('&').replace(/@/g, '').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?');
                                    let tagnotRep = tagnots.replace(/[\?]/g, '?tag=' + ListflagData.papa_post_tag + '&').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?');
                                    if (tagnotRep.charAt(tagnotRep.length - 1) == '&') {
                                        tagnot = tagnotRep.slice(0, -1);
                                    } else {
                                        tagnot = tagnotRep;
                                    }
                                } else {
                                    tagnot = unshortenedUrl.replace(/@/g, '').concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&');
                                }
                            }
                            if (ListflagData.bitlyFlag == "True") {
                                example(tagnot.replace(/&demoyou/g, ''));
                              // example(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')))
                            } else {
                                exampless(tagnot.replace(/&demoyou/g, ''));
                                // exampless(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')));
                            }

                            async function example(dddd) {
                                let response = await bitly
                                    .shorten(dddd)
                                    .then(function(result) {
                                        final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link);
                                    })
                                    .catch(function(error) {
                                        tinyUrl1(dddd)
                                    });
                            }

                            async function tinyUrl1(dddd) {
                                await request({
                                    uri: "http://tinyurl.com/api-create.php?url=" + dddd,
                                    method: "GET",
                                }, (err, response, body) => {
                                    let responses = {
                                        "link": body
                                    };
                                    final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                })
                            }

                            function exampless(dddd) {
                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), dddd);
                            }

                        } else if (unshortenedUrl.match(/online.citibank.co.in/g) || unshortenedUrl.match(/gearbest.com/g) || unshortenedUrl.match(/nike.com/g) || unshortenedUrl.match(/shop4reebok.com/g) || unshortenedUrl.match(/2gud.com/g) || unshortenedUrl.match(/kotak.com/g) || unshortenedUrl.match(/reliancegeneral.co.in/g) || unshortenedUrl.match(/careinsurance.com/g) || unshortenedUrl.match(/floweraura.com/g) || unshortenedUrl.match(/gasjeans.in/g) || unshortenedUrl.match(/shop.havells.com/g) || unshortenedUrl.match(/sharekhan.com/g) || unshortenedUrl.match(/veromoda.in/g) || unshortenedUrl.match(/hostgator.in/g) || unshortenedUrl.match(/peesafe.com/g) || unshortenedUrl.match(/jackjones.in/g) || unshortenedUrl.match(/gonoise.com/g) || unshortenedUrl.match(/tatacliq.com/g) || unshortenedUrl.match(/lenovo.com/g) || unshortenedUrl.match(/in.toluna.com/g) || unshortenedUrl.match(/vijaysales.com/g) || unshortenedUrl.match(/flipkart.com/g) || unshortenedUrl.match(/banggood.com/g) || unshortenedUrl.match(/puma.com/g) || unshortenedUrl.match(/unacademy.com/g) || unshortenedUrl.match(/coolwinks.com/g) || unshortenedUrl.match(/orra.co.in/g) || unshortenedUrl.match(/360totalsecurity.com/g) || unshortenedUrl.match(/maxbupa.com/g) || unshortenedUrl.match(/religarehealthinsurance.com/g) || unshortenedUrl.match(/fnp.com/g) || unshortenedUrl.match(/healthxp.in/g) || unshortenedUrl.match(/bigrock.in/g) || unshortenedUrl.match(/igp.com/g) || unshortenedUrl.match(/letyshops.com/g) || unshortenedUrl.match(/spartanpoker.com/g) || unshortenedUrl.match(/adda52.com/g) || unshortenedUrl.match(/balaji/g) || unshortenedUrl.match(/eduonix.com/g) || unshortenedUrl.match(/paytmmall.com/g) || unshortenedUrl.match(/testbook.com/g) || unshortenedUrl.match(/mamaearth.in/g) || unshortenedUrl.match(/wonderchef.com/g) || unshortenedUrl.match(/zee5/g) || unshortenedUrl.match(/beardo.in/g) || unshortenedUrl.match(/oneplus.in/g) || unshortenedUrl.match(/1mg.com/g) || unshortenedUrl.match(/udemy.com/g) || unshortenedUrl.match(/hometown.in/g) || unshortenedUrl.match(/magzter.com/g) || unshortenedUrl.match(/asics.com/g) || unshortenedUrl.match(/asics.com/g) || unshortenedUrl.match(/ajio.com/g) || unshortenedUrl.match(/timesprime.com/g) || unshortenedUrl.match(/themomsco.com/g) || unshortenedUrl.match(/akbartravels.com/g) || unshortenedUrl.match(/aliexpress.com/g) || unshortenedUrl.match(/banggood.in/g) || unshortenedUrl.match(/bata.in/g) || unshortenedUrl.match(/behrouzbiryani.com/g) || unshortenedUrl.match(/biba.in/g) || unshortenedUrl.match(/bigbasket.com/g) || unshortenedUrl.match(/brandfactoryonline.com/g) || unshortenedUrl.match(/chumbak.com/g) || unshortenedUrl.match(/cleartrip.com/g) || unshortenedUrl.match(/clovia.com/g) || unshortenedUrl.match(/croma.com/g) || unshortenedUrl.match(/decathlon.in/g) || unshortenedUrl.match(/dominos.co.in/g) || unshortenedUrl.match(/etihad.com/g) || unshortenedUrl.match(/faasos.io/g) || unshortenedUrl.match(/fabhotels.com/g) || unshortenedUrl.match(/firstcry.com/g) || unshortenedUrl.match(/fossil.com/g) || unshortenedUrl.match(/harmanaudio.in/g) || unshortenedUrl.match(/hungama.com/g) || unshortenedUrl.match(/insider.in/g) || unshortenedUrl.match(/jockeyindia.com/g) || unshortenedUrl.match(/kalkifashion.com/g) || unshortenedUrl.match(/lenskart.com/g) || unshortenedUrl.match(/lifestylestores.com/g) || unshortenedUrl.match(/limeroad.com/g) || unshortenedUrl.match(/manyavar.com/g) || unshortenedUrl.match(/mcdonaldsindia.com/g) || unshortenedUrl.match(/medlife.com/g) || unshortenedUrl.match(/microsoft.com/g) || unshortenedUrl.match(/mivi.in/g) || unshortenedUrl.match(/makemytrip.com/g) || unshortenedUrl.match(/myntra.com/g) || unshortenedUrl.match(/nnnow.com/g) || unshortenedUrl.match(/nykaafashion.com/g) || unshortenedUrl.match(/oyorooms.com/g) || unshortenedUrl.match(/pepperfry.com/g) || unshortenedUrl.match(/pizzahut.co.in/g) || unshortenedUrl.match(/puma.com/g) || unshortenedUrl.match(/qatarairways.com/g) || unshortenedUrl.match(/rentomojo.com/g) || unshortenedUrl.match(/samsung.com/g) || unshortenedUrl.match(/singaporeair.com/g) || unshortenedUrl.match(/sochstore.com/g) || unshortenedUrl.match(/tanishq.co.in/g) || unshortenedUrl.match(/themancompany.com/g) || unshortenedUrl.match(/zivame.com/g) || unshortenedUrl.match(/zoomcar.com/g)) {

                            let sqlssnet = "SELECT * FROM diff_net_posts WHERE active_flag ='TRUE'";
                            connection.query(sqlssnet, function(err, flagsData) {
                                if (err) {
                                    console.log('err: ', err);
                                    setup();
                                }
                                let ListflagDatass = flagsData;
                                let tagnot;
                                let quelink;
                                let quelinkRL;
                                if (unshortenedUrl.match(/earnkaro/g)) {
                                    let finalLink = unshortenedUrl.split('dl=');
                                    quelink = finalLink[1];
                                    for (let k = 0; k < ListflagDatass.length; k++) {
                                        if (urlencode(finalLink[1]).match(ListflagDatass[k].domain_url)) {
                                            tagnot = ListflagDatass[k].Landing_Page.concat("?subid=" + ListflagData.admitad_post_tag + "&ulp=").concat(urldecode(finalLink[1]));
                                        }
                                    }
                                } else {
                                    quelink = unshortenedUrl;
                                    let quelinkRL = unshortenedUrl.replace(/(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/, '');
                                    if (quelinkRL.match(/^online.citibank.co.in/g) || quelinkRL.match(/^gearbest.com/g) || quelinkRL.match(/^nike.com/g) || quelinkRL.match(/^shop4reebok.com/g) || quelinkRL.match(/^2gud.com/g) || quelinkRL.match(/^kotak.com/g) || quelinkRL.match(/^reliancegeneral.co.in/g) || quelinkRL.match(/^careinsurance.com/g) || quelinkRL.match(/^floweraura.com/g) || quelinkRL.match(/^gasjeans.in/g) || quelinkRL.match(/^shop.havells.com/g) || quelinkRL.match(/^sharekhan.com/g) || quelinkRL.match(/^veromoda.in/g) || quelinkRL.match(/^hostgator.in/g) || quelinkRL.match(/^peesafe.com/g) || quelinkRL.match(/^jackjones.in/g) || quelinkRL.match(/^gonoise.com/g) || quelinkRL.match(/^tatacliq.com/g) || quelinkRL.match(/^lenovo.com/g) || quelinkRL.match(/^in.toluna.com/g) || quelinkRL.match(/^vijaysales.com/g) || quelinkRL.match(/^flipkart.com/g) || quelinkRL.match(/^banggood.com/g) || quelinkRL.match(/^puma.com/g) || quelinkRL.match(/^unacademy.com/g) || quelinkRL.match(/^coolwinks.com/g) || quelinkRL.match(/^orra.co.in/g) || quelinkRL.match(/^360totalsecurity.com/g) || quelinkRL.match(/^maxbupa.com/g) || quelinkRL.match(/^religarehealthinsurance.com/g) || quelinkRL.match(/^fnp.com/g) || quelinkRL.match(/^healthxp.in/g) || quelinkRL.match(/^bigrock.in/g) || quelinkRL.match(/^igp.com/g) || quelinkRL.match(/^letyshops.com/g) || quelinkRL.match(/^spartanpoker.com/g) || quelinkRL.match(/^adda52.com/g) || quelinkRL.match(/^balaji/g) || quelinkRL.match(/^eduonix.com/g) || quelinkRL.match(/^paytmmall.com/g) || quelinkRL.match(/^testbook.com/g) || quelinkRL.match(/^mamaearth.in/g) || quelinkRL.match(/^wonderchef.com/g) || quelinkRL.match(/^zee5/g) || quelinkRL.match(/^beardo.in/g) || quelinkRL.match(/^oneplus.in/g) || quelinkRL.match(/^1mg.com/g) || quelinkRL.match(/^udemy.com/g) || quelinkRL.match(/^hometown.in/g) || quelinkRL.match(/^magzter.com/g) || quelinkRL.match(/^asics.com/g) || quelinkRL.match(/^asics.com/g) || quelinkRL.match(/^ajio.com/g) || quelinkRL.match(/^timesprime.com/g) || quelinkRL.match(/^themomsco.com/g) || quelinkRL.match(/^akbartravels.com/g) || quelinkRL.match(/^aliexpress.com/g) || quelinkRL.match(/^banggood.in/g) || quelinkRL.match(/^bata.in/g) || quelinkRL.match(/^behrouzbiryani.com/g) || quelinkRL.match(/^biba.in/g) || quelinkRL.match(/^bigbasket.com/g) || quelinkRL.match(/^brandfactoryonline.com/g) || quelinkRL.match(/^chumbak.com/g) || quelinkRL.match(/^cleartrip.com/g) || quelinkRL.match(/^clovia.com/g) || quelinkRL.match(/^croma.com/g) || quelinkRL.match(/^decathlon.in/g) || quelinkRL.match(/^dominos.co.in/g) || quelinkRL.match(/^etihad.com/g) || quelinkRL.match(/^faasos.io/g) || quelinkRL.match(/^fabhotels.com/g) || quelinkRL.match(/^firstcry.com/g) || quelinkRL.match(/^fossil.com/g) || quelinkRL.match(/^harmanaudio.in/g) || quelinkRL.match(/^hungama.com/g) || quelinkRL.match(/^insider.in/g) || quelinkRL.match(/^jockeyindia.com/g) || quelinkRL.match(/^kalkifashion.com/g) || quelinkRL.match(/^lenskart.com/g) || quelinkRL.match(/^lifestylestores.com/g) || quelinkRL.match(/^limeroad.com/g) || quelinkRL.match(/^manyavar.com/g) || quelinkRL.match(/^mcdonaldsindia.com/g) || quelinkRL.match(/^medlife.com/g) || quelinkRL.match(/^microsoft.com/g) || quelinkRL.match(/^mivi.in/g) || quelinkRL.match(/^makemytrip.com/g) || quelinkRL.match(/^myntra.com/g) || quelinkRL.match(/^nnnow.com/g) || quelinkRL.match(/^nykaafashion.com/g) || quelinkRL.match(/^oyorooms.com/g) || quelinkRL.match(/^pepperfry.com/g) || quelinkRL.match(/^pizzahut.co.in/g) || quelinkRL.match(/^puma.com/g) || quelinkRL.match(/^qatarairways.com/g) || quelinkRL.match(/^rentomojo.com/g) || quelinkRL.match(/^samsung.com/g) || quelinkRL.match(/^singaporeair.com/g) || quelinkRL.match(/^sochstore.com/g) || quelinkRL.match(/^tanishq.co.in/g) || quelinkRL.match(/^themancompany.com/g) || quelinkRL.match(/^zivame.com/g) || quelinkRL.match(/^zoomcar.com/g)) {
                                        if (quelinkRL.match(/^flipkart.com/g)) {
                                            tagnot = undefined;
                                        } else {
                                            for (let t = 0; t < ListflagDatass.length; t++) {
                                                if (urlencode(unshortenedUrl).match(ListflagDatass[t].domain_url)) {
                                                    tagnot = ListflagDatass[t].Landing_Page.concat("?subid="+ListflagData.admitad_post_tag+"&ulp=").concat(urldecode(unshortenedUrl));
                                                }
                                            }
                                        }
                                    } else {
                                        if (urlencode(unshortenedUrl).match('dl=')) {
                                            let finalLink33 = urlencode(unshortenedUrl).split('dl=');
                                            quelink = finalLink33[1];
                                        } else if (urlencode(unshortenedUrl).match('url=')) {
                                            let finalLink44 = urlencode(unshortenedUrl).split('url=');
                                            quelink = finalLink44[1];
                                        }
                                        for (let t = 0; t < ListflagDatass.length; t++) {
                                            if (urlencode(quelink).match(ListflagDatass[t].domain_url)) {
                                                tagnot = ListflagDatass[t].Landing_Page.concat("?subid=" + ListflagData.admitad_post_tag + "&ulp=").concat(urldecode(quelink));
                                            }
                                        }
                                    }
                                }

                                if (tagnot != undefined) {
                                    if (ListflagData.bitlyFlag == "True") {
                                        if (tagnot.match(/flipkart.com/g)) {
                                            example3(tagnot.replace(/%25/g, '%'));
                                        } else {
                                            example1(tagnot.replace(/%25/g, '%'));
                                        }
                                    } else {
                                        example2(tagnot.replace(/%25/g, '%'));
                                    }
                                } else {
                                    if (urlencode(quelink).match(/flipkart.com/g)) {
                                        if (ListflagData.flipkart_server == 'dirflipkart') {
                                            let tagnotFlipkart;
                                            if (quelink.match(/www.flipkart.com/g)) {
                                                tagnotFlipkart = urlencode(quelink).replace(/www.flipkart.com/g, 'dl.flipkart.com/dl');
                                            } else {
                                                tagnotFlipkart = urlencode(quelink);
                                            }
                                            if (tagnotFlipkart.match(/[?]/g)) {
                                                let finalLink = tagnotFlipkart.split('&');
                                                for (let h = 0; h < finalLink.length; h++) {
                                                    if (finalLink[h].match(/[?]/g)) {
                                                        if (finalLink[h].match(/affid/g)) {
                                                            let finalLinkssd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssd[0].concat('?')
                                                        } else if (finalLink[h].match(/affExtParam1/g)) {
                                                            let finalLinkssd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssd[0].concat('?')
                                                        } else if (finalLink[h].match(/affExtParam2/g)) {
                                                            let finalLinkssd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssd[0].concat('?')
                                                        }
                                                    } else if (finalLink[h].match(/^affExtParam1/g)) {
                                                        finalLink[h] = "";
                                                    } else if (finalLink[h].match(/^affExtParam2/g)) {
                                                        finalLink[h] = ""
                                                    } else if (finalLink[h].match(/^affid/g)) {
                                                        finalLink[h] = ""
                                                    } else if (finalLink[h].match(/^param/g)) {
                                                        finalLink[h] = ""
                                                    }
                                                }
                                                var dateObj = new Date();
                                                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                                var day = dateObj.getUTCDate();
                                                var year = dateObj.getUTCFullYear();
                                                var hour = dateObj.getHours();
                                                var minu = dateObj.getMinutes();
                                                let ren = Math.random().toString(36).substring(7);
                                                let tagnots = finalLink.join('&').replace(/@/g, '').replace(/&&&/g, '&').replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&/g, '&');
                                                tagnot = tagnots.concat('&affid=' + ListflagData.test_fk_tag).replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/&&/g, '&').replace(/&&/g, '&');
                                            } else {
                                                var dateObj = new Date();
                                                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                                var day = dateObj.getUTCDate();
                                                var year = dateObj.getUTCFullYear();
                                                var hour = dateObj.getHours();
                                                var minu = dateObj.getMinutes();
                                                let ren = Math.random().toString(36).substring(7);
                                                tagnot = tagnotFlipkart.concat('?affid=' + ListflagData.test_fk_tag);
                                            }

                                            if (ListflagData.bitlyFlag == "True") {
                                                example1(tagnot.replace(/%25/g, '%'));
                                            } else {
                                                if (tagnot.match(/flipkart.com/g)) {
                                                    example4(tagnot.replace(/%25/g, '%'));
                                                } else {
                                                    example2(tagnot.replace(/%25/g, '%'));
                                                }
                                            }
                                        } else if (ListflagData.flipkart_server == 'quelink') {
                                            let finalLink = urlencode(quelink).split('&');
                                            for (let h = 0; h < finalLink.length; h++) {
                                                if (finalLink[h].match(/^affid/g)) {
                                                    finalLink[h] = 'demoyou'
                                                } else if (finalLink[h].match(/^affExtParam1/g)) {
                                                    finalLink[h] = 'demoyou'
                                                } else if (finalLink[h].match(/^param/g)) {
                                                    finalLink[h] = 'demoyou'
                                                }
                                            }
                                            let sstarget = finalLink.join('&').replace(/&demoyou/g, '');
                                            tagnot = ("https://linksredirect.com/?cid=76950&subid=kudrat_cl&source=linkkit&url=").concat(encodeURIComponent(sstarget));
                                            if (ListflagData.bitlyFlag == "True") {
                                                example1(tagnot.replace(/%25/g, '%'));
                                            } else {
                                                if (tagnot.match(/flipkart.com/g)) {
                                                    example4(tagnot.replace(/%25/g, '%'));
                                                } else {
                                                    example2(tagnot.replace(/%25/g, '%'));
                                                }
                                            }
                                        } else if (ListflagData.flipkart_server == 'inrdeal') {
                                            let finalLink = urlencode(quelink).split('&');
                                            for (let h = 0; h < finalLink.length; h++) {
                                                if (finalLink[h].match(/^affid/g)) {
                                                    finalLink[h] = 'demoyou'
                                                } else if (finalLink[h].match(/^affExtParam1/g)) {
                                                    finalLink[h] = 'demoyou'
                                                } else if (finalLink[h].match(/^param/g)) {
                                                    finalLink[h] = 'demoyou'
                                                }
                                            }
                                            let sstarget = finalLink.join('&').replace(/&demoyou/g, '');
                                            tagnot = ("https://inr.deals/track?id=jig616926125&src=merchant-detail-backend&campaign=cps&url=").concat(encodeURIComponent(sstarget));
                                            if (ListflagData.bitlyFlag == "True") {
                                                example1(tagnot.replace(/%25/g, '%'));
                                            } else {
                                                if (tagnot.match(/flipkart.com/g)) {
                                                    example4(tagnot.replace(/%25/g, '%'));
                                                } else {
                                                    example2(tagnot.replace(/%25/g, '%'));
                                                }
                                            }
                                        }
                                    }
                                }
                                async function example1(dddd) {
                                    let response = await bitly
                                        .shorten(dddd)
                                        .then(function(result) {
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                        })
                                        .catch(function(error) {
                                            tinyUrl2(dddd)
                                        });
                                }
                                async function tinyUrl2(dddd) {
                                    await request({
                                        uri: "http://tinyurl.com/api-create.php?url=" + dddd,
                                        method: "GET",
                                    }, (err, response, body) => {
                                        let responses = {
                                            "link": body
                                        };
                                        final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                    })
                                }
                                async function example3(dddd) {
                                    let response = await bitly
                                        .shorten(dddd)
                                        .then(function(result) {
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                        })
                                        .catch(function(error) {
                                            tinyUrl2(dddd)
                                        });
                                }

                                function example4(dddd) {
                                    let response = unshort(dddd).then(function(unshortenedUrls) {
                                            let responses;
                                            if (unshortenedUrls.unshorten.match(/www.flipkart.com/g)) {
                                                responses = {
                                                    "link": unshortenedUrls.unshorten.replace(/www.flipkart.com/g, 'dl.flipkart.com/dl')
                                                };
                                            } else {
                                                responses = {
                                                    "link": unshortenedUrls.unshorten
                                                };
                                            }
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link);
                                        })
                                        .catch(function(err) {
                                            return err;
                                        })
                                }

                                function example2(dddd) {
                                    let response = unshort(dddd).then(function(unshortenedUrls) {
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), unshortenedUrls.unshorten);
                                        })
                                        .catch(function(err) {
                                            return err;
                                        })
                                }
                            })
                        } else {
                            unshort(unshortenedUrl).then(function(unshortenedUrls) {
                                    let unshortenedUrl = unshortenedUrls.unshorten.replace(/&amp;/g, '&');
                                    if (unshortenedUrl.match(/amazon.in/g)) {
                                        let tagnot;
                                        if (unshortenedUrl.match(/[?]/g)) {
                                            let finalLink = unshortenedUrl.split('&');
                                            for (let h = 0; h < finalLink.length; h++) {
                                                if (finalLink[h].match(/[?]/g)) {
                                                    if (finalLink[h].match(/tag/g)) {
                                                        let finalLinkssd = finalLink[h].split('?');
                                                        finalLink[h] = finalLinkssd[0].concat('?')
                                                    } else if (finalLink[h].match(/ascsubtag/g)) {
                                                        let finalLinkssd = finalLink[h].split('?');
                                                        finalLink[h] = finalLinkssd[0].concat('?')
                                                    } else if (finalLink[h].match(/ascsub/g)) {
                                                        let finalLinkssd = finalLink[h].split('?');
                                                        finalLink[h] = finalLinkssd[0].concat('?')
                                                    } else if (finalLink[h].match(/keywords/g)) {
                                                        let finalLinkssdd = finalLink[h].split('?');
                                                        finalLink[h] = finalLinkssdd[0].concat('?')
                                                    }
                                                } else if (finalLink[h].match(/^ascsubtag/g)) {
                                                    finalLink[h] = "";
                                                } else if (finalLink[h].match(/^tag/g)) {
                                                    finalLink[h] = ""
                                                } else if (finalLink[h].match(/^ascsub/g)) {
                                                    finalLink[h] = ""
                                                } else if (finalLink[h].match(/^keywords/g)) {
                                                    finalLink[h] = ""
                                                }
                                            }

                                            let tagnots = finalLink.join('&').replace(/@/g, '').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                            let tagnotRep = tagnots.replace(/[\?]/g, '?tag=' + ListflagData.papa_post_tag + '&').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                            if (tagnotRep.charAt(tagnotRep.length - 1) == '&') {
                                                tagnot = tagnotRep.slice(0, -1);
                                            } else {
                                                tagnot = tagnotRep;
                                            }
                                        } else {
                                            tagnot = unshortenedUrl.replace(/@/g, '').concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                        }
                                        // if (ListflagData.bitlyFlag == "True") {
                                        //     example6(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')));
                                        // } else {
                                        //     example7(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')));
                                        // }
                                        if(ListflagData.bitlyFlag == "True"){ 
                                          example6(tagnot.replace(/&demoyou/g, ''));
                                         }else{
                                           example7(tagnot.replace(/&demoyou/g, ''));
                                         }
                                        async function example6(dddd) {
                                            let response = await bitly
                                                .shorten(dddd)
                                                .then(function(result) {
                                                    final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                                })
                                                .catch(function(error) {
                                                    tinyUrl3(dddd)
                                                });
                                        }
                                        async function tinyUrl3(dddd) {
                                            await request({
                                                uri: "http://tinyurl.com/api-create.php?url=" + dddd,
                                                method: "GET",
                                            }, (err, response, body) => {
                                                let responses = {
                                                    "link": body
                                                };
                                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                            })
                                        }

                                        function example7(dddd) {
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), dddd);
                                        }
                                    } else {
                                        final[j] = ' ';
                                    }
                                })
                                .catch(function(err) {
                                    console.error('AAAW 👻', err)
                                })
                        }
                    })
                    .catch(function(err) {
                        console.error('AAAW 👻', err)
                    })
            } else {
                final[j] = array[j].replace(/[?]q=%23/g, '#').replace(/Bug/g, '').replace(/BUG/g, '').replace(/MRP Error/g, '').replace(/Mrp error/g, '').replace(/Price Error/g, '').replace(/MRP ERROR/g, '').replace(/PRICE ERROR/g, '').replace(/MRP Error/g, '').replace(/mrp error/g, '').replace(/Bookmark/g, '').replace(/bookmark/g, '').replace(/BOOKMARK/g, '').replace(/frcp/g, '').replace(/Amazon gift voucher/g, 'https://amzn.to/3afr8VB - Amazon gift voucher').replace(/FRCP/g, '').replace(/ihddeals.com/g, 'bestshoppingdeal.in').replace(/@loot_deal_offers/g, '').replace(/@truegrabbers/g, '').replace(/@loot_deal_offers/g, '').replace(/@desire_deals/g, '').replace(/@online_offers12/g, '').replace(/@Ihd56bot/g, '').replace(/cashkaro/g, 'Deal').replace(/Cashkaro/g, 'Deal').replace(/@I/g, '').replace(/@i/g, '').replace(/@S/g, '').replace(/@s/g, '').replace(/@f/g, '').replace(/@F/g, '').replace(/(telegram.me[\/])/g, '').replace(/IHD/g, '').replace(/telegram.me/g, '').replace(/@frcp_deals/g, ' ').replace(/@IHDBROADCAST/g, ' ').replace(/@IHDBroadcast/g, ' ').replace(/IHDBROADCAST/g, ' ').replace(/@stg003/g, ' ').replace(/stg/g, 'Best_shopping').replace(/ihd/g, ' ').replace(/&#xA0;/g, ' ').replace(/.#x...../g, ' %E2%99%A8 ').replace(/[[\]]/g, '').replace(/&/g, 'and').replace(/;/g, '').replace(/^\s+|\s+$|\s+(?=\s)/g, '');
            }
        }
    }

    setTimeout(() => {
        let finalAmazon;
            if(array_length > 0 && userExists1.convert == true ){
                finalAmazon = final.join('\n');
                console.log('convert: ');
            }else{
                finalAmazon = decodedString;
                console.log('nonconvert: ');
            }

            if (finalAmazon.match(/pinned/g) || finalAmazon.match(/400 Bad Request/g) || finalAmazon.match(/html/g)) {
                let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + ",'demo')";
                connection.query(sqlss, function(err, rides) {
                    if (err) {
                        console.log('err: ', err);
                    }
                })
            } else {
              let finalIdList = JSON.parse(ListflagData.array_data).user;
              let finalPostList;
              if(ListflagAmazon == "amazon"){
                finalPostList = JSON.parse(ListflagData.wp_amzn_post1).telenogroup;
              }else{
                finalPostList = JSON.parse(ListflagData.wp_tele_post1).telenogroup;
              }
              let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + "," + JSON.stringify(finalAmazon.replace(/[^0-9a-zA-Zㄱ-힣+×÷=%♤♡☆♧)(*&^/~#@!-:;,?`_|<>{}¥£€$◇■□●○•°※¤《》¡¿₩\[\]\"\' \\]/g, "")) + ")";
              connection.query(sqlss, function(err, rides) {
                  if (err) {
                      console.log('err: ', err);
                  } else {
                      if (userExists1.telegram == false && userExists1.whatsapp == false) {
                          console.log('---0');
                      } else if (userExists1.telegram == true && userExists1.whatsapp == true) {
                          if(userExistsUrl != ""){
                              if(userExists1.type == "photo" ){
                                 teleAutoImgChannel(finalAmazon,userExistsUrl,"@dhamakaoffer11",ListflagData.kudart_token);
                              }else{
                                 teleAutoVideoPostChannel(finalAmazon,userExistsUrl,"@dhamakaoffer11",ListflagData.kudart_token);
                              }
                          }else{
                             teleAutoPostChannel(finalAmazon,"@dhamakaoffer11",ListflagData.kudart_token);
                          }
                      } else if (userExists1.telegram == true && userExists1.whatsapp == false) {
                        if(userExistsUrl != ""){
                            if(userExists1.type == "photo" ){
                               teleAutoImgChannel(finalAmazon,userExistsUrl,"@dhamakaoffer11",ListflagData.kudart_token);
                            }else{
                               teleAutoVideoPostChannel(finalAmazon,userExistsUrl,"@dhamakaoffer11",ListflagData.kudart_token);
                            }
                        }else{
                           teleAutoPostChannel(finalAmazon,"@dhamakaoffer11",ListflagData.kudart_token);
                        }
                      } else if (userExists1.telegram == false && userExists1.whatsapp == true) {
                        console.log('---1');
                      } else {
                          console.log('---4');
                      }
                  }
              })
            }
    }, Math.ceil(array.length / 5) * 3500);
}

function teleAutoImgChannel(finalAmazon,img,chanelName,token){
    var chatId = chanelName; // <= replace with yours
    bot = new nodeTelegramBotApi(token);
    bot.sendPhoto(chatId, img, {
      caption: finalAmazon,
      disable_web_page_preview: true
    });
  }

  function teleAutoVideoPostChannel(finalAmazon,img,chanelName,token){
    var chatId = chanelName; // <= replace with yours
    bot = new nodeTelegramBotApi(token);
    bot.sendVideo(chatId, img, {
      caption: finalAmazon,
      disable_web_page_preview: true
    });
  }

function postConvert(userExists, ListflagData, bitly,uFinalUrl1,nextId,ListflagAmazon) {

    if (userExists.length > 0 && userExists[0].text_data != 'null\n') {
        let final = [];
        let array = userExists[0].text_data.split("\n");
        if (userExists[0].text_data.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,!&\/\/=]+)/g)) {
            let array_length = userExists[0].text_data.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#!?,&\/\/=]+)/g).length;

            for (let j = 0; j < array.length; j++) {
                if (array[j].match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&!\/\/=]+)/g)) {
                    if (array[j].match(/ern.li/g)) {
                        array[j] = "";
                    } else {
                        array[j] = array[j];
                    }
                }
                if (array[j].match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,!&\/\/=]+)/g)) {
                    let xzhxzh;
                    if (array[j].match(/amazon.in/g)) {
                        xzhxzh = array[j].replace(/[[\]]/g, '').replace(/ /g, '@')
                    } else {
                        xzhxzh = array[j]
                    }
                    let urls = xzhxzh.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,!&\/\/=]+)/g)
                    unshort(urls[0].replace(/https:\/\/dl.flipkart.com\/s/g, 'http://fkrt.it').replace(/http:\/\/dl.flipkart.com\/s/g, 'http://fkrt.it')).then(function(unshortenedUrls) {
                            let unshortenedUrl = unshortenedUrls.unshorten.replace(/&amp;/g, '&');
                            if (unshortenedUrl.match(/amazon.in/g)) {
                                ListflagAmazon = "amazon";
                                let tagnot;
                                if (unshortenedUrl.match(/earnkaro/g)) {
                                    let finalLink = unshortenedUrl.split('dl=');
                                    if (urlencode(finalLink[1]).match(/[?]/g)) {
                                        tagnot = urlencode(finalLink[1]).concat('&tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                    } else {
                                        tagnot = urlencode(finalLink[1]).concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                    }
                                } else if (unshortenedUrl.match(/paisawapas/g)) {
                                    let finalLink = unshortenedUrl.split('url=');
                                    if (urlencode(finalLink[1]).match(/[?]/g)) {
                                        tagnot = urlencode(finalLink[1]).concat('&tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                    } else {
                                        tagnot = urlencode(finalLink[1]).concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                    }
                                } else {
                                    if (urlencode(unshortenedUrl).match(/[?]/g)) {
                                        let finalLink = urlencode(unshortenedUrl).split('&');
                                        for (let h = 0; h < finalLink.length; h++) {
                                            if (finalLink[h].match(/[?]/g)) {
                                                if (finalLink[h].match(/tag/g)) {
                                                    let finalLinkssd = finalLink[h].split('?');
                                                    finalLink[h] = finalLinkssd[0].concat('?')
                                                } else if (finalLink[h].match(/ascsubtag/g)) {
                                                    let finalLinkssd = finalLink[h].split('?');
                                                    finalLink[h] = finalLinkssd[0].concat('?')
                                                } else if (finalLink[h].match(/ascsub/g)) {
                                                    let finalLinkssd = finalLink[h].split('?');
                                                    finalLink[h] = finalLinkssd[0].concat('?')
                                                } else if (finalLink[h].match(/keywords/g)) {
                                                    let finalLinkssdd = finalLink[h].split('?');
                                                    finalLink[h] = finalLinkssdd[0].concat('?')
                                                }
                                            } else if (finalLink[h].match(/^ascsubtag/g)) {
                                                finalLink[h] = "";
                                            } else if (finalLink[h].match(/^tag/g)) {
                                                finalLink[h] = ""
                                            } else if (finalLink[h].match(/^ascsub/g)) {
                                                finalLink[h] = ""
                                            } else if (finalLink[h].match(/^keywords/g)) {
                                                finalLink[h] = ""
                                            } else if (finalLink[h].match(/^k/g)) {
                                                finalLink[h] = ""
                                            }
                                        }

                                        let tagnots = finalLink.join('&').replace(/@/g, '').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?');
                                        let tagnotRep = tagnots.replace(/[\?]/g, '?tag=' + ListflagData.papa_post_tag + '&').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?');
                                        if (tagnotRep.charAt(tagnotRep.length - 1) == '&') {
                                            tagnot = tagnotRep.slice(0, -1);
                                        } else {
                                            tagnot = tagnotRep;
                                        }
                                    } else {
                                        tagnot = unshortenedUrl.replace(/@/g, '').concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&');
                                    }
                                }
                                // if (ListflagData.bitlyFlag == "True") {
                                //     example(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')))
                                // } else {
                                //     exampless(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')));
                                // }

                                if(ListflagData.bitlyFlag == "True"){ 
                                  example(tagnot.replace(/&demoyou/g, ''));
                                 }else{
                                   exampless(tagnot.replace(/&demoyou/g, ''));
                                 }

                                async function example(dddd) {
                                    let response = await bitly
                                        .shorten(dddd)
                                        .then(function(result) {
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link);
                                        })
                                        .catch(function(error) {
                                            tinyUrl1(dddd)
                                        });
                                }

                                async function tinyUrl1(dddd) {
                                    await request({
                                        uri: "http://tinyurl.com/api-create.php?url=" + dddd,
                                        method: "GET",
                                    }, (err, response, body) => {
                                        let responses = {
                                            "link": body
                                        };
                                        final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                    })
                                }

                                function exampless(dddd) {
                                    final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), dddd);
                                }

                            } else if (unshortenedUrl.match(/online.citibank.co.in/g) || unshortenedUrl.match(/gearbest.com/g) || unshortenedUrl.match(/nike.com/g) || unshortenedUrl.match(/shop4reebok.com/g) || unshortenedUrl.match(/2gud.com/g) || unshortenedUrl.match(/kotak.com/g) || unshortenedUrl.match(/reliancegeneral.co.in/g) || unshortenedUrl.match(/careinsurance.com/g) || unshortenedUrl.match(/floweraura.com/g) || unshortenedUrl.match(/gasjeans.in/g) || unshortenedUrl.match(/shop.havells.com/g) || unshortenedUrl.match(/sharekhan.com/g) || unshortenedUrl.match(/veromoda.in/g) || unshortenedUrl.match(/hostgator.in/g) || unshortenedUrl.match(/peesafe.com/g) || unshortenedUrl.match(/jackjones.in/g) || unshortenedUrl.match(/gonoise.com/g) || unshortenedUrl.match(/tatacliq.com/g) || unshortenedUrl.match(/lenovo.com/g) || unshortenedUrl.match(/in.toluna.com/g) || unshortenedUrl.match(/vijaysales.com/g) || unshortenedUrl.match(/flipkart.com/g) || unshortenedUrl.match(/banggood.com/g) || unshortenedUrl.match(/puma.com/g) || unshortenedUrl.match(/unacademy.com/g) || unshortenedUrl.match(/coolwinks.com/g) || unshortenedUrl.match(/orra.co.in/g) || unshortenedUrl.match(/360totalsecurity.com/g) || unshortenedUrl.match(/maxbupa.com/g) || unshortenedUrl.match(/religarehealthinsurance.com/g) || unshortenedUrl.match(/fnp.com/g) || unshortenedUrl.match(/healthxp.in/g) || unshortenedUrl.match(/bigrock.in/g) || unshortenedUrl.match(/igp.com/g) || unshortenedUrl.match(/letyshops.com/g) || unshortenedUrl.match(/spartanpoker.com/g) || unshortenedUrl.match(/adda52.com/g) || unshortenedUrl.match(/balaji/g) || unshortenedUrl.match(/eduonix.com/g) || unshortenedUrl.match(/paytmmall.com/g) || unshortenedUrl.match(/testbook.com/g) || unshortenedUrl.match(/mamaearth.in/g) || unshortenedUrl.match(/wonderchef.com/g) || unshortenedUrl.match(/zee5/g) || unshortenedUrl.match(/beardo.in/g) || unshortenedUrl.match(/oneplus.in/g) || unshortenedUrl.match(/1mg.com/g) || unshortenedUrl.match(/udemy.com/g) || unshortenedUrl.match(/hometown.in/g) || unshortenedUrl.match(/magzter.com/g) || unshortenedUrl.match(/asics.com/g) || unshortenedUrl.match(/asics.com/g) || unshortenedUrl.match(/ajio.com/g) || unshortenedUrl.match(/timesprime.com/g) || unshortenedUrl.match(/themomsco.com/g) || unshortenedUrl.match(/akbartravels.com/g) || unshortenedUrl.match(/aliexpress.com/g) || unshortenedUrl.match(/banggood.in/g) || unshortenedUrl.match(/bata.in/g) || unshortenedUrl.match(/behrouzbiryani.com/g) || unshortenedUrl.match(/biba.in/g) || unshortenedUrl.match(/bigbasket.com/g) || unshortenedUrl.match(/brandfactoryonline.com/g) || unshortenedUrl.match(/chumbak.com/g) || unshortenedUrl.match(/cleartrip.com/g) || unshortenedUrl.match(/clovia.com/g) || unshortenedUrl.match(/croma.com/g) || unshortenedUrl.match(/decathlon.in/g) || unshortenedUrl.match(/dominos.co.in/g) || unshortenedUrl.match(/etihad.com/g) || unshortenedUrl.match(/faasos.io/g) || unshortenedUrl.match(/fabhotels.com/g) || unshortenedUrl.match(/firstcry.com/g) || unshortenedUrl.match(/fossil.com/g) || unshortenedUrl.match(/harmanaudio.in/g) || unshortenedUrl.match(/hungama.com/g) || unshortenedUrl.match(/insider.in/g) || unshortenedUrl.match(/jockeyindia.com/g) || unshortenedUrl.match(/kalkifashion.com/g) || unshortenedUrl.match(/lenskart.com/g) || unshortenedUrl.match(/lifestylestores.com/g) || unshortenedUrl.match(/limeroad.com/g) || unshortenedUrl.match(/manyavar.com/g) || unshortenedUrl.match(/mcdonaldsindia.com/g) || unshortenedUrl.match(/medlife.com/g) || unshortenedUrl.match(/microsoft.com/g) || unshortenedUrl.match(/mivi.in/g) || unshortenedUrl.match(/makemytrip.com/g) || unshortenedUrl.match(/myntra.com/g) || unshortenedUrl.match(/nnnow.com/g) || unshortenedUrl.match(/nykaafashion.com/g) || unshortenedUrl.match(/oyorooms.com/g) || unshortenedUrl.match(/pepperfry.com/g) || unshortenedUrl.match(/pizzahut.co.in/g) || unshortenedUrl.match(/puma.com/g) || unshortenedUrl.match(/qatarairways.com/g) || unshortenedUrl.match(/rentomojo.com/g) || unshortenedUrl.match(/samsung.com/g) || unshortenedUrl.match(/singaporeair.com/g) || unshortenedUrl.match(/sochstore.com/g) || unshortenedUrl.match(/tanishq.co.in/g) || unshortenedUrl.match(/themancompany.com/g) || unshortenedUrl.match(/zivame.com/g) || unshortenedUrl.match(/zoomcar.com/g)) {

                                let sqlssnet = "SELECT * FROM diff_net_posts WHERE active_flag ='TRUE'";
                                connection.query(sqlssnet, function(err, flagsData) {
                                    if (err) {
                                        console.log('err: ', err);
                                        setup();
                                    }
                                    let ListflagDatass = flagsData;
                                    let tagnot;
                                    let quelink;
                                    let quelinkRL;
                                    if (unshortenedUrl.match(/earnkaro/g)) {
                                        let finalLink = unshortenedUrl.split('dl=');
                                        quelink = finalLink[1];
                                        for (let k = 0; k < ListflagDatass.length; k++) {
                                            if (urlencode(finalLink[1]).match(ListflagDatass[k].domain_url)) {
                                                tagnot = ListflagDatass[k].Landing_Page.concat("?subid=" + ListflagData.admitad_post_tag + "&ulp=").concat(urldecode(finalLink[1]));
                                            }
                                        }
                                    } else {
                                        quelink = unshortenedUrl;
                                        let quelinkRL = unshortenedUrl.replace(/(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/, '');
                                        if (quelinkRL.match(/^online.citibank.co.in/g) || quelinkRL.match(/^gearbest.com/g) || quelinkRL.match(/^nike.com/g) || quelinkRL.match(/^shop4reebok.com/g) || quelinkRL.match(/^2gud.com/g) || quelinkRL.match(/^kotak.com/g) || quelinkRL.match(/^reliancegeneral.co.in/g) || quelinkRL.match(/^careinsurance.com/g) || quelinkRL.match(/^floweraura.com/g) || quelinkRL.match(/^gasjeans.in/g) || quelinkRL.match(/^shop.havells.com/g) || quelinkRL.match(/^sharekhan.com/g) || quelinkRL.match(/^veromoda.in/g) || quelinkRL.match(/^hostgator.in/g) || quelinkRL.match(/^peesafe.com/g) || quelinkRL.match(/^jackjones.in/g) || quelinkRL.match(/^gonoise.com/g) || quelinkRL.match(/^tatacliq.com/g) || quelinkRL.match(/^lenovo.com/g) || quelinkRL.match(/^in.toluna.com/g) || quelinkRL.match(/^vijaysales.com/g) || quelinkRL.match(/^flipkart.com/g) || quelinkRL.match(/^banggood.com/g) || quelinkRL.match(/^puma.com/g) || quelinkRL.match(/^unacademy.com/g) || quelinkRL.match(/^coolwinks.com/g) || quelinkRL.match(/^orra.co.in/g) || quelinkRL.match(/^360totalsecurity.com/g) || quelinkRL.match(/^maxbupa.com/g) || quelinkRL.match(/^religarehealthinsurance.com/g) || quelinkRL.match(/^fnp.com/g) || quelinkRL.match(/^healthxp.in/g) || quelinkRL.match(/^bigrock.in/g) || quelinkRL.match(/^igp.com/g) || quelinkRL.match(/^letyshops.com/g) || quelinkRL.match(/^spartanpoker.com/g) || quelinkRL.match(/^adda52.com/g) || quelinkRL.match(/^balaji/g) || quelinkRL.match(/^eduonix.com/g) || quelinkRL.match(/^paytmmall.com/g) || quelinkRL.match(/^testbook.com/g) || quelinkRL.match(/^mamaearth.in/g) || quelinkRL.match(/^wonderchef.com/g) || quelinkRL.match(/^zee5/g) || quelinkRL.match(/^beardo.in/g) || quelinkRL.match(/^oneplus.in/g) || quelinkRL.match(/^1mg.com/g) || quelinkRL.match(/^udemy.com/g) || quelinkRL.match(/^hometown.in/g) || quelinkRL.match(/^magzter.com/g) || quelinkRL.match(/^asics.com/g) || quelinkRL.match(/^asics.com/g) || quelinkRL.match(/^ajio.com/g) || quelinkRL.match(/^timesprime.com/g) || quelinkRL.match(/^themomsco.com/g) || quelinkRL.match(/^akbartravels.com/g) || quelinkRL.match(/^aliexpress.com/g) || quelinkRL.match(/^banggood.in/g) || quelinkRL.match(/^bata.in/g) || quelinkRL.match(/^behrouzbiryani.com/g) || quelinkRL.match(/^biba.in/g) || quelinkRL.match(/^bigbasket.com/g) || quelinkRL.match(/^brandfactoryonline.com/g) || quelinkRL.match(/^chumbak.com/g) || quelinkRL.match(/^cleartrip.com/g) || quelinkRL.match(/^clovia.com/g) || quelinkRL.match(/^croma.com/g) || quelinkRL.match(/^decathlon.in/g) || quelinkRL.match(/^dominos.co.in/g) || quelinkRL.match(/^etihad.com/g) || quelinkRL.match(/^faasos.io/g) || quelinkRL.match(/^fabhotels.com/g) || quelinkRL.match(/^firstcry.com/g) || quelinkRL.match(/^fossil.com/g) || quelinkRL.match(/^harmanaudio.in/g) || quelinkRL.match(/^hungama.com/g) || quelinkRL.match(/^insider.in/g) || quelinkRL.match(/^jockeyindia.com/g) || quelinkRL.match(/^kalkifashion.com/g) || quelinkRL.match(/^lenskart.com/g) || quelinkRL.match(/^lifestylestores.com/g) || quelinkRL.match(/^limeroad.com/g) || quelinkRL.match(/^manyavar.com/g) || quelinkRL.match(/^mcdonaldsindia.com/g) || quelinkRL.match(/^medlife.com/g) || quelinkRL.match(/^microsoft.com/g) || quelinkRL.match(/^mivi.in/g) || quelinkRL.match(/^makemytrip.com/g) || quelinkRL.match(/^myntra.com/g) || quelinkRL.match(/^nnnow.com/g) || quelinkRL.match(/^nykaafashion.com/g) || quelinkRL.match(/^oyorooms.com/g) || quelinkRL.match(/^pepperfry.com/g) || quelinkRL.match(/^pizzahut.co.in/g) || quelinkRL.match(/^puma.com/g) || quelinkRL.match(/^qatarairways.com/g) || quelinkRL.match(/^rentomojo.com/g) || quelinkRL.match(/^samsung.com/g) || quelinkRL.match(/^singaporeair.com/g) || quelinkRL.match(/^sochstore.com/g) || quelinkRL.match(/^tanishq.co.in/g) || quelinkRL.match(/^themancompany.com/g) || quelinkRL.match(/^zivame.com/g) || quelinkRL.match(/^zoomcar.com/g)) {
                                            if (quelinkRL.match(/^flipkart.com/g)) {
                                                tagnot = undefined;
                                            } else {
                                                for (let t = 0; t < ListflagDatass.length; t++) {
                                                    if (urlencode(unshortenedUrl).match(ListflagDatass[t].domain_url)) {
                                                        tagnot = ListflagDatass[t].Landing_Page.concat("?subid="+ListflagData.admitad_post_tag+"&ulp=").concat(urldecode(unshortenedUrl));
                                                    }
                                                }
                                            }
                                        } else {
                                            if (urlencode(unshortenedUrl).match('dl=')) {
                                                let finalLink33 = urlencode(unshortenedUrl).split('dl=');
                                                quelink = finalLink33[1];
                                            } else if (urlencode(unshortenedUrl).match('url=')) {
                                                let finalLink44 = urlencode(unshortenedUrl).split('url=');
                                                quelink = finalLink44[1];
                                            }
                                            for (let t = 0; t < ListflagDatass.length; t++) {
                                                if (urlencode(quelink).match(ListflagDatass[t].domain_url)) {
                                                    tagnot = ListflagDatass[t].Landing_Page.concat("?subid=" + ListflagData.admitad_post_tag + "&ulp=").concat(urldecode(quelink));
                                                }
                                            }
                                        }
                                    }

                                    if (tagnot != undefined) {
                                        if (ListflagData.bitlyFlag == "True") {
                                            if (tagnot.match(/flipkart.com/g)) {
                                                example3(tagnot.replace(/%25/g, '%'));
                                            } else {
                                                example1(tagnot.replace(/%25/g, '%'));
                                            }
                                        } else {
                                            example2(tagnot.replace(/%25/g, '%'));
                                        }
                                    } else {
                                        if (urlencode(quelink).match(/flipkart.com/g)) {
                                            if (ListflagData.flipkart_server == 'dirflipkart') {
                                                let tagnotFlipkart;
                                                if (quelink.match(/www.flipkart.com/g)) {
                                                    tagnotFlipkart = urlencode(quelink).replace(/www.flipkart.com/g, 'dl.flipkart.com/dl');
                                                } else {
                                                    tagnotFlipkart = urlencode(quelink);
                                                }
                                                if (tagnotFlipkart.match(/[?]/g)) {
                                                    let finalLink = tagnotFlipkart.split('&');
                                                    for (let h = 0; h < finalLink.length; h++) {
                                                        if (finalLink[h].match(/[?]/g)) {
                                                            if (finalLink[h].match(/affid/g)) {
                                                                let finalLinkssd = finalLink[h].split('?');
                                                                finalLink[h] = finalLinkssd[0].concat('?')
                                                            } else if (finalLink[h].match(/affExtParam1/g)) {
                                                                let finalLinkssd = finalLink[h].split('?');
                                                                finalLink[h] = finalLinkssd[0].concat('?')
                                                            } else if (finalLink[h].match(/affExtParam2/g)) {
                                                                let finalLinkssd = finalLink[h].split('?');
                                                                finalLink[h] = finalLinkssd[0].concat('?')
                                                            }
                                                        } else if (finalLink[h].match(/^affExtParam1/g)) {
                                                            finalLink[h] = "";
                                                        } else if (finalLink[h].match(/^affExtParam2/g)) {
                                                            finalLink[h] = ""
                                                        } else if (finalLink[h].match(/^affid/g)) {
                                                            finalLink[h] = ""
                                                        } else if (finalLink[h].match(/^param/g)) {
                                                            finalLink[h] = ""
                                                        }
                                                    }
                                                    var dateObj = new Date();
                                                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                                    var day = dateObj.getUTCDate();
                                                    var year = dateObj.getUTCFullYear();
                                                    var hour = dateObj.getHours();
                                                    var minu = dateObj.getMinutes();
                                                    let ren = Math.random().toString(36).substring(7);
                                                    let tagnots = finalLink.join('&').replace(/@/g, '').replace(/&&&/g, '&').replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&/g, '&');
                                                    tagnot = tagnots.concat('&affid=' + ListflagData.test_fk_tag).replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/&&/g, '&').replace(/&&/g, '&');
                                                } else {
                                                    var dateObj = new Date();
                                                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                                    var day = dateObj.getUTCDate();
                                                    var year = dateObj.getUTCFullYear();
                                                    var hour = dateObj.getHours();
                                                    var minu = dateObj.getMinutes();
                                                    let ren = Math.random().toString(36).substring(7);
                                                    tagnot = tagnotFlipkart.concat('?affid=' + ListflagData.test_fk_tag);
                                                }

                                                if (ListflagData.bitlyFlag == "True") {
                                                    example1(tagnot.replace(/%25/g, '%'));
                                                } else {
                                                    if (tagnot.match(/flipkart.com/g)) {
                                                        example4(tagnot.replace(/%25/g, '%'));
                                                    } else {
                                                        example2(tagnot.replace(/%25/g, '%'));
                                                    }
                                                }
                                            } else if (ListflagData.flipkart_server == 'quelink') {
                                                let finalLink = urlencode(quelink).split('&');
                                                for (let h = 0; h < finalLink.length; h++) {
                                                    if (finalLink[h].match(/^affid/g)) {
                                                        finalLink[h] = 'demoyou'
                                                    } else if (finalLink[h].match(/^affExtParam1/g)) {
                                                        finalLink[h] = 'demoyou'
                                                    } else if (finalLink[h].match(/^param/g)) {
                                                        finalLink[h] = 'demoyou'
                                                    }
                                                }
                                                let sstarget = finalLink.join('&').replace(/&demoyou/g, '');
                                                tagnot = ("https://linksredirect.com/?cid=76950&subid=kudrat_cl&source=linkkit&url=").concat(encodeURIComponent(sstarget));
                                                if (ListflagData.bitlyFlag == "True") {
                                                    example1(tagnot.replace(/%25/g, '%'));
                                                } else {
                                                    if (tagnot.match(/flipkart.com/g)) {
                                                        example4(tagnot.replace(/%25/g, '%'));
                                                    } else {
                                                        example2(tagnot.replace(/%25/g, '%'));
                                                    }
                                                }
                                            } else if (ListflagData.flipkart_server == 'inrdeal') {
                                                let finalLink = urlencode(quelink).split('&');
                                                for (let h = 0; h < finalLink.length; h++) {
                                                    if (finalLink[h].match(/^affid/g)) {
                                                        finalLink[h] = 'demoyou'
                                                    } else if (finalLink[h].match(/^affExtParam1/g)) {
                                                        finalLink[h] = 'demoyou'
                                                    } else if (finalLink[h].match(/^param/g)) {
                                                        finalLink[h] = 'demoyou'
                                                    }
                                                }
                                                let sstarget = finalLink.join('&').replace(/&demoyou/g, '');
                                                tagnot = ("https://inr.deals/track?id=jig616926125&src=merchant-detail-backend&campaign=cps&url=").concat(encodeURIComponent(sstarget));
                                                if (ListflagData.bitlyFlag == "True") {
                                                    example1(tagnot.replace(/%25/g, '%'));
                                                } else {
                                                    if (tagnot.match(/flipkart.com/g)) {
                                                        example4(tagnot.replace(/%25/g, '%'));
                                                    } else {
                                                        example2(tagnot.replace(/%25/g, '%'));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    async function example1(dddd) {
                                        let response = await bitly
                                            .shorten(dddd)
                                            .then(function(result) {
                                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                            })
                                            .catch(function(error) {
                                                tinyUrl2(dddd)
                                            });
                                    }
                                    async function tinyUrl2(dddd) {
                                        await request({
                                            uri: "http://tinyurl.com/api-create.php?url=" + dddd,
                                            method: "GET",
                                        }, (err, response, body) => {
                                            let responses = {
                                                "link": body
                                            };
                                            final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                        })
                                    }
                                    async function example3(dddd) {
                                        let response = await bitly
                                            .shorten(dddd)
                                            .then(function(result) {
                                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                            })
                                            .catch(function(error) {
                                                tinyUrl2(dddd)
                                            });
                                    }

                                    function example4(dddd) {
                                        let response = unshort(dddd).then(function(unshortenedUrls) {
                                                let responses;
                                                if (unshortenedUrls.unshorten.match(/www.flipkart.com/g)) {
                                                    responses = {
                                                        "link": unshortenedUrls.unshorten.replace(/www.flipkart.com/g, 'dl.flipkart.com/dl')
                                                    };
                                                } else {
                                                    responses = {
                                                        "link": unshortenedUrls.unshorten
                                                    };
                                                }
                                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link);
                                            })
                                            .catch(function(err) {
                                                return err;
                                            })
                                    }

                                    function example2(dddd) {
                                        let response = unshort(dddd).then(function(unshortenedUrls) {
                                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), unshortenedUrls.unshorten);
                                            })
                                            .catch(function(err) {
                                                return err;
                                            })
                                    }
                                })
                            } else {
                                unshort(unshortenedUrl).then(function(unshortenedUrls) {
                                        let unshortenedUrl = unshortenedUrls.unshorten.replace(/&amp;/g, '&');
                                        if (unshortenedUrl.match(/amazon.in/g)) {
                                            let tagnot;
                                            if (unshortenedUrl.match(/[?]/g)) {
                                                let finalLink = unshortenedUrl.split('&');
                                                for (let h = 0; h < finalLink.length; h++) {
                                                    if (finalLink[h].match(/[?]/g)) {
                                                        if (finalLink[h].match(/tag/g)) {
                                                            let finalLinkssd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssd[0].concat('?')
                                                        } else if (finalLink[h].match(/ascsubtag/g)) {
                                                            let finalLinkssd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssd[0].concat('?')
                                                        } else if (finalLink[h].match(/ascsub/g)) {
                                                            let finalLinkssd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssd[0].concat('?')
                                                        } else if (finalLink[h].match(/keywords/g)) {
                                                            let finalLinkssdd = finalLink[h].split('?');
                                                            finalLink[h] = finalLinkssdd[0].concat('?')
                                                        }
                                                    } else if (finalLink[h].match(/^ascsubtag/g)) {
                                                        finalLink[h] = "";
                                                    } else if (finalLink[h].match(/^tag/g)) {
                                                        finalLink[h] = ""
                                                    } else if (finalLink[h].match(/^ascsub/g)) {
                                                        finalLink[h] = ""
                                                    } else if (finalLink[h].match(/^keywords/g)) {
                                                        finalLink[h] = ""
                                                    }
                                                }

                                                let tagnots = finalLink.join('&').replace(/@/g, '').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                                let tagnotRep = tagnots.replace(/[\?]/g, '?tag=' + ListflagData.papa_post_tag + '&').replace(/&&/g, '&').replace(/([\?][\/])/g, '?').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                                if (tagnotRep.charAt(tagnotRep.length - 1) == '&') {
                                                    tagnot = tagnotRep.slice(0, -1);
                                                } else {
                                                    tagnot = tagnotRep;
                                                }
                                            } else {
                                                tagnot = unshortenedUrl.replace(/@/g, '').concat('?tag=' + ListflagData.papa_post_tag).replace(/&&/g, '&').replace(/(\?&)/g, '?').replace(/&&&/g, '&').replace(/([\/][\?])/g, '?').replace(/([\?][\/])/g, '?');
                                            }
                                            // if (ListflagData.bitlyFlag == "True") {
                                            //     example6(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')));
                                            // } else {
                                            //     example7(uFinalUrl1.concat(Buffer.from(tagnot.replace(/&demoyou/g, '')).toString('base64')));
                                            // }
                                            if(ListflagData.bitlyFlag == "True"){ 
                                              example6(tagnot.replace(/&demoyou/g, ''));
                                             }else{
                                               example7(tagnot.replace(/&demoyou/g, ''));
                                             }
                                            async function example6(dddd) {
                                                let response = await bitly
                                                    .shorten(dddd)
                                                    .then(function(result) {
                                                        final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), result.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                                    })
                                                    .catch(function(error) {
                                                        tinyUrl3(dddd)
                                                    });
                                            }
                                            async function tinyUrl3(dddd) {
                                                await request({
                                                    uri: "http://tinyurl.com/api-create.php?url=" + dddd,
                                                    method: "GET",
                                                }, (err, response, body) => {
                                                    let responses = {
                                                        "link": body
                                                    };
                                                    final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), responses.link).replace(/.#x...../g, ' %E2%99%A8 ').replace(/&/g, 'and').replace(/;/g, ' ');
                                                })
                                            }

                                            function example7(dddd) {
                                                final[j] = array[j].replace(urls[0].replace(/@/g, ' ').trim(), dddd);
                                            }
                                        } else {
                                            final[j] = ' ';
                                        }
                                    })
                                    .catch(function(err) {
                                        console.error('AAAW 👻', err)
                                    })
                            }
                        })
                        .catch(function(err) {
                            console.error('AAAW 👻', err)
                        })
                } else {
                    final[j] = array[j].replace(/[?]q=%23/g, '#').replace(/Bug/g, '').replace(/BUG/g, '').replace(/MRP Error/g, '').replace(/Mrp error/g, '').replace(/Price Error/g, '').replace(/MRP ERROR/g, '').replace(/PRICE ERROR/g, '').replace(/MRP Error/g, '').replace(/mrp error/g, '').replace(/Bookmark/g, '').replace(/bookmark/g, '').replace(/BOOKMARK/g, '').replace(/frcp/g, '').replace(/Amazon gift voucher/g, 'https://amzn.to/3afr8VB - Amazon gift voucher').replace(/FRCP/g, '').replace(/ihddeals.com/g, 'bestshoppingdeal.in').replace(/@loot_deal_offers/g, '').replace(/@truegrabbers/g, '').replace(/@loot_deal_offers/g, '').replace(/@desire_deals/g, '').replace(/@online_offers12/g, '').replace(/@Ihd56bot/g, '').replace(/cashkaro/g, 'Deal').replace(/Cashkaro/g, 'Deal').replace(/@I/g, '').replace(/@i/g, '').replace(/@S/g, '').replace(/@s/g, '').replace(/@f/g, '').replace(/@F/g, '').replace(/(telegram.me[\/])/g, '').replace(/IHD/g, '').replace(/telegram.me/g, '').replace(/@frcp_deals/g, ' ').replace(/@IHDBROADCAST/g, ' ').replace(/@IHDBroadcast/g, ' ').replace(/IHDBROADCAST/g, ' ').replace(/@stg003/g, ' ').replace(/stg/g, 'Best_shopping').replace(/ihd/g, ' ').replace(/&#xA0;/g, ' ').replace(/.#x...../g, ' %E2%99%A8 ').replace(/[[\]]/g, '').replace(/&/g, 'and').replace(/;/g, '').replace(/^\s+|\s+$|\s+(?=\s)/g, '');
                }
            }

            setTimeout(() => {
                let finalAmazon = final.join('\n');

                if (finalAmazon.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g)) {
                    if (finalAmazon.match(/pinned/g) || finalAmazon.match(/400 Bad Request/g) || finalAmazon.match(/html/g)) {
                        let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + ",'demo')";
                        connection.query(sqlss, function(err, rides) {
                            if (err) {
                                console.log('err: ', err);
                            }
                        })
                    } else {
                        if (finalAmazon.match(/amazon.in/g) || finalAmazon.match(/amzn.to/g)) {
                            let finalPostList;
                            if(ListflagAmazon == "amazon"){
                             finalPostList = JSON.parse(ListflagData.wp_amzn_post1).telenogroup;
                            }else{
                             finalPostList = JSON.parse(ListflagData.wp_tele_post1).telenogroup;
                            }
                            let finalIdList = JSON.parse(ListflagData.array_data).user;
                            let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + ",'demo')";
                            connection.query(sqlss, function(err, rides) {
                                if (err) {
                                    console.log('err: ', err);
                                } else {
                                    if (ListflagData.ihd_tele_flag == '0' && ListflagData.ihd_watts_flag == '0') {
                                        console.log('---0');
                                    } else if (ListflagData.ihd_tele_flag == '1' && ListflagData.ihd_watts_flag == '1') {
                                          if(userExists[0].text_img != undefined && ListflagData.tele_photo_post == '1'){
                                            teleAutoImgChannel(finalAmazon,userExists[0].text_img,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }else{
                                            teleAutoPostChannel(finalAmazon,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }
                                    } else if (ListflagData.ihd_tele_flag == '1' && ListflagData.ihd_watts_flag == '0') {
                                        if(userExists[0].text_img != undefined && ListflagData.tele_photo_post == '1'){
                                            teleAutoImgChannel(finalAmazon,userExists[0].text_img,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }else{
                                            teleAutoPostChannel(finalAmazon,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }
                                    } else if (ListflagData.ihd_tele_flag == '0' && ListflagData.ihd_watts_flag == '1') {
                                        console.log('---1');
                                    } else {
                                        console.log('---4');
                                    }
                                }
                            })
                            // }).catch(err => {
                            //   console.log('err: ', err);
                            // })

                        } else {
                            let finalIdList = JSON.parse(ListflagData.array_data).user;
                            let finalPostList;
                            if(ListflagAmazon == "amazon"){
                                finalPostList = JSON.parse(ListflagData.wp_amzn_post1).telenogroup;
                            }else{
                                finalPostList = JSON.parse(ListflagData.wp_tele_post1).telenogroup;
                            }
                            console.log('ListflagAmazon: ', ListflagAmazon);
                            let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + ",'demo')";
                            connection.query(sqlss, function(err, rides) {
                                if (err) {
                                    console.log('err: ', err);
                                } else {
                                    if (ListflagData.ihd_tele_flag == '0' && ListflagData.ihd_watts_flag == '0') {
                                        console.log('---0');
                                    } else if (ListflagData.ihd_tele_flag == '1' && ListflagData.ihd_watts_flag == '1') {
                                         if(userExists[0].text_img != undefined && ListflagData.tele_photo_post == '1'){
                                            teleAutoImgChannel(finalAmazon,userExists[0].text_img,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }else{
                                            teleAutoPostChannel(finalAmazon,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }
                                    } else if (ListflagData.ihd_tele_flag == '1' && ListflagData.ihd_watts_flag == '0') {
                                        if(userExists[0].text_img != undefined && ListflagData.tele_photo_post == '1'){
                                            teleAutoImgChannel(finalAmazon,userExists[0].text_img,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }else{
                                            teleAutoPostChannel(finalAmazon,"@dhamakaoffer11",ListflagData.kudart_token);
                                          }
                                    } else if (ListflagData.ihd_tele_flag == '0' && ListflagData.ihd_watts_flag == '1') {
                                        console.log('---1');
                                    } else {
                                        console.log('---4');
                                    }
                                }
                            })
                        }
                    }
                } else {
                    let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + ",'demo')";
                    connection.query(sqlss, function(err, rides) {
                        if (err) {
                            console.log('err: ', err);
                        }
                    })
                }

            }, Math.ceil(array.length / 5) * 3500);
        } else {
            let sqlss = "INSERT INTO post_telegram2 (post_id,data) VALUES (" + nextId + ",'demo')";
            connection.query(sqlss, function(err, rides) {
                if (err) {
                    console.log('err: ', err);
                }
            })
        }
    }
}

function teleAutoPostChannel(finalAmazon, chanelName, token) {
    var chatId = chanelName; // <= replace with yours
    bot = new nodeTelegramBotApi(token);
    bot.sendMessage(chatId, finalAmazon, {
        disable_web_page_preview: true
    })
}

module.exports = router;
