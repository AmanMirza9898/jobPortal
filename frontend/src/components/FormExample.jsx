import React from "react";
import useFormAutoSave from "../hooks/useFormAutoSave";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const FormExample = () => {
    // Initial state for the form
    const initialValues = {
        name: "",
        email: "",
        jobTitle: ""
    };

    // Use the custom hook
    const [formData, setFormData, clearStorage] = useFormAutoSave("job-application-form", initialValues);

    // Handle input change
    const changeEventHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);

        // Simulating API call
        alert("Form submitted successfully! Local storage will be cleared.");

        // Clear storage after successful submission
        clearStorage();
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-[#6A38C2]">Job Application</h2>
            <p className="text-sm text-gray-500 mb-6">Your progress is automatically saved as you type!</p>

            <form onSubmit={submitHandler} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={changeEventHandler}
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={changeEventHandler}
                        placeholder="john@example.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={changeEventHandler}
                        placeholder="Frontend Developer"
                        required
                    />
                </div>

                <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                    Submit Application
                </Button>
            </form>

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg text-xs font-mono text-purple-700 dark:text-purple-300">
                <strong>Current State (JSON):</strong>
                <pre className="mt-2 text-wrap">{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    );
};

export default FormExample;
