import './AnimatedTitle.css';

function AnimatedTitle() {
  return (
    <div className="animated-title-container">
      <p className="main-title">Publicaciones</p>
      <div className="animated-title-line">
        <span className="bracket">[</span>
        <div className="word-rotator">
          <ul>
            <li>Tecnis</li>
            <li>Visuals</li>
            <li>Comments</li>
          </ul>
        </div>
        <span className="bracket">]</span>
      </div>
    </div>
  );
}

export default AnimatedTitle;
