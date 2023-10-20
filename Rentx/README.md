# Cadastro de carro

**RF**
- Deve ser possível cadastrar um novo carro

**RN**
- Não deve ser possível cadastrar carros com a mesma placa
- Não deve ser possível alterar a placa de um carro já cadastrado
- O carro deve ser cadastrado por padrão com disponibilidade (available = true)
- Somente usuários de nível administrador podem cadastrar um carro

# Listagem de carros

**RF**
- Deve ser possível todos os carros disponiveis
- Deve ser possível todos os carros disponiveis pelo nome da categoria
- Deve ser possível todos os carros disponiveis pelo nome da marca
- Deve ser possível todos os carros disponiveis pelo nome do carro

**RN**
- Não é necessário que o usuário esteja autenticado no sistema para realizar a listagem

# Cadastro de especificação no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro

**RN**
- Não deve ser possível cadastrar uma especificação para um carro inexistente
- Não deve ser possível cadastrar uma especificação ja cadastrada para o mesmo carro
- Somente usuários de nível administrador podem cadastrar um carro

# Cadastro de imagens do carro

**RF**
- Deve ser possível uma imagem para um carro
- Deve ser possível listar todos os carros

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- Deve ser possível o usuário cadastrar mais de uma imagem para o mesmo carro
- Somente usuários de nível administrador podem cadastrar uma nova imagem
- Deve ser possível cadastrar uma imagem apenas para carros existentes

# Aluguel de carro

**RF**
- Deve ser possível realizar um aluguel

**RN**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso o usuário já possua um aluguel em aberto
- Não deve ser possível cadastrar um novo aluguel caso o carro selecionado ja esteja em outro aluguel não concluído

