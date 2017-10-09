var express = require('express');
var router = express.Router();

var phantom = require('phantom');

router.get('/', function(req, res, next) {
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open("/").then(function(status) {
            page.render('SilasCandiolli.pdf').then(function() {
                console.log('Page Rendered');
                ph.exit();
            });
        });
    });
  });

  // res.send('respond with a resource');
});







// var htmlToPdf = require('html-to-pdf');

// htmlToPdf.setDebug(true);

// var html = "<html><body><h1>Hello</h1></body></html>";
// /* GET users listing. */
// router.get('/', function(req, res, next) {

//   htmlToPdf.convertHTMLString(html, 'e:/SilasCandiolli.pdf',
//   function (error, success) {
//      if (error) {
//           console.log('Oh noes! Errorz!');
//           console.log(error);
//       } else {
//           console.log('Woot! Success!');
//           console.log(success);
//       }
//   }
// );

//   res.send('respond with a resource');
// });

module.exports = router;
