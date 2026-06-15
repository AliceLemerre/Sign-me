import { useState, useEffect, useCallback } from 'react';
import {sign} from '../../components/signList';
import Navbar from '../navbar/Navbar';
 
const QUESTIONS_PER_ROUND = 8;
const OPTIONS_COUNT = 4;
 
function getVideoUrl(s) {
  return `/assets/${s.category}${s.url}.mp4`;
}
 
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
 
const usableSigns = sign.filter(s => typeof s.word === 'string' && s.word.trim() !== '');
 
function buildQuestions(mode) {
  const pool = shuffle(usableSigns).slice(0, QUESTIONS_PER_ROUND);
  return pool.map(correct => {
    const distractors = shuffle(usableSigns.filter(s => s.id !== correct.id)).slice(0, OPTIONS_COUNT - 1);
    const options = shuffle([correct, ...distractors]);
    return { correct, options };
  });
}
 
function ModeSelect({ onSelect }) {
  return (
    <div className="page-content">
      <h2>Formation</h2>
      <p>Choisissez un exercice pour commencer</p>
 
      <div className="exercices-cards">
        <button className="exercice-card" onClick={() => onSelect('video-to-word')}>
          <div>
            <span className="exercice-mode-card-title">Vidéo → Mot</span>
            <span className="exercice-mode-card-desc">Regardez le signe, trouvez le mot qui correspond</span>
          </div>
        </button>
 
        <button className="exercice-card" onClick={() => onSelect('word-to-video')}>
          <div>
            <span className="exercice-mode-card-title">Mot → Vidéo</span>
            <span className="exercice-mode-card-desc">Lisez le mot, trouvez la vidéo correspondante</span>
          </div>
        </button>
      </div>
    </div>
  );
}
 

//Ex1
function VideoToWord({ questions, onFinish }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
 
  const q = questions[idx];
  const answered = selected !== null;
  const isCorrect = selected === q.correct.id;
 
  function handleSelect(opt) {
    if (answered) return;
    setSelected(opt.id);
    if (opt.id === q.correct.id) setScore(s => s + 1);
  }
 
  function next() {
    if (idx + 1 >= questions.length) {
      onFinish(score + (isCorrect ? 1 : 0));
    } else {
      setIdx(i => i + 1);
      setSelected(null);
    }
  }
 
  return (
    <div className="page-content">
 
      <div className="exercice-question-label">Quel mot correspond à ce signe ?</div>
 
      <div className="exercice-video-stage">
        <video
          key={q.correct.id}
          className=" exercice-vid exercice-video"
          autoPlay
          loop
          playsInline
          muted={false}
        >
          <source src={getVideoUrl(q.correct)} type="video/mp4" />
        </video>
      </div>
 
      <div className="exercice-options exercice-options-words">
        {q.options.map(opt => {
          let cls = 'exercice-option exercice-option-word';
          if (answered) {
            if (opt.id === q.correct.id) cls += ' correct';
            else if (opt.id === selected) cls += ' wrong';
            else cls += ' dimmed';
          }
          return (
            <button key={opt.id} className={cls} onClick={() => handleSelect(opt)}>
              {opt.word}
            </button>
          );
        })}
      </div>
 
      {answered && (
        <div className={`exercice-feedback ${isCorrect ? 'exercice-feedback-ok' : 'exercice-feedback-err'}`}>
          {isCorrect ? 'Correct !' : ` Réponse : ${q.correct.word}`}
          <button className="exercice-btn exercice-next-btn" onClick={next}>
            {idx + 1 >= questions.length ? 'voir les résultats' : 'suivant'}
          </button>
        </div>
      )}
    </div>
  );
}
 
