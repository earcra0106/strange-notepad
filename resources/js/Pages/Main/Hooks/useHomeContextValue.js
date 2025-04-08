import { useState } from "react";
import axios from "axios";

const useHomeContextValue = (notepads) => {
    const [showingPage, setShowingPage] = useState(null);
    const [allNotepads, setAllNotepads] = useState(notepads);

    const getShowingPage = () => {
        return showingPage;
    };

    const getAllNotepads = () => {
        return allNotepads;
    };

    const getNotepadById = (id) => {
        return allNotepads.find((notepad) => notepad.id === id);
    };

    const getShowingNotepad = () => {
        return showingPage ? getNotepadById(showingPage.notepad_id) : null;
    };

    const getPageById = (notepad_id, page_id) => {
        return allNotepads
            .find((notepad) => notepad.id === notepad_id)
            .pages.find((page) => page.id === page_id);
    };

    const getPageByPageNumber = (notepad_id, page_number) => {
        return allNotepads
            .find((notepad) => notepad.id === notepad_id)
            .pages.find((page) => page.page_number === page_number);
    };

    const getPageCount = (notepad_id) => {
        return allNotepads.find((notepad) => notepad.id === notepad_id).pages
            .length;
    };

    const getModifierPromptByNotepadId = (notepad_id) => {
        return allNotepads.find((notepad) => notepad.id === notepad_id)
            .modifier_prompt;
    };

    const getChangePromptByNotepadId = (notepad_id) => {
        return allNotepads.find((notepad) => notepad.id === notepad_id)
            .change_prompt;
    };

    // Shelf内項目をクリックしたときの処理
    const handleShelfNotepadClick = (notepad_id) => {
        const page = getPageByPageNumber(notepad_id, 1);
        if (!page) {
            console.log("ページが見つかりませんでした");
            setShowingPage(null);
            return;
        }

        setShowingPage(page);
    };

    // Pageをめくるときの処理
    const handlePageChange = (notepad_id, page_number) => {
        const page = getPageByPageNumber(notepad_id, page_number);
        if (!page) {
            console.log("ページが見つかりませんでした");
            setShowingPage(null);
            return;
        }

        setShowingPage(page);
    };

    // Notepadを新規作成する処理
    const handleNewNotepadClick = async () => {
        try {
            const response = await axios.post("/home");

            const newNotepad = response.data;
            setAllNotepads((prevNotepads) => [...prevNotepads, newNotepad]);
        } catch (error) {
            console.error("メモ帳の作成に失敗しました:", error);
        }
    };

    return {
        getShowingPage,
        setShowingPage,
        getAllNotepads,
        getNotepadById,
        getShowingNotepad,
        getPageById,
        getPageByPageNumber,
        getPageCount,
        getModifierPromptByNotepadId,
        getChangePromptByNotepadId,
        handleShelfNotepadClick,
        handlePageChange,
        handleNewNotepadClick,
    };
};

export default useHomeContextValue;
