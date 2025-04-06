import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const Home = (props) => {
    return (
        <>
            <Box w="100%">
                <Grid minH="100vh">
                    <Flex>
                        {/* Sidebar */}
                        <Box w="25%" bg="red.100">
                            <Sidebar />
                        </Box>
                        <Flex direction="column" w="75%">
                            {/* Header */}
                            <Box h="15%" bg="blue.100">
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
        </>
    );
};

export default Home;
