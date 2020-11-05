const displayWin = document.querySelector('.array');
const speedSlider = document.querySelector('#speedRange');
const sizeSlider  = document.querySelector('#sizeRange');
const playButton = document.querySelector('.start');
const expandButton = document.querySelector('.expand');
let size = sizeSlider.value;
let speed = 1001-10*speedSlider.value;
let array = [];
let selectedAlgo;
let reset;
let count;

//sleep function from stackOverflow
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

playButton.addEventListener('click', () => {
    if(reset) {
        reset = false;
        generateArray();
        drawArray();
        playButton.classList.remove('reset');
    } else {
        playButton.classList.add('disable');
        sizeSlider.classList.add('disable');
        document.querySelector('.algorithmSelect').classList.remove('expanded');
        document.querySelectorAll('.arrow').forEach(arrow => {
            arrow.classList.remove('rotated');
        })
        expandButton.classList.add('disable');
        switch(selectedAlgo) {
            case "<span>Bubble</span>&nbsp;Sort":
                bubbleSort();
                break;
            case "<span>Merge</span>&nbsp;Sort":
                mergeSort();
                break;
            case "<span>Quick</span>&nbsp;Sort":
                quickSort();
                break;
            case "<span>Radix</span>&nbsp;Sort":
                radixSort();
                break;
            case "<span>Selection</span>&nbsp;Sort":
                selectionSort();
                break;
            default:
                radixSort();
        }
    }
})

const toggleExpand = () => {
    document.querySelector('.algorithmSelect').classList.toggle('expanded');
    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.classList.toggle('rotated');
    })
}

const sortingComplete = () => {
    for(let i = 0; i < array.length; i++) {
        array[i][1] = '#38a34c';
    }
    drawArray();
    sizeSlider.classList.remove('disable');
    playButton.classList.remove('disable');
    expandButton.classList.remove('disable');
    playButton.classList.add('reset');
    reset = true;
}

const algSelected = () => {
    document.querySelector('.expandLabel').innerHTML = selectedAlgo;
    document.querySelectorAll('.infoSection').forEach(infoSection =>  {
        infoSection.classList.add('hidden');
    })
    switch(selectedAlgo) {
        case "<span>Bubble</span>&nbsp;Sort":
            document.querySelector('.bubbleSort').classList.remove('hidden');
            break;
        case "<span>Merge</span>&nbsp;Sort":
            document.querySelector('.mergeSort').classList.remove('hidden');
            break;
        case "<span>Quick</span>&nbsp;Sort":
            document.querySelector('.quickSort').classList.remove('hidden');
            break;
        case "<span>Radix</span>&nbsp;Sort":
            document.querySelector('.radixSort').classList.remove('hidden');
            break;
        case "<span>Selection</span>&nbsp;Sort":
            document.querySelector('.selectionSort').classList.remove('hidden');
    }
}

expandButton.addEventListener('click', toggleExpand);

document.querySelectorAll('.algo').forEach(link => {
    link.addEventListener('click', () => {
        selectedAlgo = link.innerHTML;
        algSelected();
        toggleExpand();
    })
})

speedSlider.addEventListener('change', () => {
    speed = 1001-10*speedSlider.value;
})

