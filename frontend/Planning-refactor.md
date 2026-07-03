# Planejamento de refatoração - Frontend

## Fase 1: Setup e Limpeza Inicial
* Passo 1.1 - Setup inicial

   [✅] Exatamente como planejamos, focada na raiz do projeto.

   [✅] Arquivos afetados: package.json, package-lock.json.

   [✅] Ação: Desinstalar @mui/material, instalar @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion.

## Fase 2: Fundação e Tema Global
* Passo 2.1: Criação do Arquivo de Tema Dinâmico (src/theme.js)

   [✅] Configurar o Chakra UI para criar um tema personalizado.

   [✅] Ler a variável de ambiente import.meta.env.VITE_APP_ENV.

   [✅] Mapear os tokens de cores (brand.primary, brand.secondary, brand.tertiary) chaveando os valores com base no ambiente (Azul para production, Verde para develop).

* Passo 2.2: Ajuste e Envelopamento no main.jsx

   [✅] Importar o ChakraProvider e o theme recém-criado.

   [✅] Envolver o <RouterProvider> com o <ChakraProvider value={system}>.

   [✅] Manter a linha do setAttribute('data-env') por enquanto, apenas para não quebrar estilos legados de tabelas que ainda dependem das variáveis CSS nas cores antigas.

* Passo 2.3: Refatoração Estrutural do Layout Base (App.jsx)

   [✅] Importar os componentes Flex, Box e Text do Chakra UI.

   [✅] Substituir a tag <header> por um <Flex as="header">, aplicando as propriedades de estilo inline do Chakra (bg, color, p, align, justify).

   [✅] Substituir a tag <main> por um <Box as="main">.

   [✅] Garantir o espaçamento adequado para o <Outlet /> não sumir sob o header fixo.

