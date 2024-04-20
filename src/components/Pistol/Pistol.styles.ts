import { css } from "@emotion/react";

export const PistolStyles = (skewX: number) => css`
	&.pistol {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) skewX(${skewX * -1}deg);
		transformorigin: "bottom center";
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		pointer-events: none;

		&.hidePistol {
			animation: 3s linear hide forwards;
		}
		&.reloadAnimation {
			animation: 0.5s linear reload;
		}

		& .pistolSprite {
			width: 70%;
			height: 70%;
		}

		& img.shootAnimation {
			animation: 0.1s linear shot;
		}
	}

	@keyframes reload {
		0% {
			bottom: 0;
		}

		50% {
			bottom: -200%;
		}

		100% {
			bottom: 0;
		}
	}

	@keyframes hide {
		0% {
			bottom: 0;
		}

		100% {
			bottom: -200%;
		}
	}

	@keyframes shot {
	}
`;
