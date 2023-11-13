interface Heading {
  [key: string]: string
}

export const HandleHeading = (location: string) => {
  const mappedHeading: Heading = {
    events: 'Quản lý sự kiện',
    students: 'Quản lý sinh viên',
    roles: 'Quản lý Roles',
    pending_events: 'Quản lý đề nghị hợp tác',
    event_organizations: 'Quản lý nhà tổ chức sự kiện'
  }
  return mappedHeading[`${location}`]
}

// const permissions = [
//   // 'ServeSync.Permissions.Roles.View',
//   // 'ServeSync.Permissions.Roles.Create',
//   // 'ServeSync.Permissions.Roles.Edit',
//   // 'ServeSync.Permissions.Roles.Delete',
//   // 'ServeSync.Permissions.Roles.UpdatePermissions',
//   // 'ServeSync.Permissions.Roles.ViewPermissions',
//   'ServeSync.Permissions.PermissionManagement.ViewPermissions',
//   'ServeSync.Permissions.PermissionManagement.ViewProfile',
//   'ServeSync.Permissions.PermissionManagement.View',
//   'ServeSync.Permissions.EducationPrograms.View',
//   'ServeSync.Permissions.Faculties.View',
//   'ServeSync.Permissions.HomeRooms.View',
//   // 'ServeSync.Permissions.Students.View',
//   // 'ServeSync.Permissions.Students.Create',
//   // 'ServeSync.Permissions.Students.Edit',
//   // 'ServeSync.Permissions.Students.Delete',
//   // 'ServeSync.Permissions.Students.EditProfile',
//   // 'ServeSync.Permissions.Students.ViewProfile',
//   // 'ServeSync.Permissions.Events.View',
//   // 'ServeSync.Permissions.Events.Edit',
//   // 'ServeSync.Permissions.Events.Create',
//   // 'ServeSync.Permissions.Events.Approve',
//   // 'ServeSync.Permissions.Events.Reject',
//   // 'ServeSync.Permissions.Events.Cancel',
//   'ServeSync.Permissions.Events.Delete',
//   // 'ServeSync.Permissions.Events.RejectRegistration',
//   // 'ServeSync.Permissions.Events.ApproveRegistration',
//   // 'ServeSync.Permissions.EventOrganizations.View',
//   'ServeSync.Permissions.EventOrganizations.Create',
//   'ServeSync.Permissions.EventOrganizations.Update',
//   'ServeSync.Permissions.EventOrganizations.Delete',
//   'ServeSync.Permissions.EventCollaborationRequests.Approve',
//   'ServeSync.Permissions.EventCollaborationRequests.Reject',
//   'ServeSync.Permissions.EventCollaborationRequests.View'
// ]
