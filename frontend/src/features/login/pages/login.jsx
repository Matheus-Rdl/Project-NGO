/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Login
    Date: 03/03/2026
*/

import { useState } from "react";
import userSystemServices from "../../../services/usersSystemServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { Box, Button, Card, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";

export default function Login() {

  const { login: loginService } = userSystemServices();
  const { login } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const response = await loginService({
      user_system_name: name,
      user_system_password: password
    });

    if (response.success) {

      // Atualiza contexto global
      login(response.body.user);

      alert("Login realizado");

      navigate("/");

    } else {
      alert(response.body);
    }
  }

  return (
    <Flex w="100%" h="100vh" align="center" justify="center" bg="gray.100">

      <Card.Root
        maxW="420px"
        w="90%"
        bg="brand.primary"
        borderRadius="lg"
        borderBottomRightRadius="lg"
        borderTopRightRadius="lg"
      >
        <Card.Body p={0}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            px={10}
            bg="brand.secondary"
            borderRadius="lg"
            w="100%"
          >
            <Heading size="2xl" mb={12} color="brand.primary">Login</Heading>

            <VStack as="form" onSubmit={handleLogin} gap={4} w="100%">

              <Box w="100%">
                <Text as="label" fontSize="sm" fontWeight="medium" mb={1} display="block">Usuário</Text>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bg="white"
                  required
                />
              </Box>

              <Box w="100%">
                <Text as="label" fontSize="sm" fontWeight="medium" mb={1} display="block">Senha</Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="white"
                  required
                />
              </Box>

              <Button
                type="submit"
                w="100%"
                size="lg"
                mt={6}
                bg="brand.primary"
                color="white"
                _hover={{ opacity: 0.9 }}
              >
                Entrar
              </Button>

            </VStack>
          </Flex>
        </Card.Body>
      </Card.Root>

    </Flex>
  );
}