import React from "react";
import { Box, Heading, VStack, HStack, Image } from "@chakra-ui/react";

const Home = (props) => {
    return (
        <>
            <Box mt={2} bg="tomato">
                <Heading
                    as="h1"
                    size="lg"
                    mb={4}
                    fontSize={{ base: "24px", md: "40px", lg: "56px" }}
                >
                    Home
                </Heading>
                <VStack spacing={4} align="stretch">
                    {props.notepads.map((notepad) => (
                        <Box key={notepad.id} p={4}>
                            <HStack spacing={4}>
                                <Image
                                    boxSize="100px"
                                    objectfit="cover"
                                    src="https://via.placeholder.com/100"
                                    alt="Notepad Image"
                                />
                            </HStack>
                        </Box>
                    ))}
                </VStack>
                <h1>メモ帳内容</h1>
                {/* <ul>
                    {props.notepads.map((notepad) => (
                        <li key={notepad.id}>
                            <p>{notepad.name}</p>
                            <p>{notepad.created_at}</p>
                        </li>
                    ))}
                </ul> */}
            </Box>
        </>
    );
};

export default Home;
