import axios from 'axios';
const KEY = '19008489-eef4c530baed43ae206c47500';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export const searchPhotos = async (q, page) => {
  const options = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const res = await axios.get(
      `${BASE_URL}/?key=${KEY}&q=${q}&image_type='photo'&orientation='horizontal'&safesearch='true'&per_page=${PER_PAGE}&page=${page}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
