import React, { useContext, useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { HomeContext } from "../Contexts/HomeContext";
import ModalTemplete from "./ModalTemplete.jsx";
import Confetti from "react-confetti";

const NotepadDetectedModal = () => {
    const homeContext = useContext(HomeContext);

    if (!homeContext.getShowingNotepad()) {
        return null;
    }

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const ModalBody = (
        <Box>
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={200}
                recycle={true}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: windowSize.width,
                    height: windowSize.height,
                    pointerEvents: "none",
                }}
            />
            メモ帳の呪文を解読した!
            <Box
                mt={4}
                p={4}
                textAlign="center"
                position="relative"
                overflow="hidden"
                borderRadius="full"
                sx={{
                    "&::before": {
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
                }}
            >
                <Flex gap={4} justify="center" align="center" color="white">
                    <Box>
                        {
                            homeContext.getExpectedModifierPromptByNotepadId(
                                homeContext.getShowingNotepad().id
                            ).name
                        }
                    </Box>
                    <Box>
                        {
                            homeContext.getExpectedChangePromptByNotepadId(
                                homeContext.getShowingNotepad().id
                            ).name
                        }
                    </Box>
                </Flex>
                <Box fontSize="xl" textAlign="center" color="white" mt={2}>
                    {homeContext.getShowingNotepad().name}
                </Box>
            </Box>
        </Box>
    );

    return (
        <ModalTemplete
            type="info"
            isOpen={homeContext.isNotepadDetectedModalOpen}
            onClose={homeContext.onCloseNotepadDetectedModal}
            titleComponent="Congratulations!"
            bodyComponent={ModalBody}
        />
    );
};

export default NotepadDetectedModal;
