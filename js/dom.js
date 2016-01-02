(function myBlog() {

  var app = {
    DOMapi: domApiFunc(),
    addSections: addSectionsFunc,
    mainContainer: null,
    init: init
  }

  app.init();

  function init() {
    this.addSections();
  }

  function addSectionsFunc() {
    function constructSection() {
      var container = this.DOMapi.getContainer('main-sections-container');
      console.log(container);
      var newSection = document.createElement('section');
      var newHeader = document.createElement('header');
      var newMoreBtn = document.createElement('div');
      var newArticle = document.createElement('article');

      newMoreBtn.className = "full";
      newMoreBtn.innerHTML += "<span> more </span>";

      newSection.appendChild(newHeader);
      newSection.appendChild(newMoreBtn);
      newSection.appendChild(newArticle);

      function addArticle(item) {
        newArticle.innerHTML += "<h2>" + item.title + "</h2>";
        newArticle.innerHTML += "<img src='" + item.img + "'>";
        newArticle.innerHTML += "<p>"+ item.body+"</p>";
      }
      function addArticleMenu(obj) {
        this.sections = obj.data.sections;
        this.menu = obj.data.menu;
        constructMenu.call(this);
      }
      // Se envían los datos al html
      this.DOMapi.addItems(this.menu, addArticle);
    };
  };

  function domApiFunc() {
    function getContainer(id) {
      return document.getElementById(id);
    }

    /*
    * Agrega los elementos de acuerdo al callback
    */
    function addItems(items, callBack) {
      for (var i = 0; i < items.length; i++) {
        callBack(items[i], i);
      };

    }

    var publicAPI = {
      getContainer: getContainer,
      addItems: addItems
    }

    return publicAPI;
  };

  function dataApiFunc() {
    var URLs = {
      get: "data/sections.json",
      post: "nothing yet"
    };
    function getData(callBack) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          callBack(JSON.parse(xmlhttp.responseText));
        };
      };
      xmlhttp.open("GET", URLs.get, true);
      xmlhttp.send();
    }
    function sendData() {
      //code to send data
      //to server/WS
    }
    var publicAPI = {
      getData: getData,
      sendData: sendData
    }
    return publicAPI;
  };
})();
