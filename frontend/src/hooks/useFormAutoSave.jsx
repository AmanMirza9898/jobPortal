import { useState, useEffect, useRef } from "react";

/**
 * A robust custom hook to save and retrieve form data from localStorage.
 * Automatically filters out non-serializable objects (File, Blob).
 * 
 * @param {string} storageKey - The key to use in localStorage.
 * @param {object} initialValues - The fallback values if no data is found.
 */
const useFormAutoSave = (storageKey, initialValues) => {
    // Initial load from localStorage
    const [formData, setFormData] = useState(() => {
        try {
            const savedData = localStorage.getItem(storageKey);
            if (!savedData) return initialValues;

            const parsedData = JSON.parse(savedData);
            // Merge with initialValues so that fields we couldn't save (files) are restored to default
            return { ...initialValues, ...parsedData };
        } catch (error) {
            console.error("Error loading auto-save data:", error);
            return initialValues;
        }
    });

    // Save to localStorage whenever formData changes
    useEffect(() => {
        const saveTimer = setTimeout(() => {
            try {
                // Strip non-serializable data (Files and Blobs)
                const cleanData = {};
                Object.keys(formData).forEach(key => {
                    const value = formData[key];
                    // We only save strings, numbers, booleans, and plain objects/arrays
                    if (!(value instanceof File) && !(value instanceof Blob)) {
                        cleanData[key] = value;
                    }
                });

                localStorage.setItem(storageKey, JSON.stringify(cleanData));
            } catch (error) {
                console.error("Auto-save failed:", error);
            }
        }, 500); // Debounce save to reduce disk writes

        return () => clearTimeout(saveTimer);
    }, [storageKey, formData]);

    // Cleanup function
    const clearStorage = () => {
        try {
            localStorage.removeItem(storageKey);
            setFormData(initialValues);
        } catch (error) {
            console.error("Error clearing auto-save data:", error);
        }
    };

    return [formData, setFormData, clearStorage];
};

export default useFormAutoSave;
