Planejamento de refatoração - Frontend

Fase 1: Setup e Limpeza Inicial
Exatamente como planejamos, focada na raiz do projeto.

Arquivos afetados: package.json, package-lock.json.

Ação: Desinstalar @mui/material, instalar @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion.

Fase 2: Fundação e Tema Global
Substituir a base do CSS pelo ChakraProvider.

Arquivos afetados: main.jsx, App.jsx, index.css, App.css.

Ação: * Criar o theme.js (ou .ts) mapeando as variáveis do .env.

Envelopar o main.jsx no <ChakraProvider>.

Refatorar o <main> e <header> do App.jsx para componentes Flex e Box.

Exclusão imediata: Deletar App.css e limpar a maior parte do index.css (deixando apenas reset básico, se necessário).

Fase 3: Refatoração da Camada de Componentes Base (O Grande Gargalo)
Aqui é onde o plano precisou mudar. Não podemos refatorar telas sem antes refatorar as peças de LEGO que as compõem. O Chakra UI muda a forma como lidamos com modais e inputs.

Pastas afetadas: Todo o diretório src/components/.

Ações:

Cards (/cards): Migrar cardActivity, cardActivitySelect, cardList, cardUser usando o componente Card e Box do Chakra. Deletar seus .module.css.

Inputs e Feedbacks: Migrar formTextArea e o loading/page.jsx (usando o Spinner nativo do Chakra).

Modais (/dialog): Refatorar o dialogAddActivity. O Chakra possui o componente Modal nativo junto com o hook useDisclosure, que vai simplificar muito a lógica de abrir/fechar que você tem hoje.

Tabelas e Listas: Migrar list e table/headerFilter. O Chakra tem componentes prontos de Table, Thead, Tr, etc.

Fase 4: Navegação e Layout Estrutural
A espinha dorsal por onde o usuário navega.

Arquivos afetados: navbar/navbar.jsx, navbar.module.css, handleBack/handleBack.jsx.

Ação: Transformar a NavBar usando o componente Drawer ou construindo uma Sidebar retrátil nativa com Flex e transition do Chakra. Deletar os .module.css relativos.

Fase 5: Migração das Features (Telas de Negócio)
Agora que os componentes da Fase 3 estão prontos e em Chakra, as telas apenas "encaixam" as peças.

Pastas afetadas: src/features/ (activities, economic, fields, register) e src/home/.

Ação: Substituir as divs com classes CSS (home.module.css, etc.) por layouts com Stack, VStack, HStack e Grid do Chakra. Cada tela refatorada tem seu .module.css deletado imediatamente.

Fase 6: O Épico do Login (Squamata-Login)
Separar o Login é crucial porque envolve mudança de regra de negócio, não apenas de visual.

Pastas afetadas: src/features/login/.

Ação: Refatorar a interface para o Chakra UI e acoplar a nova lógica de Single Sign-On (Google Auth, JWT) para conversar com o microsserviço Squamata.

Fase 7: Faxina Final e QA (Quality Assurance)
Garantir que nenhum lixo ficou para trás.

Arquivos afetados: Toda a árvore.

Ação: * Busca global no VS Code por import "*.css".

Deletar o index.css de vez.

Rodar o eslint para garantir imports limpos.

Rodar npm run build (Vite) para ter certeza que a compilação não quebra por falta de algum arquivo apagado.