package br.com.maverick.service;

import java.util.List;

import br.com.maverick.model.KitModel;

public interface KitServiceInterface {

List<KitModel> getKits();
	
	KitModel getKitById(Integer codKit);
	
}
