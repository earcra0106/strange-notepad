import React from "react";
import { useHomeContext } from "../Contexts/HomeContext";
import { Box, Flex, Button } from "@chakra-ui/react";

const Shelf = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

    return (
        <Flex p={4} direction="column" h="100%">
            <Button w="100%" mb={2} colorScheme="blue" shadow={"md"}>
                + New Notepad
            </Button>
            <Box
                flex="1"
                overflowY="auto"
                p={2}
                bg="red.200"
                borderRadius="md"
                css={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#F56565", // 柔らかい赤
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#E53E3E", // 少し濃い赤
                    },
                }}
            >
                {homeContext.getAllNotepads().map((notepad, i) => (
                    <Button
                        onClick={() => {
                            homeContext.handleShelfNotepadClick(notepad.id);
                        }}
                        w="80%"
                        key={i}
                        p={2}
                        mb={2}
                        bg="red.300"
                        borderRadius="md"
                        color="white"
                        _hover={{ shadow: "md" }}
                        _active={{ bg: "red.400" }}
                        transition="all 0.2s"
                        transform={() => {
                            if (showingPage) {
                                return showingPage.notepad_id === notepad.id
                                    ? "translateX(20px)"
                                    : "none";
                            }
                            return "none";
                        }}
                    >
                        {notepad.name}
                    </Button>
                ))}
            </Box>
        </Flex>
    );
};

export default Shelf;
