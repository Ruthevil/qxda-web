/**
 * Created by baidm in 2021/1/3 on 12:54
 */
class EventHub {
    constructor(vm) {
        this.vm = vm;
        this.curVm = null;
        this.events = {};
        this.eventMapUid = {};
    }

    /**
     * 注册调用者实例
     * @param vm
     */
    $register(vm) {
        this.curVm = vm;
    }

    /**
     * 收集所有的事件类型
     * @param uid
     * @param type
     */
    setEventMapUid(uid, type) {
        if (!this.eventMapUid[uid]) {
            this.eventMapUid[uid] = [];
        }
        this.eventMapUid[uid].push(type);
    }

    /**
     * 收集每种类型的回调
     * @param type
     * @param fn
     */
    $on(type, fn) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(fn);
        if (this.curVm instanceof this.vm) {
            this.setEventMapUid(this.curVm._uid, type);
        }
    }

    /**
     * 触发每种类型的所有回调
     * @param type
     * @param args
     */
    $emit(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(fn => fn(...args));
        }
    }

    /**
     * 取消订阅事件
     * @param type
     * @param fn
     */
    $off(type, fn) {
        if (fn && this.events[type]) {
            const index = this.events[type].findIndex(f => f === fn);
            if (index !== -1) {
                this.events[type].splice(index, 1);
            }
            return;
        }
        delete this.events[type];
    }

    /**
     * 取消uid订阅的所有事件
     * @param uid
     */
    $offAll(uid) {
        const curAllTypes = this.eventMapUid[uid] || [];
        curAllTypes.forEach(type => this.$off(type));
        delete this.eventMapUid[uid];
    }
}

export default {
    install(vm, options = {}) {
        Reflect.defineProperty(vm.prototype, "$eventHub", {
            value: new EventHub(vm)
        })
    }
}
