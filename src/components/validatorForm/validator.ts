export class Validator {
  private cache: any[] = [];
  private strategies: any = {
    // 不为空
    isNonEmpty: (value: any, errorMsg: string) => {
      if (value === "") {
        return errorMsg;
      }
    },
    minLength: (value: any, length: string, errorMsg: string) => {
      if (value.length < length) {
        return errorMsg;
      }
    },
    maxLength: (value: any, length: string ,errorMsg: string) => {
      if(value.length > length) {
        return errorMsg
      }
    },
    isMobile: (value: any, errorMsg: string) => {
      let reg = /^1[3][4][5][7][8][0-9]{9}$/;
      if (!reg.test(value)) {
        return errorMsg;
      }
    },
    error: () => {
      return '验证出错,请检测代码'
    }
  };
  // value: any, rule: string, errorMsg: string
  public add(input: any) {
    let value = input.value;
    let rule = input.rule;
    let errorMsg = input.err
    let ary = rule.split(":");
    this.cache.push(() => {
      // strategy 选择哪种验证
      let strategy: any = ary.shift();
      // 操作数组元素位置，达到 strategies对象方法中的参入参数一致
      ary.unshift(value);
      ary.push(errorMsg);
      try {
        return this.strategies[strategy].apply(this, ary);
      } catch (error) {
        return this.strategies.error();
      }
      
    });
  }

  public start() {
    // tslint:disable-next-line:no-conditional-assignment
    for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
      let msg = validatorFunc();
      if (msg) {
        this.cache = []
        return msg;
      }
    }
  }
}
