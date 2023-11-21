import * as React from "react";
import {
    Editor, EditorChangeEvent, EditorTools
} from '@progress/kendo-react-editor'
import styles from "./TextEditor.module.scss";
import '@progress/kendo-theme-default/dist/all.css';

const {
    Bold,
    Italic,
    Underline,
    FontName,
    AlignCenter,
    AlignRight,
    AlignLeft,
    AlignJustify,
    Undo,
    Redo,
    FontSize,
    InsertTable,
} = EditorTools;

interface TextEditorProps {
    editorKey: string,
    handleSendContext: (data: string, key?: string) => void;
    content?: string
}

// TextEditorProps
// { content, handleSendContext }
export const TextEditor: React.FC<TextEditorProps> = ({ handleSendContext, editorKey, content }) => {
    const handleOnchange = (event: EditorChangeEvent) => {
        handleSendContext(event.html, editorKey)
    }

    return (
        <Editor
            tools={[
                FontName,
                FontSize,
                [Bold, Italic, Underline],
                [AlignCenter, AlignRight, AlignLeft, AlignJustify],
                [Undo, Redo],
                InsertTable
            ]}
            className={styles.mainTextEditor}
            defaultContent={content}
            onChange={handleOnchange}
        />
    );
};
