const container = document.getElementById("container");

function makeGrid(rows, cols) {
	container.style.setProperty("--grid-rows", rows);
	container.style.setProperty("--grid-cols", cols);
	for (c = 0; c < rows * cols; c++) {
		let cell = document.createElement("div");
		container.appendChild(cell).className = "grid-item";
		cell.id = `${c}`;
	}
}
makeGrid(10, 10);

let i, j, k = 0, n = 10, mt = [];
let di = [-1, 0, 1, 0];
let dj = [0, 1, 0, -1];

for (i = 0; i < n; ++i) {
	mt[i] = [];
	for (j = 0; j < n; ++j) {
		mt[i][j] = 1;
	}
}

function isOk(i_next, j_next) {
	if (i_next >= n || i_next < 0 || j_next >= n || j_next < 0) {
		return false;
	}
	return true;
}

let road = [[0, 0]];

function genRandPos() {
	let ok = true, prev_i = 0, prev_j = 0;
	i = 0, j = 0;
	while (ok) {
		let i_next, j_next;
		let auxArr = [];
		for (let k = 0; k < 4; ++k) {
			i_next = i + di[k];
			j_next = j + dj[k];
			if (isOk(i_next, j_next) && mt[i_next][j_next] === 1) {
				auxArr.push(k);
			}
		}
		if (auxArr.length) {
			let next_pos = auxArr[Math.floor(Math.random() * auxArr.length)];
			i_next = i + di[next_pos];
			j_next = j + dj[next_pos];

			mt[i_next][j_next] = 0;

			i = i_next;
			j = j_next;
			road.push([i, j]);
			if (i === n - 1 || j === n - 1) {
				ok = false;
			}
		} else {
			mt[i][j] = -1;
			let aux = road.pop();
			i = aux[0];
			j = aux[1];
		}
	}
}

mt[0][0] = 0;
genRandPos();

function createMaze() {
	for (i = 0; i < n; ++i) {
		for (j = 0; j < n; ++j, ++k) {
			if (mt[i][j] === 0) {
				document.getElementById(k.toString()).style.backgroundColor =
					"#FF5500";
			}
		}
	}
}
createMaze();

let player = document.createElement("div");
player.classList.add("player");
document.getElementById("0").appendChild(player);
i = 0, j = 0;
let lastElem = road[road.length - 1]

function arrIncludes(i_val, j_val) {
	let roadLen = road.length;
	for (let i = 0; i < roadLen; ++i) {
		if (road[i][0] === i_val && road[i][1] === j_val) {
			return true;
		}
	}
	return false;
}

function winFunc() {
	console.log("Win");
	const elem = document.createElement("div");
	elem.setAttribute("id", "win-div");
	elem.innerHTML = "You win!";
	document.body.appendChild(elem);
}

window.addEventListener("keydown", keyEvent) ;
function keyEvent(e) {
	if (e.key === "ArrowUp") {
		i_next = i - 1;
		if (arrIncludes(i_next, j)) {
			let cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).removeChild(player);
			--i;
			cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).appendChild(player);
		}
	}
	else if (e.key === "ArrowDown") {
		i_next = i + 1;
		if (arrIncludes(i_next, j)) {
			// console.log(road.includes([i_next, j]))
			let cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).removeChild(player);
			++i;
			cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).appendChild(player);
		}
	}
	else if (e.key === "ArrowLeft") {
		j_next = j - 1;
		if (arrIncludes(i, j_next)) {
			let cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).removeChild(player);
			--j;
			cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).appendChild(player);
		}
	}
	else if (e.key === "ArrowLeft") {
		j_next = j - 1;
		if (arrIncludes(i, j_next)) {
			let cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).removeChild(player);
			--j;
			cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).appendChild(player);
		}
	}
	else if (e.key === "ArrowRight") {
		j_next = j + 1;
		if (arrIncludes(i, j_next)) {
			let cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).removeChild(player);
			++j;
			cell_id = i * 10 + j;
			document.getElementById(cell_id.toString()).appendChild(player);
		}
	}
	
	if (i === n - 1 || j === n - 1) {
		winFunc()
		window.removeEventListener("keydown", keyEvent);
	}
	isIncluded = false;
};
