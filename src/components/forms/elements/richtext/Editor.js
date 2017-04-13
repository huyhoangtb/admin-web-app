/**
 * Created by Peter Hoang Nguyen on 4/10/2017.
 */
import {Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
import React from 'react';

const {hasCommandModifier} = KeyBindingUtil;

function myKeyBindingFn(e) {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'myeditor-save';
  }
  return getDefaultKeyBinding(e);
}

class MyEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    if (command === 'myeditor-save') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={(command) => {
          console.log(command);
          {/*this.handleKeyCommand(command);*/
          }
        }}
        onChange={this.onChange}
        keyBindingFn={myKeyBindingFn}
      />
    );
  }
}

export default MyEditor;