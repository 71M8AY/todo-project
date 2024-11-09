import { library } from "./library";
import "./style.css";

const libraryDiv = document.querySelector(".library");
const projectDiv = document.createElement("div");
projectDiv.className = "add";
projectDiv.appendChild(document.createElement("p"));
projectDiv.appendChild((document.createElement("img").src = "./edit.svg"));
projectDiv.appendChild((document.createElement("img").src = "./delete.svg"));
