'use strict';
$(function() {

  //загружаем шаблон
  fetch("template.htm")
    .then(x => {
      if (x.ok) return x.text();
      else {
        throw new Error(x.status + " " + x.statusText);
      }
    })
    .then(function(template) {
      //если шаблон загружен, то загружаем данные
      fetch("data.json")
        .then(x => {
          if (x.ok) return x.json();
          else {
            throw new Error(x.status + " " + x.statusText);
          }
        })
        .then(function(data) {
          let lines = Math.ceil(data.length / 4),
            arr = [],
            posItem = 0;

          //создаём новый массив, чтобы разбить альбомы по строкам
          for (let i = 0; i < lines; i++) {
            arr[i] = {
              key: data.slice(posItem, posItem + 4)
            };
            posItem += 4;
          }

          $.tmpl(template, arr).appendTo('.SAlbums');
        })
        .catch(function(e) {
          //если данные не загружены, то показываем алерт ошибки
          alert("data error: " + e.message);
        });

    })
    .catch(function(e) {
      //tckb шаблон не загружен, то загружаем шаблон ошибки
      fetch("template_error.htm")
        .then(x => {
          if (x.ok) return x.text();
          else {
            throw new Error(x.status + " " + x.statusText);
          }
        })
        .then(function(template) {
          $.tmpl(template, e).appendTo('body');
        })
        .catch(function() {
          //если и этот шаблон не загружен, то показываем алерт ошибки
          alert("template error: " + e.message);
        });

    });
});