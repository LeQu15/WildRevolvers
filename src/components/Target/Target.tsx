import { RefObject, useCallback, useEffect, useState } from "react";
import targetIcon from "../../assets/target.png";
import { targetStyles } from "./Target.styles";

type targetProps = {
	targetsContainerRef: RefObject<HTMLDivElement>;
	isReloading: boolean;
	isShooting: boolean;
};

export const Target = ({ targetsContainerRef, isReloading, isShooting }: targetProps) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHit, setIsHit] = useState(false);
	const [targetSize, setTargetSize] = useState(100);

	const generateTarget = useCallback(() => {
		setIsHit(false);
		if (targetsContainerRef.current) {
			const size = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
			setTargetSize(size);

			const containerRect = targetsContainerRef.current.getBoundingClientRect();
			const maxX = containerRect.width - targetSize;
			const maxY = containerRect.height - targetSize;
			const randomX = Math.floor(Math.random() * maxX);
			const randomY = Math.floor(Math.random() * maxY);
			setPosition({ x: randomX, y: randomY });
		}
	}, [targetsContainerRef]);

	const hitTargetOnClick = useCallback(() => {
		if (!isShooting && !isReloading) setIsHit(true);
	}, [isShooting, isReloading]);

	useEffect(() => {
		generateTarget();
	}, []);

	return (
		<div className='target' css={targetStyles(position, targetSize)}>
			{!isHit ? (
				<img src={targetIcon} alt='target' onClick={hitTargetOnClick} draggable={false} />
			) : (
				<p className='hitmarker' onAnimationEnd={generateTarget}>
					+100!
				</p>
			)}
		</div>
	);
};
