// Usage:
// <Button
// onContextMenu={(e) =>
//   handleRightClick(e, () => console.log("right click"))
// }
// >

export const handleRightClick = (e: React.MouseEvent, callback: () => void) => {
  e.preventDefault();
  callback();
};
