import { css } from "@emotion/react";
import crosshair from "../../assets/crosshair9.png";
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
		flex-direction: column;
		user-select: none;

		& .gameFooter {
			width: 100%;
			height: 5rem;
		}

		& .header {
			width: 100%;
			height: 4rem;

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

			& > .targets {
				width: 95%;
				height: 90%;
				position: relative;
			}
		}
	}
`;
