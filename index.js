const express = require('express');
const app = express();
const session=require('express-session');
const bodyParser = require("body-parser");
//Conexão com o banco de dados
const connection = require('./database/database');

//Controllers
const CategoriesController = require('./categories/Categoriescontroller');
const ArticlesController = require("./articles/ArticlesController");
const UsersController=require('./user/UsersController');

//Models das páginas
const Category = require("./categories/Category");
const Article = require("./articles/Article");
const Users=require('./user/User');
//View engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret:'malevolente',
    cookie:{ maxAge:30000000 }
}))

//Arquivos estáticos
app.use(express.static('public'));

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conexão com o banco de dados 
connection
    .authenticate()
    .then(() => {
        console.log("Servidor conectado com sucesso com o banco de dados!")
    })
    .catch((erro) => {
        console.log(erro)
    })

app.use("/", CategoriesController);
app.use("/", ArticlesController);
app.use('/', UsersController);



app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit:4
    }).then(articles => {
        Category.findAll().then(categories=>{
            res.render('index', {articles:articles, categories:categories})
        })
    })
});
app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories=>{
                res.render('article', {article:article, categories:categories})
        })
        }
        else {
            res.redirect('/');
        }
    }).catch( err => {
        res.redirect('/')
    })

})
app.get('/category/:slug', (req,res)=>{
    var slug=req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
    }).then(category=>{
        if(category!=undefined){
            Category.findAll().then(categories=>{
                res.render('categories', {articles:category.articles,categories:categories});
            });
        }
        else{
            res.redirect('/');
        }
    }).catch(err=>{
        res.redirect('/');
    })
})




app.listen(8080, () => {
    console.log("Servidor rodando com sucesso.");
});