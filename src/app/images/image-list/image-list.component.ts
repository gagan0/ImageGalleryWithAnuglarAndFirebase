import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ImageService } from 'src/app/shared/image.service';

@Component({
	selector: 'app-image-list',
	templateUrl: './image-list.component.html',
	styles: []
})
export class ImageListComponent implements OnInit
{
	imageList: any[];
	rowIndexArray: any[];

	constructor(private imageService: ImageService) { }
	
	ngOnInit()
	{
		this.imageService.imageDetailList.snapshotChanges().subscribe(
			list =>
			{
				this.imageList = list.map(item =>
					{
						return item.payload.val();
					});
				
				this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
			}
		)
	}
}
