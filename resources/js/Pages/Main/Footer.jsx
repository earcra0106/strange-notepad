import React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useHomeContext } from "./Contexts/HomeContext";
import NotepadButtons from "./NotepadButtons.jsx";

const Footer = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);

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
            <Box p={8} h="100%">
                <Flex h="100%">
                    <Box w="20%">
                        <Flex
                            minW="300px"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <IconButton
                                variant="roundedWhite"
                                icon={<ChevronLeftIcon />}
                                onClick={() => {
                                    homeContext.handlePageChange(
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
                                icon={<ChevronRightIcon />}
                                onClick={() => {
                                    homeContext.handlePageChange(
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
