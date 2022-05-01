//esperar tela carregar
window.onload = function() {   //o jogo só iniciará quando a janela carregar
	
	var stage = document.getElementById('stage');  //declaramos o palco (matriz do jogo) no js, referenciado o elemento do html
	var contexto = stage.getContext("2d"); //declaramos o contexto
	//O contexto será o elemento no qual estarão referenciadas todas as instruções pertinentes ao jogo

	//fps (quão maior, mais lenta a cobrinha)
	setInterval(game, 85); //a função 'game' será chamada diversas vezes, a cada período de tempo definido (em ms)
	
	const vel = 1;			    //número de casas (px) que a cobrinha andará a cada período
	var vel_x = vel_y = 0;      //velocidades iniciais dos eixos do palco
	var pos_x = pos_y = 10;     //coordenadas/posições iniciais da cabeça da cobrinha
	var dimensao = 20; 	        //dimensão do lado (px) do quadrado de cada casa do palco (área da matriz do jogo)
	var quant_casas_x = 50;     //como o lado dos quadradinhos é 20, a quantidade de casas horizontais é 1200/20 = 60 (stage/lado = casas)
	var quant_casas_y = 30;		//na vertical, só são 30 pois a seção canvas tem uma altura de 600px, enquanto a largura tem 1200px
	var maca_x = maca_y = 15;   //posição inicial da maçã
	
	var rastro = []; //rastro ou corpo da cobrinha (no início, ela só tem a cabeça)
	tail = 5; //tamanho inicial da calda

	function game() { //função game (instruções de jogo)	

		//já esse método, faz a página verificar/esperar um evento acontecer para chamar a função definida
		document.addEventListener("keydown", keyPush); //no caso, quando uma tecla for pressionada (keydown), a função keyPush é chamada

		//primeiramente, atualizamos a posição da cabeça de acord com as velocidades
		pos_x += vel_x;
		pos_y += vel_y;
		if(pos_x < 0 || pos_x > quant_casas_x - 1 || pos_y < 0 || pos_y > quant_casas_y - 1){
			pos_y = pos_x = 10;
			tail = 5;
			vel_y = vel_x = 0;
		}

		contexto.fillStyle = 'black'; //determinamos preto como a cor de fundo do 'contexto', que pertence ao 'palco'/stage
		contexto.fillRect(0, 0, stage.width, stage.height); //pintamos o palco/stage 500x500 com a cor do contexto
		//estes métodos estão no escopo de 'game' porque é preciso atualizar a tela a cada movimento da cobrinha

		contexto.fillStyle = 'red';   //atualizamos o valor usado na função para que possamos usar outra cor para a maçã
		contexto.fillRect(maca_x * dimensao, maca_y * dimensao, dimensao, dimensao); //pintamos uma casa, correspondente a posição da maçã

		contexto.fillStyle = 'gray';   //atualizamos novamente para usar cinza para o rastro
		for (var i = 0; i < rastro.length; i++) {  //percorremos cada posição do rastro para pintar
			contexto.fillRect(rastro[i].x * dimensao, rastro[i].y * dimensao, dimensao, dimensao);  //pintamos cada casa do rastro		
			if (rastro[i].x == pos_x && rastro[i].y == pos_y) {  //se a cobrinha bater em si mesma
				pos_y = pos_x = 10;								 //reinício
				tail = 5;
				vel_y = vel_x = 0;
			}
		}

		rastro.push({x:pos_x, y:pos_y}); //inserimos um elemento ao rastro, de acordo com a posição da cabeça
		while(rastro.length > tail){  //verificamos se o rastro está maior que tamanho da cauda
			rastro.shift(); //se sim, retiramos o primeiro elemento do rastro
		}

		if(pos_x == maca_x && pos_y == maca_y){                  //se a cobrinha comer a maçã
			tail++;					                             //aumentamos a cauda
			for (var i = 0; i < rastro.length; i++) {
				do{ //criamos este condião para que a maçã não apareça em uma casa onde a calda ou a cabeça já está
					maca_x = Math.floor(Math.random() * quant_casas_x);  //reposicionamos a maçã horizontalmente
					maca_y = Math.floor(Math.random() * quant_casas_y);  //e verticalmente
				} while(maca_x == rastro[i].x && maca_y == rastro[i].y || maca_x == pos_x && maca_y == pos_y);
			}
		}

		//Movimentos
		function keyPush(event){
			switch(event.keyCode){
				case 37: 			//esquerda/left
					vel_x = -vel;   //voltamos de uma em uma casa no eixo horizontal
					vel_y = 0;		//não mudamos a posição verticalmente
					break;			//------------------------------------------- Essa lógica se repete nas outras opções
				case 38:      		//cima/up
					vel_x = 0;
					vel_y = -vel;
					break;
				case 39:      		//direita/right
					vel_x = vel;
					vel_y = 0;
					break;
				case 40:      		//baixo/down
					vel_x = 0;
					vel_y = vel;
					break;
				default:
					//não há uma outra possibilidade (outras teclas pressionadas não vão interferir na execução)
					break; 
			}
		}

	}
}