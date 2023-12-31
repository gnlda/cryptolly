let slider = document.querySelector(".slider");
let sliderCover = document.querySelector(".slider__cover");
let indicatorActiveItem = document.querySelector(".indicator-active-item");
let sliderIndicatorContainer = document.querySelector(".slider__indicator-container");

let gap = 24;
const sliderLength = (slider.offsetWidth + gap) / 2;
slider.style.left = -sliderLength + gap + "px";
let left = parseInt(slider.style.left);
let isTouch = false;
const offset = 20;
let velocity = 0;
const velocityMultiplier = 0.9;
const velocityMode = 3;
let delta = 0;
let previousOffset = 0;
let velocityInterval;
let autoscrollInterval;


const mousedownHandler = (e) => {
    isTouch = true;
    clearInterval(velocityInterval);
    sliderIndicatorContainer.style.opacity = 1;
}

const touchstartHandler = (e) => {
    previousOffset = e.touches[0].clientX;
    isTouch = true;
    clearInterval(velocityInterval);
    sliderIndicatorContainer.style.opacity = 1;
}

const mouseupHandler = (e) => {
    isTouch = false;
    if (delta != 0) {
        velocity = delta * velocityMode;
        while(Math.abs(velocity) > 1000) {
            velocity /= 10;
        }
        velocityInterval = setInterval(velocityFunction, 20);
    } else {
        sliderIndicatorContainer.style.opacity = 0;
    }
    delta = 0;
}

const documentMouseupHandler = (e) => {
    isTouch = false;
    delta = 0;
}

const mousemoveHandler = (e) => {
    if(isTouch) {
        delta = e.offsetX - previousOffset;
        let left = parseInt(slider.style.left) + delta;
        if (left < -offset && left > -sliderLength - offset) {
            slider.style.left = `${left}px`;
        } else if (left >= -offset) {
            left -= sliderLength;
            slider.style.left = `${left}px`;
        } else if (left <= -sliderLength -offset) {
            left += sliderLength;
            slider.style.left = `${left}px`;
        }
        indicatorActiveItem.style.left = `${Math.round(e.offsetX / 44)}px`;
    }
    previousOffset = e.offsetX;
}

const touchmoveHandler = (e) => {
    if(isTouch) {
        e.preventDefault();
        delta = e.touches[0].clientX - previousOffset;
        let left = parseInt(slider.style.left) + delta;
        if (left < -offset && left > -sliderLength - offset) {
            slider.style.left = `${left}px`;
        } else if (left >= -offset) {
            left -= sliderLength;
            slider.style.left = `${left}px`;
        } else if (left <= -sliderLength -offset) {
            left += sliderLength;
            slider.style.left = `${left}px`;
        }
    indicatorActiveItem.style.left = `${(left + sliderLength) / 44}px`;
    }
    previousOffset = e.touches[0].clientX;
}

const autoScroll = () => {
    if (isTouch === false) {
        let left = parseInt(slider.style.left) - 1;
        slider.style.left = `${left}px`;
        if (left < -offset && left > -sliderLength - offset) {
            slider.style.left = `${left}px`;
        } else if (left >= -offset) {
            left -= sliderLength;
            slider.style.left = `${left}px`;
        } else if (left <= -sliderLength -offset) {
            left += sliderLength;
            slider.style.left = `${left}px`;
        }
    }
};
autoscrollInterval = setInterval(autoScroll, 20)

const velocityFunction = () => {
    velocity *= velocityMultiplier;
    left = parseInt(slider.style.left) + velocity;
    slider.style.left = `${left}px`;

    if (left >= -offset) {
        left -= sliderLength;
        slider.style.left = `${left}px`;
    } else if (left <= -sliderLength -offset) {
        left += sliderLength;
        slider.style.left = `${left}px`;
    }
    indicatorActiveItem.style.left = `${(left + sliderLength) / 44}px`;
    if (Math.abs(velocity) < 2) {
        clearInterval(velocityInterval);
        sliderIndicatorContainer.style.opacity = 0;
        return;
    }
};

sliderCover.addEventListener("mousedown", mousedownHandler);
sliderCover.addEventListener("mouseup", mouseupHandler);
sliderCover.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseup", documentMouseupHandler);


sliderCover.addEventListener("touchstart", touchstartHandler);
sliderCover.addEventListener("touchend", mouseupHandler);
sliderCover.addEventListener("touchmove", touchmoveHandler);
document.addEventListener("touchend", documentMouseupHandler);