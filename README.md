# APP

GymPass style app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter seu histórico de check-ins;
- [x] Deve ser possivel o usuario buscar academias próximas (até 10km);
- [x] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negócio)

- [x] O usuario não deve poder se cadastrar com um email duplicado;
- [x] O usuario não pode fazer 2 check-ins no mesmo dia;
- [x] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por adms;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da app precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [x] O usuario deve ser identificado por um JWT (JSON Web Token);
