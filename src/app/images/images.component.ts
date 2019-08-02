import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ImageService } from '../shared/image.service';

@Component({
	selector: 'app-images',
	templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit
{
	constructor(private imageService: ImageService) { }

	ngOnInit()
	{
		this.imageService.getImageDetailList();
	}
}
