<template>
    <div class="w-full lg:w-7 mx-auto">
        <div class="text-center mb-5">
            <img :src="config.public.site.logoUrl" :alt="config.public.site.name" height="50" class="mb-3">
            <div class="text-900 text-3xl font-medium mb-3">Create an Account</div>
            <span class="text-600 font-medium line-height-3">Already have an account?</span>
            <NuxtLink to="/user/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Sign in
            </NuxtLink>
        </div>
        <div class="surface-card p-4 border-1 surface-border border-round ">
            You are not allowed to create accounts.
            <Form v-if="false" :send="createAccount">

                <FormInput name="username" v-model="newUser.username" required label="Username" autocomplete="username"
                    type="text" class="mb-3" />

                <FormInput name="realName" v-model="newUser.realName" required label="Real Name" autocomplete="name"
                    type="text" class="mb-3" />

                <FormInput name="email" v-model="newUser.email" required label="Email" autocomplete="email" type="email"
                    class="mb-3" />

                <FormInput name="password" v-model="newUser.password" required label="Password" autocomplete="new-password"
                    type="password" class="mb-3" />

                <FormInput name="password2" v-model="newUser.password2" required label="Confirm Password"
                    autocomplete="new-password" type="password" :mustMatch="{ field: 'Password', value: newUser.password }"
                    class="mb-3" />

                <Button type="submit" icon="pi pi-user" class="w-full">Create account</Button>
            </Form>
        </div>
    </div>
</template>

<script setup>
let newUser = ref({ username: '', email: '', realName: '', password: '', password2: '' });
const config = useRuntimeConfig();
const currentUser = useCurrentUserStore();

async function createAccount() {
    const response = await currentUser.create(newUser.value);
    if (!response.error)
        await navigateTo('/');
}
</script>