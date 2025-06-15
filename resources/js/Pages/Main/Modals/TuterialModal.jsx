import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import ModalTemplete from "./ModalTemplete";
import { useHomeContext } from "../Contexts/HomeContext";
import {
    MdLightbulbOutline,
    MdLogin,
    MdPersonAdd,
    MdAutoFixHigh,
} from "react-icons/md";

const TuterialModal = () => {
    const homeContext = useHomeContext();

    const InlineIcon = ({ icon: Icon, ...props }) => (
        <span
            style={{
                display: "inline-flex",
                alignItems: "baseline",
                marginLeft: "4px",
                marginRight: "4px",
                lineHeight: 1,
                ...props.style,
            }}
        >
            <Icon
                style={{
                    verticalAlign: "middle",
                    position: "relative",
                    top: "2px",
                }}
            />
        </span>
    );

    const ModalBody = (
        <Box>
            <Box>
                <Heading as="h2" size="md" mb={4}>
                    どんなアプリ?
                </Heading>
                <Text>
                    「魔法のメモ帳」は、書いたメモの内容が変化してしまう不思議なメモ帳ゲームアプリです。
                </Text>
            </Box>
            <Box mt={4}>
                <Heading as="h2" size="md" mb={4} mt={6}>
                    Step 1: ユーザー登録をしよう!
                </Heading>
                <Text>
                    サイドバーから
                    <InlineIcon icon={MdLogin} />
                    ログイン
                    <InlineIcon icon={MdPersonAdd} />
                    ユーザー登録 ができます。
                </Text>
            </Box>
            <Box mt={4}>
                <Heading as="h2" size="md" mb={4} mt={6}>
                    Step 2: メモを変化させよう!
                </Heading>
                <Text>
                    メモ帳のページに内容を書いたら、
                    <Text
                        as="span"
                        color="purple.600"
                        display="inline-flex"
                        alignItems="baseline"
                    >
                        <InlineIcon icon={MdAutoFixHigh} />
                        魔法で変換
                    </Text>{" "}
                    ボタンを押すと、内容が自動で変化します。
                </Text>
            </Box>
            <Box mt={4}>
                <Heading as="h2" size="md" mb={4} mt={6}>
                    Step 3: 変化のジュモンを推理しよう!
                </Heading>
                <Text>
                    メモ帳ひとつひとつには、変化のルールを決める「ジュモン」がかけられています。
                </Text>
                <Text>
                    <Text
                        as="span"
                        color="purple.600"
                        display="inline-flex"
                        alignItems="baseline"
                    >
                        <InlineIcon icon={MdLightbulbOutline} />
                        ジュモンを推理
                    </Text>{" "}
                    ボタンで、どんなジュモンか推理してみましょう!
                </Text>
                <Text>すべてのジュモンを当てるとクリア!</Text>
            </Box>
            <Box mt={4}>
                <Heading as="h2" size="md" mb={4} mt={6}>
                    利用上の注意
                </Heading>
                <Box mb={2}>
                    <Text>
                        このアプリは、書いた内容が変化することを楽しむゲームです。
                        大切な情報は、他の場所に保存することをおすすめします。
                    </Text>
                </Box>
                <Box mb={2}>
                    このアプリはOpenAIのAPI「GPT-4o mini」を利用しています。
                    <br />
                    個人情報や機密情報をメモに書くことは避けてください。
                    <br />
                    その他、生成AIの特性を理解した上でご利用ください。
                </Box>
            </Box>
            <Box mt={4}>
                <Heading as="h2" size="md" mb={4} mt={6}>
                    クレジット / 技術スタック
                </Heading>
                <Box mb={2}>
                    ソースコード:{" "}
                    <Text
                        as="a"
                        href="https://github.com/earcra0106/strange-notepad"
                        color="blue.500"
                        target="_blank"
                    >
                        GitHub
                    </Text>
                    <br />
                    バックエンド: Laravel
                    <br />
                    フロントエンド: React
                    <br />
                    デザイン: Chakra UI
                    <br />
                    アイコン:{" "}
                    <Text
                        as="a"
                        href="https://react-icons.github.io/react-icons/"
                        color="blue.500"
                        target="_blank"
                    >
                        React Icons
                    </Text>
                    <br />
                    デプロイ: Render
                    <br />
                    API: OpenAI (GPT-4o mini)
                    <br />
                    開発者:{" "}
                    <Text
                        as="a"
                        href="https://github.com/earcra0106"
                        color="blue.500"
                        target="_blank"
                    >
                        earcra0106
                    </Text>
                    <br />
                </Box>
            </Box>
        </Box>
    );

    return (
        <ModalTemplete
            type="info"
            isOpen={homeContext.isTuterialModalOpen}
            onClose={homeContext.onCloseTuterialModal}
            titleComponent="アプリの使い方"
            bodyComponent={ModalBody}
        />
    );
};

export default TuterialModal;
