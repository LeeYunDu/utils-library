import Alert from './alert.vue';
import Loading from './loading.vue'
import Vue from 'vue';

// alert 实例
(Alert as any).newInstance   = ( properties )=> {
    let prop = properties||{}

    const instance = new Vue({
        data:prop,
        render(h) {
            return h(Alert)
        }
    })
    const component = instance.$mount();
    document.body.appendChild(component.$el);
    const alert = instance.$children[0];

    return{
        add(msg) {
            alert.add(msg);
        },
        remove(id) {
            alert.remove(id);
        }
    }
}
let messageInstance;

function getMessageInstance() {
    messageInstance = messageInstance||(Alert as any).newInstance()
    return messageInstance;
}
// 设置 alert组件参数
function message(options) {
    
    let instance = getMessageInstance();
    instance.add({
        content:options.message||'',
        duration:options.duration||1500,
        icon:options.icon||'',
        mask:options.mask||false,
        success:options.success||null
    })
}

// loading 实例
(Loading as any).newInstance   = ( properties )=> {
    let prop = properties||{}

    const instance = new Vue({
        data:prop,
        render(h) {
            return h(Loading)
        }
    })

    const component = instance.$mount();
    document.body.appendChild(component.$el);
    const alert = instance.$children[0];

    return{
        add(loading) {
            alert.add(loading);
        },
        close() {
            alert.close();
        }
    }
}
let loadingInstance;
function getLoadingInstance() {
    loadingInstance = loadingInstance||(Loading as any).newInstance()
    return loadingInstance;
}
//  设置 Loading组件
function setLoading(options,type) {
    
    let instance = getLoadingInstance();
    if(type === 'loading') {
        instance.add({
            content:options.message||'',
            duration:options.duration||60000,
            icon:options.icon||'',
            mask:options.mask||false,
            success:options.success||null
        })
    } else {
        instance.close();
    }
    
}


//  实例挂载
export default{
    // alert 和 loading 只能存在一个

    info(options) {
        if(loadingInstance) {
            loadingInstance.close();
        }
        return message(options)
    },
    loading(options) {
        if(messageInstance) {
            messageInstance.remove()
        }
        return setLoading(options,'loading')
    },
    close(options) {
        return setLoading(options,'close')
    }
}
