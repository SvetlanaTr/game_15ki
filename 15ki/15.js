var arr = [], box, ei,ej;						
function swap(arr,i1,j1,i2,j2){	//смена элементов массива с заданными индексами.			
	t = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
	arr[i2][j2] = t;
}
window.onload = function() {				
	box = document.getElementById("box");
	newGame();				
	document.getElementById("reset").onclick = newGame;						
}
function cellClick(event) {
	var event = event || window.event,
		el = event.srcElement || event.target,
		i = el.id.charAt(0),
		j = el.id.charAt(2);
	if((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)){					
		document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
		el.innerHTML = "";
		ei = i;
		ej = j;
		var q = true;
		for(i = 0; i < 4; ++i)
			for(j = 0; j < 4; ++j)
				if(i + j != 6 && document.getElementById(i + " " + j).innerHTML != i*4 + j + 1){
					q = false;
					break;
				}
				if(q) alert("Victory!");
			}
}
//Для хранения номеров костяшек буду использовать ступенчатый массив, то есть массив массивов. Забьём его по порядку числами от одного до пятнадцати, а значение последнего элемента установим равным пустой строке. Этому элементу будет соответствовать место не занятое костяшкой. Создадим функцию newGame
function newGame(){			
	for(i = 0; i < 4; ++i){
		arr[i] = []
		for(j = 0; j < 4; ++j){
			if(i + j != 6)
				arr[i][j] = i*4 + j + 1;
			else
				arr[i][j] = "";
		}//Такое расположение элементов в массиве соответствует выигрышному расположению костяшек.
	}
	ei = 3;
	ej = 3;
	for(i = 0; i < 1600; ++i)//перемешивание
		switch(Math.round(3*Math.random())){
			case 0: if(ei != 0) swap(arr,ei,ej,--ei,ej); break; // up
			case 1: if(ej != 3) swap(arr,ei,ej,ei, ++ej); break; // right
			case 2: if(ei != 3) swap(arr,ei,ej,++ei,ej); break; // down
			case 3: if(ej != 0) swap(arr,ei,ej,ei,--ej); // left
		}
	var table = document.createElement("table"),//Cоздаём таблицу
		tbody = document.createElement("tbody");//Добавляем в неё строки				
	table.appendChild(tbody);
	for(i = 0; i < 4; ++i){ 
        /* Привязываем к событию, происходящему
			 * при клике по ячейке таблицы функцию
			 * cellClick 
			 */
		var row = document.createElement("tr");
		for(j = 0; j < 4; ++j){
			var cell = document.createElement("td");
				cell.id = i + " " + j;
				cell.onclick = cellClick;//Записываем в ячейку соответсвующий эл-т массива
				cell.innerHTML = arr[i][j];
				row.appendChild(cell);// Добавляем ячейку в строку
		}
		tbody.appendChild(row);	// Добавляем строку в итаблицу				
	} 
	if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);	
	box.appendChild(table);	
}