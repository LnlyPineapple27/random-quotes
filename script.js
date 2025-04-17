const projectName = 'random-quote-machine';
let quotesData;

var colors = [
  '#000000', // Black
  '#1E1E1E', // Dark Gray
  '#36454F', // Charcoal Gray
  '#800000', // Maroon
  '#8B0000', // Dark Red
  '#B22222', // Firebrick
  '#DC143C', // Crimson
  '#FF4500', // Orange Red
  '#FF8C00', // Dark Orange
  '#FFD700', // Gold
  '#006400', // Dark Green
  '#008000', // Green
  '#228B22', // Forest Green
  '#000080', // Navy Blue
  '#191970', // Midnight Blue
  '#4169E1', // Royal Blue
  '#4B0082', // Indigo
  '#800080', // Purple
  '#9400D3', // Dark Violet
  '#A52A2A'  // Brown
];

var currentQuote = '',
  currentAuthor = '',
  currrentTags = [];

function getQuotes() {
  //https://dummyjson.com/quotes
  return fetch('https://quoteslate.vercel.app/api/quotes/random?count=50',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(jsonQuotes => {
      quotesData = jsonQuotes;
      console.log("Quoteslate API:", jsonQuotes);
    })
    .catch(error => console.error('Error fetching quotes:', error));
}

function getRandomQuote() {
  return quotesData[
    Math.floor(Math.random() * quotesData.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  currrentTags = randomQuote.tags;
  console.log("Tags:", currrentTags);
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  // $('#tumblr-quote').attr(
  //   'href',
  //   'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
  //     encodeURIComponent(currentAuthor) +
  //     '&content=' +
  //     encodeURIComponent(currentQuote) +
  //     '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  // );
  $('#facebook-quote').attr(
    'href','https://www.facebook.com/sharer/sharer.php?app_id=1013377680283399&sdk=joey&u='
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
