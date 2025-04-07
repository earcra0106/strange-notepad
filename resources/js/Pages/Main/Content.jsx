import React from "react";
import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useHomeContext } from "./Contexts/HomeContext";

const Content = () => {
    const homeContext = useHomeContext();
    const showingPage = homeContext.getShowingPage();
    const [contentText, setContentText] = useState(() => {
        if (showingPage) {
            return showingPage.written_content || "";
        }
        return "";
    });
    const [charCount, setCharCount] = useState(0);
    const [maxCharCount] = useState(600);

    useEffect(() => {
        if (showingPage) {
            setContentText(showingPage.written_content || "");
            setCharCount((showingPage.written_content || "").length);
        }
    }, [showingPage]);

    if (!showingPage) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                h="100%"
                color="rgba(0, 0, 0, 0.5)"
            >
                メモ帳を選択しましょう
            </Box>
        );
    }

    const handleInputChange = (e) => {
        const newContentText = e.target.value;
        setContentText(newContentText);
        setCharCount(newContentText.length);
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
                            value={contentText}
                        ></Box>
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
