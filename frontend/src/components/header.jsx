import { Flex, Text, Box } from "@chakra-ui/react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "./ui/menu";
import { getCurrentDateFormattedBR } from "../utils/dateFunctions";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../features/login/authContext";

export default function Header() {
  const currentDate = getCurrentDateFormattedBR();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Recarrega a página para limpar o estado e forçar redirect via ProtectedRoute
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <Flex
      w="100%"
      h="70px"
      align="center"
      justify="space-between"
      px={6}
      bg="white"
      shadow="sm"
    >
      <Text fontSize="xl" fontWeight="bold" color="brand.primary">
        Ong Amigos da Esperança
      </Text>

      <Text fontSize="md" color="gray.600">
        {currentDate}
      </Text>

      <MenuRoot>
        <MenuTrigger asChild>
          <Box cursor="pointer">
            <FaUserCircle size={28} color="#4A5568" />
          </Box>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="profile" onClick={() => console.log("Configurar Perfil")}>
            Configurar Perfil
          </MenuItem>
          <MenuItem value="password" onClick={() => console.log("Mudar Senha")}>
            Mudar Senha
          </MenuItem>
          <MenuItem value="logout" onClick={handleLogout}>
            Sair do Sistema
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Flex>
  );
}
