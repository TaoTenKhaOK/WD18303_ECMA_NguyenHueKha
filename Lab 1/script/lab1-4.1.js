fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
  .then(response => response.json())
  .then(data => {
    console.log(data);

    let container = document.getElementById("dataContainer");
    data.data.forEach((item, index) => {
      let newRow = document.createElement("div");
      newRow.className = "row align-items-start";

      ["", "Nation", "Year", "Population"].forEach(property => {
        let col = document.createElement("div");
        col.className = "col";
        col.textContent = property ? item[property] : index + 1;
        newRow.appendChild(col);
      });

      container.appendChild(newRow);
    });
  })