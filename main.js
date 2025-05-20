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
    document.getElementById('start').style.display = 'none';
    document.querySelector("#voice-search-button").style.display = 'none';

    document.querySelector('#center > yt-searchbox').style.margin = '0px';
    document.querySelector('#center > yt-searchbox > div.ytSearchboxComponentInputBox').style.margin = '0px';

    document.getElementById('center').style.maxWidth = '350px';

    const container = document.createElement('div');
    container.className = "info";
    container.style.position = 'fixed';
    container.style.display = "flex";
    container.style.top = '0.5rem';
    container.style.left = '50%';
    container.style.transform = "translateX(-50%)";
    container.style.zIndex = '3000';
    container.style.fontSize = '1rem';
    container.style.fontFamily = "GitLab Sans";
    container.style.padding = '10px';

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
        button.style.fontSize = '1.5rem';
        button.style.cursor = 'pointer';
        button.style.marginRight = '0.2rem';
        button.style.backgroundColor = 'dodgerblue';
        button.style.color = 'white';
        button.style.fontWeight = 'bold';
        button.style.borderWidth = '0px';
        button.style.borderRadius = '0.2rem';
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

