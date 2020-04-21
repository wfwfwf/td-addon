<template>
    <div class="td-toolbar" :class="align">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'tdToolbar',
    props: {
        align: {
            type: String,
            default: function(){
                return 'right'
            }
        }
    }
}
</script>