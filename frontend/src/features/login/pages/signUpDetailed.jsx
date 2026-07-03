/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Cadastro de Usuários Detalhada
    Date: 03/03/2026
*/

import { useLocation, useNavigate } from "react-router-dom";
import CardList from "../../../components/cards/cardList";
import { useEffect, useState } from "react";
import fieldsServices from "../../../services/fieldsServices";
import FormTextArea from "../../../components/formTextArea";
import userSystemServices from "../../../services/usersSystemServices";
import {
  formatCPF,
  formatDate,
  formatName,
  formatRG,
  formatProperNoun,
} from "../../../utils/formatters";
import HandleBack from "../../../components/handleBack";
import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";

export default function SignUpDetailed() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userData, currentMode } = location.state || {};
  const { getFieldsByTitle, fieldsList } = fieldsServices();
  const { getUserSystemByMat, upsertUserSystem } = userSystemServices();
  const [formData, setFormData] = useState({});

  //Lista de menus
  const [listActive, setListActive] = useState(1 /*"Cadastrais"*/);

  const isViewMode = currentMode === "V";
  const isEditMode = currentMode === "E";
  const isAddMode = currentMode === "A";

  const listItems = {
    1: "Cadastrais",
    2: "Documentos"
  };

  useEffect(() => {
    getFieldsByTitle("users_system");
  }, []);

  useEffect(() => {
    if (userData?.user_mat) {
      getUserSystemByMat(userData.user_mat)
        .then(result => {
          if (result.success && result.body) {
            setFormData(result.body);
          }
        })
    }
  }, [userData])

  //Função para voltar a tela
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // Verifica a mudança dos inputs
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!userData?.user_mat) return;

    const payload = {
      ...formData,
      user_system_mat: userData.user_mat
    };

    const result = await upsertUserSystem(userData.user_mat, payload);

    if (result.success) {
      navigate(-1)
    }

  };

  return (
    <VStack gap={4} align="stretch">
      <HandleBack/>

      <Heading size="lg" color="gray.600">
        {isViewMode && "Cadastro de usuários do sistema - Visualizar"}
        {isAddMode && "Cadastro de usuários do sistema - Inserir"}
        {isEditMode && "Cadastro de usuários do sistema - Alterar"}
      </Heading>

      <Text color="gray.500" fontSize="md">
        {userData?.user_mat ? `${userData.user_mat} - ${formatName(userData.user_name)}` : "Novo registo"}
      </Text>

      <HStack gap={2} overflowX="auto" overflowY="hidden">
        {Object.entries(listItems).map(([key, label]) => (
          <CardList
            key={key}
            text={label}
            active={listActive === Number(key)}
            onClick={() => setListActive(Number(key))}
          />
        ))}
      </HStack>

      <Box as="form" onSubmit={handleSubmitForm} autoComplete="off" mt={6}>

        {/* DUMMY FIELDS PARA BLOQUEAR AUTOFILL */}
        <input
          type="text"
          name="fakeusernameremembered"
          style={{ display: "none" }}
          autoComplete="username"
        />
        <input
          type="password"
          name="fakepasswordremembered"
          style={{ display: "none" }}
          autoComplete="new-password"
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} alignItems="flex-start">
          {fieldsList.map((field) => (
            <Box
              key={field._id}
              display={field.folder === listActive ? "block" : "none"}
            >
              <FormTextArea
                field={field}
                addMode={isAddMode}
                viewMode={isViewMode}
                handleChange={handleChange}
                data={formData}
                currentMode={currentMode}
                nextMat={""}
                errors={""}
                dateRegister={""}
              />
            </Box>
          ))}
        </SimpleGrid>

        <HStack position="fixed" top="72px" right="12px" gap={2}>
          <Button size="xs" variant="surface" onClick={handleBack}>Cancelar</Button>
          {!isViewMode && <Button size="xs" variant="surface" type="submit">Salvar</Button>}
        </HStack>
      </Box>
    </VStack>
  );
}
