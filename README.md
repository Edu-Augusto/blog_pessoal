# blog_pessoal
 <h1>Blog pessoal para postagem de artigos</h1>
    <p>Este é um projeto para desenvolvimento de habilidades back-end, com um sistema de postagem de artigos e categorias relacionadas no banco de dados.Toda a postagem e edição dos artigos ou categorias são feitas a partir de um sistema de login, que controla o acesso as rotas /admin.Espero que apreciem este projeto e esperem por novos projetos mais completos e robustos futuramente.</p>
    <p>Atenciociosamente <strong>Eduardo Augusto Oliveira</strong>.</p>
    <div>
        <h3>Instalação do projeto</h3>
        <ol>
            <li>Instale o node.Js no link -><a href="https://nodejs.org/en/">Node.Js</a></li>
            <li>Instale o mysql no link -><a href="https://dev.mysql.com/downloads/installer/">MySql</a></li>
            <li>Após instalar as ferramentas, abra seu prompt de comando e entre na pasta reservada para seu projeto. Em seguida, digite os comandos a seguir para instalar as bibliotecas do projeto:
                <ul>
                    <li>Express => npm install express --save</li>
                    <li>bcrypt => npm install --save bcrypt</li>
                    <li>Ejs => npm install ejs</li>
                    <li> Express-session => npm install express-session</li>
                    <li>MySql 2 => npm install --save mysql2</li>
                    <li>Sequelize => npm install --save sequelize</li>
                    <li>Slugify => npm install --save sequelize</li>
                </ul>
            </li>
        </ol>
        <p>As verções instaladas de cada ferramenta estão no arquivo package.json.</p>
    </div>
    <div>
        <h3>Configurando o editor de texto</h3>
        <p>Para instalar o editor de texto Tinymce, entre no link <a href="https://www.tiny.cloud/get-tiny/self-hosted/">TinyMce</a>, abra o arquivo .zip que baixou, entre na pasta tinymce/js e cole a pasta com o nome tinymce na pasta public do projeto, após isso seu editor de texto estara instalado no projeto.</p>
        <p>Caso queira, para traduzir o tinymce vá no link <a href="https://www.tiny.cloud/get-tiny/language-packages/">Traduzir</a> e escolha a lingua de preferência.Após baixar o arquivo .zip, cole ele na pasta tinymce/langs do seu projeto, que lembrando está na pasta public do projeto.</p>
    </div>
    <div>
        <h3>Observações para a inicialização</h3>
        <p>Após todas instalações, vá no arquivo database.js dentro da pasta database e modifique o usuário e a senha em relação há que você criou na instalação do mysql, caso ja tenha instalado, coloque a já existente.</p>
        <pre><code>
            const connection= new Sequelize('blog','>usuário aqui<','>senha aqui<',{
                host:'localhost',
                dialect:'mysql',
                timezone:'-03:00'
            });
        </code>
    </pre>
    </div>
    <footer>
    <p>Para qualquer duvida em relação ao projeto e outros assuntos, entre em contato pelo github ou pelas redes sociais:
        <ul>
            <li><a href="https://www.instagram.com/eduu_augusto/">Instagran</a></li>
            <li><a href="https://www.linkedin.com/in/eduardo-augusto-07/">Linkedin</a></li>
        </ul>
    </p>
    </footer>
