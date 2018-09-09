const apiKey = 'jFTP0hxXWYCWZHqc5uV3OEr17ehNvRtf';
let buttonCounter = 0;
let favButtonCounter = 0;
let numOfImages = 10;
let more = false;
let currentTerm = '';
let iterator = 0;
let favoriteArray = [];
let listOfTerms = [];
let downloadUrl = '';

// localStorage workaround 
let favUrls = JSON.parse(localStorage.getItem('urls'))
let favTitles = JSON.parse(localStorage.getItem('titles'));

if (!favUrls) {
    favUrls = [];
    favTitles = [];
} else {
    while (favoriteArray.length < favUrls.length) {
        let memoryObject = {
            url: favUrls[iterator],
            title: favTitles[iterator]
        }
        favoriteArray.push(memoryObject);
        iterator++
    }
}


iterator = 0;


let termArray = [{
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

const favoriteButtonMaker = (array) => {
    while (favButtonCounter < array.length) {
        let favUrl = array[favButtonCounter].url
        let favTitle = array[favButtonCounter].title

        // workaround as localStorage can't read objects
        if (favUrls.indexOf(favUrl) == -1) {
            favUrls.push(favUrl);
            favTitles.push(favTitle);
        }
        ///////////////

        $('#favoritesButtons').append(`<a href=${favUrl} target="_" class="dropdown-item gifButton" role="button">${favTitle}`)
        favButtonCounter++;
    }

    localStorage.setItem('urls', JSON.stringify(favUrls))
    localStorage.setItem('titles', JSON.stringify(favTitles))
    localStorage.setItem('array', JSON.stringify(array));

}

favoriteButtonMaker(favoriteArray);

const universalButtonMaker = (array) => {
    while (buttonCounter < array.length) {
        let buttonID = array[buttonCounter].category;
        $(`#${buttonID}Buttons`).append('<button class="dropdown-item gifButton" type="button">' + array[buttonCounter].term)
        buttonCounter++;
    }
}




universalButtonMaker(termArray);


// I'm positive this could be refactored but it's 2:39 AM 

const cardCreator = (image, index) => {
    let card = $('<div class="card" style="width:18rem">')
    let cardImgTop = $('<img class="card-img-top loadedImg">').attr('src', image.data[index].images.fixed_height_still.url);
    let cardBody = $('<div class="card-body">');
    let cardTitle = $('<h5 class="card-title">').text(image.data[index].title.toUpperCase())
    let cardText = $('<p class="card-text">').text(`Rating:${image.data[index].rating.toUpperCase()}`);
    let favoriteButton = $(`<button img-url=${image.data[index].url} title=${image.data[index].title.toUpperCase()} class="btn btn-dark favoriteButton">Favorite</button>`);
    let downloadButton = $(`<a href=${image.data[index].images.original.url} target="_blank" class="downloadBttn">` + `<img src="assets/img/glyphicons-201-download.png">Download`)
    cardBody.append(cardTitle, cardText, favoriteButton, downloadButton);
    card.append(cardImgTop, cardBody);
    $('#cardContainer').append(card)
}

const favoriteFunction = function () {
    let imgUrl = $(this).attr('img-url');
    let imgTitle = $(this).attr('title');

    if ((favoriteArray.findIndex((finder) => finder.title == imgTitle)) === -1) {
        favoriteArray.push({
            url: imgUrl,
            title: imgTitle
        })
        console.log(favoriteArray);
        favoriteButtonMaker(favoriteArray);
    } else {
        console.log('already favorited');
    }


}

const clearFavorites = () => {
    favoriteArray = [];
    localStorage.clear();
    $('#favoritesButtons').empty();
}

const moreSetter = () => {
    more = true;
    numOfImages += 10;
    gifGrabber(currentTerm)

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

/// gettin' giphy wit' it OR errybody in the div is getting giphy
const gifGrabber = function (term) {

    let queryUrl = `https://api.giphy.com/v1/gifs/search?q=${term}&limit=${numOfImages}&api_key=${apiKey}`;
    $.get(queryUrl).then((response) => {
        console.log(response);
        while (iterator < response.data.length) {
            cardCreator(response, iterator);
            iterator++;
        }

    })
    $('#moreButton').slideDown();
    more = false;
}

const termClick = function () {
    if (!more) {
        numOfImages = 10;
        $('#cardContainer').empty();
        iterator = 0;
        currentTerm = $(this).text();
    }

    gifGrabber(currentTerm);
}

const searchFunction = () => {
    let searchTerm = $("#searchText").val();
    $("#searchText").val('');
    if (termArray.indexOf(searchTerm) === -1) {
        termArray.push({
            term: searchTerm,
            category: 'user'
        });
        universalButtonMaker(termArray);
        currentTerm = searchTerm;
        if (!more) {
            numOfImages = 10;
            $('#cardContainer').empty();
            iterator = 0;
        }
        gifGrabber(currentTerm);
    }
}


$(document).on('click', '.gifButton', termClick)
$(document).on('click', '.loadedImg', imageAnimator)
$(document).on('click', '#searchButton', searchFunction)
$(document).on('click', '.favoriteButton', favoriteFunction)
$(document).on('click', '#moreButton', moreSetter)
$(document).on('click', '#clearButton', clearFavorites)