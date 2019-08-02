import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
	providedIn: 'root'
})

export class ImageService
{
	imageDetailList: AngularFireList<any>;
	
	constructor(private angularFireDatabase: AngularFireDatabase) { }

	getImageDetailList()
	{
		this.imageDetailList = this.angularFireDatabase.list("imageDetails");
	}
	insertImageDetails(imageDetails)
	{
		this.imageDetailList.push(imageDetails);
	}
}
