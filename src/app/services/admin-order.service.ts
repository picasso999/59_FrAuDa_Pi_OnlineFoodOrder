import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Order } from '../models/orderItem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Order[]>;
  private itemDoc: AngularFirestoreDocument<Order>;
  item: Observable<Order>;

  constructor(private readonly afs: AngularFirestore) {}

  getOrders(): Observable<Order[]> {
    /*
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    */
    this.itemsCollection = this.afs.collection<Order>('orders');
    return this.itemsCollection.valueChanges();
  }

  getOrder(uuid: string) {
    return this.afs
      .collection('orders', ref => ref.where('uid', '==', uuid))
      .valueChanges();
  }

  addOrder(order: Order) {
    this.itemsCollection = this.afs.collection<Order>('orders/');
    this.itemsCollection.add(order);
  }
}
