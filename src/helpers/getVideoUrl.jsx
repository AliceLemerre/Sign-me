export default function getVideoUrl(signVid) {
  return (
    '/assets/' +
    signVid.category + signVid.url +
    '.mp4'
  );
}
