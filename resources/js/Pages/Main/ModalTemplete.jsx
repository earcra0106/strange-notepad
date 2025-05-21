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
                <ModalContent>
                    <ModalHeader>{titleComponent}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{bodyComponent}</ModalBody>

                    <ModalFooter>
                        {type === "confirm" && (
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    onConfirm();
                                }}
                            >
                                {mainButtonText}
                            </Button>
                        )}
                        {type === "delete" && (
                            <Button
                                colorScheme="red"
                                mr={3}
                                onClick={() => {
                                    onConfirm();
                                }}
                            >
                                {mainButtonText}
                            </Button>
                        )}
                        <Button colorScheme="gray" mr={3} onClick={onClose}>
                            {closeButtonText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalTemplete;
