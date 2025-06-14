import React from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const ModalTemplete = ({
    type = "info",
    isOpen,
    onConfirm = () => {},
    onClose,
    titleComponent = "タイトル",
    bodyComponent = "本文",
    mainButtonText = "確認",
    closeButtonText = "閉じる",
}) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius="2xl">
                    <ModalHeader>{titleComponent}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{bodyComponent}</ModalBody>

                    <ModalFooter>
                        <Flex gap={2} justifyContent="flex-end">
                            {type === "confirm" && (
                                <Button
                                    variant="roundedPurple"
                                    onClick={() => {
                                        onConfirm();
                                    }}
                                >
                                    {mainButtonText}
                                </Button>
                            )}
                            {type === "delete" && (
                                <Button
                                    borderRadius="full"
                                    colorScheme="red"
                                    onClick={() => {
                                        onConfirm();
                                    }}
                                >
                                    {mainButtonText}
                                </Button>
                            )}
                            <Button
                                borderRadius="full"
                                colorScheme="gray"
                                onClick={onClose}
                            >
                                {closeButtonText}
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalTemplete;
