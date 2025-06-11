import ModalTemplete from "./ModalTemplete";
import { Box } from "@chakra-ui/react";
import { useHomeContext } from "./Contexts/HomeContext";

const ConfirmDeleteModal = () => {
    const homeContext = useHomeContext();

    const ModalBody = (
        <Box>
            メモ帳を削除しますか?
            <br />
            <br />
            この操作は取り消せません。
        </Box>
    );

    return (
        <ModalTemplete
            type="delete"
            isOpen={homeContext.isConfirmDeleteModalOpen}
            titleComponent="メモ帳を削除"
            bodyComponent={ModalBody}
            mainButtonText="削除する"
            closeButtonText="キャンセル"
            onConfirm={() => {
                homeContext.handleDeleteNotepadClick(
                    homeContext.getShowingNotepad().id
                );
                homeContext.onCloseConfirmDeleteModal();
            }}
            onClose={homeContext.onCloseConfirmDeleteModal}
        />
    );
};

export default ConfirmDeleteModal;
