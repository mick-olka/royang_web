import { useCallback } from 'react';

export const useSmallPopup = () => {
    return useCallback(text => {
        let small_popup = document.getElementById("small_popup");
        small_popup.innerText = text;
        small_popup.style.right = "1px";
        small_popup.style.opacity="1";
        setTimeout(() => {
            small_popup.style.right = "-5rem";
            small_popup.style.opacity="0";
        }, 1000);
    }, []);
};