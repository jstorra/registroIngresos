const myform = document.querySelector("form");
const myTabla = document.querySelector("#myData");
const btnS = document.querySelector(".btn-submit");
const inputSearch = document.querySelector(".search-input");
const api = "https://6509d044f6553137159c1062.mockapi.io/tabla";

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
  myTabla.insertAdjacentHTML("afterbegin", trs);
  let btnsEl = document.querySelectorAll(".btn-eliminar");
  eliminar(btnsEl);
  let btnsMod = document.querySelectorAll(".btn-modificar");
  modificar(btnsMod);
  totales(res);
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
  if (btnS.value === "Actualizar") {
    let id = btnS.dataset.edit;
    config.method = "PUT";
    await fetch(api + "/" + id, config);
  } else await fetch(api, config);
  window.location.reload();
});

inputSearch.addEventListener("change", async (e) => {
  let id = inputSearch.value;
  let res = await (await fetch(api)).json();
  let filteredResults = res.filter((item) => item.id.startsWith(id));
  let tableHTML = "";
  filteredResults.forEach((result) => {
    tableHTML += `<tr>
    <th scope="row">${result.id}</th>
    <td>${result.valor}</td>
    <td>${result.tipo}</td>
    <td>
    <button data-mod="${result.id}" class="btn-modificar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
  </svg></button>
    <button data-del="${result.id}" class="btn-eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
  </svg></button>
    </td>
  </tr>`;
  });
  myTabla.innerHTML = tableHTML;
  let btnsEl = document.querySelectorAll(".btn-eliminar");
  eliminar(btnsEl);
  let btnsMod = document.querySelectorAll(".btn-modificar");
  modificar(btnsMod);
  totales(filteredResults);
});

function eliminar(btnsEl) {
  btnsEl.forEach((btn) => {
    let id = btn.dataset.del;
    let config = {
      method: "DELETE",
    };
    btn.addEventListener("click", async (e) => {
      await fetch(api + "/" + id, config);
      window.location.reload();
    });
  });
}

function modificar(btnsMod) {
  btnsMod.forEach((btn) => {
    let id = btn.dataset.mod;
    btn.addEventListener("click", async (e) => {
      btnS.value = "Actualizar";
      btnS.setAttribute("data-edit", id);
      document.querySelector(
        'input[value="Actualizar"]'
      ).style.backgroundColor = "orange";
      let res = await (await fetch(api + "/" + id)).json();
      document.querySelector(".input-monto").value = res.valor;
      let radioIngreso = document.querySelector('input[value="ingreso"]');
      let radioEgreso = document.querySelector('input[value="egreso"]');
      radioEgreso.value === res.tipo
        ? (radioEgreso.checked = true)
        : (radioIngreso.checked = true);
      let btnCancelar = document.querySelector(".btn-cancelar");
      btnCancelar.style.display = "block";
      btnCancelar.addEventListener("click", (e) => {
        window.location.reload();
      });
    });
  });
}

function totales(data) {
  let sumIngresos = 0;
  let sumEgresos = 0;
  data.forEach((element) => {
    element.tipo === "ingreso"
      ? (sumIngresos += element.valor)
      : (sumEgresos += element.valor);
  });
  const spanIngresos = document.querySelector(".total-ingresos");
  const spanEgresos = document.querySelector(".total-egresos");
  const spanTotal = document.querySelector(".total");
  spanIngresos.style.color = "#72e500";
  spanEgresos.style.color = "orange";
  sumEgresos > sumIngresos
    ? (spanTotal.style.color = "tomato")
    : (spanTotal.style.color = "#72e500");
  spanIngresos.innerHTML = sumIngresos;
  spanEgresos.innerHTML = sumEgresos;
  spanTotal.innerHTML = sumIngresos - sumEgresos;
}
