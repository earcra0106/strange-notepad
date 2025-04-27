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
        } catch (error) {
            console.error("メモ帳の変更に失敗しました:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveShowingPageClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.patch("/home/page", {
                page_id: getShowingPage().id,
                new_written_content: getCurrentContentText(),
                is_changed_by_prompt: false,
            });

            const new_page = response.data;

            setShowingPage((prevPage) => ({
                ...prevPage,
                written_content: new_page.written_content,
                is_changed_by_prompt: new_page.is_changed_by_prompt,
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
                                      is_changed_by_prompt:
                                          new_page.is_changed_by_prompt,
                                  }
                                : page
                        ),
                    };
                })
            );

            console.log("ページの変更に成功しました:", new_page);
        } catch (error) {
            console.error("ページの変更に失敗しました:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAndChangeWithPromptClick = async () => {
        try {
            if (
                !confirm(
                    "魔力をこめて保存しますか？\n\nメモ帳に込められたジュモンで、現在のページの内容が書き換わります。"
                )
            ) {
                return;
            }

            setIsLoading(true);

            // AIに渡すプロンプトを作成
            const prompt =
                "【指示】以下の【ルール】に従い、【メモ本文】を書き換えてください。\n" +
                "【ルール】に従って書き換えた内容だけを出力してください。\n" +
                "【メモ本文】が、【ルール】によって変えられないような内容である場合はそのまま出力してください。例：数字の羅列\n" +
                "\n" +
                "【ルール】\n" +
                "1. " +
                getModifierPromptOfNotepadByNotepadId(
                    getShowingPage().notepad_id
                ).prompt +
                "\n" +
                "2. " +
                getChangePromptOfNotepadByNotepadId(getShowingPage().notepad_id)
                    .prompt +
                "\n" +
                "\n" +
                "【メモ本文】\n" +
                getCurrentContentText();

            console.log("プロンプト:", prompt);

            console.log("プロンプト:", prompt);

            const aiResponse = await axios.post("/api/ai/generate", { prompt });

            const new_changed_content = aiResponse.data.result;

            if (new_changed_content === getShowingPage().written_content) {
                console.log("魔法が不発になりました。");
                return;
            }

            // 変更されたページの内容を保存する
            const saveResponse = await axios.patch("/home/page", {
                page_id: getShowingPage().id,
                new_written_content: getCurrentContentText(),
                new_changed_content: new_changed_content,
                is_changed_by_prompt: true,
            });

            const new_page = saveResponse.data;

            setShowingPage((prevPage) => ({
                ...prevPage,
                written_content: new_page.written_content,
                changed_content: new_page.changed_content,
                is_changed_by_prompt: new_page.is_changed_by_prompt,
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
                                      changed_content: new_page.changed_content,
                                      is_changed_by_prompt:
                                          new_page.is_changed_by_prompt,
                                  }
                                : page
                        ),
                    };
                })
            );
            console.log("ページの変更に成功しました:", new_page);
        } catch (error) {
            console.error("ページの変更に失敗しました:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isNotepadHasChangedPage = (notepad_id) => {
        const notepad = allNotepads.find(
            (notepad) => notepad.id === notepad_id
        );
        if (!notepad) {
            console.error(`Notepad with ID ${notepad_id} not found.`);
            return false;
        }

        return notepad.pages.some((page) => page.is_changed_by_prompt);
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
        handleSaveAndChangeWithPromptClick,

        isNotepadHasChangedPage,
    };
};

export default useHomeContextValue;
