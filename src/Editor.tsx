import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading } from '@ckeditor/ckeditor5-heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

const editorConfiguration = {
  plugins: [Essentials, Paragraph, Heading, Alignment],
  toolbar: ['heading', '|', 'alignment'],
  alignment: {
    options: ['left', 'right', 'center', 'justify']
  }
};

const Editor = () => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={'hello!'}
        onReady={editor => {
          console.log('Editor is Ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus', editor);
        }}
        config={editorConfiguration}
      />
    </div>
  );
};

export default Editor;
