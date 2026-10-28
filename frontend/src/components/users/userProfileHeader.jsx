
/*
  File: userProfileHeader.jsx
  Description: This file contains the user profile header component for the frontend application. It provides a header section for the user profile page, displaying relevant information and actions related to the user.
  Created by: Matheus Rodrigues
  Created on: 2024-10-28
  Updated on: 2024-10-28 by: Matheus Rodrigues
*/

//IMPORTS
import { Avatar, Box, Text, Flex, HStack, Heading, Badge } from "@chakra-ui/react"; // react chakra components

//Components
import UserNavigation from "./userNavigation";

//Utils
import { formatDate, formatName } from "../../utils/string/formatters";

export default function UserProfileHeader({ userId, userData, activeTab, showNavigation = true }) {

  // Extract user information from userData
  const mat = userData?.user_mat;
  const name = userData?.user_name;
  const photo = userData?.user_photo;

  return (
    <Box bg={"white"} borderWidth={"1px"} borderColor={"gray.200"} borderRadius={10} overflow={"hidden"} width={"100%"}>
      <Flex px={{ base: 3, md: 4 }} py={4} gap={4} justify="flex-start" align={{ base: "flex-start", lg: "center" }} direction={{ base: "column", lg: "row" }}>
        <HStack gap={4} minW={0}>
          {/* Photo */}
          <Avatar.Root w={{ base: "64px", md: "76px" }} h={{ base: "64px", md: "76px" }} flexShrink={0}>
            <Avatar.Fallback name={name} />
            {photo && <Avatar.Image src={photo} alt={name} />}
          </Avatar.Root>

          <Box minW={0}>
            {/* Name */}
            <Heading fontSize="xl" lineHeight="1.2" color="brand.primary" fontWeight="700">
              {formatName(name)}
            </Heading>

            {/* Mat */}
            <Text mt="5px" fontSize="14px">
              Matrícula: {mat}
            </Text>

            {/* Situation 
            <Badge
              px="9px" py="4px" borderRadius="999px" fontSize="10px"
            >
              Ativo
            </Badge>
            */}

          </Box>
        </HStack>
      </Flex>

      {/* ABAS */}
      {showNavigation && <UserNavigation activeTab={activeTab} userId={userId} userData={userData} />}
    </Box>
  )
}