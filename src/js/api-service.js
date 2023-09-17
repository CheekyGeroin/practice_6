import axios from 'axios';
const KEY = '19008489-eef4c530baed43ae206c47500';
const BASE_URL = 'https://pixabay.com/api/';

export const searchPhotos = async q => {
  const options = {
    key: KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const res = await axios.get(`${BASE_URL}`, options);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  return res;
};
