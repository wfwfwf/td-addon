var debounce = require('./debounce');

module.exports = function (myAddon, vueObj) {
    const tooltipBeforeCreate = function () {
        if (this.$isServer) return;
        this.popperVM = new vueObj({
            data: { node: '' },
            render() {
                return this.node;
            }
        }).$mount();
        this.debounceClose = debounce(200, () => this.handleClosePopper());
    }
    myAddon.ElTable.components.TableBody.components.ElTooltip.beforeCreate = tooltipBeforeCreate
    // 下面的无效
    // myAddon.ElTooltip.beforeCreate = function () {
    //     console.log('myAddon.ElTooltip.beforeCreate 222----: ')
    //     if (this.$isServer) return;
    //     this.popperVM = new Vue({
    //         data: { node: '' },
    //         render(h) {
    //         return this.node;
    //         }
    //     }).$mount();
    //     let that = this
    //     console.log('that---', that)
    //     // this.debounceClose = debounce(200, () => this.handleClosePopper());
    //     this.debounceClose = debounce(200, () => this.handleClosePopper());
    // }
}