sizeSlider.addEventListener('change', () => {
    size = sizeSlider.value;
    reset = false;
    playButton.classList.remove('reset');
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
        document.querySelector('.bubCode0').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.bubCode0').style.backgroundColor = null;
        document.querySelector('.bubCode1').style.backgroundColor = '#38a3a5';
        swapped = false;
        await sleep(speed);
        document.querySelector('.bubCode1').style.backgroundColor = null;
        document.querySelector('.bubCode2').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.bubCode2').style.backgroundColor = null;
        for(let i = 0; i < array.length-count; i++) {
            array[i][1] = '#fcfbfe';
            array[i+1][1] = '#fcfbfe';
            document.querySelector('.bubCode3').style.backgroundColor = '#38a3a5';
            drawArray();
            await sleep(speed)
            document.querySelector('.bubCode3').style.backgroundColor = null;
            if(array[i][0] > array[i+ 1][0]) {
                document.querySelector('.bubCode4').style.backgroundColor = '#38a3a5';
                document.querySelector('.bubCode5').style.backgroundColor = '#38a3a5';
                temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
            drawArray();
            await sleep(speed)
            document.querySelector('.bubCode4').style.backgroundColor = null;
            document.querySelector('.bubCode5').style.backgroundColor = null;
            array[i][1] = '#38a3a5';
        }
        array[array.length-count][1] = '#38a34c';
        drawArray();
        document.querySelector('.bubCode6').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.bubCode6').style.backgroundColor = null;
        count++;
    } while(swapped)
    sortingComplete();
}

const selectionSort = async() => {
    document.querySelector('.selCode0').style.backgroundColor = '#38a3a5';
    await sleep(speed);
    document.querySelector('.selCode0').style.backgroundColor = null;
    for(let i = 0; i < array.length - 1; i++) {
        document.querySelector('.selCode1').style.backgroundColor = '#38a3a5';
        let minimum = array[i][0];
        let saveIndex = i;
        array[saveIndex][1] = '#d57a2a';
        drawArray();
        await sleep(speed);
        document.querySelector('.selCode1').style.backgroundColor = null;
        document.querySelector('.selCode2').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.selCode2').style.backgroundColor = null;
        for(let j = i + 1; j < array.length; j++) {
            array[j][1] = '#fcfbfe'
            drawArray();
            document.querySelector('.selCode3').style.backgroundColor = '#38a3a5';
            await sleep(speed);
            document.querySelector('.selCode3').style.backgroundColor = null;
            array[j][1] = '#38a3a5'
            if(array[j][0] < minimum) {
                array[j][1] = '#d57a2a';
                array[saveIndex][1] = '#38a3a5';
                minimum = array[j][0];
                saveIndex = j;
                drawArray();
                document.querySelector('.selCode4').style.backgroundColor = '#38a3a5';
                await sleep(speed);
                document.querySelector('.selCode4').style.backgroundColor = null;
            }
        }
        array[saveIndex][0] = array[i][0];
        array[i][0] = minimum;
        array[saveIndex][1] = '#38a3a5'
        drawArray();
        document.querySelector('.selCode5').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.selCode5').style.backgroundColor = null;
        array[i][1] = '#38a34c'
    }
    sortingComplete();
}

const mergeSort = async() => {
    array = await mergeSortHelper(0, array.length, array);
    sortingComplete();
}

const mergeSortHelper = async(start, end, input) => {
    document.querySelector('.merCode0').style.backgroundColor = '#38a3a5';
    await sleep(speed);
    document.querySelector('.merCode0').style.backgroundColor = null;
    if(input.length == 1) {
        let startColor = array[start][1];
        array[start][1] = '#fcfbfe';
        document.querySelector('.merCode1').style.backgroundColor = '#38a3a5';
        document.querySelector('.merCode2').style.backgroundColor = '#38a3a5';
        drawArray();
        await sleep(speed);
        array[start][1] = startColor;
        document.querySelector('.merCode1').style.backgroundColor = null;
        document.querySelector('.merCode2').style.backgroundColor = null;
        return input;
    }
    else {
        let splitIndex = Math.ceil(input.length / 2)
        let splitTrueIndex = start + splitIndex;
        for (let i = start; i < splitTrueIndex; i++) {
            let color = Math.floor((start)*330/(array.length-1));
            array[i][1] = `hsl(${color}, 72%, 43%)`;
        }
        for (let i = splitTrueIndex; i < end; i++) {
            let color = Math.floor((splitTrueIndex)*330/(array.length-1));
            array[i][1] = `hsl(${color}, 72%, 43%)`;
        }
        drawArray();
        document.querySelector('.merCode3').style.backgroundColor = '#38a3a5';
        document.querySelector('.merCode4').style.backgroundColor = '#38a3a5';
        document.querySelector('.merCode5').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.merCode3').style.backgroundColor = null;
        document.querySelector('.merCode4').style.backgroundColor = null;
        document.querySelector('.merCode5').style.backgroundColor = null;
        let left = await mergeSortHelper(start, splitTrueIndex, input.slice(0, splitIndex));
        let right = await mergeSortHelper(splitTrueIndex, end, input.slice(splitIndex, input.length));
        let output = [];
        let mergeColor = left[0][1];
        document.querySelector('.merCode6').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.merCode6').style.backgroundColor = null;
        for(let i = 0; i < input.length; i++) {
            let startColor = array[start][1];
            let midColor;
            array[start][1] = '#fcfbfe';
            if(splitTrueIndex < end) {
                midColor = array[splitTrueIndex][1];
                array[splitTrueIndex][1] = '#fcfbfe';
            }
            drawArray();
            document.querySelector('.merCode7').style.backgroundColor = '#38a3a5';
            document.querySelector('.merCode9').style.backgroundColor = '#38a3a5';
            await sleep(speed);
            document.querySelector('.merCode7').style.backgroundColor = null;
            document.querySelector('.merCode9').style.backgroundColor = null;
            array[start][1] = startColor;
            if(splitTrueIndex < end) {
                array[splitTrueIndex][1] = midColor;
            }
            let add;
            if(left.length == 0) {
                document.querySelector('.merCode10').style.backgroundColor = '#38a3a5';
                await sleep(speed);
                document.querySelector('.merCode10').style.backgroundColor = null;
                add = right.shift();
                array.splice(splitTrueIndex, 1);
                array.splice(start, 0, add);
                array[start][1] = mergeColor;
                splitTrueIndex++;
            }
            else if(right.length == 0) {
                document.querySelector('.merCode8').style.backgroundColor = '#38a3a5';
                await sleep(speed);
                document.querySelector('.merCode8').style.backgroundColor = null;
                add = left.shift();
            }
            else if(right[0][0] >= left[0][0]) {
                document.querySelector('.merCode8').style.backgroundColor = '#38a3a5';
                await sleep(speed);
                document.querySelector('.merCode8').style.backgroundColor = null;
                add = left.shift();
            }
            else if(left[0][0] > right[0][0]) {
                document.querySelector('.merCode10').style.backgroundColor = '#38a3a5';
                await sleep(speed);
                document.querySelector('.merCode10').style.backgroundColor = null;
                add = right.shift();
                array.splice(splitTrueIndex, 1);
                array.splice(start, 0, add);
                array[start][1] = mergeColor;
                splitTrueIndex++;
            }
            start++;
            output.push(add);
            drawArray();
            await sleep(speed);
        }
        document.querySelector('.merCode11').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.merCode11').style.backgroundColor = null;
        return output;
    }
}

const quickSort = async() => {
    let unsortedRanges = [[0, array.length]];
    do{
        currentRange = unsortedRanges.pop();
        let startIndex = currentRange[0];
        let endIndex = currentRange[1];
        if(startIndex < array.length && array[startIndex][1] == '#38a3a5') {
            document.querySelector('.qikCode0').style.backgroundColor = '#38a3a5';
            await sleep(speed);
            document.querySelector('.qikCode0').style.backgroundColor = null;
            document.querySelector('.qikCode1').style.backgroundColor = '#38a3a5';
            await sleep(speed);
            document.querySelector('.qikCode1').style.backgroundColor = null;
        }
        if(endIndex - startIndex > 1) {
            let storeIndex = startIndex + 1;
            array[startIndex][1] = '#d57a2a';
            document.querySelector('.qikCode2').style.backgroundColor = '#38a3a5';
            document.querySelector('.qikCode3').style.backgroundColor = '#38a3a5';
            drawArray();
            await sleep(speed);
            document.querySelector('.qikCode2').style.backgroundColor = null;
            document.querySelector('.qikCode3').style.backgroundColor = null;
            document.querySelector('.qikCode4').style.backgroundColor = '#38a3a5';
            await sleep(speed);
            document.querySelector('.qikCode4').style.backgroundColor = null;
            for(let i = startIndex + 1; i < endIndex; i++) {
                array[i][1] = '#fcfbfe';
                document.querySelector('.qikCode5').style.backgroundColor = '#38a3a5';
                drawArray();
                await sleep(speed);
                array[i][1] = '#38a3a5';
                document.querySelector('.qikCode5').style.backgroundColor = null;
                if(array[i][0] < array[startIndex][0]) {
                    document.querySelector('.qikCode6').style.backgroundColor = '#38a3a5';
                    document.querySelector('.qikCode7').style.backgroundColor = '#38a3a5';
                    let temp = array[storeIndex][0];
                    array[storeIndex][0] = array[i][0];
                    array[i][0] = temp;
                    array[i][1] = '#38a3a5';
                    array[storeIndex][1] = '#e2de1d';
                    drawArray();
                    await sleep(speed);
                    document.querySelector('.qikCode6').style.backgroundColor = null;
                    document.querySelector('.qikCode7').style.backgroundColor = null;
                    storeIndex++;
                }
            }
            for(let i = startIndex + 1; i < endIndex; i++) {
                array[i][1] = '#38a3a5';
            }
            storeIndex--;
            let temp = array[storeIndex][0];
            array[storeIndex][0] = array[startIndex][0];
            array[startIndex][0] = temp;
            array[storeIndex][1] = '#38a34c';
            array[startIndex][1] = '#38a3a5';
            unsortedRanges.push([storeIndex + 1, endIndex]);
            unsortedRanges.push([startIndex, storeIndex]);
            document.querySelector('.qikCode8').style.backgroundColor = '#38a3a5';
            document.querySelector('.qikCode9').style.backgroundColor = '#38a3a5';
            document.querySelector('.qikCode10').style.backgroundColor = '#38a3a5';
            drawArray();
            await sleep(speed);
            document.querySelector('.qikCode8').style.backgroundColor = null;
            document.querySelector('.qikCode9').style.backgroundColor = null;
            document.querySelector('.qikCode10').style.backgroundColor = null;
        } else if (startIndex < array.length) {
            array[startIndex][1] = '#38a34c';
            drawArray();
            // await sleep(speed);
        }
    } while(unsortedRanges.length > 0)

    sortingComplete();
}

const radixSort = async() => {
    document.querySelector('.radCode0').style.backgroundColor = '#38a3a5';
    await sleep(speed);
    document.querySelector('.radCode0').style.backgroundColor = null;
    document.querySelector('.radCode1').style.backgroundColor = '#38a3a5';
    await sleep(speed);
    document.querySelector('.radCode1').style.backgroundColor = null;
    // kinda cheating here cause I know none of my inputs will be more than 2 chars/digits long, and are ints
    for(let i = 0; i < 2; i++) {
        let buckets = [['0'],['33'],['67'],['100'],['133'],['167'],['200'],['233'],['267'],['300']];
        document.querySelector('.radCode2').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.radCode2').style.backgroundColor = null;
        for(let j = 0; j < array.length; j++) {
            let result = Math.floor((array[j][0] % Math.pow(10, i+1) / Math.pow(10, i)));
            array[j][1] = `hsl(${buckets[result][0]}, 72%, 43%)`;
            buckets[result].push(array[j]);
            document.querySelector('.radCode3').style.backgroundColor = '#38a3a5';
            drawArray();
            await sleep(speed);
            document.querySelector('.radCode3').style.backgroundColor = null;
        }
        let insertionIndex = 0;
        document.querySelector('.radCode4').style.backgroundColor = '#38a3a5';
        await sleep(speed);
        document.querySelector('.radCode4').style.backgroundColor = null;
        for(let j = 0; j < 10; j++) {
            let currentBucket = buckets.shift();
            document.querySelector('.radCode5').style.backgroundColor = '#38a3a5';
            await sleep(speed);
            document.querySelector('.radCode5').style.backgroundColor = null;
            for(let k = 1; k < currentBucket.length; k++) {
                array.splice(array.indexOf(currentBucket[k]), 1);
                array.splice(insertionIndex, 0, currentBucket[k]);
                insertionIndex++;
                document.querySelector('.radCode6').style.backgroundColor = '#38a3a5';
                drawArray();
                await sleep(speed);
                document.querySelector('.radCode6').style.backgroundColor = null;
            }
        }
    }

    sortingComplete();
}

//generate array on load
generateArray();
drawArray();

