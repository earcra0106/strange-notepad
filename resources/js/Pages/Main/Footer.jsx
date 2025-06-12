import React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useHomeContext } from "./Contexts/HomeContext";
import NotepadButtons from "./NotepadButtons.jsx";
import ConfirmPageChangeWhenUnsavedModal from "./ConfirmPageChangeWhenUnsavedModal";

const Footer = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);

    const requestPageChange = (notepadId, pageNumber) => {
        if (
            homeContext.getCurrentContentText() !==
                showingPage.written_content &&
            !showingPage.is_changed_by_prompt
        ) {
            homeContext.setPageChangeTargetNotepadId(notepadId);
            homeContext.setPageChangeTargetPageNumber(pageNumber);
            homeContext.onOpenConfirmPageChangeWhenUnsavedModal();
        } else {
            homeContext.handlePageChange(notepadId, pageNumber);
        }
    };

    useEffect(() => {
        if (showingPage) {
            setCurrentPageNumber(showingPage.page_number);
            setTotalPageCount(homeContext.getPageCount(showingPage.notepad_id));
        }
    }, [showingPage]);

    if (!showingPage) {
        return <></>;
    }

    return (
        <>
            <Box px={8} py={4} h="100%">
                <Flex h="100%">
                    <Box w="20%" py={4}>
                        <Flex
                            minW="300px"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <IconButton
                                variant="roundedWhite"
                                icon={<MdKeyboardArrowLeft />}
                                onClick={() => {
                                    requestPageChange(
                                        showingPage.notepad_id,
                                        showingPage.page_number - 1
                                    );
                                }}
                                isDisabled={showingPage.page_number <= 1}
                            />
                            <Box flex={1} textAlign="center">
                                ページ {currentPageNumber} / {totalPageCount}
                            </Box>
                            <IconButton
                                variant="roundedWhite"
                                icon={<MdKeyboardArrowRight />}
                                onClick={() => {
                                    requestPageChange(
                                        showingPage.notepad_id,
                                        showingPage.page_number + 1
                                    );
                                }}
                                isDisabled={
                                    showingPage.page_number >= totalPageCount
                                }
                            />
                        </Flex>
                    </Box>
                    <Box flex={1}>
                        <Flex justifyContent="flex-end" h="100%">
                            <NotepadButtons forMobile={false} />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Footer;
