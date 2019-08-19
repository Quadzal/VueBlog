<template>
    <b-col md="12" v-if="error" class="mt-3" id="error">
        <b-alert variant="danger" dismissible show>
            {{error}}
        </b-alert>
    </b-col>
</template>

<script>
export default {
    props:["error"]
}
</script>