//Ex 2
function WordToVideo({ questions, onFinish }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
 
  const q = questions[idx];
  const answered = selected !== null;
  const isCorrect = selected === q.correct.id;
 
  function handleSelect(opt) {
    if (answered) return;
    setSelected(opt.id);
    if (opt.id === q.correct.id) setScore(s => s + 1);
  }
 
  function next() {
    if (idx + 1 >= questions.length) {
      onFinish(score + (isCorrect ? 1 : 0));
    } else {
      setIdx(i => i + 1);
      setSelected(null);
    }
  }
 
  return (
    <div className="page-content">
      <div className="exercice-quiz">
 
      <div className="exercice-question-label">Quelle vidéo correspond à ce mot ?</div>
 
      <div>
        <span>{q.correct.word}</span>
      </div>
 
      <div className="exercice-options exercice-options-videos">
        {q.options.map(opt => {
          let cls = 'exercice-option exercice-option-video';
          if (answered) {
            if (opt.id === q.correct.id) cls += ' correct';
            else if (opt.id === selected) cls += ' wrong';
            else cls += ' dimmed';
          }
          return (
            <button key={opt.id} className={cls} onClick={() => handleSelect(opt)}>
              <video
                key={opt.id + '-' + idx}
                className="exercice-video"
                autoPlay
                loop
                playsInline
                muted
              >
                <source src={getVideoUrl(opt)} type="video/mp4" />
              </video>
              {answered && opt.id === q.correct.id && (
                <span className="exercice-video-label ">{opt.word}</span>
              )}
            </button>
          );
        })}
      </div>
 
      {answered && (
        <div className={`exercice-feedback ${isCorrect ? 'exercice-feedback-ok' : 'exercice-feedback-err'}`}>
          {isCorrect ? 'Correct !' : `Réponse : ${q.correct.word}`}
          <button className="exercice-next-btn" onClick={next}>
            {idx + 1 >= questions.length ? 'Voir les résultats' : 'Question suivante'}
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
 
function Results({ score, total, mode, onRestart, onBack }) {
  const pct = Math.round((score / total) * 100);
  const msg = pct >= 80 ? 'Parfait !' : pct >= 50 ? 'Bien joué !' : 'Continue à t\'entraîner !';
 
  return (
    <div className="page-content">
      <div className="exercice-results-msg">{msg}</div>
      <div className="exercice-results-score">
        <span className="exercice-results-num">{score}</span>
        <span className="exercice-results-den">/ {total}</span>
      </div>
      {/* <div className="exercice-results-pct">{pct}% de réussite</div>
      <div className="exercice-results-bar">
        <div className="exercice-results-bar-fill" style={{ width: `${pct}%` }} />
      </div> */}
      <div className="exercice-results-actions">
        <button className="exercice-btn exercice-btn-primary" onClick={onRestart}>Recommencer</button>
        <button className="exercice-btn exercice-btn-ghost" onClick={onBack}>Changer d'exercice</button>
      </div>
    </div>
  );
}
 

export default function ExercisePage() {
  const [screen, setScreen] = useState('select'); 
  const [mode, setMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
 
  function startMode(m) {
    setMode(m);
    setQuestions(buildQuestions(m));
    setScreen('quiz');
  }
 
  function handleFinish(score) {
    setFinalScore(score);
    setScreen('results');
  }
 
  function handleRestart() {
    setQuestions(buildQuestions(mode));
    setScreen('quiz');
  }
 
  return (

    <div className="root">
        <Navbar/>

      {screen === 'select' && <ModeSelect onSelect={startMode} />}
 
      {screen === 'quiz' && mode === 'video-to-word' && (
        <VideoToWord
          key={questions[0]?.correct.id}
          questions={questions}
          onFinish={handleFinish}
        />
      )}
 
      {screen === 'quiz' && mode === 'word-to-video' && (
        <WordToVideo
          key={questions[0]?.correct.id}
          questions={questions}
          onFinish={handleFinish}
        />
      )}
 
      {screen === 'results' && (
        <Results
          score={finalScore}
          total={QUESTIONS_PER_ROUND}
          mode={mode}
          onRestart={handleRestart}
          onBack={() => setScreen('select')}
        />
      )}
    </div>
  );
}
