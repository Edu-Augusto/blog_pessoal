const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require('slugify');
const adminAuth=require('../middleware/authMiddleware');


//Rota de categorias
router.get('/admin/categories',adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", { cat: categories });
    });
});
//Rota de criação de categorias
router.get('/admin/categories/new',adminAuth, (req, res) => {
    res.render("admin/categories/new");
});
//Rota de salvamento de categoria
router.post('/categories/save', (req, res) => {
    var title = req.body.title;

    if (title !== undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/');
        })
    } else {
        res.redirect('/admin/categories/new')
    }
});
//Rota de deletar as categorias
router.post('/categories/delete', (req, res) => {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            });
        } else {
            res.redirect('/admin/categories');
        }
    } else {
        res.redirect('/admin/categories');
    }
});
//Rota da pagina de edição de categorias
router.get('/categories/edit/:id', (req, res) => {
    var id = req.params.id;
    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render('admin/categories/edit', { category: category});

        } else {
            res.redirect('/admin/categories');
        }
    }).catch(error => {
        res.redirect('/admin/categories')
    })
});
//Rota de salvamento das edições de categorias
router.post('/categories/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    Category.update({ title: title, slug:slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    });
});
module.exports = router;