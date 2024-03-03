
import { Board,  UpcomingBlocks } from './components';
import useTetris from './hooks/useTetriz/useTetriz';



const App = () => {
  const { board, startGame, isPlaying, score, upcomingBlocks } = useTetris();

  return (
    <div className="app">
      <h1>Tetris</h1>
      <Board currentBoard={board} />
      <div className="controls">
        <h2>Score: {score}</h2>
        {isPlaying ? (
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
        ) : (
          <button onClick={startGame}>New Game</button>
        )}
      </div>
    </div>
  );
}

export default App

/*


function App() {
 
}

export default App;
*/