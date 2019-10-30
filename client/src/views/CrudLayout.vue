<template>
<v-container >
    <v-row>
        <v-col>
            <FormOne />
            <EditeDeleteEmp />
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import FormOne from "@/components/FormOne";
import EditeDeleteEmp from "@/components/EditeDeleteEmp";

export default {
    name: "layout",
    fromChild: [],
    components: {
        FormOne,
        EditeDeleteEmp
    }

};
</script>
