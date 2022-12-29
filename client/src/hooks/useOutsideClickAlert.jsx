import { useEffect, useRef } from 'react'

export const useOutsideClickAlert = (onClickOutside) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) onClickOutside();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref]);

  return {ref};
}
