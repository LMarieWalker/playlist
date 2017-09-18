$(document).ready(function(){

  function playlistInfo() {
    $.get(('https://lit-fortress-6467.herokuapp.com/object'), function(data){

      // GET THREE NON REPEATED RANDOM NUMBERS
      var randomNumArr = [];

      while(randomNumArr.length < 3) {
        let randomNumArrNumber = (Math.floor(Math.random() * (0 - data.results.length) + data.results.length));
        if (!randomNumArr.includes(randomNumArrNumber)){
          randomNumArr.push(randomNumArrNumber);
        }
      }

      // CREATE IMAGE CARDS WITH RANDOM NUMBERS AND APPEND TO DOCUMENT
      for (let i = 0; i < 3; i++) {
        let newRandom = randomNumArr[i];

        let divImg = document.createElement('div');
          divImg.className='cards';

        let cardImg = document.createElement('img');
          cardImg.src='./images/'+(data.results[newRandom].cover_art);
          cardImg.alt=''+(data.results[newRandom].title);
          cardImg.id=''+(data.results[newRandom].id);

        divImg.append(cardImg);
        $('.cards-main').append(divImg);
      }
    })

    // EVENT LISTENER FOR 'CHOOSE TRACK' BUTTON AND GO TO PLAYLIST PAGE
    $('#chooseTrackBtn').on({
      click: function(){
        window.location = './playlist.html';
      }
    });

  }
  playlistInfo();

  function playlistInfoPage2() {
    $.get(('https://lit-fortress-6467.herokuapp.com/object'), function(dataPage2){

      // GET NON REPEATED RANDOM NUMBERS
      var randomNumArrPage2 = [];

      while(randomNumArrPage2.length < dataPage2.results.length) {
        let randomNumArrNumberPage2 = (Math.floor(Math.random() * (0 - dataPage2.results.length) + dataPage2.results.length));
        if (!randomNumArrPage2.includes(randomNumArrNumberPage2)){
          randomNumArrPage2.push(randomNumArrNumberPage2);
        }
      }

      // CREATE IMAGE CARDS WITH RANDOM NUMBERS AND APPEND TO DOCUMENT
      for (let i = 0; i < 10; i++) {
        let newRandomPage2 = randomNumArrPage2[i];

        let divImgPage2 = document.createElement('div');
          divImgPage2.className='cardsPage2';
          divImgPage2.id='album'+(dataPage2.results[newRandomPage2].id);

        let divAtag = document.createElement('a');
          divAtag.className='aTagDiv';
          divAtag.id='atag'+(dataPage2.results[newRandomPage2].id);
          divAtag.href='#';

        let cardImgPage2 = document.createElement('img');
          cardImgPage2.src='./images/'+(dataPage2.results[newRandomPage2].cover_art);
          cardImgPage2.alt=''+(dataPage2.results[newRandomPage2].artist);
          cardImgPage2.id=''+(dataPage2.results[newRandomPage2].id);
          cardImgPage2.className='imgPage2';

        divAtag.append(cardImgPage2);
        divImgPage2.append(divAtag);
        $('.cardsMainPage2').append(divImgPage2);
      }
    })

    // FUNCTION TO CLEAR CARD SECTION
    function resetCharacters(){
      chars = [];
      $(".cardPage2").html("");
    }

    // FUNCTION TO POST THE CONTENT
    function thePost(){
      $.post("https://lit-fortress-6467.herokuapp.com/post", {content})
        .done(function(data) {
          alert('check the console for response');
          console.log("Data Loaded: " +data);
        });
    }

    // EVENT LISTENER FOR CLICKS ON THE ALBUM IMAGES AND ADD ALBUM INFO TO CARD SECTION
    var content = {};
    $('.cardsMainPage2').on('click', 'img', function() {
      $('.cardPage2').append(this.alt+": "+this.id+'<br />');
      content[this.alt] = this.id;
    });

    // EVENT LISTENER FOR CLICK ON THE 'CLEAR TRACKS' BUTTON TO CLEAR CARD SECTION
    $("#clearTracks").click(function(){
      resetCharacters();
    })

    // EVENT LISTENER FOR CLICK ON THE 'SUBMIT BIN' BUTTON TO SEND TO POST
    $("#submitBin").click(function(){
      thePost();
    })

  }
  playlistInfoPage2();


})
