import React, { useRef } from "react";
import { usePage } from "@inertiajs/react";
import { useHomeContext } from "../Contexts/HomeContext";
import { Box, Flex, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import "./shelf-item.css";

const Shelf = () => {
    const { auth } = usePage().props;

    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

    const requestPageChange = (notepadId) => {
        if (
            showingPage &&
            homeContext.getCurrentContentText() !== showingPage.written_content
        ) {
            homeContext.setPageChangeTargetNotepadId(notepadId);
            homeContext.setPageChangeTargetPageNumber(1);
            homeContext.onOpenConfirmPageChangeWhenUnsavedModal();
        } else {
            homeContext.handlePageChange(notepadId, 1);
        }
    };

    // 新着順で取得する
    const notepads = homeContext.getAllNotepads().toReversed();

    const prevIds = useRef(notepads.map((n) => n.id));

    const newId = notepads.find(
        (idObj) => !prevIds.current.includes(idObj.id)
    )?.id;

    prevIds.current = notepads.map((n) => n.id);

    return (
        <Flex p={4} direction="column" h="100%">
            <Button
                leftIcon={<MdAdd />}
                variant={"roundedPurple"}
                fontSize="lg"
                mb={4}
                onClick={homeContext.handleNewNotepadClick}
                isDisabled={!auth.user}
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
                {notepads.map((notepad) => {
                    const isActive =
                        showingPage && showingPage.notepad_id === notepad.id;
                    const fadeClass =
                        notepad.id === newId ? "shelf-fadein" : "";
                    return (
                        <Box
                            className={fadeClass}
                            position="relative"
                            display="inline-block"
                            key={notepad.id}
                            w="100%"
                            transform={isActive ? "translateX(20px)" : "none"}
                            transition="transform 0.2s"
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
                                onClick={() => {
                                    requestPageChange(notepad.id);
                                }}
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
