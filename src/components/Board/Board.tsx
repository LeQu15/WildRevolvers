import { Pistol } from "../Pistol/Pistol";
import { BoardStyles, TimerStyles } from "./Board.styles";
import { useState, useRef, useEffect, useCallback } from "react";
import { Howl } from "howler";
import shotSound from "../../assets/sounds/pistol-shot.mp3";
import reloadSound from "../../assets/sounds/reload.mp3";
import { Target } from "../Target/Target";

export const Board = () => {
	const [skewX, setSkewX] = useState(0);
	const [isShooting, setIsShooting] = useState(false);
	const [ammo, setAmmo] = useState(6);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(1000);
	const [isReloading, setIsReloading] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const boardRef = useRef<HTMLDivElement>(null);
	const targetsContainerRef = useRef<HTMLDivElement>(null);

	const reload = useCallback(() => {
		setIsReloading(true);
		const sound = new Howl({
			src: reloadSound,
		});
		setTimeout(() => {
			sound.play();
		}, 270);
	}, []);

	const stopReloading = useCallback(() => {
		if (!gameOver) {
			setIsReloading(false);
			setIsShooting(false);
			setAmmo(6);
		}
	}, [gameOver]);

	const pistolShoot = useCallback(() => {
		if (ammo > 0)
			if (!isShooting && !isReloading) {
				setIsShooting(true);
				const newAmmoCount = ammo - 1;
				if (newAmmoCount >= 0) {
					setAmmo(newAmmoCount);
					const sound = new Howl({
						src: shotSound,
					});
					sound.play();
				}
			}
	}, [ammo, isShooting, isReloading]);

	const stopShooting = useCallback(() => {
		setIsShooting(false);
		if (ammo <= 0 && time <= 0) {
			setGameOver(true);
		}
		if (ammo === 0 && time > 0) {
			reload();
		}
	}, [ammo, reload, time]);

	useEffect(() => {
		const updatePistolRotation = (e: MouseEvent) => {
			if (!boardRef.current) return;

			const boardRect = boardRef.current.getBoundingClientRect();
			const pistolCenterX = boardRect.left + boardRect.width / 2;

			const deltaX = e.clientX - pistolCenterX;

			const maxSkew = 35;
			const skewFactor = 0.1;
			const newSkewX = Math.min(Math.max(deltaX * skewFactor, -maxSkew), maxSkew);

			setSkewX(newSkewX);
		};

		document.addEventListener("mousemove", updatePistolRotation);

		return () => {
			document.removeEventListener("mousemove", updatePistolRotation);
		};
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			let newTime = time - 1;
			if (newTime < 0) newTime = 0;

			setTime(newTime);
		}, 100);

		return () => clearInterval(timer);
	}, [time]);

	return (
		<div className='game' css={BoardStyles} ref={boardRef}>
			<header className='header'>
				<div className='timer' css={TimerStyles(time / 10)}>
					<div className='timerFiller'></div>
				</div>
				{time <= 0 && <p className='noAmmoInfo'>! No more resupplies !</p>}
				<p className='score'>Score: {score}</p>
			</header>
			<main className='board' onClick={pistolShoot}>
				{gameOver && <p className='gameOver'>GAME OVER!</p>}
				<div className='targets' ref={targetsContainerRef}>
					<Target
						targetsContainerRef={targetsContainerRef}
						isReloading={isReloading}
						isShooting={isShooting}
						setScore={setScore}
						setTime={setTime}
						time={time}
						gameOver={gameOver}
					/>
					<Target
						targetsContainerRef={targetsContainerRef}
						isReloading={isReloading}
						isShooting={isShooting}
						setScore={setScore}
						setTime={setTime}
						time={time}
						gameOver={gameOver}
					/>
					<Target
						targetsContainerRef={targetsContainerRef}
						isReloading={isReloading}
						isShooting={isShooting}
						setScore={setScore}
						setTime={setTime}
						time={time}
						gameOver={gameOver}
					/>
					<Target
						targetsContainerRef={targetsContainerRef}
						isReloading={isReloading}
						isShooting={isShooting}
						setScore={setScore}
						setTime={setTime}
						time={time}
						gameOver={gameOver}
					/>
					<Target
						targetsContainerRef={targetsContainerRef}
						isReloading={isReloading}
						isShooting={isShooting}
						setScore={setScore}
						setTime={setTime}
						time={time}
						gameOver={gameOver}
					/>
				</div>
			</main>
			<footer className='gameFooter'>
				<Pistol skewX={skewX} stopShooting={stopShooting} isShooting={isShooting} isReloading={isReloading} stopReloading={stopReloading} gameOver={gameOver} />
				<p className='ammoCount'>
					{ammo}/6<i className='fa-solid fa-egg'></i>
				</p>
			</footer>
		</div>
	);
};