* Passo 2.4: Faxina de Estilos Iniciais (App.css e index.css)

   [✅] Deletar o arquivo App.css por completo (e remover o import "./App.css" do App.jsx).

   [✅] Abrir o index.css e remover estritamente os blocos de reset que conflitam com o Chakra (regras do *, :root, body e #root). Deixaremos os estilos de tabelas, forms e botões legados intactos para as próximas fases.

## Fase 3: Refatoração da Camada de Componentes Base (O Grande Gargalo)
Aqui é onde preparamos o terreno. Migraremos as peças de LEGO do sistema, garantindo que os novos componentes Chakra UI substituam as classes CSS legadas.

* Passo 3.1: Migração dos Cards (src/components/cards/)

    [✅] Refatorar cardUser, cardList, cardActivity e cardActivitySelect utilizando Card, Box e Stack do Chakra UI.

    [✅] Injetar estilos baseados nos tokens do theme.js (cores brand.primary e brand.secondary).

    [✅] Deletar os ficheiros .module.css associados a cada um desses cards.

    [✅] Achatar a estrutura de pastas (mover componentes para a raiz de src/components/cards/) para facilitar a manutenção.

* Passo 3.2: Migração de Inputs e Feedback de Loading

    [✅] Refatorar formTextArea para usar o componente Textarea do Chakra UI.

    [✅] Refatorar src/components/loading/page.jsx utilizando o componente Spinner nativo do Chakra.

    [✅] Deletar os ficheiros .module.css destes componentes após a migração.

* Passo 3.3: Refatoração dos Modais (src/components/dialog/)

    [✅] Refatorar dialogAddActivity para utilizar o componente Modal nativo do Chakra UI.

    [✅] Implementar o hook useDisclosure do Chakra para gerenciar a lógica de abrir/fechar (simplificando o estado local existente).

    [✅] Deletar o dialogAddActivity.module.css.

* Passo 3.4: Refatoração de Tabelas e Listas (src/components/list/ e src/components/table/)
   [✅] Migrar list.jsx para a estrutura de tabelas do Chakra (Table.Row / Tr, Table.Cell / Td).
   
   [✅] Migrar headerFilter.jsx para a estrutura de cabeçalho do Chakra (Table.Header / Thead, Table.ColumnHeader / Th).
   
   [✅] Substituir os filtros nativos (<input> e <select>) do headerFilter.jsx por componentes do Chakra (Input, NativeSelect).
   
   [✅] Aplicar as propriedades de estilo para garantir responsividade.
   
   [✅] Deletar os arquivos .module.css associados.

* Passo 3.5: Componentes Adicionais (Ação, Relatórios e Limpeza)
   
   [✅] Limpeza: Deletar permanentemente o arquivo teste.jsx e seu respectivo teste.module.css, pois são apenas rascunhos de código morto.
   
   [✅] Ação: Refatorar handleBack.jsx, substituindo a <div> genérica e a classe CSS por um componente <Icon> ou <IconButton> do Chakra UI, mapeando a cor para os tokens do tema.
   
   [✅] Relatórios: Refatorar presence.jsx (src/components/reports/presences/). Transformá-lo em um componente Dialog nativo do Chakra UI.
   
   [✅] Substituir os campos nativos de <select> (Mês e Ano) e os <input type="radio"> (Formato) do presence.jsx por NativeSelect e RadioGroup do Chakra UI.
   
   [✅] Deletar o presence.module.css.


## Fase 4: Navegação e Layout Estrutural (O Dashboard)
A espinha dorsal por onde o utilizador navega. Vamos transformar a estrutura num verdadeiro Dashboard Layout, dividindo o ecrã numa Sidebar retrátil e numa Área Principal com um Header rico.


* Passo 4.1: O Novo Header (Topo)
   
   [✅] Criar a estrutura do cabeçalho no topo da Área Principal usando `<Flex w="100%">` do Chakra UI.
   
   [✅] Adicionar Título/Logo da ONG em destaque à esquerda.
   
   [✅] Renderizar a data atual formatada ao centro/direita (usando as tuas funções de `dateFunctions.js`).
   
   [✅] Implementar o componente nativo `Menu` do Chakra UI v3 (`Menu.Root`, `Menu.Trigger`, `Menu.Content`, `Menu.Item`) no canto direito.
   
   [✅] Adicionar as opções de dropdown no Menu: Configurar Perfil, Mudar Senha e Sair do Sistema (Logout).

* Passo 4.2: A Sidebar (Menu Lateral Expansível) - `navbar.jsx`
   
   [✅] Refatorar o componente para ser uma Sidebar ancorada à esquerda (usando `<Box>` ou `<Flex>`).
   
   [✅] Adicionar transição suave de largura (`transition="width 0.3s"`) para alternar entre Expandida e Recolhida.
   
   [✅] Ajustar o mapeamento do `menuItems`: quando recolhida, ocultar o texto e mostrar apenas ícones (com o nome num Tooltip); quando expandida, mostrar Ícone + Texto.
   
   [✅] Fixar o botão de toggle (recolher/expandir) no topo ou no rodapé da Sidebar, eliminando a sobreposição visual.

* Passo 4.3: O Layout Mestre (`App.jsx`)
   
   [✅] Transformar o contentor base do `App.jsx` num `<Flex h="100vh" w="100vw">`.
   
   [✅] Renderizar a Sidebar à esquerda deste Flex.
   
   [✅] Configurar a Área Direita como `<Box flex="1" overflow="hidden">`.
   
   [✅] Posicionar o novo Header fixo no topo da Área Direita e o `<Outlet />` logo abaixo (com `overflowY="auto"` para permitir scroll apenas no conteúdo).

* Passo 4.4: Lógica Dinâmica de Recolhimento da Sidebar
   
   [✅] Implementar um `useEffect` para escutar a mudança do ecrã atual (via `useLocation` do react-router ou a prop `activeScreen`).
   
   [✅] Adicionar a lógica: se o utilizador entrar num menu com tabelas pesadas ("cadastros", "atividades"), o estado da Sidebar muda automaticamente para recolhida (`setShowNav(false)`).

* Passo 4.5: Limpeza e Ajustes Finais
   
   [✅] Eliminar permanentemente o ficheiro `navbar.module.css`.
   
   [✅] Garantir que todas as rotas e navegações continuam a funcionar perfeitamente com a nova estrutura.

## Fase 5: Migração das Features (Telas de Negócio)
Agora que os componentes da Fase 3 estão prontos e em Chakra, as telas apenas "encaixam" as peças.

* Passo 5.1: Correção do Erro de Tabela (Table.Root)

   [✅] Identificar todos os arquivos em src/features/ que renderizam listas (ex: activityManagement.jsx, peopleManagement.jsx, fieldsManagementList.jsx).

   [✅] Envolver todas as tabelas nativas ou listas antigas no componente <Table.Root /> do Chakra UI v3.

   [✅] Garantir que o Table.Header e Table.Body estejam dentro do Root para que o contexto de estilos (useTableStyles) seja injetado corretamente.

* Passo 5.2: Refatoração da Home (src/home/home.jsx)

   [✅] Remover dependências do home.module.css.

   [✅] Implementar um layout com <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>.

   [✅] Criar Cards de Dashboard (usando <Card.Root>) para exibir resumos dinâmicos (Cadastros, Atividades, Financeiro).

   [✅] Adicionar seção de "Ações Rápidas" com botões estilizados.

* Passo 5.3: Migração das Telas de Atividades (src/features/activities/)

   [✅] Refatorar activityManagement.jsx, activityManagementDetailed.jsx, activityManagementUserActivity.jsx, activityManagementUsers.jsx.

   [✅] Substituir containers genéricos (<div>) por <Stack>, <VStack> e <Box> do Chakra.

   [✅] Deletar todos os arquivos .module.css desta pasta.

* Passo 5.4: Migração das Telas de Campos/Campos Dinâmicos (src/features/fields/)

   [✅] Refatorar os componentes de gerenciamento de campos (fieldsManagement, fieldsManagementDetailed, etc.).

   [✅] Aplicar layouts com Grid do Chakra UI para alinhar os campos do formulário de maneira responsiva.

   [✅] Deletar os arquivos .module.css desta pasta.

* Passo 5.5: Migração das Telas de Cadastro (Pessoas) (src/features/register/)

   [✅] Refatorar peopleManagement.jsx e telas de detalhamento.

   [✅] Assegurar que os filtros (HeaderFilter já refatorado) estejam perfeitamente alinhados dentro da estrutura da Table.Root.

   [✅] Deletar os arquivos .module.css desta pasta.

## Fase 6: O Épico do Login (Squamata-Login)
Separar o Login é crucial porque envolve mudança de regra de negócio, não apenas de visual.

Pastas afetadas: src/features/login/.

Ação: Refatorar a interface para o Chakra UI e acoplar a nova lógica de Single Sign-On (Google Auth, JWT) para conversar com o microsserviço Squamata.

   [✅] signUp.jsx — corrigido Table.Root (estava com <table> nativo causando erro useTableStyles). Migrado para VStack, Heading, Button, HStack.

   [ ] signUpDetailed.jsx — ainda usa styles (signup.module.css) e classes globais. Migrar para Chakra.

   [ ] login.jsx — migrar para Chakra UI.

   [ ] login.module.css, signup.module.css — apagar após migração completa.

## Fase 6.5: Correção de Rotas Quebradas (Relatórios, Financeiro, Configurações)
As rotas /relatorios, /financeiro e /configuracoes não existiam no router, causando erro 404.

   [✅] Criar componente UnderConstruction reutilizável (src/components/underConstruction.jsx).

   [✅] Criar página Configurações como hub (src/features/configuracoes/pages/configuracoes.jsx).

   [✅] Adicionar rotas no main.jsx: relatorios, financeiro (underConstruction) e configuracoes (hub).

## Fase 7: Faxina Final e QA (Quality Assurance)
Garantir que nenhum lixo ficou para trás.

Arquivos afetados: Toda a árvore.

Ação: * Busca global no VS Code por import "*.css".

Deletar o index.css de vez.

Rodar o eslint para garantir imports limpos.

Rodar npm run build (Vite) para ter certeza que a compilação não quebra por falta de algum arquivo apagado.