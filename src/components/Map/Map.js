export default {
    name: 'map-component',
    components: {},
  
    props: [],
    data () {
      return {
        buttons: [
          // {
          //   name: "populate",
          //   action: 'game/populate'
          // },
  
          // {
          //   name: "tick",
          //   action: 'game/tick'
          // },
          
          // {
          //   name: "clear",
          //   action: 'game/clear'
          // }
        ]
      }
    },
    
    mounted () {
        this.$store.dispatch('editor/launch');
    }
  }
  