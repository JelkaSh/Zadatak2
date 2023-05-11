//Pomoću jQueryja:
	
// 	- pratite resize događaj na korisničkom ekranu ispisujući širinu ekrana u konzolu
// 	- pratite kretanje miša i na ulazak miša preko retka tablice promijenite mu pozadinsku boju
// 	- na izlazak miša sa retka mora se pozadinska boja vratiti na prijašnju


$(document).ready(function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

  function addStripes() {
    $("table tr").removeClass("striped");
    $("table tr:nth-child(even)").addClass("striped");
  }

  function afterRender() {
    $('[data-toggle="popover"]').popover();
    $("table th").css("color", "darkBlue");

    $("table tr").on("mouseenter", (event) => { //on.mouseenter
      $(event.currentTarget).css("backgroundColor", "yellow"); //poziv css-a
    });

    $("table tr").on("mouseleave", (event) => { //mouseleave; uklanjamo atribut style
      $(event.currentTarget).removeAttr("style");
    });

    addStripes();

    setTimeout(function () {
      const hideElements = $("table td a:contains('p')").filter(function () {
        return this.innerHTML.indexOf("p") == 0;
      });
      hideElements.closest("tr").remove();
      addStripes();

      const info = $("<div></div>")
        .insertAfter($("#pokemon-list"))
        .text("Skriveno: " + hideElements.length);
    }, 2000);
  }

  function fillList() {
    const data = JSON.parse(xhr.response); 
    const source = document.getElementById("pokemon-list").innerHTML;
    const template = Handlebars.compile(source);
    const context = {
      pokemon: data.pokemon_species.slice(0, 20),
      tableClass: "table",
    };
    const html = template(context);

    document.getElementById("result").innerHTML = html;

    afterRender();
  }

  $(window).resize(() => { //imamo kako se prozor resajza
    console.log($(window).width()); //kako se u konzoli ispisuje širina tog prozora
  });

  xhr.onload = function () {
    fillList();
  };

  xhr.send();
  
})