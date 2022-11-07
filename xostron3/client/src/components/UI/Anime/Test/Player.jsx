import anime from "animejs";
import { useState, useRef, useEffect } from "react";
import style from './Player.module.scss'

const ticks = Array.from(Array(5));

const Player = () => {
    const [playing, setPlaying] = useState(false);
    const animation = useRef(null);

    const handleClick = () => {
        playing ? animation.current.pause() : animation.current.play();
        setPlaying(!playing);
    };

    useEffect(() => {
        animation.current = anime.timeline({
            direction: "alternate",
            loop: true,
            autoplay: false,
            easing: "easeInOutSine"
        });

        // `.dots li:nth-child(${Number(tick) + 1})`
        // .Player_itemBar__4KSku
        for (const tick in ticks) {
            animation.current.add(
                {
                    targets: `.${style.itemBar}:nth-child(${Number(tick) + 1})`,
                    scaleY: 1.5 + Math.random() * 4,
                    duration: 300 + Math.random() * 300
                },
                Math.random() * 600
            );
        }
    }, []);

    return (
        <div className={style.player}>
            <ul className={style.dots}>
                {ticks.map((_, i) => (
                    <li className={style.itemBar} key={i} />
                ))}
            </ul>
            <button className={style.btn} onClick={handleClick}>{playing ? "Pause" : "Play"}</button>
        </div>
    );
};

export default Player;