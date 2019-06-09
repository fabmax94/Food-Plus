import {firebaseDatabase} from '../utils/firebaseUtils'

export class FirebaseService {
    static listener;
    static nodeCommentPath = "comida/comment";
    
    static offDataList = (nodePath) => {
        if(FirebaseService.listener) {
            firebaseDatabase.ref(nodePath).off('value', FirebaseService.listener);
        }
    }

    static listenerQuery = (query, callback) => {
        FirebaseService.listener = query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });
    }

    static getDataList = (nodePath, callback, size = 10, byUser = null) => {
        let query = firebaseDatabase.ref(nodePath);
        if(byUser) {
            query = query.orderByChild("user").equalTo(byUser);
        }
        if(size) {
            query = query.limitToLast(size);
        }

        FirebaseService.listenerQuery(query, callback);

        return query;
    };

    static getComments = (callback, parentKey) => {
        let query = firebaseDatabase.ref(FirebaseService.nodeCommentPath);
        query = query.orderByChild("parent").equalTo(parentKey);

        FirebaseService.listenerQuery(query, callback);

        return query;

    }

    static pushData = (node, objToSubmit) => {
        let ref;
        if(objToSubmit.key) {
            ref = firebaseDatabase.ref(node).child(objToSubmit.key);
        } else {
            ref = firebaseDatabase.ref(node).push();
        }
        ref.set(objToSubmit);
    };

    static removeData = (node, key) => {
        firebaseDatabase.ref(node).child(key).remove();
    };

}