import { css } from "@emotion/react";
import crosshair from "../../assets/crosshair.png";
import background from "../../assets/placeholderBgc.png";

export const TimerStyles = (width: number) => css`
	&.timer {
		width: 50%;
		height: 1rem;
		background-color: black;
		border-radius: 300px;
		border: 2px solid black;

		& .timerFiller {
			width: ${width}%;
			height: 100%;
			background-color: yellow;
			border-radius: 300px;
			transition: 0.1s;
			max-width: 100%;
		}
	}
`;

export const BoardStyles = () => css`
	&.game {
		width: 100svw;
		height: 100svh;
		overflow: hidden;
		cursor: url(${crosshair}), auto;
		background: url(${background});
		background-size: cover;
		background-position: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		user-select: none;

		& .gameFooter {
			width: 100%;
			height: 5rem;
		}

		& .header {
			width: 100%;
			height: 4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: relative;

			& .noAmmoInfo {
				color: red;
				font-weight: bold;
				font-family: Arial;
				font-size: 1.5rem;
				margin-top: 4rem;
				position: absolute;
				animation: noAmmo 2s infinite linear;
			}

			& .score {
				font-weight: bold;
				color: white;
				font-size: 2rem;
				position: fixed;
				right: 2rem;
				top: 1rem;
				font-family: Arial;
			}
		}

		& .ammoCount {
			position: fixed;
			bottom: 1rem;
			right: 2rem;
			font-family: "Arial";
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			font-size: 3rem;
			color: white;
			font-weight: bold;

			& > i {
				color: yellow;
			}
		}

		& .board {
			width: 100%;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			& .gameOver {
				position: fixed;
				width: 100%;
				height: 30%;
				background-color: rgba(0, 0, 0, 0.5);
				color: white;
				font-family: Arial;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
				font-size: 8rem;
				z-index: 3;
				animation: gameOverAnimation 1s linear forwards;
			}

			& > .targets {
				width: 95%;
				height: 90%;
				position: relative;
			}
		}
	}

	@keyframes noAmmo {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes gameOverAnimation {
		0% {
			opacity: 0;
			transform: translateY(50px);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;
