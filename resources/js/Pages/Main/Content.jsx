import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const Content = () => {
    const [charCount, setCharCount] = React.useState(0);
    const [maxCharCount, setMaxCharCount] = React.useState(600);
    const handleInputChange = (e) => {
        setCharCount(e.target.value.length);
    };

    return (
        <Box p={4}>
            <Box
                display="flex"
                borderRadius="md"
                boxShadow="lg"
                w="100%"
                h="100%"
                bg="gray.100"
            >
                <Box w="40px" h="100%">
                    {Array.from({ length: 10 }, (_, i) => (
                        <Box
                            key={i}
                            bg="green.200"
                            w="20px"
                            h="20px"
                            borderRadius="full"
                            mx="auto"
                            my={3}
                        />
                    ))}
                </Box>

                <Box flex="1" bg="gray.100" p={4}>
                    <Flex direction="column" h="100%">
                        <Box
                            as="textarea"
                            flex="1"
                            placeholder="Type your notes here..."
                            maxLength={maxCharCount}
                            onChange={handleInputChange}
                            w="100%"
                            h="100%"
                            border="none"
                            outline="none"
                            resize="none"
                            bg="transparent"
                        />
                        <Text
                            textAlign="right"
                            fontSize="sm"
                            color={
                                charCount >= maxCharCount
                                    ? "red.500"
                                    : "gray.500"
                            }
                        >
                            {charCount} / {maxCharCount}
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default Content;
