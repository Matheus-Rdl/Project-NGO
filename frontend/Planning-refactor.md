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

    [ ] Refatorar formTextArea para usar o componente Textarea do Chakra UI.

    [ ] Refatorar src/components/loading/page.jsx utilizando o componente Spinner nativo do Chakra.

    [ ] Deletar os ficheiros .module.css destes componentes após a migração.

* Passo 3.3: Refatoração dos Modais (src/components/dialog/)

    [ ] Refatorar dialogAddActivity para utilizar o componente Modal nativo do Chakra UI.

    [ ] Implementar o hook useDisclosure do Chakra para gerenciar a lógica de abrir/fechar (simplificando o estado local existente).

    [ ] Deletar o dialogAddActivity.module.css.

* Passo 3.4: Refatoração de Tabelas e Listas (src/components/table/ e src/components/list/)

    [ ] Migrar list.jsx e headerFilter.jsx para a estrutura de tabelas do Chakra (Table, Thead, Tbody, Tr, Th, Td).

    [ ] Aplicar as novas propriedades de estilo para garantir que o comportamento responsivo funcione como esperado.

    [ ] Deletar os arquivos .module.css destas pastas.

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