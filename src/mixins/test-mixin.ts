import { Vue, Component } from "vue-property-decorator";
/**
 * Mixin test
 *
 * @export
 * @class TestMixin
 * @extends {Vue}
 */
@Component({})
export default class TestMixin extends Vue {
 private testMixinArg: string = "this is test mixin arg";

 public  testMixinFunc(): void {
    console.log('this is text');
  }
}
