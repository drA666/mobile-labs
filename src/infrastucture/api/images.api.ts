const API_KEY = '19193969-87191e5db266905fe8936d565';
const SERVICE_URL = 'https://pixabay.com/api/';

export const getImagesByReq = async (
  req: string = 'red+cars',
  page: number = 21,
) => {
  try {
    const url = `${SERVICE_URL}?key=${API_KEY}&q=${req}&image_type=photo&per_page=${page}`;
    const resJson = await fetch(url);
    const res = await resJson.json();
    if (!res) throw new Error(res);
    const images = res?.hits?.map((img: any) => img.largeImageURL);
    return images ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
