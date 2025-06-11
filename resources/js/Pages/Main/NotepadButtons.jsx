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
import {
    MdLightbulbOutline,
    MdOutlineSave,
    MdAutoFixHigh,
    MdCheck,
    MdMenu,
    MdDeleteOutline,
} from "react-icons/md";
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
                        icon={<MdMenu />}
                    />
                    <MenuList
                        color="white"
                        bg="gray.800"
                        borderColor="gray.600"
                    >
                        <MenuItem
                            icon={
                                homeContext.getIsAllPromptsExpected(
                                    showingNotepad.id
                                ) ? (
                                    <MdCheck />
                                ) : (
                                    <MdLightbulbOutline />
                                )
                            }
                            color={
                                homeContext.getIsAllPromptsExpected(
                                    showingNotepad.id
                                )
                                    ? "green.400"
                                    : "purple.200"
                            }
                            bg="gray.800"
                            onClick={
                                homeContext.getIsAllPromptsExpected(
                                    showingNotepad.id
                                )
                                    ? homeContext.onOpenNotepadDetectedModal
                                    : homeContext.onOpenDetectPromptModal
                            }
                        >
                            ジュモンを推理
                        </MenuItem>
                        <MenuItem
                            icon={<MdOutlineSave />}
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
                            icon={<MdAutoFixHigh />}
                            color="purple.200"
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
                            icon={<MdDeleteOutline />}
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
                        icon={<MdDeleteOutline />}
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
                <Tooltip label="ページを保存" hasArrow>
                    <IconButton
                        icon={
                            homeContext.getCurrentContentText() ===
                            showingPage.written_content ? (
                                <MdCheck />
                            ) : (
                                <MdOutlineSave />
                            )
                        }
                        variant="roundedWhite"
                        ml={4}
                        onClick={homeContext.handleSaveShowingPageClick}
                        isDisabled={
                            homeContext.getCurrentContentText() ===
                            showingPage.written_content
                        }
                    />
                </Tooltip>
                <Tooltip label="ジュモンを推理" hasArrow>
                    <Box position="relative" display="inline-block" ml={4}>
                        <IconButton
                            icon={<MdLightbulbOutline />}
                            variant="roundedWhite"
                            color="purple"
                            onClick={
                                homeContext.getIsAllPromptsExpected(
                                    showingNotepad.id
                                )
                                    ? homeContext.onOpenNotepadDetectedModal
                                    : homeContext.onOpenDetectPromptModal
                            }
                        />
                    </Box>
                </Tooltip>
                <Tooltip label="魔法で変換" hasArrow>
                    <IconButton
                        icon={<MdAutoFixHigh />}
                        variant="roundedMagic"
                        fontSize="3xl"
                        h={20}
                        minW={20}
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
