/*
    Type: Page
    Name: FieldsManagementDetailed
    Description:
      Página FieldsManagementDetailed, mostra os campos detalhados com informações sobre o mesmo.
    Author: Matheus Rodrigues
    Last Edit: 21/04/2026
*/

import HandleBack from "../../../components/handleBack";
import { Heading, VStack } from "@chakra-ui/react";

export default function FieldsManagementDetailed() {

  return (
    <VStack gap={4} align="stretch">
      <HandleBack />
      <Heading size="lg" color="gray.600">Campo - - </Heading>
    </VStack>
  );
}
