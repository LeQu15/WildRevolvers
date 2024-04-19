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
