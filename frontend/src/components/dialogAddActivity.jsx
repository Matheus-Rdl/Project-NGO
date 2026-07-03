import {
  Dialog,
  Button,
  Checkbox,
  Box,
  HStack,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { selectOptions } from "../utils/userSelectOptions";
import Select from "react-select";
import CardList from "./cards/cardList";
import CardActivitySelect from "./cards/cardActivitySelect";
import activitiesServices from "../services/activitiesServices";
import usersServices from "../services/usersServices";

export default function DialogAddActivity({ open, onClose, userData, onSaved }) {
  const { getActivitiesByType, activityTypeList, refetchActivities } =
    activitiesServices();
  const { getActivities } = activitiesServices();
  const { updateUserActivities } = usersServices();

  useEffect(() => {
    getActivities();
  }, []);

  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    if (userData?.user_activities) {
      setSelectedActivities(userData.user_activities);
    }
  }, [userData]);

  const [listActive, setListActive] = useState(1);

  const activity_type = {
    1: "1 - Inglês",
    2: "2 - Espanhol",
    3: "3 - Fotografia",
    4: "4 - Genérico",
  };

  useEffect(() => {
    if (refetchActivities) {
      getActivitiesByType(["1", "2", "3", "4"]);
    }
  }, [refetchActivities]);

  const handleToggle = (activityMat) => {
    setSelectedActivities((prev) =>
      prev.includes(activityMat)
        ? prev.filter((mat) => mat !== activityMat)
        : [...prev, activityMat]
    );
  };

  const handleSave = async () => {
    await updateUserActivities(userData._id, selectedActivities);
    if (typeof onSaved === "function") {
      onSaved(selectedActivities);
    }
    onClose();
  };

  const filteredActivities = activityTypeList.filter(
    (activity) => activity.activity_type === String(listActive)
  );

  return (
    <Dialog.Root open={open} onClose={onClose} size="lg">
      <Dialog.Content>
        <Dialog.Header>
          <Heading size="md">Adicionar atividade</Heading>
        </Dialog.Header>
        <Dialog.CloseTrigger />

        <Dialog.Body pb={6}>
          <HStack spacing={2} mb={4} wrap="wrap">
            {Object.entries(activity_type).map(([key, label]) => (
              <CardList
                key={key}
                text={label.slice(3)}
                active={listActive === Number(key)}
                onClick={() => setListActive(Number(key))}
              />
            ))}
          </HStack>

          <VStack align="stretch" spacing={2} maxH="400px" overflowY="auto">
            {filteredActivities.map((activity) => (
              <HStack
                key={activity._id}
                spacing={3}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
              >
                <Checkbox
                  checked={selectedActivities.includes(activity.activity_mat)}
                  onCheckedChange={() => handleToggle(activity.activity_mat)}
                  colorScheme="blue"
                />
                <Box flex="1">
                  <CardActivitySelect data={activity} />
                </Box>
              </HStack>
            ))}
          </VStack>
        </Dialog.Body>

        <Dialog.Footer>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Salvar
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}