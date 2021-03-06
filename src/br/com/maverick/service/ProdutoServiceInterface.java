package br.com.maverick.service;

import java.util.List;

import br.com.maverick.model.ProdutoModel;

public interface ProdutoServiceInterface {

	ProdutoModel salvarProduto(ProdutoModel produtoModel);
	
	void alterar(ProdutoModel produtoModel);
	
	void excluir(ProdutoModel produtoModel);
	
	List<ProdutoModel> getProdutos();

	List<ProdutoModel> getProdutos(Integer codProduto);

	void alterar(Integer codProduto, Integer qtdEstoque);
	
}
