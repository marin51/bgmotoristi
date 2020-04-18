function logout() {
    auth.signOut().then(() => {
        login.init();
    });
}