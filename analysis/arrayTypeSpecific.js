
(function (sandbox) {
    var iidToLocation = sandbox.iidToLocation;
    var info = [];

    function checkTypedArray(intArray, value){
        intArray[0]=value;
        if(value===intArray[0])
            return true;
        return false;
    }

    function getFittingType(validate, value){
        if (!checkTypedArray(new Uint8Array(1), value))
            validate.arrayTypes['Uint8Array'] = false;
        if (!checkTypedArray(new Uint16Array(1), value))
            validate.arrayTypes['Uint16Array'] = false;
        if (!checkTypedArray(new Uint32Array(1), value))
            validate.arrayTypes['Uint32Array'] = false;
        if (!checkTypedArray(new Int8Array(1), value))
            validate.arrayTypes['Int8Array'] = false;
        if (!checkTypedArray(new Int16Array(1), value))
            validate.arrayTypes['Int16Array'] = false;
        if (!checkTypedArray(new Int32Array(1), value))
            validate.arrayTypes['Int32Array'] = false;
        if (!checkTypedArray(new Float32Array(1), value))
            validate.arrayTypes['Float32Array'] = false;
        if (!checkTypedArray(new Float64Array(1), value))
            validate.arrayTypes['Float64Array'] = false;
    }

    function genFittingType(validate){
        validate.arrayTypes = { 'Uint8Array': true, 'Uint16Array': true, 'Uint32Array': true, 'Int8Array': true,
                                'Int16Array': true, 'Float32Array': true, 'Float64Array': true};
    }

    function getInnerList(arrayList){
        var accepted=[];
        for (var key in arrayList){
            if(arrayList[key]){
                accepted.push(key);
            }
        }
        return accepted.join(', ');
    }

    function getTypeValidator(value){
        var sobj = sandbox.smemory.getShadowObjectOfObject(value);
        if(!sobj.typeValidator) sobj.typeValidator = {};
        return sobj.typeValidator;
    }

    function MyAnalysis() {

        this.literal = function (iid, val, hasGetterSetter) {
            if(Array.isArray(val)){
                //console.log("Literal");
                var validate = getTypeValidator(val);
                if(!validate.id) {
                    validate.id = sandbox.getGlobalIID(iid);
                    validate.isNumeric = true;
                    validate.size = 0;
                    for (iter in val){
                        if(typeof val[iter]!=='number' || isNaN(val[iter])) {
                            validate.isNumeric = false;
                            break;
                        }
                        validate.size++;
                    }
                    validate.typeOf = false;
                    validate.readOnly = true;
                    validate.Getter = {};
                    validate.Setter = {};
                    genFittingType(validate);
                }
                info.push(validate);
            }
        };


        this.invokeFun = function (iid, f, base, args, result, isConstructor, isMethod, functionIid, functionSid) {
            //console.log('invokeFun');
            if(f === Array.prototype.push){
                var validate = getTypeValidator(base);
                if(typeof args[0]!=='number' || isNaN(args[0])) {
                    validate.isNumeric = false;
                }
                validate.size++;
                validate.readOnly=false;
            }

            if(f === Array.prototype.pop){
                var validate = getTypeValidator(base);
                validate.readOnly=false;
                //validate.size++;
            }

            if(f === Array) {
                var validate = getTypeValidator(result);

                if(!validate.id) {
                    validate.id = sandbox.getGlobalIID(iid);
                    validate.isNumeric = true;
                    validate.size = 0;
                    if(Object.keys(args).length==1){
                        validate.size=args[0];
                    }else {
                        for (iter in args) {
                            if (typeof args[iter] !== 'number' || isNaN(args[iter])) {
                                validate.isNumeric = false;
                                break;
                            }
                            validate.size++;
                        }
                    }
                    validate.readOnly = true;
                    validate.typeOf = false;
                    validate.Getter = {};
                    validate.Setter = {};
                    genFittingType(validate);
                }
                info.push(validate);
            }
        };

        this.putFieldPre = function (iid, base, offset, val, isComputed, isOpAssign) {
            if(Array.isArray(base)){
                //console.log("putFieldPre");
                var sobj = sandbox.smemory.getShadowObject(base, offset, false).owner;
                var validate = sobj.typeValidator;

                if (typeof offset === 'number') {
                    if (typeof val === 'number') {
                        validate.readOnly=false;
                        validate.size=Math.max(validate.size, offset+1);
                        getFittingType(validate, val);
                    }else{
                        validate.isNumeric = false;
                    }
                }

                if (typeof offset === 'string' && isNaN(parseInt(offset))) {
                        validate.Setter[offset] = true;
                }
            }
        };


        this.getField = function (iid, base, offset, val, isComputed, isOpAssign, isMethodCall) {
            if(Array.isArray(base)) {
                //console.log("getField");
                var sobj = sandbox.smemory.getShadowObject(base, offset, false).owner;
                var validate = sobj.typeValidator;
                if (typeof offset === 'string' && isNaN(parseInt(offset))) {
                        validate.Getter[offset] = true;
                }
            }
        };

        this.unary = function (iid, op, left, result) {
            //console.log("unary");
            if(Array.isArray(left) && op === 'typeof') {
                var validate = getTypeValidator(left);
                validate.typeof_use = true;
            }
        };

        this.endExecution = function () {
            //console.log("endExecution");
            console.log("\n\nRefactor Javascript Dynamic Arrays to Typed Array\n");
            for(var it in info) {
                var validate = info[it];
                if(validate.isNumeric) {
                    var acceptedTypes = getInnerList(validate.arrayTypes);
                    if (acceptedTypes) {
                        var gets=getInnerList(validate.Getter);
                        var sets=getInnerList(validate.Setter);

                        console.log("Array at location" + iidToLocation(validate.id));
                        console.log("Expected Size of Array: " + validate.size);
                        if(gets) console.log("Applied Getters: " + gets);
                        if(sets) console.log("Applied Setters: " + sets);
                        if(validate.readOnly) console.log("Array is ReadOnly");
                        if(validate.typeof_use) console.log("typeof operation applied");
                        console.log("Possible Types: " + acceptedTypes+'\n');
                    }
                }
            }
        };
    }
    sandbox.analysis = new MyAnalysis();
})(J$);



