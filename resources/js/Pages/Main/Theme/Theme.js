import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "'M PLUS 1p', sans-serif",
        body: "'M PLUS 1p', sans-serif",
    },
    components: {
        Button: {
            variants: {
                roundedWhite: {
                    borderRadius: "full",
                    bg: "white",
                    color: "black",
                    fontSize: "2xl",
                    px: 6,
                    h: 14,
                    minW: 14,
                    _hover: {
                        bg: "gray.200",
                        _disabled: {
                            bg: "white",
                            color: "gray.400",
                            cursor: "not-allowed",
                        },
                    },
                    _disabled: {
                        bg: "white",
                        color: "gray.400",
                        cursor: "not-allowed",
                    },
                },
                roundedPurple: {
                    borderRadius: "full",
                    bg: "purple.500",
                    color: "white",
                    fontSize: "2xl",
                    px: 6,
                    h: 14,
                    minW: 14,
                    _hover: {
                        bg: "purple.600",
                        _disabled: {
                            bg: "purple.500",
                            color: "gray.400",
                            cursor: "not-allowed",
                        },
                    },
                    _disabled: {
                        bg: "purple.500",
                        color: "gray.400",
                        cursor: "not-allowed",
                    },
                },
            },
            defaultProps: {
                colorScheme: undefined,
            },
        },
    },
});

export default theme;
