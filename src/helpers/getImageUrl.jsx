
export default function getImageUrl(signImg) {
  return (
    '/assets/' +
    signImg.category + signImg.url +
    '.svg'
  );
}
