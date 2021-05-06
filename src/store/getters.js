const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles, // wlfei add
  permission_routes: state => state.permission.routes, // wlfei add
  unread_message_count: state => state.message.unread_count
}
export default getters
