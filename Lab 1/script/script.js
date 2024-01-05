//
let name = "Nguyen Hue Kha";

let birthday = "04/10/2004";

// arroww function
let sayHello = () => {
  console.log(`I'm ${name}, ${birthday}`);
};

// sayHello();


fetch("https://api.publicapis.org/entries")
    .then(function (response){
        response.json().then(function(data){
            console.log(data.entries);
            let array = data.entries;

            let html = document.getElementById('PC05971')
            let child_html = `<ul><li><strong> COUNT: </strong> ${data.count}</li>`;
            html.innerHTML = data.count;

            array.forEach(element => {
                console.log(element.Description);
                child_html += `<li> ${element.Description} </li>`
            });

            child_html += `</ul>`;
            html.innerHTML = child_html;

        })
    })