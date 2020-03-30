import Editor from '../../../editor/app';

export default {
    namespaced: true,

    state: {
        editor: null,
        cellFocused: {
            x: null,
            y: null
        }
    },

    getters: {
        editor(state) {
            return state.editor;
        },

        cellFocused(state) {
            return state.cellFocused;
        } 
    },
    

    actions: {
        launch({ commit, state }) {
            commit('launch');

            window.addEventListener('map-pointer-move', event => {
                commit('updateCellFocused', event.detail.position);
            });
        }
       
    },
    
    mutations: {
        updateCellFocused(state, position) {
            state.cellFocused.x = position.x;
            state.cellFocused.y = position.y;
        },

        launch(state) {
            // [critical optimization] disable Vue object observation
            // https://github.com/vuejs/vue/issues/2637#issuecomment-207076744
            state.editor = Object.freeze(new Editor());
            window.editor = state.editor;
        }

    }
}

