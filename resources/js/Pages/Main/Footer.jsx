import React from "react";
import { useState, useEffect } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useHomeContext } from "./Contexts/HomeContext";

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
            <Box p={4} h="100%">
                <Flex h="100%">
                    <Box flex={1}></Box>
                    <Box w="30%">
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <IconButton
                                icon={<ChevronLeftIcon />}
                                colorScheme="blue"
                                shadow={"md"}
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
                                icon={<ChevronRightIcon />}
                                colorScheme="blue"
                                shadow={"md"}
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
                </Flex>
            </Box>
        </>
    );
};

export default Footer;
