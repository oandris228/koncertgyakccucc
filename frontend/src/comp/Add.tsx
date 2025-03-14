import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Add() {

    const navigate = useNavigate()

    type FormData = {
        artist: string;
        startTime: string;
        duration: string;
    }

    const [formData, setFormData] = useState<FormData>({
        artist: "",
        startTime: "",
        duration: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value.toString(),
        }));
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/concerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate('/');
            } else {
                window.alert("Error submitting form");
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            window.alert("Error submitting form:" + error.message);
        }
    };

    return <>
        <form id="add">
            <label htmlFor="artist">Artist</label>
            <input type="text" name="artist" onChange={(e) => { handleChange(e) }} />
            <label htmlFor="startTime">Start Time</label>
            <input type="date" name="startTime" onChange={(e) => { handleChange(e) }} />
            <label htmlFor="duration">Duration</label>
            <input type="number" name="duration" onChange={(e) => { handleChange(e) }} />
            <button onClick={(e) => handleSubmit(e)}>Send</button>
        </form>
    </>

}