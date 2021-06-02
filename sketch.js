let array;
let initial;
let sorted;

let sort;

let colW = 5;
let amount;
let spacing;

let currentBar = [];
let i, j, m;
let comparisons = 0;
let frames = [];

let paused = true;
let done = false;

let showCurrentBar = true;

function setup() {
    createCanvas(1200 + 450, 800);
    width = 1200;
    amount = width / colW;
    spacing = (height - 80) / amount;
    frameRate(60);
    init("bubble", true);
}

function draw() {
    background(0);
    
    if (!paused && !done) {
        let element = document.getElementById("slider");
        for (let a = 0; a < Math.ceil((element.value ** 2) / 15); a++) {
            if (sort === "bubble") {
                if (j >= i) {
                    if (i < 1) continue;
                    i--;
                    j = 0;
                }
                if (array[j] > array[j + 1]) [array[j], array[j + 1]] = [array[j + 1], array[j]];
                j++;
            } else if (sort === "selection") {
                if (j >= array.length) {
                    if (i >= array.length - 1) continue;
                    [array[m], array[i]] = [array[i], array[m]];
                    i++;
                    m = i;
                    j = i + 1;
                }
                if (array[j] < array[m]) m = j;
                j++;
            } else if (sort === "insertion") {
                if (j >= i) {
                    if (i >= array.length - 1) continue;
                    i++;
                    j = 0;
                }
                if (array[i] < array[j]) [array[i], array[j]] = [array[j], array[i]];
                j++;
            } else if (sort === "quick") {
                if (i > frames.length - 1) continue;
                if (a % 10 === 0) {
                    array = frames[i].slice(1);
                    i++;
                }
            }
            //fix comparison amt for quicksort
            currentBar = [j];
            if (sort === "quick") currentBar = frames[i - 1][0];
            comparisons++;
        }

        if (isEqual(array, sorted)) {
            currentBar = [0];
            done = true;
        }
    }    

    if (done && currentBar[0] < array.length - 1) {
        currentBar[0] += 8;
        if (currentBar[0] >= array.length - 1 && !paused) playpause();
    }

    if (array.length < 450) stroke(0);
    for (let a = 0; a < array.length; a++) {
        fill(currentBar.includes(a) && showCurrentBar ? "red" : 255);
        rect(a * colW, height - array[a], colW, array[a]);
    }

    document.getElementById("header").innerHTML = `${sort.charAt(0).toUpperCase() + sort.slice(1)} Sort - ${comparisons} Comparisons - Made by Plebus Supremus`;

    fill("#ebebeb");
    noStroke();
    rect(width, 0, 450, height);

    fill(0);
    textSize(40);
    textStyle(BOLD);
    text("Visualized Sorting", width + 15, 50);
    textSize(30);
    text("Play or Pause:", width + 15, 90);
    text("Restart:", width + 15, 130);
    text("Speed:", width + 15, 170);
    text("Sorting Method:", width + 15, 210);

    let val = parseInt(document.getElementById("element-amt").value);
    if (array.length !== val && !isNaN(val)) init(sort, true, false, val);
}