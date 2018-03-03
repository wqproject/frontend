
var iDB = window.indexedDB ||
       window.mozIndexedDB ||
       window.webkitIndexedDB ||
       window.msIndexedDB;

var iDBKeyRange = window.IDBKeyRange ||
       window.webkitIDBKeyRange ||
       window.msIDBKeyRange;

var db = {

    version: 2,
    objectStoreName: 'weibo_like_photo',
    instance: {},

    upgrade: function (e) {
        var _db = e.target.result,
            names = _db.objectStoreNames,
            name = db.objectStoreName;

        if (!names.contains(name)) {
            _db.createObjectStore(name,{autoIncrement: true});
        }
    },

    errorHandler: function (error) {
    },

    open: function (callback) {
        var request = iDB.open(db.objectStoreName, db.version);
        request.onerror = db.errorHandler;
        request.onupgradeneeded = db.upgrade;

        request.onsuccess = function (e) {
            db.instance = request.result;
            db.instance.onerror = db.errorHandler;
            callback();
        };
    },

    getObjectStore: function (mode) {

        var txn, store;

        mode = mode || 'readonly';

        txn = db.instance.transaction([db.objectStoreName], mode);

        store = txn.objectStore(db.objectStoreName);

        return store;
    },

    save: function (data, callback) {

        db.open(function () {

            var store, request,
                mode = 'readwrite';

            store = db.getObjectStore(mode),

            request = data.id ?
                store.put(data) :
                store.add(data);

            request.onsuccess = callback;
        });
    },

    getPage: function (page, callback) {

        db.open(function () {

            var store = db.getObjectStore(),
                perpage = 18,
                data = [];

            var range = iDBKeyRange.bound((page-1)*perpage+1, page*perpage, false, false);

            //prev表示倒序
            store.openCursor(range,'prev').onsuccess = function (e) {

                var result = e.target.result;

                if (result && result !== null) {

                    data.push(result.value);
                    result.continue();

                } else {

                    callback(data);
                }
            };

        });

    },

    getAll: function (callback) {

        db.open(function () {

            var store = db.getObjectStore(),
                cursor = store.openCursor(),
                data = [];

            cursor.onsuccess = function (e) {

                var result = e.target.result;

                if (result && result !== null) {

                    data.push(result.value);
                    result.continue();

                } else {

                    callback(data);
                }
            };

        });
    },

    get: function (id, callback) {

        id = parseInt(id);

        db.open(function () {

            var store = db.getObjectStore(),
                request = store.get(id);

            request.onsuccess = function (e){
                callback(e.target.result);
            };
        });
    },

    'delete': function (id, callback) {

        id = parseInt(id);

        db.open(function () {

            var mode = 'readwrite',
                store, request;

            store = db.getObjectStore(mode);

            request = store.delete(id);

            request.onsuccess = callback;
        });
    },

    deleteAll: function (callback) {

        db.open(function () {

            var mode, store, request;

            mode = 'readwrite';
            store = db.getObjectStore(mode);
            request = store.clear();

            request.onsuccess = callback;
        });

    }
};

export default db;


