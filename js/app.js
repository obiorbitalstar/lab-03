$(document).ready(function(){


  function Horns(horn){
    this.name= horn.title;
    this.imgPath=horn.image_url;
    this.info = horn.description;
    this.keyword =horn.keyword;
    this.horns = horn.horns;
    Horns.all.push(this);
  }

  const readJson = () => {
    $.ajax('./data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(element => {
        let box = new Horns(element);
        box.filler();
        box.render();
      });
    });
  };

  const readJson2 = () => {
    $.ajax('./data/page-2.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(element => {
        let box = new Horns(element);
        box.filler();
        box.render();
      });
    });
  };



  Horns.all = [];
  let options =[];
  readJson();

  Horns.prototype.filler = function(){
    if(!options.includes(this.keyword)){
      options.push(this.keyword);
      $('#keyselectors').append(`<option>${this.keyword}</option>`);
    }else {
      console.log('we already have that');

    }
  };


  let bE1 = $('#page1');
  let bE2 = $('#page2');
  bE1.on('click', ()=>{
    $('div').remove();
    readJson();

  });

  bE2.on('click', ()=> {
    $('div').remove();
    readJson2();
  });


  Horns.prototype.render = function() {
    let $box = $('#box').html();
    var rendered = Mustache.render($box , this);
    $('#container').append(rendered);
  };

  let optionsFilter = ()=>{
    $('#keyselectors').change(function(){
      $('section').hide();
      let selectedValue = this.value;
      console.log('test',selectedValue);

      render2(selectedValue);

    });

  };
  let render2 = (slectedOp)=>{
    console.log(slectedOp);

    for (let i = 0; i < Horns.all.length; i++) {

      if(Horns.all[i].keyword === slectedOp){
        let y = $('body');

        let x = $('<section>');
        y.append(x);
        let divE1 = $('<div>');

        x.append(divE1);

        let imgE1 = $('<img>');

        imgE1.attr('src',Horns.all[i].imgPath);

        divE1.append(imgE1);

        let pE1 = $('<p>');

        pE1.text(`${Horns.all[i].name}`);

        divE1.append(pE1);

        let pE2 = $('<p>');
        pE2.text(`${Horns.all[i].info}`);

        divE1.append(pE2);

      } else{ console.log('hidden divs');
      }
    }



  };

  let sortingBy = $('#radioSorting');
  sortingBy.on('change', ()=>{
    let test = $('#hornSort').val();

    if ($('#titleSort').val() === true){
      test = false;
      Horns.all.sort((a, b) => (a.name > b.name) ? 1 : -1); // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
      $('div').hide();
      Horns.all.forEach((element, idx) => {
        Horns.all[idx].render();
        console.log(element.name);

      });
    }
    else if ($('#hornSort').val() === true){
      //sort by number
      Horns.all.sort(function(a, b){return a.horns - b.horns;});
      $('div').hide();
      Horns.all.forEach((element, idx) => {
        Horns.all[idx].render();

      });
    } else { console.log('somthing went wrong');
      console.log($('#hornSort').val());
      console.log($('#titleSort').val());
      console.log(test);


    }
  });
  optionsFilter();
});






