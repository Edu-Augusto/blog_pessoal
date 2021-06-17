const express=require("express");
const router=express.Router();
const Category=require('../categories/Category');
const slugify=require('slugify');
const Article=require('./Article');
const adminAuth=require('../middleware/authMiddleware')


router.get('/admin/article',adminAuth, (req,res)=>{
    Article.findAll({
        include:[{model:Category}]
    }).then(article =>{
        res.render('admin/articles/index', {articles:article})
    })
});
router.get('/admin/article/new',adminAuth,(req,res)=>{
    Category.findAll().then(category=>{
        res.render('admin/articles/new',{categories:category}); 
    })
})
router.post('/article/save',(req,res)=>{
    var title=req.body.title;
    var body=req.body.body;
    var category=req.body.category;

    Article.create({
        title:title,
        body:body,
        slug:slugify(title),
        categoryId:category
    }).then(()=>{
        res.redirect('/admin/article');
    })
})
router.post('/article/delete', (req, res) => {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/article');
            });
        } else {
            res.redirect('/admin/article');
        }
    } else {
        res.redirect('/admin/article');
    }
});
router.get('/article/edit/:id', (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(category=>{
                res.render('admin/articles/edit', { article: article, category:category });
            })

        } else {
            res.redirect('/admin/article');
        }
    }).catch(error => {
        res.redirect('/admin/article')
    })
});
router.post('/article/update', (req, res) => {
    var id = req.body.id;
    var body=req.body.body;
    var categoria=req.body.category;
    var title=req.body.title;
    Article.update({ body:body, categoryId:categoria, title:title, slug:slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/article')
    });
});
router.get('/articles/page/:num', (req,res)=>{
    var num=req.params.num;
    var offset=0;

    if(isNaN(num) || num==1){
        offset=0;
    }else{
        offset = (parseInt(num) -1) * 4;
    }
    
    Article.findAndCountAll({
        offset:offset,
        limit:4,
        order:[
            ['id','DESC']
        ]
    }).then(article=>{

        var next;
        if(offset+4 >= article.count){
            next=false;
        }else{
            next=true;
        }
        
        var result={
            page:parseInt(num),
            next:next,
            article:article
        }
        Category.findAll().then(categories=>{
            res.render('admin/articles/page', {result:result, categories:categories})
        })
    })
})
module.exports=router;