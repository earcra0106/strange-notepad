import { useState } from "react";
import axios from "axios";

const useHomeContextValue = (notepads, modifierPrompts, changePrompts) => {
    const [allNotepads, setAllNotepads] = useState(notepads);
    const [showingPage, setShowingPage] = useState(null);
    const [currentContentText, setCurrentContentText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getIsLoading = () => {
        return isLoading;
    };

    const getShowingPage = () => {
        return showingPage;
    };

    const getAllNotepads = () => {
        return allNotepads;
    };

    const getCurrentContentText = () => {
        return currentContentText;
    };

    const getNotepadById = (id) => {
        return allNotepads.find((notepad) => notepad.id === id);
    };

    const getShowingNotepad = () => {
        return getShowingPage()
            ? getNotepadById(getShowingPage().notepad_id)
            : null;
    };

    const getPageById = (notepad_id, page_id) => {
        return allNotepads
            .find((notepad) => notepad.id === notepad_id)
            .pages.find((page) => page.id === page_id);
    };

    const getPageByPageNumber = (notepad_id, page_number) => {
        console.log(
            allNotepads.find((notepad) => notepad.id === notepad_id).pages
        );
        return allNotepads
            .find((notepad) => notepad.id === notepad_id)
            .pages.find((page) => page.page_number === page_number);
    };

    const getPageCount = (notepad_id) => {
        try {
            const notepad = allNotepads.find(
                (notepad) => notepad.id === notepad_id
            );
            if (!notepad) {
                console.error(
                    `getPageCount(${notepad_id}): メモ帳が見つかりません`
                );
                return 0;
            }

            return notepad.pages.length;
        } catch (error) {
            console.error(
                `getPageCount(${notepad_id})ページ数の取得に失敗しました:`,
                error
            );
            return 0;
        }
    };

    const getModifierPromptOfNotepadByNotepadId = (notepad_id) => {
        return allNotepads.find((notepad) => notepad.id === notepad_id)
            .modifier_prompt;
    };

    const getChangePromptOfNotepadByNotepadId = (notepad_id) => {
        return allNotepads.find((notepad) => notepad.id === notepad_id)
            .change_prompt;
    };

    const getAllModifierPrompts = () => {
        return modifierPrompts;
    };

    const getAllChangePrompts = () => {
        return changePrompts;
    };

    const getModifierPromptById = (modifier_prompt_id) => {
        return modifierPrompts.find(
            (modifier_prompt) => modifier_prompt.id === modifier_prompt_id
        );
    };

    const getChangePromptById = (change_prompt_id) => {
        return changePrompts.find(
            (change_prompt) => change_prompt.id === change_prompt_id
        );
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

    const handleDeleteNotepadClick = async (notepad_id) => {
        try {
            if (
                !confirm(
                    "選択中のメモ帳を削除しますか？\n\nこの操作は取り消せません。"
                )
            ) {
                return;
            }

            const response = await axios.delete(`/home`, {
                data: { notepad_id: notepad_id },
            });

            setShowingPage(null);
            setAllNotepads((prevNotepads) =>
                prevNotepads.filter((notepad) => notepad.id !== notepad_id)
            );
        } catch (error) {
            console.error("メモ帳の削除に失敗しました:", error);
        }
    };

    // Notepadの情報を変更するときの処理
    const handleUpdateNotepadClick = async (notepad_id, new_name = null) => {
        try {
            setIsLoading(true);
            const response = await axios.patch("/home/notepad", {
                notepad_id: notepad_id,
                new_name: new_name,
            });

            setAllNotepads((prevNotepads) =>
                prevNotepads.map((notepad) =>
                    notepad.id === notepad_id
                        ? {
                              ...notepad,
                              name: new_name || notepad.name,
                          }
                        : notepad
                )
            );
            setIsLoading(false);
        } catch (error) {
            console.error("メモ帳の変更に失敗しました:", error);
        }
    };

    const handleSaveShowingPageClick = async () => {
        try {
            const response = await axios.patch("/home/page", {
                page_id: getShowingPage().id,
                new_written_content: getCurrentContentText(),
            });

            const new_page = response.data;

            setShowingPage((prevPage) => ({
                ...prevPage,
                written_content: new_page.written_content,
            }));

            setAllNotepads((prevNotepads) =>
                prevNotepads.map((notepad) => {
                    if (notepad.id !== new_page.notepad_id) return notepad;

                    return {
                        ...notepad,
                        pages: notepad.pages.map((page) =>
                            page.id === new_page.id
                                ? {
                                      ...page,
                                      written_content: new_page.written_content,
                                  }
                                : page
                        ),
                    };
                })
            );

            console.log("ページの変更に成功しました:", new_page);
        } catch (error) {
            console.error("ページの変更に失敗しました:", error);
        }
    };

    return {
        getShowingPage,
        setShowingPage,

        getAllNotepads,
        setAllNotepads,

        getCurrentContentText,
        setCurrentContentText,

        getIsLoading,
        setIsLoading,

        getNotepadById,
        getShowingNotepad,

        getPageById,
        getPageByPageNumber,
        getPageCount,

        getModifierPromptOfNotepadByNotepadId,
        getChangePromptOfNotepadByNotepadId,

        getAllModifierPrompts,
        getAllChangePrompts,
        getModifierPromptById,
        getChangePromptById,

        handleShelfNotepadClick,
        handlePageChange,
        handleNewNotepadClick,
        handleDeleteNotepadClick,
        handleUpdateNotepadClick,
        handleSaveShowingPageClick,
    };
};

export default useHomeContextValue;
