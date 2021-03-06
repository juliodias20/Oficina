package br.com.maverick.rest.facade;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.maverick.model.EstoqueModel;
import br.com.maverick.service.EstoqueServiceInterface;

@Path("/estoques")
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes(MediaType.APPLICATION_JSON)
public class EstoqueRestFacade {

	@Inject
	private EstoqueServiceInterface estoqueServiceInterface;

	@GET
	public List<EstoqueModel> getEstoques() {
		return estoqueServiceInterface.getEstoques();
	}

	@GET
	@Path("/{codProduto}")
	public List<EstoqueModel> getEstoquesPorProduto(@PathParam("codProduto") Integer codProduto) {
		return estoqueServiceInterface.getEstoquesPorProduto(codProduto);
	}

	@POST
	public EstoqueModel salvarEstoque(EstoqueModel estoqueModel) {
		return estoqueServiceInterface.salvarEstoque(estoqueModel);
	}

	@PUT
	public void alterar(EstoqueModel estoqueModel) {
		estoqueServiceInterface.alterar(estoqueModel);
	}
	
	@PUT
	@Path("/{codProduto}/{qtdEstoque}")
	public void alterar(@PathParam("codProduto") Integer codProduto,
						@PathParam("qtdEstoque") Integer qtdEstoque) {
		estoqueServiceInterface.alterar(codProduto, qtdEstoque);
	}

}
