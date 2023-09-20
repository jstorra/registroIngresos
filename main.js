let myform = document.querySelector("form");
let myTabla = document.querySelector("#myData");
let api = "https://6509d044f6553137159c1062.mockapi.io/tabla";

addEventListener("DOMContentLoaded", async () => {
  let res = await (await fetch(api)).json();
  let trs = res
    .map(
      (res) =>
        `<tr>
          <th scope="row">${res.id}</th>
          <td>${res.valor}</td>
          <td>${res.tipo}</td>
          <td>
          <button data-mod="${res.id}" class="btn-modificar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></button>
          <button data-del="${res.id}" class="btn-eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg></button>
          </td>
        </tr>`
    )
    .join("");
  myTabla.insertAdjacentHTML("beforeend", trs);

  let btnsEl = document.querySelectorAll(".btn-eliminar");
  btnsEl.forEach((btn) => {
    let id = btn.dataset.del;
    let config = {
      method: "DELETE",
    };
    btn.addEventListener("click", async (e) => {
      res = await (await fetch(api + "/" + id, config)).json();
      window.location.reload();
    });
  });

  let btnsMod = document.querySelectorAll(".btn-modificar");

  btnsMod.forEach((btn) => {
    let id = btn.dataset.mod;
    btn.addEventListener("click", (e) => {
      let btnS = document.querySelector(".btn-submit");
      btnS.value = "Actualizar";
      btnS.setAttribute("data-edit", id);
      document.querySelector(
        'input[value="Actualizar"]'
      ).style.backgroundColor = "orange";
      let abuelo = btn.parentElement.parentElement
      document.querySelector('.input-monto').value = abuelo.children[1].textContent
      let tipo = document.querySelector('')
      console.log(abuelo.children[2].textContent);
    });
  });
});

myform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.valor = typeof data.valor === "string" ? Number(data.valor) : null;
  let config = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await (await fetch(api, config)).json();
  window.location.reload();
});
