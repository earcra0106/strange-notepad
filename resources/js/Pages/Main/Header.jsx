import React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { useHomeContext } from "./Contexts/HomeContext";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import NotepadButtons from "./NotepadButtons.jsx";

const Header = () => {
    const homeContext = useHomeContext();
    const showingNotepad = homeContext.getShowingNotepad();

    const [isEditingNotepadName, setIsEditingNotepadName] = useState(false);
    const [notepadName, setNotepadName] = useState("");

    useEffect(() => {
        if (showingNotepad) {
            setIsEditingNotepadName(false);
            setNotepadName(showingNotepad.name);
        }
    }, [showingNotepad]);

    const handleInputChange = (e) => {
        setNotepadName(e.target.value);
    };

    return (
        <>
            <Box p={4} h="100%">
                {showingNotepad ? (
                    <>
                        <Flex>
                            <Flex direction={"column"} p={4}>
                                <Box fontSize="md">
                                    <Text
                                        as={"span"}
                                        color={
                                            homeContext.getIsModifierPromptExpected(
                                                showingNotepad.id
                                            )
                                                ? "green.400"
                                                : ""
                                        }
                                    >
                                        {
                                            homeContext.getExpectedModifierPromptByNotepadId(
                                                showingNotepad.id
                                            ).name
                                        }
                                    </Text>{" "}
                                    <Text
                                        as={"span"}
                                        color={
                                            homeContext.getIsChangePromptExpected(
                                                showingNotepad.id
                                            )
                                                ? "green.400"
                                                : ""
                                        }
                                    >
                                        {
                                            homeContext.getExpectedChangePromptByNotepadId(
                                                showingNotepad.id
                                            ).name
                                        }
                                    </Text>
                                </Box>
                                {isEditingNotepadName ? (
                                    <Flex>
                                        <Input
                                            bg="white"
                                            color="black"
                                            maxH="32px"
                                            maxLength={30}
                                            value={notepadName}
                                            onChange={handleInputChange}
                                            placeholder="メモ帳の名前を入力"
                                        />
                                        <IconButton
                                            icon={<CheckIcon />}
                                            borderRadius="full"
                                            bg="transparent"
                                            color="white"
                                            border="none"
                                            ml={1}
                                            variant="outline"
                                            size="sm"
                                            _hover={{ bg: "gray.600" }}
                                            _disabled={{
                                                color: "gray.400",
                                                cursor: "not-allowed",
                                                _hover: {
                                                    bg: "transparent",
                                                },
                                            }}
                                            onClick={() => {
                                                homeContext.handleUpdateNotepadClick(
                                                    showingNotepad.id,
                                                    notepadName
                                                );
                                                setIsEditingNotepadName(false);
                                            }}
                                            isDisabled={notepadName === ""}
                                        />
                                    </Flex>
                                ) : (
                                    <Flex>
                                        <Box
                                            variant="roundedMagic"
                                            textAlign={"left"}
                                            fontSize="xl"
                                            fontWeight="bold"
                                        >
                                            {notepadName}
                                        </Box>
                                        <IconButton
                                            icon={<EditIcon />}
                                            borderRadius="full"
                                            color="white"
                                            bg="transparent"
                                            border="none"
                                            ml={1}
                                            variant="outline"
                                            size="sm"
                                            _hover={{ bg: "gray.600" }}
                                            onClick={() =>
                                                setIsEditingNotepadName(true)
                                            }
                                        />
                                    </Flex>
                                )}
                            </Flex>
                            <Box flex={1}>
                                <Flex justifyContent="flex-end" h="100%" p={4}>
                                    <NotepadButtons forMobile={true} />
                                </Flex>
                            </Box>
                        </Flex>
                    </>
                ) : (
                    <Box />
                )}
            </Box>
        </>
    );
};

export default Header;
