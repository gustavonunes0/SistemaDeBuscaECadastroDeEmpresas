Para rodar o projeto React --> <br>
<ul>
  <li>npm i</li>
  <li>npm run dev</li>
  <li>ALTERAR PORTA LOCALHOST DO PROJETO ASP PARA O LINK REDIRECIONAR CORRETAMENTE</li>
</ul>
<br>
Para rodar o projeto ASP --><br>
<ul>
  <li>Criar site no Gerenciador de Servidor</li>
  <li>Apontar endereço fisico para o index.asp do projeto</li>
</ul><br>

$**VOU DEIXAR MEU BANCO DE DADOS ONLINE PARA FACILITAR NOS TESTES**<br>
<br>
$**Caso queira mudar o Banco de Dados, lembre-se de alterar a ConnectionString**<br>

SCRIPT DE CRIAÇÃO DA TABELA NO BANCO DE DADOS <br>
<br>
------------------> MySQL <------------------<br>
<br>
create table empresa (<br>
    ID_EMPRESA INT AUTO_INCREMENT PRIMARY KEY,<br>
    NM_RAZAO_SOCIAL VARCHAR(255) NOT NULL,<br>
    NR_CNPJ VARCHAR(14) UNIQUE NOT NULL,<br>
    NM_LOGRADOURO VARCHAR(255),<br>
    NR_NUMERO VARCHAR(10),<br>
    DS_COMPLEMENTO VARCHAR(255),<br>
    NM_MUNICIPIO VARCHAR(100),<br>
    NM_ESTADO VARCHAR(100),<br>
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,<br>
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP<br>
);<br>
