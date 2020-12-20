import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_RESET,
} from '../constants/uploadImageConstants';

export const uploadImageReducer = (state = { uploading: false }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { uploading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { uploading: false, imagePath: action.payload };
    case UPLOAD_IMAGE_FAIL:
      return { uploading: false, error: action.payload };
    case UPLOAD_IMAGE_RESET:
      return { uploading: false };
    default:
      return state;
  }
};
