import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTodos } from "../store";

export default function NewTodo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();
  const addTodo = useTodos((state) => state.addTodo);

  const handleAddTodo = () => {
    addTodo(ref.current.value);
    onClose();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add new todo
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new todo</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Type her"
              ref={ref}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              autoFocus></Input>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleAddTodo}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
