
/*
  File: userNavigation.jsx
  Description: This file contains the user navigation component for the frontend application. It provides navigation options for users to access different sections of the application involving the user.
  Created by: Matheus Rodrigues
  Created on: 2024-10-28
  Updated on: 2024-10-28 by: Matheus Rodrigues
*/

//IMPORTS
import { Flex, Button } from "@chakra-ui/react"; // react chakra components
import { useLocation, useNavigate } from "react-router-dom"; // react router dom

//Tabs for user navigation
const Tabs = [
  { label: "Visão Geral", path: "/PeopleManagementDetailed" },
  { label: "Atividades", path: null },//"/PeopleManagementActivities"},
];

export default function UserNavigation({ activeTab, userData, userId }) {
  const navigate = useNavigate(); // hook to navigate between routes
  const location = useLocation(); // hook to get the current location

  return (
    <Flex
      px={{ base: 2, md: 3 }}
      borderTop="1px solid #e7eceb"
      borderBottom="1px solid #e7eceb"
      overflowX="auto"
      bg="white"
    >
      {Tabs.map(({ label, path }) => {
        const active = activeTab === label; // check if the current tab is active

        return (
          <Button key={label} flexShrink={0} h="44px" px={4} variant="ghost" borderRadius="0" disabled={!path || !userId} title={!path ? "Em desenvolvimento" : undefined} color={active ? "brand.primary" : "gray.500"} fontSize="sm" fontWeight={active ? "bold" : "normal"} borderBottom={active ? "3px solid #0d9479" : "none"}
            // Add an onClick handler to navigate to the specified path when the button is clicked
            onClick={() => {
              if (!path || !userId || active) return;
              navigate(path, {
                state: {
                  ...location.state,
                  userId,
                  userData,
                  currentMode: "E"
                }
              });
            }}
          >
            {label}
          </Button>
        );

      })}
    </Flex>
  );
}