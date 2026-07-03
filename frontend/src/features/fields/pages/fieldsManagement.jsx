/*
    Type: Page
    Name: FieldsManagement
    Description:
      Página FieldsManagement, responsável por organizar os campos das coleções.
    Author: Matheus Rodrigues
    Last Edit: 21/04/2026
*/

import { Link } from "react-router-dom";
import HandleBack from "../../../components/handleBack";
import pagesServices from "../../../services/pagesServices"
import { useEffect } from "react";
import { Heading, HStack, Text, VStack } from "@chakra-ui/react";

export default function FieldsManagement() {
  //Service que pega os dados da coleção -> "pages"
  const { getPages, refetchPages, pagesList } = pagesServices();

  useEffect(() => {
    if (refetchPages) {
      getPages();
    }
  }, [refetchPages]);

  return (
    <VStack gap={4} align="stretch">
      <HandleBack />
      <Heading size="lg" color="gray.600">Coleções dos campos</Heading>

      {pagesList.map((page) => (
        <HStack key={page._id} gap={2} overflowX="auto" overflowY="hidden">

          <Link
            to={"/FieldsManagementMenu"}
            state={{ page: page.page, name: page.name , collection: page.collection}}
          >
            <Text
              fontSize="sm"
              color="brand.primary"
              cursor="pointer"
              _hover={{ transform: "scale(1.1)" }}
              transition="0.2s"
            >
              &bull; {page.name}
            </Text>
          </Link>

        </HStack>
      ))}
    </VStack>
  );
}