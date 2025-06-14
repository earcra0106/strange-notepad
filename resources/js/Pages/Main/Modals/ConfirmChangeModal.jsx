import ModalTemplete from "./ModalTemplete";
import { Box } from "@chakra-ui/react";
import { useHomeContext } from "../Contexts/HomeContext";

const ConfirmChangeModal = () => {
    const homeContext = useHomeContext();

    const ModalBody = (
        <Box>
            魔法でメモを変換しますか？
            <br />
            <br />
            メモ帳に込められたジュモンで、現在のページの内容が書き換わります。
        </Box>
    );

    return (
        <ModalTemplete
            type="confirm"
            isOpen={homeContext.isConfirmChangeModalOpen}
            titleComponent="魔法で変換"
            bodyComponent={ModalBody}
            mainButtonText="変換する"
            closeButtonText="キャンセル"
            onConfirm={() => {
                homeContext.handleSaveAndChangeWithPromptClick();
                homeContext.onCloseConfirmChangeModal();
            }}
            onClose={homeContext.onCloseConfirmChangeModal}
        />
    );
};

export default ConfirmChangeModal;
