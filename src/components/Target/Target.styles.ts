import { css } from "@emotion/react";

type Position = {
	x: number;
	y: number;
};

export const targetStyles = (position: Position, size: number) => css`
	&.target {
		position: absolute;
		top: ${position.y}px;
		left: ${position.x}px;
		display: flex;
		width: ${size}px;
		height: ${size}px;
		justify-content: center;
		align-items: center;
		user-select: none;

		img {
			width: 100%;
			animation: 2s 5s linear disappearTarget forwards;
		}

		p {
			font-size: 5rem;
			font-weight: bold;
			color: white;
			font-family: Arial;
			pointer-events: none;
			animation: pointsUp 0.6s linear forwards;
		}
	}

	@keyframes disappearTarget {
		0% {
			transform: scale(1);
		}

		100% {
			transform: scale(0);
		}
	}

	@keyframes pointsUp {
		0% {
			transform: translateY(0);
			color: white;
		}

		60% {
			color: yellow;
		}

		100% {
			transform: translateY(-50px);
			color: orange;
		}
	}
`;
