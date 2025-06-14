import ModalTemplete from "./ModalTemplete";
import { Box } from "@chakra-ui/react";
import { useHomeContext } from "../Contexts/HomeContext";

const ConfirmPageChangeWhenUnsavedModal = ({ func }) => {
    const homeContext = useHomeContext();

    const ModalBody = (
        <Box>
            ページに変更がありますが、保存されていません。
            <br />
            <br />
            このまま移動すると、変更内容は失われます。
        </Box>
    );

    return (
        <ModalTemplete
            type="delete"
            isOpen={homeContext.isConfirmPageChangeWhenUnsavedModalOpen}
            titleComponent="変更を破棄しますか?"
            bodyComponent={ModalBody}
            mainButtonText="変更を破棄"
            closeButtonText="キャンセル"
            onConfirm={() => {
                func();
                homeContext.onCloseConfirmPageChangeWhenUnsavedModal();
            }}
            onClose={homeContext.onCloseConfirmPageChangeWhenUnsavedModal}
        />
    );
};

export default ConfirmPageChangeWhenUnsavedModal;
