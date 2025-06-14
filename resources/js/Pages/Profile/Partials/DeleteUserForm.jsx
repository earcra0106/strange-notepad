import {
    Box,
    Button,
    Text,
    Heading,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Stack,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function DeleteUserForm({ className = "" }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        onOpen();
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => handleClose(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const handleClose = () => {
        onClose();
        clearErrors();
        reset();
    };

    return (
        <Box className={className}>
            <Heading as="h2" size="md" color="red.600" mb={2}>
                アカウント削除
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>
                アカウントを削除すると、すべてのデータが完全に削除されます。
            </Text>
            <Button
                colorScheme="red"
                onClick={confirmUserDeletion}
                borderRadius="full"
                px={6}
            >
                アカウントを削除
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius="2xl">
                    <ModalHeader>本当にアカウントを削除しますか？</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={deleteUser}>
                        <ModalBody>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                アカウントを削除すると、すべてのデータが完全に削除されます。パスワードを入力して削除を確定してください。
                            </Text>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel htmlFor="password" srOnly>
                                    パスワード
                                </FormLabel>
                                <Input
                                    borderRadius="full"
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="パスワード"
                                    autoFocus
                                />
                                <FormErrorMessage>
                                    {errors.password}
                                </FormErrorMessage>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Stack direction="row" spacing={3}>
                                <Button
                                    onClick={handleClose}
                                    variant="ghost"
                                    borderRadius="full"
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    borderRadius="full"
                                    colorScheme="red"
                                    type="submit"
                                    isLoading={processing}
                                >
                                    削除する
                                </Button>
                            </Stack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    );
}
