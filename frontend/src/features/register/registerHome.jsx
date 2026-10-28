/*
    Type: Page
    Name: registerHome
    Description:
      Página registerHome responsavel para mostrar a lista dos menus envolvendo a  gestão de pessoas.
    Author: Matheus Rodrigues
    Last Edit: 18/08/2026
*/

import { Table, Box, Button, Heading, HStack, VStack, Flex } from "@chakra-ui/react";
import HeadingPage from "../../components/headingPage";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

export default function RegisterHome() {

  return (
    <VStack gap={4} align="stretch">

      <HeadingPage content={"Registros"} />

      <Box>
        <Flex direction={{ base: "column" }} gap={2}>
          <Link to="/PeopleManagement">
            <HStack gap={2}>
              <FaCircle color="brand.secondary" size={8} />
              <Box>Gestão de pessoas</Box>
            </HStack>
          </Link>
          <Link to="/SignUp">
            <HStack gap={2}>
              <FaCircle color="brand.primary" size={8} />
              <Box>Cadastro de usuários do sistema</Box>
            </HStack>
          </Link>
        </Flex>
      </Box>

    </VStack>
  );
}
