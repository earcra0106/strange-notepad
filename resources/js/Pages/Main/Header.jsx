import React from "react";
import {
    Box,
    Flex,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useHomeContext } from "./Contexts/HomeContext";

const Header = () => {
    const homeContext = useHomeContext();
    const showingNotepad = homeContext.getShowingNotepad();

    const modifierPrompt = showingNotepad
        ? showingNotepad.modifier_prompt
        : null;
    const changePrompt = showingNotepad ? showingNotepad.change_prompt : null;

    return (
        <>
            <Box p={4} h="100%">
                <Flex h="100%" justify="space-between">
                    {showingNotepad ? (
                        <>
                            <Flex direction={"column"}>
                                <Box fontSize="md">
                                    {modifierPrompt?.name} {changePrompt?.name}
                                </Box>
                                <Box
                                    textAlign={"left"}
                                    fontSize="xl"
                                    fontWeight="bold"
                                >
                                    {showingNotepad.name}
                                </Box>
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
                                        <MenuItem>ジュモン</MenuItem>
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
                                        <MenuItem>ページを保存</MenuItem>
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
                                >
                                    ジュモン
                                </Button>
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
                                    minW="120px"
                                    fontSize="lg"
                                    colorScheme="blue"
                                    shadow={"md"}
                                >
                                    ページを保存
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
