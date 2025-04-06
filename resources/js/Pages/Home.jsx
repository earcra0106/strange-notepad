import React from "react";
import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Home = (props) => {
    return (
        <>
            <Box w="100%" h="100vh">
                <Flex>
                    {/* Sidebar */}
                    <Box w="25%" bg="red.100">
                        Sidebar
                    </Box>
                    <Flex direction="column" w="75%">
                        {/* Header */}
                        <Box h="15%" bg="blue.100">
                            Header
                        </Box>
                        {/* Content */}
                        <Box flex="1" bg="green.100">
                            Content
                        </Box>
                        {/* Footer */}
                        <Box h="15%" bg="yellow.100">
                            Footer
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default Home;
