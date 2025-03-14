import { useEffect, useState } from "react";

export function Home() {
    const [concerts, setConcerts] = useState<Concert[]>([]);

    type Concert = {
        id: number;
        artist: string;
        startTime: string;
        duration: number;
        canceled: boolean;
    }

    useEffect(() => {
        async function getConcerts() {
            try {
                const response = await fetch("http://localhost:3000/concerts");
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setConcerts(json);
            } catch (error: any) {
                console.error(error.message);
                document.getElementById("home")!.hidden = true;
                document.getElementById("error")!.hidden = false;
                document.getElementById("error")!.innerHTML = error.message;
            }
        }
        getConcerts();
    }, [concerts])

    function handleCancel(id: number): any {
        const element = document.getElementById(id.toString());
        if (element) {
            element.style.backgroundColor = "red";
        } else {
            window.alert(`Element with id ${id} not found`);
        }
    }

    return <>
        <h1 id="error" hidden={true}></h1>
        <div id="home">
            <h3>Concerts:</h3>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>artist</th>
                        <th>start time</th>
                        <th>duration</th>
                    </tr>
                </thead>
                <tbody>
                    {concerts.map((concert) => (
                        <tr key={concert.id} id={concert.id.toString()}>
                            <td>{concert.id}</td>
                            <td>{concert.artist}</td>
                            <td>{concert.startTime}</td>
                            <td>{concert.duration}</td>
                            <td><button onClick={() => {handleCancel(concert.id)}}>Elmarad</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}