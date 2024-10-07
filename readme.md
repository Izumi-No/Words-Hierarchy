# Documentação do Projeto

## Estrutura do Projeto

Este projeto foi desenvolvido utilizando uma árvore N-ária como estrutura de
dados principal. A escolha por essa estrutura se deve à necessidade de
representar de forma eficiente hierarquias complexas, como a análise de
profundidade em frases ou palavras. Diferente de árvores binárias, a árvore
N-ária permite que cada nó tenha um número arbitrário de filhos, o que facilita
a manipulação de estruturas com múltiplas ramificações e oferece flexibilidade
em algoritmos de análise hierárquica.

## Princípios SOLID

O projeto segue os princípios SOLID para garantir flexibilidade,
manutenibilidade e escalabilidade no código:

- **S - Princípio da Responsabilidade Única (Single Responsibility Principle):**
  Cada classe tem uma única responsabilidade bem definida, o que facilita sua
  manutenção e evolução.
- **O - Princípio do Aberto/Fechado (Open/Closed Principle):** O código foi
  projetado para ser facilmente estendido, sem a necessidade de modificar as
  classes existentes.
- **L - Princípio da Substituição de Liskov (Liskov Substitution Principle):**
  Garantimos que subclasses possam substituir suas classes base sem afetar o
  comportamento correto do programa.
- **I - Princípio da Segregação de Interfaces (Interface Segregation
  Principle):** Foram criadas interfaces específicas para cada funcionalidade,
  evitando que classes dependam de métodos que não utilizam.
- **D - Princípio da Inversão de Dependência (Dependency Inversion Principle):**
  O projeto utiliza injeção de dependências para que módulos de alto nível não
  dependam diretamente de módulos de baixo nível.

## Design Patterns Utilizados

Foram aplicados dois padrões de projeto para garantir a flexibilidade e
extensibilidade da aplicação:

- **Command Pattern:** Este padrão permite encapsular solicitações como objetos,
  fornecendo suporte para operações como desfazer e refazer ações, além de
  permitir a criação de novas funcionalidades sem alterar o código existente.

- **Factory Pattern:** O padrão Factory foi utilizado para a criação de objetos
  de forma centralizada, facilitando a adição de novas classes e promovendo o
  princípio aberto/fechado (Open/Closed Principle).

## Executando o CLI

### Com Deno

Para rodar o CLI utilizando Deno, basta executar o comando abaixo:

```bash
deno task cli analyze -depth <profundidade> -verbose <frase>
```

### Com Node

instale as dependencias

```bash
yarn
```

rode o CLI

```bash
yarn cli analyze -depth <profundidade> -verbose <frase>
```
