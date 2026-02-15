import { useState, useEffect } from "react";

/**
 * A custom hook to automatically save and retrieve form data from localStorage.
 * 
 * @param {string} storageKey - The key to use in localStorage.
 * @param {object} initialValues - The fallback values if no data is found in localStorage.
 * @returns {Array} - [formData, setFormData, clearStorage]
 */
const useFormAutoSave = (storageKey, initialValues) => {
    // Initialize state with data from localStorage or initialValues
    const [formData, setFormData] = useState(() => {
        try {
            const savedData = localStorage.getItem(storageKey);
            return savedData ? JSON.parse(savedData) : initialValues;
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return initialValues;
        }
    });

    // Save to localStorage whenever formData changes
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(formData));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [storageKey, formData]);

    // Function to clear data from localStorage after successful submission
    const clearStorage = () => {
        try {
            localStorage.removeItem(storageKey);
            setFormData(initialValues);
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    };

    return [formData, setFormData, clearStorage];
};

export default useFormAutoSave;
