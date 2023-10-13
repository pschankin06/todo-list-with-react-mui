import { useEffect } from "react";

export default function useLocalStorage(itemNameString, itemName) {
    useEffect(() => {
        localStorage.setItem(itemNameString, JSON.stringify(itemName));
    }, [itemNameString, itemName]);
}