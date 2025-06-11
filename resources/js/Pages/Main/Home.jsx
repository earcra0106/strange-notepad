import React from "react";
import { Box, Flex, Grid, ChakraProvider, extendTheme } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { HomeContext } from "./Contexts/HomeContext";
import useHomeContextValue from "./Hooks/useHomeContextValue";
import LoadOverlay from "./LoadOverlay";
import DetectPromptModal from "./DetectPromptModal";
import theme from "./Theme/Theme";

const Home = ({ notepads, modifierPrompts, changePrompts }) => {
    const contextValue = useHomeContextValue(
        notepads,
        modifierPrompts,
        changePrompts
    );

    const { getIsLoading } = contextValue;

    // JSX
    return (
        <ChakraProvider theme={theme}>
            <HomeContext.Provider value={contextValue}>
                {getIsLoading() && <LoadOverlay />}
                <Box w="100%" h="100vh" bg="gray.800" color="white">
                    <Grid h="100%">
                        <Flex>
                            {/* Sidebar */}
                            <Box
                                w="240px"
                                bg="gray.900"
                                borderRight={"1px solid"}
                                borderColor="gray.700"
                            >
                                <Sidebar />
                            </Box>
                            <Flex direction="column" flex="1">
                                {/* Header */}
                                <Box h="100px">
                                    <Header />
                                </Box>
                                {/* Content */}
                                <Box flex="1">
                                    <Content />
                                </Box>
                                {/* Footer */}
                                <Box h="120px" bg="gray.700">
                                    <Footer />
                                </Box>
                            </Flex>
                        </Flex>
                    </Grid>
                </Box>
                {contextValue.getShowingNotepad() && <DetectPromptModal />}
            </HomeContext.Provider>
        </ChakraProvider>
    );
};

export default Home;
