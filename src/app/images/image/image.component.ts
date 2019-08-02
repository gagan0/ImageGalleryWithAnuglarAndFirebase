import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styles: []
})

export class ImageComponent implements OnInit
{
	imgSrc: String = "assets/img/default-image.png";
	selectedImage: any = null;
	isSubmitted: boolean = false;

	formTemplate = new FormGroup(
		{
			caption: new FormControl("", Validators.required),
			category: new FormControl(""),
			imageUrl: new FormControl("", Validators.required),
		});

	constructor(private angularFireStorage: AngularFireStorage) { }

	ngOnInit()
	{
	}

	showPreview(event: any)
	{
		if(event.target.files && event.target.files[0])
		{
			const reader = new FileReader();

			reader.onload = (e: any) =>
			{
				this.imgSrc = e.target.result;
			}

			reader.readAsDataURL(event.target.files[0]);
			this.selectedImage = event.target.files[0];
		}
		else
		{
			this.imgSrc = "assets/img/default-image.png";
			this.selectedImage = null;
		}
	}

	onSubmit(formValue: any)
	{
		this.isSubmitted = true;

		if(this.formTemplate.valid)
		{
			var filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
			const fileRef = this.angularFireStorage.ref(filePath);

			this.angularFireStorage.upload(filePath, this.selectedImage)
									.snapshotChanges()
									.pipe
									(
										finalize(() => 
										{
											fileRef.getDownloadURL().subscribe
										})
									)
									.subscribe();
		}
	}

	get formControls()
	{
		return this.formTemplate["controls"];
	}
}
