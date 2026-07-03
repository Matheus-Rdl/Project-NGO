import { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import fieldsServices from "../../../../../services/fieldsServices";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function DialogMenu({ field, fieldList, refreshFields, onClose }) {

  const { updateFieldsOrder } = fieldsServices();

  const [fieldsOrdered, setFieldsOrdered] = useState([]);

  useEffect(() => {
    if (!field) return;
    const ordered = fieldList
      .filter(item => item.menuId === field.menuId)
      .sort((a, b) => a.order - b.order);
    setFieldsOrdered(ordered);
  }, [field, fieldList]);

  const moveUp = (index) => {
    if (index === 0) return;
    setFieldsOrdered(prev => {
      const list = [...prev];
      [list[index - 1], list[index]] = [
        list[index],
        list[index - 1]
      ];
      return list;
    });
  }

  const moveDown = (index) => {
    if (index === fieldsOrdered.length - 1) return;
    setFieldsOrdered(prev => {
      const list = [...prev];
      [list[index], list[index + 1]] = [
        list[index + 1],
        list[index]
      ];
      return list;
    });
  }

  const saveOrder = async () => {
    const payload = fieldsOrdered.map((field, index) => ({
      _id: field._id,
      order: index + 1
    }));

    const result = await updateFieldsOrder(payload);
    if (result?.success) {
      refreshFields();
      onClose();
    }
  }

  return (
    <Box w="70%" py={4} px="7.5%" mx="7.5%">
      <Box textAlign="center">
        <Heading size="md">Alteração de posição</Heading>
        <Text color="brand.primary" mt={1}>{field.title}</Text>
      </Box>

      <VStack mt={4} h="50vh" w="100%" overflow="auto" overflowX="hidden" gap={0}>
        {fieldsOrdered.map((item, index) => {
          const isActive = item._id === field._id;
          const isFirst = index === 0;
          const isLast = index === fieldsOrdered.length - 1;

          return (
            <Flex
              key={item._id}
              justify="space-between"
              align="center"
              border="2px solid"
              borderColor="gray.500"
              py={2}
              px={4}
              mx={4}
              mt={2}
              w="100%"
              transform={isActive ? "scale(1.05)" : "none"}
              bg={isActive ? "blackAlpha.100" : "transparent"}
              transition="transform 0.2s"
            >
              <Text fontSize="sm">{item.title}</Text>

              <Flex
                direction="column"
                gap="2px"
                fontSize="1.5rem"
                display={isActive ? "flex" : "none"}
              >
                <FaArrowAltCircleUp
                  onClick={!isFirst ? () => moveUp(index) : undefined}
                  style={{
                    opacity: isFirst ? 0.3 : 1,
                    cursor: isFirst ? "default" : "pointer"
                  }}
                />

                <FaArrowAltCircleDown
                  onClick={!isLast ? () => moveDown(index) : undefined}
                  style={{
                    opacity: isLast ? 0.3 : 1,
                    cursor: isLast ? "default" : "pointer"
                  }}
                />
              </Flex>
            </Flex>
          );
        })}
      </VStack>

      <Button
        onClick={saveOrder}
        bg="brand.primary"
        color="white"
        w="70%"
        mx="15%"
        mt={2}
        borderRadius="md"
      >
        Salvar
      </Button>
    </Box>
  )
}