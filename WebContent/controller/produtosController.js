var produtosModulo = angular.module('produtosModulo',['ngCookies']);

produtosModulo.controller("produtosController",function($http, $location, $scope, $rootScope, $cookies){
	
	//autenticação de login
	$rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray(window.location.href, ['http://localhost:80/Oficina/login.html']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
        	window.location.href="http://localhost:80/Oficina/login.html";

        }
        
        
        $scope.perfil = $rootScope.globals.currentUser.usuario.perfilModel.nomePerfil;
    });
	
    $scope.sair = function(){
    	 $rootScope.globals = {};
         $cookies.remove('globals');
         $http.defaults.headers.common.Authorization = 'Basic';
         window.location.href="http://localhost:80/Oficina/login.html";	
    };
	
	urlModelo = 'http://localhost:80/Oficina/rest/modelos';
	urlProduto = 'http://localhost:80/Oficina/rest/produtos';
	urlEstoque = 'http://localhost:80/Oficina/rest/estoques';
	
	function cadastroCompleto(){
		
		if(!$scope.produto.tipoProduto || !$scope.produto.porta ||
		   !$scope.produto.nomeProduto || !$scope.produto.modeloModel){
			return false;
		}else{
			return true;
		}
		
	}
	
	$scope.listarModelos = function(){
		$http.get(urlModelo).success(function (modelos){
			$scope.modelos = modelos;
		}).error(function (erro){
			alert(erro);
		})
	}
	
	$scope.listarProdutos = function(){
		$http.get(urlProduto).success(function (produtos){
			$scope.produtos = produtos;
		}).error(function (erro){
			alert(erro);
		})
	}
	
	$scope.getModelo = function(){
		$http.get(urlModelo+'/'+$scope.pesquisaCarro.codModelo).success(function (modelo){
		}).error(function (erro){
			alert(erro);
		})	
	}
	
	$scope.abrirModalLancarProdutoEstoque = function(){
		$('#lancarProdutosEstoque').modal('show');
		document.getElementById('modalQtdProduto').value = "";
		document.getElementById('modalVlrPago').value = "";
		document.getElementById('modalVlrVenda').value = "";
	}
	
	$scope.pesquisaCarro = function(modeloSelecionado){
		$scope.produto.modeloModel = modeloSelecionado;
		document.getElementById('nomeModeloCar').value =  modeloSelecionado.nomeModelo+' / '+modeloSelecionado.qtdPortas+'P / '+modeloSelecionado.ano;
	}
    
	$scope.selecionaProduto = function(produtoSelecionado){
		$scope.produto = produtoSelecionado;
		document.getElementById('nomeModeloCar').value =  produtoSelecionado.modeloModel.nomeModelo+' / '+produtoSelecionado.modeloModel.qtdPortas+'P / '+produtoSelecionado.modeloModel.ano;
	}
	
	$scope.atualizaEstoque = function (){
		$scope.teste();
	}
	
	function estoqueCompleto(){
		if(document.getElementById('modalVlrPago').value.length != 0 || document.getElementById('modalVlrVenda').value.length != 0 || 
		   document.getElementById('modalQtdProduto').value.length != 0){
			return true;
		}else{
			return false;
		}

	}

	
	$scope.limparCampos = function(){
			$scope.produto.tipoProduto="N";
			$scope.produto.codProduto="";
			$scope.produto.modeloModel="";
			$scope.produto.nomeProduto="";
			$scope.produto.observacao="";
			$scope.produto.porta="";
			document.getElementById('nomeModeloCar').value = "";
		
	}
	
	$scope.salvar = function() {
		if(cadastroCompleto()){
			if($scope.produto.codProduto == undefined){
				$http.post(urlProduto,$scope.produto).success(function(produto){
					$scope.limparCampos();
					$scope.listarProdutos();
					$('#nav-lista-tab').tab('show');
					$scope.chamarModalMensagens('Mensagem!','Produto cadastrado com sucesso!');					
				}).error(function(erro){
					alert(erro);
				});			
			}else{
				$http.put(urlProduto,$scope.produto).success(function(produto){
					$scope.listarProdutos();
					$scope.chamarModalMensagens('Mensagem!','Produto atualizado com sucesso!');
				}).error(function (erro){
					alert(erro);
				});
			}
		}else{
			$scope.chamarModalMensagens('Erro!','Os campos marcados com um asterísco(*) vermelho são obrigatórios!');
		}
	}
	
	$scope.excluir = function(){
		if($scope.produto.codProduto == undefined || $scope.produto.codProduto == ""){
			$scope.chamarModalMensagens('Erro!','Para efetuar a exclusão é necessário selecionar um produto!');
		}else{
			$http.delete(urlProduto+'/'+$scope.produto.codProduto).success(function(){
				$scope.listarProdutos();
				$('#nav-lista-tab').tab('show');
				$scope.chamarModalMensagens('Mensagem!','Produto exclído com sucesso!');	
				
			}).error(function (erro){
				alert(erro);
			});
		}
	}
	
	//função que chama um Modal para apresentar mensagens, recebe de parâmetro um título e uma mensagem
    $scope.chamarModalMensagens = function (vTitulo, vMensagem){
    	$('#modalMensagens').modal('show');
    	document.getElementById('pTitulo').innerHTML = vTitulo;
    	document.getElementById('pMsg').innerHTML = vMensagem;
    	
    }
    
    //função que fecha o modal de mensagem
    $scope.fecharModalMensagens = function(){
    	document.getElementById('pTitulo').innerHTML = "";
    	document.getElementById('pMsg').innerHTML = "";
    	$('#modalMensagens').modal('hide');
    }
	
	//executa
	$scope.listarModelos();
	$scope.listarProdutos();

});