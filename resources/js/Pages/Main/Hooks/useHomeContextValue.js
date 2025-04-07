import { useState } from "react";

const useHomeContextValue = (notepads) => {
    const [showingPage, setShowingPage] = useState(null);

    const getShowingPage = () => {
        return showingPage;
    };

    const getAllNotepads = () => {
        return notepads;
    };

    const getNotepadById = (id) => {
        return notepads.find((notepad) => notepad.id === id);
    };

    const getShowingNotepad = () => {
        return showingPage ? getNotepadById(showingPage.notepad_id) : null;
    };

    const getPageById = (notepad_id, page_id) => {
        return notepads
            .find((notepad) => notepad.id === notepad_id)
            .pages.find((page) => page.id === page_id);
    };

    const getPageByPageNumber = (notepad_id, page_number) => {
        return notepads
            .find((notepad) => notepad.id === notepad_id)
            .pages.find((page) => page.page_number === page_number);
    };

    const getPageCount = (notepad_id) => {
        return notepads.find((notepad) => notepad.id === notepad_id).pages
            .length;
    };

    const getModifierPromptByNotepadId = (notepad_id) => {
        return notepads.find((notepad) => notepad.id === notepad_id)
            .modifier_prompt;
    };

    const getChangePromptByNotepadId = (notepad_id) => {
        return notepads.find((notepad) => notepad.id === notepad_id)
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
    };
};

export default useHomeContextValue;
