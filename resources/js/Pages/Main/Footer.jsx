import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useHomeContext } from "./Contexts/HomeContext";

const Footer = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

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
                                ページ {showingPage.page_number} /{" "}
                                {homeContext.getPageCount(
                                    showingPage.notepad_id
                                )}
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
                                    showingPage.page_number >=
                                    homeContext.getPageCount(
                                        showingPage.notepad_id
                                    )
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
