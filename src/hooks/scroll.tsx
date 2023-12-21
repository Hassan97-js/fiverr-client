// import { useEffect, useState } from "react";

// import { isActive } from "../utils";

// export const useScroll = () => {
//   const [active, setActive] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       isActive(setActive);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [active]);

//   return [active];
// };
