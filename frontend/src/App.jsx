import { Outlet } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import NavBar from "./components/navbar/navbar";

export default function App() {
  return (
    // Box principal ocupando toda a altura da tela e definindo uma fonte limpa
    <Box minH="100vh" bg="gray.50" color="gray.800">
      
      {/* HEADER REFATORADO PARA CHAKRA UI 
          as="header" mantém a semântica HTML5.
          bg="brand.primary" injeta a cor dinâmica baseada no ambiente (.env).
          position="fixed" trava o cabeçalho no topo da página.
      */}
      <Flex as="header" bg="brand.primary" color="white" p="4" align="center" justify="space-between"
        position="fixed" top="0" left="0" right="0" h="64px" zIndex="1000" boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold" letterSpacing="wide">
          Ong Amigos da Esperança
        </Text>
        {/* Espaço reservado caso queira colocar um botão de logout ou avatar do usuário futuramente */}
        <Box></Box>
      </Flex>

      {/* CONTAINER PRINCIPAL E CONTEÚDO 
          as="main" mantém a semântica.
          pt="64px" é CRUCIAL: joga o conteúdo para baixo da altura exata do header fixo, 
          garantindo que o <Outlet /> ou a NavBar não sumam por baixo dele.
      */}
      <Flex as="main" pt="64px" minH="calc(100vh - 64px)">
        {/* Menu lateral de navegação */}
        <NavBar />

        {/* Área onde as telas de negócio (features) serão renderizadas de forma dinâmica */}
        <Box flex="1" p="6" bg="white" m="4" borderRadius="md" boxShadow="sm">
          <Outlet />
        </Box>
      </Flex>

    </Box>
  );
}