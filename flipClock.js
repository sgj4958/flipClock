const 플립시계 = (elementQuery, option) => {
    option = {
        duration: 500,
        ...option
    }

    const parent = document.querySelector(elementQuery)
    const aniClass = "ani"

    parent.innerHTML = `
    <div class="clock">
    ${
        Array(6).fill(`
            <div class="frame">
                <div class="card prev">
                    <div class="back">0</div>
                    <div class="front">0</div>
                </div>
                <div class="card next">
                    <div class="top">0</div>
                    <div class="bottom">0</div>
                </div>
            </div>
        `).join(``)
    }
    </div>
    `
    document.querySelector("style").insertAdjacentHTML("beforeend", `
    .clock {
        display: flex;
        gap: 1px;

        .frame {
            position: relative;
            width: 40px;
            height: 50px;
            color: #fff;

            &:nth-child(2n) {margin-right: 5px;}

            .card {
                width: 100%;
                height: 100%;
                position: absolute;
                transform-style: preserve-3d;

                > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #333;
                    border-radius: 5px;
                    font-size: 26px;
                    font-weight: bold;
                    backface-visibility: hidden;

                    &.front, &.top {clip-path: inset(0 0 50% 0);}
                    &.back, &.bottom {clip-path: inset(calc(50% + 1px) 0 0 0);}
                    &.back {transform: rotateY(180deg) rotateZ(180deg);}
                }
                &.prev {
                    z-index: 1;
                    &.${aniClass} {animation: flip ${option.duration}ms forwards;}
                }
                &.next {top: 0;}
            }

            &::after {
                content: "";
                width: 100%;
                height: 2px;
                position: absolute;
                top: 50%;
                background: #000;
                z-index: 2;
            }
        }
    }
    @keyframes flip {
        to {transform: rotateX(180deg);}
    }
    `)

    const setNumber = (frame, number) => {
        if(frame.querySelector(".back").textContent == String(number)) return

        const prevClass = frame.querySelector(".prev").classList

        frame.querySelectorAll(".back, .top").forEach(el => el.textContent = number)
        prevClass.add(aniClass)

        setTimeout(() => {
            frame.querySelectorAll(".front, .bottom").forEach(el => el.textContent = number)
            prevClass.remove(aniClass)
        }, option.duration)
    }

    setInterval(() => {
        const time = new Date().toTimeString().slice(0, 8).replace(/:/g, "")
        parent.querySelectorAll(".frame").forEach((el, i) => {
            setNumber(el, time[i])
        })
    }, 1000)
}