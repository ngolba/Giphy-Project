const apiKey = 'jFTP0hxXWYCWZHqc5uV3OEr17ehNvRtf';
let buttonCounter = 0;

let topArray = [ {term: 'happy', category: 'reactions'}, {term: 'love', category: 'reactions'}, {term: 'wink', category: 'reactions'}, {term: 'thank you', category: 'reactions'}, {term: 'nope', category: 'reactions'},
{term: 'music', category: 'entertainment'}, {term: 'movies', category: 'entertainment'}, {term: 'sci-fi', category: 'entertainment'}, {term: 'marvel', category: 'entertainment'}, {term: 'tv', category: 'entertainment'},
{term: 'baseball', category: 'sports'}, {term: 'basketball', category: 'sports'}, {term: 'football', category: 'sports'}, {term: 'hockey', category: 'sports'}, {term: 'soccer', category: 'sports'}]

const buttonMaker = (array) => {
    while (buttonCounter < array.length) {
        let buttonID = array[buttonCounter].category;
        $('#' + buttonID + 'Buttons').append('<button class="dropdown-item" type="button">' + array[buttonCounter].term)
        buttonCounter++;
    }
}

buttonMaker(topArray);