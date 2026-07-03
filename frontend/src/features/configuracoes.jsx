import { Box, Card, Flex, Heading, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PiUsersThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineViewList } from "react-icons/md";

const configCards = [
  {
    label: "Cadastro de Usuários",
    description: "Gerir utilizadores do sistema (funcionários e voluntários)",
    icon: PiUsersThree,
    to: "/SignUp",
    color: "blue.500",
  },
  {
    label: "Campos do Sistema",
    description: "Gerir coleções e campos dinâmicos",
    icon: IoSettingsOutline,
    to: "/FieldsManagement",
    color: "green.500",
  },
  {
    label: "Ordenação de Campos",
    description: "Organizar menus e ordem dos campos",
    icon: MdOutlineViewList,
    to: "/FieldsManagement",
    color: "orange.500",
  },
];

export default function Configuracoes() {
  return (
    <VStack gap={8} align="stretch">
      <Box>
        <Heading size="2xl" color="brand.primary">Configurações</Heading>
        <Text color="gray.500" mt={1}>Gerir utilizadores e campos do sistema</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        {configCards.map((card) => (
          <Link to={card.to} key={card.label} style={{ textDecoration: "none" }}>
            <Card.Root
              variant="elevated"
              _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Card.Body>
                <Flex align="center" gap={4}>
                  <Flex
                    w={12}
                    h={12}
                    borderRadius="md"
                    bg={card.color}
                    align="center"
                    justify="center"
                  >
                    <Icon as={card.icon} boxSize={6} color="white" />
                  </Flex>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">{card.label}</Text>
                    <Text color="gray.500" fontSize="sm">{card.description}</Text>
                  </Box>
                </Flex>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
