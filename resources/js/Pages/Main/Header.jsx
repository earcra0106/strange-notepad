import React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { useHomeContext } from "./Contexts/HomeContext";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import NotepadButtons from "./NotepadButtons.jsx";

const Header = () => {
    const homeContext = useHomeContext();
    const showingNotepad = homeContext.getShowingNotepad();
    const showingPage = homeContext.getShowingPage();

    const [isEditingNotepadName, setIsEditingNotepadName] = useState(false);
    const [notepadName, setNotepadName] = useState("");
    const [
        expectedModifierPromptOfShowingNotepad,
        setExpectedModifierPromptOfShowingNotepad,
    ] = useState("");
    const [
        expectedChangePromptOfShowingNotepad,
        setExpectedChangePromptOfShowingNotepad,
    ] = useState("");
    const [isModifierPromptExplained, setIsModifierPromptExplained] =
        useState(false);
    const [isChangePromptExplained, setIsChangePromptExplained] =
        useState(false);

    useEffect(() => {
        if (showingNotepad) {
            setIsEditingNotepadName(false);
            setNotepadName(showingNotepad.name);
            setExpectedModifierPromptOfShowingNotepad(
                homeContext.getExpectedModifierPromptByNotepadId(
                    showingNotepad.id
                )
            );
            setExpectedChangePromptOfShowingNotepad(
                homeContext.getExpectedChangePromptByNotepadId(
                    showingNotepad.id
                )
            );
        }
    }, [showingNotepad]);

    useEffect(() => {
        if (showingNotepad) {
            setIsModifierPromptExplained(
                expectedModifierPromptOfShowingNotepad.id ===
                    homeContext.getModifierPromptByNotepadId(showingNotepad.id)
                        .id
            );
            setIsChangePromptExplained(
                expectedChangePromptOfShowingNotepad.id ===
                    homeContext.getChangePromptByNotepadId(showingNotepad.id).id
            );
        }
    }, [
        expectedModifierPromptOfShowingNotepad,
        expectedChangePromptOfShowingNotepad,
    ]);

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
                                            isModifierPromptExplained
                                                ? "green.400"
                                                : ""
                                        }
                                    >
                                        {expectedModifierPromptOfShowingNotepad &&
                                            expectedModifierPromptOfShowingNotepad.name}
                                    </Text>{" "}
                                    <Text
                                        as={"span"}
                                        color={
                                            isChangePromptExplained
                                                ? "green.400"
                                                : ""
                                        }
                                    >
                                        {expectedChangePromptOfShowingNotepad &&
                                            expectedChangePromptOfShowingNotepad.name}
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
