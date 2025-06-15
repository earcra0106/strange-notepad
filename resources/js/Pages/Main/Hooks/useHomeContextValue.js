import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "../../../axios";

const useHomeContextValue = (notepads, modifierPrompts, changePrompts) => {
    const [allNotepads, setAllNotepads] = useState(notepads);
    const [showingPage, setShowingPage] = useState(null);
    const [currentContentText, setCurrentContentText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pageChangeTargetNotepadId, setPageChangeTargetNotepadId] =
        useState(null);
    const [pageChangeTargetPageNumber, setPageChangeTargetPageNumber] =
        useState(0);

    const {
        isOpen: isDetectPromptModalOpen,
        onOpen: onOpenDetectPromptModal,
        onClose: onCloseDetectPromptModal,
    } = useDisclosure();

    const {
        isOpen: isNotepadDetectedModalOpen,
        onOpen: onOpenNotepadDetectedModal,
        onClose: onCloseNotepadDetectedModal,
    } = useDisclosure();

    const {
        isOpen: isNoChangeModalOpen,
        onOpen: onOpenNoChangeModal,
        onClose: onCloseNoChangeModal,
    } = useDisclosure();

    const {
        isOpen: isConfirmChangeModalOpen,
        onOpen: onOpenConfirmChangeModal,
        onClose: onCloseConfirmChangeModal,
    } = useDisclosure();

    const {
        isOpen: isConfirmDeleteModalOpen,
        onOpen: onOpenConfirmDeleteModal,
        onClose: onCloseConfirmDeleteModal,
    } = useDisclosure();

    const {
        isOpen: isConfirmPageChangeWhenUnsavedModalOpen,
        onOpen: onOpenConfirmPageChangeWhenUnsavedModal,
        onClose: onCloseConfirmPageChangeWhenUnsavedModal,
    } = useDisclosure();

    const {
        isOpen: isTuterialModalOpen,
        onOpen: onOpenTuterialModal,
        onClose: onCloseTuterialModal,
    } = useDisclosure();

    const getPageChangeTargetPageNumber = () => {
        return pageChangeTargetPageNumber;
    };

    const getPageChangeTargetNotepadId = () => {
        return pageChangeTargetNotepadId;
    };

    // ロード中trueのフラグを取得
    const getIsLoading = () => {
        return isLoading;
    };

    // 現在表示中のページを取得
    const getShowingPage = () => {
        return showingPage;
    };

    // 全てのメモ帳の情報を取得
    const getAllNotepads = () => {
        return allNotepads;
    };

    // 現在のページのコンテンツ
    const getCurrentContentText = () => {
        return currentContentText;
    };

    // IDからメモ帳を取得
    const getNotepadById = (id) => {
        return allNotepads.find((notepad) => notepad.id === id);
    };

    // 現在表示中のメモ帳を取得
    const getShowingNotepad = () => {
        return getShowingPage()
            ? getNotepadById(getShowingPage().notepad_id)
            : null;
    };

    // IDからページを取得
    const getPageById = (notepad_id, page_id) => {
        return getNotepadById(notepad_id).pages.find(
            (page) => page.id === page_id
        );
    };

    // メモ帳のページ番号からページを取得
    const getPageByPageNumber = (notepad_id, page_number) => {
        return getNotepadById(notepad_id).pages.find(
            (page) => page.page_number === page_number
        );
    };

    // メモ帳のページ数を取得
    const getPageCount = (notepad_id) => {
        try {
            const notepad = getNotepadById(notepad_id);
            if (!notepad) {
                return 0;
            }

            return notepad.pages.length;
        } catch (error) {
            return 0;
        }
    };

    // すべての口調プロンプトを取得
    const getAllModifierPrompts = () => {
        return modifierPrompts;
    };

    // すべての変更プロンプトを取得
    const getAllChangePrompts = () => {
        return changePrompts;
    };

    // IDから口調プロンプトを取得
    const getModifierPromptById = (modifier_prompt_id) => {
        return modifierPrompts.find(
            (modifier_prompt) => modifier_prompt.id === modifier_prompt_id
        );
    };

    // IDから変更プロンプトを取得
    const getChangePromptById = (change_prompt_id) => {
        return changePrompts.find(
            (change_prompt) => change_prompt.id === change_prompt_id
        );
    };

    // NotepadのIDから口調プロンプトを取得
    const getModifierPromptByNotepadId = (notepad_id) => {
        return getNotepadById(notepad_id).modifier_prompt;
    };

    // NotepadのIDから変更プロンプトを取得
    const getChangePromptByNotepadId = (notepad_id) => {
        return getNotepadById(notepad_id).change_prompt;
    };

    const getExpectedModifierPromptByNotepadId = (notepad_id) => {
        return getModifierPromptById(
            getNotepadById(notepad_id).expected_modifier_prompt_id
        );
    };

    const getExpectedChangePromptByNotepadId = (notepad_id) => {
        return getChangePromptById(
            getNotepadById(notepad_id).expected_change_prompt_id
        );
    };

    const getIsModifierPromptExpected = (notepad_id) => {
        const notepad = getNotepadById(notepad_id);
        if (!notepad) {
            return false;
        }
        return (
            notepad.modifier_prompt_id === notepad.expected_modifier_prompt_id
        );
    };

    const getIsChangePromptExpected = (notepad_id) => {
        const notepad = getNotepadById(notepad_id);
        if (!notepad) {
            return false;
        }
        return notepad.change_prompt_id === notepad.expected_change_prompt_id;
    };

    const getIsAllPromptsExpected = (notepad_id) => {
        return (
            getIsModifierPromptExpected(notepad_id) &&
            getIsChangePromptExpected(notepad_id)
        );
    };

    // Shelf内項目をクリックしたときの処理
    const handleShelfNotepadClick = (notepad_id) => {
        const page = getPageByPageNumber(notepad_id, 1);
        if (!page) {
            setShowingPage(null);
            return;
        }

        setShowingPage(page);
    };

    // Pageをめくるときの処理
    const handlePageChange = (notepad_id, page_number) => {
        const page = getPageByPageNumber(notepad_id, page_number);
        if (!page) {
            setShowingPage(null);
            return;
        }

        setShowingPage(page);
    };

    // Notepadを新規作成するボタンをクリックしたときの処理
    const handleNewNotepadClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/notepad");

            const newNotepad = response.data;
            updateOrCreateNotepadInBrowser(newNotepad, true);
            setIsLoading(false);
        } catch (error) {}
    };

    // Notepadを削除するボタンをクリックしたときの処理
    const handleDeleteNotepadClick = async (notepad_id) => {
        try {
            setIsLoading(true);
            const response = await axios.delete(`/notepad`, {
                data: { notepad_id: notepad_id },
            });

            setShowingPage(null);
            deleteNotepadFromBrowser(notepad_id, true);
            setIsLoading(false);
        } catch (error) {}
    };

    // Notepadの情報を変更するボタンをクリックしたときの処理
    const handleUpdateNotepadClick = async (notepad_id, new_name = null) => {
        try {
            setIsLoading(true);
            const response = await axios.patch("/notepad", {
                notepad_id: notepad_id,
                new_name: new_name,
            });

            const newNotepad = response.data;
            updateOrCreateNotepadInBrowser(newNotepad, true);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    // Notepadの予想プロンプトを更新するボタンをクリックしたときの処理
    const handleUpdateExpectedPromptsClick = async (
        notepad_id,
        new_expected_modifier_prompt_id,
        new_expected_change_prompt_id
    ) => {
        try {
            setIsLoading(true);
            const response = await axios.patch("/notepad", {
                notepad_id: notepad_id,
                new_expected_modifier_prompt_id:
                    new_expected_modifier_prompt_id,
                new_expected_change_prompt_id: new_expected_change_prompt_id,
            });

            const newNotepad = response.data;

            if (
                newNotepad.modifier_prompt_id ===
                    new_expected_modifier_prompt_id &&
                newNotepad.change_prompt_id === new_expected_change_prompt_id
            ) {
                onOpenNotepadDetectedModal();
            }

            updateOrCreateNotepadInBrowser(newNotepad, true);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    // 現在のページの内容を保存するボタンをクリックしたときの処理
    const handleSaveShowingPageClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.patch("/notepad/page", {
                page_id: getShowingPage().id,
                new_written_content: getCurrentContentText(),
                is_changed_by_prompt: false,
            });

            const new_page = response.data;
            updatePageInBrowser(new_page, true);

            setShowingPage((prevPage) => ({
                ...prevPage,
                written_content: new_page.written_content,
                is_changed_by_prompt: new_page.is_changed_by_prompt,
            }));
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    // プロンプトで変更するボタンをクリックしたときの処理
    const handleSaveAndChangeWithPromptClick = async () => {
        try {
            setIsLoading(true);

            const aiResponse = await axios.post("api/ai/change-note-content", {
                content: getCurrentContentText(),
                modifier_prompt_id: getModifierPromptByNotepadId(
                    getShowingPage().notepad_id
                ).id,
                change_prompt_id: getChangePromptByNotepadId(
                    getShowingPage().notepad_id
                ).id,
            });

            const new_changed_content = aiResponse.data.result;

            // 変更されたページの内容が、現在のページの内容と同じ場合は、何もしない
            if (new_changed_content === getShowingPage().written_content) {
                onOpenNoChangeModal();
                return;
            }

            // 変更されたページの内容を保存する
            const saveResponse = await axios.patch("/notepad/page", {
                page_id: getShowingPage().id,
                new_written_content: getCurrentContentText(),
                new_changed_content: new_changed_content,
                is_changed_by_prompt: true,
            });

            const new_page = saveResponse.data;
            updatePageInBrowser(new_page, true);

            setShowingPage(new_page);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const isNotepadHasChangedPage = (notepad_id) => {
        const notepad = allNotepads.find(
            (notepad) => notepad.id === notepad_id
        );
        if (!notepad) {
            return false;
        }

        return notepad.pages.some((page) => page.is_changed_by_prompt);
    };

    // フロント側のNotepadの情報を更新または新規作成する
    const updateOrCreateNotepadInBrowser = (notepad, isLogging = false) => {
        if (getAllNotepads().find((n) => n.id === notepad.id)) {
            setAllNotepads((prevNotepads) =>
                prevNotepads.map((prevNotepad) =>
                    prevNotepad.id === notepad.id ? notepad : prevNotepad
                )
            );
        } else {
            setAllNotepads((prevNotepads) => [...prevNotepads, notepad]);
        }
    };

    // フロント側のNotepadを削除する
    const deleteNotepadFromBrowser = (notepad_id, isLogging = false) => {
        setAllNotepads((prevNotepads) =>
            prevNotepads.filter((notepad) => notepad.id !== notepad_id)
        );
    };

    // フロント側のpageの情報を更新する
    const updatePageInBrowser = (page, isLogging = false) => {
        const notepad = getNotepadById(page.notepad_id);
        notepad.pages = notepad.pages.map((prevPage) =>
            prevPage.id === page.id ? page : prevPage
        );

        updateOrCreateNotepadInBrowser(notepad, false);
    };

    return {
        isDetectPromptModalOpen,
        onOpenDetectPromptModal,
        onCloseDetectPromptModal,

        isNotepadDetectedModalOpen,
        onOpenNotepadDetectedModal,
        onCloseNotepadDetectedModal,

        isNoChangeModalOpen,
        onOpenNoChangeModal,
        onCloseNoChangeModal,

        isConfirmChangeModalOpen,
        onOpenConfirmChangeModal,
        onCloseConfirmChangeModal,

        isConfirmDeleteModalOpen,
        onOpenConfirmDeleteModal,
        onCloseConfirmDeleteModal,

        isConfirmPageChangeWhenUnsavedModalOpen,
        onOpenConfirmPageChangeWhenUnsavedModal,
        onCloseConfirmPageChangeWhenUnsavedModal,

        isTuterialModalOpen,
        onOpenTuterialModal,
        onCloseTuterialModal,

        getPageChangeTargetPageNumber,
        setPageChangeTargetPageNumber,
        getPageChangeTargetNotepadId,
        setPageChangeTargetNotepadId,

        getShowingPage,

        getAllNotepads,

        getCurrentContentText,
        setCurrentContentText,

        getIsLoading,
        setIsLoading,

        getNotepadById,
        getShowingNotepad,

        getPageById,
        getPageByPageNumber,
        getPageCount,

        getAllModifierPrompts,
        getModifierPromptById,
        getModifierPromptByNotepadId,
        getExpectedModifierPromptByNotepadId,

        getAllChangePrompts,
        getChangePromptById,
        getChangePromptByNotepadId,
        getExpectedChangePromptByNotepadId,

        getIsModifierPromptExpected,
        getIsChangePromptExpected,
        getIsAllPromptsExpected,

        handleShelfNotepadClick,
        handlePageChange,
        handleNewNotepadClick,
        handleDeleteNotepadClick,
        handleUpdateNotepadClick,
        handleSaveShowingPageClick,
        handleSaveAndChangeWithPromptClick,
        handleUpdateExpectedPromptsClick,

        isNotepadHasChangedPage,
    };
};

export default useHomeContextValue;
