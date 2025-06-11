import React from "react";
import { useHomeContext } from "../Contexts/HomeContext";
import { Box, Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CheckDisplayIcon from "../CheckDisplayIcon";

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
                overflowX="hidden"
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
                {notepads.map((notepad, i) => {
                    const isActive =
                        showingPage && showingPage.notepad_id === notepad.id;
                    return (
                        <Box
                            position="relative"
                            display="inline-block"
                            key={i}
                            w="100%"
                            style={{
                                transform: isActive
                                    ? "translateX(20px)"
                                    : "none",
                                transition: "transform 0.2s",
                            }}
                        >
                            {homeContext.getIsAllPromptsExpected(
                                notepad.id
                            ) && (
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    bottom={2}
                                    width="6px"
                                    bg="green.400"
                                    borderRadius="sm"
                                    zIndex={1}
                                />
                            )}
                            <Button
                                onClick={() =>
                                    homeContext.handleShelfNotepadClick(
                                        notepad.id
                                    )
                                }
                                w="80%"
                                px={4}
                                py={2}
                                mb={2}
                                bg="gray.500"
                                borderRadius="sm"
                                color="white"
                                _hover={{ bg: "gray.600" }}
                                _active={{ bg: "gray.700" }}
                                justifyContent="flex-start"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                boxShadow={
                                    homeContext.isNotepadHasChangedPage(
                                        notepad.id
                                    )
                                        ? "0 0 10px 2px white"
                                        : "none"
                                }
                            >
                                {notepad.name}
                            </Button>
                        </Box>
                    );
                })}
            </Box>
        </Flex>
    );
};

export default Shelf;
