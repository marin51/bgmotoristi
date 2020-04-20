function logout() {
    auth.signOut().then(() => {
        localStorage.removeItem('logged_users_id');
        login.init();
    });
}