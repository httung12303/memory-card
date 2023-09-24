export default function Restart({ onRestart, onCancel, score, bestScore }) {
  return (
    <div className="restart">
      <div>Score: <span>{score}</span></div>
      <div>Best score: <span>{bestScore}</span></div>
      <div className="btn-container">
        <button className='restart-btn' type="button" onClick={onRestart}>
          Restart
        </button>
        <button className='cancel-btn' type="button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
