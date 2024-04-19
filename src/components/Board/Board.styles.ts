import { css } from "@emotion/react";
import crosshair from "../../assets/crosshair3.png";
import background from "../../assets/placeholderBgc.png";

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
		user-select: none;

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
			width: 95%;
			height: 75%;
		}
	}
`;
