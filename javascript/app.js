const displayWin = document.querySelector('.array');
const speedSlider = document.querySelector('#speedRange');
const sizeSlider  = document.querySelector('#sizeRange');
const sortLinks = document.querySelectorAll('.algo');
const playButton = document.querySelector('.start');
let size = sizeSlider.value;
let speed = 1001-100*speedSlider.value;
let array = [];
let selectedAlgo;
let reset;
let count;

//sleep function from stackOverflow
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

playButton.addEventListener('click', () => {
    playButton.classList.add('disable');
    sizeSlider.classList.add('disable')
    switch(selectedAlgo) {
        case "Bubble Sort":
            bubbleSort();
            break;
        case "Merge Sort":
            mergeSort();
            break;
        case "Quick Sort":
            quickSort();
            break;
        case "Radix Sort":
            radixSort();
            break;
        case "Selection Sort":
            selectionSort();
            break;
        default:
            radixSort();
    }
    // bubbleSort();
    // selectionSort();
    // mergeSort();
    // quickSort();
    // radixSort();
})

sortLinks.forEach(link => {
    link.addEventListener('click', () => {
        selectedAlgo = link.innerHTML;
    })
})

speedSlider.addEventListener("change", () => {
    speed = 1001-100*speedSlider.value;
})

sizeSlider.addEventListener("change", () => {
    size = sizeSlider.value;
    generateArray();
    drawArray();
})

//creates randomized array
const generateArray = () => {
    array = [];
    for(let i = 0; i < size; i++) {
        array.push([1 + Math.floor(Math.random() * 50), "#38a3a5"]);
    }
}

//draws array[]
const drawArray = () => {
    let bars = document.querySelectorAll('.bar');
    for(let i = 0; i < bars.length; i++) {
        bars[i].parentNode.removeChild(bars[i]);
    }
    for(let i = 0; i < array.length; i++) {
        let newBar = document.createElement("div");
        newBar.setAttribute('class', 'bar');
        newBar.innerHTML = `<p>${array[i][0]}</p>`;
        let barStyle = `height: ${array[i][0] * 2}%; width: ${80/array.length}%; font-size: ${20/array.length}vw; background-color: ${array[i][1]}`;
        newBar.setAttribute('style', barStyle);
        displayWin.append(newBar);
    }
}

