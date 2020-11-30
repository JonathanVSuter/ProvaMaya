const express = require('express')
const UrlEncurtada = require('./models/shortUrl')
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/encurtadorUrl',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.get('/', async (req,res)=>
{
    try
    {
        const urlsEncurtadas = await UrlEncurtada.find()
        res.render('index',{urlsEncurtadas : urlsEncurtadas});
    }
    catch(err)
    {
        console.log(err);
    }
    
});
app.get('/:urlCurta', async (req,res)=>
{
    try
    {
        const urlcurta = await UrlEncurtada.findOne({encurtada: req.params.urlCurta});
        console.log(req.params.urlCurta);
        if(urlcurta==null)
        {
            return res.sendStatus(404);   
        }
        urlcurta.cliques++;
        urlcurta.save();
        res.redirect(urlcurta.inteira);     
    }
    catch(error)
    {
        console.log(error);
    }
    
});
app.post('/encurtarUrl',async (req,res)=>
{
    await UrlEncurtada.create({inteira:req.body.fullUrl});
    res.redirect('/');
});

app.listen(process.env.PORT || 5000);