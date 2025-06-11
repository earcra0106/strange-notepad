import React, { useContext } from "react";
import {
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { MdLightbulbOutline, MdSave } from "react-icons/md";
import { HomeContext } from "./Contexts/HomeContext";

const NotepadButtons = ({ forMobile = false }) => {
    const homeContext = useContext(HomeContext);
    const showingNotepad = homeContext.getShowingNotepad();
    const showingPage = homeContext.getShowingPage();
    if (!showingNotepad || !showingPage) {
        return null;
    }

    if (forMobile) {
        return (
            <Box display={{ base: "block", lg: "none" }}>
                <Menu>
                    <MenuButton
                        variant="roundedWhite"
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                    />
                    <MenuList
                        color="white"
                        bg="gray.800"
                        borderColor="gray.600"
                    >
                        <MenuItem
                            color="purple.200"
                            bg="gray.800"
                            onClick={homeContext.onOpenDetectPromptModal}
                        >
                            ジュモンを推理
                        </MenuItem>
                        <MenuItem
                            color="white"
                            bg="gray.800"
                            isDisabled={
                                homeContext.getCurrentContentText() ===
                                showingPage.written_content
                            }
                            onClick={homeContext.handleSaveShowingPageClick}
                        >
                            ページを保存
                        </MenuItem>
                        <MenuItem
                            color="white"
                            bg="gray.800"
                            isDisabled={
                                homeContext.getCurrentContentText() === "" ||
                                showingPage.is_changed_by_prompt
                            }
                            onClick={
                                homeContext.handleSaveAndChangeWithPromptClick
                            }
                        >
                            魔法で変換
                        </MenuItem>
                        <MenuItem
                            color="red.200"
                            bg="gray.800"
                            onClick={() => {
                                homeContext.handleDeleteNotepadClick(
                                    showingNotepad.id
                                );
                            }}
                        >
                            メモ帳を削除
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        );
    } else {
        return (
            <Box display={{ base: "none", lg: "block" }}>
                <Tooltip label="メモ帳を削除" hasArrow>
                    <IconButton
                        icon={<DeleteIcon />}
                        variant="roundedWhite"
                        color="red"
                        ml={4}
                        onClick={() => {
                            homeContext.handleDeleteNotepadClick(
                                showingNotepad.id
                            );
                        }}
                    />
                </Tooltip>
                <Tooltip label="ジュモンを推理" hasArrow>
                    <IconButton
                        icon={<MdLightbulbOutline />}
                        variant="roundedWhite"
                        color="purple"
                        ml={4}
                        onClick={homeContext.onOpenDetectPromptModal}
                        // todo:推理が的中していたらdisableする
                    />
                </Tooltip>
                <Tooltip label="ページを保存" hasArrow>
                    <IconButton
                        icon={<MdSave />}
                        variant="roundedWhite"
                        ml={4}
                        onClick={homeContext.handleSaveShowingPageClick}
                        isDisabled={
                            homeContext.getCurrentContentText() ===
                            showingPage.written_content
                        }
                    />
                </Tooltip>
                <Tooltip label="魔法で変換" hasArrow>
                    <IconButton
                        icon={<MdSave />}
                        variant="roundedPurple"
                        ml={4}
                        mr={4}
                        isDisabled={
                            homeContext.getCurrentContentText() === "" ||
                            showingPage.is_changed_by_prompt
                        }
                        onClick={homeContext.handleSaveAndChangeWithPromptClick}
                    />
                </Tooltip>
            </Box>
        );
    }
};

export default NotepadButtons;
