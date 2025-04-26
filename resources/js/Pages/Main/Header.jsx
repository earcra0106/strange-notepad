import React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
} from "@chakra-ui/react";
import { HamburgerIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useHomeContext } from "./Contexts/HomeContext";

const Header = () => {
    const homeContext = useHomeContext();
    const showingNotepad = homeContext.getShowingNotepad();
    const showingPage = homeContext.getShowingPage();

    const [isEditingNotepadName, setIsEditingNotepadName] = useState(false);
    const [notepadName, setNotepadName] = useState("");
    const [expectedModifierPrompt, setExpectedModifierPrompt] = useState("");
    const [expectedChangePrompt, setExpectedChangePrompt] = useState("");

    useEffect(() => {
        if (showingNotepad) {
            setIsEditingNotepadName(false);
            setNotepadName(showingNotepad.name);
            setExpectedModifierPrompt(showingNotepad.expected_modifier_prompt);
            setExpectedChangePrompt(showingNotepad.expected_change_prompt);
        }
    }, [showingNotepad]);

    const handleInputChange = (e) => {
        setNotepadName(e.target.value);
    };

    return (
        <>
            <Box p={4} h="100%">
                <Flex h="100%" justify="space-between">
                    {showingNotepad ? (
                        <>
                            <Flex direction={"column"}>
                                <Box fontSize="md">
                                    {expectedModifierPrompt
                                        ? expectedModifierPrompt.name
                                        : "ある特徴をもつ"}{" "}
                                    {expectedChangePrompt
                                        ? expectedChangePrompt.name
                                        : "何かが起こる"}
                                </Box>
                                {isEditingNotepadName ? (
                                    <>
                                        <Flex>
                                            <Input
                                                bg="white"
                                                maxH="32px"
                                                value={notepadName}
                                                onChange={handleInputChange}
                                                placeholder="メモ帳の名前を入力"
                                            />
                                            <IconButton
                                                aria-label="Save"
                                                icon={<CheckIcon />}
                                                bg="transparent"
                                                border="none"
                                                ml={1}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    homeContext.handleUpdateNotepadClick(
                                                        showingNotepad.id,
                                                        notepadName
                                                    );
                                                    setIsEditingNotepadName(
                                                        false
                                                    );
                                                }}
                                                isDisabled={notepadName === ""}
                                            />
                                        </Flex>
                                    </>
                                ) : (
                                    <>
                                        <Flex>
                                            <Box
                                                textAlign={"left"}
                                                fontSize="xl"
                                                fontWeight="bold"
                                            >
                                                {notepadName}
                                            </Box>
                                            <IconButton
                                                aria-label="Edit"
                                                icon={<EditIcon />}
                                                bg="transparent"
                                                border="none"
                                                ml={1}
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setIsEditingNotepadName(
                                                        true
                                                    )
                                                }
                                            />
                                        </Flex>
                                    </>
                                )}
                            </Flex>
                            {/* SP表示 */}
                            <Box display={{ base: "block", md: "none" }}>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label="Options"
                                        icon={<HamburgerIcon />}
                                    />
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                homeContext.handleDeleteNotepadClick(
                                                    showingNotepad.id
                                                );
                                            }}
                                            color="red.500"
                                        >
                                            メモ帳を削除
                                        </MenuItem>
                                        <MenuItem
                                            isDisabled={
                                                homeContext.getCurrentContentText() ===
                                                showingPage.written_content
                                            }
                                            onClick={
                                                homeContext.handleSaveShowingPageClick
                                            }
                                        >
                                            ページを保存
                                        </MenuItem>
                                        <MenuItem
                                            isDisabled={
                                                homeContext.getCurrentContentText() ===
                                                    "" ||
                                                showingPage.is_changed_by_prompt
                                            }
                                            onClick={
                                                homeContext.handleSaveAndChangeWithPromptClick
                                            }
                                        >
                                            魔法で変換
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                            {/* PC表示 */}
                            <Box display={{ base: "none", md: "block" }}>
                                <Button
                                    h="100%"
                                    mr={2}
                                    minW="120px"
                                    fontSize="lg"
                                    shadow={"md"}
                                    colorScheme="red"
                                    onClick={() => {
                                        homeContext.handleDeleteNotepadClick(
                                            showingNotepad.id
                                        );
                                    }}
                                >
                                    メモ帳を削除
                                </Button>
                                <Button
                                    h="100%"
                                    mr={2}
                                    minW="120px"
                                    fontSize="lg"
                                    shadow={"md"}
                                    onClick={
                                        homeContext.handleSaveShowingPageClick
                                    }
                                    isDisabled={
                                        homeContext.getCurrentContentText() ===
                                        showingPage.written_content
                                    }
                                >
                                    ページを保存
                                </Button>
                                <Button
                                    h="100%"
                                    minW="120px"
                                    fontSize="lg"
                                    colorScheme="blue"
                                    shadow={"md"}
                                    isDisabled={
                                        homeContext.getCurrentContentText() ===
                                            "" ||
                                        showingPage.is_changed_by_prompt
                                    }
                                    onClick={
                                        homeContext.handleSaveAndChangeWithPromptClick
                                    }
                                >
                                    魔法で変換
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Box />
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default Header;
