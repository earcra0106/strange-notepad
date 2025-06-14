import ModalTemplete from "./ModalTemplete";
import { Box } from "@chakra-ui/react";
import { useHomeContext } from "../Contexts/HomeContext";

const NoChangeModal = () => {
    const homeContext = useHomeContext();

    const ModalBody = (
        <Box>
            魔法が不発になったみたいです...
            <br />
            メモを工夫するとうまくいくかも?
            <br />
            <br />
            ・メモの内容を長くする
            <br />
            ・メモを文章にする
        </Box>
    );

    return (
        <ModalTemplete
            type="info"
            isOpen={homeContext.isNoChangeModalOpen}
            onClose={homeContext.onCloseNoChangeModal}
            titleComponent="変換失敗!"
            bodyComponent={ModalBody}
        />
    );
};

export default NoChangeModal;
