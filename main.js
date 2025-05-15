// ==UserScript==
// @name         YouTube Percentage & Controls
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Displays Percentage and Playback Speed Controls
// @author       Theo
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const video = document.querySelector('video');

    const container = document.createElement('div');
    container.className = "info";
    container.style.position = 'fixed';
    container.style.display = "flex";
    container.style.top = '1rem';
    container.style.left = '50%';
    container.style.transform = "translateX(-50%)";
    container.style.zIndex = '3000';
    container.style.fontSize = '1rem';
    container.style.color = 'white';
    container.style.fontFamily = "GitLab Sans";
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    container.style.padding = '10px';
    container.style.borderRadius = '5px';

    const percentageDisplay = document.createElement('h1');
    percentageDisplay.style.margin = '0';
    percentageDisplay.style.paddingRight = '1rem';
    container.appendChild(percentageDisplay);

    const speedText = document.createElement('h1');
    speedText.style.margin = '0';
    speedText.style.paddingRight = '0.5rem';
    speedText.innerText = '1x';
    speedText.style.paddingRight = '1rem';
    container.appendChild(speedText);

    const speeds = [1, 1.25, 1.5, 1.75, 2, 3];
    speeds.forEach(speed => {
        const button = document.createElement('button');
        button.textContent = `${speed}x`;
        button.style.fontSize = '1.2rem';
        button.style.cursor = 'pointer';
        button.onclick = () => {
            video.playbackRate = speed;
            speedText.textContent = `${speed}x`;
        };
        container.appendChild(button);
    });

    document.body.appendChild(container);

    setInterval(() => {
        if (video && video.duration > 0) {
            percentageDisplay.textContent = Math.round((video.currentTime / video.duration) * 100) + "%";
        }
    }, 1000);
})();

