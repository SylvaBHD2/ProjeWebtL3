<template>
  <div>
    <AppMenu></AppMenu>
    <h1>Change Password</h1>
    <form @submit.prevent="updatePassword" class="container mt-4">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="text" v-model="email" id="email" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="currentPassword">Current Password:</label>
      <input type="password" v-model="currentPassword" id="currentPassword" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="newPassword">New Password:</label>
      <input type="password" v-model="newPassword" id="newPassword" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm New Password:</label>
      <input type="password" v-model="confirmPassword" id="confirmPassword" class="form-control" required />
    </div>
    <button type="submit" class="btn btn-primary mt-3">Update Password</button>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </form>
  </div>
</template>

  <script>
  import AppMenu from './AppMenu.vue';

  export default {
  name: 'EditPassword',
  components: {
      AppMenu
    },
  data() {
    return {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: ''
    };
  },
  methods: {
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.error = 'New passwords do not match.';
        return;
      }
      fetch('http://localhost:3000/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
          })
        })
        .then(response => {
          if (response.ok) {
              alert('Password changed')
              this.$router.push('/profile');
            }
            else {
            this.error = 'Identifiants invalides';
            }
          })
        

      // try {
      //   const response = await axios.post('http://localhost:3000/change-password', {
      //     currentPassword: this.currentPassword,
      //     newPassword: this.newPassword
      //   });

      //   this.message = 'Password updated successfully!';
      // } catch (error) {
      //   this.message = 'Failed to update password: ' + error.response.data.message;
      // }
    }
  }
};
</script>

<style scoped>
</style>