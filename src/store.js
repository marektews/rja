import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            active_tura: 1,
            mode: 0,
            terminals: [],
            sectors: [],
            congregations: [],
            sra: [],
        }
    },
    mutations: {
        setActiveTura(state, payload) {
            state.active_tura = payload
        },
        setMode(state, payload) {
            state.mode = payload
        },
        setTerminals(state, payload) {
            state.terminals = payload
        },
        setSectors(state, payload) {
            state.sectors = payload
        },
        setCongregations(state, payload) {
            state.congregations = payload
        },
        setSRA(state, payload) {
            state.sra = payload
        }
    },
    actions: {
        loadActiveTura(context) {
            fetch(`/api/config/active/tura`)
            .then(resp => {
                if(resp.status === 200)
                    return resp.json()
                else
                    throw resp
            })
            .then((data) => {
                console.log("load active tura:", data)
                context.commit('setActiveTura', data)
                context.dispatch('loadCongregations')
                context.dispatch('loadSRA')
                context.dispatch('loadTerminals')
            })
            .catch((reason) => {
                console.error("load active tura:", reason)
            })
        },

        loadCongregations(context) {
            fetch(`/api/rja/zbory/${context.state.active_tura.tid}`)
            .then(resp => {
                if(resp.status === 200)
                    return resp.json()
                else
                    throw resp
            })
            .then((data) => {
                console.log("load congregations:", data)
                context.commit('setCongregations', data)
            })
            .catch((reason) => {
                console.error("load congregations:", reason)
            })
        },

        loadSRA(context) {
            fetch(`/api/rja/sra/${context.state.active_tura.tid}`)
            .then(resp => {
                if(resp.status === 200)
                    return resp.json()
                else
                    throw resp
            })
            .then((data) => {
                console.log("load sra:", data)
                context.commit('setSRA', data)
            })
            .catch((reason) => {
                console.error("load sra:", reason)
            })
        },

        loadSectors(context, terminal_id) {
            fetch(`/api/rja/sectors/${terminal_id}`)
            .then(resp => {
                if(resp.status === 200)
                    return resp.json()
                else
                    throw resp
            })
            .then(data => {
                console.log("Load sectors:", data)
                context.commit('setSectors', data)
                context.commit('setMode', 2)
            })
            .catch((reason) => {
                console.error("Load sectors:", reason)
            })
        },

        loadTerminals(context) {
            fetch("/api/rja/terminals")
            .then((resp) => {
                if(resp.status === 200)
                    return resp.json()
                else
                    throw resp
            })
            .then((data) => {
                console.log("Load terminals:", data)
                context.commit('setTerminals', data)
                if(data.length > 1) {
                    context.commit('setMode', 1)
                }
                else
                if(data.length === 1) {
                    // gdy jest tylko jeden terminal, to od razu ładujemy sektory
                    context.dispatch('loadSectors', data[0].tid)
                }
            })
            .catch((reason) => {
                console.error("Load terminals:", reason)
            })
        }
    },
    getters: {
        day() {
            const dtNow = new Date()
            let d = 'd1'
            switch(dtNow.getDay()) {
                case 6: d = 'd2'; break;
                case 0: d = 'd3'; break;
            }
            return d
        }
    }
})

export default store