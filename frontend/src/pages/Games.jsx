import React, { useState, useEffect } from 'react';
import './Games.css';

// Pre-define the list of images
// We have 5 AI images and 5 Real images based on the file listing
const GAME_IMAGES = [
    { id: 'ai-1', src: '/Games_AIGC_1.png', type: 'AI' },
    { id: 'ai-2', src: '/Games_AIGC_2.png', type: 'AI' },
    { id: 'ai-3', src: '/Games_AIGC_3.png', type: 'AI' },
    { id: 'ai-4', src: '/Games_AIGC_4.png', type: 'AI' },
    { id: 'ai-5', src: '/Games_AIGC_5.png', type: 'AI' },
    { id: 'real-1', src: '/Games_Real_1.png', type: 'Real' },
    { id: 'real-2', src: '/Games_Real_2.png', type: 'Real' },
    { id: 'real-3', src: '/Games_Real_3.png', type: 'Real' },
    { id: 'real-4', src: '/Games_Real_4.png', type: 'Real' },
    { id: 'real-5', src: '/Games_Real_5.png', type: 'Real' },
];

const Games = () => {
    const [currentImage, setCurrentImage] = useState(null);
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'guessed'
    const [result, setResult] = useState(null); // 'correct', 'incorrect'

    // Initialize first image on mount
    useEffect(() => {
        loadNewImage();
    }, []);

    const loadNewImage = () => {
        const randomIndex = Math.floor(Math.random() * GAME_IMAGES.length);
        setCurrentImage(GAME_IMAGES[randomIndex]);
        setGameState('waiting');
        setResult(null);
    };

    const handleGuess = (guess) => {
        if (gameState !== 'waiting') return;

        if (guess === currentImage.type) {
            setResult('correct');
        } else {
            setResult('incorrect');
        }
        setGameState('guessed');
    };

    if (!currentImage) return <div className="text-center p-10">Loading game...</div>;

    return (
        <section className="games-section">
            <div className="game-container">
                <h2 className="game-title">AI vs Real</h2>

                <div className={`image-wrapper ${result ? result : ''}`}>
                    <img
                        src={currentImage.src}
                        alt="Guess if this is AI or Real"
                        draggable="false"
                    />

                    {result === 'correct' && (
                        <div className="feedback-overlay icon-check">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                        </div>
                    )}

                    {result === 'incorrect' && (
                        <div className="feedback-overlay icon-cross">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="buttons-container">
                    <button
                        className="game-btn btn-ai"
                        onClick={() => handleGuess('AI')}
                        disabled={gameState !== 'waiting'}
                        style={{ opacity: gameState === 'guessed' ? 0.6 : 1 }}
                    >
                        AI
                    </button>
                    <button
                        className="game-btn btn-real"
                        onClick={() => handleGuess('Real')}
                        disabled={gameState !== 'waiting'}
                        style={{ opacity: gameState === 'guessed' ? 0.6 : 1 }}
                    >
                        Real
                    </button>
                </div>

                <div className="next-btn-container">
                    {gameState === 'guessed' && (
                        <button className="btn-next" onClick={loadNewImage}>
                            Next Round &rarr;
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Games;
