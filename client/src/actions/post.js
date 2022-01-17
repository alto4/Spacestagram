import axios from 'axios';
import { UPDATE_LIKES } from './types';

export const addLike = (date) => async (dispatch) => {
  try {
    const res = await axios.put(`api/users/like/${date}`);
    alert('adding like for date ', date);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: res.data.likedPhotos,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const removeLike = (date) => async (dispatch) => {
  try {
    const res = await axios.put(`api/users/unlike/${date}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: res.data.likedPhotos,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};
