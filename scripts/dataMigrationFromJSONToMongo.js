let photosData = require('../resources/JSON/photos.json');
let photographersData = require('../resources/JSON/photographer.json');

const END_POINT_PHOTOS = 'http://localhost:3000/api/v1/photos';
const END_POINT_PHOTOGRAPHERS = 'http://localhost:3000/api/v1/photographers';

const sendReq = (data, END_POINT) => {
  return fetch(END_POINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const addPhotos = async () => {
  const reqs = [];
  photosData = photosData.map(
    (
      {
        title,
        avgColor,
        photographerId,
        imageMediumSize,
        imageOrignalSize,
        imageLargeSize,
      },
      i
    ) => ({
      id: i,
      title,
      avgColor,
      photographerId,
      size: {
        md: imageMediumSize,
        lg: imageLargeSize,
        or: imageOrignalSize,
      },
    })
  );

  photosData.forEach(async (d, i) => {
    reqs.push(sendReq(d, END_POINT_PHOTOS));
  });

  return Promise.all(reqs)
    .then(() => {
      console.log('Done photosData');
    })
    .catch((err) => {
      console.log(err);
    });
};

const addPhotographers = async () => {
  const reqs = [];
  photographersData = photographersData.map(
    ({ photographerName, photographerId, photographerProfile }) => ({
      name: photographerName,
      id: photographerId,
      profileLink: photographerProfile,
    })
  );

  photographersData.forEach(async (d, i) => {
    reqs.push(sendReq(d, END_POINT_PHOTOGRAPHERS));
  });

  return Promise.all(reqs)
    .then(() => {
      console.log('Done photographersData');
    })
    .catch((err) => {
      console.log(err);
    });
};

const init = async () => {
  await addPhotos();
  // await addPhotographers();

  console.log('Migration Done');
};

init();
