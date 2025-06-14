import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Heading,
    Text,
    Alert,
    AlertIcon,
    VStack,
    HStack,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [showSaved, setShowSaved] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => {
                setShowSaved(true);
                setTimeout(() => setShowSaved(false), 2000);
            },
        });
    };

    return (
        <Box as="section" className={className}>
            <Heading as="h2" size="md" mb={2}>
                プロフィール情報
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>
                アカウントのプロフィール情報とメールアドレスを更新できます。
            </Text>

            <form onSubmit={submit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel htmlFor="name">ユーザー名</FormLabel>
                        <Input
                            borderRadius="full"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel htmlFor="email">メールアドレス</FormLabel>
                        <Input
                            borderRadius="full"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <Box>
                            <Text fontSize="sm" color="gray.800" mb={2}>
                                メールアドレスが未認証です。
                                <ChakraLink
                                    as={Link}
                                    href={route("verification.send")}
                                    method="post"
                                    fontSize="sm"
                                    color="gray.600"
                                    textDecoration="underline"
                                    _hover={{ color: "gray.900" }}
                                    ml={2}
                                >
                                    認証メールを再送信
                                </ChakraLink>
                            </Text>
                            {status === "verification-link-sent" && (
                                <Alert
                                    status="success"
                                    fontSize="sm"
                                    py={1}
                                    mt={2}
                                >
                                    <AlertIcon />
                                    新しい認証リンクを送信しました。
                                </Alert>
                            )}
                        </Box>
                    )}

                    <HStack spacing={4} mt={2}>
                        <Button
                            borderRadius="full"
                            fontSize="sm"
                            px={6}
                            colorScheme="purple"
                            type="submit"
                            isLoading={processing}
                        >
                            保存
                        </Button>
                        {showSaved && (
                            <Text fontSize="sm" color="gray.600">
                                保存しました
                            </Text>
                        )}
                    </HStack>
                </VStack>
            </form>
        </Box>
    );
}
