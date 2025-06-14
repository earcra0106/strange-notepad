import ModalTemplete from "./ModalTemplete";
import { Box, Flex, Select } from "@chakra-ui/react";
import { useHomeContext } from "../Contexts/HomeContext";
import { useState, useEffect } from "react";

const DetectPromptModal = () => {
    const homeContext = useHomeContext();

    const modifierPrompts = homeContext.getAllModifierPrompts();
    const changePrompts = homeContext.getAllChangePrompts();

    const [
        selectedExpectedModifierPromptId,
        setSelectedExpectedModifierPromptId,
    ] = useState(homeContext.getShowingNotepad().expected_modifier_prompt_id);
    const [selectedExpectedChangePromptId, setSelectedExpectedChangePromptId] =
        useState(homeContext.getShowingNotepad().expected_change_prompt_id);

    useEffect(() => {
        setSelectedExpectedModifierPromptId(
            homeContext.getShowingNotepad().expected_modifier_prompt_id
        );
        setSelectedExpectedChangePromptId(
            homeContext.getShowingNotepad().expected_change_prompt_id
        );
    }, [homeContext.getShowingNotepad()]);

    const ModalBody = (
        <Box>
            このメモ帳のジュモンは...?
            <Flex gap={4} mt={4}>
                <Select
                    borderRadius={"2xl"}
                    defaultValue={selectedExpectedModifierPromptId}
                    onChange={(e) => {
                        setSelectedExpectedModifierPromptId(e.target.value);
                    }}
                >
                    {modifierPrompts.map((prompt) => (
                        <option key={prompt.id} value={prompt.id}>
                            {prompt.name}
                        </option>
                    ))}
                </Select>
                <Select
                    borderRadius={"2xl"}
                    defaultValue={selectedExpectedChangePromptId}
                    onChange={(e) => {
                        setSelectedExpectedChangePromptId(e.target.value);
                    }}
                >
                    {changePrompts.map((prompt) => (
                        <option key={prompt.id} value={prompt.id}>
                            {prompt.name}
                        </option>
                    ))}
                </Select>
            </Flex>
        </Box>
    );

    return (
        <ModalTemplete
            type="confirm"
            isOpen={homeContext.isDetectPromptModalOpen}
            onConfirm={() => {
                homeContext.handleUpdateExpectedPromptsClick(
                    homeContext.getShowingNotepad().id,
                    selectedExpectedModifierPromptId,
                    selectedExpectedChangePromptId
                );
                homeContext.onCloseDetectPromptModal();
            }}
            onClose={() => {
                setSelectedExpectedModifierPromptId(
                    homeContext.getShowingNotepad().expected_modifier_prompt_id
                );
                setSelectedExpectedChangePromptId(
                    homeContext.getShowingNotepad().expected_change_prompt_id
                );
                homeContext.onCloseDetectPromptModal();
            }}
            titleComponent="ジュモンを推理"
            bodyComponent={ModalBody}
            mainButtonText="設定する"
            closeButtonText="キャンセル"
        />
    );
};

export default DetectPromptModal;
