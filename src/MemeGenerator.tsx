import { useState, useEffect } from 'react';
import axios from 'axios';

interface Meme {
    id: string;
    name: string;
    url: string;
}

function MemeGenerator() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);

    useEffect(() => {
        const fetchMemes = async () => {
            const response = await axios.get('https://api.imgflip.com/get_memes');
            setMemes(response.data.data.memes);
        };

        fetchMemes();
    }, []);

    const generateMeme = () => {
        const randomIndex = Math.floor(Math.random() * memes.length);
        setCurrentMeme(memes[randomIndex]);
    };

    return (
        <div>
            {currentMeme && (
                <div>
                    <h2>{currentMeme.name}</h2>
                    <img src={currentMeme.url} alt={currentMeme.name} />
                </div>
            )}
            <button onClick={generateMeme}>Generate</button>
        </div>
    );
}

export default MemeGenerator;