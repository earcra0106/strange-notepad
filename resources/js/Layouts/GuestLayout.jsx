import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Box, Flex, Center } from "@chakra-ui/react";

export default function GuestLayout({ children }) {
    return (
        <Flex
            minH="100vh"
            direction="column"
            align="center"
            py={6}
            bg="linear-gradient(120deg, #7f5af0 0%, #7f5af0 30%, #5f8fff 70%, #5f8fff 100%)"
            backgroundSize="200% 200%"
            animation="magic 6s ease-in-out infinite"
            opacity={0.9}
        >
            <Center py={2}>
                <Link href="/">
                    <Box
                        boxSize="80px"
                        position="relative"
                        aspectRatio={1}
                        overflow="hidden"
                    >
                        <ApplicationLogo
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                aspectRatio: "1 / 1",
                                display: "block",
                            }}
                        />
                    </Box>
                </Link>
            </Center>
            <Box
                mt={6}
                w="full"
                maxW="lg"
                bg="white"
                px={6}
                py={8}
                boxShadow="md"
                borderRadius="2xl"
                overflow="hidden"
            >
                {children}
            </Box>
        </Flex>
    );
}
