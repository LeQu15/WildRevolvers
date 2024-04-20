import { RefObject, useCallback, useEffect, useState } from "react";
import targetIcon from "../../assets/target.png";
import { targetStyles } from "./Target.styles";

type targetProps = {
	targetsContainerRef: RefObject<HTMLDivElement>;
	isReloading: boolean;
	isShooting: boolean;
	setScore: (updateScore: (prevScore: number) => number) => void;
	setTime: (newTime: number) => void;
	time: number;
	gameOver: boolean;
};

export const Target = ({ targetsContainerRef, isReloading, isShooting, setScore, setTime, time, gameOver }: targetProps) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHit, setIsHit] = useState(false);
	const [targetSize, setTargetSize] = useState(100);
	const [visible, setVisible] = useState(true);

	const generateTarget = useCallback(() => {
		setIsHit(false);
		if (targetsContainerRef.current) {
			const size = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
			setTargetSize(size);

			const containerRect = targetsContainerRef.current.getBoundingClientRect();
			const maxX = containerRect.width - size;
			const maxY = containerRect.height - size;
			const randomX = Math.floor(Math.random() * maxX);
			const randomY = Math.floor(Math.random() * maxY);
			setPosition({ x: randomX, y: randomY });
		}
	}, [targetsContainerRef]);

	const hitTargetOnClick = useCallback(() => {
		if (!gameOver) {
			if (!isShooting && !isReloading) {
				setIsHit(true);
				setScore((prevScore: number) => prevScore + 100);
				if (time > 0) {
					let newTime = time + 10;
					if (newTime > 1000) newTime = 1000;
					setTime(newTime);
				}
			}
		}
	}, [isShooting, isReloading, setScore, setTime, time, gameOver]);

	const missedTarget = useCallback(() => {
		setVisible(false);
		if (!gameOver) {
			setTimeout(() => {
				generateTarget();
				setVisible(true);
			}, 300);
		}
	}, [generateTarget, gameOver]);

	useEffect(() => {
		generateTarget();
	}, [generateTarget]);

	return (
		<div className='target' css={targetStyles(position, targetSize)} onClick={hitTargetOnClick}>
			{visible ? (
				!isHit ? (
					<img src={targetIcon} alt='target' onAnimationEnd={missedTarget} draggable={false} />
				) : (
					<p className='hitmarker' onAnimationEnd={generateTarget}>
						+100!
					</p>
				)
			) : (
				""
			)}
		</div>
	);
};
