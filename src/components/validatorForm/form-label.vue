<script lang="tsx">
import { Vue, Component ,Prop} from 'vue-property-decorator'

@Component({})
export default class formLabel extends Vue {

  @Prop() labelWidth:number|string

  render (h, context) {
    const slots = this.$slots.default
    const style = `flex: 0 0 ${this.labelWidth}px;`
    console.log(style)
    return (
      // <div>这条是jsx</div>
      <div class='form-item-label' style={style}>{slots}</div>
    )
  }
}
</script>
<style scoped>
  .form-item-label{
    color: red;
    position: relative;
    padding-left: 25px;
    padding-right: 5px;
    display: inline-block;
    /* overflow: hidden; */
  }
  .form-item-label > label{
    height: 40px;
    overflow: hidden;
  }
</style>
