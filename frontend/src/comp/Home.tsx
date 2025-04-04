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

    useEffect(() => {

        getConcerts();
    }, [])

    const handleCancel = async (id: number): Promise<any> => {
            try {
                const response = await fetch(`http://localhost:3000/concerts/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ canceled: true }),
                });
                if (response.ok) {
                    await getConcerts();
                    /*const newConcerts = Array.from(concerts);
                    const concertIdx = concerts.findIndex(c => c.id == id);
                    const concert = { ...concerts[concertIdx] }
                    concert.canceled = true;
        
                    newConcerts[concertIdx] = concert;

                    setConcerts(newConcerts);
                    */

                } else {
                    window.alert("Error submitting form");
                }
            } catch (error: any) {
                console.error("Error submitting form:", error);
                window.alert("Error submitting form:" + error.message);
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
                        <tr key={concert.id} id={concert.id.toString()} style={{ backgroundColor: concert.canceled ? 'red' : 'transparent' }}>
                            <td>{concert.id}</td>
                            <td>{concert.artist}</td>
                            <td>{concert.startTime}</td>
                            <td>{concert.duration}</td>
                            <td><button id={"button" + concert.id.toString()} onClick={() => { handleCancel(concert.id) }} disabled={concert.canceled}>Elmarad</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}