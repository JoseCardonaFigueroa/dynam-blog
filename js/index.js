// (function myBlog(){

//   var app = function(){
//     function getSections(id){
//       return document.querySelectorAll(id);
//   }
//   var publicAPI = {
//     getSections: getSections
//   }
//   return publicAPI;
// }();

//   console.log(app.getSections("section"));

// })();

(function myBlog(){

  var app = {
    myDOMapi: domApiFunc(),
    addSections: addSectionsFunc,
    mainContainer: null,
    init: init
}

app.init();

function init() {

  this.addSections();
}

function addSectionsFunc(){
   this.mainContainer = this.myDOMapi.getSectionContainer('main-sections-container');
  var sections = [   //do request for sections(AJAX)
    '<section>section 1</section>',
    '<section>section 2</section>'
    ];
    function addItemHTML(item){
      this.mainContainer.innerHTML += item;
    }
    this.myDOMapi.addItems(sections, addItemHTML.bind(this));
}

/*function updateArticleText(){
  var sections = this.myDOMapi.getSections('.section');
  for (var i = i < section.length; i++) {
    var els = sections[i].children[3].getElementsByTagName('p');
    for (var x = x < section.length; x++){
      els[x].textContent = "lorem";
    };
  };
}*/

function domApiFunc(){
  function getSectionContainer(id){
    return document.getElementById(id);
  }
  function addItems(items, callBack){
    for (var i = 0; i < items.length; i++) {
        callBack(items[i]);
    };
  }
  var publicAPI = {
    getSectionContainer: getSectionContainer,
    addItems: addItems
  }
  return publicAPI;
};

})();
