import React from "react";
import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useHomeContext } from "./Contexts/HomeContext";

const Content = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();

    const [charCount, setCharCount] = useState(0);
    const [maxCharCount] = useState(600);

    useEffect(() => {
        if (showingPage) {
            const newContentText = showingPage.is_changed_by_prompt
                ? showingPage.changed_content || ""
                : showingPage.written_content || "";
            homeContext.setCurrentContentText(newContentText);
            setCharCount(newContentText.length);
        }
    }, [showingPage]);

    useEffect(() => {}, [homeContext.getIsLoading()]);

    if (!showingPage) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                h="100%"
            >
                メモ帳を選択しましょう
            </Box>
        );
    }

    const handleInputChange = (e) => {
        const newContentText = e.target.value;
        homeContext.setCurrentContentText(newContentText);
        setCharCount(newContentText.length);
    };

    return (
        <>
            <Box p={4}>
                <Box
                    display="flex"
                    borderRadius="md"
                    boxShadow="lg"
                    w="100%"
                    maxW={"800px"}
                    h="100%"
                    bg="gray.100"
                >
                    <Box w="40px" h="100%">
                        {Array.from({ length: 13 }, (_, i) => (
                            <Box
                                key={i}
                                bg="gray.700"
                                w="20px"
                                h="20px"
                                borderRadius="full"
                                mx="auto"
                                my={3}
                            />
                        ))}
                    </Box>

                    <Box flex="1" bg="gray.100" p={4} borderRadius="md">
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
                                value={homeContext.getCurrentContentText()}
                                color={
                                    showingPage.is_changed_by_prompt
                                        ? "purple.600"
                                        : "black"
                                }
                            ></Box>
                            <Text
                                mt={2}
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
        </>
    );
};

export default Content;
