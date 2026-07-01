# Planejamento de refatoração - Frontend

## Fase 1: Setup e Limpeza Inicial
Exatamente como planejamos, focada na raiz do projeto.

Arquivos afetados: package.json, package-lock.json.

Ação: Desinstalar @mui/material, instalar @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion.

## Fase 2: Fundação e Tema Global
* Passo 2.1: Criação do Arquivo de Tema Dinâmico (src/theme.js)

    Configurar o Chakra UI para criar um tema personalizado.

    Ler a variável de ambiente import.meta.env.VITE_APP_ENV.

    Mapear os tokens de cores (brand.primary, brand.secondary, brand.tertiary) chaveando os valores com base no ambiente (Azul para production, Verde para develop).

* Passo 2.2: Ajuste e Envelopamento no main.jsx

    Importar o ChakraProvider e o theme recém-criado.

    Envolver o <RouterProvider> com o <ChakraProvider theme={theme}>.

    Manter a linha do setAttribute('data-env') por enquanto, apenas para não quebrar estilos legados de tabelas que ainda dependem das variáveis CSS nas cores antigas.

* Passo 2.3: Refatoração Estrutural do Layout Base (App.jsx)

    Importar os componentes Flex, Box e Text do Chakra UI.

    Substituir a tag <header> por um <Flex as="header">, aplicando as propriedades de estilo inline do Chakra (bg, color, p, align, justify).

    Substituir a tag <main> por um <Box as="main">.

    Garantir o espaçamento adequado para o <Outlet /> não sumir sob o header fixo.

* Passo 2.4: Faxina de Estilos Iniciais (App.css e index.css)

    Deletar o arquivo App.css por completo (e remover o import "./App.css" do App.jsx).

    Abrir o index.css e remover estritamente os blocos de reset que conflitam com o Chakra (regras do *, :root, body e #root). Deixaremos os estilos de tabelas, forms e botões legados intactos para as próximas fases.

## Fase 3: Refatoração da Camada de Componentes Base (O Grande Gargalo)
Aqui é onde o plano precisou mudar. Não podemos refatorar telas sem antes refatorar as peças de LEGO que as compõem. O Chakra UI muda a forma como lidamos com modais e inputs.

Pastas afetadas: Todo o diretório src/components/.

Ações:

Cards (/cards): Migrar cardActivity, cardActivitySelect, cardList, cardUser usando o componente Card e Box do Chakra. Deletar seus .module.css.

Inputs e Feedbacks: Migrar formTextArea e o loading/page.jsx (usando o Spinner nativo do Chakra).

Modais (/dialog): Refatorar o dialogAddActivity. O Chakra possui o componente Modal nativo junto com o hook useDisclosure, que vai simplificar muito a lógica de abrir/fechar que você tem hoje.

Tabelas e Listas: Migrar list e table/headerFilter. O Chakra tem componentes prontos de Table, Thead, Tr, etc.

## Fase 4: Navegação e Layout Estrutural
A espinha dorsal por onde o usuário navega.

Arquivos afetados: navbar/navbar.jsx, navbar.module.css, handleBack/handleBack.jsx.

Ação: Transformar a NavBar usando o componente Drawer ou construindo uma Sidebar retrátil nativa com Flex e transition do Chakra. Deletar os .module.css relativos.

## Fase 5: Migração das Features (Telas de Negócio)
Agora que os componentes da Fase 3 estão prontos e em Chakra, as telas apenas "encaixam" as peças.

Pastas afetadas: src/features/ (activities, economic, fields, register) e src/home/.

Ação: Substituir as divs com classes CSS (home.module.css, etc.) por layouts com Stack, VStack, HStack e Grid do Chakra. Cada tela refatorada tem seu .module.css deletado imediatamente.

## Fase 6: O Épico do Login (Squamata-Login)
Separar o Login é crucial porque envolve mudança de regra de negócio, não apenas de visual.

Pastas afetadas: src/features/login/.

Ação: Refatorar a interface para o Chakra UI e acoplar a nova lógica de Single Sign-On (Google Auth, JWT) para conversar com o microsserviço Squamata.

## Fase 7: Faxina Final e QA (Quality Assurance)
Garantir que nenhum lixo ficou para trás.

Arquivos afetados: Toda a árvore.

Ação: * Busca global no VS Code por import "*.css".

Deletar o index.css de vez.

Rodar o eslint para garantir imports limpos.

Rodar npm run build (Vite) para ter certeza que a compilação não quebra por falta de algum arquivo apagado.