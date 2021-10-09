const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cartFF = require('./factoryFunction');

const app = express();
const cart = cartFF();

var hbs = exphbs.create({
    layoutsDir : './views/layouts',
    partialsDir : './views/partials',
    helpers: {
        checkOut: function(){
            if(cart.getBoolen().checkVar == true || cart.priceUpdate().totalCart == 0.00){
                return 'hidden';
            } else if(cart.getBoolen().checkVar == false){
                return '';
            }
        },
        payOut: function(){
            if(cart.getBoolen().payVar == true || cart.priceUpdate().totalCart == 0.00){
                return 'hidden';
            } else if(cart.getBoolen().payVar == false){
                return '';
            }
        },
        messageHide: function(){
            if(cart.getBoolen().messageVar == true || cart.priceUpdate().totalCart == 0.00){
                return 'hidden';
            } else if(cart.getBoolen().messageVar == false){
                return '';
            }
        },
        messageClass: function(){
            if(cart.getChange() >= 0){
                return 'rgba(120, 255, 120, 0.95)';
            } else if (cart.getChange() < 0){
                return 'rgba(255, 120, 120, 0.95)';
            }
        },
        messageContent: function(){
            if(cart.getChange() == 0){
                return "Enjoy your Pizza!";
            } else if(cart.getChange() > 0){
                return "Enjoy your Pizza, here is your change R" + cart.getChange();
            } else if(cart.getChange() < 0){
                return "Sorry, that is not enough money!";
            }
        }
    }
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index', {
        layouts:'main',
        qty: cart.qtyUpdate(),
        price: cart.priceUpdate()
    });
});

app.post('/cart', function(req, res){
    cart.btnClickff(req.body.size);

    cart.setBoolen('check',false);
    cart.setBoolen('pay',true);
    cart.setBoolen('message',true);
    res.redirect('/');
});

app.post('/checkout', function(req, res){
    cart.setBoolen('check',true);
    cart.setBoolen('pay',false);
    cart.setBoolen('message',true);
    res.redirect('/');
});

app.post('/pay', function (req, res) {
    cart.calChange(req.body.payAmt);

    if(cart.getChange() < 0){
        cart.setBoolen('check', true);
        cart.setBoolen('pay',false);
        cart.setBoolen('message',false);
    } else {
        cart.setBoolen('check',true);
        cart.setBoolen('pay',true);
        cart.setBoolen('message',false);
    }
    res.redirect('/');
});

app.post('/close',function(req, res){
    if(cart.getChange() < 0){
        cart.setBoolen('check', true);
        cart.setBoolen('pay',false);
        cart.setBoolen('message',true);
    } else {
        cart.setBoolen('check',true);
        cart.setBoolen('pay',true);
        cart.setBoolen('message',true);
        cart.resetCart();
    }
    res.redirect('/');
})

app.get('/clear',function(req, res){
    cart.resetCart();
    res.redirect('/');
})



const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App started at port:' + PORT);
})