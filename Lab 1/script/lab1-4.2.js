fetch("https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students")
  .then(response => response.json())
  .then(data => {
    let studentContainer = document.getElementById("lab1-4.2");

    data.forEach((student, index) => {
      let row = document.createElement("div");
      row.className = "row align-items-start";

      let createColumn = (className, content) => {
        let col = document.createElement("div");
        col.className = className;
        col.innerHTML = content;
        return col;
      };

      row.appendChild(createColumn("col", index + 1));
      row.appendChild(createColumn("col", `<img src="${student.avatar}" alt="avatar">`));
      row.appendChild(createColumn("col", student.name));
      row.appendChild(createColumn("col", new Date(student.createdAt).toLocaleString()));

      studentContainer.appendChild(row);
    });
  })
  .catch(error => console.log("Error fetching data:", error));
