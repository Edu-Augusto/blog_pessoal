const Sequelize= require('sequelize');

//Conexão com o banco de dados
const connection= new Sequelize('blog','root','1234',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
});

module.exports=connection;
