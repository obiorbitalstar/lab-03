/* eslint-disable no-trailing-spaces */
$(document).ready(function(){


  function Horns(horn){
    this.name= horn.title;
    this.imgPath=horn.image_url;
    this.info = horn.description;
    this.keyword =horn.keyword;
    this.horns = horn.horns;
    Horns.all.push(this);
  }

  const readJson = (e) => {
    $.ajax(`./data/page-${e}.json`, { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(element => {
        let box = new Horns(element);
        box.selectOptionFiller();
        box.render();
      });
    });
  };

  Horns.all = [];
  let options =[];
  readJson(1);

  Horns.prototype.selectOptionFiller = function(){
    if(!options.includes(this.keyword)){
      options.push(this.keyword);
      $('#keyselectors').append(`<option>${this.keyword}</option>`);
    }else {
      console.log('we already have that');

    }
  };


  $('#page1').on('click', ()=>{
    $('#container').empty();

    readJson(1);

  });

  $('#page2').on('click', ()=> {
    $('#container').empty();

    readJson(2);
  });



  Horns.prototype.render = function() {
    let $box = $('#box').html();
    var rendered = Mustache.render($box , this);
    $('#container').append(rendered);
  };

  let optionsFilter = ()=>{
    $('#keyselectors').change(function(){
      $('#container').empty();
      let selectedValue = this.value;
      console.log('test',selectedValue);

      filterAfterSelect(selectedValue);

    });

  };
  let filterAfterSelect = (slectedOp)=>{
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

  $('#radioSorting').on('click',(e)=>{
    // if(!e.target.id==='#radioSorting'){
    if(e.target.id === 'titleSort'){
      $('#container').empty();
      sortDivsBy(Horns.all,'name');
      Horns.all.forEach((element => {
        element.render();

      }));
        
    }else if (e.target.id === 'hornSort') {
      $('#container').empty();
      sortDivsBy(Horns.all,'horns');
      Horns.all.forEach((element => {
        element.render();

      }));
    }
  });
 
  let sortDivsBy = (array,property)=>{
    array.sort((a,b)=> {

      let firstItem = a[property];
      let secondItem = b[property]; 
      if (firstItem > secondItem){ 
        return 1; 

      } else if (secondItem > firstItem) { 
        return -1; 
      } else {return 0;}
    });


  };

  optionsFilter();
});






