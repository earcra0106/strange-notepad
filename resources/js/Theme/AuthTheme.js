import { extendTheme } from "@chakra-ui/react";

const authTheme = extendTheme({
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
                roundedMagic: {
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "full",
                    color: "white",
                    fontSize: "2xl",
                    px: 6,
                    minW: 14,
                    zIndex: 0,
                    _before: {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        zIndex: -1,
                        borderRadius: "full",
                        background:
                            "linear-gradient(120deg, #7f5af0 0%, #7f5af0 30%, #5f8fff 70%, #5f8fff 100%)",
                        backgroundSize: "200% 200%",
                        animation: "magic 4s ease-in-out infinite",
                        opacity: 0.9,
                        transition: "background 0.4s cubic-bezier(0.4,0,0.2,1)",
                    },
                    _hover: {
                        _before: {
                            background:
                                "linear-gradient(120deg, #a084f7 0%, #a084f7 30%, #7fbcff 70%, #7fbcff 100%)",
                        },
                        _disabled: {
                            _before: {
                                background:
                                    "linear-gradient(120deg, #7f5af0 0%, #7f5af0 30%, #5f8fff 70%, #5f8fff 100%)",
                            },
                        },
                    },
                    _disabled: {
                        color: "gray.400",
                        cursor: "not-allowed",
                        _before: {
                            opacity: 0.5,
                        },
                    },
                },
            },
            defaultProps: {
                colorScheme: undefined,
            },
        },
    },
});

export default authTheme;
