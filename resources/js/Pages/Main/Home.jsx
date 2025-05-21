import React from "react";
import { Box, Flex, Grid, Select } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { HomeContext } from "./Contexts/HomeContext";
import useHomeContextValue from "./Hooks/useHomeContextValue";
import LoadOverlay from "./LoadOverlay";
import ModalTemplete from "./ModalTemplete";
import DetectPromptModal from "./DetectPromptModal";

const Home = ({ notepads, modifierPrompts, changePrompts }) => {
    const contextValue = useHomeContextValue(
        notepads,
        modifierPrompts,
        changePrompts
    );

    const { getIsLoading } = contextValue;

    // JSX
    return (
        <>
            <HomeContext.Provider value={contextValue}>
                {getIsLoading() && <LoadOverlay />}
                <Box w="100%">
                    <Grid minH="100vh">
                        <Flex>
                            {/* Sidebar */}
                            <Box w="25%" bg="red.100">
                                <Sidebar />
                            </Box>
                            <Flex direction="column" w="75%">
                                {/* Header */}
                                <Box h="20%" bg="blue.100">
                                    <Header />
                                </Box>
                                {/* Content */}
                                <Box flex="1" bg="green.100">
                                    <Content />
                                </Box>
                                {/* Footer */}
                                <Box h="15%" bg="yellow.100">
                                    <Footer />
                                </Box>
                            </Flex>
                        </Flex>
                    </Grid>
                </Box>
                {!contextValue.getShowingNotepad() ? (
                    <ModalTemplete
                        type="info"
                        isOpen={contextValue.isDetectPromptModalOpen}
                        onClose={contextValue.onCloseDetectPromptModal}
                        titleComponent="ジュモンの推測"
                        bodyComponent="メモ帳が選択されていません。"
                        closeButtonText="キャンセル"
                    />
                ) : (
                    <DetectPromptModal />
                )}
            </HomeContext.Provider>
        </>
    );
};

export default Home;
