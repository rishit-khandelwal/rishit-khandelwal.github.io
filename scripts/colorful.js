let colors = [
  "#1175F0",
  "#2FF588",
  "#C5DE35",
  "#F5AD2F",
  "#EB3B2D"
];


/**
 * 
 * @param {Element} element 
 */
function rainbow(element) {
  const color = colors.pop()
  element.style.color = color;
  element.children[0].style.color = colors[Math.floor(Math.random() *colors.length)]
  colors = [color, ...colors];
}

window.onload = () => {
  const element = document.querySelector("div.join_dis");
  
  setInterval(() => {rainbow(element)}, 600);
}