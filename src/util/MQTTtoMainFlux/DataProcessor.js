function Listener(key, name, funcSuccess, funcError) {
    this.key = key;
    this.name = name;
    this.funcSuccess = funcSuccess;
    this.funcError = funcError;
}

let DataProcessor = (function () {

    let instance;
    let listPushHandler = [];
    let listResponseHandler = [];

    function DataProcessor() {
    }

    DataProcessor.prototype.AddPushHandler = function (key, code, type, funcSuccess, funcError) {
        let name = code + type;
        let handler = new Listener(key, name, funcSuccess, funcError);
        listPushHandler.push(handler);
    };

    DataProcessor.prototype.RemovePushHandler = function (key) {
        for (let i = 0; i < listPushHandler.length; i++) {
            if (listPushHandler[i].key === key) {
                listPushHandler.splice(i, 1);
                return;
            }
        }
        console.log(listPushHandler)
    };

    DataProcessor.prototype.GetPushHandler = function (name) {
        let handlers = [];
        for (let i = 0; i < listPushHandler.length; i++) {
            if (listPushHandler[i].name === name) {
                handlers.push(listPushHandler[i]);
            }
        }
        return handlers;
    };

    DataProcessor.prototype.AddResponseHandler = function (senderId, funcSuccess, funcError) {
        console.log("ADD...: " + senderId)
        let handler = new Listener('', senderId, funcSuccess, funcError);
        listResponseHandler.push(handler);
    };

    DataProcessor.prototype.RemoveResponseHandler = function (senderId) {
        for (var i = 0; i < listResponseHandler.length; i++) {
            if (listResponseHandler[i].name === senderId) {
                listResponseHandler.splice(i, 1);
                return;
            }
        }
    };

    DataProcessor.prototype.GetResponseHandler = function (senderId) {
        for (let i = 0; i < listResponseHandler.length; i++) {
            if (listResponseHandler[i].name === senderId) {
                return listResponseHandler[i];
            }
        }
        return null;
    };

    DataProcessor.prototype.Destroy = function () {
        if (listPushHandler.length > 0)
            listPushHandler.slice(0, listPushHandler.length);
        if (listResponseHandler.length > 0)
            listResponseHandler.slice(0, listResponseHandler.length);
    };

    DataProcessor.prototype.ProcessIncomeData = function (data) {
        const destination  = data._destinationName

        let handler = this.GetPushHandler(destination)
        // console.log([destination, handler])
        if(handler[0]){
            // console.log(typeof handler.funcSuccess)
            handler[0].funcSuccess(data)
        }
    };

    return {
        getInstance: function () {
            if (instance == null) {
                instance = new DataProcessor();
                instance.constructor = null;
            }
            return instance;
        }
    };

})();

let DataProcessorInstance = DataProcessor.getInstance();
export default DataProcessorInstance;