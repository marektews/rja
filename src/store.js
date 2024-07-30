import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            terminals: [],
            sectors: [],
            congregations: [],
            sra: [],
        }
    },
    mutations: {
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
        loadCongregations(context) {
            fetch("/api/rja/zbory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tura: store.getters.tura })
            })
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
            fetch("/api/rja/sra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tura: store.getters.tura })
            })
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
    },
    getters: {
        tura() {
            const dtNow = new Date()
            const dtBorder = new Date(2024, 7, 5)
            let tura = 1
            if(dtNow < dtBorder)
                tura = 2
            else
                tura = 3
            // console.log("tura:", dtNow, dtBorder, tura)
            return tura
        },
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