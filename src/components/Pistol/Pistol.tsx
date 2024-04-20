import pistol from "../../assets/placeholderPistol.png";
import pistolShoot from "../../assets/placeholdershoot.png";
import { PistolStyles } from "./Pistol.styles";
import { AnimationEvent } from "react";

type PistolProps = {
	skewX: number;
	isShooting: boolean;
	stopShooting: () => void;
	isReloading: boolean;
	stopReloading: () => void;
	gameOver: boolean;
};

export const Pistol = ({ skewX, isShooting, stopShooting, isReloading, stopReloading, gameOver }: PistolProps) => {
	const handleImgAnimationEnd = (e: AnimationEvent<HTMLImageElement>) => {
		e.stopPropagation();
		stopShooting();
	};

	return (
		<div className={`pistol ${isReloading ? "reloadAnimation" : ""} ${gameOver ? "hidePistol" : ""}`} onAnimationEnd={stopReloading} css={PistolStyles(skewX)}>
			<img className={`pistolSprite ${isShooting ? "shootAnimation" : ""}`} draggable={false} src={isShooting ? pistolShoot : pistol} onAnimationEnd={handleImgAnimationEnd} />
		</div>
	);
};
