(function myBlog() {

  var app = {
    DOMapi: domApiFunc(),
    dataApi : dataApiFunc(),
    addSections: addSectionsFunc,
    mainContainer: null,
    menu: null,
    sections: null,
    init: init
  }

  app.init();

  function init() {
    this.menu = this.dataApi.getData(function (parsedJSON) {
      return parsedJSON;
    });
    this.sections = this.dataApi.getData(function (parsedJSON) {
      return parsedJSON;
    });
    console.log(this.menu);
    console.log(this.sections);
    console.log('Ejecutando función');
    // console.log(this.addSections());
    this.addSections()
  }

  function addSectionsFunc() {
    console.log('Ejecutando addSectionsFunc');

    function constructSection() {
      console.log('Ejecutando constructSection');
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
      // Se envían los datos al html
      this.DOMapi.addItems(this.menu, addArticle);
    };
    function addArticleToDOM(obj) {
      this.sections = obj.data.sections;
      this.menu = obj.data.menu;
      constructSection.call(this);
    }
    this.DataApi.getData(addArticleToDOM.bind(this));
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
      xmlhttp.open("GET", URLs.get, true);
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          callBack(JSON.parse(xmlhttp.responseText));
        };
      };
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
