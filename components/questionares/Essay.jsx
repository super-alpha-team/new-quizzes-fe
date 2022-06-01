import React, { useState, useEffect, useRef } from 'react';
// import { Quill } from 'quill';

function Essay() {
    // const [editorState, setEditorState] = useState(
    //     EditorState.createEmpty()
    // );

    // const editor = useRef(null);

    // function focusEditor() {
    //     editor.current.focus();
    // }

    // useEffect(() => {
    //     focusEditor();
    // }, []);

    // const editor = new Quill('#editor', {
    //     modules: { toolbar: '#toolbar' },
    //     theme: 'snow'
    // });

    return (
        <div className='w-full h-full flex items-center'>
            {/* <textarea className='w-full h-5/6 shadow-light border-black border-2 rounded-md focus:outline-none p-2' name="" id="" cols="30" rows="10"></textarea> */}
            <div className='bg-white w-full h-full shadow-dark border-black border-2 rounded-md focus:outline-none p-2'>
                {/* <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={editorState => setEditorState(editorState)}
                    placeholder="Write something!"
                /> */}
                <div id="toolbar">
                    <button className="ql-bold">Bold</button>
                    <button className="ql-italic">Italic</button>
                </div>

                <div id="editor">
                    <p>Hello World!</p>
                </div>
            </div>
        </div>
    );
}

export default Essay;