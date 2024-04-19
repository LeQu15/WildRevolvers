import { Pistol } from "../Pistol/Pistol";
import { BoardStyles } from "./Board.styles";
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
	const [isReloading, setIsReloading] = useState(false);
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
		setIsReloading(false);
		setIsShooting(false);
		setAmmo(6);
	}, []);

	const pistolShoot = useCallback(() => {
		if (!isShooting && !isReloading) {
			setIsShooting(true);
			const newAmmoCount = ammo - 1;
			if (newAmmoCount >= 0) {
				setAmmo(newAmmoCount);
				const sound = new Howl({
					src: shotSound,
				});
				sound.play();
			} else {
				reload();
			}
		}
	}, [ammo, isShooting, reload, isReloading]);

	const stopShooting = useCallback(() => {
		setIsShooting(false);
		if (ammo === 0) {
			reload();
		}
	}, [ammo, reload]);

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

	return (
		<div className='game' css={BoardStyles} ref={boardRef}>
			<header className='header'>
				<p className='score'>Score: {score}</p>
			</header>
			<main className='board' onClick={pistolShoot}>
				<div className='targets' ref={targetsContainerRef}>
					<Target targetsContainerRef={targetsContainerRef} isReloading={isReloading} isShooting={isShooting} setScore={setScore} />
					<Target targetsContainerRef={targetsContainerRef} isReloading={isReloading} isShooting={isShooting} setScore={setScore} />
					<Target targetsContainerRef={targetsContainerRef} isReloading={isReloading} isShooting={isShooting} setScore={setScore} />
					<Target targetsContainerRef={targetsContainerRef} isReloading={isReloading} isShooting={isShooting} setScore={setScore} />
					<Target targetsContainerRef={targetsContainerRef} isReloading={isReloading} isShooting={isShooting} setScore={setScore} />
				</div>
			</main>
			<footer className='gameFooter'>
				<Pistol skewX={skewX} stopShooting={stopShooting} isShooting={isShooting} isReloading={isReloading} stopReloading={stopReloading} />
				<p className='ammoCount'>
					{ammo}/6<i className='fa-solid fa-egg'></i>
				</p>
			</footer>
		</div>
	);
};
