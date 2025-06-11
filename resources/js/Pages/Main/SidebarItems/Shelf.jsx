import React from "react";
import { useHomeContext } from "../Contexts/HomeContext";
import { Box, Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Shelf = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

    // 新着順で取得する
    const notepads = homeContext.getAllNotepads().toReversed();

    return (
        <Flex p={4} direction="column" h="100%">
            <Button
                leftIcon={<AddIcon />}
                variant={"roundedPurple"}
                fontSize="lg"
                mb={4}
                onClick={homeContext.handleNewNotepadClick}
            >
                新規メモ帳
            </Button>
            <Box
                flex="1"
                overflowY="auto"
                p={2}
                bg="gray.700"
                borderRadius="md"
                css={{
                    "&::-webkit-scrollbar": {
                        height: "8px",
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#4A5568",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#718096",
                    },
                }}
            >
                {notepads.map((notepad, i) => (
                    <Button
                        onClick={() => {
                            homeContext.handleShelfNotepadClick(notepad.id);
                        }}
                        w="80%"
                        key={i}
                        p={2}
                        mb={2}
                        bg="gray.500"
                        borderRadius="sm"
                        color={
                            homeContext.isNotepadHasChangedPage(notepad.id)
                                ? "blue.100"
                                : "white"
                        }
                        _hover={{ bg: "gray.600" }}
                        _active={{ bg: "gray.700" }}
                        transition="all 0.2s"
                        justifyContent="flex-start"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        transform={() => {
                            if (showingPage) {
                                return showingPage.notepad_id === notepad.id
                                    ? "translateX(20px)"
                                    : "none";
                            }
                            return "none";
                        }}
                        boxShadow={
                            homeContext.isNotepadHasChangedPage(notepad.id)
                                ? "0 0 10px 2px white"
                                : "none"
                        }
                    >
                        {notepad.name}
                    </Button>
                ))}
            </Box>
        </Flex>
    );
};

export default Shelf;
