import {firebaseDatabase} from '../utils/firebaseUtils'

export class FirebaseService {
    static getDataList = (nodePath, callback, size = 10, byUser = null) => {
        let query = firebaseDatabase.ref(nodePath);
        if(byUser) {
            query = query.child("user").equalTo(byUser);
        }
        if(size) {
            query = query.limitToLast(size);
        }

        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

}