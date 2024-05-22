import { useState, useEffect } from "react";
import Logo from "./components/Logo";
import "./App.css";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(useGSAP);

export default function TriviaGame() {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [logoSize, setLogoSize] = useState("200px");

	const shuffleOptions = (options) => {
		return options.sort(() => Math.random() - 0.5);
	};

	const fetchQuestions = async () => {
		try {
			const response = await fetch(
				"https://the-trivia-api.com/v2/questions"
			);
			const data = await response.json();
			setQuestions(data);
			setCurrentQuestionIndex(null);
			setScore(0);
			setGameOver(false);
			setGameStarted(false);
			console.log(data);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	const nextLogoSize = (size) => {
		setLogoSize(size);
	};

	useEffect(() => {
		fetchQuestions();
	}, []);

	const handleAnswer = (answer) => {
		const currentQuestion = questions[currentQuestionIndex];
		if (answer === currentQuestion.correctAnswer) {
			setScore(score + 1);
		}
		setCurrentQuestionIndex(currentQuestionIndex + 1);
		if (currentQuestionIndex === questions.length - 1) {
			setGameOver(true);
		}
	};

	const startGame = () => {
		setGameStarted(true);
		setCurrentQuestionIndex(0);
		// nextLogoSize("200px");
	};

	const restartGame = () => {
		fetchQuestions();
		nextLogoSize("200px");
	};

	const renderEndGame = () => {
		return (
			<div>
				<h1>Game Over!</h1>
				<p>Your final score is: {score}</p>
				<button className="button-start" onClick={restartGame}>
					Restart Game
				</button>
			</div>
		);
	};

	const gameBeginning = () => {
		return (
			<div>
				<h1>Welcome to Trivia!</h1>
				<button className="button-start" onClick={startGame}>
					Start
				</button>
			</div>
		);
	};

	const renderQuestion = () => {
		if (questions.length === 0) {
			return <p>Loading question...</p>;
		}
		const currentQuestion = questions[currentQuestionIndex];
		return (
			<div>
				<h2>{currentQuestion.question.text}</h2>
				<div className="button-answers">
					{shuffleOptions([
						currentQuestion.correctAnswer,
						...currentQuestion.incorrectAnswers,
					]).map((option, index) => (
						<button
							key={index}
							onClick={() => handleAnswer(option)}
						>
							{option}
						</button>
					))}
				</div>
				<div className="details">
					<div className="score">Current score: {score}</div>
					<div className="question-number">
						Question {currentQuestionIndex + 1} of{" "}
						{questions.length}
					</div>
				</div>
			</div>
		);
	};

	const renderGame = () => {
		return (
			<div className="container">
				<Logo size={logoSize} />
				<div className="content">
					{gameStarted
						? gameOver
							? renderEndGame()
							: renderQuestion()
						: gameBeginning()}
				</div>
			</div>
		);
	};

	return renderGame();
}
