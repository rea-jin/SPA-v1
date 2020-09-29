<template>
    <nav class="navbar">
        <router-link class ="navbar__brand" to="/">
        VueApi
        </router-link>
        <div class="navbar__menu">
            <div class="navbar__item">
                <button class="button">
                    <i class="icon ion-md-add"></i>
                    Subimit a Item
                </button>
            </div>
            <span class="navbar__item">
            username
            </span>
            <div class="navbar__item">
                <router-link to="login" class="button button--link">
                Login / Register
                </router-link>
            </div>
        </div>
    </nav>
</template>
