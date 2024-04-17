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
};

export const Pistol = ({ skewX, isShooting, stopShooting, isReloading, stopReloading }: PistolProps) => {
	const handleImgAnimationEnd = (e: AnimationEvent<HTMLImageElement>) => {
		e.stopPropagation();
		stopShooting();
	};

	return (
		<div className={`pistol ${isReloading ? "reloadAnimation" : ""}`} onAnimationEnd={stopReloading} css={PistolStyles(skewX)}>
			<img className={`pistolSprite ${isShooting ? "shootAnimation" : ""}`} src={isShooting ? pistolShoot : pistol} onAnimationEnd={handleImgAnimationEnd} />
		</div>
	);
};
