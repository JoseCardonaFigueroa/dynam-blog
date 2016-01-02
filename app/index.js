(function myBlog() {

  var app = {
    DOMapi: domApiFunc(),
    dataApi : dataApiFunc(),
    addSections: addSectionsFunc,
    addMenu: addMenuFunc,
    mainContainer: null,
    menu: null,
    sections: null,
    init: init
  }

  app.init();

  function init() {
    this.addSections();
    this.addMenu();
  }

  function addSectionsFunc() {

    function constructSection() {
      var container = this.DOMapi.getContainer('main-sections-container');

      function addArticle(item) {
        var newSection = document.createElement('section');
        var newHeader = document.createElement('header');
        var newMoreBtn = document.createElement('div');
        var newArticle = document.createElement('article');

        newMoreBtn.className = "full";
        newMoreBtn.innerHTML += "<span> more </span>";

        newSection.appendChild(newHeader);
        newSection.appendChild(newMoreBtn);
        newSection.appendChild(newArticle);
        container.appendChild(newSection);

        newHeader.innerHTML += "<h2>" + item.title + "</h2>";
        newArticle.innerHTML += "<img src='" + item.img + "'>";
        newArticle.innerHTML += "<p>"+ item.body+"</p>";
      }
      this.DOMapi.addItems(this.sections, addArticle);
    };
    function addArticleToDOM(obj) {
      this.sections = obj.sections;
      this.menu = obj.menu;
      constructSection.call(this);
    }
    this.dataApi.getData(addArticleToDOM.bind(this));
  };

  function addMenuFunc() {
    function constructMenu() {
      var container = this.DOMapi.getContainer("main-nav");
      var newNav = document.createElement("nav");
      var newList = document.createElement("ul");
      newNav.appendChild(newList);
      container.appendChild(newNav);
      function addList(item, index) {
        var index = index + 1;
        newList.innerHTML += "<li>"+(item.title + " " + index)+"</li>";
      }
      this.DOMapi.addItems(this.menu, addList)
    }
    function addMenuToDOM(obj) {
      this.sections = obj.sections;
      this.menu = obj.sections;
      constructMenu.call(this);
    }
    this.dataApi.getData(addMenuToDOM.bind(this));
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
        }
      }
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
