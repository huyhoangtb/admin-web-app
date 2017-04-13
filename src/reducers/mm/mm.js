/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import {
  MM_SWITCH_VIEW_TYPE,
  MM_ON_DATA_LOADED,
  MM_ADD_FOLDER,
  MM_MEDIA_ITEM_STATUS,
  MM_OPEN_DIALOG,
  MM_VIEW_DETAIL,
  MM_PUSH_QUILL
} from "components/media/actions";

const mmInitialState = {
  listView: true,
  gridView: false,
  mediaDB: {
    presentId: 0,
    roots: [],
    currentNode: {},
    currentRoot: {},
    data: []
  },
  isAddingFolder: false,
  mediaMenuContextState: false,
  openMediaDialog: false,
  viewDetailMedia: {
    viewing: false,
    data: {},
  },
  currentRichText: {}, // current quill push from action view detail
  path: []
};

export const MM = (state = mmInitialState, action) => {
  let newState = {};
  switch (action.type) {

    case MM_SWITCH_VIEW_TYPE:
      newState = {
        ...state,
        listView: action.listView,
        gridView: !action.listView
      }
      break;
    case MM_ON_DATA_LOADED:
      newState = {
        ...state,
        mediaDB: action.mediaDB
      }
      break;
    case MM_ADD_FOLDER:
      newState = {
        ...state,
        isAddingFolder: action.isAddingFolder
      }
      break;
    case MM_MEDIA_ITEM_STATUS:
      newState = {
        ...state,
        mediaMenuContextState: action.mediaMenuContextState
      }
      break;
    case MM_OPEN_DIALOG:
      newState = {
        ...state,
        openMediaDialog: action.openMediaDialog
      }
      break;
    case MM_VIEW_DETAIL:
      newState = {
        ...state,
        openMediaDialog: false,
        viewDetailMedia: action.viewDetailMedia

      }
      break;
    case MM_PUSH_QUILL:
      newState = {
        ...state,
        currentRichText: {
          quillJs: action.quillJs,
          selection: action.selection
        }
      }

      break;
    default:
      return state;

  }
  return newState
};