const apiKey = 'jFTP0hxXWYCWZHqc5uV3OEr17ehNvRtf';
let buttonCounter = 0;
let numOfImages = 10;

let topArray = [{
        term: 'happy',
        category: 'reactions'
    }, {
        term: 'love',
        category: 'reactions'
    }, {
        term: 'wink',
        category: 'reactions'
    }, {
        term: 'thank you',
        category: 'reactions'
    }, {
        term: 'nope',
        category: 'reactions'
    },
    {
        term: 'music',
        category: 'entertainment'
    }, {
        term: 'movies',
        category: 'entertainment'
    }, {
        term: 'sci-fi',
        category: 'entertainment'
    }, {
        term: 'marvel',
        category: 'entertainment'
    }, {
        term: 'tv',
        category: 'entertainment'
    },
    {
        term: 'baseball',
        category: 'sports'
    }, {
        term: 'basketball',
        category: 'sports'
    }, {
        term: 'football',
        category: 'sports'
    }, {
        term: 'hockey',
        category: 'sports'
    }, {
        term: 'soccer',
        category: 'sports'
    }
]

let listOfTerms = [];
let termGrabber = (initialArray, termsOnly) => {
    for (var i = 0; i < initialArray.length; i++) {
        termsOnly.push(initialArray[i].term);
    }
}
termGrabber(topArray, listOfTerms);


const buttonMaker = (array) => {
    while (buttonCounter < array.length) {
        let buttonID = array[buttonCounter].category;
        $('#' + buttonID + 'Buttons').append('<button class="dropdown-item gifButton" type="button">' + array[buttonCounter].term)
        buttonCounter++;
    }
}

buttonMaker(topArray);



const cardCreator = (image, index) => {
    let card = $('<div class="card" style="width:18rem">')
    let cardImgTop = $('<img class="card-img-top loadedImg">').attr('src', image.data[index].images.fixed_height_still.url);
    let cardBody = $('<div class="card-body">');
    let cardTitle = $('<h5 class="card-title">').text(image.data[index].title.toUpperCase())
    let cardText = $('<p class="card-text">').text("Rating: " + image.data[index].rating.toUpperCase());
    cardBody.append(cardTitle, cardText);
    card.append(cardImgTop, cardBody);
    $('#cardContainer').append(card)
}

const imageAnimator = function () {
    let fileName = $(this).attr('src')
    if (fileName.endsWith('_s.gif')) {
        let newFileName = fileName.replace('_s.gif', '.gif')
        $(this).attr('src', newFileName);
    } else if (fileName.endsWith('200.gif')) {
        let newFileName = fileName.replace('200.gif', '200_s.gif')
        $(this).attr('src', newFileName);
    }
}

const gifGrabber = function () {
    let currentTerm = $(this).text();
    let queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + currentTerm + '&limit='+ numOfImages + '&api_key=' + apiKey;

    $('#cardContainer').empty();

    $.get(queryUrl).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
            cardCreator(response, i);
        }

    })
    // $('#moreButton').slideDown();
}


$(document).on('click', '.gifButton', gifGrabber)
$(document).on('click', '.loadedImg', imageAnimator)