const bubbleSort = async() => {
    let swapped;
    count = 1;
    do {
        swapped = false;
        for(let i = 0; i < array.length-count; i++) {
            array[i][1] = '#fcfbfe';
            array[i+1][1] = '#fcfbfe';
            drawArray();
            await sleep(speed)
            if(array[i][0] > array[i+ 1][0]) {
                temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
            drawArray();
            await sleep(speed)
            array[i][1] = '#38a3a5';
        }
        array[array.length-count][1] = '#38a34c';
        count++;
    } while(swapped)
    for(let i = 0; i < array.length; i++) {
        array[i][1] = '#38a34c';
    }
    drawArray();
    sizeSlider.classList.remove('disable');
    playButton.classList.remove('disable');
    playButton.classList.add('reset');
    reset = true;
}

const selectionSort = async() => {
    for(let i = 0; i < array.length - 1; i++) {
        let minimum = array[i][0];
        let saveIndex = i;
        array[saveIndex][1] = '#d57a2a';
        drawArray();
        await sleep(speed);
        for(let j = i + 1; j < array.length; j++) {
            array[j][1] = '#fcfbfe'
            drawArray();
            await sleep(speed);
            if(array[j][0] < minimum) {
                array[j][1] = '#d57a2a';
                array[saveIndex][1] = '#38a3a5';
                minimum = array[j][0];
                saveIndex = j;
            } else {
                array[j][1] = '#38a3a5'
            }
            drawArray();
            await sleep(speed);
        }
        array[saveIndex][0] = array[i][0];
        array[i][0] = minimum;
        array[saveIndex][1] = '#38a3a5'
        drawArray();
        await sleep(speed);
        array[i][1] = '#38a34c'
    }
    for(let i = 0; i < array.length; i++) {
        array[i][1] = '#38a34c';
    }
    drawArray();
    sizeSlider.classList.remove('disable');
    playButton.classList.remove('disable');
    playButton.classList.add('reset');
    reset = true;
}

const mergeSort = async() => {
    // let answer = [];
    // for(let i = 0; i < array.length; i++) {
    //     answer.push(array[i][0]);
    // }
    // answer.sort((a,b) => {
    //     return a - b;
    // })
    // console.log(answer);
    let splitIndexArray = []
    splitIndexGen(0, array.length, splitIndexArray);
    let splitIndexArrayCopy = splitIndexArray.slice(0,splitIndexArray.length);
    for(let i = 0; i < splitIndexArray.length / 2; i++) {
        let editR = splitIndexArrayCopy.pop();
        let editL = splitIndexArrayCopy.pop();
        let colorL = Math.floor((editL[1] + editL[0]) / 2)*300/(array.length-1)
        let colorR = Math.floor((editR[1] + editR[0]) / 2)*300/(array.length-1)
        for (let j = editL[0]; j < editL[1]; j++) {
            array[j][1] = `hsl(${colorL}, 72%, 43%)`;
        }
        for (let j = editR[0]; j < editR[1]; j++) {
            array[j][1] = `hsl(${colorR}, 72%, 43%)`;
        }
        drawArray();
        await sleep(speed);
    }

    splitIndexArrayCopy = splitIndexArray.slice(0,splitIndexArray.length);
    for(let i = 0; i <splitIndexArray.length / 2; i++) {
        let sortL = splitIndexArrayCopy.shift();
        let sortR = splitIndexArrayCopy.shift();
        let indexCount = sortR[1] - sortL[0] - 1;
        let colorMain = array[sortR[0]][1];
        for(let j = 0; j < indexCount; j++) {
            let colorR;
            if(sortR[0] != sortR[1]) {
                colorR = array[sortR[0]][1];
                array[sortR[0]][1] = "#fcfbfe";
            }
            let colorL;
            if(sortL[0] != sortL[1]) {
                colorL = array[sortL[0]][1];
                array[sortL[0]][1] = "#fcfbfe";
            }
            drawArray();
            await sleep(speed);
            if(sortR[0] != sortR[1]) {
                array[sortR[0]][1] = colorR;
            }
            if(sortL[0] != sortL[1]) {
                array[sortL[0]][1] = colorL;
            }
            if((sortR[0] != sortR[1]) && (array[sortR[0]][0] <= array[sortL[0]][0])) {
                let insert = array[sortR[0]];
                array.splice(sortR[0], 1);
                array.splice(sortL[0], 0, insert);
                sortR[0]++;
            }
            array[sortL[0]][1] = colorMain;
            sortL[0]++;
            drawArray();
            await sleep(speed);
        }
        array[sortR[1]-1][1] = colorMain;
        drawArray();
        await sleep(speed);
    }
    for(let i = 0; i < array.length; i++) {
        array[i][1] = '#38a34c';
        // if(array[i][0] != answer[i]) {
        //     console.log(array[i][0] + " " + answer[i]);
        // }
    }
    drawArray();
    sizeSlider.classList.remove('disable');
    playButton.classList.remove('disable');
    playButton.classList.add('reset');
    reset = true;
}

const splitIndexGen = (start, end, output) => {
    if(end - start > 1) {
        let splitIndex = start + Math.ceil((end - start) / 2);
        output.unshift([splitIndex, end])
        output.unshift([start, splitIndex])
        splitIndexGen(splitIndex, end, output);
        splitIndexGen(start, splitIndex, output);
    }
}

const quickSort = async() => {
    // let answer = [];
    // for(let i = 0; i < array.length; i++) {
    //     answer.push(JSON.parse(JSON.stringify(array[i][0])));
    // }
    // answer.sort((a,b) => {
    //     return a - b;
    // })
    // console.log(answer);
    let unsortedRanges = [[0, array.length]];
    do{
        currentRange = unsortedRanges.pop();
        let startIndex = currentRange[0];
        let endIndex = currentRange[1];
        if(endIndex - startIndex > 1) {
            let storeIndex = startIndex + 1;
            array[startIndex][1] = '#d57a2a';
            for(let i = startIndex + 1; i < endIndex; i++) {
                array[i][1] = '#fcfbfe';
                drawArray();
                await sleep(speed);
                array[i][1] = '#38a3a5';
                if(array[i][0] <= array[startIndex][0]) {
                    let temp = array[storeIndex][0];
                    array[storeIndex][0] = array[i][0];
                    array[i][0] = temp;
                    array[i][1] = '#38a3a5';
                    array[storeIndex][1] = '#8BCB2A';
                    drawArray();
                    await sleep(speed);
                    storeIndex++;
                }
            }
            for(let i = startIndex + 1; i < endIndex; i++) {
                array[i][1] = '#38a3a5';
            }
            storeIndex--;
            // console.log(startIndex + " " + endIndex);
            // console.log(array);
            // console.log(storeIndex);
            let temp = array[storeIndex][0];
            array[storeIndex][0] = array[startIndex][0];
            array[startIndex][0] = temp;
            array[storeIndex][1] = '#38a34c';
            array[startIndex][1] = '#38a3a5';
            unsortedRanges.push([storeIndex + 1, endIndex]);
            unsortedRanges.push([startIndex, storeIndex]);
        } else if (startIndex < array.length) {
            array[startIndex][1] = '#38a34c';
            drawArray();
            await sleep(speed);
        }
    } while(unsortedRanges.length > 0)

    for(let i = 0; i < array.length; i++) {
        array[i][1] = '#38a34c';
        // if(array[i][0] != answer[i]) {
        //     console.log(array[i][0] + " " + answer[i]);
        // }
    }
    drawArray();
    sizeSlider.classList.remove('disable');
    playButton.classList.remove('disable');
    playButton.classList.add('reset');
    reset = true;
}

const radixSort = async() => {
    // let answer = [];
    // for(let i = 0; i < array.length; i++) {
    //     answer.push(JSON.parse(JSON.stringify(array[i][0])));
    // }
    // answer.sort((a,b) => {
    //     return a - b;
    // })
    // console.log(answer);

    
    // kinda cheating here cause I know none of my inputs will be more than 2 chars/digits long, and are ints
    for(let i = 0; i < 2; i++) {
        let buckets = [['0'],['33'],['67'],['100'],['133'],['167'],['200'],['233'],['267'],['300']];
        for(let j = 0; j < array.length; j++) {
            let result = Math.floor((array[j][0] % Math.pow(10, i+1) / Math.pow(10, i)));
            array[j][1] = `hsl(${buckets[result][0]}, 72%, 43%)`;
            buckets[result].push(array[j]);
            drawArray();
            await sleep(speed);
        }
        let insertionIndex = 0;
        for(let j = 0; j < 10; j++) {
            let currentBucket = buckets.shift();
            for(let k = 1; k < currentBucket.length; k++) {
                array.splice(array.indexOf(currentBucket[k]), 1);
                array.splice(insertionIndex, 0, currentBucket[k]);
                insertionIndex++;
                drawArray();
                await sleep(speed);
            }
        }
    }

    for(let i = 0; i < array.length; i++) {
        array[i][1] = '#38a34c';
        // if(array[i][0] != answer[i]) {
        //     console.log(array[i][0] + " " + answer[i]);
        // }
    }
    drawArray();
    sizeSlider.classList.remove('disable');
    playButton.classList.remove('disable');
    playButton.classList.add('reset');
    reset = true;
}

//generate array on load
generateArray();
drawArray();

