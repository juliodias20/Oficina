package br.com.maverick.service;

import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;

import br.com.maverick.Dao.ProdutoDaoInterface;
import br.com.maverick.model.ProdutoModel;

public class ProdutoServiceImplem implements ProdutoServiceInterface {

	@Inject
	private ProdutoDaoInterface produtoDaoInterface;
	
	@Override
	@Transactional
	public ProdutoModel salvarProduto(ProdutoModel produtoModel) {
		produtoDaoInterface.salvarProduto(produtoModel);
		return produtoModel;
	}

	@Override
	@Transactional
	public void alterar(ProdutoModel produtoModel) {
		produtoDaoInterface.alterar(produtoModel);
	}
	
	@Override
	@Transactional
	public void alterar(Integer codProduto, Integer qtdEstoque) {
		produtoDaoInterface.alterar(codProduto, qtdEstoque);
	}

	@Override
	@Transactional
	public void excluir(ProdutoModel produtoModel) {
		produtoDaoInterface.excluir(produtoModel);
	}

	@Override
	public List<ProdutoModel> getProdutos() {
		return produtoDaoInterface.getProdutos();
	}
	
	@Override
	public List<ProdutoModel> getProdutos(Integer codProduto) {
		return produtoDaoInterface.getProdutos(codProduto);
	}

}
