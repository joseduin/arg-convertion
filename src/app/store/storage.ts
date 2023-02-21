import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

@Injectable({
	providedIn: 'root',
})
export class Storages {
	private storage: Storage
	private created: boolean = false

	constructor() {
		this.storage = new Storage({ name: '_arg_conversor_storage' })
	}

	public create(): Promise<Storage> {
		return new Promise((resolve, reject) => {
			this.storage
				.create()
				.then((storage: Storage) => {
					this.created = true
					resolve(storage)
				})
				.catch(reject)
		})
	}

	setItem(reference: string, value: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			while (!this.created) {
				await this.timeout(100)
			}

			this.storage
				.set(reference, value)
				.then(val => resolve(val))
				.catch(reject)
		})
	}

	getItem<T extends any>(reference: string): Promise<T | null> {
		return new Promise(async (resolve, _) => {
			while (!this.created) {
				await this.timeout(100)
			}

			this.storage
				.get(reference)
				.then(val => resolve(val))
				.catch(error => resolve(null))
		})
	}

	remove(reference: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.storage
				.remove(reference)
				.then(val => resolve(val))
				.catch(reject)
		})
	}

	private timeout(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
}
